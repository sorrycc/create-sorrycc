const uuid = require('uuid');
const BasicGenerator = require('../../BasicGenerator');

function bundleId(props) {
  return `com.sorrycc.${props.alfredName}`;
}

const uuids = new Map();
function generateUuid(key) {
  if (key && uuids.has(key)) {
    return uuids.get(key);
  }

  const id = uuid.v4().toUpperCase();

  if (key) {
    uuids.set(key, id);
  }

  return id;
}

class NodeGenerator extends BasicGenerator {
  writing() {
    const props = {
      name: this.name,
      year: new Date().getFullYear(),
      repo: this.args.repo || 'sorrycc',
      hasCli: this.args.cli || false,
      alfredName: this.name.replace(/^alfred-/, ''),
      alfredCategory: 'Uncategorised',
    };
    this.writeFiles({
      context: {
        ...props,
        alfredBundleId: bundleId(props),
        uuid: generateUuid,
      },
    });
  }
}

module.exports = NodeGenerator;
