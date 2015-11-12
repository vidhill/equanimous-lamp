# equanimous-lamp
## David Hill Personal Website / build testing ground

What is intended to become a new version of my personal site 

Might look like a massively overcomplicated build process but I am using this as a test project.  
I'm recreating the typical production build (plus some more) for UI projects that we do at my day job using Maven

Using an all Node + Gulp build process
Building a 3rd party libs dependancies package using Bower


 * LibSass sass compiling
 * linting of Javascript, css and html, exploring which rules to enforce
 * Combination/Minification of all the things
 * Creating a custom build of Modernizr 3 with only the fearure detects I need
  
 To-do:
  * Unit testing of angular-modules using Karma and Jasmine
  * Creating SVG Sprites using SVG Store 
  * Utilise Browser sync http://browsersync.io