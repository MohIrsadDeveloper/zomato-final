import React, { useEffect, useState } from 'react'
import { useNavigate } from  "react-router-dom";

import '../../Styles/Wallpaper.css'

const Wallpaper = () => {

    const [locations, setLocations] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();
   
    const restHandle = (event) => {
        fetch(`https://zomatourl.herokuapp.com/restaurants?state_id=${event.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            setRestaurants(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    let stateHandle = () => {
        fetch('https://zomatourl.herokuapp.com/location')
        .then((res) => res.json())
        .then((data) => {
            setLocations(data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const detailsHandle = () => {
        navigate('/detail')
    }

    useEffect(() => {
        stateHandle();
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid wallpaper">
                <div className="container">
                    <div className="row">
                        <div className="col-6 offset-9 button d-none d-lg-block">
                            <button className='login ms-3'>Login</button>
                            <button className='create ms-3'>Create an account</button>
                        </div>
                    </div>
                    <div className="row w_logo">
                        <h1 className='bg-white w_logo_text'>e!</h1>
                    </div>

                    <div className="row desc">
                        <h1 className='text-white text-center'>Find the best restaurants, cafes, and etc</h1>
                    </div>
                    <div className="row input">
                        <select name="location" id="location" onChange={restHandle}>
                            {
                                locations.map((location, index) => {
                                    return (
                                        <option value={location.state_id} key={location.location_id}>{location.state}</option>
                                    )
                                })
                            }
                        </select>

                        <select name="restaurant" id="restaurant" onChange={detailsHandle}>
                            {
                                restaurants.map((restaurant, index) => {
                                    return (
                                        <option value={restaurant.restaurant_id} key={restaurant.restaurant_id} >{restaurant.restaurant_name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Wallpaper
