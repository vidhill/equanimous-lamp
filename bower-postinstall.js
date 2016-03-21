var gulp = require('gulp')

//var mkdirp = require('mkdirp');

var bowerFile = require('./bower.json')
var dependicies = bowerFile.devDependencies;
var depArray = []


for (var dep in dependicies) {
  if(dependicies.hasOwnProperty(dep)){
    depArray.push(dep);
  }
}

console.log(depArray);


// copy angular core into versioned folder
gulp.src('third-party-libs/components/angular/**')
  .pipe(gulp.dest('third-party-libs/versioned/angular.js/'+ dependicies['angular'] ))
  .on('end', function(){
    // console.log('pow!')
  });
  ;


for(var i = 0, j = depArray.length; i<j; i++ ){
  var depName = depArray[i];

  if(depName !== 'angular') {
    if(depName.indexOf('angular') !== -1 ){
        console.log(depName);
        gulp.src('third-party-libs/components/' + depName + '/**' )
          .pipe(gulp.dest('third-party-libs/versioned/angular.js/'+ dependicies['angular'] ))


    } else {
        console.log('non Angular' + depName);
        gulp.src('third-party-libs/components/' + depName + '/**' )
          .pipe(gulp.dest('third-party-libs/versioned/' + depName + '/' + dependicies[depName] ))

    }
  }
}
