import React, { useState, useEffect } from 'react';
import Layout from '../layout/MainLayout';
import { getProducts } from './ApiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title='Home'
            description='Shop our collection of stunning and affordable collection'
            className='container'
        >
            <div className='home-img'>
                <img
                    className='w-100 py-5'
                    src='https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                    alt='Promotional Pitcure'
                />
                <div className='overlay'>
                    <div class='row justify-content-center promo-text'>
                        <h1>Mixivia Luxury clothing Collection</h1>
                    </div>
                    <div class='row justify-content-center'>
                        <h4>You Look Stunning Wearing It</h4>
                    </div>
                    <div class='row justify-content-center pt-3'>
                        <button className='primary-button'>Shop Now</button>
                    </div>
                </div>
            </div>
            <Search />
            <h2 className='mb-3 text-center'>New Arrivals</h2>
            <div className='row'>
                {productsByArrival.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>

            <h2 className='mb-3 text-center'>Best Sellers</h2>
            <div className='row'>
                {productsBySell.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        </Layout>
    );
};

export default Home;
