const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass =require('gulp-sass');
const concat = require('gulp-concat');
/*
-- TOP LEVEL FUNCTIONS --

gulp.task - Defines task
gulp.src - point to the files to use
gulp.dest - point to the folder to output
gulp.watch - watch files and folders for changes
gulp.series - run various tasks one after another
gulp.parllel - run various task simontaniously


*/

// Logs message

gulp.task('message',function(){
    return console.log('gulp is running');
    
})

// copy all html files
gulp.task('copyhtml',function(done){
    // the source is set any html file inside the src folder

    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    done();
})


// image min plugin (optimizes images, working for png in current setting. check the documentation for settings)
gulp.task('imageMin',(done)=>{
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
    done();
})

// uglify plugin  (used for minfications)

gulp.task('uglify',(done)=>{
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
})

// the plugin to compiles sass

gulp.task('sass',(done)=>{
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('dist/css'));
    done();

})

// task to concat js files

gulp.task('concatjs',(done)=>{
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
})

// default task
gulp.task('default',gulp.parallel('copyhtml','imageMin','sass','concatjs'));


// the infamous watch task

gulp.task('watch',(done)=>{
    gulp.watch('src/sass/*.scss',gulp.parallel('sass'))
    gulp.watch('src/*html',gulp.parallel('copyhtml'))
    gulp.watch('src/js/*js',gulp.parallel('concatjs'))
    gulp.watch('src/images/*',gulp.parallel('imageMin'))
    console.log('watching.....')
    done()

})

