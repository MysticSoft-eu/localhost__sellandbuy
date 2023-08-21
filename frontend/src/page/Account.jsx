import { UserContext } from "../UserContext"
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import axios from "axios"
import AddItem from "./AddItem"
import UserItems from "./UserItems"
import "./style/Account.css"
import { FaEnvelope, FaShoppingCart, FaUserCircle } from "react-icons/fa";
export default function AccountPage() {
  
  const {ready,user} = useContext(UserContext);
   let {subpage} = useParams();
   if (subpage===undefined ) {
     subpage = 'profile';
   }

   async function logout() {
    try {
        const response = await axios.get('/logout', {}, { withCredentials: true });
        console.log(response.data);

        // Przekieruj do strony logowania po pomyślnym wylogowaniu
        window.location.href = '/';
    } catch (error) {
        console.error(error);
    }
}


   if (ready && !user) {
   return <Navigate to={'/login'} />
   }

   


   if(user){
    return(
      <div>
        <nav className="nav">
          <Link to={'/account'} >MY profile</Link>
          <Link to={'/account/bookings'} >MY booking</Link>
          <Link to={'/account/listing'} >MY listing</Link>
        </nav>

        {subpage === 'profile' &&( 
          <div className="userInfo">
           <FaUserCircle className="userInfoICON" />
           Logged in as ({user.name}) ({user.email}) <br/>
           <button className="logoutButton" onClick={logout} >Logout</button>
           </div>
        )}
        {subpage === 'listing' &&( 
          <div>
          <UserItems/>
         </div>
        )}
      </div> 
    )}



}