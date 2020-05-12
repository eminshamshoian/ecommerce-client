import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../../auth/index';

// Import Components
import MainLayout from '../layout/MainLayout';

const Signin = () => {
    const [values, setValues] = useState({
        email: 'eminshamshoian@gmail.com',
        password: 'eminsh1319',
        error: '',
        loading: false,
        redirect: false
    });

    // Destructure
    const { email, password, loading, error, redirect } = values;

    // Higher order function returns another function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        // So browser doesnt reload when button is clicked
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirect: true
                    });
                });
            }
        });
    };

    const SignInForm = () => (
        <form>
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

    const showLoading = () =>
        loading && (
            <div className='alert alert-info'>
                <h1>Loading...</h1>
            </div>
        );

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to='/' />;
        }
    };

    return (
        <MainLayout
            title='Sign Up'
            description='E-Commerce'
            className='container col-md-8 offset-md-2'
        >
            {showLoading()}
            {showError()}
            {SignInForm()}
            {redirectUser()}
        </MainLayout>
    );
};

export default Signin;
