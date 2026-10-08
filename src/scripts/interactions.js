export function setupInteractiveText(preferences) {
  const fine = matchMedia('(pointer: fine)');
  document.querySelectorAll('[data-interactive]').forEach(heading => {
    const label = heading.innerText.replace(/\s+/g,' ').trim();
    heading.setAttribute('aria-label',label);
    const walker = document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      for(const token of node.textContent.split(/(\s+)/)) {
        if(/\s/.test(token)) fragment.append(document.createTextNode(token));
        else if(token) {
          const word=document.createElement('span');word.className='word';
          for(const letter of token) {const span=document.createElement('span');span.className='char';span.textContent=letter;span.setAttribute('aria-hidden','true');word.append(span);}
          fragment.append(word);
        }
      }
      node.replaceWith(fragment);
    });
    let centers=[],pending=false,point;
    const chars = [...heading.querySelectorAll('.char')];
    const measureCenters = () => chars.map(char=>{const r=char.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};});
    const invalidateCenters = () => { centers = []; };
    heading.addEventListener('pointerenter', () => { centers = measureCenters(); });
    window.addEventListener('scroll', invalidateCenters, {passive:true});
    window.addEventListener('resize', invalidateCenters, {passive:true});
    heading.addEventListener('pointermove',event=>{
      if(preferences.reduced || !fine.matches) return;
      point={x:event.clientX,y:event.clientY};
      if(pending) return;pending=true;
      requestAnimationFrame(()=>{
        pending=false;
        if (!centers.length) centers = measureCenters();
        chars.forEach((char,i)=>{
          const c=centers[i];if(!c)return;
          const proximity=Math.max(0,1-Math.hypot(point.x-c.x,point.y-c.y)/100);
          char.style.setProperty('--letter-y',`${-proximity*6}px`);
          char.style.setProperty('--letter-color',proximity>.35?'#ffcc75':'inherit');
        });
      });
    });
    const reset=()=>chars.forEach(char=>{char.style.removeProperty('--letter-y');char.style.removeProperty('--letter-color');});
    heading.addEventListener('pointerleave',reset);preferences.addEventListener('change',reset);
  });
}

export function setupPointerInteractions(preferences) {
  const fine = matchMedia('(pointer: fine)');
  const cursor=document.querySelector('.custom-cursor');
  let scheduled=false,point={x:0,y:0},target;
  window.addEventListener('pointermove',event=>{
    if(!fine.matches || preferences.reduced) return;
    point={x:event.clientX,y:event.clientY};target=event.target;
    if(scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;
      cursor.style.opacity='1';
      const view=!!target.closest('.project-card');
      cursor.classList.toggle('is-view',view);cursor.querySelector('span').textContent=view?'VIEW':'';
      const size=view?55:12;
      cursor.style.transform=`translate3d(${point.x-size/2}px,${point.y-size/2}px,0)`;
    });
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>cursor.style.opacity='0');
  preferences.addEventListener('change',()=>cursor.style.opacity='0');
  document.querySelectorAll('.magnetic').forEach(button=>{
    button.addEventListener('pointermove',event=>{
      if(!fine.matches||preferences.reduced)return;
      const r=button.getBoundingClientRect();
      const x=Math.max(-8,Math.min(8,(event.clientX-r.left-r.width/2)*.08));
      const y=Math.max(-8,Math.min(8,(event.clientY-r.top-r.height/2)*.12));
      button.style.translate=`${x}px ${y}px`;
    });
    const reset=()=>button.style.translate='';
    button.addEventListener('pointerleave',reset);preferences.addEventListener('change',reset);
  });
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{
      if(!fine.matches||preferences.reduced)return;
      const r=card.getBoundingClientRect();
      card.style.setProperty('--tilt-x',`${-(event.clientY-r.top-r.height/2)/r.height*4}deg`);
      card.style.setProperty('--tilt-y',`${(event.clientX-r.left-r.width/2)/r.width*4}deg`);
    });
    const reset=()=>{card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');};
    card.addEventListener('pointerleave',reset);preferences.addEventListener('change',reset);
  });
}

export function setupSkills() {
  const techs=[...document.querySelectorAll('.tech')];
  techs.forEach(tech=>{
    tech.addEventListener('pointerenter',()=>{
      const family=tech.dataset.family;
      if(family==='all')return;
      techs.forEach(other=>{other.classList.toggle('related',other.dataset.family===family);other.classList.toggle('dimmed',other.dataset.family!==family&&other.dataset.family!=='all');});
    });
    tech.addEventListener('pointerleave',()=>techs.forEach(other=>other.classList.remove('related','dimmed')));
  });
}

export function setupServices(preferences) {
  const section=document.querySelector('.services');
  const preview=section.querySelector('.service-preview');
  const fine=matchMedia('(pointer: fine)');
  const assets={apps:'consensus',ui:'about',architecture:'bixbit',review:'experience',mvp:'competitions',performance:'auto'};
  const colors={apps:'#f5e5bc',ui:'#f4e1c5',architecture:'#e9e9c9',review:'#f0e2c7',mvp:'#f3e4cb',performance:'#e6e8c5'};
  section.querySelectorAll('.service').forEach(service=>{
    const activate=()=>{
      section.style.backgroundColor=colors[service.dataset.service];
      preview.querySelector('img').src=`${import.meta.env.BASE_URL}artwork/${assets[service.dataset.service]}.webp`;
    };
    service.addEventListener('pointerenter',activate);service.addEventListener('focus',activate);
    service.addEventListener('pointermove',event=>{
      if(!fine.matches||preferences.reduced||innerWidth<1100)return;
      const r=section.getBoundingClientRect();
      preview.style.left=`${Math.min(r.width-110,Math.max(100,event.clientX-r.left-100))}px`;
      preview.style.top=`${Math.max(80,event.clientY-r.top-110)}px`;
      preview.style.opacity='1';
    });
    const reset=()=>{section.style.backgroundColor='';preview.style.opacity='0';};
    service.addEventListener('pointerleave',reset);service.addEventListener('blur',reset);
    preferences.addEventListener('change',reset);
  });
}

export function setupScrollScenes(preferences) {
  const hero=document.querySelector('.hero');
  const layers=[...hero.querySelectorAll('[data-depth]')];
  const sceneLayers=[...document.querySelectorAll('#skills .section-background, #contact .section-background, .experience-scene')];
  const portrait=document.querySelector('.portrait-composition');
  const experience=document.querySelector('.experience');
  const route=document.querySelector('.route-progress');
  const stops=[...document.querySelectorAll('.career-stop')];
  let pending=false,pointer={x:0,y:0};
  const fine=matchMedia('(pointer: fine)');
  const update=()=>{
    pending=false;
    const heroRect=hero.getBoundingClientRect();
    if(!preferences.reduced&&heroRect.bottom>0&&heroRect.top<innerHeight){
      const scroll=Math.max(0,-heroRect.top);
      layers.forEach(layer=>{
        const depth=Number(layer.dataset.depth);
        layer.style.setProperty('--px',`${pointer.x*depth}px`);
        layer.style.setProperty('--py',`${Math.min(scroll,650)*depth*.38+pointer.y*depth}px`);
      });
    }
    if(!preferences.reduced){
      sceneLayers.forEach(layer=>{
        const bounds=layer.parentElement.getBoundingClientRect();
        if(bounds.bottom<=0||bounds.top>=innerHeight)return;
        const offset=Math.max(-55,Math.min(55,(innerHeight/2-bounds.top-bounds.height/2)*.16));
        layer.style.setProperty('--scene-y',`${offset}px`);
      });
      const bounds=portrait.closest('section').getBoundingClientRect();
      if(bounds.bottom>0&&bounds.top<innerHeight) portrait.style.setProperty('--portrait-y',`${Math.max(-30,Math.min(30,(innerHeight/2-bounds.top-bounds.height/2)*.1))}px`);
    }
    const r=experience.getBoundingClientRect();
    if(r.top<innerHeight&&r.bottom>0){
      // Follow the real route length at the reading position, rather than
      // completing the timeline early within a fraction of the section.
      const bounds=route.ownerSVGElement.getBoundingClientRect();
      const readingY=innerHeight*.4;
      const start=bounds.top+bounds.height*.02;
      const length=bounds.height*.96;
      const progress=length ? Math.max(0,Math.min(1,(readingY-start)/length)) : 0;
      route.style.strokeDashoffset=preferences.reduced?'0':String(1-progress);
      stops.forEach(stop=>stop.classList.toggle('is-active',preferences.reduced||stop.getBoundingClientRect().top+14<=readingY+1));
    }
  };
  const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update);}};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  hero.addEventListener('pointermove',event=>{
    if(preferences.reduced||!fine.matches)return;
    pointer={x:(event.clientX/innerWidth-.5)*64,y:(event.clientY/innerHeight-.5)*40};schedule();
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{pointer={x:0,y:0};schedule();});
  preferences.addEventListener('change',()=>{
    pointer={x:0,y:0};
    layers.forEach(layer=>{layer.style.removeProperty('--px');layer.style.removeProperty('--py');});
    sceneLayers.forEach(layer=>layer.style.removeProperty('--scene-y'));
    portrait.style.removeProperty('--portrait-y');
    schedule();
  });
  update();
}
