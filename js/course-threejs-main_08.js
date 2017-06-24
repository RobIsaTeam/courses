var container = document.getElementById('threeJScontainer');

var scene =  new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
// when i create the renderer, it creates a canvas in the page, which is where the renderer puts the 2D image it draws

container.appendChild( renderer.domElement ); //renderer has an attribute called domElement that is the html canvas element 

renderer.setSize( window.innerWidth, window.innerHeight );

addAxes(scene); // provided with the course material

//camera.position.z = 50;

camera.lookAt( new THREE.Vector3( 100, 10, 10 ) ); // ...looking at a point in space
camera.position.set( -200, 200 , -200 ); // .set sets a THREE.Vector3 to new coordinates

// camera.rotation.x = 2.3 // modify the rotation around the x-axis in radians 

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function(){
	renderer.render(scene, camera);
} ); 

// controls.enableZoom = false;

var loader = new THREE.STLLoader();
loader.load( '/MonkeyBrain.stl', function ( brainGeometry ) {
	console.log('brain loaded')

	var brainMaterial = new THREE.MeshNormalMaterial({visible: true});
	var brainMesh = new THREE.Mesh( brainGeometry, brainMaterial );
	
	scene.add( brainMesh );

	renderer.render(scene, camera);

});

