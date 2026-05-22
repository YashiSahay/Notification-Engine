import React, { useState } from 'react';

const Login = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   const endpoint = isLogin ? 'login' : 'register'; 
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-black text-[#0F172A] mb-8 uppercase tracking-tighter">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full py-4 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm font-bold text-slate-400 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New here? Create an account" : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  );
};

export default Login;