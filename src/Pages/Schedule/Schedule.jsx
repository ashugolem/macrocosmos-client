import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import Lottie from 'lottie-react';
import animationData from '../../assets/Loading/Airplane.json';
import Members from '../../Components/Members/Members';
import { NavBar } from '../../Components/NavBar';

function Schedule() {
  document.title = "MacroCosmos - Schedule";
  const isLoggedIn = useSelector((state) => state.setLog.isLoggedIn);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const showError = (errorMsg) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
  };

  return (
    <>
      <Toast ref={toast} />
      {loading
        ?
        <div className="container d-flex justify-content-center" style={styles.animation}>
          <Lottie animationData={animationData} loop={true} style={{ width: '250px' }} />
        </div>
        :
        <>
        <NavBar/>
          <div id="content-wrapper " style={{ width: '100%', padding: '2rem' }}>
            <div id="content ">
              <div className="row row-1200 d-flex justify-content-between" >
                <Members />
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default Schedule;
