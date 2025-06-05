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


// use strict
'use strict';

// Navigation
let customize_open = document.querySelector('#customize_open');
let customize_menu = document.querySelector('#customize_menu');
let customize_close = document.querySelector('#customize_close');

let button_start = document.querySelector('#button_start');
let button_begin = document.querySelector('#button_begin');
let button_cancel = document.querySelector('#button_cancel')
let button_pause_play = document.querySelector('#button_pause_play');

let settings = document.querySelector('#settings');
let countdown = document.querySelector('#countdown');
let my_sketch = document.querySelector('#my_sketch');
let intro = document.querySelector('#intro');

let info_open = document.querySelector('#info_open');
let info_overlay = document.querySelector('#info_overlay');
let info_close = document.querySelector('#info_close');

// Open customize menu
// Open customize menu
customize_open.addEventListener('click', function (event) {
  customize_menu.style.left = '0';
  // Close customize menu on click outside
  if (!customize_menu.contains(event.target)) {
    document.addEventListener('click', function (e) {
      let isClickInside = customize_menu.contains(e.target);
      let isClickOpen = customize_open.contains(e.target);
      if (isClickOpen) {
        console.log('You clicked on open');
      } else if (isClickInside) {
        console.log('You clicked inside');
      } else {
        console.log('You clicked outside');
        customize_menu.style.left = '-300px';
      }
    }, { once: true });
  }
});

// Close customize menu
customize_close.addEventListener('click', function () {
  customize_menu.style.left = '-300px';
})

// Start breathing button
button_start.addEventListener('click', function () {
  intro.style.display = 'none';
  settings.style.display = 'block';
})

// Begin button
button_begin.addEventListener('click', function () {
  settings.style.display = 'none';
  customize_open.style.display = 'block';
  countdown.style.display = 'block';
  my_sketch.style.display = 'block';
  button_pause_play.style.display = 'block';
  button_cancel.style.display = 'block';
  countDown(duration, 'status');
  music();
})

// Display info
info_open.addEventListener('click', function () {
  info_overlay.style.display = 'block';
})

// Close info
info_close.addEventListener('click', function () {
  info_overlay.style.display = 'none';
})

// Music

// Duration variable
let duration;
let three_min_intro = document.querySelector('#three_min_intro');
let five_min_intro = document.querySelector('#five_min_intro');
let ten_min_intro = document.querySelector('#ten_min_intro');
let twenty_min_intro = document.querySelector('#twenty_min_intro');
let three_min = document.querySelector('#three_min');
let five_min = document.querySelector('#five_min');
let ten_min = document.querySelector('#ten_min');
let twenty_min = document.querySelector('#twenty_min');

// Set duration three min
three_min_intro.addEventListener('click', function () {
  duration = 3 * 60;
})

// Set duration five min
five_min_intro.addEventListener('click', function () {
  duration = 5 * 60;
})

// Set duration ten min
ten_min_intro.addEventListener('click', function () {
  duration = 10 * 60;
})

// Set duration twenty min
twenty_min_intro.addEventListener('click', function () {
  duration = 20 * 60;
})

// Change duration to three min
three_min.addEventListener('click', function () {
  duration = 3 * 60;
  countDown(duration, 'status');
})

// Change duration to five min
five_min.addEventListener('click', function () {
  duration = 5 * 60;
  countDown(duration, 'status');
})

// Change duration to ten min
ten_min.addEventListener('click', function () {
  duration = 10 * 60;
  countDown(duration, 'status');
})

// Change duration to twenty min
twenty_min.addEventListener('click', function () {
  duration = 20 * 60;
  countDown(duration, 'status');
})

// Song played
let song_played;

// Toggle song
function toggleSong() {
  if (song_played.isPlaying()) {
    song_played.pause();
    clearTimeout(timer);
    button_pause_play.innerHTML = 'Play';
  } else {
    song_played.play();
    button_pause_play.innerHTML = 'Pause';
    timer = setTimeout('countDown(' + current_secs + ',"' + 'status' + '")', 1000);
  }
}

// Select music
function music() {
  button_pause_play.addEventListener('click', toggleSong);
  if (music_click === "sound1") {
    song_played = song1;
  } else if (music_click === "sound2") {
    song_played = song2;
  } else if (music_click === "sound9") {
    song_played = song9;
  }
  song_played.loop();
  amp = new p5.Amplitude();
}

// Music click
let music_click;
let sound1_intro = document.querySelector('#sound1_intro');
let sound2_intro = document.querySelector('#sound2_intro');
let sound9_intro = document.querySelector('#sound9_intro');
let sound1 = document.querySelector('#sound1');
let sound2 = document.querySelector('#sound2');
let sound9 = document.querySelector('#sound9');

// Set sound1
sound1_intro.addEventListener('click', function () {
  music_click = "sound1";
})

// Set sound2
sound2_intro.addEventListener('click', function () {
  music_click = "sound2";
})

// Set sound3
sound9_intro.addEventListener('click', function () {
  music_click = "sound9";
})

// Change sound1
sound1.addEventListener('click', function () {
  music_click = "sound1";
  song_played.stop();
  music();
})

// Change sound2
sound2.addEventListener('click', function () {
  music_click = "sound2";
  song_played.stop();
  music();
})

// Change sound3
sound9.addEventListener('click', function () {
  music_click = "sound9";
  song_played.stop();
  music();
})

// Preload sound files
function preload() {
  song1 = loadSound('assets/sound/sound1.mp3');
  song2 = loadSound('assets/sound/sound2.mp3');
  song9 = loadSound('assets/sound/sound9.mp3');
}

// Draw circle
three_min_intro = document.getElementById("three_min_intro");
five_min_intro = document.getElementById("five_min_intro");
ten_min_intro = document.getElementById("ten_min_intro");
twenty_min_intro = document.getElementById("twenty_min_intro");
sound1_intro = document.getElementById("sound1_intro");
sound2_intro = document.getElementById("sound2_intro");
sound9_intro = document.getElementById("sound9_intro");

let iftimer;
let ifsound;
let x, y;
let r = 120;
let delta = 1;
let word;
let wordcounter = 0;

function setup() {
  let my_canvas = createCanvas(300, 300);
  my_canvas.parent('my_sketch');
  x = width / 2;
  y = height / 2;
}

function draw() {
  clear()

  // Outher circle
  noStroke();
  ellipse(x, y, 260, 260);

  // Inner circle
  noStroke();
  ellipse(x, y, 120, 120);

  // Variable circle
  if (r >= 260) {
    delta = -.40;
    word = "EXHALE";
  }
  if (r <= 120) {
    delta = .40;
    word = "INHALE";
  }

  r = r + delta;

  stroke(16, 125, 152);
  strokeWeight(1);
  ellipse(x, y, r, r);
  fill(16, 125, 152, 30);

  if (my_sketch.style.display == 'block' && wordcounter <= 1000000) {
    textFont('Verdana');
    textSize(18);
    text(word, x, y);
    textAlign(CENTER, CENTER);
    wordcounter++;
  }

  if (three_min_intro.checked || five_min_intro.checked || ten_min_intro.checked || twenty_min_intro.checked) {
    iftimer = 'true';
  }
  if (sound1_intro.checked || sound2_intro.checked || sound9_intro.checked) {
    ifsound = 'true';
  }
  if (iftimer == 'true' && ifsound == 'true') {
    button_begin.style.display = 'block';
    return;
  }
}

// Timer code
let timer;
let timer_running = false;
let current_secs;

function countDown(secs, elem) {
  if (timer_running == true) {
    clearTimeout(timer);
    timer_running = false;
  }

  let element = document.getElementById(elem);
  let minutes = Math.floor(secs / 60);
  let seconds = secs - minutes * 60;

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  let final_time = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);

  console.log(secs);
  element.innerHTML = final_time;

  let button_cancel = document.querySelector('#button_cancel');
  button_cancel.addEventListener('click', function () {
    clearTimeout(timer);
    element.innerHTML = ' ';
    cancel_overlay.classList.add('cancel_overlay');
    button_close.style.display = 'block';
    cancel_overlay.style.display = 'block';
    song_played.stop();
    return;
  })

  if (secs < 1) {
    clearTimeout(timer);
    element.innerHTML = ' ';
    done_overlay.classList.add('done_overlay');
    button_close_done.style.display = 'block';
    done_overlay.style.display = 'block';
    song_played.stop();
    return;
  }

  secs--;
  timer = setTimeout('countDown(' + secs + ',"' + elem + '")', 1000);
  current_secs = secs;
  timer_running = true;
}

let status = document.querySelector('#status');
let cancel_overlay = document.querySelector('#cancel_overlay');
let done_overlay = document.querySelector('#done_overlay');
let button_close = document.querySelector('#button_close');
let button_close_done = document.querySelector('#button_close_done');

button_close.addEventListener('click', function () {
  window.location.reload();
})

button_close_done.addEventListener('click', function () {
  window.location.reload();
})