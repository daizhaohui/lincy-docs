const gulp = require("gulp");
const clean = require('gulp-clean');
const run = require('gulp-run-command').default;


gulp.task("clean",()=>{
    return gulp.src('dist/docs', { read: false, allowEmpty: true }).pipe(clean('dist/do c s'));
});

gulp.task("copy_bin",()=>{
    return  gulp.src('docs/**/*').pipe(gulp.dest('dist/docs'));
});

gulp.task("copy_html",()=>{
    return  gulp.src('src/.vuepress/dist/**/*').pipe(gulp.dest('dist/docs'));
});

gulp.task("pack", run('npm pack',{cwd:'dist/docs'}));

gulp.task("copy_pack",()=>{
    return gulp.src('dist/docs/*.tgz').pipe(gulp.dest('../dist'));
});

gulp.task("docs",gulp.series("clean","copy_bin","copy_html","pack","copy_pack"));
