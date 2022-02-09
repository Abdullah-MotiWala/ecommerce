import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import ProductCard from '../Product/ProductCard';
import data from '../../data';
import { PoundCircleFilled } from '@ant-design/icons';

export default function Home() {
    const {products} = data;
    return <div >
        <div className='container'>
            <Navbar />
            <div className='products'>
                {products.map((pro)=>{
                    console.log(pro)
                    return <ProductCard key={pro._id} product={pro}/>
                })}
            </div>
            <Footer />
        </div>
    </div>;
}
