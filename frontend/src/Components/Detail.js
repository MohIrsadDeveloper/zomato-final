import React, { useEffect, useState } from 'react'
import "../Styles/Detail.css"
import Header from './Header'

import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { Link, NavLink, Outlet, Route, Routes, useParams } from 'react-router-dom';

import { } from "react-icons/fa";

let detailUrl = "https://zomatourl.herokuapp.com/details";
let mealUrl = "https://zomatourl.herokuapp.com/menu";

const Detail = () => {
    const [details, setDetails] = useState([])
    const [menus, setMenus] = useState([])
    let params = useParams();
    let menuId = params.id;
    // console.log(menuId);

    const getDetail = () => {

        fetch(`${detailUrl}/${menuId}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setDetails(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    let getMenu = () => {

        fetch(`${mealUrl}/${menuId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMenus(data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const Details = () => {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    {
                        details.map((data, index) => {
                            return (
                                <div className="row" key={index}>
                                    <h1>{data.restaurant_name}</h1>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident unde, deserunt mollitia maxime officia ut. Cum dolor ipsam ab hic suscipit saepe atque qui nobis deserunt autem enim, fugit eos perspiciatis tenetur ullam pariatur necessitatibus eveniet veritatis incidunt facere.</p>
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
    const Contact = () => {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    {
                        details.map((data, index) => {
                            return (
                                <div className="row" key={index}>
                                    <h1>{data.address}</h1>
                                    <h2>Contact No: {data.contact_number}</h2>
                                </div>
                            )
                        })
                    }

                </div>
            </React.Fragment>
        )
    }

    let addItem = () => {
        console.log("Add");
    }

    
    let removeItem = () => {
        console.log("Less");
    }

    const Menu = () => {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <h2>Item Added</h2>
                        <p>Item Number added</p>
                    </div>

                    <div className="row item">
                        {
                            menus.map((data, index) => {
                                return (
                                    <React.Fragment>

                                        <div className="col-md-7 top" key={index}>
                                            <b>{data.menu_id}</b> &nbsp;
                                            <img src={data.menu_image} alt="logo" />
                                            &nbsp; &nbsp;
                                            <span>{data.menu_name} - </span>
                                            <span>Rs.{data.menu_price}</span>
                                            <p>{data.description}</p>
                                        </div>

                                        <div className="col-md-4 bottom">
                                            <button className='plus' onClick={addItem}>
                                                <FaPlus />
                                            </button>
                                            <button className='minus' onClick={removeItem}>
                                                <FaMinus />
                                            </button>
                                        </div>

                                    </React.Fragment>
                                )
                            })
                        }



                    </div>
                </div>

            </React.Fragment>
        )
    }

    useEffect(() => {
        getDetail();
        getMenu();
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="container-fluid p-5">
                {
                    details.map((data, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-5 left">
                                    <img src={data.restaurant_thumb} alt={data.restaurant_name} />
                                </div>

                                <div className="col-6 right ms-3">
                                    <h1>{data.restaurant_name}</h1>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <span> 380 Customer Reviews</span>
                                    <h5><strike>Old Price {data.cost + (20)}</strike></h5>
                                    <h4 className="new-price">New Price {data.cost}</h4>
                                    <h3 className="desc">Best Taste of {data.restaurant_name} At your Door or DineIn</h3>
                                    <h1 className='text-success'>Available Now</h1>
                                    <button className='bg-danger me-3 btn-back'>Back</button>
                                    <button className='bg-success btn-checkout'>Checkout</button>
                                </div>

                            </div>
                        )
                    })
                }


                <div className="row">
                    <div className="links mt-5 pb-1 border-bottom">
                        <NavLink style={({ isActive }) => {
                            return { color: isActive ? 'green' : '' }
                        }} className='link' to="">Details</NavLink>
                        <NavLink style={({ isActive }) => {
                            return { color: isActive ? 'green' : '' }
                        }} className='link' to="contact">Contact</NavLink>
                        <NavLink style={({ isActive }) => {
                            return { color: isActive ? 'green' : '' }
                        }} className='link' to="menu">Menu</NavLink>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Details />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/menu' element={<Menu />} />
            </Routes>


        </React.Fragment>
    )
}




export default Detail