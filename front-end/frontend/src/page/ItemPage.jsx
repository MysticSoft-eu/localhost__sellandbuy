import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "../styles/Listing.module.css";
import { useParams } from "react-router-dom";

export default function ItemPage() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/items/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      {item && (
        <div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {item.photos.map((photo, index) => (
            <img 
              key={index} 
              src={`http://localhost:3000/uploads/${photo}`} 
              alt={`${item.title}-${index}`} 
              style={{width: "100px"}} 
            />
          ))}
          <p>{item.address}</p>
          {item.price !== 0 && <p>Price: {item.price}</p>}
          {item.category && <p>Category: {item.category}</p>}
        </div>
      )}
    </div>
  )
}
