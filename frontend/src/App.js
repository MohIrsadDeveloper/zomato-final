import React, { useEffect, useState } from 'react'
import { CartContext } from './Components/CartContext'
import Routers from './Routers'



const App = () => {
    const [cart, setCart] = useState({})
    // fetch from local Storage

    useEffect(() => {
        const cart = window.localStorage.getItem('cart')
        setCart(JSON.parse(cart))

    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <React.Fragment>
            <CartContext.Provider value={{cart, setCart}}>
                <Routers />
            </CartContext.Provider>
        </React.Fragment>
    )
}

export default App
