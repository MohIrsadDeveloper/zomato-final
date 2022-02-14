import React from 'react'
import QuickSearch from './Home/QuickSearch'
import Wallpaper from './Home/Wallpaper'

const Home = () => {
    return (
        <React.Fragment>
            <Wallpaper />
            <QuickSearch />
        </React.Fragment>
    )
}

export default Home
