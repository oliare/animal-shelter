import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import AboutUsPage from './pages/about/AboutUsPage';
import AdoptPage from './pages/adopt/AdoptPage';
import CreateAnimalPage from './pages/create-animal/CreateAnimalPage';
import EditAnimalPage from './pages/edit-animal/EditAnimalPage';
import AnimalDetailsPage from './pages/detail/AnimalDetailsPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/create-animal' element={<CreateAnimalPage />} />
            <Route path='/update/:id' element={<EditAnimalPage />} />
            <Route path='/about-us' element={<AboutUsPage />} />
            <Route path='/adopt' element={<AdoptPage />} />
            <Route path='/detail/:id' element={<AnimalDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
