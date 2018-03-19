var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');

// Compile sass into CSS & auto-inject into browser
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// Move the javascript files into our css/js folder
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/popper.js/dist/popper.min.js', 
        'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

// Static server + watching scss / html files
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: './src'
    });
    
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/sass/*.scss'], ['sass']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

gulp.task('default', ['js', 'server']);

