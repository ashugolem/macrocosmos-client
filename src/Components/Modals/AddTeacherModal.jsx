import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { Modal, Button, ModalHeader } from 'react-bootstrap';
import { ScrollPanel } from 'primereact/scrollpanel'
import { AddUserSchema } from '../../schemas';
import { InputText } from 'primereact/inputtext';
import animationData from '../../assets/Loading/Airplane.json';
import Lottie from 'lottie-react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import AddUserForAdmin from '../API/AllUsers/AddUser';
import CheckUser from '../API/Signup/CheckUser';

const AddTeacher = (props) => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextMonth = month === 11 ? 0 : month + 1;
    let tenPrevYears = nextMonth === 0 ? year - 10 : year - 9;

    const [date, setDate] = useState(null);
    let maxDate = new Date();
    maxDate.setMonth(month);
    maxDate.setFullYear(tenPrevYears);
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        role: "Teacher",
        eid: '',
        designation: '',
        admissionNo: '',
    }
    const [loading, setLoading] = useState(false)
    const submit = useRef(null);
    const cancelRef = useRef(null);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: AddUserSchema,
            onSubmit: async (values, action) => {
                try {
                    console.log(values)
                    setLoading(true)
                    const value = await CheckUser({ ...values, password: "123456", password_repeat: "123456" });
                    if (value === 'exists') {
                        props.showError("User already exists!")
                        setTimeout(() => {
                            document.getElementById('add-user-form').reset();
                        }, 1500);
                    }
                    else if (value === 'not-exists') {
                        setLoading(true)
                        const response = await AddUserForAdmin(values);
                        if (response.success) {
                            props.showSuccess(`User - ${values.name} added successfully!`);
                        }
                        else {
                            props.showError(response.msg)
                        }
                        setLoading(false)
                    }
                } catch (error) {
                    props.showError(error.message)
                }
                finally {
                    setLoading(false)
                    cancelRef.current.click()
                }
                action.resetForm();
            },
        });
    return (
        <>

            <Modal
                show={props.show}
                onClose={props.onClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <ModalHeader>
                    <h5 className='text-white fw-bold text-center w-100'>Create User</h5>
                </ModalHeader>
                <Modal.Body className="text-center text-success ">
                    {loading && (<div className="container bg-white w-100 h-100 d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, maxHeight: '100%', maxWidth: '90%' }}>
                        <Lottie animationData={animationData} loop={true} />
                    </div>)}
                    <h6>Enter Details of New User</h6>
                    <ScrollPanel style={{ width: '100%', height: '550px' }} >
                        <form onSubmit={handleSubmit} id='add-user-form' className='d-flex align-items-center flex-column justify-content-center' style={{ border: '' }}>

                            <div className="mb-3">
                                <InputText placeholder='Name' value={values.name} id='name' name="name" minLength="5" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                                {errors.name && touched.name ? (
                                    <p className="form-error text-danger">{errors.name}</p>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <InputText placeholder='Email' value={values.email} id='email' name="email" minLength="5" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                                {errors.email && touched.email ? (
                                    <p className="form-error text-danger">{errors.email}</p>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <InputText placeholder='Phone' value={values.phone} id='phone' name="phone" minLength="10" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                                {errors.phone && touched.phone ? (
                                    <p className="form-error text-danger">{errors.phone}</p>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <InputText placeholder='Employee ID' required value={values.eid} name="eid" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                                {errors.eid && touched.eid ? (
                                    <p className="form-error text-danger">{errors.eid}</p>
                                ) : null}

                            </div>
                            <div className="mb-3">
                                <InputText placeholder='Designation' required value={values.designation} name="designation" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                                {errors.designation && touched.designation ? (
                                    <p className="form-error text-danger">{errors.designation}</p>
                                ) : null}

                            </div>
                            <div className="mb-5">
                                <button ref={submit} className="btn btn-primary shadow px-3 py-2" type="submit" style={{ display: "none" }}>
                                    Add User
                                </button>
                            </div>
                        </form>
                    </ScrollPanel>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-center w-100 ">
                        <Button
                            variant="primary"
                            style={{
                                borderRadius: '5px',
                            }}
                            onClick={() => submit.current.click()}
                        >
                            Update
                        </Button>
                        <Button
                            ref={cancelRef}
                            variant="Primary"
                            onClick={props.onClose}
                            style={{
                                borderRadius: '5px',
                            }}
                        >
                            Back
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddTeacher;
