---
layout: post
title:  "Gira bike alarm!"
categories:
- Stuff
tags: [gira, bycicle, app]
summary: Plays sound when new bike appears
feature_image: "https://picsum.photos/2560/600?image=666"
---
<script src="https://unpkg.com/vue@3.2.37/dist/vue.global.prod.js" type="text/javascript"></script>

<style>
#gira_app {
    padding: 8rem 0;
    font-size: 6rem;
    line-height: 120%;
    text-align: center;
}
</style>

Gira station at Rua Cidade de Benguela has 18 bicycle docks. Here you can set a sound alarm depending on the number of bikes you need. It checks for bikes every 30 seconds.

<div id="gira_app">
</div>

<script async src="app.js" type="module"></script>