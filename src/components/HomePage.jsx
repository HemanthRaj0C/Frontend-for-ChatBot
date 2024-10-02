import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useChat } from '../hooks/useChat';

const HomePage = () => {
  const { login } = useChat();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/chat-bot');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-10 rounded-[30px] shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-transparent focus:border-pink-200 hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-pink-500"
              placeholder="Email address"
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-2 text-xs text-gray-500 hover:cursor-pointer transition-all duration-200
                         peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                         peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs 
                         peer-focus:text-pink-500 bg-white px-1 rounded-lg"
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-transparent focus:border-pink-200 hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-pink-500"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-3 -top-2 text-xs text-gray-500 hover:cursor-pointer transition-all duration-200
                         peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                         peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs 
                         peer-focus:text-pink-500 bg-white px-1 rounded-lg "
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="rounded-md bg-pink-500 hover:bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-2 transition-transform duration-200 ease-in-out w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
