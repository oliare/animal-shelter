import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import AboutUsPage from './pages/about/AboutUsPage';
import AdoptHomePage from './pages/adopt/AdoptHomePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/about-us' element={<AboutUsPage />} />
          <Route path='/adopt' element={<AdoptHomePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
