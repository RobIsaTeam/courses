var scene, camera, renderer, composer, box, pointLight,
    occlusionComposer, occlusionRenderTarget, occlusionBox, lightSphere,
    
    angle = 0,

    DEFAULT_LAYER = 0,
    OCCLUSION_LAYER = 1;

// scene, camera, and renderer as normal for three.js
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function setupScene(){
    var ambientLight,
        geometry,
        material;
    
    // two lights, an ambient to mimic reflected light
    // on the back side of the box as it passes in front of the light
    ambientLight = new THREE.AmbientLight(0x2c3e50);
    scene.add(ambientLight);
    // and a point light to represent the source of the light volume
    pointLight = new THREE.PointLight(0xffffff);
    scene.add(pointLight);
    
    // a white sphere serves as the light in the scene used 
    // to create the effect
    geometry = new THREE.SphereBufferGeometry( 1, 16, 16 );
    material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    lightSphere = new THREE.Mesh( geometry, material );
    lightSphere.layers.set( OCCLUSION_LAYER );
    // layers are a newer addition to three.js ( as of r74 )
    // they control what objects a camera is able to see. This way 
    // only one scene needs to be used for both rendering passes
    scene.add( lightSphere );
    
    // the box in the scene that rotatates around the light
    geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    material = new THREE.MeshPhongMaterial( { color: 0xe74c3c } );
    box = new THREE.Mesh( geometry, material );
    box.position.z = 2;
    scene.add( box );
    
    // the all black second box that is used to create the occlusion 
    material = new THREE.MeshBasicMaterial( { color:0x000000 } );
    occlusionBox = new THREE.Mesh( geometry, material);
    occlusionBox.position.z = 2;
    occlusionBox.layers.set( OCCLUSION_LAYER );
    scene.add( occlusionBox );
    
    camera.position.z = 6;
}

function setupPostprocessing(){
    var pass;
    
    // create the occlusion render target and composer
    // to increase performance we only render the effect at 1/2 the screen size
    occlusionRenderTarget = new THREE.WebGLRenderTarget( window.innerWidth * 0.5, window.innerHeight * 0.5 );
    occlusionComposer = new THREE.EffectComposer( renderer, occlusionRenderTarget);
    // add a scene render pass
    occlusionComposer.addPass( new THREE.RenderPass( scene, camera ) );
    // add the volumeteric shader pass that will automatically be applied
    // to texture created by the scene render 
    pass = new THREE.ShaderPass( THREE.VolumetericLightShader );
    // since only one shader is used the front and back buffers do not need to be swapped
    // after the shader does its work.
    pass.needsSwap = false;
    occlusionComposer.addPass( pass );
    
    // a second composer and render pass for the lit scene
    composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );
    // an additive blending pass that takes as a uniform
    // the resulting texture from the volumetric light shader 
    pass = new THREE.ShaderPass( THREE.AdditiveBlendingShader );
    pass.uniforms.tAdd.value = occlusionRenderTarget.texture;
    composer.addPass( pass );
    pass.renderToScreen = true;
}
  
function onFrame(){
    requestAnimationFrame( onFrame );
    update();
    render();
}
  
function update(){
    var radius = 2.5,
        xpos = Math.sin(angle) * radius,
        zpos = Math.cos(angle) * radius;
    
    // each frame rotate the lit cube
    box.position.set( xpos, 0, zpos);
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    
    // and match its position and rotation with the 
    // occluding cube
    occlusionBox.position.copy(box.position);
    occlusionBox.rotation.copy(box.rotation);
    
    angle += 0.02;
}

function render(){
    // show the objects in the occlusion scene
    camera.layers.set(OCCLUSION_LAYER);
    // set a black background for the render
    renderer.setClearColor(0x000000);
    // render the occlusion scene and apply the volumetric light shader
    occlusionComposer.render();
    
    // show the objects in the lit scene
    camera.layers.set(DEFAULT_LAYER);
    // set a new background color
    renderer.setClearColor(0x090611);
    // render the lit scene and blend the volumetric light effect
    composer.render();
}
  
setupScene();
setupPostprocessing();
onFrame();