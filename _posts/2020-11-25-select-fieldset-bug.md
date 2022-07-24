---
layout: post
title: "HTML select with options blows up the fieldset"
date: 2020-11-25 11:43
categories:
- General
tags: [bug, web, html, dev]
---

It happens when the content of select option is longer than select input width and therefor it resizes the fieldset.

Here's the detailed description:

[https://stackoverflow.com/questions/17408815/fieldset-resizes-wrong-appears-to-have-unremovable-min-width-min-content/17863685](https://stackoverflow.com/questions/17408815/fieldset-resizes-wrong-appears-to-have-unremovable-min-width-min-content/17863685)

### Solution
The solution is to add `max-width: 0` to the fieldset.