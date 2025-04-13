// src/components/Auth.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/Auth.css';

const Auth = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onAuth();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), { username });
        onAuth();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container glass-card">

      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      {!isLogin && <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />}
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleAuth}>{isLogin ? 'Login' : 'Sign Up'}</button>
      <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'No account? Sign up' : 'Have an account? Login'}</p>
    </div>
  );
};

export default Auth;
