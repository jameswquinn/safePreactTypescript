var favicons = require("gulp-favicons");
var gulp = require("gulp");



gulp.task("favicon", function() {
  return gulp
    .src("src/icons/assets/icon.png")
    .pipe(
      favicons({
        appName: "twister",
        appDescription: "Web social app",
        background: "#000",
        theme_color: "#fff",
        lang: "en",
        path: ".",
        url: "https://example.io/",
        display: "standalone",
        orientation: "portrait",
        start_url: "/?homescreen=1",
        version: 1.0,
        logging: true,
        html: "index.html",
        pipeHTML: false,
        replace: false,
        icons: {
          // Platform Options:
          // - offset - offset in percentage
          // - background:
          //   * false - use default
          //   * true - force use default, e.g. set background for Android icons
          //   * color - set background for the specified icons
          //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
          //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
          //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
          //
          opengraph: true,
          android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          yandex: false // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        }
      })
    )
    .pipe(gulp.dest("icons"));
})