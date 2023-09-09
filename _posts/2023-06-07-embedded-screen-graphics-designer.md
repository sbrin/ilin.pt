---
layout: post
title: "Lopaka - Embedded graphics designer and code generator tool"
date: 2023-06-07 11:12
categories:
- General
tags: [app, petproject, dev]
summary: I've decided to move forward towards my dream of passive income, fame, and recognition for creating something useful. At the same time, I'm studying how startups are made and going through the founder's journey. So I won't limit myself to just Flipper. Now it's a universal graphics editor for low-resolution screens on outdated chips 🤡 Meet Lopaka...
feature_image: "https://ilin.pt/assets/img/2023-06-07-embedded-screen-graphics-designer/lopaka-screenshot.png"
---

I've decided to move forward towards my dream of fame, and recognition for creating something useful. At the same time, I'm studying how startups are made and going through the founder's journey. Not very intensively, in the breaks between my main job, little by little.

So I won't limit myself to just [Flipper](/stuff/fui-editor). Now it's a universal graphics editor for low-resolution screens on outdated chips 🤡

**The problem**: it is tiring to create a beautiful interface for electronic devices.

**The solution**: a cross-platform graphic editor with a code builder and component library. Supports popular GUI libraries: Flipper Zero canvas API, U8g2 for monochrome displays, Adafruit GFX Library, embedded-graphics under Rust, LVGL, and more. Accessible from any device and OS via a web application, collaborative work, prototyping, and everything else that Figma is loved for.

My cursory analysis of existing solutions did not yield results: I found only one editor close in functionality (SquareLine) and it is ten years behind and only works with LVGL. Everything else is poor makeshift versions that need to be downloaded, configured, and installed - in general, it is a real headache. For u8g2, there is nothing like it at all.

Do you think it will take off?

### Meet Lopaka with U8g2 and Arduino graphics!

I've added support for the most popular library for monochrome displays, [u8g2](https://github.com/olikraus/u8g2), created a new repository, and bought a beautiful domain.

Now it's LOPAKA (guess where that name comes from):

[https://lopaka.app](https://lopaka.app)

[https://github.com/sbrin/lopaka](https://github.com/sbrin/lopaka)

Features:
- You can choose which library the code will be generated for
- You can change the screen size (Flipper only has one size)
- Images are automatically converted to XBMP
- There are four different fonts to choose
- A pixel grid has appeared
- Settings are stored in local storage
- You can make drawings
- Press **Shift** key to draw straight lines and square frames

![Lopaka u8g2 editor](/assets/img/2023-06-07-embedded-screen-graphics-designer/lopaka-screenshot.png "Lopaka App for embedded screens")

### How can you help?

If you like the project and you're an engineer or designer of electronic devices with screen interfaces and are ready for a small interview - I'll be insanely happy to chat. Drop a line to [@ilin_pt](https://twitter.com/ilin_pt) or lopaka@ilin.pt

If you know someone with experience in developing such devices, tell them about this project. Or help me get an interview with them 🥹

Maybe there are some public figures on YouTube or Twitter that I could invite for an interview (especially English-speaking)? Please write in the comments.

### Support this project

You can become a sponsor — see sponsorship options on my [GitHub profile](https://github.com/sbrin/lopaka) ❤️
