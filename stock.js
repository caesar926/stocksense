let stock=[
  {id:1,name:"Indomie Noodles",qty:8,minQty:10,buyPrice:150,sellPrice:200,category:"Food",expiry:"2025-12-01",sales:42},
  {id:2,name:"Peak Milk (tin)",qty:15,minQty:5,buyPrice:800,sellPrice:1000,category:"Food",expiry:"2026-03-15",sales:18},
  {id:3,name:"Milo 400g",qty:3,minQty:5,buyPrice:1800,sellPrice:2200,category:"Food",expiry:"2026-01-20",sales:6},
  {id:4,name:"Omo Detergent (1kg)",qty:20,minQty:8,buyPrice:900,sellPrice:1200,category:"Household",expiry:null,sales:12},
  {id:5,name:"Close-Up Toothpaste",qty:12,minQty:6,buyPrice:450,sellPrice:600,category:"Personal Care",expiry:null,sales:9},
  {id:6,name:"Cabin Biscuit",qty:2,minQty:10,buyPrice:250,sellPrice:350,category:"Food",expiry:"2025-11-30",sales:35},
  {id:7,name:"Malta Guinness (crate)",qty:6,minQty:3,buyPrice:2400,sellPrice:3000,category:"Drinks",expiry:"2025-12-20",sales:22},
  {id:8,name:"Vaseline 400ml",qty:9,minQty:4,buyPrice:700,sellPrice:950,category:"Personal Care",expiry:null,sales:7}
];
const SALES=[{day:"Mon",sales:4200},{day:"Tue",sales:2800},{day:"Wed",sales:5100},{day:"Thu",sales:3900},{day:"Fri",sales:6200},{day:"Sat",sales:7800},{day:"Sun",sales:3100}];
let activeSellId=null;

const fmt=n=>"₦"+Number(n).toLocaleString();
const isLow=i=>i.qty<=i.minQty;
const isExpired=i=>i.expiry&&new Date(i.expiry)<new Date();
const isExpiringSoon=i=>{if(!i.expiry)return false;const d=(new Date(i.expiry)-new Date())/86400000;return d>0&&d<=30;};
const profit=i=>(i.sellPrice-i.buyPrice)*i.sales;
const margin=i=>(((i.sellPrice-i.buyPrice)/i.buyPrice)*100).toFixed(0);
const bdg=(t,c)=>`<span class="badge" style="background:${c}18;color:${c}">${t}</span>`;

function showToast(msg,color='#00a651'){const t=document.getElementById('toast');t.textContent=msg;t.style.background=color;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500);}

function switchTab(id){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  document.getElementById('nav-'+id).classList.add('active');
  if(id==='restock')renderRestock();
  if(id==='profit')renderProfit();
  if(id==='score')renderScore();
}

function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}

function renderStock(search=''){
  const low=stock.filter(isLow).length;
  const exp=stock.filter(isExpiringSoon).length;
  const val=stock.reduce((s,i)=>s+i.qty*i.buyPrice,0);
  document.getElementById('stockStats').innerHTML=`
    <div class="stat-card"><div class="stat-label">Total Products</div><div class="stat-value" style="color:var(--blue)">${stock.length}</div><div class="stat-sub">in inventory</div></div>
    <div class="stat-card"><div class="stat-label">Stock Value</div><div class="stat-value" style="color:var(--navy)">${fmt(val)}</div><div class="stat-sub">buying cost</div></div>
    <div class="stat-card"><div class="stat-label">Low Stock</div><div class="stat-value" style="color:${low>0?'var(--red)':'var(--green)'}">${low}</div><div class="stat-sub">need restocking</div></div>
    <div class="stat-card"><div class="stat-label">Expiring Soon</div><div class="stat-value" style="color:${exp>0?'var(--amber)':'var(--green)'}">${exp}</div><div class="stat-sub">within 30 days</div></div>`;
  const a=document.getElementById('headerAlert');
  a.style.color=low>0?'#ff8c8c':'#6ee7b7';
  a.textContent=low>0?`⚠️ ${low} items low`:'✅ All good';
  const nb=document.getElementById('lowBadge');
  if(low>0){nb.style.display='flex';nb.textContent=low;}else nb.style.display='none';
  const q=search.toLowerCase();
  document.getElementById('productList').innerHTML=stock.filter(i=>i.name.toLowerCase().includes(q)).map(item=>{
    const lo=isLow(item),ex=isExpired(item),so=isExpiringSoon(item);
    return`<div class="product-card ${lo?'low':(so||ex)?'expiring':''}">
      <div style="flex:1;min-width:0">
        <div class="product-name">${item.name}</div>
        <div class="product-badges">${bdg(item.category,'#0057b8')}${lo?bdg('Low Stock','#e63946'):''}${so?bdg('Expiring Soon','#f4a261'):''}${ex?bdg('Expired','#e63946'):''}</div>
        <div class="product-meta">Buy: ${fmt(item.buyPrice)} · Sell: ${fmt(item.sellPrice)} · Margin: ${margin(item)}%</div>
      </div>
      <div style="margin-left:12px;text-align:right;flex-shrink:0">
        <div class="product-qty" style="color:${lo?'var(--red)':'var(--navy)'}">${item.qty}</div>
        <div class="product-qty-label">units left</div>
        <button class="btn btn-green btn-sm" style="margin-top:6px" onclick="openSell(${item.id})">Record Sale</button>
      </div>
    </div>`;}).join('');
}

function addProduct(){
  const name=document.getElementById('f-name').value.trim();
  const qty=+document.getElementById('f-qty').value;
  const min=+document.getElementById('f-min').value||5;
  const buy=+document.getElementById('f-buy').value;
  const sell=+document.getElementById('f-sell').value;
  const cat=document.getElementById('f-cat').value;
  const exp=document.getElementById('f-exp').value;
  if(!name||!qty||!buy||!sell)return showToast('Fill all required fields','#e63946');
  stock.push({id:Date.now(),name,qty,minQty:min,buyPrice:buy,sellPrice:sell,category:cat,expiry:exp||null,sales:0});
  ['f-name','f-qty','f-min','f-buy','f-sell','f-exp'].forEach(id=>document.getElementById(id).value='');
  closeModal('addModal');
  renderStock(document.getElementById('searchInput').value);
  showToast('Product added successfully');
}

function openSell(id){
  activeSellId=id;
  const item=stock.find(i=>i.id===id);
  document.getElementById('s-qty').value=1;
  document.getElementById('sellModalSub').textContent=`${item.name} · ${item.qty} units available`;
  updateSellPreview();
  openModal('sellModal');
}

function updateSellPreview(){
  const item=stock.find(i=>i.id===activeSellId);
  if(!item)return;
  const q=+document.getElementById('s-qty').value||1;
  document.getElementById('sellPreview').innerHTML=`
    <div class="preview-line"><span style="color:var(--text2)">Revenue</span><span style="font-weight:700;color:var(--green)">${fmt(item.sellPrice*q)}</span></div>
    <div class="preview-line"><span style="color:var(--text2)">Profit</span><span style="font-weight:700;color:var(--navy)">${fmt((item.sellPrice-item.buyPrice)*q)}</span></div>`;
}

function confirmSale(){
  const item=stock.find(i=>i.id===activeSellId);
  const q=+document.getElementById('s-qty').value;
  if(!q||q<1||q>item.qty)return showToast('Invalid quantity','#e63946');
  item.qty-=q;item.sales+=q;
  closeModal('sellModal');
  renderStock(document.getElementById('searchInput').value);
  showToast(`Sale recorded — ${fmt(item.sellPrice*q)} earned`);
}

function renderRestock(){
  const low=stock.filter(isLow);
  const exp=stock.filter(i=>isExpiringSoon(i)||isExpired(i));
  let alerts='';
  if(low.length)alerts+=`<div class="alert-card alert-red"><div class="alert-title" style="color:var(--red)">⚠️ ${low.length} products need restocking</div>${low.map(i=>`<div class="alert-row"><span>${i.name}</span><span style="color:var(--red);font-weight:700">${i.qty} left (min ${i.minQty})</span></div>`).join('')}</div>`;
  if(exp.length)alerts+=`<div class="alert-card alert-amber"><div class="alert-title" style="color:var(--amber)">📅 ${exp.length} products expiring soon</div>${exp.map(i=>`<div class="alert-row"><span>${i.name}</span>${bdg(isExpired(i)?'Expired':`Exp: ${i.expiry}`,'#f4a261')}</div>`).join('')}</div>`;
  document.getElementById('restockAlerts').innerHTML=alerts;
  const top=[...stock].sort((a,b)=>b.sales-a.sales).slice(0,3);
  document.getElementById('topSellersList').innerHTML=top.map((i,idx)=>`
    <div class="seller-row">
      <div class="seller-rank">${idx+1}</div>
      <div class="seller-info"><div class="seller-name">${i.name}</div><div class="seller-meta">${i.sales} units sold · ${margin(i)}% margin</div></div>
      <div class="seller-profit">${fmt(profit(i))}</div>
    </div>`).join('');
}

async function getRestockAdvice(){
  const summary=stock.map(i=>`${i.name}: qty=${i.qty}, min=${i.minQty}, sales=${i.sales}, margin=${margin(i)}%, expiry=${i.expiry||'none'}`).join('\n');
  document.getElementById('restockAI').innerHTML=`<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div style="text-align:center;font-size:13px;color:var(--text2);padding-bottom:12px">Analysing your stock patterns...</div>`;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:`You are a smart business advisor for a Nigerian small shop owner. Based on this stock data, give 4 specific, actionable restocking recommendations in JSON format only. No markdown, no preamble.\n\nStock data:\n${summary}\n\nReturn this exact JSON:\n[\n{"product":"name","action":"Restock Now|Restock Soon|Reduce Order|Stop Stocking","urgency":"high|medium|low","advice":"one sentence","qty":"number"}\n]`}]})});
    const data=await res.json();
    const text=data.content.map(b=>b.text||'').join('');
    const items=JSON.parse(text.replace(/```json|```/g,'').trim());
    const uc={high:'#e63946',medium:'#f4a261',low:'#00a651'};
    document.getElementById('restockAI').innerHTML=items.map(a=>`<div class="ai-result-item"><div class="ai-result-header"><div class="ai-result-name">${a.product}</div>${bdg(a.action,uc[a.urgency]||'#0057b8')}</div><div class="ai-result-advice">${a.advice}</div>${a.qty?`<div class="ai-result-qty">Suggested restock: ${a.qty} units</div>`:''}</div>`).join('')+`<button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="getRestockAdvice()">Refresh Advice</button>`;
  }catch{
    document.getElementById('restockAI').innerHTML=`<div class="ai-result-item"><div class="ai-result-advice">Based on your data, Cabin Biscuit and Indomie Noodles are your fastest sellers and both need urgent restocking this week. Consider reducing Milo orders — it has low turnover relative to stock.</div></div><button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="getRestockAdvice()">Try Again</button>`;
  }
}

function renderProfit(){
  const rev=stock.reduce((s,i)=>s+i.sellPrice*i.sales,0);
  const cost=stock.reduce((s,i)=>s+i.buyPrice*i.sales,0);
  const prof=rev-cost;
  const marg=rev>0?((prof/rev)*100).toFixed(1):0;
  const weekR=SALES.reduce((s,d)=>s+d.sales,0);
  document.getElementById('profitStats').innerHTML=`
    <div class="stat-card"><div class="stat-label">Total Revenue</div><div class="stat-value" style="color:var(--green)">${fmt(rev)}</div><div class="stat-sub">all time</div></div>
    <div class="stat-card"><div class="stat-label">Total Profit</div><div class="stat-value" style="color:var(--navy)">${fmt(prof)}</div><div class="stat-sub">after cost</div></div>
    <div class="stat-card"><div class="stat-label">Profit Margin</div><div class="stat-value" style="color:var(--blue)">${marg}%</div><div class="stat-sub">overall</div></div>
    <div class="stat-card"><div class="stat-label">This Week</div><div class="stat-value" style="color:var(--amber)">${fmt(weekR)}</div><div class="stat-sub">estimated</div></div>`;
  const maxS=Math.max(...SALES.map(d=>d.sales));
  document.getElementById('chartBars').innerHTML=SALES.map(d=>`<div class="chart-col"><div class="chart-val">${(d.sales/1000).toFixed(1)}k</div><div class="chart-bar" style="height:${(d.sales/maxS)*75}px;background:${d.day==='Sat'?'var(--navy)':'linear-gradient(180deg,var(--blue),var(--navy))'}"></div><div class="chart-day">${d.day}</div></div>`).join('');
  const sorted=[...stock].sort((a,b)=>profit(b)-profit(a)).slice(0,5);
  document.getElementById('profitBars').innerHTML=sorted.map((item,i)=>{const pct=prof>0?(profit(item)/prof*100):0;return`<div class="profit-item"><div class="profit-item-header"><span class="profit-item-name">${item.name}</span><span class="profit-item-val">${fmt(profit(item))}</span></div><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${i===0?'var(--navy)':'var(--blue)'}"></div></div><div class="profit-item-meta">${pct.toFixed(0)}% of total profit · ${margin(item)}% margin</div></div>`;}).join('');
  document.getElementById('costTable').innerHTML=[{label:'Total Revenue',val:rev,color:'var(--green)'},{label:'Cost of Goods',val:cost,color:'var(--red)'},{label:'Net Profit',val:prof,color:'var(--navy)'}].map(r=>`<div class="cost-row"><span class="cost-label">${r.label}</span><span class="cost-val" style="color:${r.color}">${fmt(r.val)}</span></div>`).join('');
}

function renderScore(){
  const n=stock.length,low=stock.filter(isLow).length,ex=stock.filter(isExpired).length;
  const ts=stock.reduce((s,i)=>s+i.sales,0);
  const rev=stock.reduce((s,i)=>s+i.sellPrice*i.sales,0);
  const cost=stock.reduce((s,i)=>s+i.buyPrice*i.sales,0);
  const pr=rev>0?(rev-cost)/rev:0;
  const sigs={stockConsistency:Math.max(0,100-(low/n)*100),salesDiscipline:Math.min(100,(ts/(n*5))*100),profitTrajectory:Math.min(100,pr*200),restockEfficiency:Math.max(0,100-(low*15)),lossManagement:Math.max(0,100-(ex*25))};
  const labels={stockConsistency:'Stock Consistency',salesDiscipline:'Sales Discipline',profitTrajectory:'Profit Trajectory',restockEfficiency:'Restock Efficiency',lossManagement:'Loss Management'};
  const score=Math.round(Object.values(sigs).reduce((a,b)=>a+b,0)/5);
  const col=score>=70?'#00a651':score>=40?'#f4a261':'#e63946';
  const lbl=score>=70?'Good Standing':score>=40?'Needs Improvement':'At Risk';
  const C=2*Math.PI*56,dash=(score/100)*C;
  document.getElementById('scoreArc').setAttribute('stroke',col);
  document.getElementById('scoreArc').setAttribute('stroke-dasharray',`${dash} ${C}`);
  document.getElementById('scoreArc').setAttribute('stroke-dashoffset',C*0.25);
  document.getElementById('scoreNumber').textContent=score;
  document.getElementById('scoreNumber').style.color=col;
  document.getElementById('scoreLabel').innerHTML=bdg(lbl,col);
  document.getElementById('scoreCaption').textContent=score>=70?'You may be eligible for OPay business loans.':score>=40?'Keep improving to unlock credit eligibility.':'Focus on consistency to build your score.';
  document.getElementById('signalBars').innerHTML=Object.entries(labels).map(([key,name])=>{const v=Math.round(sigs[key]);const c=v>=70?'#00a651':v>=40?'#f4a261':'#e63946';return`<div class="signal-row"><div class="signal-header"><span class="signal-name">${name}</span><span class="signal-val" style="color:${c}">${v}/100</span></div><div class="bar-track"><div class="bar-fill" style="width:${v}%;background:${c}"></div></div></div>`;}).join('');
  document.getElementById('loanCard').innerHTML=score>=70?`<div class="loan-card alert-green"><div class="loan-title" style="color:var(--green)">✅ Loan Eligible</div><div class="loan-text">Your ShopScore qualifies you to apply for an OPay business loan. Share your score with any lender as proof of your business health.</div><button class="btn btn-green btn-full" style="margin-top:10px" onclick="showToast('ShopScore shared! Present this to your lender.')">Share My ShopScore</button></div>`:`<div class="loan-card alert-amber"><div class="loan-title" style="color:var(--amber)">⏳ Building Eligibility</div><div class="loan-text">You need a score of 70+ for loan eligibility. You are ${70-score} points away. Consistent record-keeping will get you there.</div></div>`;
  window._scoreData={score,signals:sigs,totalSales:ts,profitRatioPct:(pr*100).toFixed(1)+'%'};
}

async function getScoreInsight(){
  const d=window._scoreData||{};
  document.getElementById('scoreAI').innerHTML=`<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div style="text-align:center;font-size:13px;color:var(--text2);padding-bottom:12px">Analysing your business profile...</div>`;
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:`You are a financial advisor for a Nigerian small shop owner. Based on this ShopScore data: ${JSON.stringify(d)}\n\nWrite a 3-sentence plain-English assessment of their business health and what they should do to improve their score and become eligible for a business loan. Be specific, encouraging, and practical. No markdown, no headers, just plain text.`}]})});
    const data=await res.json();
    const text=data.content.map(b=>b.text||'').join('');
    document.getElementById('scoreAI').innerHTML=`<div class="ai-insight">${text}</div><button class="btn btn-ghost btn-full" style="margin-top:10px" onclick="getScoreInsight()">Refresh Assessment</button>`;
  }catch{
    document.getElementById('scoreAI').innerHTML=`<div class="ai-insight">Your ShopScore shows a business with real potential and some clear areas to strengthen. Focus on restocking before items run out and recording every sale consistently — these two habits alone will significantly move your score. Keep it up and you will unlock OPay loan eligibility within weeks of consistent use.</div><button class="btn btn-ghost btn-full" style="margin-top:10px" onclick="getScoreInsight()">Try Again</button>`;
  }
}

renderStock();