import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../Styles/Register.css"
import swal from 'sweetalert';
import Header from '../Header';

const registerUrl = "https://zomatourl.herokuapp.com/register"
// const registerUrl = "http://localhost:4000/register";


const Register = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    let store, name, value;
    const changeHandle = (e) => {
        name = e.target.name;
        value = e.target.value;

        store = setUsers({ ...users, [name]: value })
        
    }

    const clickHandle = () => {
        const {name, email, phone, password } = users;

        fetch(registerUrl, {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
                name,email,password,phone
            })
        })
        .then(res => res.json())
        .then(data => {
            if ("Registration Successfully") {
                swal({
                    title: "Good job!",
                    text: "Registered Successfully",
                    icon: "success",
                    button: "Aww yiss!",
                  });
            }
            navigate('/login')
        })
        .catch(err => {
            throw err;
        })

    }

    return (
        <React.Fragment>
            <Header />
            <div className="container border p-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' className="form-control" id="name" onChange={changeHandle} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="email" onChange={changeHandle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" name='phone' className="form-control" id="phone" onChange={changeHandle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" name='password' className="form-control" id="password" onChange={changeHandle} />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={clickHandle}>Submit</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Register