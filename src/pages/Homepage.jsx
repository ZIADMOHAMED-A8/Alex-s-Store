import Featpacks from "./Featpacks"
import Herosection from "./Herosection"
import Packages from "./Packages"
import Ratings from "./Rattings"


export default function Homepage(){
    return (
        <>
        <Herosection></Herosection>    
    <Featpacks></Featpacks>  
    <Ratings></Ratings>
    <Packages></Packages>
        </>
    )
}