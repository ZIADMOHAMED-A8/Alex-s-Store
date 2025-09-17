import { useNavigate } from 'react-router-dom'
import styles from './Packbox.module.css'

export default function Packbox({name,quan,price,gameIndex,packIndex}){
let nav=useNavigate()
    return (
        <div  className={styles.Packbox}>
            <p>
                {name}
            </p>
            <h3>
                {quan} - {price} EGP
            </h3>
            <button style={{cursor:'pointer'}} onClick={()=>{
                nav(`/checkout/${gameIndex}/${packIndex}`)
            }}>Buy Now</button>
        </div>
    )
}