import React from 'react';
import MainLayout from '../layout/MainLayout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header p-4'>Admin Links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/category'>
                            Create Category
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/product'>
                            Create Product
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header p-4'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>Name: {name}</li>
                    <li className='list-group-item'>Email: {email}</li>
                    <li className='list-group-item dashboard-items'>
                        Account Type: {role === 1 ? 'Admin' : 'User'}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <MainLayout
            title='Dashboard'
            description={`Welcome ${name}`}
            className='container'
        >
            <div className='row justify-content-center px-5 py-5'>
                <div className='col-3 mr-5'>{adminLinks()}</div>
                <div className='col-7 ml-5'>{adminInfo()}</div>
            </div>
        </MainLayout>
    );
};

export default AdminDashboard;
