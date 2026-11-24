#!/usr/bin/env python3
"""Fetch new posts from the public @WOOMOO Telegram channel web preview."""

import argparse
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

CHANNEL = "woomoo"
BASE_URL = f"https://t.me/s/{CHANNEL}"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"


def fetch_url(url: str, retries: int = 3, timeout: int = 20) -> bytes:
    last_err = None
    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read()
        except Exception as err:
            last_err = err
            if attempt < retries:
                time.sleep(2 * attempt)
    raise RuntimeError(f"Failed to fetch {url}: {last_err}")


def extract_balanced_div(block: str, class_substr: str) -> str:
    """Extract inner HTML of the first <div> whose opening tag contains class_substr."""
    m = re.search(rf'<div[^>]*{re.escape(class_substr)}[^>]*>', block)
    if not m:
        return ""
    start = m.end()
    depth = 1
    pos = start
    tag_re = re.compile(r'<(/?)div\b[^>]*>', re.I)
    while depth > 0:
        tm = tag_re.search(block, pos)
        if not tm:
            return block[start:]
        if tm.group(1) == "/":
            depth -= 1
            if depth == 0:
                return block[start:tm.start()]
        else:
            depth += 1
        pos = tm.end()
    return ""


def html_to_plain(raw_html: str) -> str:
    if not raw_html:
        return ""
    s = re.sub(r'<br\s*/?>', '\n', raw_html, flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)
    return html.unescape(s).strip()


def parse_blocks(page_html: str) -> list[dict]:
    blocks = re.split(r'(?=<div class="tgme_widget_message_wrap)', page_html)[1:]
    posts = []
    for b in blocks:
        m_post = re.search(r'data-post="([^"]+)"', b)
        if not m_post:
            continue
        post_ref = m_post.group(1)
        try:
            msg_id = int(post_ref.split("/")[-1])
        except ValueError:
            continue

        m_dt = re.search(r'<time[^>]*datetime="([^"]+)"', b)
        date_iso = m_dt.group(1) if m_dt else None

        m_group = re.search(r'data-grouped-id="([^"]+)"', b)
        grouped_id = m_group.group(1) if m_group else None

        m_reply = re.search(r'tgme_widget_message_reply[^>]*href="https://t\.me/[^/]+/(\d+)"', b)
        reply_to = int(m_reply.group(1)) if m_reply else None

        m_fwd = re.search(r'tgme_widget_message_forwarded_from_name[^>]*>(.*?)</(?:a|span)>', b, re.S)
        forwarded_from = html_to_plain(m_fwd.group(1)) if m_fwd else None

        text_html = extract_balanced_div(b, 'tgme_widget_message_text')
        text_plain = html_to_plain(text_html)

        links = []
        for lm in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', text_html, re.S):
            href = html.unescape(lm.group(1))
            label = html_to_plain(lm.group(2))
            links.append({"href": href, "text": label})

        # Also check link preview URL if not in text
        m_preview = re.search(r'tgme_widget_message_link_preview[^>]*href="([^"]+)"', b)
        preview_url = html.unescape(m_preview.group(1)) if m_preview else None

        photo_urls = []
        for pm in re.finditer(
            r'tgme_widget_message_photo_wrap[^>]*style="[^"]*background-image:url\(\'([^\']+)\'\)',
            b,
        ):
            u = html.unescape(pm.group(1))
            if u not in photo_urls:
                photo_urls.append(u)

        media_types = []
        if photo_urls:
            media_types.append("photo")
        if "tgme_widget_message_video" in b:
            media_types.append("video")
        if "tgme_widget_message_voice" in b:
            media_types.append("voice")
        if "tgme_widget_message_document" in b:
            media_types.append("document")

        m_audio_title = re.search(r'tgme_widget_message_document_title[^>]*>(.*?)</div>', b, re.S)
        document_title = html_to_plain(m_audio_title.group(1)) if m_audio_title else None

        posts.append({
            "message_id": msg_id,
            "post": post_ref,
            "url": f"https://t.me/{post_ref}",
            "date": date_iso,
            "grouped_id": grouped_id,
            "reply_to": reply_to,
            "forwarded_from": forwarded_from,
            "text_plain": text_plain,
            "text_html": text_html,
            "links": links,
            "preview_url": preview_url,
            "photo_urls": photo_urls,
            "media_types": media_types,
            "document_title": document_title,
        })
    return posts


def fetch_since(after_id: int, max_pages: int = 10) -> list[dict]:
    collected: dict[int, dict] = {}
    before_id = None

    for _ in range(max_pages):
        url = BASE_URL if before_id is None else f"{BASE_URL}?before={before_id}"
        page_html = fetch_url(url).decode("utf-8", errors="replace")
        page_posts = parse_blocks(page_html)
        if not page_posts:
            break

        min_id = min(p["message_id"] for p in page_posts)
        for p in page_posts:
            if p["message_id"] > after_id:
                collected[p["message_id"]] = p

        if min_id <= after_id:
            break
        if before_id == min_id:
            break
        before_id = min_id

    return [collected[k] for k in sorted(collected.keys())]


def download_media(posts: list[dict], media_dir: str) -> None:
    os.makedirs(media_dir, exist_ok=True)
    for p in posts:
        local_files = []
        for idx, url in enumerate(p.get("photo_urls", []), start=1):
            fname = f"{p['message_id']}_{idx:02d}.jpg"
            dest = os.path.join(media_dir, fname)
            data = fetch_url(url)
            with open(dest, "wb") as f:
                f.write(data)
            local_files.append(dest)
        p["downloaded_photos"] = local_files


def main() -> int:
    parser = argparse.ArgumentParser(description="Fetch new @WOOMOO posts.")
    parser.add_argument("--state", help="Path to state.json")
    parser.add_argument("--after", type=int, help="Override last_synced_id")
    parser.add_argument("--out", help="Write JSON output to file instead of stdout")
    parser.add_argument("--download-media", help="Directory to download photos into")
    args = parser.parse_args()

    after_id = args.after
    if after_id is None:
        if not args.state:
            parser.error("Provide --state or --after")
        with open(args.state, encoding="utf-8") as f:
            state = json.load(f)
        after_id = int(state["last_synced_id"])

    posts = fetch_since(after_id)
    if args.download_media and posts:
        download_media(posts, args.download_media)

    result = {
        "channel": CHANNEL,
        "after_id": after_id,
        "count": len(posts),
        "max_id": max((p["message_id"] for p in posts), default=after_id),
        "new_posts": posts,
    }
    payload = json.dumps(result, ensure_ascii=False, indent=2)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(payload)
    else:
        print(payload)
    return 0


if __name__ == "__main__":
    sys.exit(main())
