const Generator = require('yeoman-generator');
const glob = require('glob');

class BasicGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writeFiles({ context, filterFiles }) {
    glob
      .sync('**/*', {
        cwd: this.templatePath(),
        dot: true,
      })
      .filter(filterFiles)
      .forEach(file => {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file.replace(/^_/, '.')),
          context,
        );
      });
  }
}

module.exports = BasicGenerator;
