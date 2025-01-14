import styles from './AboutUsPage.module.css';

const AboutUsPage = () => {
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
                <div className={styles['achievements']}><span className={styles['number']}>2 500</span> Pets adopted</div>
                <div className={styles['about-image']}>
                    <img src="/images/cats/cat-home.png" alt="Who We Are" />
                </div>
            </div>

            <div className={`${styles['our-mission']} my-7`}>
                <div className={styles['about-image']}>
                    <img src="/images/dogs/dog-home.png" alt="Our Mission" />
                </div>
                <div className={styles['achievements']}><span className={styles['number']}>200 +</span>Volunteers</div>
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
                <div className={`${styles['achievements']} mt-5`}><span className={styles['number']}>1k</span> Donations raised</div>
                <div className={styles['about-image']}>
                    <img src="/images/cats/cat-dog.png" alt="What We Do" />
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
