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

**The problem**: it is tiring to create a beautiful interface for electronic devices.

**The solution**: a cross-platform graphic editor with a code builder and component library. Supports popular GUI libraries: U8g2, Adafruit GFX, Flipper Zero canvas API, embedded-graphics under Rust, LVGL, and more. Accessible from any device and OS via a web application, collaborative work, prototyping, and everything else that Figma is loved for.

My cursory analysis of existing solutions did not yield results: I found only one editor close in functionality (SquareLine) and it is ten years behind and only works with LVGL. Everything else is poor makeshift versions that need to be downloaded, configured, and installed - in general, it is a real headache. For u8g2, there is nothing like it at all.

**Read the full story of creation of Lopaka in my blog: [The story of Lopaka: How I made Graphics Editor for Arduino, ESP32, FlipperZero](/general/2023/08/02/lopaka-story-dev-log.html)**


### Meet Lopaka with U8g2 and Arduino graphics!

I've added support for the most popular library for monochrome displays, [u8g2](https://github.com/olikraus/u8g2), created a new repository, and bought a beautiful domain.

[https://lopaka.app](https://lopaka.app)

[https://github.com/sbrin/lopaka](https://github.com/sbrin/lopaka)

Features:
* pixel perfect editor
* various screen sizes
* many draw shapes and tools
* popular fonts support
* use custom images
* auto-generate XBMP graphics
* move, resize, edit elements
* u8g2, AdafruitGFX, Uint32 bitmap, FlipperZero export
* generate the source code in C/C++
* FlipperZero live preview
* select zoom scale


[Release notes](https://github.com/sbrin/lopaka/releases)

[Keyboard shortcuts](https://github.com/sbrin/lopaka/wiki/Keyboard-shortcuts)

![Lopaka u8g2 editor](/assets/img/2023-06-07-embedded-screen-graphics-designer/lopaka-screenshot.png "Lopaka App for embedded screens")


### How can you help?

If you like the project and you're an engineer or designer of electronic devices with screen interfaces and are ready for a small interview - I'll be insanely happy to chat. Drop a line to [@ilin_pt](https://twitter.com/ilin_pt) or lopaka@ilin.pt

Tell your friends and colleagues about this project. And help me get an interview with them 🥹


### Support this project

You can become a sponsor — see sponsorship options on my [GitHub profile](https://github.com/sbrin/lopaka) ❤️

### Follow Us on social media:

https://twitter.com/lopaka_app

https://www.instagram.com/lopaka_app/
