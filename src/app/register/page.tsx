'use client'
import { useState } from 'react';
import { postRequest } from '../../lib/apiHelpers'; 
import { useRouter } from 'next/navigation';
import { RegisterDto } from '../../types/apiTypes'; 
import Link from 'next/link';


const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData: RegisterDto = { email, name, password };

    try {
      const response = await postRequest({ url: 'Account/register', data: userData });
      console.log('Registration successful:', response);
      router.push('/Login'); 
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login bg-cover bg-center">
      <div className="bg-white bg-opacity-50 font-kleeOne first:shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        
        {/* Left Section - Welcome & Info */}
        <div className="md:w-1/2 p-6 flex text-center font-pacifico font-semibold flex-col justify-center bg-form1  relative">
          <h1 className="text-2xl text-orange-600 mb-6">Hie There!</h1>
          <p className="mb-8 text-2xl text-green-700 ">
            Welcome!! Enter your details to register.
          </p>
          <div className="space-y-4">
          </div>
        </div>
        
        {/* Right Section - Login Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
          <div>
              <label className="block text-md font-medium text-gray-700">User Name</label>
              <input
                type="username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={name}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
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
              className="w-full bg-orange-700 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-black">
            Already have an account?{' '}
            <Link href="/Login" className="text-red-500 font-bold text-lg hover:bg-orange-300 hover:underline">
              Login here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
    
};

export default Register;
