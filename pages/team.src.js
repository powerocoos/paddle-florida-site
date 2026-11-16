/* Paddle Florida "Our Team" page (Nov 2026 layout). Mount: <div id="pf-team"></div>
   Executive Leadership, Board of Directors, Volunteers. Leader and board cards open a bio pop-up (Esc, arrow keys); no sign-up buttons.
   People data is embedded from team/team.json (build.py). Built by Ocoos Web Consulting. */
(function () {
  var root = document.getElementById('pf-team');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');
  var TEAM = /*TEAM*/{};
  var CFG = { img: 'https://images.squarespace-cdn.com/content/v1/5e975a9523a346285e07042f/' };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var src = function (p, w) { return /^(https?:)?\/\//.test(p) || p.charAt(0) === '/' ? p : CFG.img + p + '?format=' + (w || 600) + 'w'; };
  var P = TEAM.people || [], L = TEAM.layout || {};
  var initials = function (n) { var w = String(n).replace(/\./g, '').split(/\s+/).filter(Boolean); return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase(); };

  var css = [
    '.pft{--ink:#16262b;--mute:#566a70;--soft:#f4f0e6;--line:#e1ddd0;--navy:#0e3b43;--gold:#f2b84b;--teal:#00887E;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.55;width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;background:#fff}',
    '.pft *{box-sizing:border-box}.pft h1,.pft h2,.pft h3{font-family:Oswald,Poppins,sans-serif!important;text-transform:none!important;letter-spacing:.01em!important;line-height:1.15!important;margin:0!important}',
    '.pft .w{max-width:1120px;margin:0 auto;padding:0 20px}',
    '.pft .hero{position:relative;color:#fff;text-align:center;background:linear-gradient(135deg,var(--navy),var(--teal));padding:calc(var(--header-height,134px) * .55) 0 64px;overflow:hidden;isolation:isolate}',
    '.pft .hero:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:44px;z-index:-1;background:#fff;clip-path:ellipse(60% 100% at 50% 100%)}',
    '.pft .hero:before{content:"";position:absolute;inset:0;z-index:-1;opacity:.14;background:repeating-radial-gradient(circle at 15% 120%,transparent 0 26px,#fff 27px 28px)}',
    '.pft .hero h1{font-size:clamp(36px,5.4vw,56px)!important;color:#fff!important}',
    '.pft section{padding:40px 0 20px}.pft section+section{padding-top:30px}.pft section:last-child{padding-bottom:64px}',
    '.pft .hd{display:flex;align-items:center;gap:18px;margin:0 0 26px}.pft .hd:before,.pft .hd:after{content:"";flex:1;height:1px;background:var(--line)}',
    '.pft .hd h2{font-size:clamp(22px,3vw,30px)!important;color:var(--navy)!important;text-transform:uppercase!important;letter-spacing:.08em!important;text-align:center}',
    '.pft .row{display:flex;flex-wrap:wrap;justify-content:center;gap:20px}',
    '.pft .p{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 6px 22px rgba(14,59,67,.09);text-align:center;padding:22px 16px 20px}',
    '.pft .ph{border-radius:50%;overflow:hidden;background:#cfd8d6;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;color:#fff;font:600 28px Oswald,sans-serif;letter-spacing:.04em;background:linear-gradient(135deg,var(--teal),var(--navy))}',
    '.pft .ph img{width:100%;height:100%;object-fit:cover;display:block}',
    '.pft .p h3{font-size:21px!important;color:var(--navy)!important;margin:0 0 3px!important}.pft .p .r{font:500 13.5px/1.35 Poppins,sans-serif;color:var(--mute);margin:0}',
    '.pft .exec .p{width:300px;padding:26px 20px 24px}.pft .exec .ph{width:150px;height:150px}.pft .exec h3{font-size:26px!important}',
    '.pft .brd .p{flex:0 0 calc(25% - 15px)}.pft .brd .ph{width:132px;height:132px}',
    '.pft .vol .p{flex:0 0 150px;padding:16px 10px 14px;border-radius:14px;box-shadow:0 3px 12px rgba(14,59,67,.07)}.pft .vol .ph{width:84px;height:84px;font-size:22px;margin-bottom:10px}.pft .vol h3{font-size:17px!important;margin:0!important}',
    'button.p{font:inherit;color:inherit;cursor:pointer;transition:transform .15s,box-shadow .15s}button.p:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(14,59,67,.16)}button.p:focus-visible{outline:3px solid var(--gold);outline-offset:3px}',
    '.pft .go{display:inline-block;margin-top:8px;font:600 13px Poppins,sans-serif;color:#d9622b}',
    '.pft .md{display:none;position:fixed;inset:0;z-index:99999;background:rgba(8,30,35,.78);align-items:center;justify-content:center;padding:16px}.pft .md.on{display:flex}',
    '.pft .box{position:relative;background:#fff;border-radius:22px;max-width:820px;width:100%;max-height:90vh;overflow:auto;display:grid;grid-template-columns:260px minmax(0,1fr);gap:26px;padding:28px;text-align:left}',
    '.pft .box .bp{border-radius:16px;overflow:hidden;aspect-ratio:4/5;background:linear-gradient(135deg,var(--teal),var(--navy));align-self:start}.pft .box .bp img{width:100%;height:100%;object-fit:cover;display:block}',
    '.pft .box .role{display:inline-block;background:var(--teal);color:#fff;font:600 12px Poppins;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:99px;margin-bottom:12px}',
    '.pft .box h3{font-size:34px!important;color:var(--navy)!important;margin:0 0 .4em!important}.pft .box p{font-size:15.5px;white-space:pre-line;margin:0 0 1em}',
    '.pft .box .x{position:absolute;top:8px;right:10px;background:none;border:0;font-size:32px;line-height:1;cursor:pointer;color:var(--mute)}',
    '.pft .nav{display:flex;gap:10px;margin-top:14px}.pft .nav button{border:1px solid #c8c3b8;background:#fff;border-radius:99px;padding:7px 16px;font:500 13px Poppins;cursor:pointer;color:var(--ink)}',
    '@media(max-width:900px){.pft .brd .p{flex:0 0 calc(50% - 10px)}.pft .box{grid-template-columns:1fr}.pft .box .bp{aspect-ratio:4/3}}',
    '@media(max-width:560px){.pft .row{gap:12px}.pft .exec .p{width:100%;max-width:300px}.pft .brd .p{padding:16px 10px}.pft .brd .ph{width:104px;height:104px}.pft .brd h3{font-size:18px!important}.pft .vol .p{flex:0 0 calc(50% - 6px)}}'
  ].join('\n');

  function ph(p, cls) {
    return '<div class="ph">' + (p.photo ? '<img src="' + esc(src(p.photo, cls === 'v' ? 300 : 500)) + '" alt="' + esc(p.name) + '" loading="lazy" style="object-position:' + esc(p.pos || '50% 25%') + '">' : '<span aria-hidden="true">' + esc(initials(p.name)) + '</span>') + '</div>';
  }
  function card(p, cls) {
    var inner = ph(p, cls) + '<h3>' + esc(p.name) + '</h3>' + (p.role ? '<p class="r">' + esc(p.role) + '</p>' : '');
    if (p.bio && p.id && cls !== 'v') return '<button type="button" class="p" data-id="' + esc(p.id) + '" aria-haspopup="dialog" aria-label="Read ' + esc(p.name) + '’s bio">' + inner + '<span class="go">Read bio →</span></button>';
    return '<div class="p">' + inner + '</div>';
  }
  function sec(cls, title, body) { return '<section class="' + cls + '"><div class="w"><div class="hd"><h2>' + esc(title) + '</h2></div><div class="row">' + body + '</div></div></section>'; }
  function build() {
    var exec = P.filter(function (p) { return p.feature; }), board = P.filter(function (p) { return p.group === 'board'; }), staff = P.filter(function (p) { return p.group === 'staff' && !p.feature; });
    var vols = (TEAM.volunteers || []).slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }); });
    root.innerHTML = '<style>' + css + '</style><div class="pft"><header class="hero"><div class="w"><h1>Our Team</h1></div></header>' +
      (exec.length ? sec('exec', 'Executive Leadership', exec.map(function (p) { return card(p); }).join('')) : '') +
      (L.staff && staff.length ? sec('brd', 'Staff', staff.map(function (p) { return card(p); }).join('')) : '') +
      (board.length ? sec('brd', 'Board of Directors', board.map(function (p) { return card(p); }).join('')) : '') +
      (L.exofficio && (TEAM.exofficio || []).length ? sec('vol', 'Ex-officio', TEAM.exofficio.map(function (n) { return card({ name: n }, 'v'); }).join('')) : '') +
      (vols.length ? sec('vol', 'Our Volunteers', vols.map(function (p) { return card(p, 'v'); }).join('')) : '') +
      '<div class="md" id="pft-md" role="dialog" aria-modal="true" aria-label="Team member bio"><div class="box"></div></div></div>';
    wire();
  }
  function track(n, d) { try { if (window.gtag) gtag('event', n, d || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: n }, d || {})); } catch (e) {} }
  function wire() {
    var md = root.querySelector('#pft-md'), box = md.querySelector('.box'), cur = -1, opener = null;
    var holder = document.createElement('div'); holder.className = 'pft'; holder.style.cssText = 'width:0;height:0;margin:0;overflow:visible;background:none'; holder.appendChild(md); document.body.appendChild(holder);
    var list = [].map.call(root.querySelectorAll('button.p[data-id]'), function (b) { var id = b.getAttribute('data-id'); return P.filter(function (p) { return p.id === id; })[0]; }).filter(Boolean);
    if (!list.length) return;
    function show(i) {
      cur = (i + list.length) % list.length; var p = list[cur];
      box.innerHTML = '<button class="x" aria-label="Close">×</button><div class="bp">' + (p.photo ? '<img src="' + esc(src(p.photo, 900)) + '" alt="' + esc(p.name) + '" style="object-position:' + esc(p.pos || '50% 20%') + '">' : '') + '</div><div>' + (p.role ? '<span class="role">' + esc(p.role) + '</span>' : '') + '<h3>' + esc(p.name) + '</h3><p>' + esc(p.bio) + '</p>' + (list.length > 1 ? '<div class="nav"><button data-d="-1">← Previous</button><button data-d="1">Next →</button></div>' : '') + '</div>';
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
