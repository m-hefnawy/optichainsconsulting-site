(function(){
  'use strict';
  var nav=document.getElementById('primary-nav');
  var toggle=document.getElementById('nav-toggle');
  if(nav&&toggle){
    toggle.addEventListener('click',function(){var open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')})});
  }
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver' in window)){reveals.forEach(function(el){el.classList.add('visible')})}else{
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.1,rootMargin:'0px 0px -40px'});
    reveals.forEach(function(el){observer.observe(el)});
  }
  var sections=document.querySelectorAll('main section[id]');
  var links=document.querySelectorAll('.primary-nav a');
  if('IntersectionObserver' in window){var sectionObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){links.forEach(function(link){link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id)})}})},{rootMargin:'-35% 0px -58%'});sections.forEach(function(section){sectionObserver.observe(section)})}
  var year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  var form=document.getElementById('contact-form');var status=document.getElementById('form-status');
  if(form&&status){form.addEventListener('submit',async function(event){event.preventDefault();var fields=[document.getElementById('cf-name'),document.getElementById('cf-email'),document.getElementById('cf-message')];var valid=true;fields.forEach(function(field){var bad=!field.value.trim()||(field.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));field.classList.toggle('invalid',bad);if(bad)valid=false});if(!valid){status.textContent='Please complete the required fields and use a valid email address.';status.className='form-status error';return}var button=form.querySelector('button');button.disabled=true;button.textContent='Sending…';try{var response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok)throw new Error('Submission failed');form.reset();status.textContent='Thank you. Your enquiry has been sent.';status.className='form-status success'}catch(error){status.textContent='We could not send the form. Please email info@optichainsconsulting.com.';status.className='form-status error'}finally{button.disabled=false;button.innerHTML='Send enquiry <span aria-hidden="true">↗</span>'}})}
})();
