import { useEffect, useState } from 'react';
import styles from './AboutUsPage.module.css';

const AboutUsPage = () => {
    
    // TODO dynamic increase
    const [adoptedPets, setAdoptedPets] = useState(0);
    const [volunteers, setVolunteers] = useState(0);
    const [donations, setDonations] = useState(0);

    const incrementNumber = (target: any, set: any, speed : any) => {
        let begin = 0;
        const increment = Math.ceil(target / (speed / 10)); 
        const timer = setInterval(() => {
            begin += increment;
            
            if (begin >= target) {
                begin = target;
                clearInterval(timer);
            }
            set(begin);
        }, 10);
    };

    useEffect(() => {
        incrementNumber(2500, setAdoptedPets, 2000); 
        incrementNumber(200, setVolunteers, 1500); 
        incrementNumber(1000, setDonations, 2500); 
    }, []);
    //   

    return (
        <div className={styles['container']}>
            <div className={styles['who-we-are']}>
                <div className={styles['about-content']}>
                    <h2>Who we are ?</h2>
                    <p>
                        We are a team dedicated to helping animals. Our mission is to find new homes for stray animals and provide them with
                        a comfortable living environment. We work closely with organizations, shelters, and volunteers.
                    </p>
                </div>
                <div className={styles['achievements']}><span className={styles['number']}>{adoptedPets}</span> Pets adopted</div>
                <div className={styles['about-image']}>
                    <img src="/images/cats/cat-home.png" alt="Who We Are" />
                </div>
            </div>

            <div className={`${styles['our-mission']} my-7`}>
                <div className={styles['about-image']}>
                    <img src="/images/dogs/dog-home.png" alt="Our Mission" />
                </div>
                <div className={styles['achievements']}><span className={styles['number']}>{volunteers} +</span>Volunteers</div>
                <div className={styles['about-content']}>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to give every animal a chance at a new and happy life in a loving family. We aim to raise awareness
                        about the issues of stray animals and contribute to solving these problems.
                    </p>
                </div>
            </div>

            <div className={`${styles['what-we-do']} mt-8`}>
                <div className={styles['about-content']}>
                    <h2>What We Do</h2>
                    <ul>
                        <li>Finding homes for stray animals.</li>
                        <li>Organizing charity events and campaigns.</li>
                        <li>Training and supporting new pet owners.</li>
                        <li>Collaborating with shelters and volunteers.</li>
                    </ul>
                </div>
                <div className={`${styles['achievements']} mt-5`}><span className={styles['number']}>{donations}</span> Donations raised</div>
                <div className={styles['about-image']}>
                    <img src="/images/cats/cat-dog.png" alt="What We Do" />
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
