import { useState } from 'react';
import '../Overall-Style-sheet/Event.css';

function Event(){
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      <div>
        <p>Our community regularly organizes events designed to help developers learn, connect, and grow together. These events bring experienced professionals and passionate learners onto a single platform where ideas are shared and knowledge is exchanged.</p>
        
        <p>From technical webinars to hands-on workshops and community meetups, every event is an opportunity to gain insights, build skills, and connect with fellow developers.</p>
        
        <p>Stay tuned for our upcoming sessions and be part of the learning experience.</p>
      </div>

      <div>
        <h2>Webinars</h2>
        <div className="event-images-container">
          <img src="/src/assets/event11.webp" alt="image" className="event-image" onClick={() => openModal("/src/assets/event11.webp")} />
          <img src="/src/assets/event12.webp" alt="image" className="event-image" onClick={() => openModal("/src/assets/event12.webp")} />
          <img src="/src/assets/event13.jpg" alt="image" className="event-image" onClick={() => openModal("/src/assets/event13.jpg")} />
        </div>
        <p>Interactive online sessions where experienced developers share insights about React, frontend technologies, and real-world development practices.</p>
      </div>

      <div>
        <h2>Workshops</h2>
        <div className="event-images-container">
          <img src="/src/assets/event21.jpg" alt="image" className="event-image" onClick={() => openModal("/src/assets/event21.jpg")} />
          <img src="/src/assets/event22.jpg" alt="image" className="event-image" onClick={() => openModal("/src/assets/event22.jpg")} />
          <img src="/src/assets/event23.webp" alt="image" className="event-image" onClick={() => openModal("/src/assets/event23.webp")} />
        </div>
        <p>Hands-on sessions focused on building real applications, solving coding challenges, and improving practical development skills.</p>
      </div>

      <div>
        <h2>Guest Lectures</h2>
        <div className="event-images-container">
          <img src="/src/assets/event41.png" alt="image" className="event-image" onClick={() => openModal("/src/assets/event41.png")} />
          <img src="/src/assets/event42.jpg" alt="image" className="event-image" onClick={() => openModal("/src/assets/event42.jpg")} />
        </div>
        <p>Industry professionals and experienced engineers share their journey, knowledge, and insights into the evolving tech landscape.</p>
      </div>

      <div>
        <h2>Community Meetups</h2>
        <div className="event-images-container">
          <img src="/src/assets/event31.jpg" alt="image" className="event-image" onClick={() => openModal("/src/assets/event31.jpg")} />
          <img src="/src/assets/event32.jpg" alt="image" className="event-image" onClick={() => openModal("/src/assets/event32.jpg")} />
        </div>
        <p>In-person gatherings where developers network, discuss ideas, and strengthen the developer ecosystem.</p>
      </div>

      <div>
        <p>Be part of our upcoming events and connect with developers who share the same passion for technology.</p>
        <p>Learn new skills, exchange ideas, and grow together with the community.</p>
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <button className="close-button" onClick={closeModal}>×</button>
          <img src={selectedImage} alt="Full size" className="modal-image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
export default Event;
