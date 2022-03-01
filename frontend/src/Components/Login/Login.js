import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [token, setToken] = useState(false)
    const [user, setUser] = useState({
        name: "",
        password: ""
    });
    let navigate = useNavigate();
    

    let name, value;
    const changeHandle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })

    }

    const clickHandle = () => {
        const { name, password } = user;

        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name, password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.auth === false) {
                    setToken({ msg: data.token })
                } else {
                    localStorage.setItem("abc", data.token)
                    navigate("/")

                }
            })
    }
    return (
        <div>
            <React.Fragment>
                <div className="container border p-3">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Name</label>
                            <input type="text" name='name' className="form-control" id="name" onChange={changeHandle} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Password</label>
                            <input type="text" name='password' className="form-control" id="password" onChange={changeHandle} />
                        </div>

                        <button type="button" className="btn btn-primary" onClick={clickHandle}>Submit</button>
                    </form>
                </div>
            </React.Fragment>
        </div>
    )
}

export default Login