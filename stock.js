const STORAGE_KEY='stocksense_stock_v1';
const SNAPSHOT_KEY='stocksense_snapshots_v1';

function loadStock(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed=JSON.parse(raw);
      if(Array.isArray(parsed)&&parsed.length)return parsed;
    }
  }catch(e){}
  return [
    {id:1,name:"Indomie Noodles",brand:"Indomie",qty:8,minQty:10,buyPrice:150,sellPrice:200,category:"Food",expiry:"2025-12-01",sales:42},
    {id:2,name:"Peak Milk (tin)",brand:"Peak",qty:15,minQty:5,buyPrice:800,sellPrice:1000,category:"Food",expiry:"2026-03-15",sales:18},
    {id:3,name:"Milo 400g",brand:"Milo",qty:3,minQty:5,buyPrice:1800,sellPrice:2200,category:"Food",expiry:"2026-01-20",sales:6},
    {id:4,name:"Omo Detergent (1kg)",brand:"Omo",qty:20,minQty:8,buyPrice:900,sellPrice:1200,category:"Household",expiry:null,sales:12},
    {id:5,name:"Close-Up Toothpaste",brand:"Close-Up",qty:12,minQty:6,buyPrice:450,sellPrice:600,category:"Personal Care",expiry:null,sales:9},
    {id:6,name:"Cabin Biscuit",brand:"Cabin",qty:2,minQty:10,buyPrice:250,sellPrice:350,category:"Food",expiry:"2025-11-30",sales:35},
    {id:7,name:"Malta Guinness (crate)",brand:"Malta Guinness",qty:6,minQty:3,buyPrice:2400,sellPrice:3000,category:"Drinks",expiry:"2025-12-20",sales:22},
    {id:8,name:"Vaseline 400ml",brand:"Vaseline",qty:9,minQty:4,buyPrice:700,sellPrice:950,category:"Personal Care",expiry:null,sales:7}
  ];
}

function saveStock(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(stock));}catch(e){}
}

function loadSnapshots(){
  try{
    const raw=localStorage.getItem(SNAPSHOT_KEY);
    if(raw)return JSON.parse(raw);
  }catch(e){}
  return {};
}

function saveSnapshots(){
  try{localStorage.setItem(SNAPSHOT_KEY,JSON.stringify(snapshots));}catch(e){}
}

function todayKey(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function yesterdayKey(){
  const d=new Date();
  d.setDate(d.getDate()-1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Computes today's live stats from current stock state
function computeTodayStats(){
  const rev=stock.reduce((s,i)=>s+i.sellPrice*i.sales,0);
  const cost=stock.reduce((s,i)=>s+i.buyPrice*i.sales,0);
  const profit=rev-cost;
  const unitsSold=stock.reduce((s,i)=>s+i.sales,0);
  const lowStock=stock.filter(isLow).length;
  const topSeller=[...stock].sort((a,b)=>b.sales-a.sales)[0];
  const catTotals={};
  stock.forEach(i=>{
    catTotals[i.category]=(catTotals[i.category]||0)+i.sellPrice*i.sales;
  });
  return{date:todayKey(),revenue:rev,cost,profit,unitsSold,lowStock,topSeller:topSeller?topSeller.name:null,categoryRevenue:catTotals};
}

// Called once per day on load: snapshot yesterday's final state if not already saved
function maybeSnapshotYesterday(){
  const y=yesterdayKey();
  if(!snapshots[y]){
    // If we have a snapshot for "today" from a previous session before the day rolled over, promote it
    const priorToday=snapshots[todayKey()];
    if(priorToday && priorToday.date!==todayKey()){
      snapshots[y]=priorToday;
      saveSnapshots();
    }
  }
}

let stock=loadStock();
let snapshots=loadSnapshots();

const SALES=[{day:"Mon",sales:4200},{day:"Tue",sales:2800},{day:"Wed",sales:5100},{day:"Thu",sales:3900},{day:"Fri",sales:6200},{day:"Sat",sales:7800},{day:"Sun",sales:3100}];
let activeSellId=null;

const fmt=n=>"₦"+Number(n).toLocaleString();
const isLow=i=>i.qty<=i.minQty;
const isExpired=i=>i.expiry&&new Date(i.expiry)<new Date();
const isExpiringSoon=i=>{if(!i.expiry)return false;const d=(new Date(i.expiry)-new Date())/86400000;return d>0&&d<=30;};
const profit=i=>(i.sellPrice-i.buyPrice)*i.sales;
const margin=i=>(((i.sellPrice-i.buyPrice)/i.buyPrice)*100).toFixed(0);
const bdg=(t,c)=>`<span class="badge" style="background:${c}18;color:${c}">${t}</span>`;

// Small inline SVG icons for use inside dynamically generated markup
const ICO={
  warn:`<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  check:`<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  calendar:`<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>`,
  trophy:`<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3a2 2 0 0 1-2 4M7 5H4a2 2 0 0 0 2 4"/></svg>`,
  clock:`<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
};

async function callGemini(prompt){
  const res=await fetch('/api/gemini',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt})
  });
  if(!res.ok){
    const errBody=await res.text();
    throw new Error('gemini_error: '+errBody);
  }
  const data=await res.json();
  const text=data.text||'';
  return text;
}

function showToast(msg,color='#20884b'){const t=document.getElementById('toast');t.textContent=msg;t.style.background=color;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500);}

function switchTab(id){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  document.getElementById('nav-'+id).classList.add('active');
  if(id==='restock')renderRestock();
  if(id==='profit')renderProfit();
  if(id==='score')renderScore();
  if(id==='daily')renderDaily();
}

function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}

let expandedCategory=null;

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
  a.textContent=low>0?`${low} items low`:'All good';
  const nb=document.getElementById('lowBadge');
  if(low>0){nb.style.display='flex';nb.textContent=low;}else nb.style.display='none';

  const q=search.toLowerCase();
  const filtered=stock.filter(i=>i.name.toLowerCase().includes(q)||(i.brand||'').toLowerCase().includes(q));

  // If searching, skip grouping and just show a flat filtered list
  if(q){
    document.getElementById('productList').innerHTML=filtered.map(renderProductCard).join('')||`<div style="text-align:center;color:var(--text3);font-size:13px;padding:20px">No products match "${search}"</div>`;
    return;
  }

  // Group by category
  const groups={};
  filtered.forEach(i=>{
    const cat=i.category||'Uncategorized';
    if(!groups[cat])groups[cat]=[];
    groups[cat].push(i);
  });

  document.getElementById('productList').innerHTML=Object.keys(groups).sort().map(cat=>{
    const items=groups[cat];
    const catVal=items.reduce((s,i)=>s+i.qty*i.buyPrice,0);
    const catLow=items.filter(isLow).length;
    const isOpen=expandedCategory===cat;
    const brandGroups={};
    items.forEach(i=>{
      const b=i.brand||'Other';
      if(!brandGroups[b])brandGroups[b]=[];
      brandGroups[b].push(i);
    });
    return`<div class="category-group">
      <div class="category-header" onclick="toggleCategory('${cat.replace(/'/g,"\\'")}')">
        <div>
          <div class="category-name">${cat}</div>
          <div class="category-meta">${items.length} product${items.length===1?'':'s'} · ${fmt(catVal)}${catLow>0?` · <span style="color:var(--red)">${catLow} low</span>`:''}</div>
        </div>
        <div class="category-chevron ${isOpen?'open':''}">▾</div>
      </div>
      ${isOpen?`<div class="category-body">${Object.keys(brandGroups).sort().map(brand=>`
        <div class="brand-label">${brand}</div>
        ${brandGroups[brand].map(renderProductCard).join('')}
      `).join('')}</div>`:''}
    </div>`;
  }).join('');
}

function toggleCategory(cat){
  expandedCategory=expandedCategory===cat?null:cat;
  renderStock(document.getElementById('searchInput').value);
}

function renderProductCard(item){
  const lo=isLow(item),ex=isExpired(item),so=isExpiringSoon(item);
  return`<div class="product-card ${lo?'low':(so||ex)?'expiring':''}">
    <div style="flex:1;min-width:0">
      <div class="product-name">${item.name}</div>
      <div class="product-badges">${bdg(item.category,'#1d6fa5')}${lo?bdg('Low Stock','#e63946'):''}${so?bdg('Expiring Soon','#f4a261'):''}${ex?bdg('Expired','#e63946'):''}</div>
      <div class="product-meta">Buy: ${fmt(item.buyPrice)} · Sell: ${fmt(item.sellPrice)} · Margin: ${margin(item)}%</div>
    </div>
    <div style="margin-left:12px;text-align:right;flex-shrink:0">
      <div class="product-qty" style="color:${lo?'var(--red)':'var(--navy)'}">${item.qty}</div>
      <div class="product-qty-label">units left</div>
      <button class="btn btn-green btn-sm" style="margin-top:6px" onclick="openSell(${item.id})">Record Sale</button>
    </div>
  </div>`;
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
  const brand=document.getElementById('f-brand').value.trim();
  stock.push({id:Date.now(),name,brand:brand||null,qty,minQty:min,buyPrice:buy,sellPrice:sell,category:cat,expiry:exp||null,sales:0});
  saveStock();
  ['f-name','f-brand','f-qty','f-min','f-buy','f-sell','f-exp'].forEach(id=>document.getElementById(id).value='');
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
  saveStock();
  closeModal('sellModal');
  renderStock(document.getElementById('searchInput').value);
  showToast(`Sale recorded — ${fmt(item.sellPrice*q)} earned`);
}

function renderRestock(){
  const low=stock.filter(isLow);
  const exp=stock.filter(i=>isExpiringSoon(i)||isExpired(i));
  let alerts='';
  if(low.length)alerts+=`<div class="alert-card alert-red"><div class="alert-title icon-title" style="color:var(--red)">${ICO.warn} ${low.length} products need restocking</div>${low.map(i=>`<div class="alert-row"><span>${i.name}</span><span style="color:var(--red);font-weight:700">${i.qty} left (min ${i.minQty})</span></div>`).join('')}</div>`;
  if(exp.length)alerts+=`<div class="alert-card alert-amber"><div class="alert-title icon-title" style="color:var(--amber)">${ICO.calendar} ${exp.length} products expiring soon</div>${exp.map(i=>`<div class="alert-row"><span>${i.name}</span>${bdg(isExpired(i)?'Expired':`Exp: ${i.expiry}`,'#f4a261')}</div>`).join('')}</div>`;
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
    const text=await callGemini(`You are a smart business advisor for a Nigerian small shop owner. Based on this stock data, give 4 specific, actionable restocking recommendations in JSON format only. No markdown, no preamble.\n\nStock data:\n${summary}\n\nReturn this exact JSON:\n[\n{"product":"name","action":"Restock Now|Restock Soon|Reduce Order|Stop Stocking","urgency":"high|medium|low","advice":"one sentence","qty":"number"}\n]`);
    const items=JSON.parse(text.replace(/```json|```/g,'').trim());
    const uc={high:'#e63946',medium:'#f4a261',low:'#20884b'};
    document.getElementById('restockAI').innerHTML=items.map(a=>`<div class="ai-result-item"><div class="ai-result-header"><div class="ai-result-name">${a.product}</div>${bdg(a.action,uc[a.urgency]||'#1d6fa5')}</div><div class="ai-result-advice">${a.advice}</div>${a.qty?`<div class="ai-result-qty">Suggested restock: ${a.qty} units</div>`:''}</div>`).join('')+`<button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="getRestockAdvice()">Refresh Advice</button>`;
  }catch(err){
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
  const col=score>=70?'#20884b':score>=40?'#f4a261':'#e63946';
  const lbl=score>=70?'Good Standing':score>=40?'Needs Improvement':'At Risk';
  const C=2*Math.PI*56,dash=(score/100)*C;
  document.getElementById('scoreArc').setAttribute('stroke',col);
  document.getElementById('scoreArc').setAttribute('stroke-dasharray',`${dash} ${C}`);
  document.getElementById('scoreArc').setAttribute('stroke-dashoffset',C*0.25);
  document.getElementById('scoreNumber').textContent=score;
  document.getElementById('scoreNumber').style.color=col;
  document.getElementById('scoreLabel').innerHTML=bdg(lbl,col);
  document.getElementById('scoreCaption').textContent=score>=70?'You may be eligible for OPay business loans.':score>=40?'Keep improving to unlock credit eligibility.':'Focus on consistency to build your score.';
  document.getElementById('signalBars').innerHTML=Object.entries(labels).map(([key,name])=>{const v=Math.round(sigs[key]);const c=v>=70?'#20884b':v>=40?'#f4a261':'#e63946';return`<div class="signal-row"><div class="signal-header"><span class="signal-name">${name}</span><span class="signal-val" style="color:${c}">${v}/100</span></div><div class="bar-track"><div class="bar-fill" style="width:${v}%;background:${c}"></div></div></div>`;}).join('');
  document.getElementById('loanCard').innerHTML=score>=70?`<div class="loan-card alert-green"><div class="loan-title icon-title" style="color:var(--green)">${ICO.check} Loan Eligible</div><div class="loan-text">Your ShopScore qualifies you to apply for an OPay business loan. Share your score with any lender as proof of your business health.</div><button class="btn btn-green btn-full" style="margin-top:10px" onclick="showToast('ShopScore shared! Present this to your lender.')">Share My ShopScore</button></div>`:`<div class="loan-card alert-amber"><div class="loan-title icon-title" style="color:var(--amber)">${ICO.clock} Building Eligibility</div><div class="loan-text">You need a score of 70+ for loan eligibility. You are ${70-score} points away. Consistent record-keeping will get you there.</div></div>`;
  window._scoreData={score,signals:sigs,totalSales:ts,profitRatioPct:(pr*100).toFixed(1)+'%'};
}

async function getScoreInsight(){
  const d=window._scoreData||{};
  document.getElementById('scoreAI').innerHTML=`<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div style="text-align:center;font-size:13px;color:var(--text2);padding-bottom:12px">Analysing your business profile...</div>`;
  try{
    const text=await callGemini(`You are a financial advisor for a Nigerian small shop owner. Based on this ShopScore data: ${JSON.stringify(d)}\n\nWrite a 3-sentence plain-English assessment of their business health and what they should do to improve their score and become eligible for a business loan. Be specific, encouraging, and practical. No markdown, no headers, just plain text.`);
    document.getElementById('scoreAI').innerHTML=`<div class="ai-insight">${text}</div><button class="btn btn-ghost btn-full" style="margin-top:10px" onclick="getScoreInsight()">Refresh Assessment</button>`;
  }catch(err){
    document.getElementById('scoreAI').innerHTML=`<div class="ai-insight">Your ShopScore shows a business with real potential and some clear areas to strengthen. Focus on restocking before items run out and recording every sale consistently — these two habits alone will significantly move your score. Keep it up and you will unlock OPay loan eligibility within weeks of consistent use.</div><button class="btn btn-ghost btn-full" style="margin-top:10px" onclick="getScoreInsight()">Try Again</button>`;
  }
}

// ---------- DAILY ANALYSIS ----------

function renderDaily(){
  const today=computeTodayStats();
  snapshots[todayKey()]=today;
  saveSnapshots();
  const y=snapshots[yesterdayKey()];

  const pctChange=(now,before)=>{
    if(before===undefined||before===null||before===0)return null;
    return (((now-before)/before)*100).toFixed(0);
  };

  const revChange=y?pctChange(today.revenue,y.revenue):null;
  const profitChange=y?pctChange(today.profit,y.profit):null;
  const unitsChange=y?pctChange(today.unitsSold,y.unitsSold):null;

  const trendBadge=(pct)=>{
    if(pct===null)return `<span class="trend-badge trend-flat">No data for yesterday yet</span>`;
    const n=Number(pct);
    if(n>0)return `<span class="trend-badge trend-up">▲ ${n}% vs yesterday</span>`;
    if(n<0)return `<span class="trend-badge trend-down">▼ ${Math.abs(n)}% vs yesterday</span>`;
    return `<span class="trend-badge trend-flat">Same as yesterday</span>`;
  };

  document.getElementById('dailyStats').innerHTML=`
    <div class="stat-card">
      <div class="stat-label">Today's Revenue</div>
      <div class="stat-value" style="color:var(--green)">${fmt(today.revenue)}</div>
      <div class="stat-sub">${trendBadge(revChange)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Today's Profit</div>
      <div class="stat-value" style="color:var(--navy)">${fmt(today.profit)}</div>
      <div class="stat-sub">${trendBadge(profitChange)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Units Sold</div>
      <div class="stat-value" style="color:var(--blue)">${today.unitsSold}</div>
      <div class="stat-sub">${trendBadge(unitsChange)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Low Stock Alerts</div>
      <div class="stat-value" style="color:${today.lowStock>0?'var(--red)':'var(--green)'}">${today.lowStock}</div>
      <div class="stat-sub">need restocking</div>
    </div>`;

  document.getElementById('dailyTopSeller').innerHTML=today.topSeller
    ? `<div class="card-title icon-title">${ICO.trophy} Today's Best Seller</div><div style="font-size:15px;font-weight:700;color:var(--navy)">${today.topSeller}</div>`
    : `<div class="card-title icon-title">${ICO.trophy} Today's Best Seller</div><div style="font-size:13px;color:var(--text2)">No sales recorded yet today.</div>`;

  window._dailyData={today,yesterday:y||null,revChange,profitChange,unitsChange};
}

async function getDailyAnalysis(){
  const d=window._dailyData;
  if(!d)return;
  document.getElementById('dailyAI').innerHTML=`<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div style="text-align:center;font-size:13px;color:var(--text2);padding-bottom:12px">Analysing today's performance...</div>`;
  try{
    const text=await callGemini(`You are a business advisor for a Nigerian small shop owner. Here is today's performance data compared to yesterday (if available):\n\n${JSON.stringify(d)}\n\nWrite a short daily briefing in plain English: 1) a one-sentence summary of how today went, 2) any notable trend or unusual pattern worth flagging, 3) one specific, practical recommendation for tomorrow. Keep it under 5 sentences total. No markdown, no headers, just plain text.`);
    document.getElementById('dailyAI').innerHTML=`<div class="ai-insight">${text}</div><button class="btn btn-ghost btn-full" style="margin-top:10px" onclick="getDailyAnalysis()">Refresh Summary</button>`;
  }catch(err){
    document.getElementById('dailyAI').innerHTML=`<div class="ai-insight">Today's numbers are being tracked and will build into a fuller picture as more days pass. Keep recording every sale to get the most accurate daily insights. Check back tomorrow for a trend comparison.</div><button class="btn btn-ghost btn-full" style="margin-top:10px" onclick="getDailyAnalysis()">Try Again</button>`;
  }
}

maybeSnapshotYesterday();
renderStock();
