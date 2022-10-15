---
layout: post
title: "The most underestimated gaming platform?"
date: 2022-09-09 01:23
categories:
- General
tags: [story, web, dev, talk]
---

I believe nobody knows how astonishing browser games can be and how many advantages it has.
Engineers at Evolution are focused on creating the most accessible and immersive experience for our players using Web technologies!
Today I will show you why I think it is underestimated and what cool things you can do in browser.

## DOOM
But let me first share something more personal.
My first experience with 3D video games happened when I was 8 years old. 
I was lucky to be invited to use my father’s workplace to play DOOM for the fist time in my life.
This cover art exactly describes what I felt sitting in front of CRT display with Sound Blaster and stereo speakers maxed out.
I will never forget this feeling. Yes, I was really scared!
I have never experienced anything like that before. Of Course now it looks very simple. But at that time… That was insane!

## VR
My second overwhelming experience happened to me almost 20 years later
When the first oculus VR headset was released.
Actually it was the early adopters developer kit: it had a lot of gear needed to be set up, the screen resolution was very low, there were no any controllers and it had only three degrees of freedom.
But there were already plenty of games and demos which bring me the idea that the future is here. You could literally fly on a dragon, ride the roller coaster and it felt absolutely real. 

You may be surprised if I tell you that the next time I was astounded was when I joined Evolution two years ago. 
At that time I already had many years of web development experience behind. I worked with ReactJS, I knew about video streaming services, and had some experiments with 3D graphics.

But I couldn’t imagine how far people can go in their passion for engineering stuff and how powerful modern browsers are.

## Onboarding
In Evolution we have a tradition that every new engineer has to pass a two weeks onboarding. 

The interesting part of this process is that you must play all these games we have.

Literally: we reserve several days only for playing games.

I believe this is a great way to impress and motivate newcomers.

Here is what I learned during that time.

## Live Casino
Let’s take a look at this variation of classic casino game - Lightning Roulette.

I was like: what is this thing? Is that a TV show? A video game? A Twitch stream? What’s happening there?

It’s a bit complicated…

There is a live video stream from one of our studios. We can see this nice game presenter, a roulette wheel, a big screen and many other physical props.
On top of this video there is a beautiful UI.

It has a betting grid the same as you could see on a real roulette table, the common UI like settings, balance, help section and other stuff — there is a chat feature!

Let’s think about what is happening there:
- Players place bets with web app
- Which sends all data to server
- There is a video stream from studio with several cameras on different angles
- The game presenter interacts with players through Dealer UI which is hidden behind the camera
- the screen on the back shows the multipliers generated in real time with Unreal Engine
- The ball is being automatically pushed to the wheel which is always spinning
- When the ball stops in the pocket it is being scanned and sent to server
- The player UI is updated with the results
- The game presenter congratulates winners!

BOOM!

And it works perfectly on every mobile device. Amazing?

This is just a ReactJS application with some canvas animations. With a lot of mechanical and electrical engineering behind the scenes.

## First Person Experience
What can we do to provide a more immersive experience?
Make a video game!

So we made a 3D version of the Lightning Roulette!

We call such games the First Person. Maybe to pay a tribute to the first person shooters like DOOM :)

Now it’s a 3D scene with a Roulette table. You can place bets like in real life by placing chips on the table or dragging it around. The ball is spinning and falling exactly on a specific pocket. The outcome is generated randomly on the server side.

I was impressed by the amount of details here: the shadows, the materials, textures, the reflections on the floor, and how smooth the animations are.

And we are still in the web browser! And it still works perfectly on any mobile device! Made with React, WebGL and BabylonJS library.

## Lightning
You may have noticed that lightning strike animation.

One of the first implementations was made using animated sprite image. Yes, the good old sprite animation from 90s which you can see in DOOM.

Game artists were generating all these frames and sent us a quite big PNG image. Unfortunately such images are too big to use on the web - it really affected the loading time.

We definitely needed something different. So we start thinking: what lightning is?

A sequence of branches one coming from another. A tree! A very sophisticated randomized tree algorithm. 

We can draw a stem as a simple line in 3D space, then find some points in between and change the direction and add more and more lines.

After several attempts we’ve got a pretty customisable lightning strike generator.

- This costs just a few kilobytes of code. 
- No need to ask game artists for images. 
- It can be any shape or size and any color you like!
- The magic of software engineering.


## Shaders
Speaking about magic: one thing caught my attention because I couldn’t explain how it is made.

These smoky clouds and flying stars - what is that?
Maybe you can tell?
Animated GIF? A video recording? Canvas or CSS animation?

It is a shader! And shaders appear to be a part of WebGL specification!

A little side note if you are confused as I was:

“Shader is a computer program that calculates the appropriate levels of light, darkness, and color during the rendering of a 3D scene”

Long story short: it is a procedural graphics generation language called GLSL which is widely used in 3D graphics. It renders purely on the GPU and is really efficient.

And all these beautiful effects are just ONE kilobyte of code! 

Actually in theory it is possible to generate any object or the scene using shaders.

It will just take a lot of time :) But you won’t need any models or textures for that. Only pure GLSL code.

This is an example of animated shader:

And this is the code. The magical mystery 500 characters:

Don’t ask what’s happening here — all I can tell is there are a lot of mathematical operations. [Watch yourself](https://www.shadertoy.com/view/flKyzG).

I recommend you to check out the shaders of the day. They are insane. People even generate SOUND with shaders and pass it to Web Audio API. But it’s more like a proof of concept than practical advice.

People usually think this is reserved for "real" games but it works on the Web through WebGL.

## Physics
Let’s check out another game. There is one thing I want to show.

Craps is a dice game in which players bet on the outcomes of the roll of a pair of dice.

(This is all a 3D scene by the way)

For starting the game we could make just a simple button, like a spin/rebet one from the previous case.

But! Beside that our engineers implemented a physics simulation of throwing the dice!  Like angry birds, but in 3D.

This is a BabylonJS feature, but it relies on on of many physics simulation libraries There are many ways to use it - for example here you can see explosion animation followed by hurricane effect.

In our case the outcome is still randomly generated by the server, but the collision animation made me feel it’s real.

## Magic curtain
The next one was really surprising for me.

On this screen we have a slot machine with barely visible video on the background behind the curtain

If you gaze long into the curtain, the curtain starts gazing at you :) And you may notice that:
- The coins are rotating, just a little
- The elements always has random order
- It has randomly placed shiny glares
- It is infinite long and responsive

How is it made?

What comes to my mind first is this could be a bunch of animated GIF images. But no, it would be too big and low quality with no alpha-channel and costs extra HTTP requests.

Maybe we can use some PNG images and generate a grid with JavaScript and animate it with CSS… 

But it seems to me our engineers would be still unhappy with that: you have to generate hundreds of HTML elements and somehow randomize the animation start time otherwise everything would look synchronous and fake and be less performant.

Luckily we have some smart guys. So they made it with WebGL and shaders!

There is only one tiny image sprite used which is about 10 kilobytes.

We had that slot machine already made by using a small 3D library called [OGL](https://github.com/oframe/ogl) so we used it for curtain animation as well. 

The lines itself, coins rotations and sparkle animations are made using shaders.

The result is lightweight, customisable, responsive and performant. Made with pure JS! Rendered and animated with GPU!

## Mixed reality
Allright! The last stop in our journey is the Gonzo Treasure Hunt live show.

At first glance it seems like nothing special here.
We already know most of the components involved.

Just a quick recap:
- This is a video stream from studio
- 3D graphics in background renders with Unreal Engine
- The player UI
- The dealer UI

But there is a tiny button added at the top of the screen. It turns out this game is also playable in VR mode! Look:

This is an absolutely different video stream.  And there are two cameras used to make a 3D effect.  This character walks around and sometimes interacts with a player. 

But we had one problem: in the 3D world there are no HTML elements at all. No React JSX or CSS.

For that reason the whole user interface was recreated with 3D graphics.  Buttons, sliders, inputs - all of that are 3D objects.

You can rotate your head and use your controllers to press buttons - do everything you would expect in VR.

So what a combo we’ve got: a video stream, unreal engine, web interface, VR and 3D graphics in a web browser. 

On any device. Could you imagine that?

## Conclusion
For a long time I thought that there is a world of serious game development where people do really cool 3d games for consoles, high-end PCs.

The world of 3D optimisations, GPU shaders computation, shadows and reflections, realistic physics and virtual reality.

But it all appears to be available for any javascript engineer.  There are many tools and libraries available now. It is all easy to use and share with others. And players don’t have to install or download any software or buy any specific device to play it.

The future is now!

Trust me! At Evolution we have built world-famous games just using the web browser.

