---
published: true
title: 6 - ThreeJS - Our first 3D object in the page
layout: post
---
_Learning objectives:_

* loading an STL file
* rendering a 3D object, using a mesh and a basic material 
* deeper understanding of camera attributes and object positioning 


Great, we have a scene, a camera pointed at it, nothing to look at, yet. 


## continue here:

* load stl (give link to the monkeybrain)
* set material
* make a mesh
* add to the scene
* render, using scene and camera

{%highlight javascript%}
var loader = new THREE.STLLoader();

loader.load( '/MonkeyBrain.stl', function ( geometry ) {
	var material = new THREE.MeshBasicMaterial( { color: '#E6E6E6', wireframe:true } );
	var mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
	renderer.render(scene, camera);

	console.log('done')
} );
{%endhighlight%}


___

_Challenge: Play with the camera_
From the ThreeJS documentation we find out what parameters we have to pass to the camera:
{%highlight javascript%}
PerspectiveCamera( fov, aspect, near, far )
{%endhighlight%}
`fov` is the view angle, `aspect` the aspect ratio, and `near` and `far` set the range of things you can see in the scene. This image might help to get a better understanding about what's going on: https://www3.ntu.edu.sg/home/ehchua/programming/opengl/images/Graphics3D_CameraPerspective.png
Play with the camera settings until you can see the entire brain on the screen. 
...try setting `near = 80`. What happens?

___ 


next: 

* rotate, set position of mesh and camera.
