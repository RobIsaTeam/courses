---
published: true
title: 3 - ThreeJS - Introduction to CSS
layout: post
tags: [threejs]
categories: [threejs, course, material, ]
---
*Learning Objectives*

* Change the appearance of different HTML elements
* Create new classes in a CSS file
* Apply these classes to different HTML elements

___

The heading has a certain look. This look (or style) includes the color, position, font size, as well as many other attributes.

We can change the appearance of our text in different ways. A quick way is to simply mention what we want our element to look like when we create it by setting the "style" attribute. If we want to change the color, for example, we write:

{%highlight html%}
<h1 style="color:blue">This is a blue heading</h1>
{%endhighlight%}

Changing the font size:

{%highlight html%}
<h1 style="font-size: 80px">This is a big heading</h1>
{%endhighlight%}

If we want to change two things at the same time, we just mention all of them at once:

{%highlight html%}
<h1 style="font-size: 80px; color: blue">This is a big, blue heading</h1>
{%endhighlight%}

This is a quick and simple way to change the appearance of elements on the spot. However, if we want to create different elements of the same type, we have to do a lot of typing, and our file will quickly become confusing and hard to maintain.

If we want to change the look of many elements at the same time, we can instead create a style file (extension .css).

In this file (style.css), we can define classes, that we can then apply to one or more of our elements in the HTML file. Let's create a class called 'title' that we want to apply to different elements on our page.

{%highlight css%}
.title
{
    color: red;
    font-size: 50px;
    text-align: center;
}
{%endhighlight%}

All that's left to do, is to tell the HTML file where to find our new CSS file. This is done by linking to it in the head:

{%highlight html%}
<!DOCTYPE html>
<html> 
    <head> 
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head> 
{%endhighlight%}

In the body, we can use the class that we just created:

{%highlight html%}
    <body> 
        <div class="title"> First title </div>
        <div> some text </div>
        <div class="title"> And another title </div>
    </body> 
</html> 
{%endhighlight%}

___

*Challenge: Create and use your own class*

Create a class called 'description' and a 'div' element with text that has this class. Make the text dark gray with a custom font size. Add a black border just on the left side of the 'div' and add padding around the text. Try adding in enough text so that it wraps over multiple lines, and then set the width of the 'div' to different values. Try setting the background color of the 'div' element. If you like, play with the 'title' class as well, until you like how it looks.

___

We can check out how our elements are styled in the developer tools. To get to them, right-click on any element on the page and select 'Inspect element'. The developer tools should open and you should be in the 'Elements' tab. Here, you can navigate through the html file and inspect css properties at the same time.
