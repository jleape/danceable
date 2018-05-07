
const exec = require('mz/child_process').exec
const fs = require('mz/fs');

var options = {
    scriptPath: './CNN',
    args: ['predict']
}

async function callCNN() {
    await exec(`python ${__dirname}/CNN/main.py sliceInput`, {cwd: `${__dirname}/CNN`});
    var res = await exec(`python ${__dirname}/CNN/main.py predict`, {cwd: `${__dirname}/CNN`});
    var predictions = JSON.parse(res[0].trim());
    return predictions
}
module.exports = callCNN;