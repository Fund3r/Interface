/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

async function fetchData(setData, setLoading) {
    try {
        const res = await fetch('/api/defillama');
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const json = await res.json();
        setData(json);
        setLoading(false);
    } catch (e) {
        console.error('Failed to load data', e);
        setLoading(false);
    }
}

const Defillama = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(setData, setLoading);
    }, [])

    return (
        <div>
            <Navbar />
            <section className='max-w-7xl bg-black mx-auto my-24 px-12 xl:px-0 text-[#EDEEEE]'>
                <h2 className={`${inter.className} text-[36px] font-semibold`}>
                    Examples
                </h2>
                <div className={`${inter.className} text-[18px] pt-8 leading-7`}>
                    Get started by exploring examples to quickstart your dapp development.
                    All the Examples can be found under the{' '}
                    <code className='font-mono font-bold bg-[#4e4e4e] p-1 px-2 rounded-xl'>
                        pages/examples
                    </code>{' '}
                    directory under the main repo. And don't forget, contributions are
                    always welcome! Make a pull request to share your own awesome
                    creations with the community.
                </div>
                <div className='w-full flex flex-col lg:flex-row gap-6 mt-24 flex-wrap justify-center items-center'>
                    
                </div>
            </section>
        </div>
    );
};

export default Defillama;