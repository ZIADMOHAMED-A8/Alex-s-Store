import styles from '../pages/Featpacks.module.css'
export default function Heading({headingText,paraText}){
    return (
        <>
        <h1>{headingText}</h1>
        <p>{paraText}</p>
        </>
    )
}