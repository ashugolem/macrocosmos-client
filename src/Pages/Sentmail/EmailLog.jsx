import React, { useEffect, useRef, useState } from 'react'
import { NavBar } from '../../Components/NavBar';
import getAllEmailLogs from './API/getAllEmailLogs';
import animationData from '../../assets/Loading/Airplane.json'
import Lottie from 'lottie-react';
import { ScrollPanel } from "primereact/scrollpanel";
import { Toast } from 'primereact/toast';
import moment from 'moment/moment';

export default function EmailLog() {
    const styles = {
        table: {
            padding: "0px",
        },
        tableHeader: {
            paddingRight: "0px",
        },
    };
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    useEffect(() => {
        getAllUsers();
    }, []);

    const showError = (errorMsg) => {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: errorMsg,
            life: 3000,
          });
        }
      };

    const getAllUsers = async () => {
        try {
            setLoading(true)
            const allEmail = await getAllEmailLogs();
            setEmails(allEmail.data);
        } catch (error) {
            showError("Failed to fetch users.");
        } finally{
            setLoading(false)
        }
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
                    <NavBar />
                    <div id="content-wrapper " style={{ width: '100%', padding: '2rem' }}>
                        <div id="content ">
                            <div className="row row-1200 d-flex justify-content-between" >
                                <h2 className=' fw-bold text-center w-100'>All Sent Mails</h2>
                                <div className="card mt-4">
                                    <div className="card-header d-flex justify-content-between text-primary text-center py-3">
                                        <div className="fw-bold">
                                            <h5 className="fw-bold my-auto text-larger">
                                                All emails that are sent and recorded
                                            </h5>
                                            <h6 className="fw-bold text-start my-auto text-muted text-larger">
                                                Total - {emails.length}
                                            </h6>
                                        </div>
                                    </div>
                                    <ScrollPanel style={{ width: "100%", height: "500px" }}>
                                        <table
                                            className="align-middle table my-0"
                                            style={styles.table}
                                            id="dataTable"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Schedule ID</th>
                                                    <th>Reciepient ID</th>
                                                    <th>Type</th>
                                                    <th>Sent At</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {emails.map((email) => (
                                                    <tr key={email.id}>
                                                        <td>{email.id}</td>
                                                        <td>{email.schedule_id}</td>
                                                        <td>{email.recipient_id}</td>
                                                        <td>{email.email_type}</td>
                                                        <td>{moment(email.email_sent_at).format('dddd DD/MM/YYYY hh:mm:ss')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </ScrollPanel>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>

    )
}
