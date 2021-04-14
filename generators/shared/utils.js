const shell = require('shelljs');
const yosay = require('yosay');
const Chalk = require('chalk');

exports.helloLog = (message) => {
 return console.log(yosay('Hello, and welcome to ' + message + ' generator: !'));
};

exports.checkJava = () => {
   return new Promise((resolve, reject) => { 
   if (shell.which('java')) {
        shell.exec(
          'java -version', {
          silent: true,
          async: true
        },
          (code, output, stderr) => {
            if (stderr.search('build') === -1) {
              reject(new Error('Java version no detectada'));
            } else {
              let index = stderr.search('version ');
              let version = stderr.substring(index + 9, index + 11);
              if (Number(version) === 11) {
                resolve("Versión Java encontrada correcta");
              } else {
                reject(new Error('Se require Java 11'));
              }
            }
          }
        );
      } else {
        reject(new Error('Java no detectado'));
      }
         });
};

exports.startSpinner = (ora, message) => {
    ora.start(`${Chalk.green(message)}`);
}

exports.endSpinnerOK = (ora, message) => {
    ora.succeed(`${Chalk.green('FINALIZADO -> ' + message)}`);
}

exports.endSpinnerKO = (ora, errorMessage) => {
    ora.fail(errorMessage);
}

