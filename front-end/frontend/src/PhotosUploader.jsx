import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PhotosUploader({ onChange, initialPhotos = [] }) {
    const [addedPhotos, setAddedPhotos] = useState([]);

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

    return (
        <div>
            <input type="file" multiple name="photo" onChange={uploadPhoto} />
            <div>
                <h2>Added Photos</h2>
                {addedPhotos.length > 0 && addedPhotos.map((photo, index) => (
                    <div key={index}>
                        <img 
                            src={`http://localhost:3000/uploads/${photo}`} 
                            alt="Uploaded" 
                            style={{width: "100px"}}
                        />
                        <button onClick={() => deletePhoto(photo)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}