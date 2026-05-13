---
layout: post
title: "Meet @clawmother_bot — OpenClaw in Two Minutes"
date: 2026-03-15 12:30
categories:
  - General
tags: [openclaw, telegram, clawmother, launch]
summary: "@clawmother_bot lets you create your own OpenClaw assistant in Telegram in under two minutes, with pre-configured OpenRouter access, Telegram Stars payments, and isolated Google Cloud hosting."
---

I built @clawmother_bot — a Telegram bot where you can create your own OpenClaw assistant in two minutes. I experimented with hosting for a long time, tried different models, and settled on this setup:

**Works out of the box**
You immediately get a dedicated OpenRouter key — that's a universal provider for accessing any LLM models. And there's a one-dollar balance for token expenses right away.

By default, it uses the Kimi 2.5 model — powerful enough to start configuring and playing around, yet cheap enough that one dollar lasts a while. I experimented with free models and realized they're more harm than help.

**Payment via Telegram**
Your token balance is topped up with Stars right through the bot. You can later pick any top-tier model (just ask your claw bot). The main thing is having enough money for token payments. But the most optimal option is an OpenAI Codex subscription, which you'd pay for separately and then configure directly through your OpenClaw agent. Then you won't have to mess with keys and tokens.

After the trial period ends, you need to subscribe to continue using your agent. I've integrated payment via Telegram Stars. That's the simplest payment method available to everyone.

**Reliable hosting**
I tried various hosting options and ended up setting up my own cluster in Google Cloud. Inside this cluster, isolated containers are created for each client. I need convenient and flexible infrastructure to provide quality service.

So each agent gets its own isolated environment, its own dedicated OpenRouter key, a connected Telegram bot, and 10 GB of disk space. All keys are passed to your container during installation and aren't stored anywhere in the service. I tried to make the setup process as secure as possible.

**Low barrier to entry**
First week is free. You can just open the bot and in a couple of minutes get your own claw right in Telegram. It's important to me that everyone can try this technology and decide for themselves whether to continue.

**Ready to work**
I manually built the system image so most necessary packages are included from the start. Otherwise OpenClaw wastes a ton of time installing browsers, connecting skills, configuring APIs, or vibe-coding. I want tokens spent on actual work, not system maintenance.

Killer feature: if you have questions, you can message @clawmother_bot directly and I'll personally reply and try to help.

