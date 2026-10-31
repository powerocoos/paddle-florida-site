/* Paddle Florida "Blog" page. Mount: <div id="pf-blog"></div>
   Posts are read live from the Squarespace blog (same origin, ?format=json), so new posts appear by themselves.
   Nothing personal is stored here. Built by Ocoos Web Consulting. */
(function () {
  var root = document.getElementById('pf-blog');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');
  var CFG = {
    src: '/paddler-profiles?format=json',   // the blog collection (same site)
    blog: '/paddler-profiles',               // plain list, used as the fallback link
    news: '/home-v2#pf-news',                // newsletter section (repoint to /#pf-news at go-live)
    trips: '/#trips',
    title: 'The Paddle Florida Blog',
    intro: 'Trip reports, river stories and conservation news from the paddlers, guides and writers who love Florida’s waterways.'
  };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var track = function (n, x) { try { if (window.gtag) gtag('event', n, x || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: n }, x || {})); } catch (e) {} };
  var img = function (u, w) { return /squarespace-cdn\.com/.test(u) ? u + (u.indexOf('?') < 0 ? '?format=' + (w || 750) + 'w' : '') : u; };
  var plain = function (h) { var t = document.createElement('textarea'); t.innerHTML = String(h || '').replace(/<[^>]*>/g, ' '); return t.value.replace(/\s+/g, ' ').trim(); };
  var S = { q: '', year: '' };
  var posts = [];

  var css = [
    '.pfb{--ink:#16262b;--mute:#566a70;--soft:#f4f0e6;--line:#e1ddd0;--or:#d9622b;--or2:#b94c1a;--navy:#0e3b43;--gold:#f2b84b;--teal:#00887E;--teal2:#006f65;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.55;width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;background:#fff;text-align:left}',
    '.pfb *{box-sizing:border-box}.pfb h1,.pfb h2,.pfb h3{font-family:Oswald,Poppins,sans-serif!important;text-transform:none!important;letter-spacing:.01em!important;line-height:1.15!important;margin:0 0 .45em!important;font-weight:600!important}',
    '.pfb a{text-decoration:none!important}',
    '.pfb .w{max-width:1160px;margin:0 auto;padding:0 20px}',
    '.pfb .btn{display:inline-block;background:var(--or);color:#fff!important;font:600 15px/1.25 Poppins,sans-serif;text-align:center;border:0;border-radius:10px;padding:13px 24px;cursor:pointer;transition:background .15s,transform .15s}.pfb .btn:hover{background:var(--or2);transform:translateY(-1px)}',
    '.pfb .btn.alt{background:transparent;border:2px solid #fff;padding:11px 22px}.pfb .btn.alt:hover{background:rgba(255,255,255,.14)}',
    '.pfb :focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '.pfb .hero{position:relative;color:#fff;text-align:center;background:linear-gradient(135deg,var(--navy),var(--teal));padding:calc(var(--header-height,134px) * .55) 0 74px;overflow:hidden;isolation:isolate}',
    '.pfb .hero:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:46px;z-index:-1;background:#fff;clip-path:ellipse(60% 100% at 50% 100%)}',
    '.pfb .hero:before{content:"";position:absolute;inset:0;z-index:-1;opacity:.14;background:repeating-radial-gradient(circle at 85% 120%,transparent 0 26px,#fff 27px 28px)}',
    '.pfb .hero h1{font-size:clamp(34px,5.4vw,56px)!important;color:#fff!important}.pfb .hero p{font-size:18px;max-width:700px;margin:0 auto}',
    '.pfb .ft{padding:6px 0 30px}',
    '.pfb .fc{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:0;border:1px solid var(--line);border-radius:22px;overflow:hidden;background:#fff;box-shadow:0 12px 36px rgba(0,50,45,.10);color:inherit!important;transition:box-shadow .2s,transform .2s}',
    '.pfb .fc:hover{box-shadow:0 18px 44px rgba(0,50,45,.18);transform:translateY(-3px)}',
    '.pfb .fc .ph{min-height:340px;background:#cfd8d6;overflow:hidden}.pfb .fc .ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s}.pfb .fc:hover .ph img{transform:scale(1.04)}',
    '.pfb .fc.sm{grid-template-columns:280px minmax(0,1fr)}.pfb .fc.sm .ph{min-height:0;aspect-ratio:1/1;align-self:center;margin:28px 0 28px 28px;border-radius:16px}',
    '.pfb .fc .tx{padding:34px 36px;display:flex;flex-direction:column;justify-content:center;gap:2px}',
    '.pfb .fc h2{font-size:clamp(26px,3.2vw,38px)!important;color:var(--navy)!important}',
    '.pfb .fc p{font-size:16px;color:var(--mute);margin:0 0 16px}',
    '.pfb .lb{align-self:flex-start;background:var(--gold);color:var(--navy);font:700 11.5px Poppins;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:99px;margin-bottom:14px}',
    '.pfb .meta{font:500 13px Poppins;color:var(--mute);margin:0 0 8px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:2px 12px}',
    '.pfb .go{font:600 15px Poppins;color:var(--or)}',
    '.pfb .bar{position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--line);border-top:1px solid var(--line)}.pfb .bar .w{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;padding-top:12px;padding-bottom:12px}',
    '.pfb .sr{flex:1 1 260px;position:relative}.pfb .sr input{width:100%;font:500 16px Poppins,sans-serif;color:var(--ink);padding:11px 16px;border:1px solid #c8c3b8;border-radius:99px;background:#fff}',
    '.pfb .tags{display:flex;flex-wrap:wrap;gap:8px}.pfb .tags button{font:500 14px Poppins;border:1px solid #c8c3b8;background:#fff;color:var(--ink);border-radius:99px;padding:8px 16px;cursor:pointer}.pfb .tags button[aria-pressed=true]{background:var(--teal);border-color:var(--teal);color:#fff}',
    '.pfb .cnt{font:500 14px Poppins;color:var(--mute);margin-left:auto}',
    '.pfb section.gr{padding:34px 0 60px}',
    '.pfb .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}',
    '.pfb .card{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:18px;background:#fff;overflow:hidden;color:inherit!important;transition:transform .2s,box-shadow .2s,border-color .2s}',
    '.pfb .card:hover{transform:translateY(-4px);box-shadow:0 14px 34px rgba(0,50,45,.15);border-color:var(--teal)}',
    '.pfb .card .ph{aspect-ratio:16/10;background:#cfd8d6;overflow:hidden}.pfb .card .ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}.pfb .card:hover .ph img{transform:scale(1.05)}',
    '.pfb .noimg{width:100%;height:100%;background:linear-gradient(135deg,var(--teal),var(--navy));position:relative}.pfb .noimg:after{content:"";position:absolute;inset:0;opacity:.2;background:repeating-radial-gradient(circle at 20% 130%,transparent 0 18px,#fff 19px 20px)}',
    '.pfb .card .bd{padding:16px 18px 20px;display:flex;flex-direction:column;flex:1}.pfb .card h3{font-size:22px!important;color:var(--navy)!important;margin:0 0 8px!important}',
    '.pfb .card p{font-size:14.5px;color:var(--mute);margin:0 0 12px}.pfb .card .go{margin-top:auto;font-size:14px}',
    '.pfb .none,.pfb .err{text-align:center;color:var(--mute);padding:40px 0}',
    '.pfb .cta{background:var(--teal);color:#fff;text-align:center;padding:56px 0}.pfb .cta h2{color:#fff!important;font-size:clamp(26px,3.4vw,34px)!important}.pfb .cta p{max-width:620px;margin:0 auto 22px;font-size:17px}.pfb .cta .btn+.btn{margin-left:10px}',
    '@media(max-width:1000px){.pfb .fc.sm{grid-template-columns:1fr}.pfb .fc.sm .ph{width:200px;margin:24px auto 0}.pfb .grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pfb .fc{grid-template-columns:1fr}.pfb .fc .ph{min-height:0;aspect-ratio:16/9}.pfb .fc .tx{padding:24px 22px 28px}}',
    '@media(max-width:620px){.pfb .grid{grid-template-columns:1fr;gap:16px}.pfb .cnt{margin-left:0;flex-basis:100%}.pfb .cta .btn{display:block;margin:0 auto 10px;max-width:320px}.pfb .cta .btn+.btn{margin-left:auto}}',
    '@media(prefers-reduced-motion:reduce){.pfb *{transition:none!important}}'
  ].join('\n');

  function parse(it) {
    var doc = null; try { doc = new DOMParser().parseFromString(it.body || '', 'text/html'); } catch (e) {}
    var text = doc ? plain(doc.body.innerHTML) : plain(it.body);
    var ex = plain(it.excerpt);
    if (!ex && doc) {
      var ps = [].slice.call(doc.querySelectorAll('p'));
      for (var i = 0; i < ps.length; i++) {
        var t = plain(ps[i].innerHTML);
        if (t.length >= 70 && !/^by\s/i.test(t)) { ex = t; break; }
      }
    }
    if (!ex) ex = text;
    if (ex.length > 190) ex = ex.slice(0, 187).replace(/\s+\S*$/, '') + '…';
    var d = new Date(it.publishOn || it.addedOn);
    return {
      title: plain(it.title) || 'Untitled',
      url: it.fullUrl || CFG.blog,
      photo: it.assetUrl || '',
      ts: d.getTime(),
      year: d.getFullYear(),
      date: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' }),
      mins: Math.max(1, Math.round(text.split(/\s+/).length / 220)),
      ex: ex,
      hay: (plain(it.title) + ' ' + text).toLowerCase()
    };
  }
  function metaLine(p) {
    return '<div class="meta"><span>' + esc(p.date) + '</span><span>' + p.mins + ' min read</span></div>';
  }
  function photo(p, w, eager) { return p.photo ? '<img src="' + esc(img(p.photo, w)) + '" alt="" loading="' + (eager ? 'eager' : 'lazy') + '">' : '<div class="noimg"></div>'; }
  function card(p, i) {
    return '<a class="card" href="' + esc(p.url) + '" data-post="' + i + '"><div class="ph">' + photo(p, 750) + '</div><div class="bd">' + metaLine(p) + '<h3>' + esc(p.title) + '</h3><p>' + esc(p.ex) + '</p><span class="go">Read the story →</span></div></a>';
  }
  function match(p) {
    if (S.year && String(p.year) !== S.year) return false;
    if (!S.q) return true;
    return S.q.toLowerCase().split(/\s+/).every(function (w) { return p.hay.indexOf(w) > -1; });
  }
  function drawGrid() {
    var rest = posts.slice(1), shown = [], h = '';
    rest.forEach(function (p, k) {
      if (!match(p)) return;
      shown.push(p);
      h += card(p, k + 1);
    });
    root.querySelector('.grid').innerHTML = h;
    root.querySelector('.none').hidden = !!h;
    var filtering = S.q || S.year;
    root.querySelector('.ft').hidden = !!filtering;
    root.querySelector('.cnt').textContent = filtering ? shown.length + ' of ' + rest.length + ' stories' : posts.length + ' stories';
  }
  function build() {
    var years = [];
    posts.slice(1).forEach(function (p) { if (years.indexOf(p.year) < 0) years.push(p.year); });
    var f = posts[0];
    root.innerHTML = '<style>' + css + '</style><div class="pfb">' +
      '<header class="hero"><div class="w"><h1>' + esc(CFG.title) + '</h1><p>' + esc(CFG.intro) + '</p></div></header>' +
      '<div class="ft"><div class="w"><a class="fc" href="' + esc(f.url) + '" data-post="0"><div class="ph">' + photo(f, 1000, true) + '</div><div class="tx"><span class="lb">Latest story</span>' + metaLine(f) + '<h2>' + esc(f.title) + '</h2><p>' + esc(f.ex) + '</p><span class="go">Read the story →</span></div></a></div></div>' +
      '<div class="bar"><div class="w"><label class="sr"><span style="position:absolute;left:-9999px">Search stories</span><input type="search" id="pfb-q" placeholder="Search stories, rivers and writers" autocomplete="off"></label>' +
      (years.length > 1 ? '<div class="tags" role="group" aria-label="Filter by year"><button data-year="" aria-pressed="true">All years</button>' + years.map(function (y) { return '<button data-year="' + y + '" aria-pressed="false">' + y + '</button>'; }).join('') + '</div>' : '') +
      '<span class="cnt" aria-live="polite"></span></div></div>' +
      '<section class="gr"><div class="w"><div class="grid"></div><p class="none" hidden>No stories match that search. Try a shorter word.</p></div></section>' +
      '<div class="cta"><div class="w"><h2>Get stories and trip news first</h2><p>Join the newsletter to hear when registration opens and when new stories are posted.</p><a class="btn" href="' + CFG.news + '" data-ev="blog_news">Get trip updates</a><a class="btn alt" href="' + CFG.trips + '" data-ev="blog_trips">See our trips</a></div></div>' +
      '</div>';
    drawGrid();
    var im = root.querySelector('.fc img'), fc = root.querySelector('.fc');
    if (im) { var chk = function () { if (im.naturalWidth && im.naturalWidth < 700) fc.classList.add('sm'); }; if (im.complete) chk(); else im.addEventListener('load', chk); }
  }
  function fail() {
    root.innerHTML = '<div class="pfb"><div class="w"><p class="err">We could not load the stories just now. <a href="' + CFG.blog + '" style="color:#d9622b">Open the full blog</a>.</p></div></div>';
  }
  // Read the blog, following Squarespace's offset paging when there are many posts.
  function load(url, acc, n) {
    return fetch(url, { credentials: 'same-origin' }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (j) {
      var items = (j.items || []).filter(function (i) { return i && i.title; });
      acc = acc.concat(items);
      if (items.length >= 20 && n < 6) {
        var last = items[items.length - 1];
        return load(CFG.src + '&offset=' + (last.publishOn || last.addedOn), acc, n + 1);
      }
      return acc;
    });
  }
  load(CFG.src, [], 0).then(function (items) {
    posts = items.map(parse).sort(function (a, b) { return b.ts - a.ts; });
    if (!posts.length) throw 0;
    build();
  }).catch(fail);

  root.addEventListener('click', function (e) {
    var t = e.target.closest('[data-year]');
    if (t) { S.year = t.dataset.year; [].forEach.call(root.querySelectorAll('[data-year]'), function (b) { b.setAttribute('aria-pressed', b === t ? 'true' : 'false'); }); drawGrid(); return; }
    var c = e.target.closest('[data-post]'); if (c) { track('blog_open', { post: (posts[+c.dataset.post] || {}).title }); return; }
    var ev = e.target.closest('[data-ev]'); if (ev) track(ev.dataset.ev);
  });
  root.addEventListener('input', function (e) { if (e.target.id === 'pfb-q') { S.q = e.target.value.trim(); drawGrid(); } });
})();
