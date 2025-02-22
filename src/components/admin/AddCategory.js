import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { createCategory } from './ApiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Destructure
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError('');
        setName(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // Create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                setSuccess(true);
            }
        });
    };

    const showSuccess = () => {
        if (success) {
            return <h3 className='text-success'>{name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className='text-danger'>Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning'>
                <button className='primary-button'>
                    <i class='fas fa-caret-left mr-3'></i>Back
                </button>
            </Link>
        </div>
    );

    const newCategoryForm = () => (
        <form className='mb-3 admin-form p-5' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='text-muted'>
                    What would you like to name this category?
                </label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className='primary-button'>Add Category</button>
        </form>
    );

    return (
        <MainLayout
            title='Add a new category'
            description={`Welcome ${user.name}, want to add a new category?`}
        >
            <div className='row py-5'>
                <div className='col-md-8 offset-md-2'>
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </MainLayout>
    );
};

export default AddCategory;
