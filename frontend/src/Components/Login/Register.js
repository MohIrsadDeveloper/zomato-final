import React, { useState } from 'react'
import "../../Styles/Register.css"

const Register = () => {
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

        fetch("http://localhost:4000/register", {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
                name,email,phone,password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })


    }

    return (
        <React.Fragment>
            <div className="container border p-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Name</label>
                        <input type="text" name='name' className="form-control" id="name" onChange={changeHandle} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="email" onChange={changeHandle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Phone</label>
                        <input type="text" name='phone' className="form-control" id="phone" onChange={changeHandle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Password</label>
                        <input type="text" name='password' className="form-control" id="password" onChange={changeHandle} />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={clickHandle}>Submit</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Register