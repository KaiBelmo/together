import io from "socket.io-client";
import YouTube from "react-youtube";
import { useEffect, useState, useRef } from "react";
import parseRoomLink from "../utils/parseRoomLink";
// import addUser from "../utils/addUser";

function Room() {
  const [roomID, videoID] = parseRoomLink(window.location.href);
  const [UserList, setUserList] = useState([]);
  const [userID, setUserID] = useState();
  const socket = io("http://localhost:3030");

  let isPlaying;
  const playerRef = useRef(null);
  const sliderRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [timelineWidth, setTimelineWidth] = useState(0);

  // sent a request to server to check if this roomID is available (not now)

  useEffect(() => {
    socket.on("connect", () => {
      setUserID(socket.id);
      socket.emit("join-room", roomID, socket.id);

      socket.on("user-joined", (listOfAllUsers) => {
        setUserList(listOfAllUsers);
      });
      // if (playerRef.current) {
      //   socket.emit("request-admin-duration", roomID, playerRef.current.getDuration());
      //   alert("duration");
      //   socket.on("get-admin-timestamp", (duration) => {
      //     alert("duration 222");
      //     alert(duration);
      //     console.log("broadcast-timestamp");
      //     if (duration !== 0)
      //     playerRef.current.seekTo(duration, true);
      //   });
      // }
      socket.on("user-disconnected", (listOfAllUsers) => {
        setUserList(listOfAllUsers);
      });
      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
      socket.on("broadcast-duration", (duration) => {
        console.log("broadcast-duration");
        console.log(duration);
        setDuration(duration);
        if (playerRef.current) {
          playerRef.current.seekTo(duration, true);
        }
      });
      socket.on("broadcast-video-playing-state", (isPlaying) => {
        if (playerRef.current) {
          if (isPlaying == true) {
            playerRef.current.playVideo();
            isPlaying = true;
          } else {
            playerRef.current.pauseVideo();
            isPlaying = false;
          }
        }
      });
      console.log(sliderRef.current);
      setInterval(() => {
        if (playerRef.current) {
          setDuration(playerRef.current.getCurrentTime());
          sliderRef.current.style.left =
            (playerRef.current.getCurrentTime() /
              playerRef.current.getDuration()) *
              100 +
            "%";
        }
      }, 200);
    });
  }, []);

  const opts = {
    height: "490",
    width: "740",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      mute: 1,
      disablekb: 1,
      modestbranding: 0,
      rel: 0,
      showinfo: 0,
    },
  };
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setTimelineWidth(event.target.getDuration());
  };

  const onPlayerStateChange = (event) => {
    playerRef.current = event.target;
  };

  const handleTimelineClick = (e) => {
    if (playerRef.current) {
      const timelineWidth = e.currentTarget.offsetWidth;
      const clickedPosition = e.nativeEvent.offsetX;
      const percentClicked = clickedPosition / timelineWidth;
      const seekToTime = percentClicked * playerRef.current.getDuration();
      playerRef.current.seekTo(seekToTime, true);
      setDuration(seekToTime);
      socket.emit("change-duration", roomID, seekToTime);
    }
  };

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      isPlaying = true;
      socket.emit("video-playing-state", roomID, isPlaying);
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      isPlaying = false;
      socket.emit("video-playing-state", roomID, isPlaying);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <h1 className=" text-lg">user id: {userID}</h1>
        <div>
          <YouTube
            videoId={videoID}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            onPause={pauseVideo}
            onPlay={playVideo}
            // to prevent clicking (pause and play video)
            className="pointer-events-none select-none"
          />

          <div className="flex justify-center items-center my-1">
            <div className="flex">
              <img
                onClick={playVideo}
                className="w-7 h-6 p-1.5 mr-0 border-[1px] cursor-pointer border-black border-r-0 border-opacity-60 rounded-l-sm opacity-80 hover:bg-neutral-200 transition duration-300"
                src="/play.svg"
                alt=""
              />
              <img
                onClick={pauseVideo}
                className="w-7 h-6 p-1.5 mr-1 border-[1px] cursor-pointer border-black border-opacity-60 rounded-r-sm opacity-80 hover:bg-neutral-200 transition duration-300	"
                src="/pause.svg"
                alt=""
              />
            </div>
            <div
              className={`flex-1 flex items-center relative h-0.5  bg-neutral-800 w-[${timelineWidth}px] cursor-pointer`}
              onClick={handleTimelineClick}
            >
              <div
                ref={sliderRef}
                className={`absolute w-3 h-3 border-[2px] border-neutral-800 left-0`}
              ></div>
            </div>
          </div>
          {duration.toFixed(2)}
        </div>
      </div>

      {UserList.map((el, i) => (
        <div key={i}>{el}</div>
      ))}
    </>
  );
}

export default Room;
