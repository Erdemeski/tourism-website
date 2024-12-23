import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AdvertisementsPage from './pages/AdvertisementsPage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx'
import CreateAdvertisement from './pages/CreateAdvertisement.jsx'
import UpdateAdvertisement from './pages/UpdateAdvertisement.jsx'
import AdvertisementDetailsPage from './pages/AdvertisementDetailsPage.jsx'
import NotFound from './pages/NotFound.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-advertisement" element={<CreateAdvertisement />} />
          <Route path="/update-advertisement/:advertisementId" element={<UpdateAdvertisement />} />
        </Route>

        <Route path="/advertisements" element={<AdvertisementsPage />} />
        <Route path="/advertisement/:advSlug" element={<AdvertisementDetailsPage />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
