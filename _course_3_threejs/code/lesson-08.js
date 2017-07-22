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
loader.load( '../data/MonkeyBrain.stl', function ( brainGeometry ) {
	console.log('brain loaded')

	// var brainMaterial= new THREE.MeshNormalMaterial();
	var brainMaterial = new THREE.MeshLambertMaterial({ transparent: true, opacity: .8, color: 'grey'});
	var brainMesh = new THREE.Mesh( brainGeometry, brainMaterial );

	scene.add( brainMesh );

	renderer.render(scene, camera);

});


fetch('../data/electrode_data_final.json')
	.then(function(response) {
		console.log(response)
		return response.json()
	})
	.then(function(data) {
		console.log(data)

		var brainregions = data.map(function(item){
			var sphereMaterial = new THREE.MeshLambertMaterial({color: item.color});
			var sphereGeometry = new THREE.SphereGeometry(1,32,32);
			var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial)
			sphere.position.set(item.position[0], item.position[1], item.position[2]);
			sphere.region = item.brain_region;
			sphere.power = item.power;
			var color = sphere.material.color.getHSL();
			scene.add( sphere );
			console.log(color);
			var brainregion = {
				sphere: sphere,
				sphere_color: color,
				data: item
			}
			return brainregion;
		})


		var counter = 0;
		function update_spheres(){
			brainregions.forEach(function(item){
				var size = 1 + 5*item.data.power[counter];
				item.sphere.scale.set(size,size,size);
				var lightness = 0.1+item.data.power[counter]/10;
				item.sphere.material.color.setHSL(item.sphere_color.h,item.sphere_color.s,lightness);
			})
			renderer.render( scene, camera );
			if (counter < brainregions[0].data.power.length - 1){
				counter = counter+1;
			} else {
				counter = 0;
			}
		}

		setInterval(update_spheres, 50);

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

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

function onMouseMove( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );
  var tooltip = document.getElementById('tooltip');
  if (intersects[0]){
  	// console.log(intersects[0].point)
  	console.log(intersects[0].object.region)
  	if (intersects[0].object.region){
  	    tooltip.innerHTML = intersects[0].object.region;
  	    tooltip.style.visibility = 'visible';
  	    tooltip.style.top = event.clientY + 'px';
  	    tooltip.style.left = event.clientX + 20 + 'px';}
  	 else{tooltip.style.visibility = 'hidden';}
    }
  else{tooltip.style.visibility = 'hidden';}
}

window.addEventListener( 'mousemove', onMouseMove );

var ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white ambient light
scene.add( ambientLight );

var pointLight = new THREE.PointLight( 0x404040, 5, 0 ); // white point source
pointLight.position.set( 0,200,0 );
scene.add( pointLight );

renderer.render(scene, camera);

window.addEventListener( 'click', onClick );

var plot = document.getElementById('detail-plot');
function onClick( event ){
	var intersects = raycaster.intersectObjects( scene.children );
	if (intersects[0]){
		if (intersects[0].object.region){
			plot.style.visibility = 'visible'
			var trace = [{
				"y": intersects[0].object.power,
				"type": "scatter"
			}]
			var layout = {
				"title": intersects[0].object.region,
				"margin": {
				    l: 55,
				    r: 30,
				    b: 65,
				    t: 60,
				    pad: 5
				},
				font: {
					color: 'white'
				},
				xaxis: {
					title: 'Time'
				},
				yaxis: {
					title: 'Brain activity'
				},
				paper_bgcolor: '#000000',
				plot_bgcolor: '#000000'
			}

			Plotly.newPlot(plot, trace, layout, {"showLink": false})	
		}
	}
}

