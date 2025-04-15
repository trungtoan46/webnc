import React from 'react';

const Search = () => {
    return (
                <div className="relative w-3/4">
                    <input type="text" placeholder="Search..." className="w-full pl-8 pr-4 py-2 bg-gray-100 rounded-md text-gray-800" />

                    <svg className="w-5 h-5 absolute left-2 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
    );
};


export default Search;


