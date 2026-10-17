/* Paddle Florida trip page. Mount: <div id="pf-trip" data-trip="blackwater"></div>
   Renders from trip data (embedded below, optionally replaced by the dashboard feed). Sections appear only when data exists.
   Built by Ocoos Web Consulting. */
(function () {
  var root = document.getElementById('pf-trip');
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');

  var DETAIL = /*DETAIL*/{};
  var CFG = {
    img: 'https://images.squarespace-cdn.com/content/v1/5e975a9523a346285e07042f/',
    feed: window.PF_FEED_TRIP || '',          // e.g. https://.../public/trips/<id>.json (dashboard Worker, later)
    news: '/#pf-news', phone: '(904) 874-4594', tel: '+19048744594', email: 'janice@paddleflorida.org',
    mail: 'Paddle Florida, Inc., P.O. Box 840205, St. Augustine, FL 32080'
  };
  var id = root.getAttribute('data-trip');
  var T = DETAIL[id];
  // Preview either state with ?pfstatus=open or ?pfstatus=soldout (does not change the real status)
  try { var pm = location.search.match(/[?&]pfstatus=(open|soldout)/); if (pm && T) T = Object.assign({}, T, { status: pm[1] }); } catch (e) {}

  var im = function (p, w) { return CFG.img + p + (p.indexOf('?') > -1 ? '' : '?format=' + (w || 1000) + 'w'); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var money = function (n) { return '$' + Number(n).toLocaleString('en-US'); };
  var track = function (name, extra) { try { if (window.gtag) gtag('event', name, extra || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, extra || {})); } catch (e) {} };
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  var css = '\
.pft{--ink:#16262b;--mute:#566a70;--soft:#f4f0e6;--line:#e1ddd0;--or:#d9622b;--or2:#b94c1a;--navy:#0e3b43;--gold:#f2b84b;--teal:#00887E;--teal2:#006f65;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.6;width:100vw;margin-left:calc(50% - 50vw);overflow-x:clip;text-align:left;box-sizing:border-box}\
.pft *{box-sizing:border-box}\
.pft h1,.pft h2,.pft h3,.pft h4{font-family:Oswald,Poppins,sans-serif!important;text-transform:none!important;letter-spacing:.01em!important;line-height:1.15!important;margin:0 0 .45em!important;font-weight:600!important}\
.pft p{margin:0 0 1em}.pft a{text-decoration:none!important}\
.pft .w{max-width:1160px;margin:0 auto;padding:0 20px}\
.pft .hero .w{width:100%}\
.pft .btn{display:inline-block;background:var(--or);color:#fff!important;font:600 15px/1.25 Poppins,sans-serif;text-align:center;border:0;border-radius:10px;padding:13px 24px;cursor:pointer;transition:background .15s,transform .15s}\
.pft .btn:hover{background:var(--or2);transform:translateY(-1px)}.pft .btn.o{background:transparent;color:var(--or)!important;border:2px solid var(--or);padding:11px 22px}.pft .btn.wh{background:#fff;color:var(--navy)!important}.pft .btn.wh:hover{background:var(--gold)}\
.pft .cta{display:flex;flex-wrap:wrap;gap:12px}.pft .cta .btn{margin:0}\
.pft :focus-visible{outline:3px solid var(--gold);outline-offset:2px}\
.pft .hero{position:relative;min-height:440px;display:flex;align-items:flex-end;color:#fff;background:#1c2b2f center/cover;isolation:isolate;padding:calc(var(--header-height,134px) * .45) 0 44px}\
.pft .hero:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(8,30,35,.25),rgba(8,30,35,.85))}\
.pft .hero h1{font-size:clamp(34px,5.5vw,56px)!important;color:#fff!important;max-width:880px}.pft .hero p.l{font-size:18px;max-width:640px;margin-bottom:18px}\
.pft .tag{display:inline-block;font:600 12px Poppins;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:99px;margin-bottom:14px}.pft .tag.open{background:var(--teal);color:#fff}.pft .tag.soldout{background:#fff;color:var(--navy)}\
.pft .sub{position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--line)}.pft .sub .w{display:flex;gap:4px;overflow-x:auto;padding-top:6px;padding-bottom:6px;scrollbar-width:none}.pft .sub button{flex:none;border:0;background:none;font:500 14px Poppins;color:var(--ink);padding:8px 14px;border-radius:99px;cursor:pointer}.pft .sub button:hover{background:var(--soft)}.pft .sub button.on{background:var(--teal);color:#fff}\
.pft .main{padding:40px 0 70px}.pft .cols{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(300px,1fr);gap:40px;align-items:start}\
.pft .t{font-size:clamp(26px,3.4vw,32px)!important;color:var(--navy)!important;margin-top:40px!important;scroll-margin-top:70px}.pft .t:first-child{margin-top:0!important}\
.pft .facts{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.pft .facts div{background:var(--soft);border-radius:12px;padding:12px 14px;font-size:14px}.pft .facts b{display:block;font:600 12px Poppins;letter-spacing:.06em;text-transform:uppercase;color:var(--teal2);margin-bottom:2px}\
.pft .minis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0}.pft .minis div{border:1px solid var(--line);border-radius:12px;padding:14px;font-size:13.5px;color:var(--mute)}.pft .minis b{display:block;font:600 26px Oswald,sans-serif;color:var(--teal)}\
.pft .dctl{display:flex;gap:8px;margin-bottom:12px}.pft .dctl button{border:1px solid #c8c3b8;background:#fff;border-radius:99px;padding:6px 14px;font:500 13px Poppins;cursor:pointer}\
.pft details.day{border:1px solid var(--line);border-radius:14px;margin-bottom:10px;background:#fff;scroll-margin-top:90px}.pft details.day summary{display:flex;gap:14px;align-items:center;padding:14px 16px;cursor:pointer;list-style:none}.pft details.day summary::-webkit-details-marker{display:none}\
.pft .dn{flex:none;background:var(--navy);color:#fff;font:600 14px Oswald,sans-serif;border-radius:10px;padding:6px 12px;min-width:68px;text-align:center}.pft .dt b{display:block;font:600 19px Oswald,sans-serif;color:var(--navy)}.pft .dt small{color:var(--mute);font-size:13px}\
.pft details.day[open] .dn{background:var(--teal)}.pft .db{display:grid;grid-template-columns:1.2fr 1fr;gap:18px;padding:0 16px 16px}.pft .db img{width:100%;height:210px;object-fit:cover;border-radius:12px;background:#ddd}.pft .db figcaption{font-size:12.5px;color:var(--mute);margin-top:4px}\
.pft .map svg{width:100%;height:auto;border-radius:14px}.pft .mp{cursor:pointer}\
.pft .chart{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:10px;align-items:end;background:var(--soft);border-radius:14px;padding:22px 14px 12px}.pft .col{text-align:center;cursor:pointer;font-size:12.5px;color:var(--mute)}.pft .col b{display:block;color:var(--navy);font-size:13px}.pft .bar{position:relative;height:150px;display:flex;align-items:flex-end;justify-content:center}.pft .bar i{display:block;width:70%;background:var(--teal);border-radius:6px 6px 0 0;min-height:3px}.pft .bar i.opt{position:absolute;bottom:0;background:repeating-linear-gradient(45deg,rgba(0,136,126,.25),rgba(0,136,126,.25) 4px,rgba(0,136,126,.08) 4px,rgba(0,136,126,.08) 8px)}.pft .bar .v{position:absolute;top:-18px;font-weight:600;color:var(--navy)}\
.pft table{width:100%;border-collapse:collapse;font-size:14px}.pft th,.pft td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}.pft th{background:var(--soft);font:600 13px Poppins;color:var(--navy)}\
.pft .two{display:grid;grid-template-columns:1fr 1fr;gap:14px}.pft .mini{border:1px solid var(--line);border-radius:12px;padding:14px 16px;font-size:14px}.pft .mini b{display:block;color:var(--navy);font:600 18px Oswald,sans-serif;margin-bottom:2px}\
.pft .pk{margin-top:18px;border:1px solid var(--line);border-radius:14px;padding:18px}.pft .pkh{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}.pft .pkh h3{margin:0!important}.pft .pkh span{font-weight:600;color:var(--teal2);font-size:14px}.pft .pk h4{font-size:17px!important;color:var(--navy)}.pft .ck{display:flex;gap:9px;align-items:flex-start;font-size:14px;padding:4px 0;cursor:pointer}.pft .ck input{margin-top:5px;accent-color:var(--teal)}\
.pft .faq details{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin-bottom:10px}.pft .faq summary{font-weight:600;cursor:pointer;color:var(--navy)}.pft .faq p{margin:10px 0 0;color:var(--mute)}\
.pft .gal{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.pft .gal img{width:100%;height:170px;object-fit:cover;border-radius:12px;cursor:zoom-in;background:#ddd}\
.pft aside{position:sticky;top:78px}.pft .reg{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 14px 40px rgba(0,50,45,.14);overflow:hidden}.pft .reg .rh{background:var(--teal);color:#fff;padding:16px 22px}.pft .reg .rh h3{color:#fff!important;margin:0!important;font-size:24px!important}.pft .reg .rh span{font-size:13px;opacity:.95}\
.pft .reg .rb{padding:18px 22px 20px}.pft .price{display:flex;gap:18px;align-items:baseline;flex-wrap:wrap;margin-bottom:6px}.pft .price b{font:600 34px Oswald,sans-serif;color:var(--or);line-height:1}.pft .price small{color:var(--mute);font-size:13px}.pft .meta{font-size:13.5px;color:var(--mute)}\
.pft .pay{display:grid;gap:10px;margin:16px 0 8px}.pft .pay a{display:flex;align-items:center;gap:12px;border:2px solid var(--line);border-radius:12px;padding:12px 14px;color:var(--ink)!important;transition:border-color .15s,box-shadow .15s,transform .15s;background:#fff}.pft .pay a:hover{border-color:var(--teal);box-shadow:0 6px 18px rgba(0,136,126,.18);transform:translateY(-1px)}.pft .pay a.pri{background:var(--or);border-color:var(--or);color:#fff!important}.pft .pay a.pri:hover{background:var(--or2);border-color:var(--or2)}\
.pft .pay .ic{flex:none;width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--soft);color:var(--teal2)}.pft .pay a.pri .ic{background:rgba(255,255,255,.2);color:#fff}.pft .pay .tx{flex:1;line-height:1.3}.pft .pay .tx b{display:block;font-size:15px}.pft .pay .tx small{font-size:12.5px;opacity:.8}.pft .pay .ar{font-weight:700;font-size:18px;opacity:.7}\
.pft .tip{background:#fff8e6;border:1px solid #f0dca0;border-radius:10px;padding:10px 12px;font-size:12.5px;color:#5a4a10;margin-top:10px}\
.pft .so p{color:var(--ink)}.pft .so details{margin-top:14px;border-top:1px solid var(--line);padding-top:12px}.pft .so summary{cursor:pointer;font-weight:600;color:var(--teal2);font-size:14px}\
.pft .fine{font-size:12.5px;color:var(--mute);margin:12px 0 0}.pft .fine a{color:var(--teal2)!important;font-weight:600;text-decoration:underline!important}\
.pft .lb{display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;align-items:center;justify-content:center}.pft .lb.on{display:flex}.pft .lb img{max-width:92vw;max-height:88vh}.pft .lb button{position:absolute;background:none;border:0;color:#fff;font-size:36px;cursor:pointer;padding:12px}.pft .lb .x{top:6px;right:10px}.pft .lb .p{left:6px}.pft .lb .n{right:6px}\
@media(max-width:980px){.pft .cols{grid-template-columns:1fr}.pft aside{position:static;order:-1}.pft .facts{grid-template-columns:1fr 1fr}.pft .db{grid-template-columns:1fr}.pft .minis,.pft .two{grid-template-columns:1fr}.pft .gal{grid-template-columns:1fr 1fr}}\
@media(max-width:560px){.pft .cta .btn{flex:1 1 100%}.pft .hero{min-height:380px}.pft .chart{padding-inline:6px;gap:4px}.pft .gal img{height:130px}}\
@media print{.pft .sub,.pft aside,.pft .hero .cta,.pft .dctl,.pft .lb{display:none!important}.pft .hero{min-height:0;color:#000;background:none!important;padding:0}.pft .hero:before{display:none}.pft .hero h1,.pft .hero p{color:#000!important}.pft .cols{display:block}.pft details.day .db{display:grid}.pft .db img{height:110px}}';

  var ICONS = {
    credit: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
    echeck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 7l10 7 10-7"/></svg>'
  };

  function payLinks(t, primaryFirst) {
    return (t.payments || []).map(function (p, i) {
      return '<a class="' + (primaryFirst && i === 0 ? 'pri' : '') + '" href="' + esc(p.url) + '" target="_blank" rel="noopener" data-ev="trip_pay" data-pay="' + esc(p.id) + '"><span class="ic">' + (ICONS[p.id] || ICONS.credit) + '</span><span class="tx"><b>' + esc(p.label) + '</b><small>' + esc(p.sub || '') + '</small></span><span class="ar" aria-hidden="true">→</span></a>';
    }).join('');
  }

  function regPanel(t) {
    var so = t.status === 'soldout';
    var cost = t.adult ? '<div class="price"><b>' + money(t.adult) + '</b><small>adult' + (t.senior ? ' · ' + money(t.senior) + ' senior (65+) or college student' : '') + '</small></div>' : '<div class="meta">Price to be announced</div>';
    var dl = t.deadline ? '<p class="meta" style="margin:0">Registration deadline: ' + esc(t.deadline) + (t.capacity ? ', or when all ' + t.capacity + ' spots are taken.' : '.') + '</p>' : '';
    var inc = t.included ? '<p class="meta" style="margin:10px 0 0">' + esc(t.included) + '</p>' : '';
    var foot = '<p class="fine">Questions? Call ' + CFG.phone + ' or email <a href="mailto:' + CFG.email + '">' + CFG.email + '</a>.' + (t.insuranceUrl ? ' Payments are non-refundable, so <a href="' + esc(t.insuranceUrl) + '">trip cancellation insurance</a> is recommended.' : '') + '</p>';
    if (so) {
      return '<div class="reg so" id="pft-reg"><div class="rh"><h3>This trip is sold out</h3><span>' + esc(t.dates) + '</span></div><div class="rb">' + cost + dl +
        '<p style="margin-top:14px">Trips fill fast and we do not keep a wait list. Join the newsletter to hear first when the next season opens and about new trips.</p><a class="btn" style="width:100%" href="' + CFG.news + '" data-ev="trip_news">Get trip updates</a>' +
        ((t.payments || []).length ? '<details><summary>Already have a spot? Payment forms</summary><div class="pay">' + payLinks(t, false) + '</div>' + payTip(t) + '</details>' : '') + foot + '</div></div>';
    }
    return '<div class="reg" id="pft-reg"><div class="rh"><h3>Register for this trip</h3><span>' + esc(t.dates) + '</span></div><div class="rb">' + cost + dl + inc +
      '<div class="pay" role="group" aria-label="Choose how to pay">' + payLinks(t, true) + '</div>' + payTip(t) + foot + '</div></div>';
  }
  function payTip(t) {
    return '<div class="tip"><b>Before you submit:</b> your browser may prefill the form. Type over any prefilled boxes until every field is white, and complete “How you heard of Paddle Florida.” This is a security step.' + (t.mailTo || CFG.mail ? ' Paying by check? After the form, mail it to ' + esc(t.mailTo || CFG.mail) + '.' : '') + '</div>';
  }

  function mapSVG(t) {
    var m = t.map; if (!m || !m.points || !m.points.length) return '';
    var P = m.points, path = 'M' + P.map(function (p) { return p.x + ',' + p.y; }).join(' L');
    var s = '<svg viewBox="0 0 900 270" role="img" aria-label="Schematic route map of the trip" style="background:linear-gradient(#e8f3f1,#d7ebe7)"><path d="' + path + '" fill="none" stroke="#00887E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".3"/><path d="' + path + '" fill="none" stroke="#00887E" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>';
    (m.segments || []).forEach(function (g, i) { if (P[i + 1]) s += '<text x="' + (P[i].x + P[i + 1].x) / 2 + '" y="' + ((P[i].y + P[i + 1].y) / 2 - 12) + '" text-anchor="middle" font-size="13" font-weight="600" fill="#0e3b43">' + esc(g) + '</text>'; });
    P.forEach(function (p, i) { var last = i === P.length - 1; s += '<g class="mp" data-d="' + (p.day || '') + '"><circle cx="' + p.x + '" cy="' + p.y + '" r="15" fill="' + (last ? '#d9622b' : '#0e3b43') + '" stroke="#fff" stroke-width="3"/><text x="' + p.x + '" y="' + (p.y + 4) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">' + (i + 1) + '</text><text x="' + p.x + '" y="' + (p.y + (i % 2 ? -26 : 36)) + '" text-anchor="middle" font-size="13.5" font-weight="600" fill="#0e3b43">' + esc(p.name) + '</text><text x="' + p.x + '" y="' + (p.y + (i % 2 ? -42 : 52)) + '" text-anchor="middle" font-size="12" fill="#566a70">' + esc(p.sub || '') + '</text></g>'; });
    return s + '<text x="16" y="256" font-size="12" fill="#566a70">' + esc(m.note || 'Schematic only, not to scale.') + '</text></svg>';
  }
  function chart(t) {
    var D = t.days || []; if (!D.length) return '';
    var max = Math.max.apply(null, D.map(function (d) { return Math.max(d.miles || 0, d.optMiles || 0); })) + 2, hasOpt = D.some(function (d) { return d.optMiles; });
    return '<div class="chart" role="img" aria-label="Approximate paddling miles by day">' + D.map(function (d) {
      return '<div class="col" data-d="' + d.n + '"><div class="bar">' + (d.optMiles ? '<i class="opt" style="height:' + d.optMiles / max * 100 + '%"></i>' : '') + '<i style="height:' + (d.miles || 0) / max * 100 + '%"></i><span class="v">' + (d.mi || (d.optMiles ? '0 to ' + d.optMiles : d.miles)) + '</span></div><b>Day ' + d.n + '</b>' + (d.date ? '<span>' + esc(d.date.split(', ')[1] || d.date) + '</span>' : '') + '</div>';
    }).join('') + '</div><p class="meta" style="margin:8px 0 0">Approximate miles per day.' + (hasOpt ? ' Hatched bar: optional paddling on the layover day.' : '') + '</p>';
  }
  function dayHTML(d, i) {
    var m = d.mi || (d.optMiles ? '0 to ' + d.optMiles : d.miles), ml = (m === undefined || m === '' || m === null) ? '' : ' · ' + m + ' miles';
    return '<details class="day" id="pft-day' + d.n + '"' + (i === 0 ? ' open' : '') + '><summary><span class="dn">' + esc(d.label || 'Day ' + d.n) + '</span><span class="dt"><b>' + esc(d.title) + '</b><small>' + esc(d.date || '') + ml + (d.camp ? ' · Camp: ' + esc(d.camp) : '') + '</small></span></summary><div class="db"><div><p>' + esc(d.body) + '</p>' + (d.lunch ? '<p class="meta"><b>Lunch:</b> ' + esc(d.lunch) + '.' + (i > 0 && i < (r_days(d) - 1) ? ' Dinner at 6 PM, evening program at 7 PM.' : '') + '</p>' : '') + '</div>' + (d.img ? '<figure style="margin:0"><img src="' + im(d.img) + '" alt="' + esc(d.cap || d.title) + '" loading="lazy">' + (d.cap ? '<figcaption>' + esc(d.cap) + '</figcaption>' : '') + '</figure>' : '') + '</div></details>';
  }
  function r_days() { return (T.days || []).length; }

  function ics(t) {
    var z = function (s) { return s.replace(/-/g, ''); }, e = new Date(t.end + 'T00:00:00'); e.setDate(e.getDate() + 1);
    var end = e.getFullYear() + ('0' + (e.getMonth() + 1)).slice(-2) + ('0' + e.getDate()).slice(-2);
    var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Paddle Florida//Trip//EN', 'BEGIN:VEVENT', 'UID:' + t.id + '-' + z(t.start) + '@paddleflorida.org', 'DTSTAMP:' + z(new Date().toISOString().slice(0, 10)) + 'T000000Z', 'DTSTART;VALUE=DATE:' + z(t.start), 'DTEND;VALUE=DATE:' + end, 'SUMMARY:Paddle Florida: ' + t.name, 'LOCATION:' + (t.startLoc || t.place || ''), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar' })); a.download = 'paddle-florida-' + t.id + '.ics'; document.body.appendChild(a); a.click(); a.remove();
  }

  function build() {
    var t = T, has = function (k) { return t[k] && t[k].length; };
    var nav = [['pft-ov', 'Overview']].concat(has('days') ? [['pft-it', 'Itinerary']] : [], t.map ? [['pft-mp', 'Map']] : [], has('places') ? [['pft-pl', 'Places']] : [], has('choices') ? [['pft-ch', 'Paddle choices']] : [], (has('days') && !t.noChart) ? [['pft-mi', 'Mileage']] : [], has('camps') ? [['pft-cp', 'Camps']] : [], (has('water') || has('land')) ? [['pft-gr', 'Gear']] : [], has('faq') ? [['pft-fq', 'Good to know']] : [], [['pft-reg', t.status === 'soldout' ? 'Updates' : 'Register']]);
    var facts = [['Dates', t.dates], ['Start', t.startLoc], ['Finish', t.finishLoc], ['Distance', t.miles], ['Paddlers', t.capacity ? 'Up to ' + t.capacity : ''], ['Level', t.level], ['Nights', t.nights], ['Meals', t.meals]].filter(function (f) { return f[1]; });
    var ov = t.overview || {};
    var html = '<style>' + css + '</style><div class="pft">' +
      '<section class="hero"' + ((t.hero || (t.gallery || [])[0]) ? ' style="background-image:url(\'' + im(t.hero || t.gallery[0], 1600) + '\')"' : '') + '><div class="w"><span class="tag ' + t.status + '">' + (t.status === 'soldout' ? 'Sold out' : 'Open for registration') + '</span><h1>' + esc(t.name) + '</h1><p class="l">' + esc(t.dates) + (t.place ? ' · ' + esc(t.place) : '') + (t.capacity ? ' · ' + t.capacity + ' paddlers' : '') + '</p><div class="cta"><a class="btn" href="#pft-reg" data-go="pft-reg">' + (t.status === 'soldout' ? 'Get trip updates' : 'Register') + '</a><button class="btn wh" id="pft-ics">Add to calendar</button><button class="btn wh" id="pft-prt">Print the plan</button></div></div></section>' +
      '<nav class="sub" aria-label="On this page"><div class="w">' + nav.map(function (n) { return '<button data-go="' + n[0] + '">' + n[1] + '</button>'; }).join('') + '</div></nav>' +
      '<div class="main"><div class="w cols"><div>' +
      '<div id="pft-ov">' + (facts.length ? '<div class="facts">' + facts.map(function (f) { return '<div><b>' + f[0] + '</b>' + esc(f[1]) + '</div>'; }).join('') + '</div>' : '') +
      (ov.title ? '<h2 class="t">' + esc(ov.title) + '</h2><p>' + esc(ov.text) + '</p>' : '') + (ov.minis ? '<div class="minis">' + ov.minis.map(function (m) { return '<div><b>' + esc(m[0]) + '</b>' + esc(m[1]) + '</div>'; }).join('') + '</div>' : '') +
      (t.cabinsNote ? '<p class="meta">' + esc(t.cabinsNote) + (t.outfitterUrl ? ' <a href="' + esc(t.outfitterUrl) + '" target="_blank" rel="noopener" style="color:var(--teal2)!important;font-weight:600;text-decoration:underline!important">' + esc(t.outfitterLabel || 'Outfitter website') + '</a>' : '') + '</p>' : '') + '</div>' +
      (has('days') ? '<h2 class="t" id="pft-it">Day by day</h2><div class="dctl"><button id="pft-exp">Expand all</button><button id="pft-col">Collapse all</button></div>' + t.days.map(dayHTML).join('') : '') +
      (t.map ? '<h2 class="t" id="pft-mp">The route</h2><p class="meta">Tap a stop to jump to that day.</p><div class="map">' + mapSVG(t) + '</div>' : '') +
      (has('places') ? '<h2 class="t" id="pft-pl">' + esc(t.placesTitle || 'Places we will paddle') + '</h2><div class="two">' + t.places.map(function (c) { return '<div class="mini"><b>' + esc(c[0]) + '</b>' + esc(c[1]) + '</div>'; }).join('') + '</div>' : '') +
      (has('choices') ? '<h2 class="t" id="pft-ch">' + esc(t.choicesTitle || 'Paddle choices') + '</h2>' + (t.choicesNote ? '<p>' + esc(t.choicesNote) + '</p>' : '') + '<div style="overflow-x:auto"><table><thead><tr><th>Paddle</th><th>Level</th><th>Miles</th><th>Good to know</th></tr></thead><tbody>' + t.choices.map(function (c) { return '<tr><td>' + esc(c.name) + '</td><td>' + esc(c.level) + '</td><td>' + esc(c.miles) + '</td><td>' + esc(c.note || '') + '</td></tr>'; }).join('') + '</tbody></table></div>' : '') +
      ((has('days') && !t.noChart) ? '<h2 class="t" id="pft-mi">Miles per day</h2>' + chart(t) : '') +
      (has('camps') ? '<h2 class="t" id="pft-cp">Where you will sleep</h2><div style="overflow-x:auto"><table><thead><tr><th>Nights</th><th>Camp</th><th>Good to know</th></tr></thead><tbody>' + t.camps.map(function (c) { return '<tr><td>' + esc(c.nights) + '</td><td>' + esc(c.name) + '</td><td>' + esc(c.note) + '</td></tr>'; }).join('') + '</tbody></table></div>' : '') +
      ((has('water') || has('land')) ? '<h2 class="t" id="pft-gr">Boats, gear and packing</h2>' + ((t.boat || t.baggage) ? '<div class="two">' + (t.boat ? '<div class="mini"><b>Your boat</b>' + esc(t.boat) + '</div>' : '') + (t.baggage ? '<div class="mini"><b>Baggage</b>' + esc(t.baggage) + '</div>' : '') + '</div>' : '') +
        '<div class="pk"><div class="pkh"><h3>Packing checklist</h3><span id="pft-pkc"></span></div><div class="two" style="gap:24px;align-items:start"><div><h4>On the water</h4>' + (t.water || []).map(function (x, i) { return '<label class="ck"><input type="checkbox" data-k="w' + i + '"><span>' + esc(x) + '</span></label>'; }).join('') + '</div><div><h4>On land</h4>' + (t.land || []).map(function (x, i) { return '<label class="ck"><input type="checkbox" data-k="l' + i + '"><span>' + esc(x) + '</span></label>'; }).join('') + '</div></div></div>' : '') +
      (has('faq') ? '<h2 class="t" id="pft-fq">Good to know</h2><div class="faq">' + t.faq.map(function (f) { return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join('') + '</div>' : '') +
      (has('gallery') ? '<h2 class="t">Photos from the river</h2><div class="gal">' + t.gallery.slice(0, 9).map(function (g, i) { return '<img src="' + im(g) + '" data-i="' + i + '" alt="Scenery on the ' + esc(t.name) + '" loading="lazy">'; }).join('') + '</div>' : '') +
      '</div><aside>' + regPanel(t) + '</aside></div></div>' +
      '<div class="lb" id="pft-lb"><button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><button class="n" aria-label="Next">›</button></div></div>';
    root.innerHTML = html;
    wire(t);
  }

  function wire(t) {
    var q = function (s) { return root.querySelector(s); }, qa = function (s) { return [].slice.call(root.querySelectorAll(s)); };
    qa('[data-go]').forEach(function (b) { b.onclick = function (e) { e.preventDefault(); var el = document.getElementById(b.getAttribute('data-go')); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }; });
    var jump = function (n) { var d = document.getElementById('pft-day' + n); if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'center' }); } };
    qa('.mp').forEach(function (m) { m.onclick = function () { jump(m.getAttribute('data-d')); }; });
    qa('.chart .col').forEach(function (c) { c.onclick = function () { jump(c.getAttribute('data-d')); }; });
    var ex = q('#pft-exp'); if (ex) { ex.onclick = function () { qa('details.day').forEach(function (d) { d.open = true; }); }; q('#pft-col').onclick = function () { qa('details.day').forEach(function (d) { d.open = false; }); }; }
    q('#pft-ics').onclick = function () { ics(t); track('trip_calendar', { trip: t.id }); };
    q('#pft-prt').onclick = function () { qa('details.day').forEach(function (d) { d.open = true; }); track('trip_print', { trip: t.id }); setTimeout(function () { window.print(); }, 100); };
    // packing checklist (remembered on this device only)
    var key = 'pf-pack-' + t.id, saved = {}; try { saved = JSON.parse(store.get(key) || '{}'); } catch (e) {}
    var boxes = qa('.ck input'), upd = function () { var n = boxes.filter(function (b) { return b.checked; }).length, c = q('#pft-pkc'); if (c) c.textContent = n + ' of ' + boxes.length + ' packed'; };
    boxes.forEach(function (b) { b.checked = !!saved[b.getAttribute('data-k')]; b.onchange = function () { saved[b.getAttribute('data-k')] = b.checked ? 1 : 0; store.set(key, JSON.stringify(saved)); upd(); }; }); upd();
    // lightbox
    var imgs = qa('.gal img'), lb = q('#pft-lb'), li = 0;
    var show = function (i) { li = (i + imgs.length) % imgs.length; lb.querySelector('img').src = imgs[li].src.replace(/format=\d+w/, 'format=1500w'); lb.classList.add('on'); };
    imgs.forEach(function (g, i) { g.onclick = function () { show(i); }; });
    if (lb) { lb.querySelector('.x').onclick = function () { lb.classList.remove('on'); }; lb.querySelector('.p').onclick = function () { show(li - 1); }; lb.querySelector('.n').onclick = function () { show(li + 1); }; lb.onclick = function (e) { if (e.target === lb) lb.classList.remove('on'); }; document.addEventListener('keydown', function (e) { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') lb.classList.remove('on'); if (e.key === 'ArrowRight') show(li + 1); if (e.key === 'ArrowLeft') show(li - 1); }); }
    // sticky tab highlight
    if ('IntersectionObserver' in window) { var ob = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) qa('.sub button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-go') === e.target.id); }); }); }, { rootMargin: '-40% 0px -55% 0px' }); qa('[id^="pft-"]').forEach(function (el) { if (qa('.sub button[data-go="' + el.id + '"]').length) ob.observe(el); }); }
    root.addEventListener('click', function (e) { var a = e.target.closest('[data-ev]'); if (a) track(a.getAttribute('data-ev'), { trip: t.id, pay: a.getAttribute('data-pay') || '' }); });
  }

  if (!T) { root.innerHTML = '<p>Trip details are not available yet. Please call ' + CFG.phone + '.</p>'; return; }
  if (!document.getElementById('pf-fonts')) { var l = document.createElement('link'); l.id = 'pf-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap'; document.head.appendChild(l); }
  build();
  if (CFG.feed) { fetch(CFG.feed).then(function (r) { return r.json(); }).then(function (d) { if (d && d.id === id) { T = d; build(); } }).catch(function () {}); }
})();
