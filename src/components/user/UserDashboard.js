import React from 'react';
import MainLayout from '../layout/MainLayout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header p-4'>User Links</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/cart'>
                            My Cart
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/profile/update'>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header p-4'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item py-3'>Name: {name}</li>
                    <li className='list-group-item py-3'>Email: {email}</li>
                    <li className='list-group-item py-3 dashboard-items'>
                        Account Type: {role === 1 ? 'Admin' : 'Registered User'}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header p-4'>Purchase History</h3>
                <ul className='list-group'>
                    <li className='list-group-item py-3 dashboard-items'>
                        History
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <MainLayout
            title='Dashboard'
            description={`Welcome ${name}`}
            className=''
        >
            <div className='row justify-content-center px-5'>
                <div className='col-3 mr-5'>{userLinks()}</div>
                <div className='col-7 ml-5'>
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </MainLayout>
    );
};

export default UserDashboard;
