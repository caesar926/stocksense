const TRANSACTIONS_KEY='stocksense_transactions_v1';

function loadTransactions(){
  try{
    const raw=localStorage.getItem(TRANSACTIONS_KEY);
    if(raw)return JSON.parse(raw);
  }catch(e){}
  return [];
}

function saveTransactions(){
  try{localStorage.setItem(TRANSACTIONS_KEY,JSON.stringify(transactions));}catch(e){}
}

let transactions=loadTransactions();
let expandedHistoryDate=null;
