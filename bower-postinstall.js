var gulp = require('gulp')

var folderPaths = {
  from: 'third-party-libs/components',
  to: 'third-party-libs/versioned'
};

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
gulp.src(folderPaths.from + '/angular/**')
  .pipe(gulp.dest( folderPaths.to + '/angular.js/'+ dependicies['angular'] ));


for(var i = 0, j = depArray.length; i<j; i++ ){
  var depName = depArray[i];

  if(depName !== 'angular') {
    if(depName.indexOf('angular') !== -1 ){
        //console.log(depName);
        gulp.src(folderPaths.from + '/' + depName + '/**' )
          .pipe(gulp.dest(folderPaths.to +'/angular.js/'+ dependicies['angular'] ))


    } else {
        // console.log('non Angular' + depName);
        gulp.src(folderPaths.from + '/' + depName + '/**' )
          .pipe(gulp.dest(folderPaths.to + '/' + depName + '/' + dependicies[depName] ))

    }
  }
}
