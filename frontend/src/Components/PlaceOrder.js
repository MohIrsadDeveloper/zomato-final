import '../Styles/PlaceOrder.css'
import { CartContext } from './CartContext'
import axios from "axios"
import { useContext, useEffect, useState } from 'react'
import Header from './Header';

const menuUrl = "https://zomatourl.herokuapp.com/menuItem";
const placeOrderUrl = "https://zomatourl.herokuapp.com/placeOrder";
const placeOrder = "http://localhost:4000/placeOrder";


// const menuUrl = "http://localhost:4000/menuItem"
// const placeOrderUrl = "http://localhost:4000/placeOrder"

const PlaceOrder = () => {
    let total = 0;
    const [products, setproducts] = useState([])
    const { cart, setCart } = useContext(CartContext);
    // console.log(cart);


    var size = Object.keys(cart).length;
    // console.log(size);

    useEffect(() => {
        if (size > 0) {
            getMealId();
        }

    }, [])

    const getMealId = () => {
        let menulist = Object.keys(cart.items)
        // console.log(menulist);
        let result = menulist.map(i => Number(i));
        // console.log("cart", result);

        fetch(menuUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result)
        }).then(res => res.json())
            .then(products => {
                setproducts(products)
                // console.log(products);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getQty = (productId) => {
        return cart.items[productId]
    }

    const increment = (productId) => {
        const existingQty = cart.items[productId]
        const _cart = { ...cart };
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart)

    }

    const decrement = (productId) => {
        const existingQty = cart.items[productId]
        if (existingQty === 1) {
            return;
        }
        const _cart = { ...cart };
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart)
    }

    const getSum = (productId, price) => {
        const sum = price * getQty(productId)
        total += sum;
        return sum;
    }

    const handleDelete = (productId) => {
        const _cart = { ...cart };
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        setCart(_cart)
        const updatedProductsList = products.filter((product) => product.menu_id !== productId)
        setproducts(updatedProductsList);

    }

    const [users, setUsers] = useState({
        name: localStorage.getItem('userdata') ? localStorage.getItem('userdata').split(",")[0] : '',
        email: localStorage.getItem('userdata') ? localStorage.getItem('userdata').split(",")[1] : '',
        phone: localStorage.getItem('userdata') ? localStorage.getItem('userdata').split(",")[2] : '',
        address: "Mumbai"
    })

    let store, name, value;
    const changeHandle = (e) => {
        name = e.target.name;
        value = e.target.value;

        store = setUsers({ ...users, [name]: value })
        
    }

    const handleOrderNow = () => {
         /*var obj = this.state;
        obj.details = sessionStorage.getItem('menu');
        delete obj.menuItems
        console.log(obj)*/
        fetch(placeOrder,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        //.then(this.props.history.push('/viewBooking'))
        .then(console.log('going for payment'))
    }

    return (
        <div>
            <Header />
            <div className="container border p-4.">
                <form className="forms" action='http://localhost:4000/paynow' method='POSt'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' className="form-control" id="name" value={users.name} onChange={changeHandle}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="email" value={users.email} onChange={changeHandle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" name='phone' className="form-control" id="phone" value={users.phone} onChange={changeHandle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="text" name='password' className="form-control" id="password" value={users.address} onChange={changeHandle} />
                    </div>
                    <div className="m-3">
                        <button className='bg-success text-bold rounded-3' onClick={handleOrderNow}>Place Order</button>
                    </div>
                </form>
                {
                    size < 1 ? (
                        <div className="container">
                            <h1 style={{ textAlign: "center", fontSize: "70px" }}>Cart is Empty</h1>
                        </div>
                    ) : (

                        <div className='container' >
                            <h1>Cart Items</h1>
                            <div className="container">
                                <div className="lists d-flex flex-column">
                                    {
                                        products.map((product, index) => {
                                            return (
                                                <div className="product-details d-flex mb-3" key={index}>
                                                    <div className="img">
                                                        <img src={product.menu_image} alt={product.menu_name} />
                                                    </div>
                                                    <div className="desc">
                                                        <h5>{product.menu_name}</h5>
                                                    </div>
                                                    <div className="button  m-auto text-center">
                                                        <button onClick={() => { decrement(product.menu_id) }}>-</button>
                                                        <span>{getQty(product.menu_id)}</span>
                                                        <button onClick={() => { increment(product.menu_id) }}>+</button>
                                                    </div>
                                                    <div className="price m-auto text-center">
                                                        <h4>₹{getSum(product.menu_id, product.menu_price)}</h4>
                                                    </div>
                                                    <div className="delete text-center">
                                                        <button onClick={() => { handleDelete(product.menu_id) }}>delete</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                    )
                }
                <hr />

                <div className="grandtotal">
                    <h3>Grand Total : ₹{total} </h3>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder