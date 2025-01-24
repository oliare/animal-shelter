import { PhoneFilled, EnvironmentFilled, MailFilled } from '@ant-design/icons';
import styles from './ContactPage.module.css';

const ContactPage = () => {
    return (
        <div className={`${styles.contactPage} mt-[50px]`}>
            <div className={styles.aboutUs}>
                <h2>About Us</h2>
                <div className={styles.aboutContent}>
                    <p className={styles.mission}>
                        At <strong>Paw Haven</strong>, our mission is to connect people with their future best friends.
                        We believe every animal deserves a loving home and a happy life.
                    </p>
                    <p>
                        From rescue operations to adoption days, we are committed to ensuring that every animal
                        receives the care and love they deserve. Join us in making a difference!
                    </p>
                    <div className={styles.contactDetails}>
                        <div>
                            <h3>
                                <EnvironmentFilled className='mr-3' />
                                Our Office
                            </h3>
                            <p>123 Pet Avenue, Paw City</p>
                        </div>
                        <div>
                            <h3>
                                <PhoneFilled className='mr-3' />
                                Call Us
                            </h3>
                            <p>+1 (123) 456-7890</p>
                        </div>
                        <div>
                            <h3>
                                <MailFilled className='mr-3' />
                                Email
                            </h3>
                            <p>info@pawhaven.com</p>
                        </div>
                    </div>
                </div>
            </div>
                <div className={`${styles.contactGrid} mt-[50px]`}>
                    <form className={styles.contactForm}>
                    <p className={styles.formInfo}>You can leave some information in the form below</p>
                    <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                        <textarea placeholder="Your Message"></textarea>
                        <button type="submit">Send</button>
                    </form>
                    <div className={`${styles.map}`}>
                        <iframe
                            src="https://www.google.com/maps/embed?..."
                            title="Google Map"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

        </div>
    );
};

export default ContactPage;
