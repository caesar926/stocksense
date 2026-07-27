// Auto-derive the header avatar initial from the shop name
(function(){
  const shopEl=document.getElementById('headerShopName');
  const avatar=document.getElementById('avatarCircle');
  if(shopEl&&avatar){
    avatar.textContent=shopEl.textContent.trim().charAt(0).toUpperCase()||'?';
  }
})();
