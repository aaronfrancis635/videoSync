const chalk       = require('chalk');
const clear       = require('clear');
const clui        = require('clui');
const figlet      = require('figlet');
const package     = require('./../package.json');

function clearConsole(withLogo) {
    clear();
    if(withLogo){
        console.log(
            chalk.yellow(
              figlet.textSync([package.name], { horizontalLayout: 'full' })
            )
          );
    }
    return true;
}

module.exports = {
    clearConsole : (showLogo) => {
      return clearConsole(showLogo);
    }
};