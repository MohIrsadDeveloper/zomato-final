import React, { useEffect, useState } from 'react';
import '../Styles/Filter.css'

import { Link, NavLink, useParams } from 'react-router-dom';

// let locationUrl = "https://zomatourl.herokuapp.com/location";
// let filterurl = "https://zomatourl.herokuapp.com/filter"

const locationUrl = "http://localhost:4000/location"
const filterurl = "http://localhost:4000/filter"


const Filter = () => {
    const [locations, setLocations] = useState([]);
    const [meals, setMeals] = useState([]);

    const params = useParams();
    // console.log(params);

    const [locationValue, setLocationValue] = useState("Delhi");
    const locationHandle = () => {
        fetch(locationUrl)
            .then(res => res.json())
            .then(data => {
                setLocations(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    let getValue = (data) => {
        let locationValue = data.target.value;
        setLocationValue(locationValue);

    }

        /********* Meal Handle ********/
    const mealHandle = () => {
        let mealId = params.id;
        fetch(`${filterurl}/${mealId}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setMeals(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    let cuisineFilter = (event) => {
        let cuisineId = event.target.value
        let mealId = params.id
        let cuisineUrl;

        if (cuisineId === "") {
            cuisineUrl = `${filterurl}/${mealId}`
        } else {
            cuisineUrl = `${filterurl}/${mealId}?cuisine=${cuisineId}`
        }

        fetch(cuisineUrl)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setMeals(data)
        })
        .catch(err => {
            return err;
        })
    }

    let costFilter = (event) => {
        const mealId = params.id;
        // console.log(mealId);
        let cost = (event.target.value).split('-')
        let lcost = cost[0]
        let hcost = cost[1]
        let costUrl
        if (lcost && hcost) {
            costUrl = `${filterurl}/${mealId}?lcost=${lcost}&hcost=${hcost}`
        }

        fetch(costUrl)
        .then(res => res.json())
        .then(data => {
            setMeals(data)
        })
        .catch(err => {
            return err;
        })

    }

    let sortFilter = (event) => {
        let mealId = params.id;
        let sort = event.target.value;
        let sortUrl = `${filterurl}/${mealId}?sort=${sort}`
        
        fetch(sortUrl)
        .then(res => res.json())
        .then(data => {
            setMeals(data)
        })
        .catch(err => {
            return err;
        })
    }



    useEffect(() => {
        locationHandle();
        mealHandle();
    }, [])

    return (
        <React.Fragment>
            <div className="container">
                <p>params is : { } </p>
                <h1>Breakfast Places in {locationValue}</h1>
                <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-3 filter">
                        <h4>Filters</h4>
                        <div className="location">
                            <label>Select Location</label>
                        </div>
                        <div className="location">
                            <select name="location" id="location" className='w-100' onChange={getValue}>
                                {
                                    locations.map((data, index) => {
                                        return (
                                            <option value={data.state} key={data.state_id} >{data.state} </option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="cuisine" onChange={cuisineFilter}>
                            <label >Cuisine</label>

                            <div className="cuisine_input north_indian">
                                <input name='cuisine' type="radio" value={""} /> All
                            </div>

                            <div className="cuisine_input north_indian">
                                <input name='cuisine' type="radio" value={"1"} /> North Indian
                            </div>

                            <div className="cuisine_input south_indian">
                                <input name='cuisine' type="radio" value={"2"} /> South Indian
                            </div>

                            <div className="cuisine_input chinese">
                                <input name='cuisine' type="radio" value={"3"} /> Chinese Indian
                            </div>

                            <div className="cuisine_input fast_food">
                                <input name='cuisine' type="radio" value={"4"} /> Fast Food
                            </div>

                            <div className="cuisine_input street_food">
                                <input name='cuisine' type="radio" value={"5"} /> Street Indian
                            </div>
                        </div>

                        <div className="cost" onClick={costFilter}>
                            <label >Cost For Two</label>

                            <div className="cost_input less_than_500">
                                <input type="radio" name='cost' value={"1-500"} /> Less than ₹ 500
                            </div>

                            <div className="cost_input less_than_500">
                                <input type="radio" name='cost' value={"500-1000"} /> ₹ 500 to ₹ 1000
                            </div>

                            <div className="cost_input less_than_500">
                                <input type="radio" name='cost' value={"1000-1500"} /> ₹ 1000 to ₹ 1500
                            </div>

                            <div className="cost_input less_than_500">
                                <input type="radio" name='cost' value={"1500-2000"} /> ₹ 1500 to ₹ 2000
                            </div>

                            <div className="cost_input less_than_500">
                                <input type="radio" name='cost' value={"2000-5000"} /> ₹ 2000+
                            </div>
                        </div>

                        <div className="sort" onClick={sortFilter}>
                            <label >Sort</label>
                            <div className="sort_input low_to_high" id='sort'>
                                <input type="radio" name="sort" value={"1"} /> Price low to high
                            </div>

                            <div className="sort_input high_to_low" id='sort'>
                                <input type="radio" name="sort" value={"-1"} /> Price high to low
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-7 col-lg-8 offset-1">

                        {
                            meals.map((data, index) => {
                                return (
                                    <div className="row box mb-4" key={index}>
                                        <div className="top d-flex">
                                            <div className="img">
                                                <img src={data.restaurant_thumb} alt={data.restaurant_name} />
                                            </div>

                                            <div className="content">
                                                <h5>{data.restaurant_name}</h5>
                                                <h6>{locationValue}</h6>
                                                <p>{data.address}</p>
                                            </div>
                                        </div>

                                        <div className="row bottom">
                                            <div className="col-sm-4 col-3">
                                                <p>CUISINEIS</p>
                                                <p className='cost-tag'>COST FOR TWO</p>
                                            </div>

                                            <div className="col-3">
                                                <ul className='d-flex'>
                                                    <li id="list1">{data.cuisines[0].cuisine_name},</li>
                                                    <li id="list2">{data.cuisines[1].cuisine_name}</li>
                                                </ul>
                                                <p className='price'>₹ {data.cost}</p>
                                            </div>

                                            <Link className='bg-success proceed' to={`/detail/${data.restaurant_id}`} >Proceed</Link>

                                        </div>
                                    </div>
                                )
                            })
                        }



                        <div className="pagination d-flex justify-content-center">
                            <Link to="/">&laquo;</Link>
                            <Link to="/">1</Link>
                            <Link to="/">2</Link>
                            <Link to="/">3</Link>
                            <Link to="/">4</Link>
                            <Link to="/">5</Link>
                            <Link to="/">6</Link>
                            <Link to="/">&raquo;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Filter;
