---
layout: post
title: "The pomodoro timer for Flipper Zero!"
date: 2022-10-15 18:23
categories:
- General
tags: [petproject, dev, flipperzero]
---

[Flipper Zero](https://flipperzero.one/) is a portable Tamagotchi-like multi-functional device. I follow this project since the idea appeared in Pavel's mind. We had a good time working together on it's web presence at the very early stage. As soon as they announced the user apps feature I started to develop ideas of such applications. This app is made to make it easier to follow the Pomodoro time management method.

## Flipper Zero developer experience

This is my first try to do something bigger than "Hello world" with C language. Most of the code is a copy-paste from random pieces of the flipper firmware. I took the bluetooth keybord as a base because it had a similar structure and UI. I had no idea of typing and variables syntax. Everything was made by trial and errors method.

I can describe the current Flipper Zero developer experience as very convenient: the dev kit is awesome, the qFlipper app is very fast and useful.

There are some minor exceptions happen here and there but the main workflow is perfectly smooth.

## Pomodoro App for Flipper Zero

[Pomodoro App Github](https://github.com/sbrin/flipperzero_pomodoro)

![Pomodoro App for Flipper Zero](/assets/img/flipperzero-pomodoro.png "Pomodoro App for Flipper Zero")

Here we have three timers:

- Classic one 25/5 minutes
- Twice longer 50/10 minutes
- Superfast 10/2

Other features:

- Regular system clocks display
- Tomato counter which shows how many working cycles you've finished (up to 5 tomatoes)
- Rest timer

The device API is being changed every day so feel free to ask me for an update.

Current version is compatible with firmware v. F81999EA from 14 Oct. 2022