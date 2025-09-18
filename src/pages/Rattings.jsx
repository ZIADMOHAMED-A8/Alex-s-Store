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
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from './Ratings.module.css'

export default function Ratings(){
   

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
 const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 978, settings: { slidesToShow: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1 } }
    ]
  }

  return (
    <Slider {...settings}>
      {feedbackImages.map((item, i) => (
        <div key={i}>
          <img src={item} alt={`feedback-${i}`} />
        </div>
      ))}
    </Slider>
  )
}
   
}
