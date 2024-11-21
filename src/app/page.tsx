import Link from "next/link";
import Image from "next/image";
import wallpaper from "../assets/wallpaper.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-[#f6d365] to-[#fda085] p-6 sm:p-16">
      {/* Logo Section */}
      <h1 className="text-3xl font-pacifico px-2 sm:text-4xl mt-2">
      <span className="text-black">Story</span> <span className="text-orange-600">Book App</span>
      </h1>
      
      {/* Illustration Section */}
      <div className="flex flex-col items-center">
        <Image
          src={wallpaper} 
          alt="Learning illustration"
          width={400}
          height={400}
          className="mt-2"
        />
         {/* Button Section */}
        <Link
        href="/register"
        className="mt-2 bg-gray-800 text-orange-600 px-8 py-4 rounded-lg shadow-lg text-lg font-medium hover:bg-orange-400 transition sm:text-xl"
         >
        Start learning
        </Link>
        <p className="text-lg text-gray-800 text-center mt-4 ">The easy way to learn English with your child</p>
      </div>
      
     
    </div>
  );
}