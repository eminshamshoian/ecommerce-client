import React from 'react';
import Navbar from '../layout/Navbar';
import '../../index.css';

const MainLayout = ({
    title = 'Title',
    description = 'Description',
    children,
    className
}) => {
    return (
        <div className='primary-bg'>
            <Navbar />
            <div className='jumbotron'>
                <h2>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default MainLayout;
