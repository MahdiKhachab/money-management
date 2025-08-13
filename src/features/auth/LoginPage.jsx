import React, { useState } from "react";
import { login } from '../../api/loginService';
import logo from '../../components/assets/logo.png';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { token, username: loggedInUser } = await login(username, password);
      onLogin(token, loggedInUser);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100" dir="rtl">
      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="h-24 w-24 mx-auto mb-4 rounded-full" />
        <h1 className="text-3xl font-bold text-blue-900">جمعية الزهراء الثقافية</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">تسجيل الدخول</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            اسم المستخدم
          </label>
          <input
            id="username"
            type="text"
            placeholder="أدخل اسم المستخدم"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            كلمة المرور
          </label>
          <input
            id="password"
            type="password"
            placeholder="أدخل كلمة المرور"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-bold"
        >
          دخول
        </button>
      </form>
    </div>
  );
};

export default LoginPage;