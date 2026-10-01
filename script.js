const config = window.SURPRISE;
document.querySelectorAll('[data-name]').forEach(el => el.textContent = el.dataset.name === 'affectionate' ? (config.affectionateName || config.girlfriendName) : (config.girlfriendShortName || config.girlfriendName));
document.querySelector('#sender').textContent = config.senderShortName || config.senderName;
config.letter.forEach(text => { const p = document.createElement('p'); p.textContent = text; document.querySelector('#letter-body').append(p); });
config.reasons.forEach(([title, short, long], i) => {
  const button = document.createElement('button'); button.className = 'reason'; button.setAttribute('aria-expanded','false');
  const number = document.createElement('span'); number.className='number'; number.textContent=`0${i+1} / ♡`;
  const heading = document.createElement('strong'); heading.textContent=title;
  const detail=document.createElement('span'); detail.className='detail'; detail.textContent=short;
  const hint=document.createElement('small'); hint.textContent='Tap to discover'; button.append(number,heading,detail,hint);
  button.addEventListener('click',()=> {const active=button.classList.toggle('active'); button.setAttribute('aria-expanded',String(active));detail.textContent=active?long:short;hint.textContent=active?'A little truth from my heart':'Tap to discover';});
  document.querySelector('#reason-cards').append(button);
});
config.photos.forEach((src,i)=>{if(!src)return;const slot=document.querySelector(i?'#photo-two':'#photo-one');const img=new Image();img.alt=config.photoDescriptions[i];img.onload=()=>slot.replaceChildren(img);img.src=src;});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function heart(x,y,burst=false){if(reduced)return;const el=document.createElement('span');el.className=burst?'particle burst':'particle';el.textContent=Math.random()>.5?'♡':'♥';el.style.left=`${x}px`;el.style.top=`${y}px`;el.style.fontSize=`${14+Math.random()*22}px`;el.style.setProperty('--x',`${(Math.random()-.5)*550}px`);el.style.setProperty('--y',`${-100-Math.random()*350}px`);document.querySelector('#particles').append(el);setTimeout(()=>el.remove(),burst?2100:5100);}
function celebrate(button){const r=button.getBoundingClientRect();for(let i=0;i<24;i++)heart(r.x+r.width/2,r.y+r.height/2,true);}
document.querySelector('#open').addEventListener('click',()=>{document.querySelector('#opening').hidden=true;document.querySelector('#main').hidden=false;window.scrollTo(0,0);document.querySelector('#sound').focus({preventScroll:true});celebrate(document.querySelector('.hero .primary'));});
let tries=0;const peace=document.querySelector('#peace-answer');
document.querySelector('#yes').addEventListener('click',()=>{const lines=['Fair. You don’t have to stop being upset just because I made a website. I’m listening. ♡','Can I offer one sincere apology and a very long hug? No pressure.','Take your time, my love. I still choose you, even on the grumpy days.'];peace.textContent=lines[Math.min(tries++,lines.length-1)];document.querySelector('#yes').textContent=tries===1?'Still a tiny bit 😤':'I need a little time ♡';});
document.querySelector('#no').addEventListener('click',event=>{peace.textContent='Come here, my love. Virtual hug now. A real one as soon as I can. ♡';celebrate(event.currentTarget);});
document.querySelector('#reveal-letter').addEventListener('click',event=>{const el=document.querySelector('#letter-content');el.hidden=!el.hidden;event.currentTarget.setAttribute('aria-expanded',String(!el.hidden));event.currentTarget.textContent=el.hidden?'Read my heart':'Fold the letter';});
document.querySelector('#hug').addEventListener('click',event=>{celebrate(event.currentTarget);document.querySelector('#hug-answer').textContent='आज पनि, भोलि पनि — तिमी नै। You’re my favourite, always. ♡';});
// Original, gentle synth notes. Sound starts only when the visitor asks for it.
let audioContext,timer,playing=false,step=0;const notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23];
function playNote(){if(!playing||document.hidden)return;const osc=audioContext.createOscillator(),gain=audioContext.createGain(),now=audioContext.currentTime;osc.type='sine';osc.frequency.value=notes[step++%notes.length];gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.045,now+.08);gain.gain.exponentialRampToValueAtTime(.001,now+1.5);osc.connect(gain);gain.connect(audioContext.destination);osc.start(now);osc.stop(now+1.6);}
document.querySelector('#sound').addEventListener('click',async event=>{const button=event.currentTarget;try{if(!audioContext)audioContext=new(window.AudioContext||window.webkitAudioContext)();await audioContext.resume();playing=!playing;button.setAttribute('aria-pressed',String(playing));button.textContent=playing?'♫ Sound on':'♫ Sound off';if(playing){playNote();timer=setInterval(playNote,900);}else{clearInterval(timer);await audioContext.suspend();}}catch{button.textContent='Sound unavailable';button.disabled=true;}});
if(!reduced)setInterval(()=>{if(!document.hidden)heart(Math.random()*innerWidth,innerHeight+20);},1100);
