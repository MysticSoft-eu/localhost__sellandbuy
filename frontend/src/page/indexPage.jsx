import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Category from "../components/Category";
import AddNotice from "../components/AddNotice";
import LatestListings from "../components/LatestListings";
import "../App.css";


function Layout() {
  return (
    <div className="App">
      
      <div className="main-content">
        <Searchbar />
        <Category />
        <AddNotice />
        <LatestListings />
      </div>
    </div>
  );
}

export default Layout;