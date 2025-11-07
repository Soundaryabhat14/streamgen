 import {FaInfoCircle, FaPlay} from 'react-icons/fa';


const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-linear-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className='flex gap-2'>
       <button className='flex items-center bg-gray-500 rounded-md  text-white text-xl py-2 px-10 cursor-pointer '><FaPlay />Play</button>
       <button className='flex items-center bg-gray-500 text-lg rounded-md text-white py-2 px-8 cursor-pointer'><FaInfoCircle/>More Info</button>
       </div>
    </div>
  );
};
export default VideoTitle;
