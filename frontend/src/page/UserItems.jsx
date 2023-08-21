import axios from 'axios';
import React, { useEffect , useState } from 'react';
import { Link } from "react-router-dom"
import styles from "../styles/ListingShow.module.css";
export default function ItemsPage() {
  const [listings, setListings] = useState([]);
  useEffect(() => { 
    axios.get('/user-items').then(({data}) => {
      setListings(data);
    });
  }, []);

  const deleteItem = (id) => {
    axios.delete(`/items/${id}`).then(() => {
      // Remove the item from state
      setListings(listings.filter((listing) => listing._id !== id));
    });
  }

  return (
    <div>
      <div>
        <Link to="/addItem">
          <button>Add item</button>
        </Link>
      </div>
      <div className={styles.listingContainer}>
         
            <div className={styles.listingItems}>
              {listings.map((listing) => (
                
                <div> 
                  <button onClick={() => deleteItem(listing._id)}>Delete</button>
              <Link to={'/uploader/'+listing._id} >
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
              
               </div>
                    ))}
            </div>
          </div>
    </div>
  )   
}
