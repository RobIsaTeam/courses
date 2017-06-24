---
published: true
title: Images and SVG
subtitle: Adding graphical components
layout: post
category: web
---
> ### Learning Objectives
>
> * Adding images to your page
> * Understanding Scalable Vector Graphics (SVGs)
> * Adding multiple SVGs to your page

Websites that only consist of text can sometimes be quite boring. So let's have a look at how
we can add an image.

```html
<img class='image' src="cat.jpg">
```

Note that the image element does not need a closing bracket. Having a closing bracket in this case would imply that there could be content between the brackets, which, in the case of an image does not make sense.

If you want to follow along, you will need to download the cat image from our repository. Or you can select any other image from your computer.

And by adding a class called 'image' to our CSS file, we can define the size and
position of the image we load and apply the style to other images we might want to load.

```css
.image {
	width: 200px;
	position: relative;
	left: 20px;
}
```

The end goal for us is to create a graph, which will be made up of graphical
objects such as lines, circles, and squares (not photos of cats).
We could just find an image of a circle and use this to represent the data by
scaling and positioning it on the page, but that might not be the best way.
An image is an inefficient way to represent lines and circles and your webpage
would spend an unnecessary amount of time downloading each of these image files.

A better way to include graphical elements that aren't photos, is to use Scalable
Vector Graphics (SVGs).

An SVG is just another element in the HTML file, used in the same way as a division.

```html
<svg class="chart">
 	<circle cx="25" cy="25" r="15" class="circ1">
 	</circle>
</svg>
```

Here, we've created an SVG canvas, using the styles of the class 'chart'.
Within this element, we've created a circle, using the styles of the class 'circ1'.
Both of these classes need to also be defined in our CSS file:

```css
.chart {
	width: 100px;
	height: 100px;
}

.circ1 {
	stroke: green;
	fill: white;
	stroke-width: 5;
}
```

The circle element is already defined. 'cx', 'cy', and 'r' are attributes that
are special to the circle element. 'cx' and 'cy' define the x and y coordinates of
the center of the circle, 'r' is the radius of the circle.

But what if we don't want to only use circles, but instead want to use other shapes?
On the internet we can find tons of helpful examples. A good resource to
find simple examples of using different, commonly used SVG shapes is
[w3school](http://www.w3schools.com/svg/default.asp).

> ### Challenge: Question
>
> What happens if 'cx' and 'cy' aren't set?

> ### Challenge: Make art!
>
> Make some art, using at least one circle, one rectangle, and one polygon.
> If you don't know what to do, draw a robot!
