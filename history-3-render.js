function openTransactionHistory(){
  renderTransactionHistory();
  openModal('historyModal');
}

function formatDateLabel(dk){
  if(dk===todayKey())return 'Today';
  if(dk===yesterdayKey())return 'Yesterday';
  const d=new Date(dk+'T00:00:00');
  return d.toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
}

function toggleHistoryDate(dk){
  expandedHistoryDate=expandedHistoryDate===dk?null:dk;
  renderTransactionHistory();
}

function renderTransactionHistory(){
  const list=document.getElementById('historyList');
  if(!transactions.length){
    list.innerHTML=`<div style="text-align:center;color:var(--text3);font-size:13px;padding:30px 10px">No transactions recorded yet. Sales you record will show up here, grouped by day.</div>`;
    return;
  }
  const groups={};
  transactions.forEach(t=>{
    if(!groups[t.dateKey])groups[t.dateKey]=[];
    groups[t.dateKey].push(t);
  });
  const dateKeys=Object.keys(groups).sort().reverse();

  list.innerHTML=dateKeys.map(dk=>{
    const items=groups[dk].slice().sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
    const dayRevenue=items.reduce((s,t)=>s+t.revenue,0);
    const dayProfit=items.reduce((s,t)=>s+t.profit,0);
    const dayUnits=items.reduce((s,t)=>s+t.qty,0);
    const isOpen=expandedHistoryDate===dk;
    return`<div class="category-group">
      <div class="category-header" onclick="toggleHistoryDate('${dk}')">
        <div>
          <div class="category-name">${formatDateLabel(dk)}</div>
          <div class="category-meta">${dayUnits} unit${dayUnits===1?'':'s'} sold · ${fmt(dayRevenue)} revenue · ${fmt(dayProfit)} profit</div>
        </div>
        <div class="category-chevron ${isOpen?'open':''}">▾</div>
      </div>
      ${isOpen?`<div class="category-body">${items.map(t=>{
        const time=new Date(t.timestamp).toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit'});
        return`<div class="alert-row"><span>${t.productName} × ${t.qty} <span style="color:var(--text3)">(${time})</span></span><span style="font-weight:700;color:var(--green)">${fmt(t.revenue)}</span></div>`;
      }).join('')}</div>`:''}
    </div>`;
  }).join('');
}
