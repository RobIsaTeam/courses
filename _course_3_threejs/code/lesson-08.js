var scene =  new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

var container = document.getElementById('container');

container.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 100000 );
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

var ambientLight = new THREE.AmbientLight( 0x404040, 2 ); // soft white ambient light
scene.add( ambientLight );

var pointLight = new THREE.PointLight( 0x404040, 5, 0 ); // white point source
pointLight.position.set( 0,200,0 );
scene.add( pointLight );


var updatePeriod = 50; // ms

fetch('../data/electrode_data.json')
  .then(function(response) {
    console.log(response)
    return response.json()
  })
  .then(function(data) {
    console.log(data)

    var brainregions = data.map(function(item) {
      var sphereMaterial = new THREE.MeshLambertMaterial({color: item.color});
      var sphereGeometry = new THREE.SphereGeometry(1,32,32);
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(item.position[0], item.position[1], item.position[2]);
      sphere.region = item.brain_region;
// Advanced challenge
      sphere.power = item.power;

      var initial_colour = sphere.material.color.getHSL();

      scene.add(sphere);
      var brainregion = {
        data: item,
        sphere: sphere,
        color: initial_colour
      };
      return brainregion;
    })

    var currentindex = 0;
    function update_spheres() {  
      var time = Date.now() // time now in ms  
      var timestep = Math.floor(time / updatePeriod) // time now in 50ms steps
      var currentindex = timestep % brainregions[0].data.power.length // what index are we up to?

    brainregions.forEach(function(item) {
      var size = 1 + 5*item.data.power[currentindex];
      item.sphere.scale.set(size, size, size);
      var lightness = 0.1+item.data.power[currentindex]/2;
      item.sphere.material.color.setHSL( item.color.h, item.color.s, lightness);
    })
    renderer.render( scene, camera );
  }      
  if (currentindex < brainregions[0].data.power.length - 1){
        currentindex = currentindex+1;
      } else {
        currentindex = 0;
      }
    setInterval(update_spheres, updatePeriod);
  })



var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
// Advanced challenge
var plot = document.getElementById('detail-plot');

function onMouseMove(event) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  var tooltip = document.getElementById('tooltip');
  if (intersects[0]) {
    if (intersects[0].object.region) {
      console.log(intersects[0].object.region)
      tooltip.innerHTML = intersects[0].object.region;
      tooltip.style.visibility = 'visible';
      tooltip.style.top = event.clientY + 'px';
      tooltip.style.left = event.clientX + 20 + 'px';
// Advanced challenge
      plot.style.visibility = 'visible';
      var trace = [{"y": intersects[0].object.power , "type": "scatter" }]; 
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
      Plotly.newPlot(plot, trace, layout, {"showLink": false});

    } else {
      tooltip.style.visibility = 'hidden';
    }
  } else {
    tooltip.style.visibility = 'hidden';
  }
}
window.addEventListener( 'mousemove', onMouseMove );
