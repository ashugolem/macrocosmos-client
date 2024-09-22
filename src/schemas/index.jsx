import * as Yup from 'yup'

export const AddBookSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.number().min(13, "Minimum Length should must be 13").required('ISBN is required'),
    subject: Yup.string().required('Subject is required'),
    stock: Yup.number().required('Stock is required'),
    publishedOn: Yup.date().required('Published Date is Required'),
    price: Yup.number().required('Price is required'),
    selfNo: Yup.number().required('Self No is required'),
})

export const LoginSchema = Yup.object({
    email: Yup.string().email().required('Email or User ID is required'),
    password: Yup.string().min(5).required('Password is required'),
})
export const FineSchema = Yup.object({
    finePerDay: Yup.number().required('Enter the daily fine amount'),
    deadline: Yup.number().required('Enter the deadline'),
})
export const ChangePasswordSchema = Yup.object({
    oldPassword: Yup.number().min(4, "Minimum Length should must be 4").required('Enter the Old Password'),
    password: Yup.string().min(4, "Minimum Length should must be 4").required('Password is required'),
    confirmPassword: Yup.string().label('Confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})
export const SubmitBookSchema = Yup.object({
    book: Yup.string().required('Choose book'),
})


export const AddUserSchema = Yup.object({
    name: Yup.string().min(3).required('Name is required'),
    phone: Yup.string().min(10, "Minimum Length should must be 10").required('Phone is required'),
    email: Yup.string().email().required('Email is required'),
    role: Yup.string().required('Role is required'),
    admissionNo: Yup.string().min(3).required('Admission Number is required'),
    course: Yup.string().required('Course is required'),
    branch: Yup.string().min(3).required('Branch is required'),
    semester: Yup.string().required('Semester is required'),
})
export const SignupSchema = Yup.object({
    name: Yup.string().min(3).required('Name is required'),
    phone: Yup.string().min(10, "Minimum Length should must be 10").required('Phone is required'),
    email: Yup.string().email().required('Email is required'),
    role: Yup.string().required('Role is required'),
    admissionNo: Yup.string().min(3).required('Admission Number is required'),
    course: Yup.string().required('Course is required'),
    branch: Yup.string().min(3).required('Branch is required'),
    semester: Yup.string().required('Semester is required'),
    password: Yup.string().min(5, "Minimum Length should must be 5").required('Password is required'),
    password_repeat: Yup.string().label('Confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})