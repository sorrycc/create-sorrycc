const Generator = require('yeoman-generator');
const glob = require('glob');
const yParser = require('yargs-parser');
const { statSync } = require('fs');

class BasicGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.args = yParser(args);
  }

  writeFiles({ context, filterFiles }) {
    glob
      .sync('**/*', {
        cwd: this.templatePath(),
        dot: true,
      })
      .filter(filterFiles)
      .forEach(file => {
        const filePath = this.templatePath(file);
        if (statSync(filePath).isFile()) {
          this.fs.copyTpl(
            this.templatePath(file),
            this.destinationPath(file.replace(/^_/, '.')),
            context,
          );
        }
      });
  }
}

module.exports = BasicGenerator;
