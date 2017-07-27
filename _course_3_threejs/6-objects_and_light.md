---
published: true
title: More objects and lights
subtitle: Adding our own objects. And let there be light!
layout: post
---

> ### Learning objectives:
>
> * including our custom objects in the scene
> * including a light source

Now that we have everything under control, let's go back to adding objects to the scene and also make our scene slightly more appealing by adding some natural light sources.

The goal is to visualise brain activity in certain spots on the surface of the brain. For starters, let's add some spheres and position them.

In the [docs](https://threejs.org/docs/) we can find SphereGeometry, that we can set up in the following way:

```js
var sphereGeometry = new THREE.SphereGeometry( 5, 8 ,8 );
```

Just like before, our geometry needs to be coupled with a material to make a mesh that we can then add to the scene.  

```js
var sphereMaterial = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
```

Lastly, we need to call the render function to update what we see on the screen.

```js
renderer.render(scene, camera);
```

Now let's change where our bubble sits in the scene.  
We do this in the very same way we set the position of the camera:

```js
sphere.position.set(-20, 50 , 80 )
```

> ### Challenge: Adding and positioning custom spheres 
>
> 1. Play with the 3 sphere parameters. See if you can make the ball look smooth.
> 1. Make 3 smooth, small, red balls that sit on the surface of the brain using `MeshBasicMaterial`. Alternatively, you might enjoy giving the brain some eyes...?
> 1. Use `MeshBasicMaterial` on the brain and give it a colour.
> 1. With this being done, it's time to play with another material. Find the Lambert material in the docs and apply it to all geometries.
> ...what just happened?! Inspect the scene carefully... are our spheres still there?

Time to get our brain back!
At the moment, it's dark in our virtual room. Let's add some ambient light:

```js
var ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white ambient light
scene.add( ambientLight );
```

> ### Note:
> If you refer back to the [diagram from lesson 3](../images/flow.png), you can see that we need to add the light before rendering the scene, just like we did with the spheres.


> ### Challenge: Natural shading
>
> 1. Naturally, there are different ways to illuminate your scene. Use [THREE.PointLight()](https://threejs.org/docs/#api/lights/PointLight) to create a point source. Brain and spheres should be back at looking three dimensional!
> 1. Then move it above the brain using the same command we used to move our camera and spheres earlier. You can also play the colours of your two light sources.


Here is what the scene should look like by the end of this lesson:
<iframe style="position: relative; left: -120px; overflow: hidden;" scrolling='no' src="code/lesson-06.html" width="1000" height="600"></iframe>

> ### [Next Lesson: Animating things!](./7-data_driven_animation)
