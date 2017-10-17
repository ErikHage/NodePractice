const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('default', () => {
	return gulp.src('app/*.jsx')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});

//watches react jsx files for changes, and runs default build task when it see changes.
gulp.task('watch', () => {
	watch('app/**.jsx', () => gulp.start('default'));
});
