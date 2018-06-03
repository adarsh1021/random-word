'use strict';

// Import the Dialogflow module from the Actions on Google client library.
// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

const fs = require('fs');
// Returns the path to the word list which is separated by `\n`
const wordListPath = require('word-list');
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
//=> […, 'abmhos', 'abnegate', …]


app.intent('random words', (conv, {number}) => {
 var randomWordString = "";
 for (var i=0; i<number; i++) {
  var randomWord = wordArray[Math.floor(Math.random()*wordArray.length)];
  randomWordString = randomWordString + randomWord + ", ";
 }
 randomWordString = randomWordString.slice(0, -2);
 if (randomWordString.split(',').length > 1)
 	conv.close(`Random words are ${randomWordString}.`);
 else 
 	conv.close(`Random word is ${randomWordString}.`);
});

app.intent('random words one', (conv, {number}) => {
 var randomWord = wordArray[Math.floor(Math.random()*wordArray.length)];
 conv.close(`Random word is ${randomWord}.`);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
