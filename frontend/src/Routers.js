import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Filter from './Components/Filter';
import Detail from './Components/Detail';
import NotFound from './Components/NotFound';
import PlaceOrder from './Components/PlaceOrder';
import Register from './Components/Login/Register';
import Login from './Components/Login/Login';
import Header from './Components/Header';

const Routers = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="list" element={<Filter />} />
                    <Route path='list/:id' element={<Filter />} />
                    <Route path="detail" element={<Detail />} />
                    <Route path="detail/:id/*" element={<Detail />} />
                    <Route path='placeorder' element={<PlaceOrder />} />
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />
                    {/* <Route path='detail/:id/:menu' element={<Detail />} /> */}

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default Routers
