const PythonShell = require('python-shell');
const spawn = require('child_process').spawn

var options = {
    scriptPath: '../CNN',
    args: ['predict']
}

pyshell = new PythonShell('main.py', options);

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
});

pyshell.end(function (err,code,signal) {
    // if (err) throw err;
    // console.log('The exit code was: ' + code);
    // console.log('The exit signal was: ' + signal);
    console.log('finished');
  });


// without python-shell
// const spawn = require('child_process').spawn;

// const callCNN = async function(){
    // spawn('python', ['../CNN/main.py', 'sliceInput']);
    // const predict = spawn('python', ['../CNN/main.py', 'predict']);
    
    // predict.stdout.on('data', function(data){
    //     console.log(data.toString());
    // });

// attempt #3
// var child = require('child_process').exec('python ../CNN/main.py predict')
// child.stdout.pipe(process.stdout)
// child.on('exit', function() {
//     process.exit()
// })


// attempt #4
// const execSync = require('exec-sync');

// var user = execSync('python ../CNN/main.py sliceInput', true);
// console.log(user);