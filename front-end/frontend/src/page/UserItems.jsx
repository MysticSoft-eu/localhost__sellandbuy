import axios from 'axios';
import React, { useEffect , useState } from 'react';
import { Link } from "react-router-dom"


export default function ItemsPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { 
    axios.get('/user-items').then(({data}) => {
      setItems(data);
    });
    


  }, []);
    return (
        
        <div>
            

            <div>
            
              <Link to="/addItem">
              <button>Add item</button>
              </Link>
           </div>
            <div>
             {items.length > 0 && items.map(item => (
             <Link to={'/uploader/'+item._id} key={item.id}>
                <div>
                  <h1>{item.title}</h1>
                 <div>
                   {item.photos.length > 0 &&  (
                    <img src={ 'http://localhost:3000/uploads/'+item.photos[0]} alt=""  style={{width: "100px"}}/>
                   )}
                  </div>
                </div>
             </Link>
               
             ))}




            </div>
        
        
        </div>
        )   
}