/**
 * Created by juancarlosnavarrete on 4/11/17.
 */

'use strict';
var inquirer = require('inquirer');
var color = require('colors');
var question = require('./flashCard');


color.setTheme({
    custom: [ 'cyan', 'underline']
});

var score = 0;

function ask(num) {
    /***
     * The function 'ask' prompts the user to answer a question based on test bank found in ./flashCard.js
     * The function invokes itself until all questions have been render. At the end of the function
     * it prompts the user if they want to retake the quiz.
     * params: num (int)
     */

    var questions = [
        {
            type: 'input',
            name: 'response',
            message: question[num].partial().custom
        }

    ];
    inquirer.prompt(questions).then(function (answers) {

        if (num < question.length - 1) {

            if(answers.response.toUpperCase() === question[num].getCloze().toUpperCase()){
                score++;
                console.log(color.green('\n\tCorrect!!! %s\n'), question[num].fullText());
            }else{
                console.log(color.red('\n\tIncorrect: %s\n'), question[num].focus());
            }
            ask(++num);
        } else {
            console.log(color.blue('\nDone, your score is  %s.\n'), score);

            var response = [
                {
                    type: 'confirm',
                    name: 'askAgain',
                    message: 'Want to play again? (just hit enter for YES)?'.custom,
                    default: true
                }
            ];
            inquirer.prompt(response).then(function (answers) {
                if (answers.askAgain) {
                    score = 0;
                    ask(0);
                } else {
                    console.log('\nGood Bye!'.blue);
                }
            });

        }
    });
}

ask(0);

