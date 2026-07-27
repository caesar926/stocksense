function confirmSale(){
  const item=stock.find(i=>i.id===activeSellId);
  const q=+document.getElementById('s-qty').value;
  if(!q||q<1||q>item.qty)return showToast('Invalid quantity','#e63946');
  item.qty-=q;item.sales+=q;
  saveStock();

  transactions.push({
    id:Date.now(),
    productId:item.id,
    productName:item.name,
    qty:q,
    unitPrice:item.sellPrice,
    revenue:item.sellPrice*q,
    profit:(item.sellPrice-item.buyPrice)*q,
    timestamp:new Date().toISOString(),
    dateKey:todayKey()
  });
  saveTransactions();

  closeModal('sellModal');
  renderStock(document.getElementById('searchInput').value);
  showToast(`Sale recorded — ${fmt(item.sellPrice*q)} earned`);
}
