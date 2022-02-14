import React from 'react'
import '../Styles/Header.css';

const Header = () => {
    return (
        <React.Fragment>
            <div className="container-fluid bg-danger">
                <div className="row h_row">
                    <div className="col-2 offset-1 h_logo">
                        <span className='h_span bg-white ms-auto'>e!</span>
                    </div>
                    <div className="d-none d-md-block col-5 col-lg-4 offset-4 offset-lg-5 button">
                        <button className='login ms-3'>Login</button>
                        <button className='create ms-3'>Create an account</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;