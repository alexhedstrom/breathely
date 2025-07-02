const path = require('path');
const { JSDOM } = require('jsdom');

const ids = [
  'installContainer','butInstall','requireHTTPS','customize_open','customize_menu','customize_close',
  'button_start','button_begin','button_cancel','button_pause_play','settings','countdown','my_sketch','intro',
  'info_open','info_overlay','info_close','three_min_intro','five_min_intro','ten_min_intro','twenty_min_intro',
  'three_min','five_min','ten_min','twenty_min','sound1_intro','sound2_intro','sound9_intro',
  'sound1','sound2','sound9','status','cancel_overlay','done_overlay','button_close','button_close_done'
];

describe('countDown', () => {
  let countDown;

  beforeEach(() => {
    jest.resetModules();
    const dom = new JSDOM('<!DOCTYPE html><body></body>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;

    ids.forEach(id => {
      const el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
    });

    document.getElementById('requireHTTPS').appendChild(document.createElement('a'));

    global.song_played = { stop: jest.fn() };

    jest.useFakeTimers();
    countDown = require('../assets/js/main.js').countDown;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('updates status and clears timer when seconds reach zero', () => {
    const status = document.getElementById('status');
    countDown(1, 'status');
    expect(status.innerHTML).toBe('00:01');
    expect(jest.getTimerCount()).toBe(1);

    jest.runOnlyPendingTimers();

    expect(status.innerHTML).toBe(' ');
    expect(jest.getTimerCount()).toBe(0);
  });
});
