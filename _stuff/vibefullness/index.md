---
layout: post
title: "Vibefullness: a breathing pause for vibe coding"
categories:
- Stuff
tags: [codex, claudecode, plugin, macos, focus, go]
summary: An ambient forest takes over the screen while your agent thinks
date: 2026-08-07
---

You send a prompt. The agent starts working. And you, almost without noticing, open a fourth tab, start a second task, and spread your attention thin across however many agents you have running.

[Vibefullness](https://github.com/sbrin/vibefullness) interrupts that habit. The moment your agent starts a turn, an ambient forest fills your screen. The moment the answer lands, it disappears. You get a breath and a horizon instead of another thing to juggle, and you come back to the answer with a clear head to actually read it.

The point is not the video. The point is the pause.

Works with Codex and Claude Code, on macOS with Apple Silicon.

## Install

Codex:

```sh
codex plugin marketplace add sbrin/vibefullness
codex plugin add vibefullness@vibefullness
```

Codex never runs a hook it does not trust, so approve the two hooks after installing: open Settings -> Hooks, or run `/hooks` in the terminal, find vibefullness under "From Plugins", and trust both entries. Then start a new session.

Claude Code:

```sh
claude plugin marketplace add sbrin/vibefullness
claude plugin install vibefullness@vibefullness
```

## How it works

Two hooks, and that is the whole idea. When you submit a prompt, the plugin opens a borderless window that covers the screen, with no controls and no on-screen display. When the agent finishes its turn, the window closes. If several sessions are running at once, they share a single player: the first prompt opens it, the first finished turn closes it.

Playback picks up where it left off. Because these pauses are short and frequent, every run continues from the second the previous one ended, so the scenery moves forward across your day instead of restarting the same opening shot over and over.

Ambient videos stream straight from YouTube: forests, coasts, slow landscapes. Nothing is downloaded and nothing is cached to disk. The default playlist ships with the plugin, and you can replace it with your own by creating `~/Library/Application Support/vibefullness/config.toml` — plain TOML with a list of YouTube urls plus volume, resolution cap, and whether the playlist loops.

Under the hood a small Go program does the work. It resolves YouTube stream urls in-process and hands them to [mpv](https://mpv.io), which is bundled with the plugin, so you do not have to install anything yourself. Video is capped at 1080p by default, and H.264 is preferred over AV1 because older Macs only decode the latter in software.

- GitHub: [sbrin/vibefullness](https://github.com/sbrin/vibefullness)
