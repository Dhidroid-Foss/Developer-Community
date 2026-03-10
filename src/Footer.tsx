import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import { FaDiscord } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <div>
            <hr />
            <div>
                <h4>Community</h4>
                <ul>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/Event">Events</Link></li>
                    <li><Link to="/Mentors">Mentors</Link></li>
                    <li><Link to="/Career">Career</Link></li>
                    <li><Link to="/Resources">Resources</Link></li>
                </ul>
                <h4>Social Media</h4>
                <ul>
                    <DiGithubBadge />
                    <FaLinkedinIn />
                    <FaDiscord />
                    <FaTwitter />
                    <IoLogoInstagram />
                </ul>
                </div>
                <footer>
                    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </footer>            
        </div>
    );
}
export default Footer;