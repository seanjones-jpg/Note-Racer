
// function randomNote() { 

// const randomNum = 97 + parseInt(Math.random() * 7);
// let note = String.fromCharCode(randomNum);
// document.getElementById("note").innerHTML = note;

// }

// function myGame() {
//     while(index < 100){
//         let currentNote = randomNote();

//         index += 1;
//     }
// }

var score = 0;
var note = '';
var notes = ['e','f','g','a','b','c','d'];
var notesRemaining = 0;
var iterations = 0;
var startTime = 0;
var endTime = 0;

function startGame(){
    document.getElementById('button').style.display = 'none';
    document.getElementById('resultDiv').style.display = 'none';
    document.getElementById('gameDiv').style.display ='block';
    iterations = 0;
    startTime = new Date().getTime();

    displayLetter();
}

function displayLetter() {

    iterations++;

    if(iterations > 5){
        endTime = new Date().getTime(); // set end time

        var elapsedTime = (endTime - startTime) / 1000; // determine time elapsed
        var notesPerMin = Math.round(score / elapsedTime * 60);

        document.getElementById('scoreSpan').innerHTML = score; // display score
        document.getElementById('timeSpan').innerHTML = elapsedTime + ' seconds'; // display time elapsed
        document.getElementById('notesPerMin').innerHTML = notesPerMin;

        document.getElementById('gameDiv').style.display = 'none';
        document.getElementById('resultDiv').style.display = 'block';
    } else {
        var noteLocation = Math.floor(Math.random() * 9);
        var index = noteLocation%7;
        note = notes[index];
        notesRemaining = 6 - iterations;
        document.getElementById('noteSpan').innerHTML = note;
        document.getElementById('notesRemainingSpan').innerHTML = notesRemaining;
        document.getElementById('note').style.top = String(parseInt(54 - (noteLocation * 6)))+ 'px';

        document.getElementById('note-guess').value = '';
        document.getElementById('note-guess').focus();

    }

}

function checkInput() {
    var input = document.getElementById('note-guess').value;

    if(input == note){
        score++;
    } else{
        if(score > 0){
        score--;
        }else{
            score = score;
        }
    }

    displayLetter();
}