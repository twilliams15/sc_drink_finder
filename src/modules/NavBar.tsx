import React from 'react'
import {Link} from 'react-router-dom'

export function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/menu">Menu</Link>
                </li>
                <li>
                    <Link to="/">In Stock</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <li>
                    <Link to="/insights">Insights</Link>
                </li>
                <li>
                    <Link to="/rums">Rums</Link>
                </li>
            </ul>
        </nav>
    )
}
