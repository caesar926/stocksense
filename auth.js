// auth.js

function switchAuthTab(which){
  document.getElementById('tab-login-btn').classList.toggle('active',which==='login');
  document.getElementById('tab-signup-btn').classList.toggle('active',which==='signup');
  document.getElementById('form-login').classList.toggle('active',which==='login');
  document.getElementById('form-signup').classList.toggle('active',which==='signup');
  hideAuthError();
}

function showAuthError(msg){
  const el=document.getElementById('authError');
  el.textContent=msg;
  el.classList.add('show');
}

function hideAuthError(){
  const el=document.getElementById('authError');
  el.classList.remove('show');
  el.textContent='';
}

// Maps Firebase's technical error codes into messages a shop owner will understand
function friendlyAuthError(err){
  const code=err && err.code;
  switch(code){
    case 'auth/invalid-email': return 'That email address doesn\'t look valid.';
    case 'auth/user-not-found': return 'No account found with that email. Try creating one instead.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'Incorrect email or password. Please try again.';
    case 'auth/email-already-in-use': return 'An account already exists with that email. Try logging in instead.';
    case 'auth/weak-password': return 'Password should be at least 6 characters.';
    case 'auth/too-many-requests': return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed': return 'Network error — check your connection and try again.';
    default: return 'Something went wrong. Please try again.';
  }
}

async function handleLogin(){
  hideAuthError();
  const email=document.getElementById('login-email').value.trim();
  const password=document.getElementById('login-password').value;

  if(!email||!password){
    showAuthError('Please fill in both your email and password.');
    return;
  }

  const btn=document.getElementById('login-btn');
  btn.disabled=true;btn.textContent='Logging in...';
  try{
    await auth.signInWithEmailAndPassword(email,password);
    window.location.href='index.html';
  }catch(err){
    showAuthError(friendlyAuthError(err));
  }finally{
    btn.disabled=false;btn.textContent='Log In';
  }
}

async function handleSignup(){
  hideAuthError();
  const name=document.getElementById('signup-name').value.trim();
  const shop=document.getElementById('signup-shop').value.trim();
  const email=document.getElementById('signup-email').value.trim();
  const password=document.getElementById('signup-password').value;

  if(!name||!shop||!email||!password){
    showAuthError('Please fill in every field before creating your account.');
    return;
  }
  if(password.length<6){
    showAuthError('Password should be at least 6 characters.');
    return;
  }

  const btn=document.getElementById('signup-btn');
  btn.disabled=true;btn.textContent='Creating account...';
  try{
    const cred=await auth.createUserWithEmailAndPassword(email,password);
    await db.collection('users').doc(cred.user.uid).set({
      ownerName:name,
      shopName:shop,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    });
    window.location.href='index.html';
  }catch(err){
    showAuthError(friendlyAuthError(err));
  }finally{
    btn.disabled=false;btn.textContent='Create Account';
  }
}

function logout(){
  if(!confirm('Log out of StockSense?'))return;
  auth.signOut().then(()=>{
    window.location.href='login.html';
  });
}

// Guard for index.html: redirect to login if not authenticated,
// otherwise fetch the shop owner's profile and personalize the header.
function protectPageAndPersonalize(){
  auth.onAuthStateChanged(async user=>{
    if(!user){
      window.location.href='login.html';
      return;
    }
    try{
      const doc=await db.collection('users').doc(user.uid).get();
      if(doc.exists){
        const data=doc.data();
        const shopEl=document.getElementById('headerShopName');
        const avatarEl=document.getElementById('avatarCircle');
        if(shopEl)shopEl.textContent=data.shopName||'My Shop';
        if(avatarEl)avatarEl.textContent=(data.ownerName||'?').trim().charAt(0).toUpperCase();
        window._userProfile=data;
      }
    }catch(e){
      console.error('Could not load profile:',e);
    }
  });
}
