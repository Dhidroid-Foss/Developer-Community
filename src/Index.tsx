import { useState, useEffect } from 'react';
import { supabase } from './Config/supabase.ts';
import './index.css';

interface Member {
    [key: string]: unknown;
}

function Index(){
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        async function getMembers() {
            const { data } = await supabase.from('members').select();
            if (data && data.length > 0) {
                setMembers(data);
            }
        }
        getMembers();
    }, []);

    return(
        <div>
            <section>
            <h3>Build. Teach. Inspire.</h3>
            <div>
            <p>
                Welcome to React Collective, 
                A community of passionate React developers who believe knowledge grows when shared.
                Whether through webinars, workshops, alumni talks, or offline meetups, we bring developers together to teach, learn, and grow as a community.
            </p>
            </div>
            <h3>Code Together. Teach Together. Grow Together.</h3>
            <p>
                The React Developer Community is an open and collaborative platform created for developers, students, and technology enthusiasts who are passionate about learning, building, and sharing knowledge in modern web development.
                Our community is built on the belief that technology grows stronger when knowledge is shared openly. By bringing together motivated individuals from different backgrounds, we aim to create an environment where learning, innovation, and collaboration thrive.
                This is not just a place to learn React — it is a space where ideas turn into projects, curiosity turns into expertise, and individuals grow into contributors of the technology ecosystem.
            </p>
            <p>
                This platform connects React developers who are passionate about sharing knowledge and helping others grow in the world of modern web development.
                Our members work across different companies, cities, and industries, but they all share one common goal: to give back to the developer community.
                Through collaborative learning and mentorship, we create opportunities for developers to teach, learn, and inspire others.
            </p>
            </section>

            <section className="image-section">
                <img src="/src/assets/community11.webp" alt="image" className="community-image" />
                <img src="/src/assets/community12.webp" alt="image" className="community-image" />
                <img src="/src/assets/community13.png" alt="image" className="community-image" />
            </section>
            {members.length > 0 && (
                <ul>
                    {members.map((member, index) => (
                        <li key={index}>{JSON.stringify(member)}</li>
                    ))}
                </ul>
            )}
        </div>
    );

}
export default Index;