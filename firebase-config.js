const firebaseConfig = {
  apiKey: "AIzaSyBZXhRVxxfQ--w9ovwPzayMbw4bwwum0-Q",
  authDomain: "stocksense-fcd44.firebaseapp.com",
  projectId: "stocksense-fcd44",
  storageBucket: "stocksense-fcd44.firebasestorage.app",
  messagingSenderId: "728995145516",
  appId: "1:728995145516:web:5faa4266522ad3b76a2e89"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
