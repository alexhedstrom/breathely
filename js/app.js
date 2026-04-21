/* ================================================
   BREATHELY - Breathing Exercise PWA
   ================================================ */

'use strict';

// ================================================
// 1. CONSTANTS & DEFAULT DATA
// ================================================

const DEFAULT_EXERCISES = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    description: 'Equal duration inhale, hold, exhale, hold. Used by Navy SEALs for stress relief and focus.',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 4 },
      { type: 'exhale', duration: 4 },
      { type: 'hold', duration: 4 }
    ],
    rounds: 4,
    icon: 'square',
    category: 'calm',
    isDefault: true
  },
  {
    id: 'triangle-breathing',
    name: 'Triangle Breathing',
    description: 'Three-phase breathing for balance and centering. Simple yet powerful.',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'exhale', duration: 4 },
      { type: 'hold', duration: 4 }
    ],
    rounds: 6,
    icon: 'triangle',
    category: 'balance',
    isDefault: true
  },
  {
    id: '4-7-8-breathing',
    name: '4-7-8 Breathing',
    description: 'Dr. Weil\'s relaxing breath technique. Perfect for falling asleep quickly.',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 7 },
      { type: 'exhale', duration: 8 }
    ],
    rounds: 4,
    icon: 'moon',
    category: 'sleep',
    isDefault: true
  },
  {
    id: 'deep-calm',
    name: 'Deep Calm',
    description: 'Extended exhale activates your parasympathetic nervous system for deep relaxation.',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'exhale', duration: 8 }
    ],
    rounds: 6,
    icon: 'lotus',
    category: 'relax',
    isDefault: true
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    description: 'Quick, equal breathing to boost energy and alertness naturally.',
    phases: [
      { type: 'inhale', duration: 2 },
      { type: 'exhale', duration: 2 }
    ],
    rounds: 15,
    icon: 'lightning',
    category: 'energy',
    isDefault: true
  },
  {
    id: 'focus-breathing',
    name: 'Focus Flow',
    description: 'Balanced breathing with a brief hold to sharpen concentration and mental clarity.',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 2 },
      { type: 'exhale', duration: 4 },
      { type: 'hold', duration: 2 }
    ],
    rounds: 5,
    icon: 'target',
    category: 'focus',
    isDefault: true
  }
];

const DEFAULT_PROGRAMS = [
  {
    id: 'morning-routine',
    name: 'Morning Routine',
    description: 'Start your day with energy and focus',
    exerciseIds: ['energizing', 'focus-breathing'],
    icon: 'sunrise',
    isDefault: true
  },
  {
    id: 'sleep-prep',
    name: 'Sleep Preparation',
    description: 'Wind down for a restful night',
    exerciseIds: ['deep-calm', '4-7-8-breathing'],
    icon: 'moon',
    isDefault: true
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief',
    description: 'Quick stress reduction routine',
    exerciseIds: ['triangle-breathing', 'box-breathing'],
    icon: 'breath',
    isDefault: true
  }
];

const DEFAULT_SETTINGS = {
  transitionSounds: true,
  transitionVolume: 0.5,
  backgroundSound: 'none',
  backgroundVolume: 0.3,
  vibration: true,
  countdownSeconds: 3
};

const PHASE_COLORS = {
  inhale: { r: 56, g: 189, b: 248, label: 'Inhale', icon: 'up' },
  hold: { r: 167, g: 139, b: 250, label: 'Hold', icon: 'pause' },
  exhale: { r: 244, g: 114, b: 182, label: 'Exhale', icon: 'down' }
};

const CATEGORY_STYLES = {
  calm: { gradient: 'from-sky-500 to-cyan-500', bg: 'cat-calm', label: 'Calm' },
  balance: { gradient: 'from-emerald-500 to-teal-500', bg: 'cat-balance', label: 'Balance' },
  sleep: { gradient: 'from-indigo-500 to-purple-500', bg: 'cat-sleep', label: 'Sleep' },
  relax: { gradient: 'from-violet-500 to-purple-500', bg: 'cat-relax', label: 'Relax' },
  energy: { gradient: 'from-amber-500 to-orange-500', bg: 'cat-energy', label: 'Energy' },
  focus: { gradient: 'from-cyan-500 to-blue-500', bg: 'cat-focus', label: 'Focus' },
  custom: { gradient: 'from-pink-500 to-rose-500', bg: 'cat-custom', label: 'Custom' }
};

const BG_SOUNDS = [
  { id: 'none', name: 'Silence', icon: 'speaker-mute' },
  { id: 'rain', name: 'Rain', icon: 'rain' },
  { id: 'ocean', name: 'Ocean Waves', icon: 'waves' },
  { id: 'wind', name: 'Wind', icon: 'wind' },
  { id: 'night', name: 'Night', icon: 'moon' },
  { id: 'stream', name: 'Stream', icon: 'stream' }
];

// ================================================
// SVG ICONS
// ================================================

const ICONS = {
  'square': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>',
  'triangle': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><polygon points="12,2 22,22 2,22"/></svg>',
  'moon': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  'lotus': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>',
  'lightning': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><polygon points="13,2 3,14 11,14 8,23 19,10 11,10"/></svg>',
  'target': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="9"/></svg>',
  'sunrise': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M17 18a5 5 0 1 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="9.64" y2="4.81"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="4.81" x2="19.78" y2="10.22"/></svg>',
  'speaker-mute': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M16.6915026,12.4744748 L21.50,7.67 C21.8245851,7.34915026 22,7.34915026 22,6.58578644 L22,6.58578644 C22,5.81253201 21.8245851,5.5 21.50,5.5 L21.50,5.5 C20.818,5.5 14,12.318 14,12.318 L3.05,12.318 C2.45,12.318 2,12.7680556 2,13.368 L2,13.368 L2,14.868 C2,15.468 2.45,15.918 3.05,15.918 L14,15.918 L21.50,22.5 L21.50,22.5 C21.8245851,22.5 22,22.3245851 22,21.6915026 L22,21.6915026 C22,20.9182882 21.8245851,20.6 21.50,20.6 L16.6915026,15.7094166 L16.6915026,12.4744748 Z" transform="translate(0 -0.5)"/><line x1="23" y1="0" x2="10" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  'rain': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v2m-7 5l-1-1M3 11h2m15 0h2m-1-6l1-1m-8 17a4 4 0 0 1-4-4m8 0a4 4 0 0 1-4-4m-2 6v3m4-3v3m4-3v3"/></svg>',
  'waves': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12c1.657 0 3.314-.5 4.97-1.5 1.655-1 3.31-1 4.97 0 1.655 1 3.31 1 4.97 0 1.655-1 3.31-1 4.97 0M3 6c1.657 0 3.314-.5 4.97-1.5 1.655-1 3.31-1 4.97 0 1.655 1 3.31 1 4.97 0 1.655-1 3.31-1 4.97 0M3 18c1.657 0 3.314-.5 4.97-1.5 1.655-1 3.31-1 4.97 0 1.655 1 3.31 1 4.97 0 1.655-1 3.31-1 4.97 0"/></svg>',
  'wind': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>',
  'stream': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z"/><path d="M9 12c.667 0 1-1 1-2s-.333-2-1-2-1 1-1 2 .333 2 1 2zm0 4c.667 0 1-1 1-2s-.333-2-1-2-1 1-1 2 .333 2 1 2z"/><path d="M15 12c.667 0 1-1 1-2s-.333-2-1-2-1 1-1 2 .333 2 1 2zm0 4c.667 0 1-1 1-2s-.333-2-1-2-1 1-1 2 .333 2 1 2z"/></svg>',
  'up': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><polygon points="12,4 18,18 6,18"/></svg>',
  'pause': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  'down': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><polygon points="12,20 6,6 18,6"/></svg>',
  'breath': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,8 C14.21,8 16,9.79 16,12 C16,14.21 14.21,16 12,16 C9.79,16 8,14.21 8,12 C8,9.79 9.79,8 12,8 Z"/></svg>',
  'fire': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/></svg>',
  'sparkle': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  'play': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>',
  'export': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>',
  'import': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>',
  'reset': '<svg class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M3 8h6v6m12 4a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16m18-8h-6v6"/></svg>',
  'heart': '<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
};

function getIconSVG(iconId) {
  return ICONS[iconId] || `<span class="text-lg">${iconId}</span>`;
}

// ================================================
// 2. UTILITY FUNCTIONS
// ================================================

function uid() {
  return 'ex_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function formatDuration(totalSeconds) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  if (min === 0) return `${sec}s`;
  if (sec === 0) return `${min}m`;
  return `${min}m ${sec}s`;
}

function calcTotalTime(exercise) {
  const cycle = exercise.phases.reduce((s, p) => s + p.duration, 0);
  return cycle * (exercise.rounds || 1);
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Good night';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
}

function vibrate(pattern) {
  const settings = Store.getSettings();
  if (settings.vibration && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ================================================
// 3. STORAGE
// ================================================

const Store = {
  _get(key, def) {
    try {
      const v = localStorage.getItem('breathely_' + key);
      return v ? JSON.parse(v) : def;
    } catch { return def; }
  },
  _set(key, val) {
    try { localStorage.setItem('breathely_' + key, JSON.stringify(val)); }
    catch (e) { console.warn('Storage error:', e); }
  },

  getExercises() {
    return [...DEFAULT_EXERCISES, ...this._get('exercises', [])];
  },
  getCustomExercises() {
    return this._get('exercises', []);
  },
  saveExercise(ex) {
    const list = this.getCustomExercises();
    const i = list.findIndex(e => e.id === ex.id);
    if (i >= 0) list[i] = ex; else list.push(ex);
    this._set('exercises', list);
  },
  deleteExercise(id) {
    this._set('exercises', this.getCustomExercises().filter(e => e.id !== id));
  },
  getExerciseById(id) {
    return this.getExercises().find(e => e.id === id) || null;
  },

  getPrograms() {
    return [...DEFAULT_PROGRAMS, ...this._get('programs', [])];
  },
  getCustomPrograms() {
    return this._get('programs', []);
  },
  saveProgram(p) {
    const list = this.getCustomPrograms();
    const i = list.findIndex(x => x.id === p.id);
    if (i >= 0) list[i] = p; else list.push(p);
    this._set('programs', list);
  },
  deleteProgram(id) {
    this._set('programs', this.getCustomPrograms().filter(p => p.id !== id));
  },

  getSettings() {
    return { ...DEFAULT_SETTINGS, ...this._get('settings', {}) };
  },
  saveSettings(s) {
    this._set('settings', s);
  },

  addSession(session) {
    const h = this._get('history', []);
    h.push({ ...session, date: new Date().toISOString() });
    if (h.length > 200) h.splice(0, h.length - 200);
    this._set('history', h);
  },
  getHistory() {
    return this._get('history', []);
  },
  getStats() {
    const h = this.getHistory();
    return {
      totalSessions: h.length,
      totalMinutes: Math.round(h.reduce((s, x) => s + (x.duration || 0), 0) / 60),
      streak: this._calcStreak(h)
    };
  },
  _calcStreak(history) {
    if (!history.length) return 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dayStr = d.toDateString();
      if (history.some(s => new Date(s.date).toDateString() === dayStr)) {
        streak++;
      } else {
        if (i === 0) continue; // today not yet done is ok
        break;
      }
    }
    return streak;
  }
};


// ================================================
// 4. SOUND MANAGER
// ================================================

const Sound = {
  ctx: null,
  bgNodes: [],
  masterGain: null,
  transGain: null,
  bgGain: null,
  _muted: false,
  _currentBg: 'none',

  init() {
    if (this.ctx) { this.ctx.resume(); return; }
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.connect(this.ctx.destination);
    this.transGain = this.ctx.createGain();
    this.transGain.connect(this.masterGain);
    this.bgGain = this.ctx.createGain();
    this.bgGain.connect(this.masterGain);
    this.applySettings();
  },

  applySettings() {
    const s = Store.getSettings();
    if (this.transGain) this.transGain.gain.value = s.transitionSounds ? s.transitionVolume : 0;
    if (this.bgGain) this.bgGain.gain.value = s.backgroundVolume;
  },

  toggleMute() {
    this._muted = !this._muted;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this._muted ? 0 : 1, this.ctx.currentTime, 0.05);
    }
    return this._muted;
  },

  playPhase(type) {
    if (!this.ctx) return;
    const s = Store.getSettings();
    if (!s.transitionSounds) return;
    const now = this.ctx.currentTime;

    switch (type) {
      case 'inhale': {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.connect(g); g.connect(this.transGain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.25);
        g.gain.setValueAtTime(0.25, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now); osc.stop(now + 0.6);
        // Soft harmonic
        const osc2 = this.ctx.createOscillator();
        const g2 = this.ctx.createGain();
        osc2.connect(g2); g2.connect(this.transGain);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(660, now);
        osc2.frequency.exponentialRampToValueAtTime(990, now + 0.2);
        g2.gain.setValueAtTime(0.08, now);
        g2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc2.start(now); osc2.stop(now + 0.4);
        break;
      }
      case 'hold': {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.connect(g); g.connect(this.transGain);
        osc.type = 'sine';
        osc.frequency.value = 880;
        g.gain.setValueAtTime(0.15, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1);
        osc.start(now); osc.stop(now + 1);
        break;
      }
      case 'exhale': {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.connect(g); g.connect(this.transGain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.3);
        g.gain.setValueAtTime(0.25, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now); osc.stop(now + 0.6);
        break;
      }
      case 'complete': {
        [523, 659, 784, 1047].forEach((freq, i) => {
          const o = this.ctx.createOscillator();
          const gn = this.ctx.createGain();
          o.connect(gn); gn.connect(this.transGain);
          o.type = 'sine';
          o.frequency.value = freq;
          gn.gain.setValueAtTime(0, now + i * 0.12);
          gn.gain.linearRampToValueAtTime(0.15, now + i * 0.12 + 0.05);
          gn.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 1.8);
          o.start(now + i * 0.12);
          o.stop(now + i * 0.12 + 1.8);
        });
        break;
      }
      case 'countdown': {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.connect(g); g.connect(this.transGain);
        osc.type = 'sine';
        osc.frequency.value = 440;
        g.gain.setValueAtTime(0.12, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
        break;
      }
    }
  },

  startBg(type) {
    this.stopBg();
    this._currentBg = type;
    if (!this.ctx || type === 'none') return;

    const sr = this.ctx.sampleRate;
    const len = sr * 2;
    const buf = this.ctx.createBuffer(1, len, sr);
    const data = buf.getChannelData(0);

    // Generate white noise
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    // Optionally brown it
    if (type !== 'stream') {
      let last = 0;
      for (let i = 0; i < len; i++) {
        last = (last + (0.02 * data[i])) / 1.02;
        data[i] = last * 3.5;
      }
    }

    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const nodes = [src];

    switch (type) {
      case 'rain': {
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass'; hp.frequency.value = 800; hp.Q.value = 0.3;
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 9000;
        src.connect(hp); hp.connect(lp); lp.connect(this.bgGain);
        nodes.push(hp, lp);
        // Rain drops layer
        const src2 = this.ctx.createBufferSource();
        const buf2 = this.ctx.createBuffer(1, len, sr);
        const d2 = buf2.getChannelData(0);
        for (let i = 0; i < len; i++) d2[i] = Math.random() * 2 - 1;
        src2.buffer = buf2; src2.loop = true;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass'; bp.frequency.value = 4000; bp.Q.value = 2;
        const g2 = this.ctx.createGain(); g2.gain.value = 0.15;
        src2.connect(bp); bp.connect(g2); g2.connect(this.bgGain);
        src2.start(); nodes.push(src2, bp, g2);
        break;
      }
      case 'ocean': {
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 400; lp.Q.value = 0.8;
        const lfo = this.ctx.createOscillator();
        const lfoG = this.ctx.createGain();
        lfo.frequency.value = 0.08; lfoG.gain.value = 350;
        lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
        const vol = this.ctx.createGain(); vol.gain.value = 1.5;
        src.connect(lp); lp.connect(vol); vol.connect(this.bgGain);
        nodes.push(lp, lfo, lfoG, vol);
        break;
      }
      case 'wind': {
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass'; lp.frequency.value = 700; lp.Q.value = 3;
        const lfo = this.ctx.createOscillator();
        const lfoG = this.ctx.createGain();
        lfo.frequency.value = 0.12; lfoG.gain.value = 500;
        lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start();
        src.connect(lp); lp.connect(this.bgGain);
        nodes.push(lp, lfo, lfoG);
        break;
      }
      case 'night': {
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass'; bp.frequency.value = 150; bp.Q.value = 0.2;
        const vol = this.ctx.createGain(); vol.gain.value = 0.7;
        src.connect(bp); bp.connect(vol); vol.connect(this.bgGain);
        nodes.push(bp, vol);
        // Cricket sound
        const cr = this.ctx.createOscillator(); cr.type = 'sine'; cr.frequency.value = 4200;
        const crG = this.ctx.createGain(); crG.gain.value = 0;
        const crLfo = this.ctx.createOscillator(); crLfo.frequency.value = 7;
        const crLfoG = this.ctx.createGain(); crLfoG.gain.value = 0.015;
        crLfo.connect(crLfoG); crLfoG.connect(crG.gain); crLfo.start();
        cr.connect(crG); crG.connect(this.bgGain); cr.start();
        nodes.push(cr, crG, crLfo, crLfoG);
        break;
      }
      case 'stream': {
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass'; bp.frequency.value = 2000; bp.Q.value = 0.5;
        const lfo = this.ctx.createOscillator();
        const lfoG = this.ctx.createGain();
        lfo.frequency.value = 0.3; lfoG.gain.value = 800;
        lfo.connect(lfoG); lfoG.connect(bp.frequency); lfo.start();
        const vol = this.ctx.createGain(); vol.gain.value = 0.4;
        src.connect(bp); bp.connect(vol); vol.connect(this.bgGain);
        nodes.push(bp, lfo, lfoG, vol);
        break;
      }
    }

    src.start();
    this.bgNodes = nodes;
  },

  stopBg() {
    this.bgNodes.forEach(n => {
      try { if (n.stop) n.stop(); n.disconnect(); } catch { }
    });
    this.bgNodes = [];
    this._currentBg = 'none';
  },

  destroy() {
    this.stopBg();
    if (this.ctx) { this.ctx.close(); this.ctx = null; }
  }
};


// ================================================
// 5. BREATHING SESSION ENGINE
// ================================================

class BreathingSession {
  constructor(exercise, callbacks) {
    this.exercise = exercise;
    this.cb = callbacks;
    this.phaseIdx = 0;
    this.round = 1;
    this.totalRounds = exercise.rounds || 1;
    this.running = false;
    this.paused = false;
    this._phaseStart = 0;
    this._pauseStart = 0;
    this._pauseAccum = 0;
    this._raf = null;
    this._totalPhases = this.exercise.phases.length * this.totalRounds;
    this._completedPhases = 0;
    this._sessionStart = 0;
  }

  start() {
    this.running = true;
    this._sessionStart = performance.now();
    this._countdown(Store.getSettings().countdownSeconds || 3);
  }

  _countdown(n) {
    if (!this.running) return;
    if (n <= 0) { this._startPhase(); return; }
    this.cb.onCountdown?.(n);
    Sound.playPhase('countdown');
    vibrate(30);
    setTimeout(() => this._countdown(n - 1), 1000);
  }

  _startPhase() {
    if (!this.running) return;
    const phase = this.exercise.phases[this.phaseIdx];
    this._phaseStart = performance.now();
    this._pauseAccum = 0;
    this.cb.onPhaseChange?.(phase, this.phaseIdx, this.round);
    Sound.playPhase(phase.type);
    vibrate(phase.type === 'hold' ? 20 : 40);
    this._tick();
  }

  _tick() {
    if (!this.running || this.paused) return;
    const phase = this.exercise.phases[this.phaseIdx];
    const elapsed = (performance.now() - this._phaseStart - this._pauseAccum) / 1000;
    const remaining = Math.max(0, phase.duration - elapsed);
    const progress = Math.min(1, elapsed / phase.duration);
    const overallProgress = (this._completedPhases + progress) / this._totalPhases;

    this.cb.onTick?.(remaining, progress, phase, overallProgress);

    if (remaining <= 0) {
      this._completedPhases++;
      this._nextPhase();
    } else {
      this._raf = requestAnimationFrame(() => this._tick());
    }
  }

  _nextPhase() {
    this.phaseIdx++;
    if (this.phaseIdx >= this.exercise.phases.length) {
      this.phaseIdx = 0;
      this.cb.onRoundComplete?.(this.round);
      this.round++;
      if (this.round > this.totalRounds) {
        this._complete();
        return;
      }
    }
    this._startPhase();
  }

  pause() {
    this.paused = true;
    this._pauseStart = performance.now();
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  resume() {
    this._pauseAccum += performance.now() - this._pauseStart;
    this.paused = false;
    this._tick();
  }

  stop() {
    this.running = false;
    this.paused = false;
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  _complete() {
    this.running = false;
    const dur = (performance.now() - this._sessionStart) / 1000;
    Sound.playPhase('complete');
    vibrate([50, 100, 50, 100, 50]);
    this.cb.onComplete?.(dur);
  }
}


// ================================================
// 6. BREATHING VISUALIZER (Canvas)
// ================================================

class BreathingVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.w = 0; this.h = 0;
    this.phase = 'idle';
    this.progress = 0.3;
    this.startProgress = 0.3;
    this.targetProgress = 0.3;
    this.phaseStart = 0;
    this.phaseDur = 1;
    this.color = [148, 163, 184];
    this.targetColor = [148, 163, 184];
    this.particles = [];
    this.running = false;
    this._raf = null;
    this._resizeHandler = () => this.resize();
    window.addEventListener('resize', this._resizeHandler);
    this.resize();
    this._initParticles();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  _initParticles() {
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        baseR: 0.7 + Math.random() * 0.7,
        speed: (0.15 + Math.random() * 0.35) * (Math.random() < 0.5 ? 1 : -1),
        size: 0.5 + Math.random() * 2.5,
        opacity: 0.15 + Math.random() * 0.35,
        drift: Math.random() * Math.PI * 2
      });
    }
  }

  setPhase(type, duration) {
    this.phase = type;
    this.phaseDur = duration;
    this.phaseStart = performance.now();
    this.startProgress = this.progress;
    if (type === 'inhale') this.targetProgress = 1;
    else if (type === 'exhale') this.targetProgress = 0;
    const c = PHASE_COLORS[type] || PHASE_COLORS.hold;
    this.targetColor = [c.r, c.g, c.b];
  }

  start() {
    this.running = true;
    this._animate();
  }

  stop() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this._resizeHandler);
  }

  _ease(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  _lerp(a, b, t) {
    return a + (b - a) * t;
  }

  _animate() {
    if (!this.running) return;
    this._render(performance.now());
    this._raf = requestAnimationFrame(() => this._animate());
  }

  _render(ts) {
    const { ctx, w, h } = this;
    const cx = w / 2, cy = h / 2;
    ctx.clearRect(0, 0, w, h);

    // Update progress
    if (this.phase === 'inhale' || this.phase === 'exhale') {
      const t = Math.min((ts - this.phaseStart) / (this.phaseDur * 1000), 1);
      this.progress = this._lerp(this.startProgress, this.targetProgress, this._ease(t));
    }

    // Smooth color
    for (let i = 0; i < 3; i++) {
      this.color[i] = this._lerp(this.color[i], this.targetColor[i], 0.03);
    }
    const [r, g, b] = this.color;

    // Sizes
    const minR = Math.min(w, h) * 0.1;
    const maxR = Math.min(w, h) * 0.3;
    const radius = minR + (maxR - minR) * this.progress;

    // Deep background glow
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 3);
    bg.addColorStop(0, `rgba(${r},${g},${b},0.08)`);
    bg.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Outer rings
    for (let i = 3; i >= 1; i--) {
      const pulse = Math.sin(ts / (800 + i * 300) + i) * 0.03 + 1;
      const rr = radius * (1 + i * 0.18) * pulse;
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${b},${0.04 + (3 - i) * 0.02})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Main circle gradient
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.45)`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},0.2)`);
    grad.addColorStop(0.85, `rgba(${r},${g},${b},0.08)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0.02)`);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Inner bright core
    const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.45);
    inner.addColorStop(0, `rgba(${r},${g},${b},0.7)`);
    inner.addColorStop(0.5, `rgba(${r},${g},${b},0.3)`);
    inner.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = inner;
    ctx.fill();

    // Main ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Particles
    this.particles.forEach(p => {
      p.angle += p.speed * 0.008;
      const wobble = Math.sin(ts / 2500 + p.drift) * 0.12;
      const pr = radius * (p.baseR + wobble);
      const px = cx + Math.cos(p.angle) * pr;
      const py = cy + Math.sin(p.angle) * pr;
      const breathInfluence = 0.3 + this.progress * 0.7;

      ctx.beginPath();
      ctx.arc(px, py, p.size * breathInfluence, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity * breathInfluence * 0.5})`;
      ctx.fill();
    });
  }
}


// ================================================
// 7. PATTERN SVG RENDERER
// ================================================

function renderPatternSVG(phases, w = 280, h = 60) {
  const total = phases.reduce((s, p) => s + p.duration, 0);
  const pad = 8;
  let x = pad;
  let y = h - pad;
  let path = `M ${x} ${y}`;

  phases.forEach(phase => {
    const pw = (phase.duration / total) * (w - pad * 2);
    switch (phase.type) {
      case 'inhale': {
        const ny = pad;
        path += ` C ${x + pw * 0.4} ${y}, ${x + pw * 0.6} ${ny}, ${x + pw} ${ny}`;
        y = ny; break;
      }
      case 'exhale': {
        const ny = h - pad;
        path += ` C ${x + pw * 0.4} ${y}, ${x + pw * 0.6} ${ny}, ${x + pw} ${ny}`;
        y = ny; break;
      }
      case 'hold':
        path += ` L ${x + pw} ${y}`;
        break;
    }
    x += pw;
  });

  return `<svg viewBox="0 0 ${w} ${h}" class="w-full" style="height:${h}px">
    <defs>
      <linearGradient id="pg-${w}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0ea5e9"/>
        <stop offset="50%" stop-color="#8b5cf6"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
    </defs>
    <path d="${path}" fill="none" stroke="url(#pg-${w})" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="pattern-path"/>
  </svg>`;
}

function renderPhaseTimeline(phases) {
  return `<div class="flex items-center gap-1.5 flex-wrap">
    ${phases.map((p, i) => {
    const c = p.type;
    return `<span class="phase-${c} text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
        <span class="w-3 h-3 inline-flex items-center justify-center">${getIconSVG(PHASE_COLORS[c].icon)}</span> ${PHASE_COLORS[c].label} ${p.duration}s
      </span>${i < phases.length - 1 ? '<span class="text-white/15">→</span>' : ''}`;
  }).join('')}
  </div>`;
}


// ================================================
// 8. PAGE RENDERERS
// ================================================

const Pages = {

  // ---- HOME ----
  home() {
    const exercises = Store.getExercises();
    const stats = Store.getStats();
    const greeting = getGreeting();

    return `<div class="py-6 page-enter">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <p class="text-white/40 text-sm">${greeting}</p>
          <h1 class="text-2xl font-semibold mt-0.5 gradient-text">Breathely</h1>
        </div>
        ${stats.totalSessions > 0 ? `
        <div class="flex gap-3">
          <div class="text-center">
            <p class="text-lg font-semibold">${stats.totalSessions}</p>
            <p class="text-[10px] text-white/30 uppercase tracking-wider">Sessions</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-semibold">${stats.totalMinutes}</p>
            <p class="text-[10px] text-white/30 uppercase tracking-wider">Minutes</p>
          </div>
          ${stats.streak > 0 ? `
          <div class="text-center">
            <p class="text-lg font-semibold flex items-center justify-center gap-1"><span class="w-5 h-5">${getIconSVG('fire')}</span>${stats.streak}</p>
            <p class="text-[10px] text-white/30 uppercase tracking-wider">Streak</p>
          </div>` : ''}
        </div>` : ''}
      </div>

      <!-- Featured -->
      <div class="mb-8">
        <h2 class="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Quick Start</h2>
        <div class="scroll-x flex gap-3 -mx-4 px-4 pb-2">
          ${DEFAULT_EXERCISES.map(e => {
      const cat = CATEGORY_STYLES[e.category] || CATEGORY_STYLES.custom;
      return `<button onclick="App.navigate('detail',{id:'${e.id}'})"
              class="flex-shrink-0 w-36 glass glass-hover rounded-2xl p-4 text-left">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white/70 mb-3">${getIconSVG(e.icon)}</div>
              <p class="text-sm font-medium text-white/90 leading-snug">${e.name}</p>
              <p class="text-xs text-white/30 mt-1">${formatDuration(calcTotalTime(e))}</p>
            </button>`;
    }).join('')}
        </div>
      </div>

      <!-- All Exercises -->
      <div class="mb-8">
        <h2 class="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">All Exercises</h2>
        <div class="space-y-2.5 stagger">
          ${exercises.map(e => this._exerciseCard(e)).join('')}
        </div>
      </div>
    </div>`;
  },

  _exerciseCard(e) {
    const cat = CATEGORY_STYLES[e.category] || CATEGORY_STYLES.custom;
    return `<button onclick="App.navigate('detail',{id:'${e.id}'})"
      class="w-full glass glass-hover rounded-2xl p-4 text-left flex items-start gap-3.5">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white/70 flex-shrink-0">${getIconSVG(e.icon)}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h3 class="font-medium text-white/90 text-sm">${escHtml(e.name)}</h3>
          ${!e.isDefault ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">Custom</span>' : ''}
        </div>
        <p class="text-xs text-white/35 mt-0.5 truncate">${escHtml(e.description)}</p>
        <div class="flex items-center gap-2 mt-2 text-[11px] text-white/25">
          <span>${e.phases.length} phases</span><span>·</span>
          <span>${e.rounds} rounds</span><span>·</span>
          <span>${formatDuration(calcTotalTime(e))}</span>
        </div>
      </div>
      <svg class="w-5 h-5 text-white/15 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/></svg>
    </button>`;
  },

  // ---- EXERCISE DETAIL ----
  detail(params) {
    const ex = Store.getExerciseById(params.id);
    if (!ex) return '<p class="py-20 text-center text-white/40">Exercise not found</p>';
    const cat = CATEGORY_STYLES[ex.category] || CATEGORY_STYLES.custom;
    const totalTime = calcTotalTime(ex);

    return `<div class="py-6 page-enter">
      <button onclick="App.back()" class="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>

      <div class="text-center mb-8">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white/70 mx-auto mb-4 shadow-lg">${getIconSVG(ex.icon)}</div>
        <h1 class="text-2xl font-semibold">${escHtml(ex.name)}</h1>
        <p class="text-sm text-white/40 mt-2 max-w-xs mx-auto">${escHtml(ex.description)}</p>
        <span class="inline-block mt-3 text-xs px-3 py-1 rounded-full ${cat.bg} text-white/60 border border-white/5">${cat.label}</span>
      </div>

      <!-- Pattern -->
      <div class="glass rounded-2xl p-5 mb-5">
        <p class="text-xs text-white/30 uppercase tracking-wider mb-3">Breathing Pattern</p>
        <div class="mb-4">${renderPatternSVG(ex.phases)}</div>
        <div class="mt-3">${renderPhaseTimeline(ex.phases)}</div>
      </div>

      <!-- Settings -->
      <div class="glass rounded-2xl p-5 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white/70">Rounds</p>
            <p class="text-xs text-white/30 mt-0.5" id="detail-total-time">Total: ${formatDuration(totalTime)}</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="Pages.adjustRounds('${ex.id}', -1)" class="num-btn">−</button>
            <span id="detail-rounds" class="text-xl font-light w-8 text-center tabular-nums">${ex.rounds}</span>
            <button onclick="Pages.adjustRounds('${ex.id}', 1)" class="num-btn">+</button>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <button onclick="Player.startExercise('${ex.id}')"
        class="w-full py-4 bg-gradient-to-r ${cat.gradient} rounded-2xl font-medium text-base tracking-wide hover:opacity-90 transition-opacity active:scale-[0.98] transform shadow-lg mb-3 flex items-center justify-center gap-2">
        <span class="w-5 h-5">${getIconSVG('play')}</span> Start Exercise
      </button>

      ${!ex.isDefault ? `
      <div class="flex gap-2.5">
        <button onclick="App.navigate('builder',{editId:'${ex.id}'})"
          class="flex-1 py-3 glass glass-hover rounded-xl text-sm text-white/50 flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          Edit
        </button>
        <button onclick="Pages.deleteExercise('${ex.id}')"
          class="flex-1 py-3 glass glass-hover rounded-xl text-sm text-red-400/60 flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          Delete
        </button>
      </div>` : ''}
    </div>`;
  },

  _detailRounds: {},
  adjustRounds(exId, delta) {
    const el = document.getElementById('detail-rounds');
    if (!el) return;
    let val = parseInt(el.textContent) + delta;
    val = Math.max(1, Math.min(50, val));
    el.textContent = val;
    this._detailRounds[exId] = val;
    const totalEl = document.getElementById('detail-total-time');
    if (totalEl) {
      const ex = Store.getExerciseById(exId);
      if (ex) {
        const cycle = ex.phases.reduce((s, p) => s + p.duration, 0);
        totalEl.textContent = 'Total: ' + formatDuration(cycle * val);
      }
    }
  },
  getRoundsForExercise(exId) {
    return this._detailRounds[exId] || null;
  },
  deleteExercise(id) {
    if (!confirm('Delete this exercise?')) return;
    Store.deleteExercise(id);
    App.navigate('home');
  },

  // ---- PROGRAMS ----
  programs() {
    const programs = Store.getPrograms();
    const exercises = Store.getExercises();

    return `<div class="py-6 page-enter">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">Programs</h1>
        <button onclick="App.navigate('program-builder')"
          class="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 transition-colors">
          + New Program
        </button>
      </div>

      <div class="space-y-3 stagger">
        ${programs.map(p => {
      const exList = p.exerciseIds.map(id => exercises.find(e => e.id === id)).filter(Boolean);
      const totalTime = exList.reduce((s, e) => s + calcTotalTime(e), 0);
      return `<button onclick="App.navigate('program-detail',{id:'${p.id}'})"
            class="w-full glass glass-hover rounded-2xl p-4 text-left">
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white/70 flex-shrink-0">${getIconSVG(p.icon)}</div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-medium text-white/90">${escHtml(p.name)}</h3>
                  ${!p.isDefault ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">Custom</span>' : ''}
                </div>
                <p class="text-xs text-white/35 mt-0.5">${escHtml(p.description)}</p>
                <div class="flex items-center gap-2 mt-2">
                  ${exList.map(e => `<span class="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30 flex items-center gap-1"><span class="w-3 h-3 inline-flex">${getIconSVG(e.icon)}</span> ${e.name}</span>`).join('')}
                </div>
                <p class="text-[11px] text-white/20 mt-2">${exList.length} exercises · ${formatDuration(totalTime)}</p>
              </div>
              <svg class="w-5 h-5 text-white/15 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>`;
    }).join('')}
      </div>

      ${programs.length === 0 ? `
      <div class="text-center py-16">
        <div class="empty-circle mx-auto mb-4 flex items-center justify-center">
          <svg class="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.5v6m4.5-6v6m.718-13.5h2.039a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-2.039a.75.75 0 00-.75.75v2.25c0 .414.336.75.75.75z"/></svg>
        </div>
        <p class="text-white/30 text-sm">No programs yet</p>
        <p class="text-white/20 text-xs mt-1">Create one to combine exercises</p>
      </div>` : ''}
    </div>`;
  },

  // ---- PROGRAM DETAIL ----
  programDetail(params) {
    const programs = Store.getPrograms();
    const p = programs.find(x => x.id === params.id);
    if (!p) return '<p class="py-20 text-center text-white/40">Program not found</p>';
    const exercises = Store.getExercises();
    const exList = p.exerciseIds.map(id => exercises.find(e => e.id === id)).filter(Boolean);
    const totalTime = exList.reduce((s, e) => s + calcTotalTime(e), 0);

    return `<div class="py-6 page-enter">
      <button onclick="App.back()" class="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>

      <div class="text-center mb-8">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white/70 mx-auto mb-3">${getIconSVG(p.icon)}</div>
        <h1 class="text-2xl font-semibold">${escHtml(p.name)}</h1>
        <p class="text-sm text-white/40 mt-2">${escHtml(p.description)}</p>
        <p class="text-xs text-white/25 mt-2">${exList.length} exercises · ${formatDuration(totalTime)} total</p>
      </div>

      <div class="space-y-2.5 mb-6">
        ${exList.map((e, i) => {
      const cat = CATEGORY_STYLES[e.category] || CATEGORY_STYLES.custom;
      return `<div class="glass rounded-2xl p-4 flex items-center gap-3">
            <span class="text-xs text-white/20 w-5 text-center font-medium">${i + 1}</span>
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white/70">${getIconSVG(e.icon)}</div>
            <div class="flex-1">
              <p class="text-sm font-medium text-white/80">${escHtml(e.name)}</p>
              <p class="text-xs text-white/30">${e.phases.length} phases · ${e.rounds} rounds · ${formatDuration(calcTotalTime(e))}</p>
            </div>
          </div>`;
    }).join('')}
      </div>

      <button onclick="Player.startProgram('${p.id}')"
        class="w-full py-4 bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl font-medium text-base tracking-wide hover:opacity-90 transition-opacity active:scale-[0.98] transform shadow-lg mb-3 flex items-center justify-center gap-2">
        <span class="w-5 h-5">${getIconSVG('play')}</span> Start Program
      </button>

      ${!p.isDefault ? `
      <div class="flex gap-2.5">
        <button onclick="App.navigate('program-builder',{editId:'${p.id}'})"
          class="flex-1 py-3 glass glass-hover rounded-xl text-sm text-white/50 flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          Edit
        </button>
        <button onclick="Pages.deleteProgram('${p.id}')"
          class="flex-1 py-3 glass glass-hover rounded-xl text-sm text-red-400/60 flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          Delete
        </button>
      </div>` : ''}
    </div>`;
  },

  deleteProgram(id) {
    if (!confirm('Delete this program?')) return;
    Store.deleteProgram(id);
    App.navigate('programs');
  },

  // ---- EXERCISE BUILDER ----
  builder(params) {
    let ex = null;
    if (params.editId) {
      ex = Store.getExerciseById(params.editId);
      if (ex && ex.isDefault) ex = null;
    }
    const isEdit = !!ex;
    const name = ex ? ex.name : '';
    const desc = ex ? ex.description : '';
    const cat = ex ? ex.category : 'custom';
    const icon = ex ? ex.icon : 'breath';
    const rounds = ex ? ex.rounds : 4;
    const phases = ex ? ex.phases : [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 4 },
      { type: 'exhale', duration: 4 },
      { type: 'hold', duration: 4 }
    ];

    // Initialize _builderIconIdx to the correct icon if editing
    if (icon) {
      this._builderIconIdx = this._builderIcons.indexOf(icon);
      if (this._builderIconIdx < 0) this._builderIconIdx = 0;
    } else {
      this._builderIconIdx = 0;
    }

    return `<div class="py-6 page-enter">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">${isEdit ? 'Edit Exercise' : 'Create Exercise'}</h1>
        ${isEdit ? `<button onclick="App.back()" class="text-sm text-white/40 hover:text-white/70">Cancel</button>` : ''}
      </div>

      <!-- Templates (only for new) -->
      ${!isEdit ? `
      <div class="mb-6">
        <p class="text-xs text-white/30 uppercase tracking-wider mb-2">Start from template</p>
        <div class="scroll-x flex gap-2 -mx-4 px-4 pb-1">
          <button onclick="Pages.applyTemplate('box')" class="flex-shrink-0 text-xs px-3 py-1.5 rounded-full glass glass-hover text-white/50 flex items-center gap-1.5"><span class="w-3 h-3">${getIconSVG('square')}</span>Box</button>
          <button onclick="Pages.applyTemplate('triangle')" class="flex-shrink-0 text-xs px-3 py-1.5 rounded-full glass glass-hover text-white/50 flex items-center gap-1.5"><span class="w-3 h-3">${getIconSVG('triangle')}</span>Triangle</button>
          <button onclick="Pages.applyTemplate('4-7-8')" class="flex-shrink-0 text-xs px-3 py-1.5 rounded-full glass glass-hover text-white/50 flex items-center gap-1.5"><span class="w-3 h-3">${getIconSVG('moon')}</span>4-7-8</button>
          <button onclick="Pages.applyTemplate('deep')" class="flex-shrink-0 text-xs px-3 py-1.5 rounded-full glass glass-hover text-white/50 flex items-center gap-1.5"><span class="w-3 h-3">${getIconSVG('lotus')}</span>Deep Calm</button>
          <button onclick="Pages.applyTemplate('energy')" class="flex-shrink-0 text-xs px-3 py-1.5 rounded-full glass glass-hover text-white/50 flex items-center gap-1.5"><span class="w-3 h-3">${getIconSVG('lightning')}</span>Energizing</button>
        </div>
      </div>` : ''}

      <form id="builder-form" onsubmit="Pages.saveBuilder(event)">
        <input type="hidden" id="b-id" value="${ex ? ex.id : uid()}">
        <input type="hidden" id="b-is-edit" value="${isEdit}">

        <!-- Name & Icon -->
        <div class="glass rounded-2xl p-4 mb-3">
          <div class="flex gap-3">
            <button type="button" id="b-icon-btn" onclick="Pages.cycleIcon()"
              class="w-14 h-14 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 flex-shrink-0 transition-colors border border-white/5">
              <span class="w-7 h-7">${getIconSVG(icon)}</span>
            </button>
            <div class="flex-1">
              <input type="text" id="b-name" value="${escHtml(name)}" placeholder="Exercise name"
                class="w-full bg-transparent text-white text-base font-medium outline-none placeholder-white/20 mb-1" required>
              <input type="text" id="b-desc" value="${escHtml(desc)}" placeholder="Short description"
                class="w-full bg-transparent text-white/50 text-sm outline-none placeholder-white/15">
            </div>
          </div>
        </div>

        <!-- Category -->
        <div class="glass rounded-2xl p-4 mb-3">
          <p class="text-xs text-white/30 mb-2">Category</p>
          <div class="flex flex-wrap gap-2" id="b-category">
            ${Object.entries(CATEGORY_STYLES).map(([k, v]) =>
      `<button type="button" data-cat="${k}" onclick="Pages.selectCategory('${k}')"
                class="text-xs px-3 py-1.5 rounded-full border transition-all ${k === cat ? 'bg-gradient-to-r ' + v.gradient + ' border-transparent text-white' : 'border-white/10 text-white/40 hover:border-white/20'}">${v.label}</button>`
    ).join('')}
          </div>
        </div>

        <!-- Phases -->
        <div class="glass rounded-2xl p-4 mb-3">
          <div class="flex items-center justify-between mb-3">
            <p class="text-xs text-white/30 uppercase tracking-wider">Phases</p>
            <button type="button" onclick="Pages.addPhase()"
              class="text-xs px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/50 border border-white/5 transition-colors">+ Add</button>
          </div>

          <!-- Pattern Preview -->
          <div id="b-pattern-preview" class="mb-4">${renderPatternSVG(phases)}</div>

          <!-- Phase List -->
          <div id="b-phases" class="space-y-3">
            ${phases.map((p, i) => this._phaseRow(p, i, phases.length)).join('')}
          </div>
        </div>

        <!-- Rounds -->
        <div class="glass rounded-2xl p-4 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-white/70">Rounds</p>
              <p class="text-xs text-white/30 mt-0.5" id="b-total-time">Total: ${formatDuration(phases.reduce((s, p) => s + p.duration, 0) * rounds)}</p>
            </div>
            <div class="flex items-center gap-3">
              <button type="button" onclick="Pages.adjustBuilderRounds(-1)" class="num-btn">−</button>
              <span id="b-rounds" class="text-xl font-light w-8 text-center tabular-nums">${rounds}</span>
              <button type="button" onclick="Pages.adjustBuilderRounds(1)" class="num-btn">+</button>
            </div>
          </div>
        </div>

        <button type="submit"
          class="w-full py-4 bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl font-medium text-base tracking-wide hover:opacity-90 transition-opacity active:scale-[0.98] transform shadow-lg">
          ${isEdit ? 'Save Changes' : 'Create Exercise'}
        </button>
      </form>
    </div>`;
  },

  _phaseRow(phase, index, total) {
    return `<div class="flex items-center gap-2.5 phase-row" data-index="${index}">
      <select onchange="Pages.updatePhase(${index}, 'type', this.value)"
        class="bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white/80 outline-none cursor-pointer flex-shrink-0 w-24">
        <option value="inhale" ${phase.type === 'inhale' ? 'selected' : ''}>Inhale</option>
        <option value="hold" ${phase.type === 'hold' ? 'selected' : ''}>Hold</option>
        <option value="exhale" ${phase.type === 'exhale' ? 'selected' : ''}>Exhale</option>
      </select>
      <div class="flex-1 flex items-center gap-2">
        <input type="range" min="1" max="30" value="${phase.duration}" class="flex-1"
          oninput="Pages.updatePhase(${index}, 'duration', this.value)">
        <span class="text-sm text-white/50 w-7 text-right tabular-nums phase-dur">${phase.duration}s</span>
      </div>
      ${total > 2 ? `
      <button type="button" onclick="Pages.removePhase(${index})"
        class="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/20 hover:text-red-400 transition-colors flex-shrink-0">×</button>
      ` : '<div class="w-8"></div>'}
    </div>`;
  },

  _builderPhases: [],
  _builderCategory: 'custom',
  _builderIcons: ['breath', 'square', 'triangle', 'moon', 'lotus', 'target', 'lightning', 'waves', 'wind', 'sunrise', 'stream', 'up', 'down', 'pause'],
  _builderIconIdx: 0,

  initBuilder(params) {
    let ex = null;
    if (params.editId) {
      ex = Store.getExerciseById(params.editId);
      if (ex && ex.isDefault) ex = null;
    }
    this._builderPhases = ex ? [...ex.phases.map(p => ({ ...p }))] :
      [{ type: 'inhale', duration: 4 }, { type: 'hold', duration: 4 }, { type: 'exhale', duration: 4 }, { type: 'hold', duration: 4 }];
    this._builderCategory = ex ? ex.category : 'custom';
    this._builderIconIdx = 0;
  },

  applyTemplate(tmpl) {
    const templates = {
      'box': { phases: [{ type: 'inhale', duration: 4 }, { type: 'hold', duration: 4 }, { type: 'exhale', duration: 4 }, { type: 'hold', duration: 4 }], name: 'Box Breathing', icon: 'square', rounds: 4 },
      'triangle': { phases: [{ type: 'inhale', duration: 4 }, { type: 'exhale', duration: 4 }, { type: 'hold', duration: 4 }], name: 'Triangle Breathing', icon: 'triangle', rounds: 6 },
      '4-7-8': { phases: [{ type: 'inhale', duration: 4 }, { type: 'hold', duration: 7 }, { type: 'exhale', duration: 8 }], name: '4-7-8 Breathing', icon: 'moon', rounds: 4 },
      'deep': { phases: [{ type: 'inhale', duration: 4 }, { type: 'exhale', duration: 8 }], name: 'Deep Calm', icon: 'lotus', rounds: 6 },
      'energy': { phases: [{ type: 'inhale', duration: 2 }, { type: 'exhale', duration: 2 }], name: 'Energizing', icon: 'lightning', rounds: 15 }
    };
    const t = templates[tmpl];
    if (!t) return;
    this._builderPhases = t.phases.map(p => ({ ...p }));
    document.getElementById('b-name').value = t.name + ' (Custom)';
    const btn = document.getElementById('b-icon-btn');
    if (btn) {
      btn.innerHTML = `<span class="w-6 h-6">${getIconSVG(t.icon)}</span>`;
    }
    document.getElementById('b-rounds').textContent = t.rounds;
    this._refreshPhases();
  },

  addPhase() {
    if (this._builderPhases.length >= 8) return;
    this._builderPhases.push({ type: 'hold', duration: 4 });
    this._refreshPhases();
  },

  removePhase(idx) {
    if (this._builderPhases.length <= 2) return;
    this._builderPhases.splice(idx, 1);
    this._refreshPhases();
  },

  updatePhase(idx, key, val) {
    if (key === 'duration') val = parseInt(val);
    this._builderPhases[idx][key] = val;
    if (key === 'duration') {
      const row = document.querySelectorAll('.phase-row')[idx];
      if (row) row.querySelector('.phase-dur').textContent = val + 's';
    }
    this._refreshPreview();
  },

  _refreshPhases() {
    const container = document.getElementById('b-phases');
    if (container) {
      container.innerHTML = this._builderPhases.map((p, i) =>
        this._phaseRow(p, i, this._builderPhases.length)
      ).join('');
    }
    this._refreshPreview();
  },

  _refreshPreview() {
    const preview = document.getElementById('b-pattern-preview');
    if (preview) preview.innerHTML = renderPatternSVG(this._builderPhases);
    const rounds = parseInt(document.getElementById('b-rounds')?.textContent || '4');
    const total = this._builderPhases.reduce((s, p) => s + p.duration, 0) * rounds;
    const el = document.getElementById('b-total-time');
    if (el) el.textContent = 'Total: ' + formatDuration(total);
  },

  selectCategory(cat) {
    this._builderCategory = cat;
    document.querySelectorAll('#b-category button').forEach(btn => {
      const k = btn.dataset.cat;
      const s = CATEGORY_STYLES[k];
      if (k === cat) {
        btn.className = `text-xs px-3 py-1.5 rounded-full border transition-all bg-gradient-to-r ${s.gradient} border-transparent text-white`;
      } else {
        btn.className = 'text-xs px-3 py-1.5 rounded-full border transition-all border-white/10 text-white/40 hover:border-white/20';
      }
    });
  },

  cycleIcon() {
    this._builderIconIdx = (this._builderIconIdx + 1) % this._builderIcons.length;
    const btn = document.getElementById('b-icon-btn');
    if (btn) {
      btn.innerHTML = `<span class="w-7 h-7">${getIconSVG(this._builderIcons[this._builderIconIdx])}</span>`;
    }
  },

  adjustBuilderRounds(delta) {
    const el = document.getElementById('b-rounds');
    let val = parseInt(el.textContent) + delta;
    val = Math.max(1, Math.min(50, val));
    el.textContent = val;
    this._refreshPreview();
  },

  saveBuilder(e) {
    e.preventDefault();
    const id = document.getElementById('b-id').value;
    const isEdit = document.getElementById('b-is-edit').value === 'true';
    const name = document.getElementById('b-name').value.trim();
    if (!name) { alert('Please enter a name'); return; }

    const exercise = {
      id: id,
      name: name,
      description: document.getElementById('b-desc').value.trim(),
      icon: this._builderIcons[this._builderIconIdx],
      category: this._builderCategory,
      phases: [...this._builderPhases],
      rounds: parseInt(document.getElementById('b-rounds').textContent),
      isDefault: false
    };

    Store.saveExercise(exercise);
    App.navigate('detail', { id: exercise.id });
  },

  // ---- PROGRAM BUILDER ----
  programBuilder(params) {
    const programs = Store.getPrograms();
    let prog = null;
    if (params.editId) prog = programs.find(p => p.id === params.editId && !p.isDefault);
    const isEdit = !!prog;
    const exercises = Store.getExercises();
    const selectedIds = prog ? prog.exerciseIds : [];

    // Initialize _progIconIdx to the correct icon if editing
    if (prog && prog.icon) {
      this._progIconIdx = this._progIcons.indexOf(prog.icon);
      if (this._progIconIdx < 0) this._progIconIdx = 0;
    } else {
      this._progIconIdx = 0;
    }

    return `<div class="py-6 page-enter">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">${isEdit ? 'Edit Program' : 'New Program'}</h1>
        <button onclick="App.back()" class="text-sm text-white/40 hover:text-white/70">Cancel</button>
      </div>

      <form onsubmit="Pages.saveProgramBuilder(event)">
        <input type="hidden" id="pb-id" value="${prog ? prog.id : uid()}">

        <div class="glass rounded-2xl p-4 mb-3">
          <div class="flex gap-3 mb-3">
            <button type="button" id="pb-icon" onclick="Pages.cycleProgramIcon()"
              class="w-14 h-14 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 flex-shrink-0 transition-colors border border-white/5">
              ${prog ? `<span class="w-8 h-8">${getIconSVG(prog.icon)}</span>` : `<span class="w-8 h-8">${getIconSVG('breath')}</span>`}
            </button>
            <div class="flex-1">
              <input type="text" id="pb-name" value="${prog ? escHtml(prog.name) : ''}" placeholder="Program name"
                class="w-full bg-transparent text-white text-base font-medium outline-none placeholder-white/20 mb-1" required>
              <input type="text" id="pb-desc" value="${prog ? escHtml(prog.description) : ''}" placeholder="Short description"
                class="w-full bg-transparent text-white/50 text-sm outline-none placeholder-white/15">
            </div>
          </div>
        </div>

        <div class="glass rounded-2xl p-4 mb-6">
          <p class="text-xs text-white/30 uppercase tracking-wider mb-3">Select Exercises (in order)</p>
          <div class="space-y-2" id="pb-exercises">
            ${exercises.map(e => {
      const checked = selectedIds.includes(e.id);
      const cat = CATEGORY_STYLES[e.category] || CATEGORY_STYLES.custom;
      return `<label class="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors ${checked ? 'bg-white/5' : ''}">
                <input type="checkbox" name="exercises" value="${e.id}" ${checked ? 'checked' : ''}
                  class="w-5 h-5 rounded accent-sky-500">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white/70">${getIconSVG(e.icon)}</div>
                <div class="flex-1">
                  <p class="text-sm text-white/80">${escHtml(e.name)}</p>
                  <p class="text-[11px] text-white/25">${formatDuration(calcTotalTime(e))}</p>
                </div>
              </label>`;
    }).join('')}
          </div>
        </div>

        <button type="submit"
          class="w-full py-4 bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl font-medium text-base tracking-wide hover:opacity-90 transition-opacity active:scale-[0.98] transform shadow-lg">
          ${isEdit ? 'Save Changes' : 'Create Program'}
        </button>
      </form>
    </div>`;
  },

  _progIconIdx: 0,
  _progIcons: ['breath', 'sunrise', 'moon', 'lotus', 'lightning', 'target', 'square', 'triangle', 'waves', 'wind'],
  cycleProgramIcon() {
    this._progIconIdx = (this._progIconIdx + 1) % this._progIcons.length;
    const btn = document.getElementById('pb-icon');
    if (btn) {
      btn.innerHTML = `<span class="w-8 h-8">${getIconSVG(this._progIcons[this._progIconIdx])}</span>`;
    }
  },

  saveProgramBuilder(e) {
    e.preventDefault();
    const name = document.getElementById('pb-name').value.trim();
    if (!name) { alert('Please enter a name'); return; }
    const checked = [...document.querySelectorAll('#pb-exercises input:checked')].map(cb => cb.value);
    if (checked.length === 0) { alert('Select at least one exercise'); return; }

    const program = {
      id: document.getElementById('pb-id').value,
      name: name,
      description: document.getElementById('pb-desc').value.trim(),
      icon: this._progIcons[this._progIconIdx],
      exerciseIds: checked,
      isDefault: false
    };

    Store.saveProgram(program);
    App.navigate('programs');
  },

  // ---- SETTINGS ----
  settings() {
    const s = Store.getSettings();

    return `<div class="py-6 page-enter">
      <h1 class="text-2xl font-semibold mb-6">Settings</h1>

      <!-- Sound Settings -->
      <div class="glass rounded-2xl p-5 mb-3">
        <p class="text-xs text-white/30 uppercase tracking-wider mb-4">Sound</p>

        <div class="flex items-center justify-between mb-5">
          <div>
            <p class="text-sm text-white/70">Transition Sounds</p>
            <p class="text-xs text-white/30">Phase change cues</p>
          </div>
          <div class="toggle ${s.transitionSounds ? 'active' : ''}" onclick="Pages.toggleSetting('transitionSounds', this)"></div>
        </div>

        <div class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-white/70">Transition Volume</p>
            <span id="trans-vol-label" class="text-xs text-white/30 tabular-nums">${Math.round(s.transitionVolume * 100)}%</span>
          </div>
          <input type="range" min="0" max="100" value="${Math.round(s.transitionVolume * 100)}" class="w-full"
            oninput="Pages.updateSetting('transitionVolume', this.value / 100); document.getElementById('trans-vol-label').textContent = this.value + '%'">
        </div>

        <div class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-white/70">Background Sound</p>
          </div>
          <div class="grid grid-cols-3 gap-2">
            ${BG_SOUNDS.map(bg => `
              <button type="button" onclick="Pages.selectBgSound('${bg.id}')"
                class="bg-sound-opt flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${s.backgroundSound === bg.id ? 'border-sky-500/50 bg-sky-500/10' : 'border-white/5 bg-white/3 hover:bg-white/5'}"
                data-sound="${bg.id}">
                <span class="w-6 h-6 text-white/70">${getIconSVG(bg.icon)}</span>
                <span class="text-[11px] text-white/50">${bg.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm text-white/70">Background Volume</p>
            <span id="bg-vol-label" class="text-xs text-white/30 tabular-nums">${Math.round(s.backgroundVolume * 100)}%</span>
          </div>
          <input type="range" min="0" max="100" value="${Math.round(s.backgroundVolume * 100)}" class="w-full"
            oninput="Pages.updateSetting('backgroundVolume', this.value / 100); document.getElementById('bg-vol-label').textContent = this.value + '%'">
        </div>
      </div>

      <!-- General -->
      <div class="glass rounded-2xl p-5 mb-3">
        <p class="text-xs text-white/30 uppercase tracking-wider mb-4">General</p>

        <div class="flex items-center justify-between mb-5">
          <div>
            <p class="text-sm text-white/70">Vibration</p>
            <p class="text-xs text-white/30">Haptic feedback on phase changes</p>
          </div>
          <div class="toggle ${s.vibration ? 'active' : ''}" onclick="Pages.toggleSetting('vibration', this)"></div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white/70">Countdown</p>
            <p class="text-xs text-white/30">Seconds before session starts</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="Pages.adjustCountdown(-1)" class="num-btn text-sm">−</button>
            <span id="countdown-setting" class="text-lg font-light w-6 text-center tabular-nums">${s.countdownSeconds}</span>
            <button onclick="Pages.adjustCountdown(1)" class="num-btn text-sm">+</button>
          </div>
        </div>
      </div>

      <!-- Data -->
      <div class="glass rounded-2xl p-5 mb-3">
        <p class="text-xs text-white/30 uppercase tracking-wider mb-4">Data</p>

        <button onclick="Pages.exportData()"
          class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/60 transition-colors mb-2.5 flex items-center justify-center gap-2">
          <span class="w-4 h-4">${getIconSVG('export')}</span> Export Exercises & Programs
        </button>
        <button onclick="Pages.importData()"
          class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/60 transition-colors mb-2.5 flex items-center justify-center gap-2">
          <span class="w-4 h-4">${getIconSVG('import')}</span> Import Data
        </button>
        <button onclick="Pages.resetData()"
          class="w-full py-2.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-sm text-red-400/60 transition-colors flex items-center justify-center gap-2">
          <span class="w-4 h-4">${getIconSVG('reset')}</span> Reset All Data
        </button>
      </div>

      <!-- About -->
      <div class="glass rounded-2xl p-5">
        <p class="text-xs text-white/30 uppercase tracking-wider mb-4">About</p>
        <div class="text-center">
          <p class="gradient-text text-lg font-semibold">Breathely</p>
          <p class="text-xs text-white/25 mt-1">Version 1.0.0</p>
          <p class="text-xs text-white/20 mt-3">Mindful breathing exercises for<br>calm, focus, and better sleep</p>
          <p class="text-xs text-white/15 mt-4">Made with <span class="w-3 h-3 inline-flex">${getIconSVG('heart')}</span> and deep breaths</p>
        </div>
      </div>
    </div>`;
  },

  toggleSetting(key, el) {
    const s = Store.getSettings();
    s[key] = !s[key];
    Store.saveSettings(s);
    el.classList.toggle('active');
    Sound.applySettings();
  },

  updateSetting(key, val) {
    const s = Store.getSettings();
    s[key] = val;
    Store.saveSettings(s);
    Sound.applySettings();
  },

  selectBgSound(id) {
    const s = Store.getSettings();
    s.backgroundSound = id;
    Store.saveSettings(s);
    // Update UI
    document.querySelectorAll('.bg-sound-opt').forEach(btn => {
      if (btn.dataset.sound === id) {
        btn.className = btn.className.replace(/border-white\/5 bg-white\/3 hover:bg-white\/5|border-sky-500\/50 bg-sky-500\/10/g, '').trim();
        btn.classList.add('border-sky-500/50', 'bg-sky-500/10');
      } else {
        btn.className = btn.className.replace(/border-sky-500\/50 bg-sky-500\/10|border-white\/5 bg-white\/3 hover:bg-white\/5/g, '').trim();
        btn.classList.add('border-white/5', 'bg-white/3', 'hover:bg-white/5');
      }
    });
    // Preview sound
    Sound.init();
    if (id === 'none') Sound.stopBg();
    else { Sound.startBg(id); setTimeout(() => Sound.stopBg(), 3000); }
  },

  adjustCountdown(delta) {
    const el = document.getElementById('countdown-setting');
    let val = parseInt(el.textContent) + delta;
    val = Math.max(1, Math.min(10, val));
    el.textContent = val;
    const s = Store.getSettings();
    s.countdownSeconds = val;
    Store.saveSettings(s);
  },

  exportData() {
    const data = {
      exercises: Store.getCustomExercises(),
      programs: Store.getCustomPrograms(),
      settings: Store.getSettings()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'breathely-data.json';
    a.click(); URL.revokeObjectURL(url);
  },

  importData() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = async () => {
      try {
        const text = await input.files[0].text();
        const data = JSON.parse(text);
        if (data.exercises) data.exercises.forEach(e => Store.saveExercise(e));
        if (data.programs) data.programs.forEach(p => Store.saveProgram(p));
        if (data.settings) Store.saveSettings({ ...Store.getSettings(), ...data.settings });
        alert('Data imported successfully!');
        App.navigate('settings');
      } catch { alert('Invalid file format'); }
    };
    input.click();
  },

  resetData() {
    if (!confirm('This will delete all custom exercises, programs, and session history. Continue?')) return;
    localStorage.removeItem('breathely_exercises');
    localStorage.removeItem('breathely_programs');
    localStorage.removeItem('breathely_history');
    localStorage.removeItem('breathely_settings');
    alert('Data reset successfully!');
    App.navigate('home');
  }
};


// ================================================
// 9. PLAYER CONTROLLER
// ================================================

const Player = {
  session: null,
  visualizer: null,
  _programMode: false,
  _programExercises: [],
  _programIdx: 0,
  _programId: null,

  startExercise(exId) {
    const ex = Store.getExerciseById(exId);
    if (!ex) return;
    const customRounds = Pages.getRoundsForExercise(exId);
    if (customRounds) ex.rounds = customRounds;
    this._programMode = false;
    this._show(ex.name);
    this._run(ex);
  },

  startProgram(progId) {
    const prog = Store.getPrograms().find(p => p.id === progId);
    if (!prog) return;
    const exercises = Store.getExercises();
    this._programMode = true;
    this._programId = progId;
    this._programExercises = prog.exerciseIds.map(id => exercises.find(e => e.id === id)).filter(Boolean);
    this._programIdx = 0;
    if (this._programExercises.length === 0) return;
    this._show(prog.name);
    document.getElementById('player-program-info').classList.remove('hidden');
    this._runProgramExercise();
  },

  _runProgramExercise() {
    const ex = this._programExercises[this._programIdx];
    document.getElementById('player-exercise-name').textContent = ex.name;
    document.getElementById('player-program-info').textContent =
      `Exercise ${this._programIdx + 1} of ${this._programExercises.length}`;
    this._run(ex);
  },

  _show(title) {
    Sound.init();
    const settings = Store.getSettings();
    if (settings.backgroundSound !== 'none') {
      Sound.startBg(settings.backgroundSound);
    }
    Sound._muted = false;

    const overlay = document.getElementById('player-overlay');
    overlay.style.display = 'flex';
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('player-exercise-name').textContent = title;
    document.getElementById('player-program-info').classList.add('hidden');

    // Reset displays
    ['countdown-display', 'session-display', 'complete-display', 'player-controls'].forEach(id => {
      document.getElementById(id).style.display = 'none';
    });
    document.getElementById('session-progress').style.width = '0%';

    // Init canvas
    const canvas = document.getElementById('breathing-canvas');
    if (this.visualizer) this.visualizer.destroy();
    this.visualizer = new BreathingVisualizer(canvas);
    this.visualizer.start();

    // Sound toggle state
    this._updateSoundIcon();
  },

  _run(exercise) {
    if (this.session) this.session.stop();

    this.session = new BreathingSession(exercise, {
      onCountdown: (n) => {
        document.getElementById('countdown-display').style.display = 'block';
        document.getElementById('session-display').style.display = 'none';
        document.getElementById('player-controls').style.display = 'none';
        const el = document.getElementById('countdown-number');
        el.textContent = n;
        el.className = 'text-9xl font-extralight text-white/90 countdown-pop';
        // Force reflow for animation
        void el.offsetWidth;
        el.className = 'text-9xl font-extralight text-white/90 countdown-pop';
      },

      onPhaseChange: (phase, idx, round) => {
        document.getElementById('countdown-display').style.display = 'none';
        document.getElementById('session-display').style.display = 'block';
        document.getElementById('player-controls').style.display = 'flex';
        document.getElementById('phase-label').textContent = PHASE_COLORS[phase.type].label;
        document.getElementById('round-label').textContent = `Round ${round} of ${exercise.rounds}`;

        if (this.visualizer) {
          this.visualizer.setPhase(phase.type, phase.duration);
        }
      },

      onTick: (remaining, progress, phase, overall) => {
        document.getElementById('phase-timer').textContent = Math.ceil(remaining);
        document.getElementById('session-progress').style.width = (overall * 100) + '%';
      },

      onRoundComplete: (round) => { },

      onComplete: (duration) => {
        document.getElementById('session-display').style.display = 'none';
        document.getElementById('player-controls').style.display = 'none';
        document.getElementById('session-progress').style.width = '100%';

        // Save session
        Store.addSession({
          exerciseId: exercise.id,
          exerciseName: exercise.name,
          duration: Math.round(duration),
          rounds: exercise.rounds
        });

        if (this._programMode && this._programIdx < this._programExercises.length - 1) {
          // Next exercise in program
          this._programIdx++;
          setTimeout(() => this._runProgramExercise(), 1500);
          return;
        }

        // Show complete
        document.getElementById('complete-display').style.display = 'block';
        const mins = Math.floor(duration / 60);
        const secs = Math.round(duration % 60);
        let statsText = `${mins > 0 ? mins + ' min ' : ''}${secs}s of mindful breathing`;
        if (this._programMode) {
          statsText += `<br>${this._programExercises.length} exercises completed`;
        }
        document.getElementById('complete-stats').innerHTML = statsText;

        if (this.visualizer) {
          this.visualizer.setPhase('hold', 999);
        }
      }
    });

    this.session.start();
  },

  _setupControls() {
    // These are set up once in init
  },

  togglePause() {
    if (!this.session || !this.session.running) return;
    if (this.session.paused) {
      this.session.resume();
      if (this.visualizer) this.visualizer.start();
      document.getElementById('icon-pause').style.display = '';
      document.getElementById('icon-resume').style.display = 'none';
    } else {
      this.session.pause();
      if (this.visualizer) this.visualizer.stop();
      document.getElementById('icon-pause').style.display = 'none';
      document.getElementById('icon-resume').style.display = '';
    }
  },

  stop() {
    if (this.session) this.session.stop();
    this._hide();
  },

  _hide() {
    Sound.stopBg();
    if (this.visualizer) { this.visualizer.destroy(); this.visualizer = null; }
    document.getElementById('player-overlay').style.display = 'none';
    document.getElementById('navbar').style.display = '';
    // Reset pause icons
    document.getElementById('icon-pause').style.display = '';
    document.getElementById('icon-resume').style.display = 'none';
  },

  _updateSoundIcon() {
    const btn = document.getElementById('btn-sound-toggle');
    if (Sound._muted) {
      btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>';
    } else {
      btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.788V15.21c0 .274.222.496.496.496h2.238l3.455 3.456A.5.5 0 0013.5 18.87V5.13a.5.5 0 00-.811-.391L9.234 8.292H6.996a.496.496 0 00-.496.496z"/></svg>';
    }
  },

  init() {
    document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-stop').addEventListener('click', () => this.stop());
    document.getElementById('btn-close-complete').addEventListener('click', () => this._hide());
    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      Sound.init();
      Sound.toggleMute();
      this._updateSoundIcon();
    });
  }
};


// ================================================
// 10. APP CONTROLLER / ROUTER
// ================================================

const App = {
  _history: [],
  _currentPage: null,
  _currentParams: {},

  init() {
    // Setup navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page) {
          this._history = [];
          this.navigate(page);
        }
      });
    });

    // Init player controls
    Player.init();

    // Navigate to home
    this.navigate('home');

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(err =>
        console.warn('SW registration failed:', err)
      );
    }
  },

  navigate(page, params = {}) {
    if (this._currentPage && this._currentPage !== page) {
      this._history.push({ page: this._currentPage, params: this._currentParams });
    }
    this._currentPage = page;
    this._currentParams = params;

    const container = document.getElementById('page-container');

    switch (page) {
      case 'home':
        container.innerHTML = Pages.home();
        break;
      case 'programs':
        container.innerHTML = Pages.programs();
        break;
      case 'builder':
        container.innerHTML = Pages.builder(params);
        Pages.initBuilder(params);
        break;
      case 'detail':
        container.innerHTML = Pages.detail(params);
        break;
      case 'settings':
        container.innerHTML = Pages.settings();
        break;
      case 'program-detail':
        container.innerHTML = Pages.programDetail(params);
        break;
      case 'program-builder':
        container.innerHTML = Pages.programBuilder(params);
        break;
    }

    // Update nav
    const mainPages = ['home', 'programs', 'builder', 'settings'];
    let activePage = page;
    if (page === 'detail') activePage = 'home';
    if (page === 'program-detail' || page === 'program-builder') activePage = 'programs';

    document.querySelectorAll('.nav-btn').forEach(btn => {
      const bp = btn.dataset.page;
      if (bp === activePage) {
        btn.classList.remove('text-white/40');
        btn.classList.add('text-sky-400');
      } else {
        btn.classList.remove('text-sky-400');
        btn.classList.add('text-white/40');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  back() {
    if (this._history.length > 0) {
      const prev = this._history.pop();
      this._currentPage = prev.page;
      this._currentParams = prev.params;
      this.navigate(prev.page, prev.params);
      this._history.pop(); // Remove the entry navigate just pushed
    } else {
      this.navigate('home');
    }
  }
};


// ================================================
// 11. INITIALIZATION
// ================================================

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
