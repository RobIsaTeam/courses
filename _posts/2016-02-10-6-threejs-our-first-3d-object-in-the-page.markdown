---
published: true
title: 6 - ThreeJS - Our first 3D object in the scene
layout: post
---
_Learning objectives:_

* loading an STL file
* rendering a 3D object, using a mesh and a basic material 
* deeper understanding of camera attributes and object positioning 


Great, we have a scene, a camera pointed at it, nothing to look at, yet. 
Luckily we have our [3D object](link!), a monkey's brain ready to go. 

We want to load the image using the `THREE.STLLoader()` function we included earlier.
We'll have to wait until the file is loaded before we can assign a material to it and add it to the scene. 
Whenever we need to wait until an earlier step has finished, an easy way to do this is to use a callback function.

{%highlight javascript%}
var loader = new THREE.STLLoader();
loader.load( '/MonkeyBrain.stl', function ( geometry ) {
	console.log(geometry)
} );
{%endhighlight%}

Again, we are creating a ThreeJS-specific object (a loader), which means we use the `new` keyword. `THREE.STLLoader()` provides a `load()` function. Its arguments are the path to the file and a callback function for the loaded geometry. For now, all we want to know is if the file was loaded at all, and we can use a `console.log()` to find out. 

___

_Challenge: _
...maybe have a look at https://github.com/mrdoob/three.js/tree/master/examples/js/loaders to see what some other file formats are we could be loading? 

___ 

We can't show an object that doesn't have a material assigned. ThreeJS comes with a whole range of predefined materials. For now, we'll use a very basic one: `MeshBasicMaterial`. Any material has a whole range of attributes that we can define. For this one, we want to define the colour (a light grey: #E6E6E6) and also show the wireframe.

In our callback, we'll create our material:

{%highlight javascript%}
var material = new THREE.MeshBasicMaterial( { color: '#E6E6E6', wireframe:true } );
{%endhighlight%}


Now we can finally create our object form the loaded geometry and our material. ThreeJS, like many other 3D tools, thinkgs of objects in terms of a mesh. So we're creating this mesh, and add it to the scene, using `scene.add()`:

{%highlight javascript%}
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
{%endhighlight%}

The last step now is to render our scene (and giving an indication of when we're done to debug). Our renderer expects a scene and a camera and our scene contains our brain:

{%highlight javascript%}
renderer.render(scene, camera);
console.log('done')
{%endhighlight%}

___

_Challenge: Play with the basic material_
The material we use is documented [here](http://threejs.org/docs/index.html#Reference/Materials/MeshBasicMaterial). Make the brain transparent. 

___ 

