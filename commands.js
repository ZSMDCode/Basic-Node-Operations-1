const fs = require("fs");

//write out data
function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
       case "echo":
         commandLibrary.echo(userInputArray.slice(1).join(" "));
         break;

       case "cat":
         commandLibrary.cat(userInputArray.slice(1));
         break;

       case "head":
         commandLibrary.head(userInputArray.slice(1));
         break;

       case "tail":
         commandLibrary.tail(userInputArray.slice(1));
         break;

       case "default":
         commandLibrary.errorHandler(command);
         break;
   }
}

//where we will store the logic of our commands
const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },

    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },

    "head": function(fullPath) {
        const fileName = fullPath[0];
        var lines;
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            lines = data.split('\n').slice(0, 4).join('\n');
            done(lines);
        })
    },

    "tail": function(fullPath) {
        const fileName = fullPath[0];
        var lines;
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            lines = data.split('\n').slice(-4).join('\n');
            done(lines);
        })
    },

    "default": function(userInput) {
        var error = `${userInput} is not valid`;
        done(error);
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;