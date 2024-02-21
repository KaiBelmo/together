import { Link } from "react-router-dom";

const LinkedinLink = "https://www.linkedin.com/in/belmo-mohamed-ali";

function Footer() {
  return (
    <footer className="text-center mt-16 bg-[#202020] text-white py-4 text-base">
      Designed and implemented by <Link to={LinkedinLink} className="border-b-2"> Kai Belmo </Link>.
    </footer>
  );
}

export default Footer;
