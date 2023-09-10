import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style/ItemsByCategory.css";
import { Link } from "react-router-dom";
import CategoryDropdown from '../components/CategoryTree'
import { FaSearch } from "react-icons/fa";

export default function ItemsByCategory() {
  const { category, searchQuery = "", cityQuery = "" } = useParams();
  const [listings, setListings] = useState([]);
  const [inputValue, setInputValue] = useState(searchQuery); 
  const [city, setCity] = useState(cityQuery); 
  const [selected, setSelected] = useState([]);
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState('');
const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (selected && selected.length > 0){
    navigate(`/category/${selected.map(cat => cat.name).join(',')}${inputValue ? `/${inputValue}` : `/all`}${city ? `/${city}` : ''}`)}
    // Ta funkcja zostanie wywołana za każdym razem, gdy selectedCategories zostanie zaktualizowane
    fetchItems();

console.log(selected);
}, [selected]);
  

const fetchItems = async () => {
  let baseUrl = `/items`;
  let params = [];

  // Category check
  if (category) {
      params.push(`category=${category}`);
  }

  // Search query check
  if (inputValue) {
      params.push(`search=${inputValue}`);
  }

  // City check
  if (city) {
      params.push(`city=${city}`);
  }

  // Minimum and Maximum price check
  if (minPrice > 0) {
      params.push(`minPrice=${minPrice}`);
  }
  if (maxPrice < 100000000) {  // Assuming 1000 is your default max
      params.push(`maxPrice=${maxPrice}`);
  }

  // Sort option check
  if (sortOption) {
      params.push(`sortPrice=${sortOption}`);
  }

  // Construct the URL with the necessary parameters
  if (params.length > 0) {
      baseUrl += "?" + params.join('&');
  }

  try {
      const response = await axios.get(baseUrl);
      setListings(response.data);
  } catch (error) {
      console.error("Failed to fetch items:", error);
  }
};


  useEffect(() => {
    // If you want the searchQuery and cityQuery from the URL to influence the search upon mounting the component or changing the route
    setInputValue(searchQuery);
    setCity(cityQuery);
    fetchItems();
  }, [category, searchQuery, cityQuery]);

  const handleInput = () => {
    fetchItems();
  };
  useEffect(() => {
    fetchItems();
}, [ minPrice, maxPrice, sortOption]);
 


  return (
    <div className='body'>
      <div className="search-container">
         <input 
                    type="text" 
                    value={inputValue}   // <-- Bind the input to inputValue
                    onChange={e => setInputValue(e.target.value)} 
                    placeholder="Search..."
                    className="search-input"
                />
                
                <Link to={`/category/${category}${inputValue ? `/${inputValue}` : `/all`}${city ? `/${city}` : ''}`} >

                          <button onClick={handleInput} className="search-button">
                           <FaSearch />
                          </button>

                           </Link>
                         <input 
                    type="text" 
                    value={city}   // <-- Bind the input to inputValue
                    onChange={e => setCity(e.target.value)} 
                    placeholder="city..."
                    className="city-input"
                />
                    <Link to={`/category/${category}${inputValue ? `/${inputValue}` : `/all`}${city ? `/${city}` : ''}`} >

                <button onClick={handleInput} className="search-button">
                   <FaSearch />
                      </button>

                          </Link>

      </div>
     <div className="some-input" >
      <CategoryDropdown className="caregory-input" setSelectedCategories={setSelected} selectedCategories={selected} />
      <div className="price-input" >
            {/* Filter and Sort Controls */}
            
              <div class="item">
                <label>Min Price:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                /></div>
                <div class="item">
                <label>Max Price:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                /></div>
                <div class="item">
                <label>Sort By:</label>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select></div>
           

            
        </div>

            
         </div>  
         
      <div className="listing-container">
        <div className="listing-items">
          {listings.map((listing) => (
            <Link to={`/itempage/${listing._id}`} key={listing._id}>
              <div className="listing-item">
                <div className="listing-image-wrapper">
                  <img src={`http://localhost:3000/uploads/${listing.photos[0]}`} alt="" className="listing-image" />
                </div>
                <div className="listing-details">
                  <div className="listing-text">
                    <h3 className="listing-name">{listing.title}</h3>
                    <p className="listing-description">
                      {listing.description}
                    </p>
                  </div>
                  <div className="listing-right">
                    <p className="listing-price">{listing.price}</p>
                    <p className="listing-city">{listing.address}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
  
}