---
layout: post
title:  "Gira alarm"
categories:
- Stuff
tags: [gira, bycicle, app]
summary: Plays sound when new bike appears
feature_image: "https://picsum.photos/2560/600?image=666"
date:   2022-07-10
---
<script src="https://unpkg.com/vue@3.2.37/dist/vue.global.prod.js" type="text/javascript"></script>

<style>
#gira_app {
    padding: 4rem 0;
    font-size: 6rem;
    line-height: 1.3;
    text-align: center;
}

.gira-button {
    cursor: pointer;
    line-height: 1.5;
}

.gira-input-number {
    border-radius: 1rem;
    width: 4rem;
    text-align: center;
}
</style>

"Gira" station #133 at Rua Cidade de Benguela has 18 bicycle docks. Here you can set a sound alarm depending on the number of bikes you need. It checks for bikes every 30 seconds and plays the alarm sound if the station has sufficient bikes available. Unfortunately we don't know what kind of bike it is.

<div id="gira_app">
</div>

<script async src="app.js" type="module"></script>