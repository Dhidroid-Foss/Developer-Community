import { useState } from 'react';
import '../Overall-Style-sheet/Event.css';
import event11 from '../assets/event11.webp?url';
import event12 from '../assets/event12.webp?url';
import event13 from '../assets/event13.jpg?url';
import event21 from '../assets/event21.jpg?url';
import event22 from '../assets/event22.jpg?url';
import event23 from '../assets/event23.webp?url';
import event31 from '../assets/event31.jpg?url';
import event32 from '../assets/event32.jpg?url';
import event41 from '../assets/event41.png?url';
import event42 from '../assets/event42.jpg?url';

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
          <img src={event11} alt="image" className="event-image" onClick={() => openModal(event11)} />
          <img src={event12} alt="image" className="event-image" onClick={() => openModal(event12)} />
          <img src={event13} alt="image" className="event-image" onClick={() => openModal(event13)} />
        </div>
        <p>Interactive online sessions where experienced developers share insights about React, frontend technologies, and real-world development practices.</p>
      </div>

      <div>
        <h2>Workshops</h2>
        <div className="event-images-container">
          <img src={event21} alt="image" className="event-image" onClick={() => openModal(event21)} />
          <img src={event22} alt="image" className="event-image" onClick={() => openModal(event22)} />
          <img src={event23} alt="image" className="event-image" onClick={() => openModal(event23)} />
        </div>
        <p>Hands-on sessions focused on building real applications, solving coding challenges, and improving practical development skills.</p>
      </div>

      <div>
        <h2>Guest Lectures</h2>
        <div className="event-images-container">
          <img src={event41} alt="image" className="event-image" onClick={() => openModal(event41)} />
          <img src={event42} alt="image" className="event-image" onClick={() => openModal(event42)} />
        </div>
        <p>Industry professionals and experienced engineers share their journey, knowledge, and insights into the evolving tech landscape.</p>
      </div>

      <div>
        <h2>Community Meetups</h2>
        <div className="event-images-container">
          <img src={event31} alt="image" className="event-image" onClick={() => openModal(event31)} />
          <img src={event32} alt="image" className="event-image" onClick={() => openModal(event32)} />
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
