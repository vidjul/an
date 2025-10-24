---
title: Long time no see
slug: long-time-no-see
date: 2024-01-12
excerpt: Quick updates and next moves for /an.
---

## 2025 update

I've stopped using Ghost and moved to [Velite](https://velite.dev/). As I am not a frequent poster on this website, the monthly subscription was not worth it for me.
I've lost the wonderful editting experience I had with Ghost, but I am coming with something new to replace it. Will talk about it on my next post!

## Hey, 2024!

The last article I've written for this website dates back **4 years**.

Since 2020, there have been a lot of changes. I don't even use Pass to manage my passwords anymore, nor WSL, as I've fully moved to MacOS since then for everything that doesn't involve gaming.

For a few months, I have been motivated to post here for a couple of reasons actively:

- It seems that, according to analytics, **at least 100 people bump into this website each month**. However, few don't go beyond the home page or the About page. I want to see if I am capable of providing relevant content for the curious people who somehow manage to get through here.
- I got a new job where I am currently part of a whole product and tech department. I have started to enjoy sharing my work, thoughts, and opinions with a broader audience than my direct team and I am personally convinced that using this space to do the same will help me grow as a software engineer.

For 2024, I also wanted to commit myself to a side project I can enjoy building and be proud of. As this website is probably one of the no-work-related git repositories that have been published, I believe it can be not only that side project but also a lever to learn in public and motivate me to work on other cool stuff.

## How do I plan to be consistent?

_The following section will be updated whenever I find any blockers that prevent me from being consistent._

### My tools don't provide me with the best conditions for writing

I used to write my posts as Markdown files and render them with MDX. The setup itself was quite okay for me and I've also loved the fact that the posts were readable as plain text from the repository hosted on GitHub.

But, writing the post in VSCode was not very pleasant. Using text editors that are more convenient for writing content rather than editing code was an option I've also tried, but it started to bother me when I wanted to add non-text content such as images as I had to import back the images in a separate directory and manually do the imports in the Markdown files.

I have also been using [Contentlayer](https://contentlayer.dev/) as a content SDK to add metadata and types for my blog posts and the library [doesn't seem to be maintained for now](https://github.com/contentlayerdev/contentlayer/issues/429), it encouraged me to try something new.

I've ended up using [Ghost](https://ghost.org/) to manage my blog content. This post was written inside its text editor and the experience was smooth. Ghost seems to have a lot of powerful features, but for now, at least, I'm only using it as a headless CMS to provide content for the website that still runs on NextJS.

Since I have decided to use NextJS on /an, I always enjoyed the moments when I was tinkering with and experimenting with new ideas. Committing to Ghost allows me to have a great writing experience while still being able to play with NextJS now and also enables me to access more advanced features that can be useful for the blog if I need them at one point.

As Vercel provides deployment webhooks, it was also very simple to automatically sync the content of my NextJS site hosted there with Ghost.
