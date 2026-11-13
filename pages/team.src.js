/* Paddle Florida "Our Team" page (Nov 2026 layout). Mount: <div id="pf-team"></div>
   Executive Leadership, Board of Directors, Volunteers. Names and titles only: no bios, no sign-up buttons.
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
    '@media(max-width:900px){.pft .brd .p{flex:0 0 calc(50% - 10px)}}',
    '@media(max-width:560px){.pft .row{gap:12px}.pft .exec .p{width:100%;max-width:300px}.pft .brd .p{padding:16px 10px}.pft .brd .ph{width:104px;height:104px}.pft .brd h3{font-size:18px!important}.pft .vol .p{flex:0 0 calc(50% - 6px)}}'
  ].join('\n');

  function ph(p, cls) {
    return '<div class="ph">' + (p.photo ? '<img src="' + esc(src(p.photo, cls === 'v' ? 300 : 500)) + '" alt="' + esc(p.name) + '" loading="lazy" style="object-position:' + esc(p.pos || '50% 25%') + '">' : '<span aria-hidden="true">' + esc(initials(p.name)) + '</span>') + '</div>';
  }
  function card(p, cls) {
    return '<div class="p">' + ph(p, cls) + '<h3>' + esc(p.name) + '</h3>' + (p.role ? '<p class="r">' + esc(p.role) + '</p>' : '') + '</div>';
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
      (vols.length ? sec('vol', 'Our Volunteers', vols.map(function (p) { return card(p, 'v'); }).join('')) : '') + '</div>';
  }
  if (!P.length) { root.innerHTML = '<p>Team information is not available right now.</p>'; return; }
  if (!document.getElementById('pf-fonts')) { var l = document.createElement('link'); l.id = 'pf-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap'; document.head.appendChild(l); }
  build();
})();
