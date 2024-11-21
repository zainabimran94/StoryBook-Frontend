'use client';
import React, { useEffect, useState } from 'react';
import { GetStoryDto } from '@/types/apiTypes';
import { getRequest } from '@/lib/apiHelpers';
import { useAuth } from '@/context/AuthProvider';
import Image from 'next/image';
import bg from '../../../assets/bg.png'


const StoryDisplay: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [storyDisplay, setStory] = useState<GetStoryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const fetchStories = async () => {
      const cachedStories = localStorage.getItem('storyDisplay');
      if (cachedStories) {
        setStory(JSON.parse(cachedStories));
        setLoading(false);
        return;
      }
      try {
        const data: GetStoryDto[] = await getRequest({ url: 'Generate/get-story' });
        setStory(data);
      } catch (err) {
        setError('Failed to load stories.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500">Loading your story...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % storyDisplay.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + storyDisplay.length) % storyDisplay.length);
  };
  if (!isAuthenticated) {
    return <p className="text-center text-red-500">You need to be logged in to view the stories.</p>;
  }

  return (
    <div className="min-h-screen relative flex justify-center items-center">
       <div className="absolute inset-0 -z-10">
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
    </div>
      <div className="p-4 max-w-md max-h-sm bg-transparent rounded-4xl shadow-md ">
             {/* Story Title */}
            {storyDisplay.length > 0 && (
          <div className=" flex flex-col items-center space-y-2 ">
          <div className="w-full p-2">
          <h2 className="text-2xl font-semibold text-orange-400 font-caveat">{storyDisplay[currentSlide].storyGenTitle}</h2>
            <img
              src={storyDisplay[currentSlide].storyImageUrl}
              alt="Story"
              className="w-full h-64 rounded-md shadow-md">
             </img>
            
            {/* Story Text */}
            <p className="text-lg font-KleeOne text-gray-700 bg-yellow-50 p-4 rounded-md leading-relaxed shadow">
              {storyDisplay[currentSlide].storyBook}
            </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full mt-6">
              <button
                onClick={prevSlide}
                className="px-4 py-2 bg-teal-500 text-white rounded-full shadow hover:bg-teal-600 transition"
              >
                Previous
              </button>
              <button
                onClick={nextSlide}
                className="px-4 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDisplay;
