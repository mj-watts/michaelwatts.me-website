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

How to update plugins on a locally installed version of WordPress on OSX
==============================

#### To enable updates locally on OSX do the following:

Complete all steps and ***then change ownership back to you*** otherwise you won't be able to edit anything.

----

### Before updating

1. ##### Add following code to wp-config.php

  ~~~
  define('FS_METHOD','direct');
  ~~~


2. ##### Change ownership and permissions of entire wp-content folder to apache owner
  ~~~
  sudo chown -R _www wp-content; sudo chmod -R g+w wp-content
  ~~~

3. Go to WordPress admin and update your plugins

----

### After updating

1. ##### Comment out the line in wp-config.php

  ~~~
  # define('FS_METHOD','direct');
  ~~~

2. ##### Change ownership back to originial owner:group and change permissions back to default 755
  ~~~
  sudo chown -R michaelwatts:wheel wp-content; sudo chmod -R 755 wp-content
  ~~~

3. ##### Change ownership and permissions of uploads directory back to apache owner so _www can upload/edit
  ~~~
  sudo chown -R _www wp-content/uploads; sudo chmod -R g+w wp-content/uploads
  ~~~

----

### @todo:
1. See if you can skip changing everything but the themes folder as that is where most editing is done, so wouldn't need to change and change back everytime.
2. Set this with an admin button if possible.
