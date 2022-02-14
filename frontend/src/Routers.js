import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Filter from './Components/Filter';
import Detail from './Components/Detail';
import NotFound from './Components/NotFound';

const Routers = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="list" element={<Filter />} />
                    <Route path='list/:id' element={<Filter />} />
                    <Route path="detail" element={<Detail />} />
                    <Route path="detail/:id" element={<Detail />} />
                    <Route path='detail/:id/*' element={<Detail />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default Routers
