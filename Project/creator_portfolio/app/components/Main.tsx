import VIDEOS from "../constants/Videos";

function Main() {
  return (
    <div>
      <h1 className="text-xl font-sans font-bold mb-5">
        {VIDEOS.title.portfolio}
      </h1>
      <div className="w-96 h-80 bg-gray-200 rounded-lg flex items-center justify-center text-7xl text-gray-500 hover:text-black cursor-pointer">
        ▶️
      </div>
    </div>
  );
}

export default Main;
