---
published: true
title: Introduction
subtitle: Visualizing your data on the web using D3
layout: post
---

Open science should be visible science. And what better
way to make your research visible and accessible than putting it on the
internet. But no one wants to read endless tables of data. We’d rather
look at graphs, or, even better, have the possibility of interacting with the data.
And we have probably all created some graphs. But in order to make them
accessible to many people, we will have to move away from our specialized
software to a more universal platform - the internet.

In this course, we will look at a JavaScript library that is designed to create interative data-driven visualisations for the web: D3js.
D3js is good at all things we might need for effective data visualisation. Relating screen dimensions to data dimensions, dealing with changing data points, and displaying data as scalable vector graphics. There are other JavaScript libraries that are designed to help us make plots, but compared to D3, they are quite restrictive in what they allow us to make. If we want to make a custom and novel visualisations, D3 is the best option.

> ### Prerequisites and getting started
>
> You will need:
> * basic knowledge of Javascript. Check out [this course](../web-course/) for a refresher.
> * your preferred text editor, like [sublime](https://www.sublimetext.com/) or [atom](https://atom.io/)
> * your preferred web browser (we recommend Chrome)
> * to install [nodejs](https://nodejs.org/en/download/)
> * to install [live-server](https://www.npmjs.com/package/live-server) using npm (which came with nodejs)
>
> **To get started, download the files in [this folder](./getting_started.zip)**
>
> The resulting code of all lessons lives in our [GitHub repo](https://github.com/RobIsaTeam/courses/tree/master/_course_2_d3/code). If you're stuck on a challenge, you can check out the solutions in the corresponding file.

And this is the visualisation we will have by the end of this course:
<iframe style="position: relative; left: -120px; overflow: hidden;" scrolling='no' src="code/final.html" width="1000" height="600"></iframe>

> ### [Next Lesson: Setting the scene](./2-setup)


* We are using [gapminder data](http://gapminder.org) and the later lessons are based on an example by [Mike Bostock](http://bost.ocks.org/mike/nations/). In order to make this example slightly easier, we interpolated the data.
