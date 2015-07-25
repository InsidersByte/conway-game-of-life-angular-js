/**
 * Created by Jonathon on 25/07/2015.
 */
var path = require("path"),
    gulp = require("gulp"),
    del = require("del"),
    mainBowerFiles = require("main-bower-files");

gulp.task("clean", function (cb) {
    del(["./public/vendor/**", "!./public/vendor"], cb);
});

gulp.task("copy-bower-components", ["clean"], function () {
    gulp.src(mainBowerFiles({
        paths: {
            bowerDirectory: "./bower_components",
            bowerJson: "./bower.json"
        }
    }))
    .pipe(gulp.dest("./public/vendor"));
});

gulp.task("default", ["copy-bower-components"]);