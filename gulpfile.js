const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');



// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src('src/assets/sass/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/assets/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function() {
    return gulp.src("src/assets/js/**/*.js")
        .pipe(gulp.dest("dist/assets/js"));
});

gulp.task('fonts', function() {
    return gulp.src("src/assets/fonts/**/*")
        .pipe(gulp.dest("dist/assets/fonts"));
});

gulp.task('icons', function() {
    return gulp.src("src/assets/img/icons/**/*")
        .pipe(gulp.dest("dist/assets/img/icons"));
});

gulp.task('mailer', function() {
    return gulp.src("src/assets/mailer/**/*")
        .pipe(gulp.dest("dist/assets/mailer"));
});

gulp.task('images', function() {
    return gulp.src("src/assets/img/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/assets/img/images"));
});



gulp.task('default', gulp.parallel('watch', 'browser-sync', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'images', 'html'));