'use strict';
const FujisanExtension = require('../fujisan-extension');

const Combiner = require('stream-combiner2');
const through2 = require('through2');

const renderer = require('../gulp-renderer');
const layouts = require('../shame/layouts');
const helpers = require('./layouts-extension/helpers');

const cleanName = require('../utils/clean-name.js');
class LayoutsExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);

    Object.keys(helpers).forEach((k) => {
      this.runner.registerHelper(k, helpers[k]);
    });

    this.runner.renderer.layouts = this.runner.renderer.layouts || {};
    this.runner.pages.pipeThrough(layouts(this.runner, this.renderStream.bind(this)));
  }

  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.layouts)
      .pipe(through2.obj((file, enc, cb) => {
        this.registerLayout(cleanName(file), file);
        cb();
      }));
  }

  renderStream() {
    return Combiner.obj([
      renderer(this.runner)
    ]);
  }

  registerLayout(name, file) {
    this.runner.renderer.layouts[name] = file;
  }

  registerTasks() {
    // HACK: Rename to loadLayouts
    this.gulp.task(`${this.config.prefix}:build:layouts`, () => {
      return this.getStream();
    });
  }
}

module.exports = LayoutsExtension;
