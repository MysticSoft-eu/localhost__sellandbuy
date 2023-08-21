import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/PhotoUploader.module.css';

export default function PhotosUploader({ onChange, initialPhotos = [] }) {
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setAddedPhotos(initialPhotos);
    }, [initialPhotos]);

    const uploadPhoto = (ev) => {
        const files = ev.target.files;
        const data = new FormData();  
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            const { data: filenames } = response;
            setAddedPhotos(prev => [...prev, ...filenames]);
            onChange([...addedPhotos, ...filenames]);
        });
    };

    const deletePhoto = (photoToDelete) => {
        setAddedPhotos(prev => prev.filter(photo => photo !== photoToDelete));
        onChange(addedPhotos.filter(photo => photo !== photoToDelete));
    }

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      
      const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
      };
      
      const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          setDragging(true);
        }
      };
      
      const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          uploadPhoto({ target: { files: e.dataTransfer.files } });
          e.dataTransfer.clearData();
        }
      };
    return (
        <div className={styles.container}>
             <h2 className={styles.heading}>Added Photos</h2>
             
           
             put photo here
             <div 
             className={`${styles.place} ${dragging ? styles.dragging : ''}`}
             onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}>  
                 
            
       
          
             
              {addedPhotos.length > 0 && addedPhotos.map((photo, index) => (
                  <div key={index} className={styles.imageContainer}>
                      <img 
                          src={`http://localhost:3000/uploads/${photo}`} 
                          alt="Uploaded" 
                      />
                      <button onClick={() => deletePhoto(photo)} className={styles.deleteButton}>x</button>
                  </div>
              ))}
          </div> <label htmlFor="photo" className={styles.label}>
                Choose Photos
              <input type="file" id="photo" multiple name="photo" onChange={uploadPhoto} className={styles.fileInput} />
            </label>
        </div>
      );
}