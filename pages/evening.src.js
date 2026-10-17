/* Paddle Florida "Evening Programs" page. Mount: <div id="pf-evening"></div>
   Speakers are embedded from evening/speakers.json (build.py) as a fallback, and replaced by the
   live feed the dashboard publishes (CFG.feed). Built by Ocoos Web Consulting. */
(function () {
  var root = document.getElementById('pf-evening');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');
  var DATA = /*EVENING*/{};
  var CFG = { feed: 'https://pf-dashboard.calm-sun-1c8d.workers.dev/public/evening.json', trips: '/#trips', contact: '/contact-us' };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var track = function (n, x) { try { if (window.gtag) gtag('event', n, x || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: n }, x || {})); } catch (e) {} };
  var img = function (u, w) { return /squarespace-cdn\.com/.test(u) ? u + (u.indexOf('?') < 0 ? '?format=' + (w || 600) + 'w' : '') : u; };
  var host = function (u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return u; } };
  var S = { q: '', tag: '' };
  var list = [], intro = { title: 'Evening Programs', text: '' };

  var css = [
    '.pfe{--ink:#16262b;--mute:#566a70;--soft:#f4f0e6;--line:#e1ddd0;--or:#d9622b;--or2:#b94c1a;--navy:#0e3b43;--gold:#f2b84b;--teal:#00887E;--teal2:#006f65;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.6;width:100vw;margin-left:calc(50% - 50vw);overflow-x:clip;text-align:left;box-sizing:border-box}',
    '.pfe *{box-sizing:border-box}.pfe h1,.pfe h2,.pfe h3{font-family:Oswald,Poppins,sans-serif!important;text-transform:none!important;letter-spacing:.01em!important;line-height:1.15!important;margin:0 0 .45em!important;font-weight:600!important}.pfe p{margin:0 0 1em}.pfe a{text-decoration:none!important}',
    '.pfe .w{max-width:1160px;margin:0 auto;padding:0 20px}',
    '.pfe .btn{display:inline-block;background:var(--or);color:#fff!important;font:600 15px/1.25 Poppins,sans-serif;text-align:center;border:0;border-radius:10px;padding:13px 24px;cursor:pointer;transition:background .15s,transform .15s}.pfe .btn:hover{background:var(--or2);transform:translateY(-1px)}',
    '.pfe :focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '.pfe .hero{position:relative;color:#fff;text-align:center;background:linear-gradient(135deg,var(--navy),var(--teal));padding:calc(var(--header-height,134px) * .55) 0 70px;overflow:hidden;isolation:isolate}',
    '.pfe .hero:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:46px;z-index:-1;background:#fff;clip-path:ellipse(60% 100% at 50% 100%)}',
    '.pfe .hero:before{content:"";position:absolute;inset:0;z-index:-1;opacity:.14;background:repeating-radial-gradient(circle at 15% 120%,transparent 0 26px,#fff 27px 28px)}',
    '.pfe .hero h1{font-size:clamp(34px,5.4vw,56px)!important;color:#fff!important}.pfe .hero p{font-size:18px;max-width:700px;margin:0 auto}',
    '.pfe .bar{position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--line)}.pfe .bar .w{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;padding-top:12px;padding-bottom:12px}',
    '.pfe .sr{flex:1 1 260px;position:relative}.pfe .sr input{width:100%;font:500 16px Poppins,sans-serif;color:var(--ink);padding:11px 16px;border:1px solid #c8c3b8;border-radius:99px;background:#fff}',
    '.pfe .tags{display:flex;flex-wrap:wrap;gap:8px}.pfe .tags button{font:500 14px Poppins;border:1px solid #c8c3b8;background:#fff;color:var(--ink);border-radius:99px;padding:8px 16px;cursor:pointer}.pfe .tags button[aria-pressed=true]{background:var(--navy);color:#fff;border-color:var(--navy)}',
    '.pfe .cnt{font:500 14px Poppins;color:var(--mute);margin-left:auto}',
    '.pfe section{padding:34px 0 60px}',
    '.pfe .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}',
    '.pfe .card{display:flex;flex-direction:column;text-align:left;border:1px solid var(--line);border-radius:18px;background:#fff;padding:0;overflow:hidden;cursor:pointer;font:inherit;color:inherit;transition:transform .18s,box-shadow .18s,border-color .18s}',
    '.pfe .card:hover{transform:translateY(-4px);box-shadow:0 14px 34px rgba(0,50,45,.15);border-color:var(--teal)}',
    '.pfe .card .ph{aspect-ratio:1/1;background:#cfd8d6;overflow:hidden}.pfe .card img{width:100%;height:100%;object-fit:cover;object-position:50% 25%;display:block;transition:transform .35s}.pfe .card:hover img{transform:scale(1.05)}',
    '.pfe .card .bd{padding:14px 16px 18px;display:flex;flex-direction:column;flex:1}.pfe .card h3{font-size:21px!important;color:var(--navy)!important;margin:0 0 4px!important}',
    '.pfe .tg{align-self:flex-start;background:var(--soft);color:var(--teal2);font:600 11.5px Poppins;letter-spacing:.06em;text-transform:uppercase;padding:3px 10px;border-radius:99px;margin-bottom:8px}',
    '.pfe .card p{font-size:14px;color:var(--mute);margin:0 0 10px}.pfe .card .go{font:600 14px Poppins;color:var(--or);margin-top:auto}',
    '.pfe .none{text-align:center;color:var(--mute);padding:40px 0}',
    '.pfe .full{display:none}',
    '.pfe .cta{background:var(--teal);color:#fff;text-align:center;padding:54px 0}.pfe .cta h2{color:#fff!important;font-size:clamp(26px,3.4vw,34px)!important}.pfe .cta p{max-width:620px;margin:0 auto 22px;font-size:17px}',
    '.pfe .md{display:none;position:fixed;inset:0;z-index:99999;background:rgba(8,30,35,.78);align-items:center;justify-content:center;padding:16px}.pfe .md.on{display:flex}',
    '.pfe .box{position:relative;background:#fff;border-radius:22px;max-width:820px;width:100%;max-height:90vh;overflow:auto;display:grid;grid-template-columns:260px minmax(0,1fr);gap:26px;padding:28px}',
    '.pfe .box .ph{border-radius:16px;overflow:hidden;aspect-ratio:4/5;background:#cfd8d6;align-self:start}.pfe .box img{width:100%;height:100%;object-fit:cover;object-position:50% 25%;display:block}',
    '.pfe .box h3{font-size:34px!important;color:var(--navy)!important}.pfe .box p{font-size:15.5px;white-space:pre-line}.pfe .box .lk{display:flex;flex-wrap:wrap;gap:8px 14px;margin-top:6px}.pfe .box .lk a{color:var(--or)!important;font-weight:600;text-decoration:underline!important;word-break:break-all}',
    '.pfe .box .x{position:absolute;top:8px;right:10px;background:none;border:0;font-size:32px;line-height:1;cursor:pointer;color:var(--mute)}',
    '.pfe .nav{display:flex;gap:10px;margin-top:14px}.pfe .nav button{border:1px solid #c8c3b8;background:#fff;border-radius:99px;padding:7px 16px;font:500 13px Poppins;cursor:pointer}',
    '@media(max-width:1000px){.pfe .grid{grid-template-columns:repeat(3,minmax(0,1fr))}}',
    '@media(max-width:820px){.pfe .grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pfe .box{grid-template-columns:1fr}.pfe .box .ph{aspect-ratio:4/3}}',
    '@media(max-width:560px){.pfe .grid{gap:12px}.pfe .card h3{font-size:18px!important}.pfe .card .bd{padding:10px 12px 14px}.pfe .cnt{margin-left:0;flex-basis:100%}}'
  ].join('\n');

  function excerpt(b) {
    var m = b.replace(/\s+/g, ' ').match(/^(.*?[.!?])(\s|$)/), t = m ? m[1] : b;
    if (t.length < 90) { var m2 = b.replace(/\s+/g, ' ').match(/^(.*?[.!?]\s+.*?[.!?])(\s|$)/); if (m2) t = m2[1]; }
    return t.length > 170 ? t.slice(0, 167).replace(/\s+\S*$/, '') + '…' : t;
  }
  function card(p, i) {
    return '<button class="card" data-i="' + i + '" aria-haspopup="dialog"><div class="ph">' + (p.photo ? '<img src="' + esc(img(p.photo, 600)) + '" alt="' + esc(p.name) + '" loading="lazy">' : '') + '</div><div class="bd">' +
      (p.tag ? '<span class="tg">' + esc(p.tag) + '</span>' : '') + '<h3>' + esc(p.name) + '</h3><p>' + esc(excerpt(p.bio)) + '</p><span class="go">Read bio →</span></div><span class="full">' + esc(p.bio) + '</span></button>';
  }
  function tagsOf() { var t = []; list.forEach(function (p) { if (p.tag && t.indexOf(p.tag) < 0) t.push(p.tag); }); return t; }
  function match(p) {
    if (S.tag && p.tag !== S.tag) return false;
    if (!S.q) return true;
    var h = (p.name + ' ' + p.bio + ' ' + (p.tag || '')).toLowerCase();
    return S.q.toLowerCase().split(/\s+/).every(function (w) { return h.indexOf(w) > -1; });
  }
  function drawGrid() {
    var shown = [];
    var h = list.map(function (p, i) { if (!match(p)) return ''; shown.push(i); return card(p, i); }).join('');
    root.querySelector('.grid').innerHTML = h || '';
    root.querySelector('.none').hidden = !!h;
    root.querySelector('.cnt').textContent = shown.length === list.length ? list.length + ' speakers and musicians' : shown.length + ' of ' + list.length;
    root._shown = shown;
  }
  function build() {
    var tg = tagsOf();
    root.innerHTML = '<style>' + css + '</style><div class="pfe">' +
      '<header class="hero"><div class="w"><h1>' + esc(intro.title) + '</h1><p>' + esc(intro.text) + '</p></div></header>' +
      '<div class="bar"><div class="w"><label class="sr"><span style="position:absolute;left:-9999px">Search speakers</span><input type="search" id="pfe-q" placeholder="Search by name or topic" autocomplete="off"></label>' +
      (tg.length ? '<div class="tags" role="group" aria-label="Filter"><button data-tag="" aria-pressed="true">All</button>' + tg.map(function (t) { return '<button data-tag="' + esc(t) + '" aria-pressed="false">' + esc(t) + '</button>'; }).join('') + '</div>' : '') +
      '<span class="cnt" aria-live="polite"></span></div></div>' +
      '<section><div class="w"><div class="grid"></div><p class="none" hidden>No one matches that search. Try a shorter word.</p></div></section>' +
      '<div class="cta"><div class="w"><h2>Join us on the water</h2><p>Evening programs are part of our supported multi-day paddling trips.</p><a class="btn" href="' + CFG.trips + '" data-ev="see_trips">See our trips</a></div></div>' +
      '<div class="md" id="pfe-md" role="dialog" aria-modal="true" aria-labelledby="pfe-mt"><div class="box"><button class="x" aria-label="Close">×</button><div class="ph"></div><div><h3 id="pfe-mt"></h3><div class="bio"></div><div class="lk"></div><div class="nav"><button data-n="-1">← Previous</button><button data-n="1">Next →</button></div></div></div></div></div>';
    drawGrid();
  }
  var cur = -1, last = null;
  function open(i) {
    var p = list[i]; if (!p) return; cur = i;
    var md = root.querySelector('#pfe-md');
    md.querySelector('.ph').innerHTML = p.photo ? '<img src="' + esc(img(p.photo, 900)) + '" alt="' + esc(p.name) + '">' : '';
    md.querySelector('#pfe-mt').textContent = p.name;
    md.querySelector('.bio').innerHTML = (p.tag ? '<span class="tg">' + esc(p.tag) + '</span>' : '') + '<p>' + esc(p.bio) + '</p>';
    md.querySelector('.lk').innerHTML = (p.links || []).map(function (u) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(host(u)) + '</a>'; }).join('');
    md.classList.add('on'); md.querySelector('.x').focus();
    track('evening_bio', { speaker: p.name });
  }
  function close() { root.querySelector('#pfe-md').classList.remove('on'); if (last && last.focus) last.focus(); }
  function step(d) { var s = root._shown || [], k = s.indexOf(cur); if (k < 0) return; open(s[(k + d + s.length) % s.length]); }

  function setData(d) {
    if (!d || !d.speakers || !d.speakers.length) return false;
    list = d.speakers.filter(function (s) { return s.show !== false && s.name; }).sort(function (a, b) { return (a.pos || 0) - (b.pos || 0); });
    if (d.intro) intro = d.intro;
    return true;
  }
  setData(DATA); build();
  root.addEventListener('click', function (e) {
    var c = e.target.closest('.card'); if (c) { last = c; open(+c.dataset.i); return; }
    var t = e.target.closest('[data-tag]'); if (t) { S.tag = t.dataset.tag; [].forEach.call(root.querySelectorAll('[data-tag]'), function (b) { b.setAttribute('aria-pressed', b === t ? 'true' : 'false'); }); drawGrid(); return; }
    var n = e.target.closest('[data-n]'); if (n) { step(+n.dataset.n); return; }
    if (e.target.closest('.x') || e.target.id === 'pfe-md') { close(); return; }
    var ev = e.target.closest('[data-ev]'); if (ev) track(ev.dataset.ev);
  });
  root.addEventListener('input', function (e) { if (e.target.id === 'pfe-q') { S.q = e.target.value.trim(); drawGrid(); } });
  document.addEventListener('keydown', function (e) {
    if (!root.querySelector('#pfe-md.on')) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
  });
  // Live feed published from the dashboard; the embedded copy above stays if it is unreachable.
  try {
    var ctl = window.AbortController ? new AbortController() : null, to = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
    fetch(CFG.feed, { mode: 'cors', signal: ctl ? ctl.signal : undefined }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      clearTimeout(to);
      if (d && d.updated && setData(d)) { build(); }
    }).catch(function () {});
  } catch (e) {}
})();
