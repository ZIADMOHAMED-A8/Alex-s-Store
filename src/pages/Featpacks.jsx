import { useEffect, useState } from "react"
import styles from './Featpacks.module.css'
import Packbox from "../Components/Packbox"
import { useGetDataQuery } from "../../dataslice"
import Heading from "../Components/Heading"
export default function Featpacks(){
    // let [data,setData]=useState(null)
//     useEffect(()=>{
//     async function fetchData() {
//         let res= await fetch('../../public/alex_shop_prices.json')
//         if(res.ok){
//             let data=await res.json()
//             setData(data)
//         }
//     }
//     fetchData()
//  },[])
let {data,isLoading}=useGetDataQuery()
    if(isLoading){
        return (
            <>
            <p>loading</p>
            </>
        )
    }
    else{
    return (
        <div style={{borderTop:'1px solid #003061'}}>
    <div style={{paddingTop:'100px',paddingBottom:'100px'}} className="container">
        <Heading headingText={'Featured Packages'} paraText={'Best value bundels picked by gamers'}></Heading>
       <div className={styles.packboxes}>
       {data.games.map((item,index)=>
            <Packbox gameIndex={index} packIndex={3} name={item.game_name} quan={item.packages[3].quantity} price={item.packages[3].price_egp}></Packbox>
        )}
       </div>
    </div>   
    </div>    
    )
}
}