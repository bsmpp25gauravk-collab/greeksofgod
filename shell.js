/* shell.js — Greek Gods Trading Arena
   Injects navbar, workflow strip, footer, and all shared styles into every page.
   All pages call: Shell.init({ page, workflowStep }) */

const Shell = (() => {

  const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
  :root {
    --bg:#0d0e1a;--bg2:#111228;--bg3:#161830;
    --gold:#d4a017;--gold-dim:rgba(212,160,23,.15);--gold-line:rgba(212,160,23,.22);
    --white:#ffffff;--text:rgba(255,255,255,.88);--text-sub:rgba(255,255,255,.55);--text-dim:rgba(255,255,255,.35);
    --c-green:#4dff91;--c-amber:#ffb347;--c-red:#ff4d4d;--c-blue:#5b9ef4;
    --c-green-bg:rgba(77,255,145,.08);--c-amber-bg:rgba(255,179,71,.08);--c-red-bg:rgba(255,77,77,.08);--c-blue-bg:rgba(91,158,244,.08);
    --c-green-line:rgba(77,255,145,.3);--c-amber-line:rgba(255,179,71,.3);--c-red-line:rgba(255,77,77,.3);--c-blue-line:rgba(91,158,244,.3);
    --sp-xs:4px;--sp-sm:8px;--sp-md:16px;--sp-lg:24px;--sp-xl:40px;--sp-2xl:64px;
    --fs-xs:.7rem;--fs-sm:.8rem;--fs-md:.9rem;--fs-base:1rem;--fs-lg:1.1rem;--fs-xl:1.3rem;--fs-2xl:1.6rem;
    --card-bg:rgba(17,18,40,.75);--card-border:1px solid rgba(212,160,23,.18);--card-radius:12px;--card-pad:1.4rem;
    --nav-h:60px;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--text);font-family:'Crimson Pro',Georgia,serif;font-size:1rem;line-height:1.65;min-height:100vh}
  a{color:inherit;text-decoration:none}
  img,svg{display:block}
  button{cursor:pointer;font-family:inherit}
  input,select{font-family:inherit}

  /* NAV */
  .navbar{position:sticky;top:0;z-index:100;height:var(--nav-h);background:rgba(13,14,26,.94);backdrop-filter:blur(20px);border-bottom:1px solid var(--gold-line);display:flex;align-items:center;padding:0 var(--sp-lg);gap:var(--sp-lg)}
  .nav-brand{display:flex;align-items:center;gap:10px;flex-shrink:0;text-decoration:none}
  .nav-brand-icon{width:32px;height:32px;background:linear-gradient(135deg,#b8860b,#d4a017);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:16px;color:#0d0e1a;font-weight:700;flex-shrink:0}
  .nav-brand-text{display:flex;flex-direction:column;line-height:1.1}
  .nav-brand-name{font-family:'Cinzel',serif;font-size:.82rem;color:var(--gold);letter-spacing:.06em;font-weight:600}
  .nav-brand-sub{font-size:.6rem;color:var(--text-dim);letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace}
  .nav-links{display:flex;align-items:center;gap:2px;flex:1;overflow:hidden}
  .nav-link{display:flex;align-items:center;gap:5px;padding:6px 10px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.04em;color:var(--text-sub);transition:color .2s,background .2s;white-space:nowrap;text-decoration:none;border:1px solid transparent}
  .nav-link:hover{color:var(--text);background:rgba(255,255,255,.05)}
  .nav-link.active{color:var(--gold);background:var(--gold-dim);border-color:var(--gold-line)}
  .nl-num{font-size:.52rem;color:var(--text-dim);border:1px solid rgba(255,255,255,.12);border-radius:3px;padding:0 3px}
  .nav-right{display:flex;align-items:center;gap:8px;flex-shrink:0}
  .nav-cta{background:linear-gradient(135deg,#b8860b,#d4a017);color:#0d0e1a;border:none;border-radius:6px;padding:7px 14px;font-family:'Cinzel',serif;font-size:.7rem;font-weight:700;letter-spacing:.05em;cursor:pointer;white-space:nowrap;transition:opacity .2s;text-decoration:none;display:inline-flex;align-items:center}
  .nav-cta:hover{opacity:.88}
  .nav-hamburger{display:none;flex-direction:column;gap:5px;padding:6px;border:none;background:none;cursor:pointer}
  .nav-hamburger span{display:block;width:22px;height:2px;background:var(--text-sub);border-radius:2px;transition:transform .3s,opacity .3s}
  .nav-mobile-menu{display:none;position:fixed;top:var(--nav-h);left:0;right:0;background:rgba(13,14,26,.98);border-bottom:1px solid var(--gold-line);padding:var(--sp-md);flex-direction:column;gap:var(--sp-xs);z-index:99}
  .nav-mobile-menu.open{display:flex}
  .nav-mobile-menu .nav-link{padding:10px 12px;font-size:.75rem}
  @media(max-width:900px){.nav-links{display:none}.nav-hamburger{display:flex}}
  @media(max-width:500px){.nav-brand-sub{display:none}}

  /* WORKFLOW STRIP */
  .workflow-strip{background:rgba(0,0,0,.25);border-bottom:1px solid rgba(255,255,255,.05);padding:0 var(--sp-lg);display:flex;align-items:center;justify-content:center;gap:0;overflow-x:auto;min-height:40px}
  .wf-step{display:flex;align-items:center;gap:6px;padding:8px 14px;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.05em;color:var(--text-dim);white-space:nowrap;text-decoration:none;transition:color .2s}
  .wf-step:hover{color:var(--text-sub)}
  .wf-step.wf-active{color:var(--gold);border-bottom:2px solid var(--gold)}
  .wf-arrow{color:rgba(255,255,255,.15);font-size:.7rem;flex-shrink:0}
  .wf-step-num{width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:.55rem;flex-shrink:0}
  .wf-step.wf-active .wf-step-num{background:var(--gold-dim);color:var(--gold)}

  /* PAGE HEADER */
  .page-header{background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 60%,var(--bg3) 100%);border-bottom:1px solid var(--gold-line);padding:2.5rem var(--sp-lg) 2rem;position:relative;overflow:hidden}
  .page-header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:var(--sp-md)}
  .page-badge{display:inline-flex;align-items:center;gap:5px;background:var(--gold-dim);border:1px solid var(--gold-line);border-radius:20px;padding:3px 10px;font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--gold);letter-spacing:.08em;margin-bottom:10px}
  .page-title{font-family:'Cinzel',serif;font-size:clamp(1.4rem,3vw,2.2rem);color:var(--gold);letter-spacing:.04em;line-height:1.2;margin-bottom:6px}
  .page-subtitle{font-size:.9rem;color:var(--text-sub);font-style:italic;max-width:520px}

  /* COMPONENTS */
  .section{max-width:1200px;margin:0 auto;padding:var(--sp-xl) var(--sp-lg)}
  .section+.section{padding-top:0}
  .section-sm{padding-top:var(--sp-lg);padding-bottom:var(--sp-lg)}
  .section-title{font-family:'Cinzel',serif;font-size:var(--fs-lg);color:var(--gold);letter-spacing:.07em;margin-bottom:var(--sp-lg);padding-bottom:10px;border-bottom:1px solid var(--gold-line);display:flex;align-items:center;gap:8px}
  .metric-card{background:var(--card-bg);border:var(--card-border);border-radius:var(--card-radius);padding:var(--sp-md) var(--sp-lg);backdrop-filter:blur(10px);text-align:center;transition:border-color .2s}
  .metric-card:hover{border-color:rgba(212,160,23,.35)}
  .metric-label{font-family:'JetBrains Mono',monospace;font-size:var(--fs-xs);color:var(--text-dim);letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:6px}
  .metric-value{font-family:'JetBrains Mono',monospace;font-size:var(--fs-2xl);font-weight:600;color:var(--white);line-height:1.1}
  .metric-value.val-green{color:var(--c-green)}.metric-value.val-amber{color:var(--c-amber)}.metric-value.val-red{color:var(--c-red)}.metric-value.val-gold{color:var(--gold)}.metric-value.val-blue{color:var(--c-blue)}
  .metric-sub{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--text-dim);display:block;margin-top:4px}
  .signal-badge{display:inline-flex;align-items:center;gap:5px;border-radius:20px;padding:5px 14px;font-family:'JetBrains Mono',monospace;font-size:var(--fs-xs);font-weight:500;letter-spacing:.06em;border:1px solid}
  .signal-badge.sb-green{background:var(--c-green-bg);border-color:var(--c-green-line);color:var(--c-green)}
  .signal-badge.sb-amber{background:var(--c-amber-bg);border-color:var(--c-amber-line);color:var(--c-amber)}
  .signal-badge.sb-red{background:var(--c-red-bg);border-color:var(--c-red-line);color:var(--c-red)}
  .signal-badge.sb-blue{background:var(--c-blue-bg);border-color:var(--c-blue-line);color:var(--c-blue)}
  .sb-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
  .sb-green .sb-dot{background:var(--c-green)}.sb-amber .sb-dot{background:var(--c-amber)}.sb-red .sb-dot{background:var(--c-red)}.sb-blue .sb-dot{background:var(--c-blue)}
  .card{background:var(--card-bg);border:var(--card-border);border-radius:var(--card-radius);padding:var(--card-pad);backdrop-filter:blur(10px)}
  .card-title{font-family:'Cinzel',serif;font-size:.88rem;color:var(--gold);letter-spacing:.06em;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid rgba(212,160,23,.12)}
  .btn{display:inline-flex;align-items:center;gap:6px;border-radius:8px;padding:10px 20px;font-family:'Cinzel',serif;font-size:.78rem;font-weight:700;letter-spacing:.05em;border:none;cursor:pointer;transition:opacity .2s,transform .1s;text-decoration:none;white-space:nowrap}
  .btn:hover{opacity:.88;transform:translateY(-1px)}.btn:active{transform:translateY(0)}
  .btn-primary{background:linear-gradient(135deg,#b8860b,#d4a017);color:#0d0e1a}
  .btn-outline{background:transparent;border:1px solid var(--gold-line)!important;color:var(--gold)}
  .btn-outline:hover{background:var(--gold-dim)}
  .btn-ghost{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1)!important;color:var(--text-sub);font-family:'JetBrains Mono',monospace;font-weight:400;letter-spacing:.04em}
  .btn-ghost:hover{background:rgba(255,255,255,.1);color:var(--text)}
  .btn-sm{padding:6px 14px;font-size:.68rem}.btn-lg{padding:14px 30px;font-size:.9rem}
  .field-group{display:flex;flex-direction:column;gap:5px}
  .field-label{font-family:'JetBrains Mono',monospace;font-size:var(--fs-xs);color:var(--text-sub);letter-spacing:.06em;text-transform:uppercase}
  .field-input{background:rgba(0,0,0,.35);border:1px solid rgba(212,160,23,.22);border-radius:8px;color:var(--white);font-family:'JetBrains Mono',monospace;font-size:.9rem;padding:9px 12px;outline:none;transition:border-color .2s;width:100%}
  .field-input:focus{border-color:var(--gold)}
  select.field-input option{background:#0d0e1a}
  .accordion{border:var(--card-border);border-radius:var(--card-radius);overflow:hidden}
  .accordion+.accordion{margin-top:8px}
  .acc-trigger{width:100%;background:var(--card-bg);border:none;padding:var(--sp-md) var(--card-pad);display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;transition:background .2s}
  .acc-trigger:hover{background:rgba(17,18,40,.9)}
  .acc-trigger-title{font-family:'Cinzel',serif;font-size:.85rem;color:var(--gold);letter-spacing:.05em;display:flex;align-items:center;gap:8px}
  .acc-icon{font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--text-dim);transition:transform .3s}
  .acc-trigger[aria-expanded="true"] .acc-icon{transform:rotate(180deg)}
  .acc-body{display:none;padding:var(--card-pad);background:rgba(0,0,0,.15);border-top:1px solid rgba(212,160,23,.08)}
  .acc-body.open{display:block}
  .tab-nav{display:flex;gap:2px;flex-wrap:wrap;border-bottom:1px solid var(--gold-line);margin-bottom:var(--sp-lg)}
  .tab-btn{padding:10px 18px;border:none;background:transparent;font-family:'JetBrains Mono',monospace;font-size:var(--fs-xs);letter-spacing:.05em;color:var(--text-sub);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .2s,border-color .2s}
  .tab-btn:hover{color:var(--text)}.tab-btn.active{color:var(--gold);border-bottom-color:var(--gold)}
  .tab-panel{display:none}.tab-panel.active{display:block}
  .cta-strip{background:linear-gradient(135deg,rgba(17,18,40,.9),rgba(13,14,26,.9));border-top:1px solid var(--gold-line);padding:var(--sp-xl) var(--sp-lg)}
  .cta-strip-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--sp-md)}
  .cta-strip-text h3{font-family:'Cinzel',serif;font-size:var(--fs-lg);color:var(--gold);letter-spacing:.05em;margin-bottom:4px}
  .cta-strip-text p{font-size:.9rem;color:var(--text-sub)}
  .cta-strip-actions{display:flex;gap:10px;flex-wrap:wrap}
  .rule-list{list-style:none}
  .rule-list li{display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:.9rem;color:var(--text-sub);line-height:1.5}
  .rule-list li:last-child{border-bottom:none}
  .rule-list li::before{content:'▸';color:var(--gold);flex-shrink:0}
  .interp-box{background:rgba(0,0,0,.2);border:1px dashed rgba(212,160,23,.18);border-radius:10px;padding:var(--sp-md) var(--card-pad)}
  .interp-item{display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:.9rem;color:var(--text-sub);line-height:1.5}
  .interp-item:last-child{border-bottom:none}
  .interp-dot{width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:.45em}
  .grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--sp-md)}
  .grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:var(--sp-md)}
  .grid-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:var(--sp-md)}
  .grid-metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--sp-sm)}
  .empty-state{text-align:center;padding:var(--sp-2xl) var(--sp-lg);border:1px dashed rgba(212,160,23,.2);border-radius:var(--card-radius)}
  .site-footer{background:rgba(0,0,0,.4);border-top:1px solid rgba(255,255,255,.05);padding:var(--sp-lg)}
  .footer-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--sp-md)}
  .footer-brand{font-family:'Cinzel',serif;font-size:.78rem;color:var(--gold);letter-spacing:.06em}
  .footer-links{display:flex;gap:var(--sp-md);flex-wrap:wrap}
  .footer-links a{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--text-dim);letter-spacing:.04em;transition:color .2s}
  .footer-links a:hover{color:var(--text-sub)}
  .footer-copy{font-family:'JetBrains Mono',monospace;font-size:.58rem;color:var(--text-dim)}
  .mt-sm{margin-top:var(--sp-sm)}.mt-md{margin-top:var(--sp-md)}.mt-lg{margin-top:var(--sp-lg)}.mt-xl{margin-top:var(--sp-xl)}
  .mb-sm{margin-bottom:var(--sp-sm)}.mb-md{margin-bottom:var(--sp-md)}.mb-lg{margin-bottom:var(--sp-lg)}
  .hidden{display:none!important}.text-gold{color:var(--gold)}.text-green{color:var(--c-green)}.text-amber{color:var(--c-amber)}.text-red{color:var(--c-red)}.text-sub{color:var(--text-sub)}
  .font-mono{font-family:'JetBrains Mono',monospace}
  .btn-loading{position:relative;pointer-events:none;opacity:.75}
  .btn-loading::after{content:'';position:absolute;right:12px;top:50%;transform:translateY(-50%);width:12px;height:12px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}
  @keyframes spin{to{transform:translateY(-50%) rotate(360deg)}}
  @keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:600px){.section{padding:var(--sp-lg) var(--sp-md)}.page-header{padding:var(--sp-xl) var(--sp-md) var(--sp-lg)}.cta-strip{padding:var(--sp-lg) var(--sp-md)}.grid-4{grid-template-columns:repeat(2,1fr)}.grid-metrics{grid-template-columns:repeat(2,1fr)}}
  `;

  const PAGES = [
    { id:'home',      href:'index.html',              label:'🏠 Home',               num:null },
    { id:'study',     href:'study.html',              label:'📚 Study',              num:null },
    { id:'volatility',href:'volatility-engine.html',  label:'⚡ Volatility Engine',  num:'M3' },
    { id:'decay',     href:'decay-optimizer.html',    label:'⏱ Decay Optimizer',    num:'M4' },
    { id:'strategy',  href:'strategy-lab.html',       label:'📐 Strategy Lab',       num:'M2' },
    { id:'calculator',href:'calculator.html',         label:'🔢 Calculator',         num:null },
    { id:'portfolio', href:'portfolio.html',          label:'📊 Portfolio',          num:'M1' },
    { id:'arena',     href:'arena.html',              label:'🏟 Arena',              num:null },
  ];

  const WF_STEPS = [
    { step:1, href:'volatility-engine.html', label:'Volatility Engine' },
    { step:2, href:'decay-optimizer.html',   label:'Decay Optimizer' },
    { step:3, href:'strategy-lab.html',      label:'Strategy Lab' },
    { step:4, href:'portfolio.html',         label:'Portfolio Dashboard' },
    { step:5, href:'arena.html',             label:'Arena' },
  ];

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function buildNav(activePage) {
    const links = PAGES.map(p => {
      const num = p.num ? `<span class="nl-num">${p.num}</span>` : '';
      const active = p.id === activePage ? 'active' : '';
      return `<a href="${p.href}" class="nav-link ${active}">${num}${p.label}</a>`;
    }).join('');

    const mobileLinks = PAGES.map(p =>
      `<a href="${p.href}" class="nav-link">${p.label}${p.num ? ' ('+p.num+')' : ''}</a>`
    ).join('');

    return `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <a href="index.html" class="nav-brand">
        <div class="nav-brand-icon">Θ</div>
        <div class="nav-brand-text">
          <span class="nav-brand-name">Greek Gods Arena</span>
          <span class="nav-brand-sub">Options Intelligence Platform</span>
        </div>
      </a>
      <div class="nav-links">${links}</div>
      <div class="nav-right">
        <a href="volatility-engine.html" class="nav-cta">Start Analysis →</a>
        <button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" onclick="Shell.toggleMobile(this)">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="nav-mobile-menu" id="mobileNav">${mobileLinks}</div>`;
  }

  function buildWorkflow(activeStep) {
    if (!activeStep) return '';
    const steps = WF_STEPS.map((w, i) => {
      const active = w.step === activeStep ? 'wf-active' : '';
      const arrow  = i < WF_STEPS.length - 1 ? '<span class="wf-arrow">→</span>' : '';
      return `
        <a href="${w.href}" class="wf-step ${active}">
          <span class="wf-step-num">${w.step}</span>${w.label}
        </a>${arrow}`;
    }).join('');
    return `<div class="workflow-strip" role="navigation" aria-label="Platform workflow">${steps}</div>`;
  }

  function buildFooter() {
    const links = PAGES.map(p => `<a href="${p.href}">${p.label.replace(/^.{2}/,'')}</a>`).join('');
    return `
    <footer class="site-footer">
      <div class="footer-inner">
        <span class="footer-brand">GREEK GODS TRADING ARENA</span>
        <div class="footer-links">${links}</div>
        <span class="footer-copy">ZeTheta Algorithms · Options Intelligence Platform</span>
      </div>
    </footer>`;
  }

  function init({ page = 'home', workflowStep = null } = {}) {
    injectStyles();
    document.body.insertAdjacentHTML('afterbegin',
      buildNav(page) + buildWorkflow(workflowStep)
    );
    document.body.insertAdjacentHTML('beforeend', buildFooter());

    // Accordion system
    document.addEventListener('click', e => {
      const t = e.target.closest('.acc-trigger');
      if (!t) return;
      const expanded = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', !expanded);
      t.nextElementSibling?.classList.toggle('open', !expanded);
    });

    // Tab system
    document.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      const group = btn.closest('[data-tabs]');
      if (!group) return;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      group.querySelector(`[data-panel="${btn.dataset.tab}"]`)?.classList.add('active');
    });

    // URL param pre-fill
    const params = new URLSearchParams(window.location.search);
    params.forEach((val, key) => {
      const el = document.getElementById(key);
      if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT')) el.value = val;
    });
  }

  function toggleMobile(btn) {
    const menu = document.getElementById('mobileNav');
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  }

  // XP system
  const XP = {
    get: () => parseInt(localStorage.getItem('gg_xp') || '0'),
    add(n) {
      const v = this.get() + n;
      localStorage.setItem('gg_xp', v);
      const t = document.createElement('div');
      t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#d4a017;color:#0d0e1a;padding:10px 18px;border-radius:8px;font-family:Cinzel,serif;font-size:.78rem;font-weight:700;z-index:999;animation:fadeInUp .3s ease;pointer-events:none';
      t.textContent = `+${n} XP earned!`;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2400);
      return v;
    }
  };

  function getParam(k) { return new URLSearchParams(window.location.search).get(k); }
  function setLoading(btn, on) { btn.classList.toggle('btn-loading', on); btn.disabled = on; }
  function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'nearest' }); }

  return { init, toggleMobile, XP, getParam, setLoading, scrollTo };
})();
