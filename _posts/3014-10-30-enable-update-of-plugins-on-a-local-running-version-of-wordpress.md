---
layout: new-post
title:  "How to update plugins on a locally installed version of WordPress on OSX"
description: "When developing a site in WordPress on a local machine - you can't initially update the plugins with FTP. This article shows you how to do it."
date:   2014-10-30 09:38:25
thumb: cover14-thumb.jpg
imagefeature: cover14.jpg
effect: intro-effect-sidefixed
categories: terminal bash wordpress
---

#### To enable updates locally on OSX do the following:

Complete all steps and ***then change ownership back to you*** otherwise you won't be able to edit anything.

----

### Before updating

1. ##### Add following code to wp-config.php

  {% highlight bash %}
  define('FS_METHOD','direct');
  {% endhighlight %}


2. ##### Change ownership and permissions of entire wp-content folder to apache owner
  {% highlight bash %}
  sudo chown -R _www wp-content; sudo chmod -R g+w wp-content
  {% endhighlight %}

3. Go to WordPress admin and update your plugins

----

### After updating

1. ##### Comment out the line in wp-config.php

  {% highlight bash %}
  # define('FS_METHOD','direct');
  {% endhighlight %}

2. ##### Change ownership back to originial owner:group and change permissions back to default 755
  {% highlight bash %}
  sudo chown -R michaelwatts:wheel wp-content; sudo chmod -R 755 wp-content
  {% endhighlight %}

3. ##### Change ownership and permissions of uploads directory back to apache owner so _www can upload/edit
  {% highlight bash %}
  sudo chown -R _www wp-content/uploads; sudo chmod -R g+w wp-content/uploads
  {% endhighlight %}
