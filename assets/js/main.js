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
const customize_open = document.querySelector('#customize_open');
const customize_menu = document.querySelector('#customize_menu');
const customize_close = document.querySelector('#customize_close');

const button_start = document.querySelector('#button_start');
const button_begin = document.querySelector('#button_begin');
const button_cancel = document.querySelector('#button_cancel')
const button_pause_play = document.querySelector('#button_pause_play');

const settings = document.querySelector('#settings');
const countdown = document.querySelector('#countdown');
const my_sketch = document.querySelector('#my_sketch');
const intro = document.querySelector('#intro');

const info_open = document.querySelector('#info_open');
const info_overlay = document.querySelector('#info_overlay');
const info_close = document.querySelector('#info_close');

// Open customize menu
// Open customize menu
customize_open.addEventListener('click', (event) => {
  customize_menu.style.left = '0';
  // Close customize menu on click outside
  if (!customize_menu.contains(event.target)) {
    document.addEventListener('click', (event) => {
      const isClickInside = customize_menu.contains(event.target);
      const isClickOpen = customize_open.contains(event.target);
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
customize_close.addEventListener('click', () => {
  customize_menu.style.left = '-300px';
})

// Start breathing button
button_start.addEventListener('click', () => {
  intro.style.display = 'none';
  settings.style.display = 'block';
})

// Begin button
button_begin.addEventListener('click', () => {
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
info_open.addEventListener('click', () => {
  info_overlay.style.display = 'block';
})

// Close info
info_close.addEventListener('click', () => {
  info_overlay.style.display = 'none';
})

// Music

// Duration variable
let duration;
const three_min_intro = document.querySelector('#three_min_intro');
const five_min_intro = document.querySelector('#five_min_intro');
const ten_min_intro = document.querySelector('#ten_min_intro');
const twenty_min_intro = document.querySelector('#twenty_min_intro');
const three_min = document.querySelector('#three_min');
const five_min = document.querySelector('#five_min');
const ten_min = document.querySelector('#ten_min');
const twenty_min = document.querySelector('#twenty_min');

// Set duration three min
three_min_intro.addEventListener('click', () => {
  duration = 3 * 60;
})

// Set duration five min
five_min_intro.addEventListener('click', () => {
  duration = 5 * 60;
})

// Set duration ten min
ten_min_intro.addEventListener('click', () => {
  duration = 10 * 60;
})

// Set duration twenty min
twenty_min_intro.addEventListener('click', () => {
  duration = 20 * 60;
})

// Change duration to three min
three_min.addEventListener('click', () => {
  duration = 3 * 60;
  countDown(duration, 'status');
})

// Change duration to five min
five_min.addEventListener('click', () => {
  duration = 5 * 60;
  countDown(duration, 'status');
})

// Change duration to ten min
ten_min.addEventListener('click', () => {
  duration = 10 * 60;
  countDown(duration, 'status');
})

// Change duration to twenty min
twenty_min.addEventListener('click', () => {
  duration = 20 * 60;
  countDown(duration, 'status');
})

// Song played
let song_played;

// Toggle song
const toggleSong = () => {
  if (song_played.isPlaying()) {
    song_played.pause();
    clearTimeout(timer);
    button_pause_play.innerHTML = 'Play';
  } else {
    song_played.play();
    button_pause_play.innerHTML = 'Pause';
    timer = setTimeout(() => countDown(current_secs, 'status'), 1000);
  }
}

// Select music
const music = () => {
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
const sound1_intro = document.querySelector('#sound1_intro');
const sound2_intro = document.querySelector('#sound2_intro');
const sound9_intro = document.querySelector('#sound9_intro');
const sound1 = document.querySelector('#sound1');
const sound2 = document.querySelector('#sound2');
const sound9 = document.querySelector('#sound9');

// Set sound1
sound1_intro.addEventListener('click', () => {
  music_click = "sound1";
})

// Set sound2
sound2_intro.addEventListener('click', () => {
  music_click = "sound2";
})

// Set sound3
sound9_intro.addEventListener('click', () => {
  music_click = "sound9";
})

// Change sound1
sound1.addEventListener('click', () => {
  music_click = "sound1";
  song_played.stop();
  music();
})

// Change sound2
sound2.addEventListener('click', () => {
  music_click = "sound2";
  song_played.stop();
  music();
})

// Change sound3
sound9.addEventListener('click', () => {
  music_click = "sound9";
  song_played.stop();
  music();
})

// Preload sound files
const preload = () => {
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

const setup = () => {
  let my_canvas = createCanvas(300, 300);
  my_canvas.parent('my_sketch');
  x = width / 2;
  y = height / 2;
}

const draw = () => {
  clear()

  // Outer circle
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

const countDown = (secs, elem) => {
  if (timer_running == true) {
    clearTimeout(timer);
    timer_running = false;
  }

  let element = document.getElementById(elem);
  let minutes = Math.floor(secs / 60);
  let seconds = secs - minutes * 60;

  const final_time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  console.log(secs);
  element.innerHTML = final_time;

  const button_cancel = document.querySelector('#button_cancel');
  button_cancel.addEventListener('click', () => {
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
  timer = setTimeout(() => countDown(secs, elem), 1000);
  current_secs = secs;
  timer_running = true;
}

const status = document.querySelector('#status');
const cancel_overlay = document.querySelector('#cancel_overlay');
const done_overlay = document.querySelector('#done_overlay');
const button_close = document.querySelector('#button_close');
const button_close_done = document.querySelector('#button_close_done');

button_close.addEventListener('click', () => {
  window.location.reload();
})

button_close_done.addEventListener('click', () => {
  window.location.reload();
})

// Expose countdown for testing environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { countDown };
}
