import styles from './HomePage.module.css'
import AboutUsPage from '../about/AboutUsPage'
import AdoptPage from '../adopt/AdoptPage'

const HomePage = () => {
    return (
        <>
            <div className={styles.bgPets}>
                <div className={styles.sounds}>
                    <div className={styles.meow}>
                        <p>Meow</p>
                    </div>
                    <div className={styles.bark}>
                        <p>Woof</p>
                    </div>
                </div>
                <div className={styles.adopt}>
                    <button className={styles.btnAdopt}>
                        Adopt Now
                    </button>
                </div>
            </div>

            <AboutUsPage />
            <AdoptPage />

        </>
    )
}
export default HomePage