import React from 'react'
import Header from './Header'
import QuickSearch from './Home/QuickSearch'
import Wallpaper from './Home/Wallpaper'

const Home = () => {
    return (
        <React.Fragment>
            <Header />
            <Wallpaper />
            <QuickSearch />
        </React.Fragment>
    )
}

export default Home
