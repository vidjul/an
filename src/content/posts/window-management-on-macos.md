---
title: Window management on MacOS
slug: window-management-on-macos
date: 2024-02-23
excerpt: How rcmd fixed me troubles I had for years
---

## About MacOS

My main OS has become MacOS since the end of 2021, when I bought my M1 laptop. I have used it for everything since then, from coding, and photo editing to entertainment. The only exception is gaming, which I could also use, as I'm running my games via [Shadow](https://shadow.tech/) Cloud PC (If interested, [here](https://eu.shadow.tech/shop/invite/4CF4236) is my referral link).

I started on Windows for years before switching to MacOS in 2012. The iMac I was running it on became my main device until 2018 when it completely crashed after starting a game of League of Legends (might be because of that, but no more gaming on my Mac since then... 😅)

I then switched back to Windows while sometimes playing with Ubuntu too. During that period, Ubuntu was the 2nd OS on my laptop and the only one on my work laptop. A few months after WSL came out, I completely stopped using my Ubuntu partition on my laptop: at home, I was fully on Windows and relying on WSL when I needed to access Linux tools (hence [this article](https://vidu.sh/an/posts/optimize-pass)).

Today, both my personal and work machines are running MacOS, while I still keep the old one to run Shadow's client via Windows (I feel it is less slow somehow).

I've switched back to MacOS because I simply enjoy using it. It feels smooth and reliable and I rarely really had issues with it (except for that massive crash and infinite loop boot since then on my iMac). I love the small features and details (such as Quick Look, which I miss every time I am on any other OS). Since M1, the autonomy is great too and I had nothing like it before.

MacOS is quite streamlined for my needs and while I believe I can't have the same level of freedom and customization I had on Ubuntu for instance, I am quite okay with that.

I think I also appreciate MacOS because most of the tools I follow/enjoy are only available/start by getting released on MacOS ([Warp](https://www.warp.dev/), [Raycast](https://raycast.com/), [Zed](https://zed.dev/), [Arc](https://arc.net/)...). Lastly, Apple's ecosystem is genuinely great.

As I am also running on an iPhone, having a Mac and MacOS along improves my day-to-day experience (That ecosystem thing is somewhat frightening too, it makes me think that both times when my main machine was a Mac, I had an iPhone too...).

## The main issue

Beyond all these praises, there is still one issue with MacOS I had even since the first time in 2012. No suspense, as you have already read the title: IMO, **window management on MacOS isn't great at all.**

I had nothing particular on Windows or Ubuntu (while I seriously wanted to try a tiling window manager like i3) yet I could find my opened windows quickly.

I believe it is because, on MacOS, we don't have a _clear view_ of the currently opened windows and quick ways to access them. Cmd + Tab is not practical, it allows one to navigate through apps only and we don't have the previews either. Mission control is okay for getting this overall view but I find it too slow to get the to the app I want as fast as possible.

## How I mitigated this

I have tried several solutions to circumvent these:

- [AltTab](https://alt-tab-macos.netlify.app/): I have tried this for weeks, and although it was quite convenient, I wasn't convinced in the end and gave up.
- [yabai](https://github.com/koekeishiya/yabai): Jumped for the tiling window experience when I was able to! Unfortunately, some windows weren't reacting well and there was some learning curve. Also, to be able to have all the features, we had to disable SIP on the machine and it is something I can't do on my work machine.

At one point, I ended up either using my apps in full-screen mode or having dedicated spaces for them. By doing this all I had to do was switch between the spaces through the dedicated shortcuts (CTRL + numbers).

This was quite okay, but spaces tend to change when plugging in / plugging out an external monitor. So each time, I had to take a few seconds to organize my spaces in the correct layout. At first, I tried to figure out a tool to automatically do this for me, but I didn't manage to get one.

I ended up discovering the tool that matches my needs the most when coming over [rcmd](https://lowtechguys.com/rcmd/).

> The ⌘ command key on the **right side of the space bar** is almost never used, so we found a clever way to take advantage of it!Hold down **rcmd** and press the **first letter of the app name** to focus apps instantly.When pressing the key while the app is already focused, you can choose to **hide** the app or **cycle** to the next app with the same first letter.

Thanks to rcmd, I now don't need to memorise the order of my spaces: typing the first letter of the app I want to get allows me to get directly to it!
