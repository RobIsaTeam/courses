var scene =  new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, .1, 1000 );
var renderer = new THREE.WebGLRenderer();

var container = document.getElementById('container');

container.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);


var loader = new THREE.STLLoader();
loader.load('../data/MonkeyBrain.stl', function(geometry) {
  console.log(geometry)
	var material = new THREE.MeshNormalMaterial({visible: true, transparent: true, opacity: 0.5});
	// var material = new THREE.MeshBasicMaterial({visible: true, wireframe:true});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer.render(scene, camera);
});

