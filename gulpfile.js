const gulp = require('gulp'),
    watch = require('gulp-watch'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('rollup-plugin-babel'),
    commonJs = require('rollup-plugin-commonjs'),
    resolveNodeModules = require('rollup-plugin-node-resolve'),
    rollupJS = (inputFile, options) => {
      return () => {
        return rollup({
          input: options.basePath + inputFile,
          format: options.format,
          sourcemap: options.sourcemap,
          plugins: [
            babel(babelConfig),
            resolveNodeModules(),
            commonJs(),
          ]
        })
      .pipe(source(inputFile, options.basePath))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(options.distPath));
  };
};
// plugins for tests
const mocha = require('gulp-mocha'),
      jasmine = require('gulp-jasmine');
// plugins for validations
const eslint = require('gulp-eslint');
// plugins for documentation
const jsdoc = require('gulp-jsdoc3');

// configs
const path = require('./configs/path.json');
const jsDocconfig = require(path.configs.jsDoc);
const babelConfig = require(path.configs.babel);

gulp.task('js', rollupJS('index.js', {
  basePath: path.src.js,
  format: 'cjs',
  distPath: path.build.js,
  sourcemap: true
}));
 
 
gulp.task('watch', function () {
    gulp.watch(path.watch.js, ['js']);
});

gulp.task('lintJs', () => {
  return gulp.src([path.validation.js,'!node_modules/**'])
    .pipe(eslint({
      fix: true       // редактирует ошибки если может
    }))
    .pipe(eslint.format())
    gulp.dest(jsFixedLinterOutput)
    .pipe(eslint.results(results => {
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
    }))
});


/*
    В моем проекте стоит стандарт airbnb,под свои проект можно сконфигурировать файл заново 
    командой:
    ./node_modules/.bin/eslint --init

*/
/*
             Main tasks

*/
gulp.task('test:mocha', () =>
    gulp.src(path.tests.mocha) //
        .pipe(mocha())
);

gulp.task('test:jasmine', () =>
    gulp.src(path.tests.jasmine)
        .pipe(jasmine())
);

 
gulp.task('doc', function (cb) {
    gulp.src([path.docs.jsDoc, `${path.build.js}index.js`], {read: false})
    .pipe(jsdoc(jsDocconfig, cb));
});

gulp.task('default', ['lintJs', 'js' , 'watch'] );


