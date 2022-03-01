import React, { useEffect, useState } from 'react'

import '../../Styles/QuickSearch.css';

import { Link, useParams } from 'react-router-dom';

// const mealUrl = "https://zomatourl.herokuapp.com/mealtype"
const mealUrl = "http://localhost:4000/mealtype"


const QuickSearch = () => {

    const [mealtypes, setMealtypes] = useState([]);


    useEffect(() => {
        fetch(mealUrl)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setMealtypes(data);
            })
            .catch((err) => {
                return err;
            })
    }, [])


    return (
        <React.Fragment>
            <div className="container pt-4 mb-5">
                <div className="row">
                    <h1>Quick Searches</h1>
                    <p className='sub-title text-secondary'>Discover restaurants by type of meal</p>
                </div>

                <div className="cards d-flex flex-wrap justify-content-start">

                    {
                        mealtypes.map((data, index) => {
                            return (
                                <Link to={`/list/${data.mealtype_id}`} className='link' key={data.mealtype_id}>
                                <div key={data.mealtype_id} className="card d-flex flex-row">
                                    <div className="img">
                                        <img src={data.meal_image} alt="" />
                                    </div>

                                    <div className="desc">
                                        <h4 className='text-start ms-4 mt-4'>{data.mealtype}</h4>
                                        <p className='text-start ms-4 text-secondary mt-4'>{data.content}</p>
                                    </div>
                                </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        </React.Fragment>
    )
}

export default QuickSearch
