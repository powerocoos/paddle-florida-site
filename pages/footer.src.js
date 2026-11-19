/* Paddle Florida site footer (Nov 2026, matches the new Home and Team pages). Mount: <div id="pf-footer"></div> in the site footer's Code block.
   Navy band with a trip-updates call to action, three link columns, contact details and social icons.
   All links are plain relative paths, so nothing needs to be built in. Built by Ocoos Web Consulting. */
(function () {
  var root = document.getElementById('pf-footer');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');
  var LOGO = 'https://images.squarespace-cdn.com/content/v1/5e975a9523a346285e07042f/099b3605-9a70-43d8-8586-d5a02ffea7de/pf-logo-est2007.jpg?format=500w';
  var FB = 'https://www.facebook.com/paddleflorida/', YT = 'https://www.youtube.com/channel/UCldPSyoslpjWIXkPWDyjIKA';
  var COLS = [
    ['Plan your trip', [['Trips and registration', '/home#TripPreview'], ['Evening programs', '/evening-programs'], ['Frequently asked questions', '/frequently-asked-questions'], ['Useful links', '/useful-links-and-information'], ['Post-trip survey', '/post-trip-survey']]],
    ['About us', [['Our team', '/our-team'], ['Recognitions', '/recognitions'], ['History', '/history'], ['Partnerships', '/partnerships'], ['Videos', '/videos'], ['Blog', '/blog']]],
    ['Get involved', [['Donate', '/donate'], ['Volunteer', '/volunteers'], ['Trip updates (newsletter)', '/home#pf-news'], ['Contact us', '/contact-us']]]
  ];
  var css = [
    '.pff{--navy:#0e3b43;--navy2:#0a2c33;--teal:#00887E;--gold:#f2b84b;--orange:#d9622b;--ink:#16262b;font-family:Poppins,system-ui,sans-serif;color:rgba(255,255,255,.82);line-height:1.55;width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;text-align:left}',
    '.pff *{box-sizing:border-box}.pff a{text-decoration:none!important}',
    '.pff .w{max-width:1160px;margin:0 auto;padding:0 20px}',
    '.pff .cta{background:linear-gradient(135deg,var(--teal),var(--navy));color:#fff;position:relative;isolation:isolate}',
    '.pff .cta:before{content:"";position:absolute;inset:0;z-index:-1;opacity:.13;background:repeating-radial-gradient(circle at 90% 130%,transparent 0 26px,#fff 27px 28px)}',
    '.pff .cta .w{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-top:34px;padding-bottom:34px;flex-wrap:wrap}',
    '.pff .cta h2{font:700 clamp(26px,3.4vw,36px)/1.15 Oswald,Poppins,sans-serif!important;color:#fff!important;text-transform:none!important;letter-spacing:.01em!important;margin:0 0 4px!important}',
    '.pff .cta p{margin:0;font-size:16px;color:rgba(255,255,255,.92)}',
    '.pff .btns{display:flex;gap:12px;flex-wrap:wrap}',
    '.pff .b{display:inline-block;font:600 15px/1 Poppins,sans-serif;padding:15px 24px;border-radius:999px;transition:transform .15s,background .15s}',
    '.pff .b:hover{transform:translateY(-2px)}.pff .b1{background:var(--orange);color:#fff!important}.pff .b1:hover{background:#b94c1a}.pff .b2{background:#fff;color:var(--navy)!important}',
    '.pff .main{background:var(--navy)}',
    '.pff .grid{display:grid;grid-template-columns:1.35fr 1fr 1fr 1fr;gap:40px;padding-top:54px;padding-bottom:42px}',
    '.pff .logo{display:inline-block;background:#fff;border-radius:16px;padding:8px 10px;margin-bottom:16px}.pff .logo img{display:block;height:86px;width:auto}',
    '.pff .brand h3{font:700 24px/1.2 Oswald,Poppins,sans-serif!important;color:#fff!important;text-transform:none!important;letter-spacing:.01em!important;margin:0 0 8px!important}',
    '.pff .brand p{margin:0 0 6px;font-size:14.5px}.pff .brand .tag{max-width:300px;margin-bottom:14px}',
    '.pff .brand a.tel{color:var(--gold)!important;font-weight:600}',
    '.pff .soc{display:flex;gap:10px;margin-top:16px}.pff .soc a{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.12);transition:background .15s,transform .15s}',
    '.pff .soc a:hover{background:var(--gold);transform:translateY(-2px)}.pff .soc a:hover svg{fill:var(--navy)}.pff .soc svg{width:20px;height:20px;fill:#fff}',
    '.pff h4{font:600 13px/1.2 Poppins,sans-serif!important;color:var(--gold)!important;text-transform:uppercase!important;letter-spacing:.12em!important;margin:4px 0 14px!important}',
    '.pff ul{list-style:none;margin:0;padding:0}.pff li{margin:0 0 9px;padding:0}',
    '.pff li a{color:rgba(255,255,255,.86)!important;font-size:15px;border-bottom:1px solid transparent;transition:color .15s,border-color .15s}.pff li a:hover{color:#fff!important;border-color:var(--gold)}',
    '.pff a:focus-visible{outline:3px solid var(--gold);outline-offset:3px;border-radius:6px}',
    '.pff .base{background:var(--navy2);font-size:13.5px}.pff .base .w{display:flex;justify-content:space-between;gap:10px 24px;flex-wrap:wrap;padding-top:18px;padding-bottom:18px;color:rgba(255,255,255,.7)}',
    '.pff .base a{color:var(--gold)!important}.pff .base a:hover{text-decoration:underline!important}',
    '@media(max-width:900px){.pff .grid{grid-template-columns:1fr 1fr;gap:34px 28px;padding-top:44px}.pff .brand{grid-column:1/-1}}',
    '@media(max-width:560px){.pff .grid{grid-template-columns:1fr 1fr}.pff .cta .w{padding-top:28px;padding-bottom:28px}.pff .btns{width:100%}.pff .b{flex:1 1 100%;text-align:center}.pff .grid>div:last-child{grid-column:1/-1}}'
  ].join('');
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var icon = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'; };
  var FBI = 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z';
  var YTI = 'M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.22 22 12 22 12s0-3.22-.4-4.8zM10 15V9l5.2 3-5.2 3z';
  var year = new Date().getFullYear();
  var cols = COLS.map(function (c) {
    return '<div><h4>' + esc(c[0]) + '</h4><ul>' + c[1].map(function (l) { return '<li><a href="' + esc(l[1]) + '">' + esc(l[0]) + '</a></li>'; }).join('') + '</ul></div>';
  }).join('');
  root.innerHTML = '<style>' + css + '</style><footer class="pff" aria-label="Site footer">' +
    '<div class="cta"><div class="w"><div><h2>Ready for the river?</h2><p>See the 2026&ndash;27 trips, or get trip updates by email.</p></div>' +
    '<div class="btns"><a class="b b1" href="/home#TripPreview">See 2026&ndash;27 trips</a><a class="b b2" href="/home#pf-news">Get trip updates</a></div></div></div>' +
    '<div class="main"><div class="w grid">' +
    '<div class="brand"><a class="logo" href="/" aria-label="Paddle Florida home"><img src="' + LOGO + '" alt="Paddle Florida, est. 2007" loading="lazy"></a>' +
    '<p class="tag">Supported multi-day paddling and camping trips, and a voice for Florida&rsquo;s waterways, since 2007.</p>' +
    '<p>P.O. Box 840205<br>St Augustine, Florida 32080</p><p><a class="tel" href="tel:+19048744594">(904) 874-4594</a></p>' +
    '<div class="soc"><a href="' + FB + '" target="_blank" rel="noopener" aria-label="Paddle Florida on Facebook">' + icon(FBI) + '</a><a href="' + YT + '" target="_blank" rel="noopener" aria-label="Paddle Florida on YouTube">' + icon(YTI) + '</a></div></div>' +
    cols + '</div></div>' +
    '<div class="base"><div class="w"><span>&copy; ' + year + ' Paddle Florida, Inc. A 501(c)(3) nonprofit organization.</span><span>Designed &amp; managed by <a href="https://www.ocooswebconsulting.com/" target="_blank" rel="noopener">Ocoos</a></span></div></div></footer>';
  if (!document.getElementById('pf-fonts')) { var l = document.createElement('link'); l.id = 'pf-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap'; document.head.appendChild(l); }
})();
