

var score = 0;
var noteHit = 0;
var note = '';
var notes = ['e','f','g','a','b','c','d'];
var notesRemaining = 0;
var iterations = 0;
var startTime = 0;
var endTime = 0;
var raceLength = 0;
var multiplier = 1;
var streak = 1;
var noteStatus = 'good';
const STREAK_FACTOR = 4;
const MULTIPLIER_MAX = 8;

function reset(){
    iterations = 0;
    score = 0;
    noteHit = 0;
    multiplier = 1;
    document.getElementById('gameScoreSpan').innerHTML = score;
}

function pulseOn(item, scale){
    document.getElementById(item).style.scale = scale;
}

function pulseOff(item, scale){
    document.getElementById(item).style.scale = scale;
}

function colorChange(target, color){
    document.getElementById(target).style['background-color'] = color;
}

function noteStyling(noteStatus){
    pulseOn('note', '150%');
       

    if (noteStatus == 1){
        colorChange('note', 'green')
        setTimeout(() => {
            colorChange('note', 'black')
            pulseOff('note', '100%');
                      }, "200");
        }else if (noteStatus == 0){
            colorChange('note', 'red')
        setTimeout(() => {
            colorChange('note', 'black')
            pulseOff('note', '100%');
        }, "200");
    }
}

function startGame(){
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('resultDiv').style.display = 'none';
    document.getElementById('gameDiv').style.display ='block';
    raceLength = parseInt(document.getElementById('raceLength').value);
    
    reset();
    
    startTime = new Date().getTime();

    displayLetter();
}

function returnHome(){
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('resultDiv').style.display = 'none';
    document.getElementById('gameDiv').style.display ='none';
    reset();
}

function scoreMultiplier(){
    if(streak%STREAK_FACTOR === 0 && multiplier < MULTIPLIER_MAX){
        multiplier++;
    }
}

function displayLetter() {

    iterations++;

    if(iterations > raceLength){
        endTime = new Date().getTime(); // set end time

        var elapsedTime = (endTime - startTime) / 1000; // determine time elapsed
        var notesPerMin = Math.round(noteHit / elapsedTime * 60);

        document.getElementById('scoreSpan').innerHTML = score; // display score
        document.getElementById('notesHitSpan').innerHTML = noteHit + '/' + raceLength;
        document.getElementById('timeSpan').innerHTML = elapsedTime + ' seconds'; // display time elapsed
        document.getElementById('notesPerMin').innerHTML = notesPerMin;

        document.getElementById('gameDiv').style.display = 'none';
        document.getElementById('resultDiv').style.display = 'block';
    } else {
        var noteLocation = Math.floor(Math.random() * 9);
        var index = noteLocation%7;
        note = notes[index];
        notesRemaining = raceLength - iterations + 1;
        document.getElementById('noteSpan').innerHTML = note;
        document.getElementById('notesRemainingSpan').innerHTML = notesRemaining;
        document.getElementById('note').style.top = String(parseInt(54 - (noteLocation * 6)))+ 'px';
        document.getElementById('multiplier').innerHTML = multiplier;
        document.getElementById('note-guess').value = '';
        document.getElementById('note-guess').focus();
        

    }

}

function checkInput() {
    var input = document.getElementById('note-guess').value;
    document.getElementById('gameScoreSpan').innerHTML = score;
    document.getElementById('multiplierHeader').style.border = 'var(--multiplier-border-' + String(multiplier) +'x)';
    if(input == note){
        score = score + 1*multiplier;
        noteHit++;
        streak++;
        noteStatus = 1;
    } else{
        streak = 1;
        noteStatus = 0;
        if(score > 0){
        score--;
        }else{
            score = score;
        }
    }
    noteStyling(noteStatus);
    scoreMultiplier();
    displayLetter();
}
