var scene =  new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, .1, 1000 );
var renderer = new THREE.WebGLRenderer();

var container = document.getElementById('container');

container.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 100000 );
console.log('camera position')
console.log(camera.position);
camera.position.set( -200, 200 , -200 );
addAxes(scene);

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );

function render() {
	renderer.render( scene, camera );
}


var loader = new THREE.STLLoader();
loader.load('../data/MonkeyBrain.stl', function(geometry) {
  console.log(geometry)
	var material = new THREE.MeshLambertMaterial({visible: true, color: 'grey'});

	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer.render(scene, camera);
});

var sphereMaterial = new THREE.MeshLambertMaterial({color: 'white'}  );
var sphereGeometry = new THREE.SphereGeometry( 7, 16, 16);

var sphere1 = new THREE.Mesh( sphereGeometry, sphereMaterial );
var sphere2 = new THREE.Mesh( sphereGeometry, sphereMaterial );

sphere1.position.set(9, 50 , -35);
sphere2.position.set(-17, 50 , -35);

scene.add( sphere1 );
scene.add( sphere2 );

var ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white ambient light
scene.add( ambientLight );

var pointLight = new THREE.PointLight( 0x404040, 5, 0 ); // white point source
pointLight.position.set( 0,200,0 );
scene.add( pointLight );


