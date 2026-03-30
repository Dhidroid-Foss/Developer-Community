import { AiOutlineYoutube } from "react-icons/ai";
import { SiW3Schools } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaFreeCodeCamp } from "react-icons/fa";
import { SiUdemy } from "react-icons/si";
import { SiCoursera } from "react-icons/si";
import { AiFillGithub } from "react-icons/ai";


function Resources(){
    return(
        <div>
            <div className="header-section">
                <h1>Learn, Explore, and Build with the Right Knowledge</h1>
            </div>

            <div className="intro-section">
                <p>The Resources section of our React Developer Community is designed to provide members with valuable learning materials, practical tools, and curated content that help developers grow in the rapidly evolving technology landscape.</p>

                <p>Whether you are a beginner starting your journey or an experienced developer exploring advanced concepts, our resource hub provides structured guidance, practical knowledge, and updated technology insights.</p>

                <p>Our goal is to create a centralized place where members can access learning materials, development references, and community-driven knowledge.</p>
            </div>

            <div className="learning-resources-section">
                <h2>Learning Resources</h2>

                <p>Our community shares carefully selected learning materials to help members understand both fundamental and advanced concepts in modern web development.</p>

                <div className="resources-list">
                    <p>These resources include:</p>
                    <ul>
                        <li>React development guides</li>
                        <li>Frontend development tutorials</li>
                        <li>JavaScript and modern ES features</li>
                        <li>UI and UX development practices</li>
                        <li>Project-based learning materials</li>
                    </ul>
                </div>

                <p>Members can explore these materials to build a strong foundation and improve their development skills.</p>
                <a href="https://www.youtube.com/results?search_query=react+js+full+course"><AiOutlineYoutube />YouTube</a>
                <a href="https://www.w3schools.com/react/"><SiW3Schools />W3Schools</a>
                <a href="https://react.dev/learn/tutorial-tic-tac-toe"><FaReact />React Documentation</a>
                <a href="https://www.freecodecamp.org/news/tag/react/"><FaFreeCodeCamp />freeCodeCamp</a>
                <a href="https://www.udemy.com/courses/development/web-development/"><SiUdemy />Udemy</a>
                <a href="https://www.coursera.org/specializations/meta-react"><SiCoursera />Coursera</a>
                <a href="https://github.com/trekhleb/javascript-algorithms"><AiFillGithub />JavaScript Algorithms</a>
            </div>
        </div>
    )
}
export default Resources;
