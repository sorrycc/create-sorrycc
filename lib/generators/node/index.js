const { basename } = require('path');
const yParser = require('yargs-parser');
const BasicGenerator = require('../../BasicGenerator');

class NodeGenerator extends BasicGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.args = yParser(args);
  }

  writing() {
    this.writeFiles({
      context: {
        name: basename(process.cwd()),
        year: new Date().getFullYear(),
        repo: this.args.repo || 'sorrycc',
        hasCli: this.args.cli || false,
      },
      filterFiles: (file) => {
        if (this.args.cli && file === 'index.js') return false;
        if (!this.args.cli && file === 'cli.js') return false;
        return true;
      },
    });
  }
}

module.exports = NodeGenerator;
