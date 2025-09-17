import Featpacks from "./Featpacks"
import Herosection from "./Herosection"
import Packages from "./Packages"
import Ratings from "./Rattings"
import ScrollToTop from '../ScrollToTop.jsx'

export default function Homepage(){
    return (
        <>
<ScrollToTop />
        <Herosection></Herosection>    
    <Featpacks></Featpacks>  
    <Ratings></Ratings>
    <Packages></Packages>
        </>
    )
}
