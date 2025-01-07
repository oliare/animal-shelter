import './AboutUsPage.css'

const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            <div>
                <div className='who-we-are'>
                    <div className="about-content">
                        <h2>Who we are ?</h2>
                        <p>
                            We are a team dedicated to helping animals. Our mission is to find new homes for stray animals and provide them with
                            a comfortable living environment. We work closely with organizations, shelters, and volunteers.
                        </p>
                    </div>
                    <div className='achievements'><span className="number">1100</span> Pets adopted</div>
                    <div className="about-image">
                        <img src="/images/cats/foxy-cats.png" alt="Who We Are" />
                    </div>
                </div>

                <div className='our-mission my-10'>
                    <div className="about-image">
                        <img src="/images/dogs/dog.png" alt="Our Mission" />
                    </div>
                    <div className='achievements'><span className="number">500+</span> Active volunteers</div>
                    <div className="about-content">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to give every animal a chance at a new and happy life in a loving family. We aim to raise awareness
                            about the issues of stray animals and contribute to solving these problems.
                        </p>
                    </div>
                </div>

                <div className='what-we-do'>
                    <div className="about-content">
                        <h2>What We Do</h2>
                        <ul>
                            <li>Finding homes for stray animals.</li>
                            <li>Organizing charity events and campaigns.</li>
                            <li>Training and supporting new pet owners.</li>
                            <li>Collaborating with shelters and volunteers.</li>
                        </ul>
                    </div>
                    <div className='achievements'><span className="number">1k</span> Donations raised</div>
                    <div className="about-image">
                        <img src="/images/cats/cat.png" alt="What We Do" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
