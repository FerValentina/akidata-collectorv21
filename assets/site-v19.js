// AKIDATA · Product website v19 · DESIGN 4
(function(){
  'use strict';

  const root=document.documentElement;
  const body=document.body;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

  // Fade only ordinary links between the two local pages. Keep hashes,
  // new-tab gestures and reduced-motion navigation native.
  let navigationPending=false;
  window.addEventListener('pageshow',()=>{body.classList.remove('page-leaving');navigationPending=false;});
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||(link.target&&link.target!=='_self')||reducedMotion.matches)return;
    const destination=new URL(link.href,location.href);
    const current=new URL(location.href);
    const currentFolder=current.pathname.slice(0,current.pathname.lastIndexOf('/')+1);
    if(destination.origin!==current.origin||destination.protocol!==current.protocol||destination.pathname===current.pathname||!['index.html','company.html'].some(name=>destination.pathname===currentFolder+name))return;
    event.preventDefault();
    if(navigationPending)return;
    navigationPending=true;
    body.classList.add('page-leaving');
    window.setTimeout(()=>location.assign(destination.href),180);
  });

  // Fixed hero topography and reactive particles in dark sections.
  const canvas=document.getElementById('bg');
  if(canvas&&window.__initAdaptiveBg){
    window.__adaptiveBgCtl=window.__initAdaptiveBg(canvas);
  }

  // Language.
  const languageButtons=[...document.querySelectorAll('[data-set-lang]')];
  const modal=document.getElementById('contactModal');
  function setLanguage(language,{persist=true}={}){
    const value=language==='en'?'en':'es';
    root.dataset.lang=value;
    root.lang=value;
    languageButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.setLang===value)));
    modal?.setAttribute('aria-labelledby',value==='es'?'contactTitleEs':'contactTitleEn');
    updateHeroLabel();
    document.querySelectorAll('a[href*=".html"]').forEach(link=>{const url=new URL(link.getAttribute('href'),location.href);url.searchParams.set('lang',value);link.href=url.href;});
    if(persist){try{localStorage.setItem('akidata_lang',value);}catch(e){}}
  }
  languageButtons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.setLang)));
  let initialLanguage=new URLSearchParams(location.search).get('lang')||'es';
  try{initialLanguage=new URLSearchParams(location.search).get('lang')||localStorage.getItem('akidata_lang')||'es';}catch(e){}

  // Product dropdown.
  const productMenuTrigger=document.getElementById('productMenuTrigger');
  const productMenu=document.getElementById('productMenu');
  function setProductMenu(open){
    if(!productMenu||!productMenuTrigger)return;
    productMenu.hidden=!open;
    productMenuTrigger.setAttribute('aria-expanded',String(open));
  }
  productMenuTrigger?.addEventListener('click',event=>{event.stopPropagation();setProductMenu(productMenuTrigger.getAttribute('aria-expanded')!=='true');});
  productMenu?.addEventListener('click',event=>event.stopPropagation());
  document.addEventListener('click',()=>setProductMenu(false));
  productMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setProductMenu(false)));
  document.addEventListener('focusin',event=>{if(!event.target.closest('#productMenu')&&event.target!==productMenuTrigger)setProductMenu(false);});

  // Mobile menu.
  const mobileToggle=document.getElementById('mobileToggle');
  const mobileMenu=document.getElementById('mobileMenu');
  const mobileClose=document.getElementById('mobileClose');
  let mobileLastFocus=null;
  function setMobileMenu(open,{restoreFocus=false}={}){
    if(!mobileToggle||!mobileMenu)return;
    if(open){
      mobileLastFocus=document.activeElement;
      mobileMenu.hidden=false;
      body.classList.add('menu-open');
      mobileClose?.focus();
    }else{
      mobileMenu.hidden=true;
      body.classList.remove('menu-open');
      if(restoreFocus)mobileLastFocus?.focus();
    }
    mobileToggle.setAttribute('aria-expanded',String(open));
  }
  mobileToggle?.addEventListener('click',()=>setMobileMenu(mobileMenu.hidden));
  mobileClose?.addEventListener('click',()=>setMobileMenu(false,{restoreFocus:true}));
  mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMobileMenu(false)));
  window.addEventListener('resize',()=>{if(window.innerWidth>1100&&!mobileMenu?.hidden)setMobileMenu(false);});

  // Scroll state.
  const nav=document.getElementById('siteNav');
  const navProgress=document.getElementById('navProgress');
  const driftingTitles=[...document.querySelectorAll('.scroll-drift')];
  const scrollAsterisk=document.getElementById('scrollAsterisk');
  const postHeroLightSections=[...document.querySelectorAll('main .light-section:not(.hero)')];
  function updateScroll(){
    const y=window.scrollY||document.documentElement.scrollTop;
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    nav?.classList.toggle('scrolled',y>24);
    if(navProgress)navProgress.style.width=`${Math.min(100,y/max*100)}%`;
    if(scrollAsterisk){
      const probe=window.innerHeight*.52;
      const overPostHeroLight=postHeroLightSections.some(section=>{
        const rect=section.getBoundingClientRect();
        return rect.top<=probe&&rect.bottom>=probe;
      });
      scrollAsterisk.classList.toggle('is-visible',overPostHeroLight);
      const rotation=reducedMotion.matches?0:(y*.16)%360;
      scrollAsterisk.style.setProperty('--asterisk-rotation',`${rotation.toFixed(1)}deg`);
    }
    driftingTitles.forEach(header=>{
      if(reducedMotion.matches||window.innerWidth<981){header.style.setProperty('--title-drift','0px');return;}
      const section=header.closest('section');
      if(!section)return;
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,rect.height-window.innerHeight*.58);
      const progress=Math.max(0,Math.min(1,(120-rect.top)/travel));
      header.style.setProperty('--title-drift',`${(progress*38).toFixed(1)}px`);
    });
  }
  updateScroll();
  window.addEventListener('scroll',updateScroll,{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});

  const navLinks=[...document.querySelectorAll('.nav-link[href^="#"]')];
  if('IntersectionObserver' in window){
    const sectionObserver=new IntersectionObserver(entries=>{
      const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!current)return;
      navLinks.forEach(link=>link.classList.toggle('is-active',link.hash===`#${current.target.id}`));
    },{rootMargin:'-25% 0px -62% 0px',threshold:[0,.2,.4]});
    document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
  }

  // Reveal motion.
  const revealItems=[...document.querySelectorAll('.reveal')];
  if(reducedMotion.matches||!('IntersectionObserver' in window)){
    revealItems.forEach(item=>item.classList.add('is-visible'));
  }else{
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
    }),{rootMargin:'0px 0px -8% 0px',threshold:.07});
    revealItems.forEach(item=>revealObserver.observe(item));
  }

  // Original V8 chaos-to-database animation.
  const heroAnim=document.getElementById('heroAnim');
  const heroStage=heroAnim?.querySelector('.ha-stage');
  const heroCells=heroAnim?.querySelector('.ha-cells');
  const heroTable=document.getElementById('haTableBody');
  const heroTag=document.getElementById('haTagText');
  const heroProgress=document.getElementById('haProg');
  const heroCount=document.getElementById('haCount');
  const heroSteps=[...(heroAnim?.querySelectorAll('.ha-tl-step')||[])];
  const heroLabels={es:['caos','parse','estructura','base de datos'],en:['chaos','parse','schema','database']};
  const heroRows=[['MN-01','Sondaje DDH-047','1.24% Cu','Rajo N'],['MN-02','Plan prod. P3-Q4','18.420 tpd','Mina'],['MN-03','Muestreo geoquím.','0.82 g/t Au','Sond. 112'],['MN-04','Molino SAG-02','94.2% torque','Planta'],['MN-05','Tronadura B-2870','2.148 ton','Rajo S'],['MN-06','Ley concentrado','28.7% Cu','Flotación'],['MN-07','Mantención CV-04','22/10','Planta']];
  let heroPhase=0;
  let heroVisible=true;
  let heroTick=0;
  let heroPaused=reducedMotion.matches;
  const animationToggle=document.getElementById('animationToggle');
  function syncAnimationToggle(){
    if(!animationToggle)return;
    animationToggle.setAttribute('aria-pressed',String(heroPaused));
    animationToggle.innerHTML=heroPaused?'<span class="es">Reanudar animación</span><span class="en">Resume animation</span>':'<span class="es">Pausar animación</span><span class="en">Pause animation</span>';
    heroAnim?.classList.toggle('animation-paused',heroPaused);
  }
  animationToggle?.addEventListener('click',()=>{heroPaused=!heroPaused;syncAnimationToggle();});
  function updateHeroLabel(){
    if(heroTag)heroTag.textContent=heroLabels[root.dataset.lang||'es'][heroPhase];
  }
  function buildHeroCells(){
    if(!heroCells)return;
    heroCells.innerHTML='';
    for(let index=0;index<24;index++){
      const cell=document.createElement('div');
      const angle=Math.random()*Math.PI*2;
      const distance=70+Math.random()*80;
      cell.className='ha-cell';
      cell.style.setProperty('--sx',`${Math.cos(angle)*distance}px`);
      cell.style.setProperty('--sy',`${Math.sin(angle)*distance}px`);
      cell.style.animationDelay=`${Math.random()*.5}s`;
      heroCells.appendChild(cell);
    }
  }
  function fillHeroTable(){
    if(!heroTable)return;
    heroTable.innerHTML='';
    heroRows.forEach((values,index)=>{
      const row=document.createElement('div');
      row.className='ha-row';
      row.style.animationDelay=`${index*.08}s`;
      values.forEach(value=>{const cell=document.createElement('div');cell.textContent=value;row.appendChild(cell);});
      heroTable.appendChild(row);
    });
  }
  function setHeroPhase(phase){
    if(!heroStage||!heroAnim)return;
    heroPhase=phase;
    heroStage.className=`ha-stage phase-${phase}`;
    heroAnim.className=`hero-anim reveal is-visible phase-${phase}`;
    heroSteps.forEach((step,index)=>step.classList.toggle('active',index===phase));
    updateHeroLabel();
    if(phase===1)buildHeroCells();
    if(phase===3)fillHeroTable();
    syncAnimationToggle();
  }
  if(heroAnim){
    if(reducedMotion.matches){setHeroPhase(3);}
    else{
      setHeroPhase(0);
      const phases=[0,1,2,3];
      window.setInterval(()=>{if(heroVisible&&!heroPaused)setHeroPhase(phases[(phases.indexOf(heroPhase)+1)%phases.length]);},2250);
      window.setInterval(()=>{
        if(!heroVisible||heroPaused)return;
        heroTick=(heroTick+1)%180;
        if(heroCount)heroCount.textContent=String((heroTick*17)%10000).padStart(4,'0');
        if(heroProgress)heroProgress.style.right=`${100-heroTick/180*100}%`;
      },50);
      if('IntersectionObserver' in window)new IntersectionObserver(entries=>{heroVisible=entries[0]?.isIntersecting??true;},{threshold:.08}).observe(heroAnim);
    }
  }

  // Platform tabs.
  const platformTabs=[...document.querySelectorAll('[data-platform-tab]')];
  const featurePanels=[...document.querySelectorAll('.feature-panel')];
  function selectPlatform(tab,{focus=false}={}){
    const key=tab.dataset.platformTab;
    platformTabs.forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;});
    featurePanels.forEach(panel=>panel.hidden=panel.id!==`panel-${key}`);
    if(focus)tab.focus();
  }
  platformTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectPlatform(tab));
    tab.addEventListener('keydown',event=>{
      if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
      event.preventDefault();
      let target=index;
      if((event.key==='ArrowRight'||event.key==='ArrowDown'))target=(index+1)%platformTabs.length;
      if((event.key==='ArrowLeft'||event.key==='ArrowUp'))target=(index-1+platformTabs.length)%platformTabs.length;
      if(event.key==='Home')target=0;
      if(event.key==='End')target=platformTabs.length-1;
      selectPlatform(platformTabs[target],{focus:true});
    });
  });

  // Governance audit feed.
  const auditFeed=document.getElementById('auditFeed');
  const auditRows={
    es:[['09:14:22','ana@empresa.com','subió Ventas_Q4.xlsx'],['09:15:04','sistema','validó 3.241 registros'],['09:16:31','carlos@corp.io','modificó Inventario.csv'],['09:17:18','sistema','sincronizó App móvil → BD']],
    en:[['09:14:22','ana@company.com','uploaded Sales_Q4.xlsx'],['09:15:04','system','validated 3,241 records'],['09:16:31','carlos@corp.io','modified Inventory.csv'],['09:17:18','system','synced Mobile app → DB']]
  };
  let auditIndex=0;
  function addAuditRow(){
    if(!auditFeed)return;
    const list=auditRows[root.dataset.lang||'es'];
    const values=list[auditIndex%list.length];
    const row=document.createElement('div');
    row.className='log-entry';
    row.innerHTML=`<span class="log-time">${values[0]}</span><span class="log-user">${values[1]}</span><span class="log-act">${values[2]}</span>`;
    auditFeed.insertBefore(row,auditFeed.firstChild);
    if(auditFeed.children.length>4)auditFeed.lastChild.remove();
    auditIndex++;
  }
  if(auditFeed){addAuditRow();addAuditRow();addAuditRow();if(!reducedMotion.matches)window.setInterval(addAuditRow,2900);}

  // Plan comparison tabs.
  const planTabs=[...document.querySelectorAll('[data-plan-tab]')];
  const planPanels=[...document.querySelectorAll('.plan-panel')];
  function selectPlanTab(tab,{focus=false}={}){
    const key=tab.dataset.planTab;
    planTabs.forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;});
    planPanels.forEach(panel=>panel.hidden=panel.id!==`plan-panel-${key}`);
    if(focus)tab.focus();
  }
  planTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectPlanTab(tab));
    tab.addEventListener('keydown',event=>{
      if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
      event.preventDefault();
      let target=index;
      if((event.key==='ArrowRight'||event.key==='ArrowDown'))target=(index+1)%planTabs.length;
      if((event.key==='ArrowLeft'||event.key==='ArrowUp'))target=(index-1+planTabs.length)%planTabs.length;
      if(event.key==='Home')target=0;
      if(event.key==='End')target=planTabs.length-1;
      selectPlanTab(planTabs[target],{focus:true});
    });
  });

  // FAQ accordion.
  const faqItems=[...document.querySelectorAll('.faq-item')];
  faqItems.forEach(item=>item.querySelector('button')?.addEventListener('click',()=>{
    const button=item.querySelector('button');
    const shouldOpen=button.getAttribute('aria-expanded')!=='true';
    faqItems.forEach(other=>{
      const otherButton=other.querySelector('button');
      const answer=other.querySelector('.faq-answer');
      const marker=otherButton?.querySelector('b');
      const open=other===item&&shouldOpen;
      otherButton?.setAttribute('aria-expanded',String(open));
      if(answer)answer.hidden=!open;
      if(marker)marker.textContent=open?'−':'+';
    });
  }));

  // Contact modal.
  const modalClose=document.getElementById('modalClose');
  const contactForm=document.getElementById('contactForm');
  const formStatus=document.getElementById('formStatus');
  let modalLastFocus=null;
  function openContact(){
    if(!modal)return;
    setProductMenu(false);
    if(!mobileMenu?.hidden)setMobileMenu(false);
    modalLastFocus=document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    body.classList.add('modal-open');
    window.setTimeout(()=>modalClose?.focus(),20);
  }
  function closeContact(){
    if(!modal)return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    body.classList.remove('modal-open');
    modalLastFocus?.focus();
  }
  document.querySelectorAll('[data-open-contact]').forEach(button=>button.addEventListener('click',openContact));
  modalClose?.addEventListener('click',closeContact);
  modal?.addEventListener('mousedown',event=>{if(event.target===modal)closeContact();});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      if(modal?.classList.contains('is-open'))closeContact();
      else if(!mobileMenu?.hidden)setMobileMenu(false,{restoreFocus:true});
      else setProductMenu(false);
      return;
    }
    if(event.key!=='Tab'||!modal?.classList.contains('is-open'))return;
    const focusable=[...modal.querySelectorAll('button,input,select,textarea,a[href]')].filter(element=>!element.disabled&&element.offsetParent!==null);
    if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  contactForm?.addEventListener('submit',event=>{
    event.preventDefault();
    if(!contactForm.reportValidity())return;
    const submit=contactForm.querySelector('[type="submit"]');
    if(submit)submit.disabled=true;
    if(formStatus)formStatus.textContent=root.dataset.lang==='es'?'Esta demostración aún no envía consultas. Tus datos no se han enviado.':'This demo does not send inquiries yet. Your details have not been sent.';
    window.setTimeout(()=>{if(submit)submit.disabled=false;},900);
  });

  setLanguage(initialLanguage,{persist:false});
  document.getElementById('currentYear').textContent=String(new Date().getFullYear());
})();
