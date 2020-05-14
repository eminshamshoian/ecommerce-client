import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/index';

// Import Components
import MainLayout from '../layout/MainLayout';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    // Destructure
    const { name, email, password, error, success } = values;

    // Higher order function returns another function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        // So browser doesnt reload when button is clicked
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    onChange={handleChange('name')}
                    type='text'
                    className='form-control'
                    value={name}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    onChange={handleChange('email')}
                    type='eamil'
                    className='form-control'
                    value={email}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input
                    onChange={handleChange('password')}
                    type='password'
                    className='form-control'
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className='alert alert-info'
            style={{ display: success ? '' : 'none' }}
        >
            Acount Created! Please <Link to='/signin'>Signin!</Link>
        </div>
    );

    return (
        <MainLayout
            title='Sign Up'
            description='E-Commerce'
            className='container col-md-8 offset-md-2'
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </MainLayout>
    );
};

export default Signup;
