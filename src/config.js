
const fs = require('fs');

exports.getConfig = () => {
  try {
    return JSON.parse(fs.readFileSync('./config.json').toString());
  } catch (error) {
    return {
      'intervalToSend': 2000,
      'timeToProcess': 1000
    }
  }
}
