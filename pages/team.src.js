/* Paddle Florida "Our Team" page (Nov 2026 layout, warm version from Janice's Nov 16 mockup). Mount: <div id="pf-team"></div>
   Executive Leadership (wide card with a quote), Board of Directors, Our Waterway Champions (volunteers).
   Leader and board cards open a bio pop-up (Esc, arrow keys). People data is embedded from team/team.json (build.py).
   Photos: Squarespace CDN paths, absolute URLs, or "repo:team/photos/x.jpg" (served from this repo at the same commit).
   Optional "crop": [x, y, zoom] centres a face inside the circle (x and y are 0-1 fractions of the photo).
   Built by Ocoos Web Consulting. */
(function () {
  var root = document.getElementById('pf-team');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');
  var TEAM = /*TEAM*/{};
  var me = (document.currentScript && document.currentScript.src) || '';
  var BASE = /\/pages\/team\.js/.test(me) ? me.replace(/pages\/team\.js.*$/, '') : 'https://cdn.jsdelivr.net/gh/powerocoos/paddle-florida-site@main/';
  var CFG = { img: 'https://images.squarespace-cdn.com/content/v1/5e975a9523a346285e07042f/' };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var src = function (p, w) {
    if (/^repo:/.test(p)) return BASE + p.slice(5);
    return /^(https?:)?\/\//.test(p) || p.charAt(0) === '/' ? p : CFG.img + p + '?format=' + (w || 600) + 'w';
  };
  var P = TEAM.people || [], L = TEAM.layout || {}, TX = TEAM.text || {};
  var initials = function (n) { var w = String(n).replace(/\./g, '').split(/\s+/).filter(Boolean); return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase(); };

  var css = [
    '.pft{--ink:#16262b;--mute:#566a70;--soft:#f4f0e6;--cream:#fdfcf8;--line:#e1ddd0;--navy:#0e3b43;--gold:#f2b84b;--teal:#00887E;--teal2:#006f65;--mint:#e8f3ef;--mint2:#d6ece5;--mline:#cfe5dc;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.55;width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;background:var(--cream)}',
    '.pft *{box-sizing:border-box}.pft h1,.pft h2,.pft h3{font-family:Oswald,Poppins,sans-serif!important;text-transform:none!important;letter-spacing:.01em!important;line-height:1.15!important;margin:0!important}',
    '.pft .w{max-width:1160px;margin:0 auto;padding:0 20px}',
    '.pft .hero{position:relative;color:#fff;text-align:center;background:linear-gradient(135deg,var(--navy),var(--teal));padding:calc(var(--header-height,134px) * .5) 0 78px;overflow:hidden;isolation:isolate}',
    '.pft .hero:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:48px;z-index:-1;background:var(--cream);clip-path:ellipse(62% 100% at 50% 100%)}',
    '.pft .hero:before{content:"";position:absolute;inset:0;z-index:-1;opacity:.14;background:repeating-radial-gradient(circle at 15% 120%,transparent 0 26px,#fff 27px 28px)}',
    '.pft .hero h1{font-size:clamp(40px,6vw,64px)!important;color:#fff!important;font-weight:700!important}',
    '.pft .hero p{max-width:560px;margin:14px auto 0;font-size:clamp(17px,2vw,20px);line-height:1.55;color:rgba(255,255,255,.94)}',
    '.pft section{padding:44px 0 24px}.pft section+section{padding-top:32px}.pft section:last-child{padding-bottom:70px}',
    '.pft .hd{display:flex;align-items:center;gap:22px;margin:0 0 28px}.pft .hd:before,.pft .hd:after{content:"";flex:1;height:1px;background:#cfd2c8}',
    '.pft .hd h2{font-size:clamp(24px,3.2vw,34px)!important;color:var(--ink)!important;font-weight:700!important;text-transform:uppercase!important;letter-spacing:.1em!important;text-align:center}',
    '.pft .intro{text-align:center;color:var(--mute);font-size:17px;max-width:720px;margin:-12px auto 28px}',
    '.pft .row{display:flex;flex-wrap:wrap;justify-content:center;gap:20px}',
    '.pft .p{position:relative;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 6px 22px rgba(14,59,67,.08);text-align:center;padding:22px 16px 20px}',
    '.pft .ph{position:relative;border-radius:50%;overflow:hidden;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;font:600 28px Oswald,sans-serif;letter-spacing:.04em;background:var(--mint2);color:var(--teal2)}',
    '.pft .ph img{width:100%;height:100%;object-fit:cover;display:block}.pft .ph img.cr{position:absolute;max-width:none;object-fit:fill}',
    '.pft .p h3{font-size:21px!important;color:var(--ink)!important;font-weight:700!important;margin:0 0 3px!important}.pft .p .r{font:500 13.5px/1.35 Poppins,sans-serif;color:var(--teal2);margin:0}',
    '.pft .exec .p{display:grid;grid-template-columns:auto minmax(0,1fr);gap:44px;align-items:center;width:100%;background:var(--soft);border:0;box-shadow:none;text-align:left;padding:40px 56px;border-radius:22px}',
    '.pft .exec .ph{width:250px;height:250px;margin:0;border:6px solid #fff;box-shadow:0 8px 26px rgba(14,59,67,.14)}',
    '.pft .exec h3{font-size:clamp(34px,4vw,46px)!important}.pft .exec .r{font-size:17px;margin:2px 0 14px}',
    '.pft .exec .q{font-size:clamp(17px,1.9vw,20px);line-height:1.6;color:var(--mute);margin:0;max-width:640px}',
    '.pft .exec .go{display:inline-flex;align-items:center;gap:10px;margin-top:16px}',
    '.pft .arrow{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:#fff;border:1px solid var(--line);box-shadow:0 3px 10px rgba(14,59,67,.12);font-size:18px;color:var(--ink)}',
    '.pft .brd .p{flex:0 0 calc(25% - 15px)}.pft .brd .ph{width:132px;height:132px;background:linear-gradient(135deg,var(--teal),var(--navy));color:#fff}',
    '.pft section.vol{background:var(--mint);margin-top:36px;padding:52px 0 70px}',
    '.pft .vol .row{gap:16px}.pft .vol .p{flex:0 0 calc(20% - 13px);min-width:150px;padding:18px 10px 16px;border-radius:16px;border-color:var(--mline);box-shadow:none}',
    '.pft .vol .ph{width:112px;height:112px;font:500 26px Poppins,sans-serif;margin-bottom:12px}.pft .vol h3{font-size:21px!important;margin:0!important}',
    'button.p{font:inherit;color:inherit;cursor:pointer;transition:transform .15s,box-shadow .15s}button.p:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(14,59,67,.16)}.pft .exec button.p:hover{box-shadow:0 10px 30px rgba(14,59,67,.12)}button.p:focus-visible{outline:3px solid var(--gold);outline-offset:3px}',
    '.pft .go{display:inline-block;margin-top:8px;font:600 13px Poppins,sans-serif;color:#d9622b}',
    '.pft .md{display:none;position:fixed;inset:0;z-index:99999;background:rgba(8,30,35,.78);align-items:center;justify-content:center;padding:16px}.pft .md.on{display:flex}',
    '.pft .box{position:relative;background:#fff;border-radius:22px;max-width:820px;width:100%;max-height:90vh;overflow:auto;display:grid;grid-template-columns:260px minmax(0,1fr);gap:26px;padding:28px;text-align:left}',
    '.pft .box .bp{border-radius:16px;overflow:hidden;aspect-ratio:4/5;background:linear-gradient(135deg,var(--teal),var(--navy));align-self:start}.pft .box .bp img{width:100%;height:100%;object-fit:cover;display:block}',
    '.pft .box .role{display:inline-block;background:var(--teal);color:#fff;font:600 12px Poppins;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:99px;margin-bottom:12px}',
    '.pft .box h3{font-size:34px!important;color:var(--navy)!important;margin:0 0 .4em!important}.pft .box p{font-size:15.5px;white-space:pre-line;margin:0 0 1em}',
    '.pft .box .x{position:absolute;top:8px;right:10px;background:none;border:0;font-size:32px;line-height:1;cursor:pointer;color:var(--mute)}',
    '.pft .nav{display:flex;gap:10px;margin-top:14px}.pft .nav button{border:1px solid #c8c3b8;background:#fff;border-radius:99px;padding:7px 16px;font:500 13px Poppins;cursor:pointer;color:var(--ink)}',
    '@media(max-width:980px){.pft .vol .p{flex:0 0 calc(25% - 12px)}}',
    '@media(max-width:900px){.pft .brd .p{flex:0 0 calc(50% - 10px)}.pft .box{grid-template-columns:1fr}.pft .box .bp{aspect-ratio:4/3}.pft .exec .p{grid-template-columns:1fr;justify-items:center;text-align:center;gap:22px;padding:30px 22px}.pft .exec .ph{width:200px;height:200px}.pft .exec .q{margin:0 auto}}',
    '@media(max-width:720px){.pft .vol .p{flex:0 0 calc(33.333% - 11px)}}',
    '@media(max-width:560px){.pft .row{gap:12px}.pft .brd .p{padding:16px 10px}.pft .brd .ph{width:104px;height:104px}.pft .brd h3{font-size:18px!important}.pft .vol .row{gap:10px}.pft .vol .p{flex:0 0 calc(50% - 5px);min-width:0}.pft .vol .ph{width:92px;height:92px}.pft .vol h3{font-size:18px!important}}'
  ].join('\n');

  function ph(p, cls) {
    var img = '';
    if (p.photo) {
      var c = p.crop;
      img = '<img src="' + esc(src(p.photo, c ? 1200 : (cls === 'v' ? 300 : 600))) + '" alt="' + esc(p.name) + '" loading="lazy"' + (c ? ' class="cr" data-crop="' + esc(c.join(',')) + '" style="opacity:0"' : ' style="object-position:' + esc(p.pos || '50% 25%') + '"') + '>';
    }
    return '<div class="ph">' + (img || '<span aria-hidden="true">' + esc(initials(p.name)) + '</span>') + '</div>';
  }
  /* centre the face (x, y fractions of the photo) and zoom inside the round frame */
  function fit(img) {
    var c = (img.getAttribute('data-crop') || '').split(',').map(Number), ar = img.naturalWidth / img.naturalHeight;
    if (!ar || c.length < 3) { img.className = ''; img.style.opacity = 1; return; }
    var z = Math.max(1, c[2]), w = (ar >= 1 ? z * ar : z) * 100, h = (ar >= 1 ? z : z / ar) * 100;
    var l = Math.min(0, Math.max(100 - w, 50 - c[0] * w)), t = Math.min(0, Math.max(100 - h, 50 - c[1] * h));
    img.style.cssText = 'width:' + w + '%;height:' + h + '%;left:' + l + '%;top:' + t + '%;opacity:1';
  }
  function card(p, cls) {
    var inner = ph(p, cls) + '<div class="tx"><h3>' + esc(p.name) + '</h3>' + (p.role ? '<p class="r">' + esc(p.role) + '</p>' : '');
    if (cls === 'x') inner += (p.quote ? '<p class="q">' + esc(p.quote) + '</p>' : '') + (p.bio ? '<span class="go"><span class="arrow" aria-hidden="true">↓</span>Read more about ' + esc(String(p.name).split(' ')[0]) + '</span>' : '');
    inner += '</div>';
    if (p.bio && p.id && cls !== 'v') return '<button type="button" class="p" data-id="' + esc(p.id) + '" aria-haspopup="dialog" aria-label="Read ' + esc(p.name) + '’s bio">' + inner + (cls === 'x' ? '' : '<span class="go">Read bio →</span>') + '</button>';
    return '<div class="p">' + inner + '</div>';
  }
  function sec(cls, title, body, intro) { return '<section class="' + cls + '"><div class="w"><div class="hd"><h2>' + esc(title) + '</h2></div>' + (intro ? '<p class="intro">' + esc(intro) + '</p>' : '') + '<div class="row">' + body + '</div></div></section>'; }
  function build() {
    var exec = P.filter(function (p) { return p.feature; }), board = P.filter(function (p) { return p.group === 'board'; }), staff = P.filter(function (p) { return p.group === 'staff' && !p.feature; });
    var vols = (TEAM.volunteers || []).slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }); });
    root.innerHTML = '<style>' + css + '</style><div class="pft"><header class="hero"><div class="w"><h1>Our Team</h1>' + (TX.heroSub ? '<p>' + esc(TX.heroSub) + '</p>' : '') + '</div></header>' +
      (exec.length ? sec('exec', 'Executive Leadership', exec.map(function (p) { return card(p, 'x'); }).join('')) : '') +
      (L.staff && staff.length ? sec('brd', 'Staff', staff.map(function (p) { return card(p); }).join('')) : '') +
      (board.length ? sec('brd', 'Board of Directors', board.map(function (p) { return card(p); }).join('')) : '') +
      (L.exofficio && (TEAM.exofficio || []).length ? sec('vol', 'Ex-officio', TEAM.exofficio.map(function (n) { return card({ name: n }, 'v'); }).join('')) : '') +
      (vols.length ? sec('vol', TX.volTitle || 'Our Volunteers', vols.map(function (p) { return card(p, 'v'); }).join(''), TX.volIntro) : '') +
      '<div class="md" id="pft-md" role="dialog" aria-modal="true" aria-label="Team member bio"><div class="box"></div></div></div>';
    [].forEach.call(root.querySelectorAll('img.cr'), function (im) { if (im.complete && im.naturalWidth) fit(im); else { im.onload = function () { fit(im); }; im.onerror = function () { im.style.opacity = 1; }; } });
    wire();
  }
  function track(n, d) { try { if (window.gtag) gtag('event', n, d || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: n }, d || {})); } catch (e) {} }
  function wire() {
    var md = root.querySelector('#pft-md'), box = md.querySelector('.box'), cur = -1, opener = null;
    var holder = document.createElement('div'); holder.className = 'pft'; holder.style.cssText = 'width:0;height:0;margin:0;overflow:visible;background:none'; holder.appendChild(md); document.body.appendChild(holder);
    var list = [].map.call(root.querySelectorAll('button.p[data-id]'), function (b) { var id = b.getAttribute('data-id'); return P.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean);
    if (!list.length) return;
    function show(i) {
      cur = (i + list.length) % list.length; var p = list[cur], bp = p.bioPhoto || p.photo;
      box.innerHTML = '<button class="x" aria-label="Close">×</button><div class="bp">' + (bp ? '<img src="' + esc(src(bp, 900)) + '" alt="' + esc(p.name) + '" style="object-position:' + esc(p.bioPos || p.pos || '50% 20%') + '">' : '') + '</div><div>' + (p.role ? '<span class="role">' + esc(p.role) + '</span>' : '') + '<h3>' + esc(p.name) + '</h3><p>' + esc(p.bio) + '</p>' + (list.length > 1 ? '<div class="nav"><button data-d="-1">← Previous</button><button data-d="1">Next →</button></div>' : '') + '</div>';
      md.classList.add('on'); document.documentElement.style.overflow = 'hidden'; box.querySelector('.x').focus(); track('team_bio', { person: p.id });
    }
    function hide() { md.classList.remove('on'); document.documentElement.style.overflow = ''; if (opener) opener.focus(); }
    [].forEach.call(root.querySelectorAll('button.p[data-id]'), function (b) { b.onclick = function () { opener = b; var id = b.getAttribute('data-id'); for (var i = 0; i < list.length; i++) if (list[i].id === id) show(i); }; });
    md.onclick = function (e) { if (e.target === md || e.target.className === 'x') return hide(); var d = e.target.getAttribute && e.target.getAttribute('data-d'); if (d) show(cur + Number(d)); };
    document.addEventListener('keydown', function (e) { if (!md.classList.contains('on')) return; if (e.key === 'Escape') hide(); if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
  }
  if (!P.length) { root.innerHTML = '<p>Team information is not available right now.</p>'; return; }
  if (!document.getElementById('pf-fonts')) { var l = document.createElement('link'); l.id = 'pf-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap'; document.head.appendChild(l); }
  build();
})();
