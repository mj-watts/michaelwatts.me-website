---
layout: plain-post
title:  "Get 5 columns in Bootstrap"
description: "There are 2 ways to do this - not quite fully functional hack or rewire the css"
date:   2014-10-31 09:38:25
thumb: thumb10.jpg
categories: Twitter Bootstrap, CSS
comments: true
---


#### The Hacky way

This doesn't change any code it just gives 5 columns, 2 cols wide with 1 col offset either side.

{% highlight html linenos=table %}

<div class="row fudged-columns">
    <div class="col-sm-2 col-sm-offset-1 diff-color"></div>
    <div class="col-sm-2 diff-color color-1"></div>
    <div class="col-sm-2 diff-color color-2"></div>
    <div class="col-sm-2 diff-color color-3"></div>
    <div class="col-sm-2 diff-color color-4"></div>
</div>

{% endhighlight %}


#### Rewire the CSS

With a little css we can easily do our own

{% highlight css linenos=table %}

/* Rewired 5 Columns */
.col-xs-5ths,
.col-sm-5ths,
.col-md-5ths,
.col-lg-5ths {
    position: relative;
    min-height: 1px;
    padding-right: 10px;
    padding-left: 10px;
}

.col-xs-5ths {
    width: 20%;
    float: left;
}
@media (min-width: 768px) {
.col-sm-5ths {
        width: 20%;
        float: left;
    }
}
@media (min-width: 992px) {
    .col-md-5ths {
        width: 20%;
        float: left;
    }
}
@media (min-width: 1200px) {
    .col-lg-5ths {
        width: 20%;
        float: left;
    }
}

{% endhighlight %}

#### Result

Below the header is the first hacky way and below that is the rewired way:

<iframe width="100%" height="500" src="http://jsfiddle.net/altescape/YSa3X/embedded/result,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

[View fiddle](http://jsfiddle.net/altescape/YSa3X/embedded/result/)

