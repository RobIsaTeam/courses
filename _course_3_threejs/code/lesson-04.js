var scene =  new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, .1, 1000 );
var renderer = new THREE.WebGLRenderer();

var container = document.getElementById('container');

container.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 100000 );
console.log('camera position')
console.log(camera.position);
// camera.position.set( 0, 200 , 0 );
// addAxes(scene);
// camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

camera.position.set( -200, 200 , -200 );
addAxes(scene);
camera.lookAt( new THREE.Vector3( 100, 10, 10 ) );


var loader = new THREE.STLLoader();
loader.load('../data/MonkeyBrain.stl', function(geometry) {
  console.log(geometry)
	var material = new THREE.MeshNormalMaterial({visible: true, transparent: true, opacity: 0.5});
	// var material = new THREE.MeshBasicMaterial({visible: true, wireframe:true});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer.render(scene, camera);
});

