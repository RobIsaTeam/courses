---
published: true
title: 7 - ThreeJS - It's all about perspective
layout: post
---

_Learning objectives:_

* rotate, set position of mesh and camera.
* adding controls


___

_Challenge: Play with the camera_
From the ThreeJS documentation we find out what parameters we have to pass to the camera:
{%highlight javascript%}
PerspectiveCamera( fov, aspect, near, far )
{%endhighlight%}
`fov` is the view angle, `aspect` the aspect ratio, and `near` and `far` set the range of things you can see in the scene. This image might help to get a better understanding about what's going on:
![https://www3.ntu.edu.sg/home/ehchua/programming/opengl/CG_BasicsTheory.html](https://www3.ntu.edu.sg/home/ehchua/programming/opengl/images/Graphics3D_CameraPerspective.png "camera setup")

Play with the camera settings until you can see the entire brain on the screen. 
...try setting `near = 80`. What happens?

___ 



