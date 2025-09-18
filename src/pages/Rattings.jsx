import { useEffect, useRef } from 'react'
import feedback from '../assets/feedback.jpg' 
import feedback1 from '../assets/feedback(1).jpg'
import feedback2 from '../assets/feedback (2).jpg'
import feedback3 from '../assets/feedback (3).jpg'
import feedback4 from '../assets/feedback (4).jpg'
import feedback5 from '../assets/feedback (5).jpg'
import feedback6 from '../assets/feedback (6).jpg'
import feedback7 from '../assets/feedback (7).jpg'
import feedback8 from '../assets/feedback (8).jpg'

import styles from './Ratings.module.css'

export default function Ratings(){
    const imagesRef = useRef()

    const feedbackImages = [
      feedback,
      feedback1,
      feedback2,
      feedback3,
      feedback4,
      feedback5,
      feedback6,
      feedback7,
      feedback8
    ]

    useEffect(() => {
        const container = imagesRef.current
        if (!container) return

        const interval = setInterval(() => {
            let space = window.innerWidth > 978 ? 0.334 : window.innerWidth <= 500 ? 1 : 0.5
            container.scrollBy({
                left: container.offsetWidth * space,
                behavior: 'smooth'
            })

            // لو قربنا من نص الصور (النص التاني هو النسخة المكررة)
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollTo({ left: 0, behavior: 'auto' }) 
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%,  #0a1f14 100%)',
            padding: '50px 0px'
        }}>
            <div className="container">
                <h1>What our customers say</h1>
                <div ref={imagesRef} className={styles.images}>
                    {[...feedbackImages, ...feedbackImages].map((item, index) => (
                        <div key={index} className={styles.image}>
                            <img src={item} alt={`feedback-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
