
import { useEffect, useRef } from 'react'
import feedback from '../assets/feedback.jpg' 
import styles from './Ratings.module.css'
export default function Ratings(){
    let imagesRef=useRef()
    
    useEffect(() => {
        const interval = setInterval(() => {
            const container = imagesRef.current
            if (!container) return
            let space=window.innerWidth > 978 ? 0.334 : window.innerWidth<=500 ? 1 : 0.5
            container.scrollBy({
                left: (container.offsetWidth * space) ,
                behavior: 'smooth'
            })

            // لو وصل للآخر، رجعه من الأول
            if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
                setTimeout(() => {
                    container.scrollTo({ left: 0, behavior: 'smooth' })
                }, 600) // نخليها بعد الانيميشن يخلص
            }
        }, 2000)

        return () => clearInterval(interval) // تنظيف
    }, [])
    return (
        <div style={{    background:' linear-gradient(135deg, #0f172a 0%,  #0a1f14 100%)'
            ,padding:'50px 0px'}}>
        <div  className="container">
            <h1>What our customers say</h1>
            <div ref={imagesRef} className={styles.images}>
            <div className={styles.image}>
            <img src={feedback} alt="" />
            </div>
            <div className={styles.image}>
            <img src={feedback} alt="" />
            </div>
            <div className={styles.image}>
            <img src={feedback} alt="" />
            </div>
            <div className={styles.image}>
            <img src={feedback} alt="" />
            </div>
            <div className={styles.image}>
            <img src={feedback} alt="" />
            </div>
            <div className={styles.image}>
            <img src={feedback} alt="" />
            </div>
            <div className={styles.image}>
            <img src={feedback} alt="" />
            </div>
            </div>
        </div>
        </div>
    )
}
