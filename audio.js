// audio.js
// Simple browser-based "Listen" feature using the Web Speech API.
// Only offered when the app language is English — Igbo/Hausa/Yoruba
// browser voices are not reliably available yet (see project notes).

function speakText(text){
  if(!('speechSynthesis' in window)){
    showToast('Audio playback is not supported on this device','#e63946');
    return;
  }
  window.speechSynthesis.cancel(); // stop any previous playback first
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.lang='en-US';
  utterance.rate=0.95;
  window.speechSynthesis.speak(utterance);
}

// Returns a "Listen" button's HTML, or an empty string if the current
// language isn't English (audio isn't available for ig/ha/yo yet).
function listenButtonHTML(escapedText){
  if(getLang()!=='en')return '';
  return `<button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="speakText(\`${escapedText}\`)">🔊 Listen</button>`;
}
