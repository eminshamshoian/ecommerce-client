import React, { useState, useEffect } from 'react';
import Layout from '../layout/MainLayout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './ApiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './FixedPrices';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button
                    onClick={loadMore}
                    className='btn primary-button mb-5 ml-3'
                >
                    View More
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === 'price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title='Shop Our Collection'
            description='Search for products'
            className='container'
        >
            <div className='row d-block pb-3'>
                <div className='shop-img'>
                    <img
                        className='w-100 py-5'
                        src='https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                        alt='Promotional Pitcure'
                    />
                    <div className='shop-overlay'>
                        <div class='row justify-content-center promo-text'>
                            <h1>Find Out About Our Products</h1>
                        </div>
                        <div class='row justify-content-center'>
                            <h4>Find something you love!</h4>
                        </div>
                        <div class='row justify-content-center pt-3'>
                            <button className='primary-button'>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-2 shop-categories'>
                    <h4 className='mb-4'>Category</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, 'category')
                            }
                        />
                    </ul>

                    <h4 className='mb-4'>Price</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, 'price')
                            }
                        />
                    </div>
                </div>

                <div className='col-10'>
                    <h2 className='mb-4 ml-3'>Products</h2>
                    <div className='row'>
                        {filteredResults.map((product, i) => (
                            <div key={i} className='col-4 mb-3'>
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
