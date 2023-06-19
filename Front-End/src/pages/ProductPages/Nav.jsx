import React from 'react'
import { Link } from 'react-router-dom'
// import logo from "./img/logo.png"
import { useSelector } from 'react-redux'
export default function Nav() {

    const totalInCart = useSelector((state)=> state.cart.total);

  return (
    <section id="header">
        <Link to=""><img alt="logo" /></Link>
        <div>
            <ul id="navbar">
                <li><Link to="">Home</Link></li>
                <li><Link className="active" to="/store">Store</Link></li>
                <li><Link to="">Blog</Link></li>
                <li><Link to="">About</Link></li>
                <li><Link to="">Contact</Link></li>
                <li id="lg-bag">
                    <Link to="/cart"><i className="fa-solid fa-bag-shopping fs-3x"></i><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                {totalInCart}
              </span></Link>
                </li>
                <Link to="#" id="close"><i className="fa-solid fa-xmark"></i></Link>
            </ul>
        </div>
        <div id="mobile">
            <Link to="/cart"><i className="fa-solid fa-bag-shopping"></i></Link>
            <i id="bar" className="fas fa-outdent"></i>
        </div>

    </section>
  )
}
