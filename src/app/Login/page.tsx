'use client'
import { useState } from 'react';
import { postRequest } from '../../lib/apiHelpers'; 
import { LoginDto } from '../../types/apiTypes'; 
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import Link from 'next/link';


const Login = () => {
  const {login}  = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const loginData: LoginDto = { email, password };

    try {
      const response = await postRequest({ url:'Account/login', data: loginData });
      console.log('Login successful:', response);
      if (response.token) {
        login(response.token); 
      } else {
        setError('Login failed: No token received.');
      }
      router.push('/UserDashboard'); 
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-register bg-cover bg-center">
      <div className="bg-white font-kleeOne bg-opacity-50 shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        
        {/* Left Section - Welcome & Info */}
        <div className="md:w-1/2 font-caveat p-8 flex flex-col justify-center bg-form2 text-gray-700 relative">
          <h1 className="text-3xl mb-4">Hello Again!</h1>
          <p className="mb-6 text-2xl ">
            Welcome back! Enter your details to log in to your account.
          </p>
        </div>
        
        {/* Right Section - Login Form */}
        <div className="md:w-1/2  p-8">
          <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-md font-medium text-black">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Password</label>
              <input
                type="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-orange-400 text-black py-2 px-4 rounded-md font-caveat hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-md text-black">
            Don't have an account?{' '}
            <Link href="/register" className="text-orange-600 font-bold text-md font-pacifico hover:bg-yellow-500 hover:underline">
              Register here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
