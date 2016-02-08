---
published: true
title: 4 - ThreeJS - Introduction to JavaScript
layout: post
tags: [threejs]
categories: [threejs, course, material, ]
---
As mentioned before, neither HTML nor CSS are actual programming languages. If we want any functionality (and that includes interactivity) on our page, we will need to code in an actual language that allows for loops, conditionals, and mathematical operations. On the internet, that language is JavaScript.

Let's look at a neat toy project: we have two pets, a cat and a dog, we have their weights and their names. JavaScript thinks in arrays and objects. Our goal here will be to create a array of pets so we can then only look at a subset of them (by filtering them). 

___

*Learning objectives:*

* Know the difference between array, object, number, and string
* Write a first function
* Know how to copy, map, and filter arrays
* Along the way, learn a little bit about debugging (console.log() and alert()) 

___ 

Just like with CSS, we have the possibility to include some JavaScript straight in our HTML file. To do this, we need to create a `<script>` element. Let's go straight to actually using this to show us something: an annoying pop-up window. To do this, we use the `alert()` function.

{%highlight html%}
<script>
alert('Pop-ups are awful. Never use a pop-up!')
</script>
{%endhighlight%}

The round brackets after `alert` tell the browser to actually execute the function. `alert()` also takes an argument, the text (or number) that we want to display on the screen. We used quotes, which means we wanted to display a string. 

Before we go on looking at other types though, we'll move our JavaScript code out of the HTML file into a separate file 'main.js'. This will keep our main file readable and is simple better style.
We include the file using the `<script>` tags. *Note that code will be executed sequentially. This means that if the script depends on anything else in our file (like another .js file, or certain HTML elements to be in place), our script has to be included after these things.*

{%highlight html%}
<script src="main.js"> </script>
{%endhighlight%}

We fixed one thing, let's fix another. Instead of using an annoying pop-up, we can use `console.log()`. By right-clicking on anything in the page and clicking on 'inspect element', we'll open the developer tools in our browser. When we execute `console.log()`, the output will be shown in the 'console' tab:

{%highlight javascript%}
console.log('What a neat way to debug!');
{%endhighlight%}

We've printed strings, but what if we want to print a number? And what if we want to change that number? We'll create a variable first, and then print it to the console.

{%highlight javascript%}
var my_number = 42
console.log(my_number);
{%endhighlight%}

___

*Challenge: adding strings and numbers*

We've learned about strings and numbers. But what happens if we add them?
Create four variables: two numbers and two strings. Then add any two of them and print the sum to the console (e.g. `console.log(num1 + num2`)). What is the output?

___

Back to what we initially wanted: a array of our animals. Each of our animals will be stored as an object. And our objects will have different fields to start with: name and weight.

{%highlight javascript%}
var my_cat = {
animal : 'cat',
name : 'Snowball',
weight : '3kg'
}
{%endhighlight%}

Both fields have string value. This doesn't have to be the case. Once our object is initialised, we can add another field simply by using the so-called dot-syntax:

{%highlight javascript%}
my_cat.weight_in_kg = 3;
{%endhighlight%}

This is also the syntax used to read out values: 

{%highlight javascript%}
console.log('The name of my cat is ', my_cat.name);
{%endhighlight%}

___

*Challenge: it's a dog!*

Create an object for your dog! Give it a name, weight, and whatever else seems like a good idea. 

___

We have two pets now. Remember we wanted both of them in one array? Where objects have curly brackets and values can be recalled using the dot-syntax and field names, arrays have square brackets and boring indices (starting at 0).

{%highlight javascript%}
array = [1,2,3];
console.log(array(0));
{%endhighlight%}

This code will return the first element: `1`.

To create our array of pets, instead of having numbers, we now have our objects in the brackets:
{%highlight javascript%}
pets = [my_cat, my_dog];
console.log(pets(0)); // returns the cat
console.log(pets(1)); // returns the dog
{%endhighlight%}

We can continue this pattern indefinitely, having arrays of objects with fields that have arrays of objects... 

___

*Challenge: More animals*

Create even more animals. Let them all have different weights, we'll need some property to group our animals by later.  

___

Next, we'll have a look at functions. Writing bits of code in a function can be very powerful. Some functions we write so they can be reused (like `alert()`). Other times, we want to use a certain function as a result of something specific happening (callback functions. And sometimes when that happens, our functions don't even need to have a name (anonymous functions). But we'll get to that. 

Let's start with the straight-forward case. We want a function that returns the name of an animal. (This is only an example - we already know that there's an easier way to do this.)

{%highlight javascript%}
function returnName(animal) {
   var whatsyourname = animal.name;
   return whatsyourname;
}
{%endhighlight%}

Let's go through this bit by bit: `returnName` is the function name, and `animal` is the name an input argument is assigned to temporarily. So if we want to execute the function, we need to write `returnName(my_cat)`. Internally, `my_cat` will now be called `animal`. This also explains that inside the function, we can access the field `animal.name`, since the object that we pass into the function has a field called `name`. This name will be assigned to the variable `whatsyourname`. This value will be returned. We can execute this function anywhere in our script.

{%highlight javascript%}
var cat_name = returnName(my_cat);
console.log(cat_name);
{%endhighlight%}

___

*Challenge: Your first function*

Create a function that returns the following string for my_cat: "`Snowball weighs 3 kg.`" and run it on `my_dog`.

___

*Sooo... JavaScript doesn't understand copying*

When using JavaScript, we have to get used to the idea that there is no simple way to copy an object. Just for fun, try the following:

{%highlight javascript%}
var my_other_cat = my_cat;
my_other_cat.name = 'Snowball 2';
console.log(my_cat.name);
{%endhighlight%}

The reason `my_cat`'s name has changed is that JavaScript thinks of the two cats as one and the same object (after all, we set them equal).

So that's not the way to copy. An intuitive way to copy might be a `.copy()` function, but for some reason this doesn't exist. It may in future, but for now, we will need to make use of workarounds. 

For a array, we can use a mapping function:

{%highlight javascript%}
var copy_pets = pets.map(function(element_in_object) {
  return element_in_object;
})
{%endhighlight%}

What this function does is it loops through each element in `pets`, temporarily calls it `element_in_object`, and returns it to a new array `copy_pets` at the same position.
You may notice that this time, we didn't even give the function a name. This is an anonymous function that only makes sense in the context we are using it in. So it doesn't need a name. 

We can also use maps to extract only certain fields:

{%highlight javascript%}
var names_of_pets = pets.map(function(element_in_object) {
  return element_in_object.name;
})
{%endhighlight%}

...perform any operation on each element in the array:

{%highlight javascript%}
var royal_names_of_pets = pets.map(function(element_in_object) {
  return 'the honorary ' + element_in_object.name
})
{%endhighlight%}

...or return a whole new custom array:

{%highlight javascript%}
var royal_well_fed_pets = pets.map(function(element_in_object) {
  return {
     name: 'the honorary ' + element_in_object.name,
     weigth: element_in_object.weight_in_kg + 4
   }
})
{%endhighlight%}

___

*Challenge: Mapping*

Create a new array of animals from `pet`, giving it new attributes that relate back to the ones we already have. 

___

One last function, that will come up frequently, is the filter function. Its syntax is very similar to mapping function we just learned about. It takes a array and filters it according to our specifications. So the array it returns will be shorter (or of equal length) than the array we feed it. Let's say we want to only look at animals that weigh over a certain number of kgs.

{%highlight javascript%}
var well_fed_pets = pets.filter(function(element_in_object) {
  return element_in_object.weight_in_kg > 2.5;
})
{%endhighlight%}

This time, the entire object is returned, with all its fields. But _only_ if the animal's weight is bigger than 2.5 kg. 

___

*Challenge: Filtering*

Create a new array of animals that contains only cats by filtering the `pets` array.

___

What more can we want from a programming language? More explicit loops and conditionals. But we'll get to that if we need to. 
