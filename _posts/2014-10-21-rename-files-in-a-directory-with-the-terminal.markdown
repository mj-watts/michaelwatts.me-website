---
layout: plain-post
title:  "Rename files in a directory with the terminal"
description: "Using terminal commands can be quicker..."
date:   2014-10-22 09:38:25
thumb: thumb10.jpg
effect: intro-effect-sidefixed plain
categories: terminal bash
comments: true
---

***WARNING: Watch out this can bite - use with caution, backup your files first!***

#### Using find command

This works better on larger directories. Finds anything with .jpg extension. You can delete 'your_file_name_' for sequential file names like '0001.jpg'.

{% highlight bash %}
find . -name '*.jpg' | awk 'BEGIN{ a=0 }{ printf "mv %s your_file_name_%04d.jpg\n", $0, a++}' | bash
{% endhighlight %}

#### Using ls command

Alternative way of doing it with the ls command

{% highlight bash %}
ls *.jpg | awk 'BEGIN{ a=0 }{ printf "mv %s shoe_monkey_%04d.jpg\n", $0, a++ }' | bash
{% endhighlight %}

----

#### Aside

The [pipeline](http://www.gnu.org/software/bash/manual/bash.html#Pipelines "Pipelines") character between each command is connecting the output of the first command to the input of the next command.

1. So before the first pipe we are finding anything in the current directory with a .jpg extension.

2. The next command uses AWK to process the file names.
