import { useEffect, useRef, useState } from "react";
import { useGetDataQuery } from "../../dataslice";
import Heading from "../Components/Heading";
import styles from './Packages.module.css'
import Packbox from "../Components/Packbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Packages(){
    let {data,isLoading}=useGetDataQuery()
    let [index,setIndex]=useState(0)
    
    let contRef=useRef()
    function next(){
        contRef.current.scrollBy({
            left:contRef.current.offsetWidth,
            behavior:'smooth'
        })
    }
    function prev(){
        contRef.current.scrollBy({
            left:-1*contRef.current.offsetWidth,
            behavior:'smooth'
        })
    }
    function updateIndex(index){
        setIndex(index)
                
        contRef.current.scrollTo({
            left:0,
            behavior:'smooth'
        })
    }
    if(isLoading){
        return(
            <>
            <p>loading..</p>
            </>
        )
    }
    else{
    return (
        <>
        <div style={{marginTop:'100px',marginBottom:'100px'}}>
        <div className="container">
            <Heading headingText={'Packages'} paraText={'Pick your game to expolre bundels'}></Heading>
            <div className={styles.gamesWrap}>
            {data.games.map((item,index)=><div onClick={()=>{
                updateIndex(index)
            }} className={styles.gameTab}><h3>{item.game_name} / {item.account_type}</h3></div>)}
            </div>
        {
            window.innerWidth>767 &&
            <>
                <button style={{backgroundColor:'transparent'}}>
  <FontAwesomeIcon onClick={prev} style={{color:'white',fontSize:'16px'}} icon={faArrowLeft} /> 
</button>

<button style={{backgroundColor:'transparent'}}>
  <FontAwesomeIcon onClick={next} style={{color:'white',fontSize:'16px'}} icon={faArrowRight} /> 
</button>
            </>
        }
            <div ref={contRef} className={styles.packboxes}>
            {data.games[index].packages.map((item,packIndex)=>
            <Packbox name={`${data.games[index].game_name} / ${data.games[index].account_type}`} gameIndex={index} packIndex={packIndex} quan={item.quantity} price={item.price_egp}></Packbox>
            )}
            </div>
            </div>
            </div>
        </>
    )
}
}