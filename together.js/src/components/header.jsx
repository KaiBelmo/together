import { Link } from "react-router-dom";

const GithubLink = "https://github.com/kaibelmo";
const MailLink = "mailto:belmomohamedali@gmail.com";

function Header() {
  return (
    <header className="container mx-auto text-2xl my-6 flex justify-between font-semibold">
      <Link
        to="/"
        className="text-black font-semibold hover:text-[#3e3e3e] transition-colors ease-in-out"
      >
        Together - 👨‍👩‍👦
      </Link>
      <div className="flex">
        <Link
          to={"/about"}
          className="text-black ml-7 font-semibold hover:text-[#3e3e3e] transition-colors ease-in-out"
        >
          About the project
        </Link>
        <Link
          to={GithubLink}
          className="text-black ml-7 font-semibold hover:text-[#3e3e3e] transition-colors ease-in-out"
        >
          Github link
        </Link>
        <Link
          to={MailLink}
          className="text-black ml-7 font-semibold hover:text-[#3e3e3e] transition-colors ease-in-out"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

export default Header;
