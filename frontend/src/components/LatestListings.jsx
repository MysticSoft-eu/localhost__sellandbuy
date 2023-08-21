import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "../styles/Listing.module.css";
import { Link } from "react-router-dom";

const Listing = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('/items')
      .then(response => setListings(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={styles.listingContainer}>
      <h2 className={styles.title}>Latest Listings</h2>
      <div className={styles.listingItems}>
        {listings.map((listing) => (
        <Link to={'/itempage/'+listing._id} >
          <div className={styles.listingItem} key={listing.id}>
            <div className={styles.listingImageWrapper}>
              <img src={`http://localhost:3000/uploads/${listing.photos[0]}`} alt="" className={styles.listingImage} />
            </div>
            <div className={styles.listingDetails}>
              <div className={styles.listingText}>
                <h3 className={styles.listingName}>{listing.title}</h3>
                <p className={styles.listingDescription}>
                  {listing.description}
                </p>
              </div>
              <div className={styles.listingRight}>
                <p className={styles.listingPrice}>{listing.price}</p>
                <p className={styles.listingCity}>{listing.address}</p>
              </div>
            </div>
          </div>
        </Link> 
        ))}
      </div>
    </div>
  );
};

export default Listing;
