import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { Modal, Button, ModalHeader } from 'react-bootstrap';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import animationData from '../../assets/Loading/Airplane.json';
import Lottie from 'lottie-react';
import CreateSchedule from '../../Pages/Schedule/API/createSchedule';
import moment from 'moment/moment';

const CreateScheduleModal = (props) => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState({ hour: '', minute: '' });
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState('');
    const submit = useRef(null);
    const cancelRef = useRef(null);

    const initialValues = {
        schedule_date: '',
        schedule_time: '',
        schedule_comment: '',
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            onSubmit: async (values, actions) => {
                try {
                    setLoading(true);
                    console.log(isPastDate(date));
                    if (!date || isPastDate(date)) {
                        props.showError('Please select a valid future date.');
                        setLoading(false);
                        return;
                    }

                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    const scheduleData = {
                        admin_id: 1,
                        schedule_date: formattedDate,
                        schedule_time: `${time.hour}:${time.minute}:00`,
                        schedule_comment: values.schedule_comment,
                        users: props.selectedUsers.map(user => ({ user_id: user.user_id }))
                    };

                    const response = await CreateSchedule(scheduleData);
                    if (response.success) {
                        props.showSuccess(`Schedule created successfully!`);
                    } else {
                        props.showError(response.message);
                    }
                } catch (error) {
                    props.showError(error.message);
                } finally {
                    setLoading(false);
                    cancelRef.current.click();
                    actions.resetForm();
                }
            },
        });

        const isPastDate = (date) => {
            const today = moment();
            const inputDate = moment(date);
            return inputDate.isBefore(today) && !inputDate.isSame(today, 'day');;
        };

    return (
        <Modal
            show={props.show}
            onClose={props.onClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <ModalHeader>
                <h5 className='text-white fw-bold text-center w-100'>Create Schedule</h5>
            </ModalHeader>
            <Modal.Body className="text-center text-success">
                {loading && (
                    <div className="container bg-white w-100 h-100 d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999 }}>
                        <Lottie animationData={animationData} loop={true} />
                    </div>
                )}
                <h6>Enter Schedule Details</h6>
                <ScrollPanel style={{ width: '100%', height: '550px' }}>
                    <form onSubmit={handleSubmit} className='d-flex align-items-center flex-column justify-content-center'>
                        <div className="mb-3">
                            <Calendar
                                value={date}
                                onChange={(e) => {
                                    setDate(e.value);
                                    setDateError('');
                                    handleChange({ target: { name: 'schedule_date', value: e.value } });
                                }}
                                placeholder='Select Date'
                                minDate={new Date()}
                                appendTo="self"
                            />
                            {dateError && <p className="form-error text-danger">{dateError}</p>}
                        </div>
                        <div className="mb-3 d-flex">
                            <Dropdown
                                value={time.hour}
                                options={[...Array(24).keys()].map(h => ({ label: String(h).padStart(2, '0'), value: String(h).padStart(2, '0') }))} 
                                onChange={(e) => { setTime({ ...time, hour: e.value }); handleChange({ target: { name: 'schedule_time', value: e.value + ':' + time.minute + ':00' } }); }} 
                                placeholder="Hour"
                                className="me-2"
                                appendTo="self"
                            />
                            <Dropdown
                                value={time.minute}
                                options={[0, 15, 30, 45].map(m => ({ label: String(m).padStart(2, '0'), value: String(m).padStart(2, '0') }))} 
                                onChange={(e) => { setTime({ ...time, minute: e.value }); handleChange({ target: { name: 'schedule_time', value: time.hour + ':' + e.value + ':00' } }); }} 
                                placeholder="Minute"
                                appendTo="self"
                            />
                        </div>
                        {(!time.hour || !time.minute) && <p className="form-error text-danger">Please select a time.</p>}
                        <div className="mb-3">
                            <InputText
                                placeholder='Comment'
                                value={values.schedule_comment}
                                name="schedule_comment"
                                onBlur={handleBlur}
                                onChange={(e) => { setComment(e.target.value); handleChange(e); }}
                            />
                        </div>
                        <div className="mb-5">
                            <button ref={submit} className="btn btn-primary shadow px-3 py-2" type="submit" style={{ display: "none" }}>
                                Create Schedule
                            </button>
                        </div>
                    </form>
                </ScrollPanel>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-center w-100">
                    <Button variant="primary" onClick={() => submit.current.click()} style={{ borderRadius: '5px' }}>
                        Create
                    </Button>
                    <Button ref={cancelRef} variant="secondary" onClick={props.onClose} style={{ borderRadius: '5px' }}>
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateScheduleModal;
