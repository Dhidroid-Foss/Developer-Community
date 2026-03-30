import dhinesh from '../assets/dhinesh.jpeg';
import '../Overall-Style-sheet/Mentors.css';


function Mentors(){
    return(
        <div>
            <header>
                <h1>Our Mentors</h1>
                <h2>Guiding the Next Generation of Developers</h2>
            </header>
            <div>
                <p>Our mentors are <strong>experienced professionals</strong>, <strong>passionate developers</strong>, and <strong>technology enthusiasts</strong> who believe in sharing knowledge and empowering the developer community.</p>
                <p>They play a crucial role in helping members navigate the ever-evolving digital landscape by providing <strong>technical guidance</strong>, <strong>career insights</strong>, and <strong>real-world development practices</strong>.</p>
                <p>Through mentorship, our community ensures that learners not only gain knowledge but also develop the <strong>confidence</strong> and <strong>practical skills</strong> required to succeed in the modern technology ecosystem.</p>
            </div>
            <div>
                <h3>Learning Beyond the Classroom</h3>
                <p>Our mentorship model focuses on learning through <strong>real-world experience</strong> rather than just theoretical discussions.</p>
                <p>Mentors encourage members to:</p>
                <ul>
                    <li><strong>Build practical projects</strong></li>
                    <li><strong>Participate in collaborative coding sessions</strong></li>
                    <li><strong>Experiment with new technologies</strong></li>
                    <li><strong>Engage in technical discussions and problem solving</strong></li>
                </ul>
                <p>This approach helps members develop the <strong>critical thinking</strong> and <strong>adaptability</strong> needed in modern software development.</p>
            </div>
            <div>
                <h3>Our Commitment to Growth</h3>
                <p>The mentorship program reflects our commitment to building a <strong>supportive</strong> and <strong>forward-thinking</strong> developer community.</p>
                <p>With guidance from experienced mentors, community members gain the confidence to <strong>learn</strong>, <strong>innovate</strong>, and <strong>contribute</strong> to the evolving technology ecosystem.</p>
                <p>Together, mentors and members work toward shaping a future driven by <strong>knowledge</strong>, <strong>collaboration</strong>, and <strong>technological advancement</strong>.</p>
            </div>
            <div className="mentors-container">
            <img src={dhinesh} alt="image" className="mentor-image" />
            <img src={dhinesh} alt="image" className="mentor-image" />
            <img src={dhinesh} alt="image" className="mentor-image" />
            <img src={dhinesh} alt="image" className="mentor-image" />
            <img src={dhinesh} alt="image" className="mentor-image" />
            </div>
        </div>
    );
}
export default Mentors;
