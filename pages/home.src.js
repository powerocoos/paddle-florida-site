/* Paddle Florida home v2 — rendered into <div id="pf-home">. Built by Ocoos Web Consulting.
   Trips come from the dashboard feed (PF_FEED) when available, else from the built-in copy below. */
(function () {
  var root = document.getElementById('pf-home');
  var ME = (document.currentScript && document.currentScript.src) || '';
  var BASE = /\/pages\/home\.js/.test(ME) ? ME.replace(/pages\/home\.js.*$/, '') : 'https://cdn.jsdelivr.net/gh/powerocoos/paddle-florida-site@main/';
  if (!root || root.getAttribute('data-ready')) return;
  root.setAttribute('data-ready', '1');

  var CFG = {
    img: 'https://images.squarespace-cdn.com/content/v1/5e975a9523a346285e07042f/',
    feed: window.PF_FEED || '',                       // public JSON from the dashboard Worker (later)
    raffle: 'https://secure.qgiv.com/for/kpr/event/prthpfw/',
    shirt: 'https://www.bonfire.com/store/paddle-florida/',
    draw: '2027-03-21T12:00:00-04:00',
    phone: '(904) 874-4594', tel: '+19048744594', email: 'janice@paddleflorida.org',
    news: '#pf-news',
    spots: 'https://dashboard.paddleflorida.org/public/spots.json'   // open spots, set by Janice in the dashboard Trips tab
  };
  var GAL = ['061a2c3b-ece2-461b-9fef-ba44680b1752/keys+ariel+beach.jpg','2dc63f18-5b6b-4ae6-9113-cfbc438295e8/keys+-+picnic+island.jpg','3d681bd4-3aaf-495e-83e9-82f9c9f58ab1/keys+-+BHSP.jpg','5ba9791d-95c0-4a5c-b685-e022c0ca72d8/keys+beach+and+kayaks.jpg','b4e259d9-1162-475d-9ea3-7acd482f6108/poe-springs-on-the-way-to-santa-fe-river.jpg','43a1a73d-badf-4b60-a143-1eef07748de2/blk+1.jpg','64842f66-51bc-4072-86d5-bd2982b490fb/blackwater-river-state-park.jpg','fae73fb7-91fa-4cfc-a22a-76c6f496bc37/cld+1.jpg'];
  var SQV = 'https://video.squarespace-cdn.com/content/v1/5e975a9523a346285e07042f/f7af00ba-8a46-40e7-9dd4-4b66152ed0ba/';
  var VID1 = [['sq','PBS Greater Good','Our mission and the waterways we explore'],['_Dg3_GIziyA','Florida Keys Challenge','A look back at the 2015 Florida Keys Challenge'],['OeNlCudZys8','Great Calusa Blueway','Seven days by kayak around Fort Myers']];
  var VID = [['k8E9FQBLk_k','Paddler Profiles','Troy Morgan'],['LIipVdZGabU','Paddler Profiles','Bud Para'],['se6u-Vqq_uw','Paddler Profiles','Virginia Overstreet']];
  var SHIRT_IMG = '84e12ddb-c91f-4096-afd7-589033d7b68b/100+3+color+female+shirt+%282%29+%281%29.png';
  var SUPP = [['Suwannee County','https://visitsuwannee.com/','ca2f8df9-d8e1-44b1-bcec-696bb14a8cd1/unnamed+%2811%29.jpg'],['Navarre Beach','https://www.getrelaxing.com/','1586992647802-X0L7UMO70I4RJVT2NSG3/navarre_logo.png'],['Clay County','http://www.exploreclay.com/','1620090760985-L7G0SX0PQBRQ6KW0P2L2/Clay%2BCounty%2BLogo.png'],['Explore Northwest Florida','https://explorenwflorida.com/','1586992713149-51UAMOKLT0LP4A0HFI6N/explore_northwest_florida_logo_teal.jpg'],['Columbia County','','1630368081307-ZUY98SUC19M3F7NIPBA5/ColumbiaCounty_2015Logo_resize.png']];
  var CERT = [['Florida SEE','https://floridasee.org/','1586992391943-QUBJZ3PMYAKAMC2ZX7SU/rendition.62731_original.jpeg'],['Guardian Guides Manatee Stewardship Program','https://support.savethemanatee.org/site/SPageNavigator/Guardianguides.html','08013e4a-154a-4872-958c-73cec8862ce4/unnamed+%281%29.png']];
  var TRIPS = /*TRIPS*/[];
  var redraw = null;

  var im = function (p) { return CFG.img + p + (p.indexOf('?') > -1 ? '' : '?format=1000w'); };
  var money = function (n) { return '$' + n.toLocaleString('en-US'); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var track = function (name, extra) { try { if (window.gtag) gtag('event', name, extra || {}); (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, extra || {})); } catch (e) {} };

  var css = '\
.pfh{--ink:#16262b;--mute:#566a70;--soft:#f4f0e6;--line:#e1ddd0;--or:#d9622b;--or2:#b94c1a;--navy:#0e3b43;--gold:#f2b84b;--teal:#00887E;--teal2:#006f65;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.6;width:100vw;margin-left:calc(50% - 50vw);overflow:hidden;text-align:left;box-sizing:border-box}\
.pfh *{box-sizing:border-box}\
.pfh h1,.pfh h2,.pfh h3{font-family:Oswald,Poppins,sans-serif!important;text-transform:none!important;letter-spacing:.01em!important;line-height:1.12!important;margin:0 0 .45em!important;font-weight:600!important}\
.pfh p{margin:0 0 1em}\
.pfh a{text-decoration:none!important}\
.pfh .w{max-width:1160px;margin:0 auto;padding:0 20px}\
.pfh .hero .w{width:100%}\
.pfh .cta{display:flex;flex-wrap:wrap;gap:12px;align-items:stretch}.pfh .cta .btn{margin:0;flex:0 1 auto}.pfh .btn{display:inline-block;text-align:center;white-space:normal;text-decoration:none!important;background:var(--or);color:#fff!important;font:600 15px/1.25 Poppins,sans-serif;border:0;border-radius:10px;padding:13px 24px;cursor:pointer;transition:background .15s,transform .15s}\
.pfh .btn:hover{background:var(--or2);transform:translateY(-1px)}\
.pfh .alt.tl{--x:0}.pfh .btn.o{background:transparent;color:var(--or)!important;border:2px solid var(--or);padding:11px 22px}\
.pfh .btn.wh{background:#fff;color:var(--navy)!important}.pfh .btn.wh:hover{background:var(--gold)}\
.pfh .btn.lg{font-size:17px;line-height:1.25;padding:16px 30px}\
.pfh :focus-visible{outline:3px solid var(--gold);outline-offset:2px}\
.pfh .hero{position:relative;min-height:calc(100vh - var(--header-height,134px));min-height:min(720px,calc(100vh - var(--header-height,134px)));display:flex;align-items:center;color:#fff;background:#1c2b2f;isolation:isolate}\
.pfh .hero .bg{position:absolute;inset:0;z-index:-2}.pfh .hero .bg i{position:absolute;inset:0;background:center/cover;opacity:0;transition:opacity 1.2s}.pfh .hero .bg i.on{opacity:1}\
.pfh .hero:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(8,30,35,.88),rgba(8,30,35,.35))}\
.pfh .hero h1{font-size:clamp(38px,6vw,60px)!important;color:#fff!important}.pfh .hero p.l{font-size:18px;max-width:580px}\
.pfh .pills{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 24px}.pfh .pills span{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);padding:4px 13px;border-radius:99px;font-size:13px}\
.pfh .dots{position:absolute;left:20px;bottom:18px;display:flex;gap:8px;align-items:center}.pfh .dots button{width:10px;height:10px;border-radius:50%;border:0;background:rgba(255,255,255,.5);padding:0;cursor:pointer}.pfh .dots button.on{background:#fff}.pfh .dots .pp{width:auto;height:auto;background:rgba(0,0,0,.4);color:#fff;border-radius:99px;padding:3px 12px;font:500 12px Poppins}\
.pfh section{padding:72px 0}.pfh .alt{background:var(--soft)}.pfh .alt.tl{background:var(--teal)}.pfh .alt.tl .t{color:#fff!important}.pfh .alt.tl .steps div{border:0;box-shadow:0 8px 24px rgba(0,50,45,.25)}\
.pfh .t{font-size:clamp(28px,4vw,38px)!important;color:var(--navy)!important}.pfh .sub{color:var(--mute);max-width:680px;margin:0 0 28px}\
.pfh .fl{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}.pfh .fl button{border:1px solid #c8c3b8;background:#fff;border-radius:99px;padding:8px 16px;font:500 14px Poppins;cursor:pointer;color:var(--ink)}.pfh .fl button.on{background:var(--teal);color:#fff;border-color:var(--teal)}\
.pfh .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}\
.pfh .tc{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;color:var(--ink)!important;transition:transform .15s,box-shadow .15s}.pfh .tc:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(0,0,0,.12)}\
.pfh .tc .im{position:relative;height:190px;background:#cfd8d6 center/cover}.pfh .tag{position:absolute;left:12px;top:12px;background:#fff;color:var(--navy);font:600 12px Poppins;padding:3px 12px;border-radius:99px}.pfh .tag.soldout{background:var(--navy);color:#fff}.pfh .tag.done{background:#566a70;color:#fff}.pfh .tc.dn .im{filter:saturate(.55)}.pfh .tag.open{background:var(--teal);color:#fff}\
.pfh .tc .bd{padding:16px 18px 18px;display:flex;flex-direction:column;gap:3px;flex:1}.pfh .tc h3{font-size:22px!important;color:var(--navy)!important;margin:2px 0!important}.pfh .meta{font-size:13.5px;color:var(--mute)}.pfh .pr{font:600 20px Oswald,sans-serif;color:var(--or)}.pfh .go{margin-top:auto;padding-top:8px;font-weight:600;font-size:14px;color:var(--or)}\
.pfh .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.pfh .steps div{background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px}.pfh .steps b{display:block;font:600 20px Oswald,sans-serif;color:var(--teal2);margin-bottom:4px}.pfh .steps p{margin:0;color:var(--mute);font-size:14.5px}\
.pfh .don{background:linear-gradient(135deg,#0a2f36,#0e3b43 55%,#14505c);color:#fff;position:relative;isolation:isolate}.pfh .don .dbg{position:absolute;inset:0;z-index:-1;background-size:cover;background-position:center 45%}.pfh .don .dbg:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,47,54,.94) 0%,rgba(14,59,67,.86) 55%,rgba(14,59,67,.62) 100%)}\
.pfh .don .w{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}\
.pfh .don .k{display:inline-block;background:var(--gold);color:#3b2a00;font:600 12px Poppins;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:99px;margin-bottom:14px}\
.pfh .don h2{font-size:clamp(32px,5vw,50px)!important;color:#fff!important}.pfh .don h2 em{font-style:normal;color:var(--gold)}\
.pfh .don ul{list-style:none;padding:0;margin:0 0 22px}.pfh .don li{padding:5px 0 5px 26px;position:relative;color:#e3eef0}.pfh .don li:before{content:"\\2713";position:absolute;left:0;color:var(--gold);font-weight:700}\
.pfh .tick{background:#fff;color:var(--ink);border-radius:16px;padding:26px;box-shadow:0 18px 50px rgba(0,0,0,.35);text-align:center}\
.pfh .tick .n{font:600 56px Oswald,sans-serif;color:var(--or);line-height:1}.pfh .tick .u{font-size:13px;color:var(--mute);margin-bottom:14px}\
.pfh .tick .when{font-weight:600;color:var(--navy)}.pfh .tick small{display:block;color:var(--mute);margin-top:12px;font-size:12.5px;line-height:1.5}\
.pfh .tick .btn{width:100%;margin-top:10px}\
.pfh .more{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:34px}.pfh .more a{display:block;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:16px 18px;color:#fff!important}.pfh .more a:hover{background:rgba(255,255,255,.16)}.pfh .more b{display:block;font:600 18px Oswald,sans-serif}.pfh .more span{font-size:13.5px;color:#cfe1e4}\
.pfh .h100{background:#fff}.pfh .h100 .w{display:grid;grid-template-columns:.9fr 1.1fr;gap:44px;align-items:center}.pfh .h100 .sh{background:radial-gradient(circle at 50% 40%,#fff,#efe9d8);border-radius:20px;padding:26px;text-align:center}.pfh .h100 .sh img{max-width:100%;max-height:440px;width:auto;margin:0 auto;display:block}\
.pfh .h100 .badge{display:inline-block;background:var(--teal);color:#fff;font:600 13px Poppins;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:99px;margin-bottom:12px}.pfh .h100 h2{font-size:clamp(34px,5vw,54px)!important;color:var(--navy)!important}.pfh .h100 h2 em{font-style:normal;color:var(--or)}\
.pfh .sup{background:var(--soft)}.pfh .logos{display:flex;flex-wrap:wrap;gap:16px;align-items:stretch;justify-content:center}.pfh .logos a,.pfh .logos div{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px 20px;min-width:170px;max-width:220px;flex:1 1 170px;color:var(--ink)!important;font-size:13px;text-align:center}.pfh .logos a:hover{box-shadow:0 8px 22px rgba(0,0,0,.1)}.pfh .logos img{max-height:84px;max-width:100%;width:auto;object-fit:contain}\
.pfh .certs{margin-top:34px;padding-top:30px;border-top:1px solid var(--line);text-align:center}.pfh .certs h3{font-size:20px!important;color:var(--teal)!important}.pfh .quick{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:30px}.pfh .quick a{border:1px solid #c8c3b8;border-radius:99px;padding:8px 18px;font-weight:500;font-size:14px;color:var(--navy)!important;background:#fff}.pfh .quick a:hover{background:var(--teal);color:#fff!important}\
.pfh .news{background:var(--teal);color:#fff;text-align:center}.pfh .news .t{color:#fff!important}.pfh .news .sub{color:#fff;font-weight:500}.pfh .news .w{max-width:720px}\
.pfh .news .nb{max-width:560px;margin:14px auto 0}.pfh .news .nb *{color:#fff!important;text-align:center}.pfh .news .nb .newsletter-form-header-title{display:none}.pfh .news .nb .newsletter-form-header-description{display:none}.pfh .news .nb input{color:#16262b!important;background:#fff!important;border-radius:10px!important}.pfh .news .nb button,.pfh .news .nb input[type=submit]{background:#d9622b!important;color:#fff!important;border-radius:10px!important}\
.pfh .vg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.pfh .vg.v3{grid-template-columns:repeat(3,1fr);gap:22px}.pfh .vid video{position:absolute;inset:0;width:100%;height:100%;background:#000}.pfh .rf{max-width:860px}.pfh .rf h3{font-family:Oswald,Poppins,sans-serif!important;font-size:22px!important;color:var(--navy)!important;margin:18px 0 8px!important}.pfh .rf ul{margin:0 0 18px;padding-left:20px}.pfh .rf li{margin:0 0 8px}.pfh .vid{position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;padding:0;border-radius:12px;overflow:hidden;cursor:pointer;background:#000}.pfh .vid img,.pfh .vid iframe{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0}.pfh .vid .pl{position:absolute;left:50%;top:50%;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;background:rgba(217,98,43,.95)}.pfh .vid .pl:after{content:"";position:absolute;left:21px;top:16px;border-left:18px solid #fff;border-top:11px solid transparent;border-bottom:11px solid transparent}\
.pfh .vc{font-size:13.5px;margin-top:8px}.pfh .vc b{display:block;color:var(--navy)}.pfh .vc span{color:var(--mute)}\
.pfh .gal{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.pfh .gal img{width:100%;height:210px;object-fit:cover;border-radius:12px;background:#ddd}\
.pfh .mis{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}\
.pfh .ab{background:var(--teal);color:#fff}.pfh .ab .w{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:44px;align-items:start}.pfh .ab h2{font-size:clamp(30px,4.4vw,46px)!important;color:#fff!important}.pfh .ab p{color:#fff;font-size:16.5px;line-height:1.7}.pfh .ab .fb{background:#fff;border-radius:6px;overflow:hidden;min-height:140px}.pfh .ab .fb iframe{display:block;width:100%;max-width:340px;margin:0 auto}.pfh .ab .fl2{display:block;text-align:center;color:#fff!important;text-decoration:underline!important;font-weight:600;margin-top:10px}.pfh .tc .ds{font-size:14px;line-height:1.55;color:var(--mute);margin:8px 0 12px}\
.pfh .rv{opacity:0;transform:translateY(14px);transition:opacity .6s,transform .6s}.pfh .rv.in{opacity:1;transform:none}\
@media(max-width:980px){.pfh .ab .w{grid-template-columns:1fr}.pfh .h100 .w{grid-template-columns:1fr}.pfh .g3,.pfh .steps,.pfh .vg,.pfh .gal{grid-template-columns:1fr 1fr}.pfh .don .w,.pfh .mis{grid-template-columns:1fr}.pfh .more{grid-template-columns:1fr}}\
@media(max-width:560px){.pfh .g3,.pfh .steps,.pfh .vg,.pfh .gal{grid-template-columns:1fr}.pfh section{padding:52px 0}.pfh .hero{min-height:560px}.pfh .cta .btn{flex:1 1 100%}.pfh .btn.lg{font-size:16px;padding:14px 20px}.pfh .tick .btn{margin-top:10px}}\
@media(prefers-reduced-motion:reduce){.pfh *{transition:none!important}.pfh .rv{opacity:1;transform:none}}';

  function card(t) {
    var so = t.status === 'soldout', dn = !!t.completed;
    return '<a class="tc' + (dn ? ' dn' : '') + '" href="' + esc(t.liveUrl || t.url) + '" data-ev="trip_card" data-trip="' + esc(t.id) + '"><div class="im" role="img" aria-label="' + esc(t.name) + '"' + (t.hero ? ' style="background-image:url(\'' + im(t.hero) + '\')"' : '') + '><span class="tag ' + (dn ? 'done' : t.status) + '">' + (dn ? 'Trip completed' : so ? 'Sold out' : 'Open' + (t.spotsLeft ? ' · ' + t.spotsLeft + (t.spotsLeft === 1 ? ' spot left' : ' spots left') : '')) + '</span></div><div class="bd"><div class="meta">' + esc(t.dates) + ' · ' + esc(t.place) + '</div><h3>' + esc(t.name) + '</h3>' + (t.cardNote ? '<div class="meta" style="font-weight:600;color:var(--teal)">' + esc(t.cardNote) + '</div>' : '') + (t.blurb ? '<p class="ds">' + esc(t.blurb) + '</p>' : '') + '<div class="go">' + (so || dn ? 'See the trip →' : 'See trip and register →') + '</div></div></a>';
  }
  function soldOutNote(list) {
    return list.some(function (t) { return t.status === 'soldout'; }) ? '<p class="meta" style="margin-top:18px">Sold out? Trips fill fast and we do not keep a wait list. <a href="' + CFG.news + '" style="color:var(--or)!important;font-weight:600" data-ev="news_cta">Sign up for the newsletter</a> to hear first when a season opens and about new trips.</p>' : '';
  }
  function days(ms) { return Math.max(0, Math.ceil(ms / 864e5)); }

  function build() {
    var trips = TRIPS, heroes = trips.filter(function (t) { return t.hero; }).slice(0, 4);
    var left = days(new Date(CFG.draw) - new Date());
    var vcard = function (v) { var sq = v[0] === 'sq'; return '<div><button class="vid" data-v="' + v[0] + '" aria-label="Play video: ' + esc(v[1] + ', ' + v[2]) + '"><img src="' + (sq ? SQV + 'thumbnail' : 'https://i.ytimg.com/vi/' + v[0] + '/hqdefault.jpg') + '" alt="" loading="lazy"><span class="pl"></span></button><div class="vc"><b>' + esc(v[1]) + '</b><span>' + esc(v[2]) + '</span></div></div>'; };
    var vids1 = VID1.map(vcard).join(''), vids = VID.map(vcard).join('');
    root.innerHTML = '<style>' + css + '</style><div class="pfh">' +
      '<section class="hero" style="padding:var(--header-height,134px) 0 56px;padding-top:calc(var(--header-height,134px) * .35)"><div class="bg">' + heroes.map(function (t, i) { return '<i class="' + (i ? '' : 'on') + '" style="background-image:url(\'' + im(t.hero) + '\')"></i>'; }).join('') + '</div><div class="w"><div style="max-width:720px"><h1>Supported paddling trips across Florida</h1><p class="l">Multi-day paddling adventures featuring camping, a lodge-based trip, a few optional cabin rentals, catered meals, shuttle assistance, and evening conservation programs handled for you. Water conservation, waterways protection, wildlife and springs, one river at a time.</p><div class="pills"><span>Camping and catered meals</span><span>Shuttles included</span><span>Since 2007</span></div><div class="cta"><a class="btn lg" href="#pf-trips" data-ev="hero_trips">See 2026–27 trips</a><a class="btn lg wh" href="' + CFG.news + '" data-ev="hero_news">Get trip updates</a></div></div></div><div class="dots">' + heroes.map(function (t, i) { return '<button aria-label="Show photo ' + (i + 1) + '" class="' + (i ? '' : 'on') + '"></button>'; }).join('') + '<button class="pp" id="pf-pp">Pause</button></div></section>' +
      '<section class="ab" id="pf-about"><div class="w rv"><div><h2 class="t" style="color:#fff!important">Inspiring. Meaningful. Adventure.</h2><p>Paddle Florida, Inc. is a not-for-profit 501(c)(3) corporation organized to support canoeing and kayaking in Florida. Supported, multi-day paddling/camping adventures in each of Florida’s five water management districts showcase the state’s natural beauty and rich cultural heritage while promoting water conservation, wildlife preservation, springs restoration, and waterways protection. Paddle Florida also seeks to promote Florida as an international destination for nature-based tourism.</p><p>Paddle Florida scouts trips in advance to ensure waterway conditions and shoreline campsites are safe, comfortable, and showcase nature’s best view. Meal plans and gear shuttling eliminate the need to weigh down boats with food and camping equipment. Florida-based entertainment and educational programming is provided each evening by regional artists, musicians, authors, and naturalists. Partnerships with local outfitters provide paddlers with canoes, kayaks, and other paddling gear to rent as needed. With this level of support, paddlers of all ages and skill levels can explore and enjoy the REAL Florida!</p></div><div><div class="fb"><iframe title="Paddle Florida on Facebook" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpaddleflorida%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false" width="340" height="500" style="border:0;overflow:hidden" loading="lazy" allow="encrypted-media"></iframe></div><a class="fl2" href="https://www.facebook.com/paddleflorida/" target="_blank" rel="noopener" data-ev="facebook_follow">Follow Paddle Florida on Facebook</a></div></div></section>' +
      '<section id="pf-trips"><span id="TripPreview" aria-hidden="true" style="position:relative;top:calc(-1 * var(--header-height,134px))"></span><div class="w rv"><h2 class="t">Find your trip</h2><p class="sub">Join us as we explore Florida waterways and learn about each of these unique environments.</p><div class="fl" id="pf-fl">' + [['all', 'All trips'], ['open', 'Open now'], ['soldout', 'Sold out'], ['wk', 'Weekend']].map(function (f, i) { return '<button data-f="' + f[0] + '"' + (i ? '' : ' class="on"') + '>' + f[1] + '</button>'; }).join('') + '</div><div class="g3" id="pf-tg">' + trips.map(card).join('') + '</div><div id="pf-so">' + soldOutNote(trips) + '</div></div></section>' +
      '<section class="alt tl"><div class="w rv"><h2 class="t">What a supported trip means</h2><div class="steps"><div><b>You paddle</b><p>Bring your boat, or rent one from a local outfitter.</p></div><div><b>We feed you</b><p>Catered breakfasts and dinners, plus daily lunch &amp; snacks.</p></div><div><b>We move your gear</b><p>Shuttling assistance and logistics are handled for you.</p></div><div><b>Evenings together</b><p>Campfires, speakers and music on the river.</p></div></div></div></section>' +
      '<section class="don" id="pf-donate"><div class="dbg" style="background-image:url(\'' + BASE + 'images/raffle-kayak.jpg\')"></div><div class="w rv"><div><span class="k">Paddler Raffle · $3,300 value</span><h2>Win a kayak package. <em>Protect Florida’s waterways.</em></h2><p style="font-size:18px;color:#e3eef0">Every ticket funds water conservation, springs restoration and the free environmental programs behind our trips.</p><ul><li>Current Designs Vision 130 kayak with skeg, a 13-foot, 44 lb composite hybrid</li><li>Werner Shuna Hooked 2-piece fiberglass paddle, plus more gear</li><li>Live drawing March 21, 2027 at Suwannee River State Park. You do not need to be present to win.</li></ul></div><div class="tick"><div class="n">' + left + '</div><div class="u">days until the drawing</div><div class="when">March 21, 2027</div><a class="btn lg" href="' + CFG.raffle + '" target="_blank" rel="noopener" data-ev="raffle_tickets">Get raffle tickets</a><a class="btn o" href="/donate" data-ev="donate_page">Make a donation</a><small>Paddle Florida, Inc. is a 501(c)(3) charity. Winner picks up the prize in St. Augustine. Tickets are also sold at every seasonal event.</small></div></div></section>' +
      '<section class="h100" id="pf-100"><div class="w rv"><div class="sh"><img src="' + im(SHIRT_IMG) + '" alt="Paddle Florida 100 Trips commemorative paddler shirt" loading="lazy"></div><div><span class="badge">Milestone · 100 multi-day trips</span><h2>100 Trips. <em>One Mission.</em></h2><p style="font-size:18px">Celebrate 100 trips with Paddle Florida! From blackwater rivers to mangrove keys, we’ve explored the Sunshine State for 100 multi-day expeditions.</p><p>Support water conservation and wear the milestone. Choose a woman or man paddler design, then customize your official commemorative shirt online to match your style, just in time for the paddling season.</p><div class="cta"><a class="btn lg" href="' + CFG.shirt + '" target="_blank" rel="noopener" data-ev="shirt_order">Order your shirt</a><a class="btn o lg" href="/donate" data-ev="100_donate">Give to the mission</a></div></div></div></section>' +
      '<section class="news" id="pf-news"><div class="w rv"><h2 class="t">Hear first when a season opens</h2><p class="sub" style="margin:0 auto 6px">Trips fill quickly and registration opens each May 1. Get trip releases, openings and news about protecting Florida’s waters. No wait list needed.</p></div></section>' +
      '<section id="pf-videos"><div class="w rv"><h2 class="t">Get to know us</h2><p class="sub">Watch three videos to get to know us: start with our featured PBS <em>Greater Good</em> segment to learn about our mission and the waterways we explore, then check out our adventures in the Florida Keys and the Great Calusa Blueway (currently under repair).</p><div class="vg v3">' + vids1 + '</div><h2 class="t" style="margin-top:48px!important">Paddler Testimonials</h2><p class="sub">Real paddlers talk about what keeps them coming back.</p><div class="vg v3">' + vids + '</div><p style="margin-top:22px"><a class="btn o" href="https://www.youtube.com/channel/UCldPSyoslpjWIXkPWDyjIKA" target="_blank" rel="noopener">Watch more videos</a></p></div></section>' +
      '<section class="alt"><div class="w rv"><h2 class="t">From the water</h2><div class="gal">' + GAL.map(function (g) { return '<img src="' + im(g) + '" alt="Paddlers and scenery on a Paddle Florida trip" loading="lazy">'; }).join('') + '</div></div></section>' +
      '<section><div class="w mis rv"><div><h2 class="t">Every trip supports Florida’s waters</h2><p>Paddle Florida is a 501(c)(3) not-for-profit. Its goals include water conservation, wildlife preservation, springs restoration and promoting Florida as a nature-based tourism destination.</p><p class="cta"><a class="btn" href="#pf-donate" data-ev="mission_donate">Donate or get raffle tickets</a><a class="btn o" href="' + BASE + 'docs/990/PF-990EZ-2025-2026.pdf" target="_blank" rel="noopener" data-ev="form990">2025-2026 990</a></p></div><div><p class="meta">Questions? Call <a href="tel:' + CFG.tel + '" style="color:var(--or)!important">' + CFG.phone + '</a> or email <a href="mailto:' + CFG.email + '" style="color:var(--or)!important">' + CFG.email + '</a>.</p></div></div></section>' +
      '<section class="alt" id="pf-refund"><div class="w rv rf"><h2 class="t">Refund policy and trip cancellation insurance</h2><p><b>Refund Policy:</b> Due to the financial outlay and costs incurred by Paddle Florida during event planning, any force majeure, which includes but is not limited to water levels, inclement weather and any other Acts of God not mentioned herein, shall not result in the refund of any fees paid to Paddle Florida. All payments are non-refundable. To protect your investment against unforeseen circumstances, we strongly recommend purchasing travel cancellation insurance.</p><h3>Policy breakdown</h3><ul><li><b>Recommendation:</b> You are strongly encouraged to purchase trip cancellation insurance to ensure reimbursement if you cannot attend.</li><li><b>Reasoning:</b> High volumes of early sign-ups and sold-out trips have prompted Paddle Florida to prioritize safety and trip planning rather than managing manual refund requests.</li><li><b>Provider Information:</b> Paddle Florida does not provide the insurance itself; you must use an external company.</li></ul><p class="cta"><a class="btn" href="/trip-cancellations" data-ev="insurance">No Frills Trip Cancellation Insurance</a></p></div></section>' +
      '<section class="sup" id="pf-sup"><div class="w rv"><h2 class="t" style="text-align:center">Supporters of Nature-Based Tourism</h2><p class="sub" style="margin:0 auto 28px;text-align:center">Tourism offices and certifications that stand behind Paddle Florida’s nature-based trips.</p><div class="logos">' + SUPP.map(function (x) { var i = '<img src="' + im(x[2]) + '" alt="' + esc(x[0]) + ' logo" loading="lazy">'; return x[1] ? '<a href="' + x[1] + '" target="_blank" rel="noopener" data-ev="supporter">' + i + '<span>' + esc(x[0]) + '</span></a>' : '<div>' + i + '<span>' + esc(x[0]) + '</span></div>'; }).join('') + '</div><div class="certs"><h3>Certifications</h3><div class="logos">' + CERT.map(function (x) { return '<a href="' + x[1] + '" target="_blank" rel="noopener" data-ev="cert"><img src="' + im(x[2]) + '" alt="' + esc(x[0]) + ' logo" loading="lazy"><span>' + esc(x[0]) + '</span></a>'; }).join('') + '</div></div><div class="quick"><a href="/frequently-asked-questions">FAQ</a><a href="/partnerships">Partnerships</a><a href="/newsletter-archive">News archive</a><a href="/post-trip-survey">Surveys</a><a href="/donate">Donate</a></div></div></section></div>';
    wire(trips);
    moveNews();
  }

  // Move the native Squarespace newsletter block (added in a section below this code block) into the signup section
  var NB = null;
  function moveNews() {
    try {
      var t = root.querySelector('#pf-news .w'); if (!t) return;
      if (!NB) { NB = document.querySelector('.sqs-block-newsletter'); if (!NB) return; }
      var sec = NB.closest('section'), h = document.createElement('div'); h.className = 'nb'; h.appendChild(NB); t.appendChild(h);
      if (sec && !sec.contains(root)) sec.style.display = 'none';
    } catch (e) {}
  }

  function wire(trips) {
    var F = 'all', tg = root.querySelector('#pf-tg'), so = root.querySelector('#pf-so');
    var fil = function () { return trips.filter(function (t) { return F === 'all' || F === t.status || (F === 'wk' && /two days/.test(t.miles || '')); }); };
    var draw = function () { var l = fil(); tg.innerHTML = l.length ? l.map(card).join('') : '<p class="meta">No trips match this filter.</p>'; so.innerHTML = soldOutNote(l); };
    redraw = draw;
    [].forEach.call(root.querySelectorAll('#pf-fl button'), function (b) {
      b.onclick = function () { F = b.dataset.f; [].forEach.call(root.querySelectorAll('#pf-fl button'), function (x) { x.classList.toggle('on', x === b); }); draw(); };
    });
    /* PBS segment: Squarespace-hosted video (HLS). Safari plays it natively; other browsers load hls.js on first click. */
    function playSq(b) {
      var v = document.createElement('video'), url = SQV + 'playlist.m3u8'; v.controls = true; v.autoplay = true; v.playsInline = true; v.title = 'PBS Greater Good: Paddle Florida';
      b.innerHTML = ''; b.appendChild(v); b.onclick = null; track('video_play', { video: 'pbs' });
      var mse = window.MediaSource || window.ManagedMediaSource;
      if (!mse && v.canPlayType('application/vnd.apple.mpegurl')) { v.src = url; return; }
      var go = function () { if (window.Hls && Hls.isSupported()) { var h = new Hls(); h.loadSource(url); h.attachMedia(v); h.on(Hls.Events.MANIFEST_PARSED, function () { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }); } else v.src = url; };
      if (window.Hls) return go();
      var sc = document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js'; sc.onload = go; sc.onerror = function () { b.innerHTML = '<a href="https://www.youtube.com/channel/UCldPSyoslpjWIXkPWDyjIKA" style="color:#fff!important;display:flex;height:100%;align-items:center;justify-content:center">Watch on our video channel</a>'; }; document.head.appendChild(sc);
    }
    [].forEach.call(root.querySelectorAll('.vid'), function (b) {
      b.onclick = function () { if (b.dataset.v === 'sq') { playSq(b); return; } var f = document.createElement('iframe'); f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.v + '?autoplay=1&rel=0'; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true; f.title = 'Paddle Florida video'; b.innerHTML = ''; b.appendChild(f); b.onclick = null; };
    });
    var bg = [].slice.call(root.querySelectorAll('.hero .bg i')), dots = [].slice.call(root.querySelectorAll('.hero .dots button:not(.pp)')), cur = 0, paused = false, pp = root.querySelector('#pf-pp');
    var show = function (n) { cur = n; bg.forEach(function (e, i) { e.classList.toggle('on', i === n); }); dots.forEach(function (e, i) { e.classList.toggle('on', i === n); }); };
    dots.forEach(function (d, i) { d.onclick = function () { show(i); }; });
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) { paused = true; pp.textContent = 'Play'; }
    pp.onclick = function () { paused = !paused; pp.textContent = paused ? 'Play' : 'Pause'; };
    if (bg.length > 1) setInterval(function () { if (!paused) show((cur + 1) % bg.length); }, 6000);
    root.addEventListener('click', function (e) { var a = e.target.closest('[data-ev]'); if (a) track(a.getAttribute('data-ev'), { trip: a.getAttribute('data-trip') || '' }); });
    var els = root.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .12 }); [].forEach.call(els, function (e) { io.observe(e); }); } else { [].forEach.call(els, function (e) { e.classList.add('in'); }); }
  }

  // fonts
  if (!document.getElementById('pf-fonts')) { var l = document.createElement('link'); l.id = 'pf-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap'; document.head.appendChild(l); }

  /* Open spots: the dashboard feed (set by Janice) overrides the embedded numbers. A 0 shows the trip as sold out.
     If the feed is unreachable, the numbers embedded from trips.json stay. */
  function applySpots(d) {
    if (!d || !d.configured || !d.spots) return false;
    TRIPS.forEach(function (t) {
      var v = Object.prototype.hasOwnProperty.call(d.spots, t.id) ? d.spots[t.id] : null;
      t.spotsLeft = (typeof v === 'number' && v > 0) ? Math.floor(v) : null;
      if (v === 0 && !t.completed) t.status = 'soldout';
    });
    return true;
  }
  build();
  if (CFG.spots) {
    var ctl = window.AbortController ? new AbortController() : null, to = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : 0;
    fetch(CFG.spots, { mode: 'cors', signal: ctl ? ctl.signal : undefined }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (applySpots(d) && redraw) redraw(); }).catch(function () {}).then(function () { if (to) clearTimeout(to); });
  }
  if (CFG.feed) { fetch(CFG.feed).then(function (r) { return r.json(); }).then(function (d) { if (d && d.trips && d.trips.length) { TRIPS = d.trips; build(); } }).catch(function () {}); }
})();
