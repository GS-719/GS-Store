import React from 'react'
import Logo from "@/img/Logo.png";
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      <header className='MainNavbar'>
        <div className='FirstSection'>
          <Link href="/" className='FirstSectionLink'>
            <Image className='LogoImg' src={Logo} alt="Logo" width={100} height={50} />
            <p className='LogoText'>GS Store</p>
          </Link>
        </div>
        <nav className='SenondSection'>
          <Link className='SecondSectionLink' href="/">Home</Link>
          <Link className='SecondSectionLink' href="/">About</Link>
          <Link className='SecondSectionLink' href="/">Home</Link>
          <Link className='SecondSectionLink' href="/">Home</Link>
        </nav>
        <div className='ThirdSection'>
          <input className='thirdSectionSearch' placeholder='Search' />
        </div>
        <div className='FourthSection'>
          <Link href="/page_s/signin">
            <button className='NavbarButton'>Sign in</button>
          </Link>
          <button className='NavbarButton'>Sign up</button>
        </div>
      </header>
      <hr />
    </>
  )
}

export default Navbar

