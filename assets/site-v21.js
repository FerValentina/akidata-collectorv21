/* Progressive enhancement: full text and native pointer work without JS. */
(()=>{
  'use strict';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const words=[...document.querySelectorAll('.typewriter-word')];
  const hero=document.querySelector('.product-hero,.company-hero');
  const pause=document.getElementById('animationToggle');
  let typingTimer=0,heroVisible=true,suspended=false;
  function finishWords(){words.forEach(word=>{word.querySelector('.typewriter-output').textContent=word.dataset.word;word.classList.add('is-resting');});}
  function stopTyping(){clearTimeout(typingTimer);finishWords();}
  function mayType(){return fine.matches&&!reduce.matches&&!document.hidden&&!suspended&&heroVisible&&pause?.getAttribute('aria-pressed')!=='true';}
  function beginTyping(){
    stopTyping();
    if(!mayType())return;
    const language=document.documentElement.dataset.lang||'es';
    const word=words.find(n=>n.closest('.'+language));
    if(!word)return;
    const output=word.querySelector('.typewriter-output'),letters=Array.from(word.dataset.word);
    let index=0;
    typingTimer=setTimeout(()=>{
      if(!mayType())return;
      output.textContent='';word.classList.remove('is-resting');
      function step(){
        if(!mayType()){stopTyping();return;}
        output.textContent=letters.slice(0,++index).join('');
        if(index<letters.length)typingTimer=setTimeout(step,65+Math.random()*85);
        else{word.classList.add('is-resting');typingTimer=setTimeout(beginTyping,30000);}
      }
      step();
    },350);
  }
  new MutationObserver(beginTyping).observe(document.documentElement,{attributes:true,attributeFilter:['data-lang']});
  if(pause)new MutationObserver(beginTyping).observe(pause,{attributes:true,attributeFilter:['aria-pressed']});
  if(hero&&'IntersectionObserver' in window)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;heroVisible?beginTyping():stopTyping();},{threshold:0}).observe(hero);
  document.addEventListener('visibilitychange',()=>document.hidden?stopTyping():beginTyping());
  document.fonts.ready.then(beginTyping);

  const icon=document.createElement('div'),ring=document.createElement('div');
  icon.className='collector-pointer';ring.className='collector-pointer-ring';
  icon.setAttribute('aria-hidden','true');ring.setAttribute('aria-hidden','true');
  const image=document.createElement('img');image.src=document.body.classList.contains('company-page')?'./assets/collector-pointer-green.svg':'./assets/collector-favicon.svg';image.alt='';icon.append(image);
  document.body.append(ring,icon);
  let visible=false,x=0,y=0,rx=0,ry=0,frame=0,last=0;
  const allowed=()=>fine.matches&&!reduce.matches&&!document.hidden&&!suspended;
  function hide(){visible=false;icon.classList.remove('is-visible');ring.classList.remove('is-visible');cancelAnimationFrame(frame);frame=0;last=0;}
  function paint(time){
    frame=0;
    if(!visible||!allowed()){hide();return;}
    const factor=1-Math.pow(.82,Math.min(50,last?time-last:16.7)/16.7);last=time;
    rx+=(x-rx)*factor;ry+=(y-ry)*factor;
    const settled=Math.hypot(x-rx,y-ry)<.15;
    if(settled){rx=x;ry=y;}
    ring.style.transform=`translate3d(${rx-19}px,${ry-19}px,0)`;
    if(!settled)frame=requestAnimationFrame(paint);else last=0;
  }
  function updateIcon(){icon.style.transform=`translate3d(${x-8}px,${y-8}px,0)`;image.style.transform=`rotate(${(scrollY*.22)%360}deg)`;}
  document.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||!allowed()||event.target.closest('input,textarea,select,[contenteditable="true"]')){hide();return;}
    x=event.clientX;y=event.clientY;
    if(!visible){rx=x;ry=y;visible=true;icon.classList.add('is-visible');ring.classList.add('is-visible');}
    updateIcon();if(!frame)frame=requestAnimationFrame(paint);
  },{passive:true});
  window.addEventListener('scroll',()=>{if(visible)updateIcon();},{passive:true});
  document.documentElement.addEventListener('pointerleave',hide);
  window.addEventListener('blur',hide);
  document.addEventListener('keydown',event=>{if(event.key==='Tab')hide();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});
  reduce.addEventListener('change',()=>{hide();beginTyping();});fine.addEventListener('change',()=>{hide();beginTyping();});
  window.addEventListener('pagehide',()=>{suspended=true;stopTyping();hide();});
  window.addEventListener('pageshow',()=>{suspended=false;beginTyping();});
})();
