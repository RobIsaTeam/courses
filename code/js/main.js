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
camera.position.set( -200, 200 , 200 ); // .set sets a THREE.Vector3 to new coordinates

// camera.rotation.x = 2.3 // modify the rotation around the x-axis in radians 


controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function(){
	renderer.render(scene, camera);
} ); 

// controls.enableZoom = false;


var loader = new THREE.STLLoader();

loader.load( '/MonkeyBrain.stl', function ( geometry ) {
	console.log('brain loaded')

	var material = new THREE.MeshBasicMaterial( { color: '#FFDDDD', wireframe:true, transparent: true, opacity: 0.5 } );
	var mesh = new THREE.Mesh( geometry, material );
	
	scene.add( mesh );

	renderer.render(scene, camera);

});






// function buildAxes( length ) {
//         var axes = new THREE.Object3D();

//         axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFFD1D1, false ) ); // +X
//         axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFFD1D1, true) ); // -X
//         axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0xD1FFD1, false ) ); // +Y
//         axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0xD1FFD1, true ) ); // -Y
//         axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0xD1D1FF, false ) ); // +Z
//         axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0xD1D1FF, true ) ); // -Z

//         return axes;

// }

// function buildAxis( src, dst, colorHex, dashed ) {
// 	var geom = new THREE.Geometry(),
// 		mat; 

// 	if(dashed) {
// 		mat = new THREE.LineDashedMaterial({ linewidth: 2, color: colorHex, dashSize: 3, gapSize: 3 });
// 	} else {
// 		mat = new THREE.LineBasicMaterial({ linewidth: 2, color: colorHex });
// 	}

// 	geom.vertices.push( src.clone() );
// 	geom.vertices.push( dst.clone() );
// 	geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

// 	var axis = new THREE.Line( geom, mat, THREE.LineSegments );

// 	return axis;

// }

//	 mesh.position.set( -50, -50, -30 );
//	 mesh.rotation.set( 0, - Math.PI / 2, 0 );




