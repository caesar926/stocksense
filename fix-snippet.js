function addProduct(){
  const name=document.getElementById('f-name').value.trim();
  const qty=+document.getElementById('f-qty').value;
  const min=+document.getElementById('f-min').value||5;
  const buy=+document.getElementById('f-buy').value;
  const sell=+document.getElementById('f-sell').value;
  const cat=document.getElementById('f-cat').value;
  const exp=document.getElementById('f-exp').value;
  const brand=document.getElementById('f-brand').value.trim();
  if(!name||!qty||!buy||!sell)return showToast(t('toastFillFields'),'#e63946');

  // Check for an existing product with the same name + brand (case-insensitive).
  // If found, this is a RESTOCK: add to its quantity instead of creating a duplicate entry.
  const existing=stock.find(i=>
    i.name.trim().toLowerCase()===name.toLowerCase() &&
    (i.brand||'').trim().toLowerCase()===(brand||'').toLowerCase()
  );

  if(existing){
    existing.qty+=qty;
    existing.minQty=min;
    existing.buyPrice=buy;
    existing.sellPrice=sell;
    existing.category=cat;
    existing.expiry=exp||null;
    saveStock();
    ['f-name','f-brand','f-qty','f-min','f-buy','f-sell','f-exp'].forEach(id=>document.getElementById(id).value='');
    closeModal('addModal');
    renderStock(document.getElementById('searchInput').value);
    showToast(`${t('toastRestocked')} ${existing.name} ${t('toastNowUnits')} ${existing.qty} ${t('toastUnits')}`);
    return;
  }

  stock.push({id:Date.now(),name,brand:brand||null,qty,minQty:min,buyPrice:buy,sellPrice:sell,category:cat,expiry:exp||null,sales:0});
  saveStock();
  ['f-name','f-brand','f-qty','f-min','f-buy','f-sell','f-exp'].forEach(id=>document.getElementById(id).value='');
  closeModal('addModal');
  renderStock(document.getElementById('searchInput').value);
  showToast(t('toastProductAdded'));
}
