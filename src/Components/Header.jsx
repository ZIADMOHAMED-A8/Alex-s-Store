import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let nav=useNavigate()
    const sidebarRef=useRef()
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = sidebarRef.current
            if (sidebar && !sidebar.contains(event.target)) {
                setSidebarOpen(false)
            }
        }
    
        if (sidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [sidebarOpen])
    
    return (
        <>
            <div ref={sidebarRef}
                onClick={(e) => e.stopPropagation()} 
                style={sidebarOpen ? {right:'0px'} : {}} 
                className={styles.sidebar}
            >
                    <li  onClick={()=>{
                        nav('/')
                        setSidebarOpen(false)
                        console.log('s')
                    }} className={styles.nav_link}>Home</li>
                    <li  onClick={()=>{
                        nav('/checkout/1/0')
                        setSidebarOpen(false)
}} className={styles.nav_link}>Services</li>
                    <li className={styles.nav_link}><a style={{textDecoration: "none",color:'white'}} href="https://www.facebook.com/profile.php?id=100066723254988">Contact Us</a></li>
            </div>
            <div className={styles.Header}>
                <div className={styles.logo}>
                    <i className="fas fa-bolt"></i>
                    <p>Alex Store</p>
                </div>
                <ul className={styles.nav}>
                    {
                        !isMobile ?
                            <>
                                <li  onClick={()=>{
                        nav('/')
                        console.log('s')
                    }} className={styles.nav_link}>Home</li>
                                <li  onClick={()=>{
                        nav('/checkout/1/0')
                        console.log('s')
                    }} className={styles.nav_link}>Services</li>
                                <li className={styles.nav_link}><a style={{textDecoration: "none",color:'#4c79a5'}} href="https://www.facebook.com/profile.php?id=100066723254988">Contact Us</a></li>
                            </>
                            :
                            <i 
                                onClick={() => {
                                    setSidebarOpen(true)
                                }} 
                                className="fas fa-bars"
                                style={{cursor: 'pointer', fontSize: '1.2rem'}}
                            ></i>
                    }
                </ul>
            </div>
                    <Outlet></Outlet>
        </>
    )
}
