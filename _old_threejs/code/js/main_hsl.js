var container = document.getElementById('threeJScontainer');

var scene =  new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 100000 );
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

	var brainMaterial = new THREE.MeshLambertMaterial({ transparent: true, opacity: .8, color: 'grey'});
	var brainMesh = new THREE.Mesh( brainGeometry, brainMaterial );
	
	scene.add( brainMesh );

	renderer.render(scene, camera);

});

fetch('/data.json')
	.then(function(response) {
		console.log(response)
		return response.json()
	})
	.then(function(data) {
		console.log(data)

		var brainregions = data.map(function(item){
			var color = 'hsl(' + item.hsl.h + ',' + item.hsl.s+ '%,' + item.hsl.l +'%)';
			var sphereMaterial = new THREE.MeshLambertMaterial({color: color});
			var sphereGeometry = new THREE.SphereGeometry(1,32,32);
			var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial)
			var threejscolor = sphere.material.color.getHSL();
			console.log(threejscolor);
			console.log(color);
			console.log(item.hsl);

			var brainregion = {
				sphere: sphere, 
				data: item

			}

			return brainregion
		})		

		var counter = 0;
		function update_spheres(){		
			brainregions.forEach(function(item){
				var pos = item.data.position
				item.sphere.position.set(pos[0], pos[1], pos[2])
				item.sphere.scale.set(item.data.power[counter],item.data.power[counter],item.data.power[counter]);

				// console.log(item.data.hsl.h)
				var c = new THREE.Color('hsl(' + item.data.hsl.h + ',' + item.data.hsl.s+ '%,' + item.data.power[counter]*10 +'%)')
				console.log(c)
				// item.sphere.material.color.setHSL(item.data.hsl.h/100, item.data.hsl.s/100, item.data.hsl.l/100)
				item.sphere.material.color.set(c)

				scene.add( item.sphere );
			})
			renderer.render( scene, camera );
			if (counter <= brainregions[0].data.power.length){
				counter = counter+1;
			}
			else {counter = 0};
		}

		setInterval(update_spheres, 200);

	})


// include our own geometry - 3 small balls
// var sphereMaterial = new THREE.MeshLambertMaterial({color: 'red'}  );
// var sphereGeometry = new THREE.SphereGeometry( 5, 16, 16);

// var sphere1 = new THREE.Mesh( sphereGeometry, sphereMaterial );
// var sphere2 = new THREE.Mesh( sphereGeometry, sphereMaterial );
// var sphere3 = new THREE.Mesh( sphereGeometry, sphereMaterial );

// sphere1.position.set(16, 60 , -80);
// sphere2.position.set(-20, 30 , -80);
// sphere3.position.set(-20, 60 , -80);

// scene.add( sphere1 );
// scene.add( sphere2 );
// scene.add( sphere3 );

var ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white ambient light
scene.add( ambientLight );

var pointLight = new THREE.PointLight( 0x404040, 5, 0 ); // white point source
pointLight.position.set( 0,200,0 );
scene.add( pointLight );

renderer.render(scene, camera);