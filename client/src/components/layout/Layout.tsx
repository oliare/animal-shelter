import Header from "../header/Header"
import Footer from "../footer/Footer"
import { Outlet } from "react-router-dom"
import ScrollToTopButton from "../../common/scrollButton"

const Layout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header></Header>

                <ScrollToTopButton />
                <main className="flex-grow">
                    <Outlet></Outlet>
                </main>

                <Footer></Footer>
            </div>
        </>
    )
}
export default Layout