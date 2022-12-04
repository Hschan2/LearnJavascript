import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link href="/" className="navbar-brand">Blog</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          {/* Next JS 12버전 이하 Link */}
                          {/* <Link href="/"><a className="nav-link active" aria-current="page">Home</a></Link> */}
                          {/* Next JS 13버전 Link */}
                          <Link href="/" className="nav-link active" aria-current="page">Home</Link>
                      </li>
                        <li className="nav-item">
                            <Link href="/blogs" className="nav-link">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" className="nav-link">Contact Us</Link>
                        </li>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
    </nav>
  )
}

export default Navbar