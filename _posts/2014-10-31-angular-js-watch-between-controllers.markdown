---
layout: plain-post
title:  "Watch between services and controllers"
description: "Angularjs watch function between a service and a controller. This can be implemented on any controller"
date:   2014-10-31 10:38:25
thumb: thumb11.jpg
categories: javascript angularjs
comments: true
---

{% highlight javascript %}
  var myApp = angular.module('myApp',[]);
  
  myApp.service('myService', function() {
      this.tags = {
          a: true,
          b: true
      };
      
      
      this.setFalseTag = function() {
          alert("Within myService->setFalseTag");
          this.tags.a = false;
          this.tags.b = false;
          
          //how do I get the watch in MyCtrl to be triggered?
      };
  });
  
  
  myApp.controller('MyCtrl', function($scope, myService) {
      
      //$scope.myService = myService;
      
      $scope.setFTag = function() {
          alert("Within MyCtrl->setFTag");
          myService.setFalseTag();
      };        
      
      $scope.$watch(function () {
      return myService.tags;
  }, 
                    
        function(newVal, oldVal) {
          alert("Inside watch");
          console.log(newVal);
          console.log(oldVal);
      }, true);
      
  });
{% endhighlight %}

