---
published: true
title: Objects
subtitle: Our first 3D object in the scene
layout: post
---

> ### Learning objectives:
>
> * loading an STL file
> * rendering a 3D object, using a mesh and a basic material
> * deeper understanding of camera attributes and object positioning

Great, we have a scene, a camera pointed at it, nothing to look at, yet.
Luckily we have our [3D object](link!), a monkey's brain ready to go.

We want to load the image using the `THREE.STLLoader()` function we included earlier.
We'll have to wait until the file is loaded before we can assign a material to it and add it to the scene.
Whenever we need to wait until an earlier step has finished, an easy way to do this is to use a callback function.

```js
var loader = new THREE.STLLoader();
loader.load( '/MonkeyBrain.stl', function ( geometry ) {
	console.log(geometry)
} );
```

Again, we are creating a ThreeJS-specific object (a loader), which means we use the `new` keyword. `THREE.STLLoader()` provides a `load()` function. Its arguments are the path to the file and a callback function for the loaded geometry. For now, all we want to know is if the file was loaded at all, and we can use a `console.log()` to find out.

> ### Challenge:
> ...maybe have a look at https://github.com/mrdoob/three.js/tree/master/examples/js/loaders to see what some other file formats are we could be loading?

We can't show an object that doesn't have a material assigned. ThreeJS comes with a whole range of predefined materials. For now, we'll use a very basic one: `MeshNormalMaterial`. Any material has a whole range of attributes that we can define.

In our callback, we'll create our material:

```js
var material = new THREE.MeshNormalMaterial( {visible: true} );
```

Now we can finally create our object form the loaded geometry and our material. ThreeJS, like many other 3D tools, think of objects in terms of a mesh. So we're creating this mesh, and add it to the scene, using `scene.add()`:

```js
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

The last step now is to render our scene. Our renderer expects a scene and a camera and our scene contains our brain:

```js
renderer.render(scene, camera);
```

> ### Challenge: Play with the material
> The material we use is documented [here](http://threejs.org/docs/index.html#Reference/Materials/MeshNormalMaterial). Make the brain transparent.
> Then try using [MeshBasicMaterial](http://threejs.org/docs/index.html#Reference/Materials/MeshBasicMaterial) and see if you can make the wireframe visible.
