import { useState } from "react";
import { useNavigate } from "react-router-dom";
import parseYoutubeLink from "../utils/parseYoutubeLink";
import Header from "../components/header";
import Footer from "../components/footer";

// TODO: check if room is available on backend (develop api)
function Index() {
  const navigate = useNavigate();
  const [UserInputVidID, setUserInputVidID] = useState("");
  const handleEnteringRoom = () => {
    const randomNumber = (Math.random() * Number.MAX_SAFE_INTEGER)
      .toFixed()
      .toString();
    const vidID = parseYoutubeLink(UserInputVidID);
    navigate(`/room/${randomNumber}?videoID=${vidID}`);
  };

  return (
    <div className="w-full bg-red text-xl">
      <Header />
      <main>
        <section className="bg-[#202020] text-white py-20 px-16 flex justify-center items-center flex-col ">
          <div className="text-6xl">👨‍👩‍👦</div>
          <div className="mt-3 font-bold text-3xl">Together.js</div>
          <div className="my-3 text-lg font-normal w-5/12 text-center">
            Together.js synchronizes YouTube videos, allowing users to
            watch Together.js in real-time, fostering shared experiences.
          </div>
          <div className="flex">
            <input
              className=" text-black h-[2.2em] outline-none pl-3 text-base border-r-2 border-black"
              type="text"
              name="room"
              required
              onChange={(e) => setUserInputVidID(e.target.value)}
            />
            <button onClick={handleEnteringRoom}>Enter Room</button>
          </div>
        </section>
        <section className="container mx-auto mt-14">
          <div className="grid grid-cols-2 [&>div]:flex [&>div]:flex-col [&>div]:content-center [&>div]:items-center [&>div]:p-5">
            <div>
              <img className="w-24" src="/yt.png"></img>
              Select a YouTube video you&apos;d like to watch with others.
            </div>
            <div>
              <img className="w-24" src="/text-box.png"></img>
              Insert your YouTube URL above to instantly create a new room.
            </div>
            <div>
              <img className="w-24" src="/link.png"></img>
              Share your room link directly with friends.
            </div>
            <div>
              <img className="w-24" src="/share.png"></img>
              Watch and experience the video Together.js.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Index;
