---
published: true
title: Data-driven animation
subtitle: Reading in data. And showing it.
layout: post
---

> ### Learning objectives:
>
> * reading in and using data to control size and colour of an object
> * animating properties

It's time to use some actual data. In this course, we want to visualise the information observed in the recorded brain activity that was published in [this Science paper](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4721574/). In particular, we're looking at Figure 2, which displays this signal over time in different regions of a macaque's brain.

You'll find the necessary data in your [data folder that you would have downloaded in the beginning](./getting_started.zip).

To load the data, we're using a command called `fetch`. `Fetch` returns what's called a promise. All this means is that it gives us the chance to wait with the next action until the data is actually loaded. Generally, JavaScript tries to work as efficiently as possible, which means it will often try to do two things at the time. So if it was going to try to update the page with the data, before it is actually loaded, we'd run into problems. (If you're familiar with D3 and like to use its loading functions, that'll work in a similar way).

> ### Note: Patch for older browsers
>
> In older browsers, `fetch` isn't built into the browser itself and you will need to use a JavaScript file to add in that functionality for you. We've included that library in `getting_started.zip`, so all you should need to do is add a line into `index.html` like this:
>
> ```html
>  <script src="fetch.js"></script>
>  <script src="three.min.js"></script>
>  <script src="STLLoader.js"></script>
>  <script src="main.js"></script>
>  ```

Now the neat thing about promises is that among other things, we can wait for the response and `then` act on the `response` we get back:

```js
fetch('../data/electrode_data.json')
  .then(function(response) {
    console.log(response)
    return response.json()
  })
```

Once in the `then` bit, we can use `console.log` to see what we get back. The response printed in the console can look a little bit confusing and it seems to have nothing to do with the data we tried to read. But if you look closely, we find that there's a link to a `url`. Follow the link and we'll see that our data is loaded. We can chain as many `.then` commands together as we'd like, passing things from one to the other. For now, we'll want to read out the url content - the json object we loaded - and once it's converted into a usable object, pass it on to the next bit of code.

```js
fetch('../data/electrode_data.json')
  .then(function(response) {
    console.log(response)
    return response.json()
  })
  .then(function (data) {
    console.log(data)
  })
```

Now let's have a look at what we're dealing with:
```js
[
  {
    "electrode":0,
    "position":[-14, 73 , -44],
    "power": [...],
    "brain_region":"Frontal eye field",
    "color":"#A3679C"
    }

  },
  {...},
  {...}
]
```

The data contains an array of data points. Each object in this array coresponds to the measurements in one brain region. We've got the electrode id, the position in 3D coordinates, the measured brain signal over time, the identifier of which brain region we're in, and a colour.


> ### Challenge: Chain all the things!
>
> Just to see if you can, once the array is fully loaded, pass the first element of the array we just loaded through another '.then' statement to a function that prints its colour in the console.

Now everything we want to happen on the page that requires the data, needs to be in the function we just wrote.

```js
fetch('../data/electrode_data.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {

    // here is where all the new code goes //

  })
```

The goal is to create a sphere object for each brain region that changes its size over time based on the data we just loaded. First, let's create a static sphere using the convenient `forEach` function. This function takes in an array item by item does whatever we tell it to with it. For now, we'll to render one sphere per datapoint.

For each data point (corresponding to a brain region), we'll create a material and a geometry. Those two make up the sphere, just like before. We get the position from the data and set it for each sphere. And we'll delete all the spheres we created manually.

```js
fetch('../data/electrode_data.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data)
    data.forEach(function(item){

      var sphereMaterial = new THREE.MeshLambertMaterial({color:item.color});
      var sphereGeometry = new THREE.SphereGeometry(1,32,32);
      var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial);

      sphere.position.set(item.position[0], item.position[1], item.position[2]);

      scene.add( sphere );
      renderer.render( scene, camera );
    })    
  })
```

At this point it might be a bit hard to see what's going on so let's change our camera's field of view form 80 to 20.

> ### Challenge: Scale the spheres
>
> To relate our spheres to the data, we want to scale them based on the measured power.
Using `sphere.scale.set()`, scale each sphere according to the first value in its power array. In our data, `power` has been normalised to range between 0 and 1. To help make sure the spheres stay visible it might be a good idea to scale them as something like: `1 + 5*power`. They'll start of small, but over time, we'll see them grow. ;)

We've started displaying our data. Now, how can we change the size of the spheres dynamically? To repeatedly execute a function, we can use the function `setInterval(my_function, timestep)`. Whatever `my_function` does is executed every `timestep` milliseconds. In our case, our function is supposed to update the size of the bubble.

We'll need to do a few things to make this work:

1. Keep a list of spheres we created so they can be modified by an update function.
1. Write the update function.
1. Move everything we want to update dynamically into that function.
1. Call the update function using `setInterval`, incrementing a variable that's keeping track of the time.

For the first step, we'll change `forEach` to `map`. These two functions basically have the same syntax. The main difference for us is that `map` allows us to return a new object.  We can define how the output items relate to the items we are mapping. In our case, we want to return a sphere object for each item in our data set. We'll call this output array `brainregions`. Each `brainregion` (each element of `brainregions`) will contain one sphere. Along with that, we'll pass on the bit of data that this sphere is visualising.

```js
fetch('../data/electrode_data.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log(data)
    var brainregions = data.map(function(item){

      var sphereMaterial = new THREE.MeshLambertMaterial({color:item.color});
      var sphereGeometry = new THREE.SphereGeometry(1,32,32);
      var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial);

      sphere.position.set(item.position[0], item.position[1], item.position[2]);
      var size = 1 + 5*item.power[0];
      sphere.scale.set(size, size, size);

      scene.add( sphere );
      renderer.render( scene, camera );

      var brainregion={
        data: item,
        sphere: sphere
      }

      return brainregion
    })    
    console.log(brainregions)
  })
```

Now the update function. Within the function, we can iterate through the brainregions just like before, using `forEach`. We move the scaling into the update function, because that's the thing we want to update. Then, every time we change something, we need to re-render the scene, so we move that bit down into our new update function, too.

```js
function update_spheres(){    
  brainregions.forEach(function(item){
    // update things we want to update - for example the scale
    var size = 1 + 5*item.data.power[0];
    item.sphere.scale.set(size, size, size);
  })
  renderer.render( scene, camera );
}
```

And we can call this function every 50 milliseconds, using `setInterval`:
```js
setInterval(update_spheres, 50);
```

So at this point, the whole slab of code looks like this:
```js
fetch('../data/electrode_data.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    var brainregions = data.map(function(item) {
      var sphereMaterial = new THREE.MeshLambertMaterial({color: item.color});
      var sphereGeometry = new THREE.SphereGeometry(1,32,32);
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(item.position[0], item.position[1], item.position[2]);
      scene.add(sphere);
      var brainregion = {
        data: item,
        sphere: sphere,
      };
      return brainregion;
    })

    function update_spheres() {    
      brainregions.forEach(function(item) {
        var size = 1 + 5*item.data.power[currentindex];
        item.sphere.scale.set(size, size, size);
      })
      renderer.render(scene, camera);
    }

    setInterval(update_spheres, 50);
  })
```

But you'll notice that this isn't doing much yet in terms of updating. We still need have one last thing to do to make the animation work. And that's going to be your job - it's challenge time!

> ### Challenge: Get the spheres animating
>
> Complete the last step that we outlined above: keep track of where we are within the animation (keep track of time) and in doing so size the sphere using a different index of the power arrays. Do this in such a way that the animation loops over and over.
>
> Hint: a simple way is to step through an index variable each time the `update_spheres` function is called.

> ### Advanced challenge: Meaningful colours
>
> Suppose we also want to update the colour, making spheres lighter when they get larger. Write the bit of code that allows you to do this. You will need to first get the initial colour, pass it on within the brainregions array, and then update it during the update phase.
>
> Hints:
>
> 1. Using the HSL (hue, saturation, lightness) colourspace allows us to update the lightness only, keeping where on the rainbow we currently are (hue) and the greyness of the colour (saturation) the same.
> 1. You can read out the initial colour of each sphere in HSL colourspace using sphere.material.color.getHSL() where we set up the spheres.
> 1. You can use item.sphere.material.color.setHSL( ... ) to set the value in the update function. Like the scaling function, this function expects three input arguments.
> 1. All values should be between 0 and 1, but you can play with the scaling until it looks nice.

> ### Advanced challenge: A better way to keep the time
>
> 1. The following bit of code can be used to improve the way we update our data.
> 1. Explain how it's doing it.
> 1. Why is this better?
>
> ```js
>
> /// NEW ///
> var updatePeriod = 50; // ms
> /// NEW ///
>
> function update_spheres() {    
>
>   /// NEW ///
>   var time = Date.now() // time now in ms
>   var timestep = Math.floor(time / updatePeriod) // time now in 300ms steps
>   var currentindex = timestep % brainregions[0].data.power.length // what's the index we are up to
>   /// NEW ///
>
>   brainregions.forEach(function(item) {
>     var size = 1 + 5*item.data.power[currentindex];
>     item.sphere.scale.set(size, size, size);
>   })
>   renderer.render(scene, camera);
>   requestAnimationFrame(update_spheres);
> }
>    
> update_spheres();
> ```

Here is what the scene should look like by the end of this lesson:
<iframe style="position: relative; left: -120px; overflow: hidden;" scrolling='no' src="code/lesson-07.html" width="1000" height="600"></iframe>

> ### [Next Lesson: Interacting with objects in the scene](./8-interactions)
