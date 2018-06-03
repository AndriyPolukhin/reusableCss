const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const pump = require("pump");
const sass = require("gulp-sass");
const slim = require("gulp-slim");
const concat = require("gulp-concat");


// TEST MESSAGE
gulp.task("message", function() {
    return console.log("Gulp Is running");
});


// SET UP FOR PREPROCESSING FILES

// HTLM
gulp.task("copyHtml", function() {
    gulp.src("src/html/*.html")
    .pipe(gulp.dest("dist/html"));
});

// IMAGES
gulp.task("imageMin", function() {
    gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

// JS
gulp.task("scripts", function() {
    gulp.src("src/js/*.js")
        .pipe(gulp.dest("dist/js"));
});

// USED IN CASE OF UGLIFY AND CONCAT JS
gulp.task('minify', function(cb) {
    pump([
        gulp.src('src/js/*.js'),
        concat('main.js'), // 5.1 Added here!!!!
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
    );
});


// SASS to CSS

gulp.task("sass", function() {
    gulp.src("src/sass/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("dist/css"));
});

// SLIM to HTML
gulp.task("slim", function() {
    gulp.src("src/slim/*.slim")
        .pipe(slim({
            pretty: true
        }))
        .pipe(gulp.dest("dist/html"));
});

// DEFAULT
gulp.task("default", ["message", "copyHtml", "imageMin", "scripts", "sass", "slim"]);

// WATCH

gulp.task("watch", function() {
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/img/*", ["imageMin"]);
    gulp.watch("src/sass/*.scss", ["sass"]);
    gulp.watch("src/html/*.html", ["copyHtml"]);
    gulp.watch("src/slim/*.slim", ["slim"]);
});