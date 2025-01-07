import './HomePage.css'
import AboutUsPage from '../about/AboutUsPage'
import AdoptPage from '../adopt/AdoptPage'

const HomePage = () => {
    return (
        <>
            <div className="background-pets">
                <div className="sound-container">
                    <div className="meow-container">
                        <p>Meow</p>
                    </div>
                    <div className="bark-container">
                        <p>Woof</p>
                    </div>
                </div>
                <div className="adopt-container">
                    <button className="btn-adopt">
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