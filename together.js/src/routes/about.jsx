import Header from "../components/header";
import Footer from "../components/footer";

function About() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <main className="container mx-auto flex-1 [&>h1]:mt-5 [&>h1]:mb-2">
        <h1 className="text-4xl">Why?</h1>
        <p className="text-lg">
          During the quarantine period, like many others, I found myself missing
          the simple pleasure of sharing funny or entertaining YouTube videos
          with friends. However, every attempt to sync up with friends resulted
          in frustrating experiences—either the sound wasn&apos;t right, or the
          videos were out of sync. Determined to find a solution, I embarked on
          a journey to create Together.
        </p>

        <h1 className="text-4xl">Technologies I used to build this project.</h1>
        <p className="text-lg">
          <ul>
            <li>
              - React: The user interface of Together is crafted with React,
              providing an intuitive and responsive design that enhances the
              overall user experience.
            </li>
            <li>
              - Node.js: Powering the server-side of Together is Node.js, a
              powerful runtime that enables high-performance and scalability,
              ensuring smooth video streaming.
            </li>
            <li>
              - Socket.io: Real-time communication is made possible through
              Socket.io, allowing users to synchronize their video-watching
              experience in real-time, making it as close to an in-person
              experience as possible.
            </li>
          </ul>
        </p>
        <h1 className="text-4xl">Todos</h1>
        <ul>
          <li>
            - add chatroom.
          </li>
          <li>
            - fix the user interface.
          </li>
          <li>
            - support playlists.
          </li>
        </ul>
      </main>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default About;
