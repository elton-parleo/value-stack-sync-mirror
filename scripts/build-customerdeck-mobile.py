import re, json, base64, gzip, os, pathlib

SRC = '/dev-server/public/customerdeck-presentation.html'
OUT_HTML = '/dev-server/public/customerdeck-mobile.html'
MEDIA = '/dev-server/public/customerdeck-media'
s = open(SRC, encoding='utf8').read()

def block(t):
    i = s.index('type="__bundler/%s">' % t) + len('type="__bundler/%s">' % t)
    j = s.index('</script>', i)
    return s[i:j].strip()

man = json.loads(block('manifest'))
tpl = json.loads(block('template'))

pathlib.Path(MEDIA).mkdir(parents=True, exist_ok=True)
ext = {'image/png': 'png', 'image/jpeg': 'jpg', 'text/css': 'css'}
urls = {}
for uid, v in man.items():
    if v['mime'] not in ext:
        continue
    d = base64.b64decode(v['data'])
    if str(v.get('compressed')) == 'True':
        d = gzip.decompress(d)
    name = '%s.%s' % (uid, ext[v['mime']])
    open(os.path.join(MEDIA, name), 'wb').write(d)
    urls[uid] = '/customerdeck-media/' + name

# helmet style block (deck-specific CSS authored in the deck)
mstyle = re.search(r'<helmet>.*?<style>(.*?)</style>', tpl, re.S)
deck_css = mstyle.group(1)

secs = re.findall(r'(<section[^>]*data-screen-label="([^"]*)".*?)(?=<section[^>]*data-screen-label=|</x-dc>|$)', tpl, re.S)
print('sections', len(secs))


import re, urllib.request
FAV = {}
def localize_favicons(html):
    for dom in set(re.findall(r'favicons\?domain=([A-Za-z0-9.\-]+)', html)):
        fn = 'fav-%s.png' % dom
        path = os.path.join(MEDIA, fn)
        if not os.path.exists(path) or os.path.getsize(path) < 300:
            src = 'microsoft.com' if dom.startswith('copilot') else dom
            try:
                data = urllib.request.urlopen('https://www.google.com/s2/favicons?domain=%s&sz=64' % src, timeout=15).read()
                open(path, 'wb').write(data)
            except Exception as e:
                print('fav fail', dom, e); continue
        FAV[dom] = '/customerdeck-media/' + fn
    for dom, url in FAV.items():
        html = re.sub(r'https://www\.google\.com/s2/favicons\?domain=' + re.escape(dom) + r'(&amp;|&)sz=\d+', url, html)
    return html

def fix(h):
    h = h.replace('audit.parleo.io', 'parleo.io/audit')
    h = re.sub(r'sc-camel-([a-z-]+)=', lambda m: re.sub(r'-(\w)', lambda x: x.group(1).upper(), m.group(1)) + '=', h)
    for uid, u in urls.items():
        h = h.replace(uid, u)
    return h

labels = []
body = []
for html, label in secs:
    num = label.split()[-1] if label.split() else label
    num = label.strip().split()[-1]
    labels.append(num)
    notes = re.search(r'data-speaker-notes="([^"]*)"', html)
    body.append('<article class="m-chapter" id="ch-%s"><div class="m-slide">%s</div></article>' % (num, localize_favicons(fix(html))))

css_href = urls['d7623fec-7170-4b65-a038-2439946e1ef3']

nav = '\n'.join('<a href="#ch-%s"><span>%s</span></a>' % (n, n) for n in labels)

page_tpl = """<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<title>Parleo | Customer introduction</title>
<link rel="stylesheet" href="%(css)s">
<style>%(deck)s</style>
<style>
:root{--m-w:700px;--ink:#0A0E1A;--paper:#F2F0EF;--blue:#0166FF}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-padding-top:96px}
body{margin:0;background:var(--ink);font-family:'Inter Tight',system-ui,sans-serif;overscroll-behavior-y:none}
.m-top{position:sticky;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 14px;background:rgba(10,14,26,.86);backdrop-filter:saturate(1.2) blur(14px);border-bottom:1px solid rgba(242,240,239,.1)}
.m-top a{color:#F2F0EF;text-decoration:none}
.m-brand{display:flex;align-items:center;gap:7px;font-weight:800;font-size:13px;letter-spacing:.02em}
.m-brand svg{display:block}
.m-links{display:flex;align-items:center;gap:6px}
.m-links .m-ghost{font-size:11px;color:rgba(242,240,239,.62);padding:6px 4px}
.m-cta{font-size:11px;font-weight:650;background:var(--blue);color:#fff!important;padding:7px 12px;border-radius:999px}
.m-bar{position:fixed;top:0;left:0;height:2px;background:var(--blue);z-index:70;width:0}
.m-chapter{position:relative;background:var(--ink);padding:0 0 0;border-top:1px solid rgba(242,240,239,.08)}
.m-slide{zoom:calc(100vw / var(--m-w));width:var(--m-w);margin:0 auto}
.m-slide section[data-screen-label]{width:var(--m-w)!important;height:auto!important;min-height:0!important;aspect-ratio:auto!important;overflow:hidden!important;padding:46px 38px 42px!important;display:block!important}
.m-slide section[data-screen-label] *{min-width:0!important;max-width:100%!important}
.m-slide section[data-screen-label] [style*="grid-template-columns"]:not(.m-keep){display:block!important}
.m-slide section[data-screen-label] [style*="grid-template-columns"]:not(.m-keep)>*{margin-bottom:22px}
.m-slide section[data-screen-label] .m-keep{min-width:720px!important;width:720px!important}
.m-slide section[data-screen-label^="01"] div[style*="border-radius:999px"]{height:auto!important;min-height:0!important;padding:13px 16px!important}
.m-slide section[data-screen-label^="01"] div[style*="border-radius:999px"] img{width:30px!important;height:30px!important;object-fit:contain!important;flex:0 0 auto!important;border-radius:6px!important}
.m-slide section[data-screen-label^="01"]>div{width:100%!important}

.m-slide section[data-screen-label] .m-keep *{max-width:none!important}
.m-slide section[data-screen-label] .m-keep [style*="display:flex"]>*{flex-shrink:0!important}
.m-slide section[data-screen-label] .m-keep [style*="display:flex"]{flex-wrap:nowrap!important}
.m-slide section[data-screen-label] .m-keep [style*="flex:1"]{flex:1 0 auto!important}
@media (max-width:767px){
#ch-03 .m-keep{width:100%!important;min-width:0!important}
#ch-03 .m-scroll{overflow:visible!important}
#ch-03 .m-swipe{display:none!important}
#ch-03 section [style*="grid-template-columns"],
#ch-03 section [style*="display:flex"]:not([style*="column"]){display:block!important}
#ch-03 section [style*="display:flex"]:not([style*="column"]) > *{width:100%!important;max-width:100%!important;margin-bottom:22px}
#ch-03 section *{max-width:100%!important}
#ch-03 section [style*="width:"]:not(.m-kicker){width:auto!important}
#ch-03 section > *:first-child{overflow:visible!important}
}
.m-slide section[data-screen-label] .m-scroll{overflow-x:auto!important;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.m-slide section[data-screen-label] .m-scroll::-webkit-scrollbar{display:none}
.m-slide section[data-screen-label] .m-scroll{position:relative;scroll-snap-type:x proximity}
.m-swipe{display:flex;align-items:center;gap:6px;margin:8px 2px 0;font:600 11px/1 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:rgba(70,69,85,.4)}
.m-slide section[data-screen-label]>[style*="display:flex"]{gap:18px!important}
.m-slide section[data-screen-label]:not([data-screen-label^="01"])>[style*="display:flex"]:not([style*="justify-content:space-between"]):not([style*="border-radius:999px"])>*{flex-basis:100%!important}
.m-slide section[data-screen-label]>[style*="display:flex"]{flex-wrap:wrap!important}
.m-slide section[data-screen-label] [style*="position:absolute"]{max-width:none!important}
.m-slide section[data-screen-label] .deck-atmosphere,.m-slide section[data-screen-label] .deck-atmosphere *{max-width:none!important}
.m-slide section[data-screen-label]:not([data-screen-label^="01"]) [style*="display:flex"]:not([style*="flex-direction:column"]){flex-wrap:wrap!important}
.m-slide section[data-screen-label] img,.m-slide section[data-screen-label] svg{max-width:100%!important}
.m-slide section[data-screen-label] svg:not(.deck-atmosphere svg){height:auto!important}
.m-slide section[data-screen-label] h1{font-size:74px!important;line-height:1.02!important}
.m-slide section[data-screen-label] h2{font-size:56px!important;line-height:1.06!important}
.m-slide section[data-screen-label] p{max-width:none!important}
.m-scroller{overflow-x:auto;-webkit-overflow-scrolling:touch}
.m-foot{padding:56px 22px 74px;background:var(--ink);color:#F2F0EF;text-align:left}
.m-foot h3{font-family:'Inter Tight',sans-serif;font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 10px;max-width:16ch;line-height:1.1}
.m-foot p{margin:0 0 20px;font-size:14px;color:rgba(242,240,239,.6);max-width:34ch;line-height:1.5}
.m-foot .m-cta{display:inline-block;font-size:13px;padding:11px 20px}
.m-foot .m-desk{display:block;margin-top:18px;font:600 11px/1 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:rgba(242,240,239,.45);text-decoration:none}

.m-slide section[data-screen-label] [style*="white-space:nowrap"]{white-space:normal!important}
.m-slide section[data-screen-label] [style*="text-overflow"]{text-overflow:clip!important;white-space:normal!important}
.m-shead{display:none!important}
.m-chapter{padding-top:0}
.m-kicker{position:sticky;top:var(--m-top,48px);z-index:50;display:flex;align-items:baseline;gap:10px;padding:9px 16px;font:600 10px/1 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase}
.m-kicker b{color:var(--blue);font-weight:700}
.m-kicker.on-paper{background:rgba(242,240,239,.92);color:rgba(70,69,85,.55);border-bottom:1px solid rgba(70,69,85,.1)}
.m-kicker.on-ink{background:rgba(10,14,26,.9);color:rgba(242,240,239,.5);border-bottom:1px solid rgba(242,240,239,.12)}
/* Cover slide: absolute composition restacked as a portrait grid */
.m-slide section[data-screen-label^="01"]{display:grid!important;grid-template-columns:1fr 1fr;gap:16px 12px;align-content:start;height:auto!important;padding:52px 34px 46px!important}
.m-slide section[data-screen-label^="01"]>*:nth-child(n+4){position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:auto!important;height:auto!important;max-width:none!important;transform:none!important}
.m-slide section[data-screen-label^="01"]>*:nth-child(9){order:1;grid-column:1/-1}
.m-slide section[data-screen-label^="01"]>*:nth-child(10){order:2;grid-column:1/-1;margin:22px 0 8px!important}
.m-slide section[data-screen-label^="01"]>*:nth-child(8){order:3;grid-column:1/-1;padding:30px 32px!important;margin-bottom:10px!important}
.m-slide section[data-screen-label^="01"]>*:nth-child(4){order:4}
.m-slide section[data-screen-label^="01"]>*:nth-child(5){order:5}
.m-slide section[data-screen-label^="01"]>*:nth-child(6){order:6}
.m-slide section[data-screen-label^="01"]>*:nth-child(7){order:7}
.m-slide section[data-screen-label^="01"]>*:nth-child(n+4):nth-child(-n+7){padding:16px 18px!important;justify-content:flex-start!important}
.m-slide section[data-screen-label^="01"]>*:nth-child(11){order:9;grid-column:1/-1;margin-top:26px!important;flex-wrap:wrap!important;gap:8px}
.m-slide section[data-screen-label^="01"] h1{font-size:78px!important}

@media (min-width:768px){.m-slide{zoom:1;width:1920px}.m-slide section[data-screen-label]{width:1920px!important;height:1080px!important;padding:56px 100px 44px!important;display:flex!important}}
</style>
</head>
<body>
<div class="m-bar" id="mbar"></div>
<header class="m-top">
  <a class="m-brand" href="/"><svg width="15" height="13" viewBox="0 0 46 40"><rect width="19" height="40" rx="6" fill="#0166FF"></rect><rect x="27" y="9" width="15" height="22" rx="5" fill="#7FB0FF"></rect></svg>PARLEO</a>
  <nav class="m-links">
    <a class="m-ghost" href="/">Home</a>
    <a class="m-ghost" href="/insights">Insights</a>
    <a class="m-cta" href="https://parleo.io/audit/">Free audit</a>
  </nav>
</header>
%(body)s
<footer class="m-foot">
  <h3>See what agents say about your brand</h3>
  <p>The Agentic Value Audit scores visibility, accessibility and true value across the surfaces agents read.</p>
  <a class="m-cta" href="https://parleo.io/audit/">Run the free audit</a>
  <a class="m-desk" href="/customerdeck-presentation.html">Open the full presentation</a>
</footer>
<script>

var names={'01':'Introduction','02':'The new funnel','03':'The scoreboard','04':'Category exposure','05':'The platform','06':'True value','07':'The brand case','08':'The retailer case','09':'The console','10':'TrueSync','11':'The progression','12':'Start here','A1':'The operators'};
document.querySelectorAll('.m-chapter').forEach(function(ch){
  var n=ch.id.replace('ch-',''), sec=ch.querySelector('section');
  if(sec && n!=='01'){
    var row=Array.prototype.find.call(sec.children,function(el){var t=(el.textContent||'').trim();return t.indexOf('PARLEO')===0&&t.length<40;});
    if(row) row.classList.add('m-shead'); row.style.setProperty('display','none','important');
  }
  var sc=ch.querySelectorAll('.m-scroll');
  sc.forEach(function(el){var h=document.createElement('div');h.className='m-swipe';h.innerHTML='<span>&#8594;</span><span>Swipe the table</span>';el.parentElement.insertBefore(h,el.nextSibling);});
  var dark=sec&&/#0A0E1A|#0B0F1A|#10131F|#16161F/i.test(sec.getAttribute('style')||'');
  var k=document.createElement('div');
  k.className='m-kicker '+(dark?'on-ink':'on-paper');
  k.innerHTML='<b>'+(n==='A1'?'Appendix':n+' / 12')+'</b><span>'+(names[n]||'')+'</span>';
  ch.insertBefore(k,ch.firstChild);
});


document.querySelectorAll('.m-chapter section svg').forEach(function(svg){
  if(svg.closest('.deck-atmosphere'))return;
  var sec=svg.closest('section');
  if(sec&&(sec.getAttribute('data-screen-label')||'').trim().indexOf('01')===0&&svg.parentElement===sec)return;
  if(svg.querySelector('text,rect,image,foreignObject'))return;
  var r=svg.getBoundingClientRect();
  if(r.height>=90||r.width>=260){svg.style.display='none';var pw=svg.parentElement;if(pw&&pw.children.length===1){pw.style.display='none';}}
});


function pxSum(t){var m=t.match(/(\d+)px/g);return m?m.reduce(function(a,b){return a+parseInt(b,10);},0):0;}
function markWide(el, est){
  if(el.classList.contains('m-keep'))return;
  var w = est<=820 ? 700 : Math.min(1560, est);
  el.classList.add('m-keep');
  el.style.setProperty('width', w+'px', 'important');
  el.style.setProperty('min-width', w+'px', 'important');
  if(w<=700) return;
  var sec=el.closest('section'), host=el.parentElement;
  while(host&&host!==sec&&host.clientWidth<300){host=host.parentElement;}
  if(!host||host===sec){
    var wrap=document.createElement('div');
    wrap.className='m-scroll';
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);
  } else {
    host.classList.add('m-scroll');
  }
}
document.querySelectorAll('.m-chapter section [style*="grid-template-columns"]').forEach(function(g){
  var sec=g.closest('section'); if(g.parentElement===sec)return;
  var t=g.style.gridTemplateColumns||'';
  var fr=(t.match(/fr/g)||[]).length;
  var gap=parseFloat(getComputedStyle(g).columnGap)||0;
  var cols=t.trim().split(/\s+/).length;
  var est=pxSum(t)+fr*230+gap*Math.max(0,cols-1);
  if(est>700 && cols>=3) markWide(g, est);
});
document.querySelectorAll('.m-chapter section [style*="display:flex"]').forEach(function(f){
  var sec=f.closest('section'); if(f===sec||f.closest('.m-keep'))return;
  if(/flex-direction:column/.test(f.getAttribute('style')||''))return;
  var kids=Array.prototype.slice.call(f.children);
  if(kids.length<2)return;
  var sum=0, fixed=0;
  kids.forEach(function(k){var w=pxSum((k.getAttribute('style')||'').split('height')[0].match(/width:\s*\d+px/)?RegExp.lastMatch:'');if(w){sum+=w;fixed++;}});
  var gap=parseFloat(getComputedStyle(f).columnGap)||0;
  if(fixed>=2 && sum+gap*(kids.length-1)>700) markWide(f, sum+gap*(kids.length-1)+20);
});



document.querySelectorAll('.m-chapter section [style*="display:flex"]').forEach(function(f){
  if(f.closest('.m-keep')||/flex-direction:column/.test(f.getAttribute('style')||''))return;
  var kids=Array.prototype.slice.call(f.children);
  if(kids.length<3)return;
  var tight=kids.some(function(k){return (k.scrollWidth-k.clientWidth>6)||(k.clientWidth>0&&k.clientWidth<170);});
  if(tight) markWide(f, kids.length*250);
});
document.querySelectorAll('.m-chapter:not(#ch-01) section [style*="grid-template-columns"].m-keep').forEach(function(g){
  var cols=(g.style.gridTemplateColumns||'').trim().split(/\s+(?![^(]*\))/).length;
  if(cols>=3)return;
  g.classList.remove('m-keep');
  g.style.removeProperty('width'); g.style.removeProperty('min-width');
  g.style.setProperty('width','100%','important'); g.style.setProperty('min-width','0','important');
  var h=g.parentElement;
  if(h&&h.classList.contains('m-scroll')&&h.children.length===1){h.classList.remove('m-scroll');}
});
document.querySelectorAll('.m-chapter:not(#ch-01) section [style*="display:flex"]').forEach(function(f){
  if(f.closest('.m-keep')||/flex-direction:column/.test(f.getAttribute('style')||''))return;
  var kids=Array.prototype.slice.call(f.children);
  if(kids.length<2)return;
  var tight=kids.some(function(k){return k.clientWidth>0&&k.clientWidth<210&&(k.textContent||'').trim().length>18;});
  if(!tight)return;
  f.style.setProperty('display','block','important');
  kids.forEach(function(k){k.style.setProperty('width','100%','important');k.style.marginBottom='18px';});
});
document.querySelectorAll('#ch-03 .m-keep').forEach(function(e){
  e.classList.remove('m-keep'); e.style.removeProperty('width'); e.style.removeProperty('min-width');
  e.style.setProperty('width','100%','important'); e.style.setProperty('min-width','0','important');
});
document.querySelectorAll('#ch-03 .m-scroll').forEach(function(e){e.classList.remove('m-scroll');});
document.querySelectorAll('#ch-09 section > *').forEach(function(ch){
  if(ch.classList.contains('deck-atmosphere')||ch.closest('.m-scroll'))return;
  var deep=ch.querySelectorAll('*').length;
  if(deep>40) markWide(ch, 1720);
});
document.querySelectorAll('.m-chapter section').forEach(function(sec){
  sec.querySelectorAll('*').forEach(function(el){
    if(el.children.length)return;
    var t=(el.textContent||'').trim(); if(!t)return;
    var fs=parseFloat(getComputedStyle(el).fontSize);
    if(fs&&fs<24){ el.style.fontSize=Math.max(24, fs*1.3)+'px'; el.style.lineHeight='1.35'; }
  });
});

document.documentElement.style.setProperty('--m-top', document.querySelector('.m-top').offsetHeight+'px');
var bar=document.getElementById('mbar');
function up(){var h=document.documentElement;var p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);bar.style.width=(p*100).toFixed(2)+'%';}
addEventListener('scroll',up,{passive:true});up();
</script>
</body></html>
"""
page = page_tpl
for k, v in {'%(css)s': css_href, '%(deck)s': deck_css, '%(body)s': '\n'.join(body), '%(nav)s': nav}.items():
    page = page.replace(k, v)
open(OUT_HTML, 'w', encoding='utf8').write(page)
print('wrote', OUT_HTML, len(page), 'labels', labels)
