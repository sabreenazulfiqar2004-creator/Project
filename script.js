(function(){
'use strict';
const QUESTIONS={
'Computer Science':[
['What does HTML stand for?',['Hyper Text Markup Language','High Tech Modern Language','Hyperlink Text Mode Language','Home Tool Markup Language'],0],
['Which language is used to style web pages?',['HTML','CSS','Python','SQL'],1],
['What does CPU stand for?',['Central Process Unit','Computer Personal Unit','Central Processing Unit','Core Program Unit'],2],
['Which data structure works on First In, First Out?',['Stack','Queue','Tree','Graph'],1],
['What does RAM stand for?',['Random Access Memory','Read Always Memory','Rapid Access Module','Run All Memory'],0],
['Which of these is a database language?',['CSS','SQL','XML','PHP'],1],
['What is 1 byte equal to?',['4 bits','16 bits','8 bits','10 bits'],2],
['Which symbol starts a single-line comment in JavaScript?',['//','##','<!--','**'],0],
['What does HTTP stand for?',['HyperText Transfer Protocol','High Transfer Text Process','Hyper Tool Transfer Program','Host Text Transfer Protocol'],0],
['Which is an operating system?',['Chrome','Linux','Python','Java'],1]],
'General Knowledge':[
['What is the capital of Japan?',['Seoul','Beijing','Tokyo','Bangkok'],2],
['Which planet is known as the Red Planet?',['Venus','Mars','Jupiter','Mercury'],1],
['How many continents are there?',['5','6','8','7'],3],
['Who painted the Mona Lisa?',['Leonardo da Vinci','Picasso','Van Gogh','Michelangelo'],0],
['Which is the largest ocean?',['Atlantic','Indian','Pacific','Arctic'],2],
['What is the longest river in Africa?',['Congo','Nile','Niger','Zambezi'],1],
['How many days are in a leap year?',['365','364','367','366'],3],
['Which country gifted the Statue of Liberty to the USA?',['France','England','Spain','Italy'],0],
['What is the smallest country in the world?',['Monaco','Malta','Vatican City','San Marino'],2],
['Which language has the most native speakers?',['English','Mandarin Chinese','Spanish','Hindi'],1]],
'Mathematics':[
['What is 12 × 12?',['124','144','132','154'],1],
['What is the square root of 81?',['7','8','9','10'],2],
['What is the value of π (approx.)?',['3.14','2.17','4.13','3.41'],0],
['What is 15% of 200?',['20','25','35','30'],3],
['How many degrees are in a right angle?',['45','90','180','60'],1],
['What is 7³?',['243','343','49','21'],1],
['Which number is prime?',['21','27','29','33'],2],
['Solve: 3x + 5 = 20. What is x?',['5','4','6','15'],0],
['How many sides does a hexagon have?',['5','8','7','6'],3],
['What is 1000 ÷ 8?',['125','120','150','80'],0]],
'Science':[
['What gas do plants absorb from the air?',['Oxygen','Carbon dioxide','Nitrogen','Helium'],1],
['What is the chemical symbol for water?',['O2','CO2','H2O','HO'],2],
['Which planet is closest to the Sun?',['Mercury','Venus','Earth','Mars'],0],
['What is the hardest natural substance?',['Gold','Iron','Quartz','Diamond'],3],
['How many bones are in the adult human body?',['206','210','196','300'],0],
['What force keeps us on the ground?',['Magnetism','Friction','Gravity','Inertia'],2],
['Which blood cells carry oxygen?',['White cells','Red cells','Platelets','Plasma'],1],
['What is the center of an atom called?',['Electron','Nucleus','Proton ring','Orbit'],1],
['Which organ pumps blood around the body?',['Lungs','Liver','Brain','Heart'],3],
['What is the speed of light closest to?',['300,000 km/s','30,000 km/s','3,000 km/s','150,000 km/s'],0]]
};
const TOTAL_SECONDS=15*60,LETTERS=['A','B','C','D'];
const $=id=>document.getElementById(id);
let category='Computer Science',qs=[],answers=[],idx=0,left=TOTAL_SECONDS,tick=null,name='';
function show(n){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$('screen-'+n).classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
const pad=n=>String(n).padStart(2,'0');

$('welcome-start').onclick=()=>show('setup');
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>show(b.dataset.back));
document.querySelectorAll('.category').forEach(c=>c.onclick=()=>{
  document.querySelectorAll('.category').forEach(x=>x.classList.remove('selected'));
  c.classList.add('selected');category=c.dataset.category});
$('setup-continue').onclick=()=>{name=$('player-name').value.trim();$('brief-category').textContent=category;show('instructions')};
$('begin-quiz').onclick=startQuiz;

function startQuiz(){
  qs=shuffle(QUESTIONS[category]).map(q=>{
    const order=shuffle([0,1,2,3]);
    return{q:q[0],opts:order.map(i=>q[1][i]),a:order.indexOf(q[2])}});
  answers=Array(qs.length).fill(null);idx=0;left=TOTAL_SECONDS;
  $('quiz-category-title').textContent=category;
  clearInterval(tick);updateTimer();
  tick=setInterval(()=>{left--;updateTimer();if(left<=0){clearInterval(tick);finish(true)}},1000);
  render();show('quiz');
}
function updateTimer(){$('timer').textContent=fmt(Math.max(left,0));$('timer').closest('.timer').classList.toggle('low',left<=60)}
function render(){
  const q=qs[idx],n=qs.length;
  $('question-text').textContent=q.q;
  $('question-counter').innerHTML='QUESTION '+pad(idx+1)+' <i>OF '+n+'</i>';
  const pct=Math.round((idx+1)/n*100);
  $('progress-label').textContent=pct+'% completed';$('progress-bar').style.width=pct+'%';
  const box=$('options-container');box.innerHTML='';
  q.opts.forEach((t,i)=>{
    const b=document.createElement('button');b.type='button';
    b.className='option'+(answers[idx]===i?' selected':'');
    b.innerHTML='<span class="letter">'+LETTERS[i]+'</span><span></span>';
    b.lastChild.textContent=t;
    b.onclick=()=>{answers[idx]=i;$('quiz-feedback').textContent='';render()};
    box.appendChild(b)});
  $('answered-count').textContent=answers.filter(a=>a!==null).length+' of '+n+' answered';
  $('prev-btn').style.visibility=idx===0?'hidden':'visible';
  const last=idx===n-1;
  $('next-btn').classList.toggle('hidden',last);$('submit-btn').classList.toggle('hidden',!last);
}
$('prev-btn').onclick=()=>{if(idx>0){idx--;render()}};
$('next-btn').onclick=()=>{
  if(answers[idx]===null){$('quiz-feedback').textContent='Please choose an answer to continue.';return}
  $('quiz-feedback').textContent='';idx++;render()};
$('submit-btn').onclick=()=>{
  const un=answers.filter(a=>a===null).length;
  if(un&&!confirm(un+' question(s) unanswered. Finish anyway?'))return;
  finish(false)};

function finish(timeUp){
  clearInterval(tick);
  const n=qs.length;
  const correct=answers.filter((a,i)=>a===qs[i].a).length;
  const un=answers.filter(a=>a===null).length,wrong=n-correct-un;
  const pct=Math.round(correct/n*100);
  $('score').textContent=correct;$('correct-count').textContent=correct;
  $('wrong-count').textContent=wrong;$('unanswered-count').textContent=un;
  $('percentage').textContent=pct+'%';
  $('result-category').textContent='Category: '+category;
  document.querySelector('.score-ring').style.setProperty('--pct',pct);
  const who=name?', '+name:'';
  let title,label,sub;
  if(pct>=80){title='Outstanding'+who+'!';label='Brilliant work!';sub='You really know your stuff.'}
  else if(pct>=50){title='Nice job'+who+'!';label='Solid effort!';sub='A little more practice and you will ace it.'}
  else{title='Good try'+who+'!';label='Keep learning!';sub='Your next attempt can be even better.'}
  $('result-title').textContent=title;$('score-label').textContent=label;$('score-subtitle').textContent=sub;
  $('result-message').textContent=timeUp?"Time's up! Here is how you did.":'Every question is a chance to learn something new.';
  const rc=$('review-container');rc.innerHTML='';
  qs.forEach((q,i)=>{
    const ok=answers[i]===q.a,d=document.createElement('div');
    d.className='review-item'+(ok?' right':'');
    const b=document.createElement('b'),p1=document.createElement('p'),p2=document.createElement('p');
    b.textContent=(i+1)+'. '+q.q;
    p1.innerHTML='Your answer: <em></em>';p1.lastChild.textContent=answers[i]===null?'Not answered':q.opts[answers[i]];
    d.append(b,p1);
    if(!ok){p2.innerHTML='Correct answer: <em></em>';p2.lastChild.textContent=q.opts[q.a];d.append(p2)}
    rc.appendChild(d)});
  rc.classList.add('hidden');$('review-toggle').textContent='Show answers ↓';
  show('results');
}
$('review-toggle').onclick=()=>{
  const rc=$('review-container'),h=rc.classList.toggle('hidden');
  $('review-toggle').textContent=h?'Show answers ↓':'Hide answers ↑'};
$('restart-btn').onclick=startQuiz;
$('change-category').onclick=()=>show('setup');
})();
