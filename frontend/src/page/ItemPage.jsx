import React, { useEffect, useState } from "react";
import axios from 'axios';
import  "./style/ItemPage.css";
import { useParams } from "react-router-dom";

export default function ItemPage() {
  const [item, setItem] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/items/${id}`)
      .then(response => {
        setItem(response.data);
        setCurrentPhotoIndex(0); // Reset photo index when a new item is loaded
      })
      .catch(error => console.error(error));
  }, [id]);

  const handlePrevious = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prevIndex => prevIndex - 1);
    }
  }

  const handleNext = () => {
    if (currentPhotoIndex < (item?.photos.length || 0) - 1) {
      setCurrentPhotoIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <div className="itemContainer">
        {item && (
            <div>
                
                
                <div className="photoContainer">
                    <img 
                        src={`http://localhost:3000/uploads/${item.photos[currentPhotoIndex]}`} 
                        alt={`${item.title}-${currentPhotoIndex}`} 
                        className="photo"
                    />
                    <button className="navButton prev" onClick={handlePrevious}>←</button>
                    <button className="navButton next" onClick={handleNext}>→</button>
                </div>
                <div className="itemInfo">

                <h2 className="itemTitle">{item.title}</h2>
                <p className="itemDescription">{item.description}</p>
                <p className="address">{item.address}</p>
                {item.price !== 0 && <p className="price">Price: {item.price}</p>}
                {item.category && <p className="category">Category: {item.category}</p>}
                </div>

            </div>
        )}
    </div>
);

}
