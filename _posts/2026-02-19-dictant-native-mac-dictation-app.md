---
layout: post
title: "I Built Dictant — A Native Mac Dictation App"
date: 2026-02-19 09:36
categories:
  - General
tags: [macos, swift, open-source, productivity]
summary: Dictant is a lightweight, native SwiftUI Mac app for voice-to-text using OpenAI's Whisper API. No Electron, no bloat.
---

I love dictating text for working with agents. And honestly, for chatting on Telegram too. I often dictate posts for this channel by voice. The only problem is that Apple's built-in tools are terrible at recognizing Russian speech and even worse at punctuation — basically, using them is a pain. There are plenty of apps out there that can work with AI, even local models.

I already wrote about WhisprFlow, and there's the popular MacWhisper app. And they all suck. They're built on Electron, with cluttered garbage interfaces. You have to download gigabytes of junk.

So I started looking for something open-source, free, that I'd actually enjoy using with my own API keys.

I tried local models, and I didn't like them. I don't like the speed, I don't like the quality, and especially the fact that local models handle multiple languages poorly. When I switch between Russian and English, it's inconvenient.

Long story short, I built my own app — **Dictant** for Mac.
Pure native SwiftUI, pure OpenAI Whisper model.

I hold down the right Command key and dictate text. Half a second later it gets inserted into the active input field. And a little indicator appears next to my cursor — red when it's recording, green when it's processing. The app lives in the system tray, menu on right-click. You can enable auto-copy to clipboard. Automatically recognizes all languages.

Open source, distributed as a pkg — you'll need to go into Security settings to allow it. I've been using it for two months now, fixed most of the bugs.

[https://github.com/sbrin/Dictant/releases](https://github.com/sbrin/Dictant/releases)

What do you think?
