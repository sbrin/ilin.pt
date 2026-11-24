---
name: sync-telegram-posts
description: Fetch new posts from the public @WOOMOO Telegram channel, merge split posts, translate to US-adapted English, and publish to the ilin.pt Jekyll blog.
---

# Sync Telegram Posts to ilin.pt

This skill publishes new posts from `https://t.me/s/woomoo` to the Jekyll blog at `/Users/sun/Library/Mobile Documents/com~apple~CloudDocs/Projects/ilin.pt`.

Run the entire workflow without user confirmation. Report the final result in Russian.

## 1. Repository and State

- Repository path: `/Users/sun/Library/Mobile Documents/com~apple~CloudDocs/Projects/ilin.pt`
- Fetch script: `.bb/skills/sync-telegram-posts/scripts/fetch_woomoo.py`
- State file: `.bb/skills/sync-telegram-posts/state.json` (`last_synced_id` holds the highest processed Telegram message ID)

Before editing files:
1. Run `git status -sb` in the repository.
2. Ensure you are on `main` and pull fast-forward: `git checkout main && git pull --ff-only origin main`.
3. If the working tree has unrelated uncommitted changes, stop and report the conflict.

## 2. Fetch New Telegram Posts

Run the fetch script:

```bash
python3 ".bb/skills/sync-telegram-posts/scripts/fetch_woomoo.py" \
  --state ".bb/skills/sync-telegram-posts/state.json" \
  --out "$TMPDIR/woomoo_new.json" \
  --download-media "$TMPDIR/woomoo_media"
```

- If `new_posts` is empty: stop and report in one line that there are no new posts in `@WOOMOO` since `#<last_synced_id>`.
- If a transient network error occurs, retry once. If it still fails, stop and report the error.

## 3. Group and Filter Posts

Review all items in `new_posts` in chronological order (oldest first):

1. **Merge split posts into one blog post** when consecutive messages clearly belong together:
   - Same Telegram album (`grouped_id` matches).
   - A photo or image message paired with an explanation sent within a few minutes.
   - A follow-up link, correction, or continuation on the same topic sent shortly after the main message.
2. **Skip non-text audio-only or empty service messages** (for example, a standalone audio file with no text). Record skipped message IDs for the final report and still advance `last_synced_id` past them.
3. **Image-only posts (no text)**: publish only if meaningful (such as a photo or flyer); put a concise English description in the `alt` attribute.
4. **Forwarded posts**: include them if they have commentary or stand on their own; otherwise note them in the report.

## 4. Translate to English (US-Adapted)

Translate each grouped post from Russian to English with these rules:

- **Fidelity**: Keep the meaning, structure, paragraph breaks, and author's tone of voice close to the original. Preserve profanity at the same strength.
- **US localization**: Adapt idioms, slang, and cultural references into natural conversational American English (for example, "поковырять в носу" -> "twiddle your thumbs", "ванговал" -> "called it").
- **Allowed formatting**: Use **bold** and Markdown `[links](url)` only. Remove italics, blockquotes, and Telegram spoilers. Keep bullet lists or emoji checkmarks only when the original post uses them as a list.
- **Keep emojis** from the original post.
- **No unescaped quotes in HTML attributes**: Never put raw `"` or `\"` inside `<img alt="...">`. Use single quotes or rephrase the `alt` text.

## 5. Create Jekyll Post Files and Assets

For each blog post:

1. **Filename**: `_posts/YYYY-MM-DD-<kebab-case-slug>.md` using the UTC date of the first message in the group.
2. **Frontmatter**:

```yaml
---
layout: post
title: "Concise English Title"
date: YYYY-MM-DD HH:MM
categories:
- General
tags: [tag1, tag2, tag3]
summary: "One-sentence summary of the post."
---
```

3. **Images**:
   - Copy downloaded photos from `$TMPDIR/woomoo_media/` to `assets/img/YYYY-MM-DD-<slug>/01.jpg`, `02.jpg`, etc.
   - Embed each image with:

```html
<img src="/assets/img/YYYY-MM-DD-<slug>/01.jpg" alt="Plain English description without double quotes" style="width: 100%;">
```

## 6. Build and Verify Locally

Build the site with the required Ruby 3.1.2 `GEM_PATH` and UTF-8 locale:

```bash
cd "/Users/sun/Library/Mobile Documents/com~apple~CloudDocs/Projects/ilin.pt"
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
export GEM_PATH="/Users/sun/.gem/ruby/3.1.2:/Users/sun/.rubies/ruby-3.1.2/lib/ruby/gems/3.1.0"
bundle exec jekyll build --destination "$TMPDIR/ilin-site"
```

Verify the generated HTML in `$TMPDIR/ilin-site`:
- Every new post HTML file exists under `$TMPDIR/ilin-site/general/YYYY/MM/DD/<slug>.html`.
- Every referenced `/assets/img/...` file exists in `$TMPDIR/ilin-site/assets/img/...` and is non-empty.
- No broken `<img>` tags (check that `alt="..."` has no unescaped quotes) and no mojibake.

## 7. Update State, Commit, Push, and Verify Live

1. Update `.bb/skills/sync-telegram-posts/state.json`:
   - `last_synced_id`: highest Telegram `message_id` inspected (including skipped ones).
   - `last_synced_post`: filename of the newest published post (or previous value if all new messages were skipped).
   - `updated_at`: current UTC ISO-8601 timestamp.
2. Commit and push to `main`:

```bash
git add _posts assets/img .bb/skills/sync-telegram-posts/state.json
git commit -m "Add <N> WOOMOO Telegram posts (#<min>-#<max>)"
git push origin main
```

3. Wait 60–90 seconds for GitHub Pages to deploy, then check with `curl -sI` that each new post URL on `https://ilin.pt/general/YYYY/MM/DD/<slug>.html` and each new image URL returns HTTP `200`.

## 8. Final Report

Reply in Russian, concise and structured (Minto Pyramid Principle):
- **Summary line**: how many posts were published (or that no new posts were found), commit hash, and deploy status.
- **Published posts**: title, Telegram message IDs (note merged pairs), and live `https://ilin.pt/...` link.
- **Skipped or edge cases**: skipped audio-only messages, unresolved links, or warnings (if any).
