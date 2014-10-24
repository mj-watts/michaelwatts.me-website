---
layout: new-post
title:  "Rename files in a directory with the terminal"
description: "Using terminal commands can be quicker..."
date:   2014-10-22 09:38:25
thumb: thumb10.jpg
imagefeature: cover11.jpg
effect: intro-effect-sidefixed
categories: terminal bash
---

## Using find command (better on larger directories)

Replace 'shoe_monkey_' with whatever or delete for '0001.jpg'

{% highlight bash %}
find . -name '*.jpg' | awk 'BEGIN{ a=0 }{ printf "mv %s shoe_monkey_%04d.jpg\n", $0, a++}' | bash
{% endhighlight %}


## Using ls command

Replace 'shoe_monkey_' with whatever or delete for '0001.jpg'

{% highlight bash %}
ls *.jpg| awk 'BEGIN{ a=0 }{ printf "mv %s shoe_monkey_%04d.jpg\n", $0, a++ }' | bash
{% endhighlight %}
