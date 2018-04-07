// File containing the logic for the course of the game, which depends on Word.js
var inquirer = require('inquirer');
var Word = require('./word');

var words = ['CATERPILLAR', 'BUMBLEBEE', 'BUTTERFLY', 'DRAGONFLY', 'COCKROACH', 'GRASSHOPPER'];

// Randomly selects a word and uses the Word constructor to store it
var word = new Word(words[Math.floor(Math.random() * words.length)]);
console.log(word);
console.log('\n');

// Test:
// word.checkGuess('a');

// Prompts the user for each guess and keeps track of the user's remaining guesses
count = 14;
console.log('You have 15 guesses remaining.');
word.checkGuess('');

var getUserInput = function() {

    if (count > -1) {
        inquirer.prompt([
            {
                name: 'letter',
                message: 'Guess a letter!',
                validate: function (name) {
                    var t = /^[a-zA-Z_\- ]{0,1}$/;
                    return t.test(name);
                }
                // https://www.sencha.com/forum/showthread.php?83434-regex-no-spaces-and-letters-only
                
                // function validateLetter(str){
                //     return str !== '';
                //     var regEx = new RegExp("/^[a-zA-Z]+$/");
                //     return regEx.test(str);
                // }
                // Validate user guess here
            }
        ]).then(function(input) {
            word.checkGuess(input.letter);
            if(word.isComplete()) {
                console.log('You win!!\n\n');
                return;
            }
            if (count > 1) {
                console.log('You have ' + count + ' guesses remaining.');
            }
            if (count === 1) {
                console.log('You have 1 guess remaining.');
            }
            if (count < 1) {
                console.log('You are out of guesses. Better luck next time!\n');
                return;
            }
            count--;
            getUserInput();
        })
    }
}

getUserInput();