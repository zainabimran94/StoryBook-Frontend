'use client';
import React, { useEffect, useState } from 'react';
import { GetPreferenceDto, ImagesDto, SendPreferenceDto } from "@/types/apiTypes";
import { getRequest, postRequest } from '../lib/apiHelpers';
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import writing from '../assets/writing.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<GetPreferenceDto>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userNote, setUserNote] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useAuth(); 
  const router = useRouter();

 useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await getRequest({ url: 'Create/get-preferences' });
        setPreferences(data);
      } catch (err) {
        setError('Failed to load user preferences.');
      } finally {
        setLoading(false);
      }
    }; fetchPreferences();
  }, []);
   
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserNote(e.target.value);
  };
  const handleImageSelect = (imageDesc: string) => {
    setSelectedImage(imageDesc);
  };

  const handleSelectClick = async () => {
    const isToddler = preferences ?.groupName === "Toddler";
    const preference: SendPreferenceDto = {
      groupName: preferences?.groupName || '',
      themeName: preferences?.themeName || '',
      imageDesc: isToddler ? selectedImage || undefined : undefined,
      storyDesc: !isToddler ? userNote : undefined,
      userId: user?.sub || ''
    };
    if (isToddler && !selectedImage) {
      toast.warn("Please select an image.");
      return;
    } else if (!isToddler && !userNote) {
      toast.warn("Please enter a description for the story.");
      return;
    }
    try {
      toast.info("Your story is being generated...");
      const response = await postRequest({
        url: "Story/generate-story",
        data: preference,
      });
      toast.success("Story generated and saved successfully!");
      router.push("/UserDashboard/StoryDisplay");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
 

  return (
    <div className="p-4">
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : (
    <div className="space-y-6 font-pacifico text-gray-800">
      {preferences ? (
        <div key={preferences.userGroupId} className="p-4">
          <h3 className="text-xl font-semibold mb-2">Theme: {preferences.themeName}</h3>

          {preferences.groupName === "Toddler" ? (
            <div>
              <h4 className="text-lg font-medium">Images for Toddlers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {preferences.images.map((image: ImagesDto) => (
                  <div
                    key={image.imagesDesc}
                    onClick={() => handleImageSelect(image.imagesDesc)}
                    className="p-2 border rounded"
                  >
                    <img
                      src={image.images}
                      alt={image.imagesDesc}
                      onClick={() => handleImageSelect(image.imagesDesc)}
                      onError={() => console.error("Error loading image", image.images)}
                      className="w-full h-64 object-cover mb-2 transition duration-300 ease-in-out hover:scale-110 shadow-none cursor-pointer hover:shadow-lg hover:shadow-green-400"
                    />
                  </div>
                ))}
                {selectedImage && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium">Selected Image:</h4>
                    <img
                      src={preferences.images.find((img) => img.imagesDesc === selectedImage)?.images || '/path/to/placeholder.jpg'}
                      alt="Selected"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
         <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Placeholder Card */}
          <div className="relative w-full md:w-1/2 h-64">
            <Image
            src={writing}
            alt="Write your story illustration"
            className="w-full h-64 object-cover rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
            />
             </div>
              <div className="p-4 w-full md:w-1/2 ">
              <p className="text-gray-700 font-medium text-lg mb-2">Describe your story</p>
              <textarea
              value={userNote}
              onChange={handleNoteChange}
              className="w-full p-3 border font-kleeOne h-40 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
              placeholder="Write here..."
              rows={4}
               />
          </div>
          </div>
        </div>
          )}

          {/* Select Button */}
          <div className="mt-4">
            <button
              onClick={handleSelectClick}
              className="px-4 py-2 font-caveat bg-orange-600 text-white rounded hover:bg-green-600"
            >
              Generate Story
            </button>
          </div>
        </div>
      ) : (
        <p>No preferences found.</p>
      )}
    </div>
  )}
   <ToastContainer />
  </div>

  )
  
};

export default UserPreferences;
