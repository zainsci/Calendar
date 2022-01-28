const chokidar = require("chokidar")
const sass = require("sass")
const autoprefixer = require("autoprefixer")
const postcss = require("postcss")
const path = require("path")
const fs = require("fs")

const SRC_DIR = path.resolve(__dirname, "css")
const SRC_FILE = path.resolve(__dirname, "css/style.scss")
const DIST_DIR = path.resolve(__dirname, "../dist")
const DIST_CSS_DIR = path.resolve(__dirname, "../dist/css")
const DIST_FILE = path.resolve(__dirname, "../dist/css/style.css")

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdir(DIST_DIR, () => {
    console.log("CREATED DIR DIST")
  })
}

if (!fs.existsSync(DIST_CSS_DIR)) {
  fs.mkdir(DIST_CSS_DIR, () => {
    console.log("CREATED DIR DIST/CSS")
  })
}

chokidar.watch(SRC_DIR).on("all", (event, path) => {
  if (event === "change") {
    buildSASS()
  }
})

function buildSASS() {
  sass.render(
    {
      file: SRC_FILE,
      outFile: DIST_FILE,
    },
    (e, r) => {
      if (e) console.log("ERROR: " + e)
      else {
        postcss([autoprefixer])
          .process(r.css)
          .then((result) => {
            result.warnings().forEach((warn) => {
              console.warn(warn.toString())
            })

            fs.writeFile(DIST_FILE, result.css, (e) => {
              console.log(
                `[${
                  new Date().toLocaleString().split(", ")[1]
                }]: SCSS COMPILATION SUCCESSFUL`
              )
            })
          })
      }
    }
  )
}

buildSASS()
