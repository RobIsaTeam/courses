---
published: true
title: Introduction
subtitle: Why ThreeJS? ...and what are we doing?
layout: post
---
When we publish research, our figures are often created to look good on paper. They are small, possibly greyscale, and, most importantly two-dimensional. But what, if our data is three-dimensional? Displaying data in more dimensions can give us and the readers the possibility to explore our data in a more intuitive way.

Where plotting libraries restrict what we can do, Three.js allows you to create visualisations in a web browser. These can be easily be animated, so we're not just another spatial, but also a temporal dimension. Three.js is a JavaScript library, which is good, because every browser can interpret our JavaScript code. It interacts with WebGL, which is the browser's way to interact with the user's graphics card (we need all the compute power we can get ;)).

In this course, we want to visualise some data that was published in the Science journal. In this paper, the activity in different brain areas in response to a visual clue are shown for a monkey. We'll set up a scene in which we'll see a brain. On the brain, expanding and contracting spheres will display the measured brain activity. Upon selection of any of those active brain regions, we'll show a more detailed related plot. We'll show a little movie in front of the monkey brain that shows the stimulus the monkey was given. And since it's all in 3D space, we'll add controls to move around in the scene and some cozy lights. 
