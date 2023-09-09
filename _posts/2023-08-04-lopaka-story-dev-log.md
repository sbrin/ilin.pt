---
layout: post
title: "The story of Lopaka: How I made Graphics Editor for Arduino, ESP32, FlipperZero"
date: 2023-08-02 08:56
categories:
- General
tags: [dev, lopaka]
summary: Read the full story of Lopaka — my pixel graphics and interface editor for projects on Arduino, ESP32 or STM. It was painful to see how embedded developers suffer when creating their interfaces, and I decided to ease their pain.
feature_image: "https://picsum.photos/2560/600?image=888"
---

Let me tell the story of the creation of my pet project.

[Lopaka](https://lopaka.app) is my pixel graphics and interface editor for projects on Arduino, ESP32 or STM. It was painful to see how embedded developers suffer when creating their interfaces, and I decided to ease their pain.

I have loved drawing and computers since my childhood 😀 I have been involved in web development for over 10 years. I've gone through all stages: amateur designer, self-taught PHP programmer, freelancer with turnkey websites, frontend developer, team leader.

## The Prototype

It all started with the hyped launch of [Flipper Zero](https://flipperzero.one/) on Kickstarter. When I got the device (after two years of waiting 🤡) the first thing I did was start studying its firmware. As an experiment, I made a [Pomodoro timer](/2022/10/15/flipper-zero-pomodoro.html) application and suffered a lot in the process of drawing the interface.

It turns out that creating an interface for embedded devices is incredibly tiring. You have to manually calculate the size of the elements, indents, text position. **Any small change makes you recalculate everything from scratch by cells.**

For me it was a huge shock to find out that there is not a single convenient tool in the world for editing graphics and generating code for physical devices.

Before I even finished the Pomodoro, I decided to try to ease my suffering and make a simple editor interface with the possibility of export.

This is what the first version looked like, which I cobbled together over a weekend. You could draw shapes and get ready code for flashing Flipper at the output.

![flipper-zero-editor-prototype](/assets/img/2023-08-04-lopaka-story-dev-log/flipper-zero-editor-prototype.jpg "flipper-zero-editor-prototype")

I liked how quickly I was able to sketch a prototype and I continued to add new tools and improve compatibility with the Flipper API.

A month later, I put together an interface in Figma, added basic functions, and posted it on my telegram and twitter.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Finally! <a href="https://twitter.com/hashtag/flipperzero?src=hash&amp;ref_src=twsrc%5Etfw">#flipperzero</a> canvas UI editor and code generator. Still has many things to improve but it works perfect!<br>What feature to add next?<br>INB4: more fonts, more tools, custom images.<a href="https://t.co/NiEQrSGtXB">https://t.co/NiEQrSGtXB</a> <a href="https://t.co/PSGhwJG7iw">pic.twitter.com/PSGhwJG7iw</a></p>&mdash; Mikhaíl Ilín (@ilin_pt) <a href="https://twitter.com/ilin_pt/status/1600944438892589056?ref_src=twsrc%5Etfw">December 8, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Got a good reach, likes-reposts from Flipper fans. Even Hackaday [wrote about it](https://hackaday.com/2022/12/10/flipper-zero-hacker-tool-gets-ui-editor-for-custom-apps/) (from which there was the most traffic). The project was also added to the list of software for Flipper.

And I successfully forgot about it for several months. During this time, it scored about 50 stars on GitHub. 10-20 users visited the project page every day. Not much, in general.

![flipper-zero-editor-preview](/assets/img/2023-08-04-lopaka-story-dev-log/flipper-zero-editor-preview.jpg "flipper-zero-editor-preview")

## Turning Point

While digging into the source code of Flipper, I found out that they use a very popular library, [u8g2](https://github.com/olikraus/u8g2), underneath. It's literally the standard for monochrome displays.

The puzzle began to assemble into a picture: on one side are the developers of electronic devices. On the other side are interface designers. And between them, apparently, is a huge abyss. It's very difficult to ensure "pixel-perfect" in a rapidly developing project. Developers spend a lot of time writing the rendering of the interface by hand.

There are a bunch of convenient tools for web development. You can export ready-made code from Figma. For mobile devices, there are powerful systems with the generation of a ready-made application. What do electronics engineers have? A ruler and a calculator? Maybe I'm missing something?

##### What are the popular tools for drawing graphics for monochrome screens?

My quick analysis of existing solutions yielded no results: I found a single editor close in functionality (SquareLine) and it is ten years behind life and only works with LVGL. Everything else is shoddy knee-jerk work that needs to be downloaded, configured, installed - in short, a real hassle. There is nothing at all like this for u8g2. Okay, for rich graphics on Linux-ARM devices there is powerful QT. But what should Arduino users do? [Tell me if you know](mailto:lopaka@ilin.pt).

### It's time!

Decision made: now it is a universal graphics editor for low-resolution embedded screens!

I added support for the most popular library for monochrome displays u8g2, created a new repository, started a new twitter and bought a beautiful domain [https://lopaka.app/](https://lopaka.app/)

It works right in the browser, no need to install anything. At the output, it generates ready-made source code. Just copy and paste into your project.

![Lopaka u8g2 editor](/assets/img/2023-06-07-embedded-screen-graphics-designer/lopaka-screenshot.png "Lopaka App for embedded screens")

I agreed about the repost in a friendly channel in Telegram and Twitter, the Flipper community also joined. Result: 145 stars on Github and 85 followers on Twitter. Already better!

That very tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://t.co/V0uF3FJTwh">https://t.co/V0uF3FJTwh</a> is my graphics and interface editor for <a href="https://twitter.com/hashtag/Arduino?src=hash&amp;ref_src=twsrc%5Etfw">#Arduino</a>, ESP32 or STM projects. It was painful to see <a href="https://twitter.com/hashtag/embedded?src=hash&amp;ref_src=twsrc%5Etfw">#embedded</a> developers struggle to create GUI, so I decided to make life easier for all of us. Works right in your browser. Generates ready-to-use source code <a href="https://t.co/FknWJLJsnp">pic.twitter.com/FknWJLJsnp</a></p>&mdash; Lopaka (@lopaka_app) <a href="https://twitter.com/lopaka_app/status/1668248090313146371?ref_src=twsrc%5Etfw">June 12, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I still hope that someday I will be able to successfully enter the Arduino community and get a like-repost from them.

## Future Plans

There's still a lot of work ahead, but I'm not in a hurry. Following the precepts of experienced startupers, I started conducting interviews with the potential audience. Huge thanks to everyone who helped me with this. This is really the most useful thing you can do at the start of a project.

I talked to the Flipper team and several leading engineers from other projects. Learned a lot about hardware product development and met interesting people.

So far, it feels like a successful idea and many teams lack a convenient tool. But the scale of the problem is unclear — it may turn out that there are only a dozen or two such teams in the whole world. That would be sad.

There is also a trend to transition from STM-ESP to modern ARM chips, with which you can assemble cheaper devices with a color display and low power consumption. And there is already a lot of suitable software (although none offers cloud features and teamwork).

Right now in Lopaka you can:
- draw basic shapes
- write text in different fonts
- insert images
- generate ready-made code for u8g2 and Flipper Zero
- convert images to XBMP

My plan is to expand the audience as much as possible, add Adafruit GFX and LVGL. These will already be color displays and a more complex code generator. We'll see how it goes.

The long-term goal is to make Figma for embedded devices. With project synchronization, prototyping, teamwork, comments, and a bunch of other stuff. Access from any device and OS through a web application, prototyping, and everything else that people love Figma for.

Right now I'm experimenting with low-code, I really liked how quickly you can assemble an application, including the server part, with Noodl. I am already preparing a version of the application with registration and SMS for a limited audience. There you will be able to save projects in the cloud and store several screens in one project at once.

If you want to try it first — sign up through the form: https://airtable.com/apps27BkejrUF0DWT/shrrfgmWJQnhM0dGY

## What's inside?

This is a simple application on VueJS and pure JavaScript. Canvas is used for rendering. I'm not chasing super fast or high-quality code. It's important for me that the application solves the user's tasks.

The source code is open: https://github.com/sbrin/lopaka

The main difficulty was providing a complete WYSIWYG pixel-perfect effect. So that what we see in editor 1 in 2 matches what you will see on the device. I had to figure out the format of fonts used in electronics, convert them and display them beautifully in the canvas.

I have long loved Vue for its simplicity and accessibility. After several years of working with React, I still couldn't accept its absurd concepts, which are presented as advantages (maybe organize a battle?). I can write a Vue application in a notepad without the internet and run it without installing additional crutches.

The main concept I follow: applications should not have a build stage, which includes code compilation and creation of executable files.

Instead, the idea is proposed that the application should be easy to start in any environment without the need for a build.

Familiar? Yes, the global scope and a zoo of JS files are back in fashion. Bring back my 2007 😄 Docker? Well, I don't know, maybe.

Okay, I understand that with increasing complexity, all this collective farm will not be able to be maintained in working condition. So in the future, I will probably have to rewrite everything in TypeScript and smear it with webpacks.

## Monetization?

The project is open and free. I use CloudFlare Pages instead of static hosting. I only spent money on the domain.

But as soon as there is a cloud, this question will become more acute. In my fantasies, there is an open project for everyone on Github and its cloud version with a subscription payment model.

Income is now zero. **You can become my sponsor on Github**:
[https://github.com/sponsors/sbrin?o=esb](https://github.com/sponsors/sbrin?o=esb)

## Help me to develop this project

What I lack most is feedback. It's unclear if anyone needs such a tool.

If you like the project and you are an engineer or designer of electronic devices with screen interfaces and are ready for a short interview - I would be extremely happy to chat. Write to me, create issues on Github, make retweets.

If you know someone with a lot of experience developing such devices, tell them about this project. Or help me get an interview with them 🥹 Maybe there are some public figures on YouTube or Twitter, who I could invite for an interview (especially English-speaking)? Please write in the comments.

The project is in alpha version, I am just starting it. I really need feedback and invite everyone to try. Share ideas, ask questions and criticise!

Follow me on twitter: [https://twitter.com/ilin_pt](https://twitter.com/ilin_pt)

Get Lopaka updates: [https://twitter.com/lopaka_app](https://twitter.com/lopaka_app)