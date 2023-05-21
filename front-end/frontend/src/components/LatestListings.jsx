import React from "react";
import listingsData from "../data/listings.json";
import styles from "../styles/Listing.module.css";

const getRandomListings = (count) => {
  const shuffledListings = listingsData.sort(() => 0.5 - Math.random());
  return shuffledListings.slice(0, count);
};

const Listing = () => {
  const randomListings = getRandomListings(5);

  return (
    <div className={styles.listingContainer}>
      <h2 className={styles.title}>Latest Listings</h2>
      <div className={styles.listingItems}>
        {randomListings.map((listing) => (
          <div className={styles.listingItem} key={listing.id}>
            <div className={styles.listingImageWrapper}>
              <img src={listing.image} alt="" className={styles.listingImage} />
            </div>
            <div className={styles.listingDetails}>
              <div className={styles.listingText}>
                <h3 className={styles.listingName}>{listing.name}</h3>
                <p className={styles.listingDescription}>
                  {listing.description}
                </p>
              </div>
              <div className={styles.listingRight}>
                <p className={styles.listingPrice}>{listing.price}</p>
                <p className={styles.listingCity}>{listing.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;
