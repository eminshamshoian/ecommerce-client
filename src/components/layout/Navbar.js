import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
import './Navbar.css';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#D8092F' };
    }
};

const Navbar = ({ history }) => {
    return (
        <div className='px-5'>
            <nav className='navbar navbar-expand-lg'>
                <Link class='navbar-brand' to='/'>
                    <h4>ecomemrce</h4>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='nav ml-auto p-2'>
                        <li className='nav-item'>
                            <Link
                                className='nav-link'
                                style={isActive(history, '/')}
                                to='/'
                            >
                                Home
                            </Link>
                        </li>
                        {isAuthenticated() &&
                            isAuthenticated().user.role === 0 && (
                                <li className='nav-item'>
                                    <Link
                                        className='nav-link'
                                        style={isActive(
                                            history,
                                            '/user/dashboard'
                                        )}
                                        to='/user/dashboard'
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                        {isAuthenticated() &&
                            isAuthenticated().user.role === 1 && (
                                <li className='nav-item'>
                                    <Link
                                        className='nav-link'
                                        style={isActive(
                                            history,
                                            '/admin/dashboard'
                                        )}
                                        to='/admin/dashboard'
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className='nav-item'>
                                    <Link
                                        className='nav-link'
                                        style={isActive(history, '/signin')}
                                        to='/signin'
                                    >
                                        Signin
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link
                                        className='nav-link'
                                        style={isActive(history, '/signup')}
                                        to='/signup'
                                    >
                                        Signup
                                    </Link>
                                </li>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <li className='nav-item'>
                                <span
                                    className='nav-link'
                                    style={{
                                        cursor: 'pointer',
                                        color: '#fffff'
                                    }}
                                    onClick={() => {
                                        signout(() => {
                                            history.push('/');
                                        });
                                    }}
                                >
                                    Signout
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default withRouter(Navbar);
