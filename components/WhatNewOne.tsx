'use client'

import React, { useState } from 'react'

interface ProductType {
    id: number;
    name: string;
    type: string;
    category: string;
    price: number;
    imageUrl: string; // Added image URL for each product
}

interface Props {
    start: number;
    limit: number;
}

const WhatNewOne: React.FC<Props> = ({ start, limit }) => {
    const [activeTab, setActiveTab] = useState<string>('Shirt');

    const handleTabClick = (type: string) => {
        setActiveTab(type);
    };

    // Dummy data with image URLs
    const data: Array<ProductType> = [
        { id: 1, name: 'Cool T-Shirt', type: 'Shirt', category: 'fashion', price: 499, imageUrl: '/4M6A2498.JPG' },
        { id: 2, name: 'Elegant Dress', type: 'Shirt', category: 'fashion', price: 1499, imageUrl: '/IMG_0062.JPG' },
        { id: 3, name: 'Stylish Shirt', type: 'Shirt', category: 'fashion', price: 999, imageUrl: '/IMG_0072.JPG' },
        { id: 4, name: 'Summer Set', type: 'Shirt', category: 'fashion', price: 1999, imageUrl: '/4M6A9532.JPG' },
        { id: 5, name: 'Basic Top', type: 'Shirt', category: 'fashion', price: 399, imageUrl: '/4M6A2498.JPG' },
        { id: 6, name: 'Casual T-Shirt', type: 'Shirt', category: 'fashion', price: 599, imageUrl: '/4M6A2498.JPG' },
        { id: 7, name: 'Floral Dress', type: 'Shirt', category: 'fashion', price: 1299, imageUrl: '/4M6A2498.JPG' },
        { id: 8, name: 'Office Shirt', type: 'Shirt', category: 'fashion', price: 899, imageUrl: '/4M6A2498.JPG' },
    ];

    const filteredProducts = data.filter((product) => product.type === activeTab && product.category === 'fashion');

    return (
        <>
            <div className="whate-new-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading flex flex-col items-center text-center">
                        <div className="heading3">What{String.raw`'s`} new</div>
                        <div className="menu-tab flex items-center gap-2 p-1 bg-gray-200 rounded-2xl mt-6">
                            {['Shirt', 'T-shirt', 'Cargo', 'Jeans'].map((type) => (
                                <div
                                    key={type}
                                    className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${activeTab === type ? 'active' : ''}`}
                                    onClick={() => handleTabClick(type)}
                                >
                                    {activeTab === type && (
                                        <div className='absolute inset-0 rounded-2xl bg-white'></div>
                                    )}
                                    <span className='relative text-button-uppercase z-[1]'>
                                        {type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                        {filteredProducts.slice(start, limit).map((prd, index) => (
                            <div key={index} className="product-card p-4 border rounded-lg">
                                {/* Only rendering product images */}
                                <img src={prd.imageUrl} alt={prd.name} className="w-full h-auto object-cover rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhatNewOne;
