function addAxes(scene) {
    // make x-axis:

	var geomx = new THREE.Geometry();
	var matx = new THREE.LineBasicMaterial({ linewidth: 2, color: "#FFC5C5" });

	geomx.vertices.push( new THREE.Vector3( -1000, 0, 0 ) ); //A vertex is a point where two or more straight lines meet.
	geomx.vertices.push( new THREE.Vector3( 1000, 0, 0 ) );
	
	var axisx = new THREE.Line( geomx, matx, THREE.LineSegments );
	scene.add(axisx);

    // make y-axis:

	var geomy = new THREE.Geometry();
	var maty = new THREE.LineBasicMaterial({ linewidth: 2, color: "#C5FFC5" });

	geomy.vertices.push( new THREE.Vector3( 0, -1000, 0 ) );
	geomy.vertices.push( new THREE.Vector3( 0, 1000, 0 ) );
	
	var axisy = new THREE.Line( geomy, maty, THREE.LineSegments );
	scene.add(axisy);

	// make z-axis:

	var geomz = new THREE.Geometry();
	var matz = new THREE.LineBasicMaterial({ linewidth: 2, color: "#C5C5FF" });
	
	geomz.vertices.push( new THREE.Vector3( 0, 0, -1000 ) );
	geomz.vertices.push( new THREE.Vector3( 0, 0, 1000 ) );

	var axisz = new THREE.Line( geomz, matz, THREE.LineSegments );
	scene.add(axisz);
}
