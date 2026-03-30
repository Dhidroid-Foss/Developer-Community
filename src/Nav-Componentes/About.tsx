import '../Overall-Style-sheet/About.css'
function About(){
    return(
        <section>
        <div className="about-header">
            <div>
            <h2>Our Mission</h2>
            <p>
                Our mission is to create a supportive ecosystem where developers are empowered to teach, learn, and grow together.
                We believe that knowledge should not stay limited within companies or individuals. Instead, it should be shared openly to strengthen the developer community as a whole.
            </p>
            </div>
            <h3>What We Do</h3>
            <div className="about-header-containers">
                <div className='about-grid-layout'>
                <div className="about-header-container-one">
                <h4>Webinars</h4>
                <p>
                    Online sessions where experienced developers share their knowledge, real-world practices, and modern React techniques with the community.
                </p>
                </div>
                <div className="about-header-container-two">
                <h4>Workshops</h4>
                <p>
                    Hands-on learning experiences where participants build projects, solve problems, and improve their practical React development skills.
                </p>
                </div>
                <div className="about-header-container-three">
                <h4>Alumni Talks</h4>
                <p>
                    Developers who have progressed in their careers return to share their journey, lessons, and industry insights with aspiring developers.
                </p>
                </div>
                <div className="about-header-container-four">
                <h4>Offline Meetups</h4>
                <p>
                    Community gatherings where developers meet in person to discuss ideas, collaborate on projects, and strengthen professional connections.
                </p>
                </div>
                </div>
            </div>
        <div className="about-table">
            <div className="about-table-content-left">
                <h3>Who Can Join</h3>
                <ul>
                    <li>Share their knowledge and experience</li>
                    <li>Mentor and guide new developers</li>
                    <li>Host workshops or webinars</li>
                    <li>Contribute to community growth</li>
                    <li>Connect with like-minded developers</li>
                </ul>
            </div>
            <div className="about-table-content-right">
                <h3>Community Values</h3>
                <ul>
                    <li>Collaboration over competition</li>
                    <li>Learning through sharing</li>
                    <li>Practical knowledge over theory</li>
                    <li>Supportive and inclusive environment</li>
                </ul>
            </div>
        </div>
            <p className='about-bottom-content-from-table'>Whether you are a beginner, intermediate developer, or industry expert, everyone has something valuable to share.</p>
        <hr />
        <div className='about-join-community-note'>
            <h3>Call To Action</h3>
            <p>Be part of a community that believes in learning by teaching and growing together.</p>
            <p>Join us in building a stronger React developer ecosystem.</p>
        </div>
        <div className='about-join-community-tag'>
            <h4>Join the Community Today</h4>
                <div className="btn-bottom">
                    <button className="btn-bottom-one">Join the Community</button>
                    <button className="btn-bottom-two">Host a Session</button>
                </div>
        </div>
    </div>
    </section>
    );
}
export default About;