/* Paddle Florida "Our Team" page. Mount: <div id="pf-team"></div>
   People data is embedded from team/team.json (build.py). Built by Ocoos Web Consulting. */
(function () {
  var root = document.getElementById('pf-team');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');
  var TEAM = /*TEAM*/{};
  var CFG = { img: 'https://images.squarespace-cdn.com/content/v1/5e975a9523a346285e07042f/', volunteer: '/volunteers', contact: '/contact-us' };
  var im = function (p, w) { return CFG.img + p + '?format=' + (w || 800) + 'w'; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var track = function (n, x) { try { if (window.gtag) gtag('event', n, x || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: n }, x || {})); } catch (e) {} };
  var P = TEAM.people || [];

  var css = [
    '.pft{--ink:#16262b;--mute:#566a70;--soft:#f4f0e6;--line:#e1ddd0;--or:#d9622b;--or2:#b94c1a;--navy:#0e3b43;--gold:#f2b84b;--teal:#00887E;--teal2:#006f65;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.6;width:100vw;margin-left:calc(50% - 50vw);overflow-x:clip;text-align:left;box-sizing:border-box}',
    '.pft *{box-sizing:border-box}.pft h1,.pft h2,.pft h3{font-family:Oswald,Poppins,sans-serif!important;text-transform:none!important;letter-spacing:.01em!important;line-height:1.15!important;margin:0 0 .45em!important;font-weight:600!important}.pft p{margin:0 0 1em}.pft a{text-decoration:none!important}',
    '.pft .w{max-width:1160px;margin:0 auto;padding:0 20px}',
    '.pft .btn{display:inline-block;background:var(--or);color:#fff!important;font:600 15px/1.25 Poppins,sans-serif;text-align:center;border:0;border-radius:10px;padding:13px 24px;cursor:pointer;transition:background .15s,transform .15s}.pft .btn:hover{background:var(--or2);transform:translateY(-1px)}.pft .btn.wh{background:#fff;color:var(--navy)!important}.pft .btn.wh:hover{background:var(--gold)}.pft .cta{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}',
    '.pft :focus-visible{outline:3px solid var(--gold);outline-offset:2px}',
    '.pft .hero{position:relative;color:#fff;text-align:center;background:linear-gradient(135deg,var(--navy),var(--teal));padding:calc(var(--header-height,134px) * .55) 0 70px;overflow:hidden;isolation:isolate}',
    '.pft .hero:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:46px;z-index:-1;background:#fff;clip-path:ellipse(60% 100% at 50% 100%)}',
    '.pft .hero:before{content:"";position:absolute;inset:0;z-index:-1;opacity:.14;background:repeating-radial-gradient(circle at 15% 120%,transparent 0 26px,#fff 27px 28px)}',
    '.pft .hero h1{font-size:clamp(34px,5.4vw,56px)!important;color:#fff!important}.pft .hero p{font-size:18px;max-width:680px;margin:0 auto}',
    '.pft .sub{position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--line)}.pft .sub .w{display:flex;gap:6px;justify-content:center;padding-top:8px;padding-bottom:8px}.pft .sub a{font:500 14px Poppins;color:var(--ink)!important;padding:8px 16px;border-radius:99px}.pft .sub a:hover{background:var(--soft)}',
    '.pft section{padding:54px 0}.pft .t{font-size:clamp(28px,3.6vw,36px)!important;color:var(--navy)!important;scroll-margin-top:70px}.pft .lead{color:var(--mute);max-width:640px}',
    '.pft .feat{display:grid;grid-template-columns:minmax(0,420px) minmax(0,1fr);gap:40px;align-items:center;background:var(--soft);border-radius:24px;padding:28px;margin-top:22px}',
    '.pft .feat .ph{border-radius:18px;overflow:hidden;aspect-ratio:4/5;background:#cfd8d6}.pft .feat img{width:100%;height:100%;object-fit:cover;display:block}',
    '.pft .role{display:inline-block;background:var(--teal);color:#fff;font:600 12px Poppins;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:99px;margin-bottom:12px}',
    '.pft .feat h3{font-size:clamp(30px,4vw,42px)!important;color:var(--navy)!important}.pft .feat p.q{font-size:19px;color:var(--ink)}',
    '.pft .more{background:none;border:0;padding:0;color:var(--or)!important;font:600 15px Poppins;cursor:pointer;text-decoration:underline!important}',
    '.pft .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:22px}',
    '.pft .card{display:flex;flex-direction:column;text-align:left;border:1px solid var(--line);border-radius:18px;background:#fff;padding:0;overflow:hidden;cursor:pointer;font:inherit;color:inherit;transition:transform .18s,box-shadow .18s,border-color .18s}',
    '.pft .card:hover{transform:translateY(-4px);box-shadow:0 14px 34px rgba(0,50,45,.15);border-color:var(--teal)}',
    '.pft .card .ph{aspect-ratio:1/1;background:#cfd8d6;overflow:hidden}.pft .card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}.pft .card:hover img{transform:scale(1.05)}',
    '.pft .card .bd{padding:14px 16px 18px}.pft .card h3{font-size:22px!important;color:var(--navy)!important;margin:0 0 2px!important}.pft .card .r{font:600 12.5px Poppins;letter-spacing:.05em;text-transform:uppercase;color:var(--teal2);margin-bottom:8px}.pft .card p{font-size:14px;color:var(--mute);margin:0 0 10px}.pft .card .go{font:600 14px Poppins;color:var(--or)}',
    '.pft .board{background:var(--soft)}.pft .board .card{border-color:transparent}',
    '.pft .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}.pft .chips span{background:#fff;border:1px solid var(--line);border-radius:99px;padding:8px 18px;font-weight:500}',
    '.pft .join{background:var(--teal);color:#fff;text-align:center}.pft .join h2{color:#fff!important}.pft .join p{max-width:620px;margin:0 auto 22px;font-size:17px}',
    '.pft .md{display:none;position:fixed;inset:0;z-index:99999;background:rgba(8,30,35,.78);align-items:center;justify-content:center;padding:16px}.pft .md.on{display:flex}',
    '.pft .box{position:relative;background:#fff;border-radius:22px;max-width:820px;width:100%;max-height:90vh;overflow:auto;display:grid;grid-template-columns:260px minmax(0,1fr);gap:26px;padding:28px}',
    '.pft .box .ph{border-radius:16px;overflow:hidden;aspect-ratio:4/5;background:#cfd8d6;align-self:start}.pft .box img{width:100%;height:100%;object-fit:cover;display:block}',
    '.pft .box h3{font-size:34px!important;color:var(--navy)!important}.pft .box p{font-size:15.5px}',
    '.pft .box .x{position:absolute;top:8px;right:10px;background:none;border:0;font-size:32px;line-height:1;cursor:pointer;color:var(--mute)}',
    '.pft .nav{display:flex;gap:10px;margin-top:14px}.pft .nav button{border:1px solid #c8c3b8;background:#fff;border-radius:99px;padding:7px 16px;font:500 13px Poppins;cursor:pointer}',
    '@media(max-width:980px){.pft .grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pft .feat{grid-template-columns:1fr}.pft .feat .ph{aspect-ratio:4/3}.pft .box{grid-template-columns:1fr}.pft .box .ph{aspect-ratio:4/3}}',
    '@media(max-width:560px){.pft .grid{gap:12px}.pft .card h3{font-size:19px!important}.pft .card .bd{padding:10px 12px 14px}.pft .cta .btn{flex:1 1 100%}.pft .sub .w{overflow-x:auto}.pft .feat{padding:16px}}'
  ].join('\n');

  function card(p) {
    return '<button class="card" data-id="' + esc(p.id) + '" aria-haspopup="dialog"><div class="ph"><img src="' + im(p.photo, 600) + '" alt="' + esc(p.name) + '" loading="lazy" style="object-position:' + esc(p.pos || '50% 20%') + '"></div><div class="bd"><h3>' + esc(p.name) + '</h3><div class="r">' + esc(p.role) + '</div><p>' + esc(p.line) + '</p><span class="go">Read bio →</span></div></button>';
  }
  function build() {
    var f = P.filter(function (p) { return p.feature; })[0], staff = P.filter(function (p) { return p.group === 'staff' && !p.feature; }), board = P.filter(function (p) { return p.group === 'board'; });
    var short = function (b) { var m = b.match(/^(.*?[.!?])\s+(.*?[.!?])(\s|$)/); return m ? m[1] + ' ' + m[2] : b; };
    root.innerHTML = '<style>' + css + '</style><div class="pft">' +
      '<header class="hero"><div class="w"><h1>' + esc(TEAM.intro.title) + '</h1><p>' + esc(TEAM.intro.text) + '</p></div></header>' +
      '<nav class="sub" aria-label="On this page"><div class="w"><a href="#pft-staff">Staff</a><a href="#pft-board">Board</a>' + ((TEAM.exofficio || []).length ? '<a href="#pft-ex">Ex-officio</a>' : '') + '<a href="#pft-join">Join us</a></div></nav>' +
      '<section id="pft-staff"><div class="w"><h2 class="t">Staff</h2><p class="lead">The team that runs the trips.</p>' +
      (f ? '<div class="feat"><div class="ph"><img src="' + im(f.photo, 900) + '" alt="' + esc(f.name) + '" style="object-position:' + esc(f.pos) + '"></div><div><span class="role">' + esc(f.role) + '</span><h3>' + esc(f.name) + '</h3><p class="q">' + esc(f.feat || short(f.bio)) + '</p><button class="more" data-id="' + esc(f.id) + '">Read the full bio</button></div></div>' : '') +
      '<div class="grid">' + staff.map(card).join('') + '</div></div></section>' +
      '<section class="board" id="pft-board"><div class="w"><h2 class="t">Board of Directors</h2><p class="lead">Volunteers who guide the mission and look after the nonprofit.</p><div class="grid">' + board.map(card).join('') + '</div></div></section>' +
      ((TEAM.exofficio || []).length ? '<section id="pft-ex"><div class="w"><h2 class="t">Ex-officio</h2><p class="lead">Ex-officio members of the board.</p><div class="chips">' + TEAM.exofficio.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('') + '</div></div></section>' : '') +
      '<section class="join" id="pft-join"><div class="w"><h2 class="t" style="color:#fff!important">Want to join the crew?</h2><p>Volunteers help keep Paddle Florida’s trips and mission going. Find out how you can get involved.</p><div class="cta"><a class="btn wh" href="' + CFG.volunteer + '" data-ev="team_volunteer">Volunteer with us</a><a class="btn" href="' + CFG.contact + '" data-ev="team_contact">Get in touch</a></div></div></section>' +
      '<div class="md" id="pft-md" role="dialog" aria-modal="true" aria-label="Team member bio"><div class="box"></div></div></div>';
    wire();
  }
  function wire() {
    var md = root.querySelector('#pft-md'), box = md.querySelector('.box'), cur = -1, opener = null;
    function show(i) {
      cur = (i + P.length) % P.length; var p = P[cur];
      box.innerHTML = '<button class="x" aria-label="Close">×</button><div class="ph"><img src="' + im(p.photo, 900) + '" alt="' + esc(p.name) + '" style="object-position:' + esc(p.pos || '50% 20%') + '"></div><div><span class="role">' + esc(p.role) + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(p.bio) + '</p><div class="nav"><button data-d="-1">← Previous</button><button data-d="1">Next →</button></div></div>';
      md.classList.add('on'); box.querySelector('.x').focus(); track('team_bio', { person: p.id });
    }
    function hide() { md.classList.remove('on'); if (opener) opener.focus(); }
    [].forEach.call(root.querySelectorAll('[data-id]'), function (b) { b.onclick = function () { opener = b; var id = b.getAttribute('data-id'); for (var i = 0; i < P.length; i++) if (P[i].id === id) show(i); }; });
    md.onclick = function (e) { if (e.target === md || e.target.className === 'x') hide(); var d = e.target.getAttribute && e.target.getAttribute('data-d'); if (d) show(cur + Number(d)); };
    document.addEventListener('keydown', function (e) { if (!md.classList.contains('on')) return; if (e.key === 'Escape') hide(); if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
    [].forEach.call(root.querySelectorAll('.sub a'), function (a) { a.onclick = function (e) { var t = root.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }; });
    root.addEventListener('click', function (e) { var a = e.target.closest('[data-ev]'); if (a) track(a.getAttribute('data-ev')); });
  }
  if (!P.length) { root.innerHTML = '<p>Team information is not available right now.</p>'; return; }
  if (!document.getElementById('pf-fonts')) { var l = document.createElement('link'); l.id = 'pf-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap'; document.head.appendChild(l); }
  build();
})();
