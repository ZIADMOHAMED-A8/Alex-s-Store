import styles from './Herosection.module.css'
import pubg from '../assets/pubg.png'
import cod from '../assets/cod.jpg'
import freefire from '../assets/freefire.png'
 import { useNavigate } from 'react-router-dom';
    

export default function Herosection() {
    let nav=useNavigate();
    function handleClick(ind){
        nav(`/checkout/${ind}/3`)
    }
    return (
        <div className={styles.hero_section}>
            <div className="container {styles.a7a}" id={styles.cont}  style={{display:'flex',justifyContent:'space-between'}}>
                <div className={styles.halfHero}>
                <h1>Instant Game Currency Top-ups</h1>
                <p>Fuel your play with fast ,secure credits for PUBG,Free Fire,CODM and more.</p>
                <div className={styles.test}>
                    <span>Fast Delievry</span>
                    <span>Secure Payments</span>
                    <span>24/7 Support</span>
                </div>
                <div className={styles.buttons}>
                    
                    <span>Top-Up Now</span>
                    <span>View Packages</span>

                    
                </div>
                <div className={styles.buttons2}>
                    
                    <div><a style={{textDecoration: "none",color:'green'}} href="https://www.facebook.com/profile.php?id=100066723254988">Facebook</a></div>
                    <div><a style={{textDecoration: "none",color:'blue'}} href="https://whatsapp.com/channel/0029VbAb7hgJuyA8QZxqRp2b">Whatsapp</a></div>

                    
                </div>
                </div>
                <div className={styles.cards}>
                    <div style={{cursor:'pointer'}} onClick={()=>{
                        handleClick(1)
                    }} className={styles.card}>
                        <div className={styles.text}>Pubg Mobile</div>
                        <div className={styles.cardimg}>
                            <img src={pubg} alt="" />
                        </div>

                    </div>
                    <div style={{cursor:'pointer'}} onClick={()=>{
                        handleClick(3)
                    }} className={styles.card}>
                    <div className={styles.text}>TikTok</div>

                    <div className={styles.cardimg}>
                            <img src={cod} alt="" />

                            </div>
                            </div>
                        <div style={{cursor:'pointer'}} onClick={()=>{
                        handleClick(0)
                    }} className={styles.card}>
                        <div className={styles.text}>free fire</div>

                        <div className={styles.cardimg}>
                            <img src={freefire} alt="" />
                            </div>
                            </div>
                </div>
            </div>
        </div>
    )
}
