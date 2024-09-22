import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Pages/Login/login';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTrigger from "react-scroll-trigger";
import { useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { CookiesProvider } from 'react-cookie';
import ProtectedRoute from './ProtectedRoute';
import Schedule from './Pages/Schedule/Schedule';
import EmailLog from './Pages/Sentmail/EmailLog';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <ScrollTrigger>
        <CookiesProvider>
          <PrimeReactProvider value={{ styled: false }}>

            <div id="wrapper">
              <Routes>
               
                <Route exact path="/login" element={<Login />} />
                {/* Protected Routes */}
                 <Route exact path="/schedule" element={
                  <ProtectedRoute roles={['admin']}>
                    <Schedule />
                  </ProtectedRoute>
                } />
                 <Route exact path="/email-log" element={
                  <ProtectedRoute roles={['admin']}>
                    <EmailLog />
                  </ProtectedRoute>
                } />
                {/*<Route exact path="/books" element={
                  <ProtectedRoute roles={['Admin', 'Teacher', 'Student']}>
                    <Table />
                  </ProtectedRoute>
                } />
                
                <Route exact path="/add-book" element={
                  <ProtectedRoute roles={['Admin', 'Teacher']}>
                    <AddBooks />
                  </ProtectedRoute>
                } />
                <Route exact path="/transaction" element={
                  <ProtectedRoute roles={['Admin', 'Teacher', 'Student']}>
                    <BookTransaction />
                  </ProtectedRoute>
                } />
                
                <Route exact path="/pending" element={<Pending />} />
                <Route exact path="/blocked" element={<Blocked />} /> */}
              </Routes>
            </div>

          </PrimeReactProvider>

        </CookiesProvider>
      </ScrollTrigger>
    </>
  )
}

export default App
