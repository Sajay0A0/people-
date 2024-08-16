import Usernavbar from "./Navbar";
import Sidenav from "./Sidenav";

export default function Page1(){

    return(

        <div>
            <Usernavbar/>
            <div className="d-flex gap-4">
            <Sidenav />
            <div className="rounded w-4/5 p-3 m-3" style={{border:'solid 1px #ddd'}}>
            <h1 className="mt-4">Hello,Jhon </h1>
            </div>
            </div>


        </div>
    )
}