import './Header.css'
import React, { useContext } from 'react'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import {UserContext} from '../../App'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory </Link>
                <Link to="/shipment">Shipment </Link>
                <button onClick={() =>setLoggedInUser({})} >Sign Out</button>
            </nav>
            <div className="search">
                <input className="search-input-field" type="text" placeholder="type here to search"/>
            </div>
        </div>
    )
}

export default Header 
