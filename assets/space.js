var SPACE={"Mercury":{"g":3.7,"year":88.0,"day":4222.6},"Venus":{"g":8.9,"year":224.7,"day":2802.0},"Earth":{"g":9.8,"year":365.2,"day":24.0},"Moon":{"g":1.6,"year":27.3,"day":708.7},"Mars":{"g":3.7,"year":687.0,"day":24.7},"Jupiter":{"g":23.1,"year":4331,"day":9.9},"Saturn":{"g":9.0,"year":10747,"day":10.7},"Uranus":{"g":8.7,"year":30589,"day":17.2},"Neptune":{"g":11.0,"year":59800,"day":16.1},"Pluto":{"g":0.7,"year":90560,"day":153.3}};
/* space.shareyourgroup.com: weight and age on other worlds. Figures (gravity, year) come from the build as SPACE, taken from NASA's planetary fact sheet. */
(function () {
  'use strict';
  var M = {}, D = (typeof SPACE !== 'undefined') ? SPACE : {};
  M.load = function (d) { D = d; };
  M.weight = function (body, kg) { return kg * D[body].g / D.Earth.g; };
  M.age = function (body, years) { return years * D.Earth.year / D[body].year; };
  if (typeof module !== 'undefined') { module.exports = M; return; }

  var d = document, $ = function (s) { return d.querySelector(s); };
  function f(x, n) { var s = x.toFixed(n === undefined ? (x >= 100 ? 0 : x >= 10 ? 1 : 2) : n).replace(/\.?0+$/, ''); var p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return p.join('.'); }
  function rows(list, fn) { return list.map(function (b) { return '<tr><td><a href="/' + b.toLowerCase() + '/">' + b + '</a></td><td class="mono">' + fn(b) + '</td></tr>'; }).join(''); }
  var all = Object.keys(D), wf = $('#sw-form'), af = $('#sa-form');
  if (wf) wf.addEventListener('submit', function (e) {
    e.preventDefault(); var w = parseFloat($('#sw-w').value.replace(',', '.')), out = $('#sw-out');
    if (!(w > 0) || w > 1000) { out.innerHTML = '<p class="note">Type a weight in kilograms, for example 42.</p>'; return; }
    var txt = 'If I weigh ' + f(w) + ' kg on Earth: ' + all.filter(function (b) { return b !== 'Earth'; }).map(function (b) { return b + ' ' + f(M.weight(b, w)) + ' kg'; }).join(', ');
    out.innerHTML = '<div class="result rise"><h2>' + f(w) + ' kg on Earth is...</h2><div class="tbl"><table><tbody>' + rows(all, function (b) { return f(M.weight(b, w)) + ' kg'; }) + '</tbody></table></div>' +
      '<div class="acts" style="display:flex"><button class="btn sm" type="button" data-copy="' + SYG.esc(txt) + '">Copy</button><button class="btn sm ghost" type="button" data-wa="' + SYG.esc(txt + ' (space.shareyourgroup.com)') + '">WhatsApp</button></div></div>';
  });
  if (af) af.addEventListener('submit', function (e) {
    e.preventDefault(); var a = parseFloat($('#sa-a').value.replace(',', '.')), out = $('#sa-out'), list = all.filter(function (b) { return b !== 'Moon'; });
    if (!(a > 0) || a > 130) { out.innerHTML = '<p class="note">Type an age in years, for example 11.</p>'; return; }
    var txt = 'I am ' + f(a) + ' on Earth. In their own years: ' + list.filter(function (b) { return b !== 'Earth'; }).map(function (b) { return b + ' ' + f(M.age(b, a)); }).join(', ');
    out.innerHTML = '<div class="result rise"><h2>' + f(a) + ' Earth years is...</h2><div class="tbl"><table><tbody>' + rows(list, function (b) { return f(M.age(b, a)) + ' years'; }) + '</tbody></table></div>' +
      '<div class="acts" style="display:flex"><button class="btn sm" type="button" data-copy="' + SYG.esc(txt) + '">Copy</button><button class="btn sm ghost" type="button" data-wa="' + SYG.esc(txt + ' (space.shareyourgroup.com)') + '">WhatsApp</button></div></div>';
  });
})();
