---
layout: post
title: "Dictant: Minimalistic dictation app for Mac"
categories:
- Stuff
tags: [dictation, macos, whisper, openai, app]
summary: Tiny menu bar push-to-talk app for fast voice-to-text
date: 2026-02-12
---

I wanted a dictation app for Mac that works instantly and does not get in the way, so I built one.

[Dictant](https://github.com/sbrin/Dictant) is a tiny menu bar push-to-talk app: hold the right Command key, speak, release, and get clean text in your clipboard (and optionally auto-pasted to the active app).

It uses OpenAI Whisper for transcription, can run an optional ChatGPT cleanup pass with your own prompt, keeps API keys in Keychain, and stores recordings locally.

No subscriptions, no paywall. It is free and open source, you only pay for your OpenAI API usage.

- GitHub: https://github.com/sbrin/Dictant
- Latest release: https://github.com/sbrin/Dictant/releases
