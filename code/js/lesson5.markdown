Before we can actually see something on the screen, there are a few things we need to set up: 

* setting up a scene object using `Scene`
* setting up a camera object using `PerspectiveCamera`
* setting up a rendering object `WebGLRenderer`

And of course, we need to link to the ThreeJS library in 'index.html' as well as a [loading module](https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/loaders/STLLoader.js) we can download. We'll also go ahead and include another file - 'main.js' - a file that will contain our own code.

{%highlight html%}
<!DOCTYPE html>
<html>
	<head>
		<title>Playing with ThreeJS</title>
	</head>
	<body>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r74/three.min.js"></script>
		<script src="STLLoader.js"></script>
		<script src="main.js"></script>
	</body>
</html>
{%endhighligh%}

Let's go through the dot points one by one:

_Scene:_
The scene is a 3D space that we set up and that will contain all our 3D objects we create. The function we use to create a scene is `THREE.Scene()`

_Camera:_
The camera is our point of view. The function we use to create a camera object is `THREE.PerspectiveCamera()`

_Renderer:_
The scene and any objects in it are only visible to us through the camera. And what we see through the camera needs to be drawn in 2 dimensions onto our page. This is the task of the renderer: it's taking what the camera sees in the scene and draws it in 2D in our browser.
If the camera (position or direction) changes or we insert or move objects in the scene, we will have to re-draw this 2D image which means we re-render the page. 
The function we use to create the rendering object is `WebGLRenderer`

ThreeJS is programmed in a way that requires us to use the `new` keyword to create new ThreeJS objects like these three.

In our JavaScript file 'main.js', we start setting the scene: 
{%highlight javascript%}
var scene =  new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15  );
var renderer = new THREE.WebGLRenderer();
{%endhighlight%}

We have given the camera a few default parameters - don't worry about them for now, we'll play with them later. 

To be able to draw the 2D projection of our 3D objects, the renderer creates its own canvas `<canvas></canvas>` which we will need to put onto the page. While we're at it, we'll make the canvas as large as the browser window:

{%highlight javascript%}
container.appendChild( renderer.domElement ); 
renderer.setSize( window.innerWidth, window.innerHeight );
{%endhighlight%}

To see what exactly happens, open the page in the browser and inspect the page elements.  

___ 

There is nothing in the scene, yet. 

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

