import React, { useContext, useEffect, useState } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';
import { CartContext } from './CartContext';

const authUrl = "https://zomatourl.herokuapp.com/userinfo"

const Header = () => {
    const [user, setUser] = useState([])
    const { cart } = useContext(CartContext)

    // console.log(user);

    useEffect(() => {
        fetchUser();
        ConditionHandle();
    }, [])
    

    const fetchUser = () => {
        fetch(authUrl, {
            method : "GET",
            headers : {
                "x-access-token" : localStorage.getItem("authToken")
            }
        })

        .then(res => res.json())
        .then(data => {
            setUser(data)
            // console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const logoutHandle = () => {
        setUser("")
        localStorage.removeItem('authToken')
        localStorage.removeItem('userdata')
    }

    const ConditionHandle = () => {
        if (user.name) {
            let data = user;
            let outputArray = [data.name, data.email, data.phone, data.role]
            localStorage.setItem("userdata", outputArray)
            return(
                <div className="container-fluid bg-danger">
                    <div className="row h_row">
                        <div className="col-2 offset-1 h_logo">
                            <Link to={'/'} style={{ textDecoration: "none" }}>
                                <span className='h_span bg-white ms-auto'>e!</span>
                            </Link>
                        </div>
                        <div className="d-none d-md-block col-5 col-lg-4 offset-3 offset-lg-5 button">
                            <Link to={"/login"} >
                                <button className='login ms-3'>Hi {outputArray[0]}</button>
                            </Link>
                            <Link to={"/"} >
                                <button className='create ms-3' onClick={logoutHandle}>Logout</button>
                            </Link>
                            <Link to={"/placeorder"} >
                                <button className='cart ms-3 text-white'>
                                    <FaCartPlus style={{ fontSize: 25 }} />
                                    <span className='cartvalue'>{cart.totalItems ? cart.totalItems : 0}</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className="container-fluid bg-danger">
                    <div className="row h_row">
                        <div className="col-2 offset-1 h_logo">
                            <Link to={'/'} style={{ textDecoration: "none" }}>
                                <span className='h_span bg-white ms-auto'>e!</span>
                            </Link>
                        </div>
                        <div className="d-none d-md-block col-5 col-lg-4 offset-3 offset-lg-5 button">
                            <Link to={"/login"} >
                                <button className='login ms-3'>Login</button>
                            </Link>
                            <Link to={"/register"} >
                                <button className='create ms-3'>Create an account</button>
                            </Link>
                            <Link to={"/placeorder"} >
                                <button className='cart ms-3 text-white'>
                                    <FaCartPlus style={{ fontSize: 25 }} />
                                    <span className='cartvalue'>{cart.totalItems ? cart.totalItems : 0}</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            <ConditionHandle />
        </React.Fragment>
    )
}

export default Header;