'use client';
import React, { useEffect, useState } from 'react';
import AgeGroupDropdown from '@/components/ageGroup';
import ThemeGroupDropdown from '@/components/themeGroup';
import { useAuth } from '@/context/AuthProvider';
import { SelectGroupDto } from '@/types/apiTypes';
import { postRequest } from '@/lib/apiHelpers';
import { useRouter } from 'next/navigation';
import story from '../../assets/story.png'
import Image from 'next/image';

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth(); 
  const [userGroup, setUserGroup] = useState<SelectGroupDto>({
    userId: user?.sub || '',
    ageGroupId: '',
    themeId: ''
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('userGroup', JSON.stringify(userGroup));
  }, [userGroup]);

  const handleSelectGroup = async () => {
    if (!userGroup.ageGroupId || !userGroup.themeId) {
      setMessage("Please select both an age group and a theme.");
      return;
    }
    try {
      await postRequest({
        url: 'Selection/UserGroup',
        data: userGroup,
      });
      setMessage("Age Group and Theme selected successfully!");
      router.push('/UserDashboard/UserPreference'); 
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleViewStories = () => {
    // Redirect to the StoryDisplay page to view user's stories
    router.push('/UserDashboard/StoryDisplay');
  };
  const handleViewPreference = () => {
    router.push('/UserDashboard/UserPreference');
  }
  const rainbowColors = [
    "text-red-400",
    "text-orange-500",
    "text-yellow-300",
    "text-green-400",
    "text-blue-400",
    "text-indigo-400",
    "text-purple-500",
  ];
  
  const title = "Welcome to Your Dashboard";
    
  return (
    <div className="relative flex flex-col min-h-screen font-kleeOne">
       {/* Background Image */}
    <div className="absolute inset-0 -z-10">
      <Image
        src={story}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
    </div>
      {isAuthenticated ? ( // Check if the user is authenticated
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 z-10">
          <h1 className="text-4xl font-bold font-pacifico mb-6">
          {title.split("").map((char, index) => (
          <span key={index} className={rainbowColors[index % rainbowColors.length]}>
          {char}
          </span>
            ))}
          </h1>
          <div className="space-y-4 w-full max-w-md">
          <AgeGroupDropdown setSelectedAgeGroup={(ageGroupId) => setUserGroup({ ...userGroup, ageGroupId })}/>
          <ThemeGroupDropdown setSelectedThemeGroup={(themeId) => setUserGroup({ ...userGroup, themeId })} />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-6 w-full max-w-md">
          <button onClick={handleSelectGroup} className="py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500">
            Select Group
          </button>
          <button
            onClick={handleViewPreference}
            className="py-2 bg-purple-400 text-white rounded-md hover:bg-purple-600"
          >
            My Preferences
          </button>
          <button
            onClick={handleViewStories}
            className=" py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600"
          >
            My Stories
          </button>
          </div>
          {message && <p className="mt-4 text-center text-green-600">{message}</p>}
          </div>
           
      ) : (
        
        <div className="text-center text-white">
          <h1 className="text-2xl">You are not logged in.</h1>
        </div>
      )}
      
    </div>
  );
};

export default UserDashboard;

