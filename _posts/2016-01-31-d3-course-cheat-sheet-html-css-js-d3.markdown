---
published: true
title: D3 course cheat sheet (html, css, js, d3)
layout: post
tags: [cheat, sheet, D3]
categories: [D3]
---
# HTML

comments:
{%highlight html%}
<!-- this is a comment. -->
{%endhighlight%}


open an element / html tag:
{%highlight html%}
 </element>
{%endhighlight%}


close an element / html tag:
{%highlight html%}
 <element>
{%endhighlight%}

html file setup:
{%highlight html%}
<!DOCTYPE html>
<html>
         
   <!-- header: -->
    <head>
   <!-- link here to stylesheets and external javascript libraries: -->
    </head>

   <!-- body: -->
    <body>
   <!-- everything that you want to see on your page goes here: -->

    </body>

</html>
{%endhighlight%}

#### Other html elements: 
div, h1, em, span, ...

To inspect your styles is the browser right click on any element on your webpage and click "Inspect".

## Terms you can google:
html elements | html tags

[link to list of elements](https://developer.mozilla.org/en/docs/Web/HTML/Element)


# CSS

inline style in html file: 
{%highlight html%}
<!-- change one style -->
<element style="color:blue"></element>
<!-- change multiple styles at once -->
<element style="color:blue; font-size:1em"></element>
{%endhighlight%}
     
better style: have a separate style file "styles.css" and link in your html file header:
{%highlight html%}
<head> 
   <link rel="stylesheet" type="text/css" href="styles.css">
</head> 
{%endhighlight%}

give the element you want to style a class:
{%highlight html%}
<element class="title"></element>
{%endhighlight%}    

style all elements with the same class in 'styles.css': 
{%highlight css%}
.title{
   color: blue;
   font-size: 1em;
}
{%endhighlight%}

comments in '.css' file: 
{%highlight css%}
/* this is a comment */
{%endhighlight%}

To inspect your styles is the browser right click on any element on your webpage and click "Inspect". Then find the 'styles' tab.

#### Other things to style:
background-color, width, height, font, fill, stroke 


## Terms you can google:
css | html style | css properties

[link to css reference sheet](http://www.w3schools.com/cssref/)


# Images and SVGs

include an image from your directory ('.jpg', '.gif', or any other image format):
{%highlight html%}
<img src="cat.jpg">  
{%endhighlight%}

include an image from the internet:
{%highlight html%}
<img src="https://media.giphy.com/media/xEByv651MhOYo/giphy.gif">  
{%endhighlight%}

create a scalable vector graphic (good for any element you want to change using code):
{%highlight html%}
<svg>
  <circle cx="25" cy="25" r="15" class="circ1"></circle>
</svg>
{%endhighlight%}

#### Other SVG elements:
ellipse, rect 

## Terms you can google: 
html image tag | SVG elements

[link to svg reference sheet](http://www.w3schools.com/svg/svg_reference.asp)


# JavaScript 

### intro
comments in JavaScript:
{%highlight javascript%}
// this is a comment
{%endhighlight%}

write JavaScript code in the html document, using the 'script' element: 
{%highlight html%}
<script>
  // write javascript code in between the html tags
</script>
{%endhighlight%}

better style: have a separate style file "main.js" and link in your html file:
{%highlight html%}
<body> 
  <!-- if your code relies on html elements or other scripts, they need to be implemented or linked to before --> including your script.
   <script src="main.js"></script>
</body> 
{%endhighlight%}
_It is important to note that code is executed sequentially. If your script relies on anything else in your code, your script needs to be linked to last._

you can also include a script from an online source (like D3.js):
{%highlight html%}
<body> 
   <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.14/d3.min.js"></script>
   <!-- code that depends on D3 being loaded needs to come after D3 is included. -->
</body> 
{%endhighlight%}

printing to the console
{%highlight javascript%}
console.log('hello world');
{%endhighlight%}

creating a pop-up window
{%highlight javascript%}
alert('hello world');
{%endhighlight%}

creating a variable:
{%highlight javascript%}
var my_number = 42;
{%endhighlight%}

making a function:
{%highlight javascript%}
function my_function(arguments){
    // do things here... 
}
{%endhighlight%}

to execute the function, call it, don't forget the brackets:
{%highlight javascript%}
my_function();
{%endhighlight%}

### interactivity

Interactivity happens in three steps:

1. Assign an ID to the html element
1. Get html element(s) you want to interact with 
1. Add an event listener (what triggers the action?) and execute code

assigning id to html element:
{%highlight html%}
<img id="cat" src="cat.jpg">
{%endhighlight%}

linking to the html element:
{%highlight javascript%}
var cat_image = document.getElementById('cat');
{%endhighlight%}

adding an event listener and executing a function
{%highlight javascript%}
cat_image.addEventListener("click", meow);
// the function needs to be written, too
function meow() {
        alert("Meow!");
    };
{%endhighlight%}

alternative way for functions that are only executed in this context and don't need to be available in other parts of the code (anonymous functions)
{%highlight javascript%}
cat_image.addEventListener("click", function() {
        alert("Meow!");
    };
{%endhighlight%}

### most common data types:

strings:
{%highlight javascript%}
var my_string = "hello world";
var also_a_string = 'hello world';
// javascript doesn't care about which quotes you use, as long as they are consistent
{%endhighlight%}

numbers:
{%highlight javascript%}
var my_number = 42;
{%endhighlight%}

adding strings to numbers returns a string:
{%highlight javascript%}
var adding_things_1 = "hello world" + 42;
// returns: "hello world42"
var adding_things_2 = "41" + 42;
// returns: "4142"
var adding_things_3 = 41 + 42;
// returns: 83
{%endhighlight%}

arrays:
{%highlight javascript%}
// initialise 
var my_array = [1, 2, 3];

// access
my_array[0]   // returns: 1
my_array[2]   // returns: 3

// append an array
my_array.push(4); // my_array = [1,2,3,4]
{%endhighlight%}

objects:
{%highlight javascript%}
// initialise
var my_dog = {
    name: "fido",
    weight: "100",
    previous_weights: [80, 90, 95, 100, 110],
    attribute: "value"
    }
// access
my_dog.name // returns: "fido"
// add new attributes after creation
my_dog.happiness = 42;   
{%endhighlight%}
_You can make an array of objects and objects can contain arrays... or arrays of objects with arrays of objects._


### copying, maps, and filters:

copy an array:
{%highlight javascript%}
var old_array   = [1,2,3];
var new_array = old_array.map(function(old_array_element){
    return old_array_element;
});
{%endhighlight%}
        
map array onto a new array (adding 10 to every value):
{%highlight javascript%}
var old_array   = [1,2,3];
var new_array = old_array.map(function(old_array_element){
    return old_array_element + 10;
});
{%endhighlight%}

filter an array:
{%highlight javascript%}
var filtered_array = old_array.filter(function(old_array_element){
   return old_array_element > 1;
}); 
// filtered_array =  [2, 3]
{%endhighlight%}

## Terms you can google:
javascript | event listeners | get element by id | javascript functions | javascript filter | javascript map

[list of event listeners](http://www.w3schools.com/jsref/dom_obj_event.asp)

[functions to be used with arrays](http://www.w3schools.com/jsref/jsref_obj_array.asp)

[javascript objects](http://www.w3schools.com/js/js_object_definition.asp)


# D3

include the D3 script in html file:
{%highlight html%}
<body> 
   <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.14/d3.min.js"></script>
   // code that depends on D3 being loaded needs to come after D3 is included.
</body> 
{%endhighlight%}

adding an html element to the page:
{%highlight javascript%}
var new_svg_element = present_div_element.append("svg");
var new_circle = new_svg_element.append("circle");
{%endhighlight%}

will result in:
{%highlight html%}
<div> 
   <svg>
      <circle>
      </circle>
   </svg>
</div>
{%endhighlight%}

changing attributes of elements:
{%highlight javascript%}
c1.attr("r", 40);
c1.attr("cx", 40)
c1.attr("cy", 40);
c1.attr("stroke", "black");
c1.attr("fill", "green");  
{%endhighlight%}

setting up a scale and axes and appending it to the page:
{%highlight javascript%}
var xScale = d3.scale.linear() 
   // setting up a linear scale
   .domain([10, 85]) 
   // data is between 10 and 85
   .range([0, scale_width]); 
   // data needs to be mapped to an element on the page with the width 'scale_width'

var sAxis_generator = d3.svg.axis() 
   // setting up the axis as an svg element
   .scale(xScale) 
   // using our predefined scale
   .orient("bottom"); 
   // orienting the ticks at the bottom

html_element.append("g") 
   // append a group to an already existing html element
    .call(xAxis_generator) 
   // create the axis by calling the generator function
{%endhighlight%}

Magical D3 functions:

1. To link/bind our data to our graphical objects we use the '.data()' function from D3
1. To handle new data in our data set we use the '.enter()' function to add graphical objects 
1. To handle deleted data from our data set we use the '.exit()' function to remove graphics objects
1. To handle changes in the values in our data we use the '.transition()' function to update graphical objects

example code for data binding:
{%highlight javascript%}
var magical_d3_thing = data_canvas.selectAll(".dot")  
// keeps an eye on everything that has or will have the class 'dot' 
   .data(data_that_we_want_to_show, function(data_element){return data_element.unique_id});
{%endhighlight%}

example code for enter():
{%highlight javascript%}
magical_d3_thing.enter()
   .append("circle") 
   // add one circle per new data element
   .attr("class","dot") 
   // assign it the class we are keeping an eye on
   .style("fill", function(data_element) { return colorScale(data_element.region); }) 
   // give it all attributes that don't change dynamically (everything else will be assigned in .transition())
{%endhighlight%}

example code for exit():
{%highlight javascript%}
magical_d3_thing.exit()
   .remove(); 
   // remove the circle corresponding to the data we choose to not display
{%endhighlight%}

example code for transition():
{%highlight javascript%}
magical_d3_thing.transition()
   .ease("linear") 
   // transition between points in a linear way
   .duration(200) 
   // each transition takes 200 ms
   
   // then change attributes according to the data
   .attr("cx", function(data_element) { return xScale(data_element.income[year_idx]); }) 
   .attr("cy", function(data_element) { return yScale(data_element.lifeExpectancy[year_idx]); })
   .attr("r", function(data_element) { return rScale(data_element.population[year_idx]); });
{%endhighlight%}


## Terms you can google:
d3 data binding | d3 enter | d3 exit | d3 transition | d3 append | d3 svg attributes | d3 axes | d3 scales

[d3 examples to copy from](https://github.com/mbostock/d3/wiki/Gallery)

[different quantitative scales](https://github.com/mbostock/d3/wiki/Quantitative-Scales)

[different ordinal scales](https://github.com/mbostock/d3/wiki/Ordinal-Scales)

[excellent free book on d3](http://chimera.labs.oreilly.com/books/1230000000345/index.html)