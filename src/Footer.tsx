import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import { FaDiscord } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Overall-Style-sheet/Footer.css';

function Footer(){
    return(
        <footer>
            <hr />
        <div className="footer-elements">
            <div className="footer-elements-left">
                <h4>Community</h4>
                <ul>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/Event">Events</Link></li>
                    <li><Link to="/Mentors">Mentors</Link></li>
                    <li><Link to="/Resources">Resources</Link></li>
                </ul>
            </div>
            <div className="footer-elements-right">    
                <h4>Social Media</h4>
                <ul>
                    <DiGithubBadge className="social-media-icon"/>
                    <FaLinkedinIn className="social-media-icon"/>
                    <FaDiscord className="social-media-icon"/>
                    <FaTwitter className="social-media-icon"/>
                    <IoLogoInstagram className="social-media-icon"/>
                </ul>
            </div>
        </div>
                <section className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </section>            
        </footer>
    );
}
export default Footer;