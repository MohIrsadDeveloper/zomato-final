import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../Header';


const loginUrl = "https://zomatourl.herokuapp.com/login";
// const loginUrl = "http://localhost:4000/login";


const Login = () => {
    const [token, setToken] = useState(false)
    const [user, setUser] = useState({
        email: "",
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
        const { email, password } = user;

        fetch(loginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, password
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.auth === false) {
                    setToken({ msg: data.token })
                    swal({
                        title: "Something Went Wrong!",
                        text: data.token,
                        icon: "warning",
                        button: "Opps!",
                      });
                } else {
                    localStorage.setItem("authToken", data.token)
                    swal({
                        title: "Good job!",
                        text: "Login Successfully",
                        icon: "success",
                        button: "Aww yiss!",
                      });
                    navigate("/")
                }
            })
            
    }
    return (
        <div>
            <React.Fragment>
                <Header />
                <div className="container border p-3">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name='email' className="form-control" id="email" onChange={changeHandle} />
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