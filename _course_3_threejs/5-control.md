---
published: true
title: Controlling the camera
subtitle: Take control
layout: post
---

> ### Learning objectives:
>
> * finding and including scripts from external sources
> * adding controls like zooming, panning, and rotating

As you can imagine, we are not the first ones who are interested in zooming, panning, and rotating our scene on user input. Luckily, that there is someone who's already done the hard work and written a library that does all that and integrates well with ThreeJS.

Even if it wasn't good for anything else (it will be...) the ThreeJS documentation is excellent for looking at examples and the associated code. If we go to [https://threejs.org/examples](https://threejs.org/examples), and search for 'controls', we'll see a number of examples that are built around that. We are interested in the orbit control package.

If you click on the example `controls / orbit`, there will be a button in the lower right corner with the text `view source` on it. This button takes us straight to the corresponding GitHub page.

Now it gets a little bit tricky. We'll want to find out which script this example uses and integrate it into our code. Generally, we'll need to follow these steps:

1. Scroll down to the `<body>` tag
1. Look at which scripts get imported
1. Navigate through this repo: 'https://github.com/mrdoob/three.js/blob/dev/examples' to the imported script (in this case to [js/controls/OrbitControls.js](https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js))
1. Click on `Raw` button.
1. Right-click anywhere on the page and save the file in your `code` directory as `OrbitControls.js`
1. Include the following script tag in your `index.html` file, before `main.js`, but after the ThreeJS library gets loaded:

```html
<script src="OrbitControls.js"></script>
```

Now the really handy thing is, that this example also shows us how to use the code we just included.

```js
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
```

The controls are added to the `<canvas>`-element, which we inserted earlier and which we find again using `renderer.domElement` and will have directly influence our camera object.

Every time a change is detected, which for the purpose of controls means some detected user input like a button click, or click-hold-drag, or scrolling with the mouse wheel, the function `render` gets executed.

Let's see what that function does... If we look for it somewhere further down in the code, we'll find a well-known one-liner. The authors of this script decided to create a function that lets them re-render in a slightly less verbose way.

```js
function render() {
	renderer.render(scene, camera);
}
```

So that's all we need to copy over into our script to dynamically change the camera position, angle, and zoom! Give it a try!

Make sure that your camera position is not set to `(0,0,0)` (which is the default) because otherwise the controls will not work at all - they work by moving the camera around `(0,0,0)` and telling it to keep looking at `(0,0,0)`.

> ### Challenge: Playing with libraries
>
> Find and include the [trackball](https://threejs.org/examples/#misc_controls_trackball) controls in the ThreeJS examples following the steps above and explore how they are different.
>
> **Hint:** Look at how the trackball controls are used in the example source code and you'll see that it's a little bit different to the orbit controls. For trackball, you need to have an "animation" loop that keeps updating the camera even after you stop dragging (it has momentum). To do this, copy the `animate` function from the example and don't forget to start the loop by executing this function somewhere in your code.

Here is what the scene should look like by the end of this lesson:
<iframe style="position: relative; left: -120px; overflow: hidden;" scrolling='no' src="code/lesson-05.html" width="1000" height="600"></iframe>

> ### [Next Lesson: More objects and lighting](./6-objects_and_light)
