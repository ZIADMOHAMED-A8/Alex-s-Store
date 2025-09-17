import styles from './Herosection.module.css'
import pubg from '../assets/pubg.png'
import cod from '../assets/cod.webp'
import freefire from '../assets/freefire.png'

    

export default function Herosection() {
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
                    
                    <div>Google</div>
                    <div>Facebook</div>

                    
                </div>
                </div>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.text}>Pubg Mobile</div>
                        <div className={styles.cardimg}>
                            <img src={pubg} alt="" />
                        </div>

                    </div>
                    <div className={styles.card}>
                    <div className={styles.text}>COD</div>

                    <div className={styles.cardimg}>
                            <img src={cod} alt="" />

                            </div>
                            </div>
                        <div className={styles.card}>
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