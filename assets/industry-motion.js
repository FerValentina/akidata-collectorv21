/* GIFs load only while on screen; static posters are the no-JS fallback. */
(() => {
 'use strict';
 const images=[...document.querySelectorAll('img[data-industry-motion]')];
 const toggle=document.querySelector('.industry-motion-toggle');
 if(!images.length||!toggle)return;
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 let paused=preference.matches;
 const visible=new Set();
 const update=()=>{
  toggle.setAttribute('aria-pressed',String(paused));
  for(const image of images){
   const play=!paused&&!document.hidden&&visible.has(image)&&!image.dataset.motionFailed;
   const src=play?image.dataset.industryMotion:image.dataset.industryPoster;
   if(image.getAttribute('src')!==src)image.setAttribute('src',src);
  }
 };
 toggle.closest('.industry-motion-toolbar').hidden=false;
 toggle.addEventListener('click',()=>{paused=!paused;update();});
 preference.addEventListener('change',event=>{paused=event.matches;update();});
 document.addEventListener('visibilitychange',update);
 for(const image of images)image.addEventListener('error',()=>{
  if(image.getAttribute('src')===image.dataset.industryMotion){image.dataset.motionFailed='true';update();}
 });
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);}
   update();
  },{threshold:.01});
  images.forEach(image=>observer.observe(image));
 }else{images.forEach(image=>visible.add(image));}
 update();
})();
