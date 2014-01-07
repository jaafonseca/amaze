A Maze
======

This is a maze game built with CraftyJS. An hunter has to navigate through a
maze that increases in complexity with every level up. Find the magic scroll
to complete the level.

This is heavily untested and there is a good chance it only works on Google Chrome :-)

Run
---
To run the game, place make sure you have http://vertx.io installed on your system. Documentation on
how to install and run _vertx_ is available from the website.

### Clone the repository
    git clone git@github.com:jaafonseca/amaze.git

### Start the application with vertex
    vertx run app.js

### Open in browser
    http://localhost:8080/



References
----------

http://craftyjs.com/ - CrafyJS Homepage and links to documentation

http://buildnewgames.com/introduction-to-crafty/ - Step by Step introduction to Crafty with examples.

http://opengameart.org/ - Images, Sprites, Sounds, etc

How to deploy to OpenShift
----------

Create OpenShift application

	rhc app create -a amaze -t diy-0.1

This will create a new git repo for your application and enter the directory

	cd amaze

Add _this_ repository as new remote

	git remote add template -m master git://github.com/adaofeliz/amaze.git

and pull locally

	git pull -s recursive -X theirs template master

and deploy to OpenShift

	git push origin master

Now, your application is available at

	http://amaze-$namespace.rhcloud.com/

Take a look how we install vert.x in the script .openshift/action_hooks/pre_build for an idea of how to do that.
