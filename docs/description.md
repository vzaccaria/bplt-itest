What is it
----------

This command creates a temporary docker container to test your npm
modules. You can use it to test your modules on different node versions
and to check whether dependencies are fully satisfied.

It performs the following steps:

1. Copy a custom Dockerfile into your SRC directory
2. Builds an image containing Node.js 10.x
3. Copies the SRC directory into `src` and removes `src/node_modules`
4. Executes `npm install && npm test`
5. Removes the image

Prerequisites
-------------

On OSX, remember to run

    > $(boot2docker shellinit)

in the same shell where you run the command.
