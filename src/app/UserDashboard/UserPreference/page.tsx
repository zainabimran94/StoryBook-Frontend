'use client';
import React from 'react';
import UserPreferences from '@/components/userPreference'; 
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation'; 

const PreferencesPage: React.FC = () => {
  const { isAuthenticated } = useAuth(); 
  const router = useRouter();
  
 if (!isAuthenticated) {
    router.push('/Login'); 
    return null; 
  }

  return (
    <div className="min-h-screen bg-preference flex justify-center items-center">
       {isAuthenticated ? (
      <div className=" justify-center items-center p-4 ">
        <h1 className="text-4xl text-gray-800 font-pacifico mb-6 text-center">Your Preferences</h1>
        <UserPreferences />
      </div>
      ) : (
        <div className="text-center text-white">
        <h1 className="text-2xl">You are not logged in.</h1>
         </div>

          )}
    </div>
  
  );
};
export default PreferencesPage;
