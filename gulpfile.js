const {src, dest, parallel, series, watch} = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff2 = require("gulp-ttf2woff2");
// const image = require('gulp-image')
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();
var exec = require('child_process').exec;
const cheerio = require("gulp-cheerio");
const rename = require("gulp-rename");
const fileInclude = require("gulp-file-include");
const {readFileSync} = require('fs');
const fs = require('fs');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const tiny = require('gulp-tinypng-compress');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDel = require('gulp-rev-delete-original');

const clean = () => {
  return del(["smt/static/dist/*", "smt/*/templates/**/*.html", "!smt/front/*", "!smt/static/dist/fonts"]);
};
//
const resources = () => {
  return src("smt/front/src/assets/resources/**")
      .pipe(dest("smt/static/dist/resources"));
};

const fonts = () => {
  return src("smt/front/src/assets/fonts/**/*.ttf")
      .pipe(ttf2woff2())
      .pipe(dest("smt/static/dist/fonts/"));
};

const styles = () => {
  return src("smt/front/src/assets/styles/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: "expanded",
      }).on("error", notify.onError()))
      .pipe(rename({
        suffix: ".min",
      }))
      .pipe(
          autoprefixer({
            cascade: false,
          }))
      .pipe(
          cleanCSS({
            level: 2,
          }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest("smt/static/dist/styles"))
      .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("smt/front/src/assets/images/svg/**/*.svg")
      .pipe(
          cheerio({
            run: function ($) {
              $("[fill]").removeAttr("fill");
              // $("[stroke]").removeAttr("stroke");
              $("[style]").removeAttr("style");
            },
            parserOptions: {xmlMode: true},
          })
      )
      .pipe(
          svgSprite({
            mode: {
              stack: {
                sprite: "../sprite.svg",
              },
            },
          })
      )
      .pipe(dest("smt/static/dist/images"));
};

const scripts = () => {
  return src(["smt/front/src/assets/scripts/main.js"])
      .pipe(webpackStream({
        output: {
          filename: 'main.js',
        },
        mode: 'development',
        experiments: {
          topLevelAwait: true
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env', {targets: "defaults"}]
                  ]
                }
              }
            }
          ]
        },
      }))
      .pipe(sourcemaps.init())
      .pipe(uglify().on("error", notify.onError()))
      .pipe(sourcemaps.write())
      .pipe(dest("smt/static/dist/js"))
      .pipe(browserSync.stream());
};

const imgToApp = () => {
  return src(["./smt/front/src/assets/images/**/*.jpg", "./smt/front/src/assets/images/**/*.png", "./smt/front/src/assets/images/**/*.jpeg", "./smt/front/src/assets/images/**/*.svg"])
      .pipe(dest("./smt/static/dist/images"));
};
//
const htmlInclude = () => {
  return src(["./smt/front/src/templates/**/*.html"])
      .pipe(
          fileInclude({
            prefix: "@",
            basepath: "@file",
          })
      )
      .pipe(dest("./smt"))
      .pipe(browserSync.stream());
};

// const htmlMinify = () => {
//   return src('dist/**/*.html')
//     .pipe(htmlMin({
//       collapseWhitespace: true
//     }))
//     .pipe(dest('dist'))
// }

// const runserver = () => {
//   let proc = exec('python manage.py runserver')
// }
//
const watchFiles = () => {
  browserSync.init({
    // proxy: '127.0.0.1:8000/home/new_index',
    notify: false,
    // port: 8000,
    // host: "127.0.0.1",
    server: {
      baseDir: "./smt/static/new_lk",
    },
    // callbacks: {
    //   runserver
    // }
  });
};
//
watch("smt/front/src/templates/**/*.html", htmlInclude);
watch("smt/front/src/assets/styles/**/*.scss", styles);
watch("smt/front/src/assets/scripts/**/*.js", scripts);
watch('smt/front/src/assets/images/**/*.jpg', imgToApp)
watch('smt/front/src/assets/images/**/*.png', imgToApp)
watch('smt/front/src/assets/images/**/*.jpeg', imgToApp)
watch('smt/front/src/assets/images/**/*.svg', imgToApp)
watch("smt/front/src/assets/resources/**", resources);
watch("smt/front/src/assets/images/svg/**.svg", svgSprites);
watch("smt/front/src/assets/fonts/**/*.ttf", fonts);
//
// exports.scripts = scripts;
exports.styles = styles;
exports.fonts = fonts;
exports.fileInclude = htmlInclude;
//
exports.default = series(clean, resources, fonts, scripts, htmlInclude, imgToApp, svgSprites, styles);
// // exports.default = series(clean, resources, fonts, scripts, htmlInclude, imgToApp, svgSprites, styles, watchFiles);
//
// const stylesBuild = () => {
//   return src("src/styles/**/*.scss")
//     .pipe(
//       sass({
//         outputStyle: "expanded",
//       }).on("error", notify.onError())
//     )
//     .pipe(
//       rename({
//         suffix: ".min",
//       })
//     )
//     .pipe(
//       autoprefixer({
//         cascade: false,
//       })
//     )
//     .pipe(
//       cleanCSS({
//         level: 2,
//       })
//     )
//     .pipe(dest("smt/static/new_lk/styles"))
// };
//
// const scriptsBuild = () => {
//   return src(["src/js/main.js"])
//     .pipe(webpackStream({
//       output: {
//         filename: 'main.js',
//       },
//       mode: 'production',
//       module: {
//         rules: [
//           {
//             test: /\.m?js$/,
//             exclude: /node_modules/,
//             use: {
//               loader: 'babel-loader',
//               options: {
//                 presets: [
//                   ['@babel/preset-env', { targets: "defaults" }]
//                 ]
//               }
//             }
//           }
//         ]
//       }
//     }))
//     .pipe(uglify().on("error", notify.onError()))
//     .pipe(dest("smt/static/new_lk/js"))
// };

const cache = () => {
  return src(['smt/static/dist/**/*.{css,}', '!smt/static/dist/resources/**'], {
    base: 'smt/static/dist'
  })
      .pipe(rev())
      .pipe(revDel())
      .pipe(dest('smt/static/dist'))
      .pipe(rev.manifest('rev.json'))
      .pipe(dest('smt/home/templates/'));
}

const rewrite = () => {
  const manifest = readFileSync('smt/home/templates/rev.json');

  return src(['smt/home/templates/new_index.html', 'smt/home/templates/new_lk/docs/index_docs.html'])
      .pipe(revRewrite({
        manifest
      }))
      .pipe(dest(['smt/home/templates/']))
      .pipe(dest(['smt/home/templates/new_lk/docs/']));
}

// const tinyPNG = () => {
//   return (src(["./src/img/*/**.jpg", "./src/img/*/**.png", "./src/img/*/**.jpeg"]))
//     .pipe(tiny({
//       key: 'API_KEY',
//       parallel: true,
//       parallelMax: 50,
//       log: true,
//   }))
//   .pipe(dest('./app/img'))
// }

exports.cache = series(cache, rewrite);
// exports.build = series(clean, resources, fonts, scriptsBuild, imgToApp, svgSprites, stylesBuild);
// exports.build = series(clean, resources, fonts, scriptsBuild, htmlInclude, imgToApp, svgSprites, stylesBuild, htmlMinify, tinyPNG);
