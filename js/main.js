const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

/* Put code here */

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}

console.log('reading js');

'use strict';

let customize = document.querySelector('#customize');
let customizemenu = document.querySelector('#customizemenu');
let customizeclose = document.querySelector('#customizeclose');
let buttonstart = document.querySelector('#buttonstart');
let buttonbegin = document.querySelector('#buttonbegin');
let buttonpauseplay = document.querySelector('#buttonpauseplay');
let settings = document.querySelector('#settings');
let countdown = document.querySelector('#countdown');
let mySketch = document.querySelector('#mySketch');
let intro = document.querySelector('#intro');
let infooverlay = document.querySelector('#infooverlay');
let info = document.querySelector('#info');
let infoclose = document.querySelector('#infoclose');

// open customize menu
customize.addEventListener('click', function () {
  customizemenu.style.left = '0';
  // close customize menu on click outside
  if (!customizemenu.contains(event.target)) {
    document.addEventListener('click', function () {
      let isClickInside = customizemenu.contains(event.target);
      let isClickLink = customize.contains(event.target);
      if (isClickLink) {
        // console.log('You clicked link');
      }
      else if (isClickInside) {
        // console.log('You clicked inside');
      }
      else {
        // console.log('You clicked outside');
        customizemenu.style.left = '-300px';
      }
    })
  }
})

// close customize menu
customizeclose.addEventListener('click', function () {
  customizemenu.style.left = '-300px';
})

// start breathing button
buttonstart.addEventListener('click', function () {
  intro.style.display = 'none';
  settings.style.display = 'block';
})

// begin button
buttonbegin.addEventListener('click', function () {
  settings.style.display = 'none';
  customize.style.display = 'block';
  countdown.style.display = 'block';
  mySketch.style.display = 'block';
  buttonpauseplay.style.display = 'block';
  buttoncancel.style.display = 'block';
  countDown(duration, 'status');
  music();
})

// display info
info.addEventListener('click', function () {
  infooverlay.style.display = 'block';
})

// close info
infoclose.addEventListener('click', function () {
  infooverlay.style.display = 'none';
})

// duration variable
let duration;
let threemin_intro = document.querySelector('#threemin_intro');
let fivemin_intro = document.querySelector('#fivemin_intro');
let tenmin_intro = document.querySelector('#tenmin_intro');
let twentymin_intro = document.querySelector('#twentymin_intro');
let threemin = document.querySelector('#threemin');
let fivemin = document.querySelector('#fivemin');
let tenmin = document.querySelector('#tenmin');
let twentymin = document.querySelector('#twentymin');

// set duration three min
threemin_intro.addEventListener('click', function () {
  duration = 3 * 60;
})

// set duration five min
fivemin_intro.addEventListener('click', function () {
  duration = 5 * 60;
})

// set duration ten min
tenmin_intro.addEventListener('click', function () {
  duration = 10 * 60;
})

// set duration twenty min
twentymin_intro.addEventListener('click', function () {
  duration = 20 * 60;
})

// change duration to three min
threemin.addEventListener('click', function () {
  duration = 3 * 60;
  countDown(duration, 'status');
})

// change duration to five min
fivemin.addEventListener('click', function () {
  duration = 5 * 60;
  countDown(duration, 'status');
})

// change duration to ten min
tenmin.addEventListener('click', function () {
  duration = 10 * 60;
  countDown(duration, 'status');
})

// change duration to twenty min
twentymin.addEventListener('click', function () {
  duration = 20 * 60;
  countDown(duration, 'status');
})

// song played
let songplayed;

// toggle song
function toggleSong() {
  if (songplayed.isPlaying()) {
    songplayed.pause();
    clearTimeout(timer);
    buttonpauseplay.innerHTML = 'Play';
  } else {
    songplayed.play();
    buttonpauseplay.innerHTML = 'Pause';
    timer = setTimeout('countDown(' + current_secs + ',"' + 'status' + '")', 1000);
  }
}

// select music
function music() {
  buttonpauseplay.addEventListener('click', toggleSong);
  if (musicclick == "sound1") {
    songplayed = song1;
  } else if (musicclick == "sound2") {
    songplayed = song2;
  } else if (musicclick == "sound9") {
    songplayed = song9;
  }
  songplayed.loop();
  amp = new p5.Amplitude();
}

// music click
let musicclick;
let sound1_intro = document.querySelector('#sound1_intro');
let sound2_intro = document.querySelector('#sound2_intro');
let sound9_intro = document.querySelector('#sound9_intro');
let sound1 = document.querySelector('#sound1');
let sound2 = document.querySelector('#sound2');
let sound9 = document.querySelector('#sound9');

// set sound1
sound1_intro.addEventListener('click', function () {
  musicclick = "sound1";
})

// set sound2
sound2_intro.addEventListener('click', function () {
  musicclick = "sound2";
})

// set sound3
sound9_intro.addEventListener('click', function () {
  musicclick = "sound9";
})

// change sound1
sound1.addEventListener('click', function () {
  musicclick = "sound1";
  songplayed.stop();
  music();
})

// change sound2
sound2.addEventListener('click', function () {
  musicclick = "sound2";
  songplayed.stop();
  music();
})

// change sound3
sound9.addEventListener('click', function () {
  musicclick = "sound9";
  songplayed.stop();
  music();
})

// preload sound files
function preload() {
  song1 = loadSound('assets/sound1.mp3');
  song2 = loadSound('assets/sound2.mp3');
  song9 = loadSound('assets/sound9.mp3');
}

// draw circle
let threeminintro = document.getElementById("threemin_intro");
let fiveminintro = document.getElementById("fivemin_intro");
let tenminintro = document.getElementById("tenmin_intro");
let twentyminintro = document.getElementById("twentymin_intro");
let sound1intro = document.getElementById("sound1_intro");
let sound2intro = document.getElementById("sound2_intro");
let sound9intro = document.getElementById("sound9_intro");

let iftimer;
let ifsound;
let x, y;
let r = 120;
let delta = 1;
let word;
let wordcounter = 0;

function setup() {
  let myCanvas = createCanvas(300, 300);
  myCanvas.parent('mySketch');
  x = width / 2;
  y = height / 2;
}

function draw() {
  clear()

  // outher circle
  noStroke();
  ellipse(x, y, 260, 260);

  // inner circle
  noStroke();
  ellipse(x, y, 120, 120);

  // variable circle
  if (r >= 260) {
    delta = -.40;
    word = "EXHALE";
  }
  if (r <= 120) {
    delta = .40;
    word = "INHALE";
  }

  r = r + delta;

  stroke(0, 166, 188);
  strokeWeight(1);
  ellipse(x, y, r, r);
  fill(0, 166, 188, 30);

  if (mySketch.style.display == 'block' && wordcounter <= 1000000) {
    textFont('Arial');
    textSize(18);
    text(word, x, y);
    textAlign(CENTER, CENTER);
    wordcounter++;
  }

  if (threeminintro.checked || fiveminintro.checked || tenminintro.checked || twentyminintro.checked) {
    iftimer = 'true';
  }
  if (sound1intro.checked || sound2intro.checked || sound9intro.checked) {
    ifsound = 'true';
  }
  if (iftimer == 'true' && ifsound == 'true') {
    buttonbegin.style.display = 'block';
    return;
  }
}

// timer code
let timer;
let timerRunning = false;
let current_secs;

function countDown(secs, elem) {
  if (timerRunning == true) {
    clearTimeout(timer);
    timerRunning = false;
  }

  let element = document.getElementById(elem);
  let minutes = Math.floor(secs / 60);
  let seconds = secs - minutes * 60;

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  let finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);

  console.log(secs);
  element.innerHTML = finalTime;

  let buttoncancel = document.querySelector('#buttoncancel');
  buttoncancel.addEventListener('click', function () {
    clearTimeout(timer);
    element.innerHTML = ' ';
    canceloverlay.classList.add('canceloverlay');
    buttonclose.style.display = 'block';
    canceloverlay.style.display = 'block';
    songplayed.stop();
    return;
  })

  if (secs < 1) {
    clearTimeout(timer);
    element.innerHTML = ' ';
    doneoverlay.classList.add('doneoverlay');
    buttonclosedone.style.display = 'block';
    doneoverlay.style.display = 'block';
    songplayed.stop();
    return;
  }

  secs--;
  timer = setTimeout('countDown(' + secs + ',"' + elem + '")', 1000);
  current_secs = secs;
  timerRunning = true;
}

let status = document.querySelector('#status');
let canceloverlay = document.querySelector('#canceloverlay');
let doneoverlay = document.querySelector('#doneoverlay');
let buttonclose = document.querySelector('#buttonclose');
let buttonclosedone = document.querySelector('#buttonclosedone');

buttonclose.addEventListener('click', function () {
  window.location.reload();
})

buttonclosedone.addEventListener('click', function () {
  window.location.reload();
})
