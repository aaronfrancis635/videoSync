const config      = require('./../config.json');
const chalk       = require('chalk');


function debugLog(str, level = 0){
    if(config.debug){
        switch(level){
            case(0):
                console.debug(str);
                break;
            case(1):
            console.log(chalk.yellow(
                    str
                ));
                break;
            case(2):
                console.log(chalk.red(
                    str
                ));
        }
    }
}

module.exports = {
    debug : (str, level) => {
      return debugLog(str, level);
    },
    warn : 1,
    problem : 2
};