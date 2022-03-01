import React, { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';
import { CartContext } from './CartContext';

const Header = () => {

    const { cart } = useContext(CartContext)

    return (
        <React.Fragment>
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
                        <Link to={"placeorder"} >
                            <button className='cart ms-3 text-white'>
                                <FaCartPlus style={{ fontSize: 25 }} />
                                <span className='cartvalue'>{cart.totalItems ? cart.totalItems : 0 }</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;