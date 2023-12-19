import VIDEOS from "../constants/Videos";

function Main() {

  return (
    <div>
      <h1 className="text-xl font-sans font-bold mb-5">{VIDEOS.portfolio.title}</h1>
      <div className="w-96 h-80 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export default Main;
