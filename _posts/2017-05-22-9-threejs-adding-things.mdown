---
published: true
title: 9 - ThreeJS - Adding our own objects. And let there be light! 
layout: post
---

_Learning objectives:_

* including our custom objects in the scene
* including a light source
___


Now that we have everything under control, let's go back to adding objects to the scene and also make our scene slightly more appealing by adding some natural light sources. 

The goal is to visualise brain activity in certain spots on the surface of the brain. For starters, let's add some spheres and position them. 

In the [docs](https://threejs.org/docs/) we can find SphereGeometry, that we can set up in the following way:

{%highlight javascript%}
var sphereGeometry = new THREE.SphereGeometry( 5, 8 ,8 );
{%endhighlight%}

Just like before, our geometry needs to be coupled with a material to make a mesh that we can then add to the scene.  

{%highlight javascript%}
var sphereMaterial = new THREE.MeshNormalMaterial( {wireframe: true} );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );
{%endhighlight%}

Lastly, we need to call the render function to update what we see on the screen. 

{%highlight javascript%}
renderer.render(scene, camera);
{%endhighlight%}


Now let's change where our bubble sits in the scene.  
We do this in the very same way we set the position of the camera:

{%highlight javascript%}
sphere.position.set(-20, 50 , 80 )
{%endhighlight%}	

___

_Challenge: challenge_title_

1. Play with the 3 sphere parameters. See if you can make the ball look smooth. 
1. Make 3 smooth, small, red balls that sit on the surface of the brain. 
1. Make the brain pink
1. Time to play with another material. Find the Lambert material in the docs and apply it to all geometries.
...what just happened?! Inspect the scene carefully... 

___ 

Time to get our brain back! 
At the moment, it's dark in our virtual room. Let's add some ambient light: 

{%highlight javascript%}
var ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white ambient light
scene.add( ambientLight );
{%endhighlight%}

_Note: If you refer back to the [diagram from lesson 6](https://raw.githubusercontent.com/IsaKiko/ThreeJS-course/master/_posts/flow.png), you can see that we need to add the light before rendering the scene, just like we did with the spheres._


___

_Challenge: challenge_title_

1. Naturally, there are different ways to illuminate your scene. Use [THREE.PointLight()](https://threejs.org/docs/#api/lights/PointLight) to create a point source. 
1. Then move it above the brain using the same command we used to move our camera and spheres earlier. 

___


<!-- links: [https://threejs.org/examples](https://threejs.org/examples)
code:
	{%highlight html%}
	<script type="text/javascript" src="OrbitControls.js"></script>
	{%endhighlight%}

challenges:
___

_Challenge: Playing with libraries

Find and include the "trackball" controls in the ThreeJS examples following the steps above and explore how they are different.  

___ -->