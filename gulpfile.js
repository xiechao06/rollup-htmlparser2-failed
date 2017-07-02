const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const includePaths = require('rollup-plugin-includepaths');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');

gulp.task('build', function () {
  const plugins = [
    globals(),
    builtins(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
      // preferBuiltins: true,
    }),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {'sprintf-js': [ 'sprintf' ]}
    }),
    json(),
  ];
  gulp.src(['./index.js'])
  .pipe(rollup({
      plugins,
  }, {
      format: 'umd',
  }))
  .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['build']);
