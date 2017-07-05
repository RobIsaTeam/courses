---
published: true
title: 1 - ThreeJS - Introduction
layout: post
tags: [threejs]
categories: [threejs, course, material]
---
When we publish research, our figures are often created to look good on paper. They are small, possibly greyscale, and, most importantly two-dimensional. But what, if our data is three-dimensional? Displaying data in more dimensions can give us and the readers the possibility to explore our data in a more intuitive way. 

Three.js allows you to create and display animated 3D graphics in a web browser, adding not just another spatial, but also a temporal dimension. 
Three.js ia a JavaScript library, which is good, because every browser can interpret our JavaScript code. It interacts with WebGL, which is the browser's way to interact with the user's graphics card (we need all the compute power we can get ;)).



* html (copy from old material)
* css  (copy from old material)
* threeJS setting the scene
  * create camera
  * scene
  * renderer
  * push into the html
* import .stl / .obj - but it's not there yet! 
* javascript(?) - cutting plane? (checkbox)
* zoom, pan, rotate (camera controls library) 
* create simple geometries
* clicking on an object in the scene
  * finding the coordinates (console.log()?)
  * creating a ray object
  * finding the closest object
  * doing an action based on the dot you click on