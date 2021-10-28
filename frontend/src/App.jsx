import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import * as tf from '@tensorflow/tfjs';

const App = () => {
  const [image,setImage] = useState('');
  const [model, setModel]  = useState(null);
  const imageRef = useRef()

  useEffect(() => {
    console.log(image)
  }, [image])

  useEffect(() => {
    loadModel()
  })

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
   }

   const loadModel = async () => {
    // const state = await tf.loadLayersModel('http://localhost:8080/model.json');
    // const handler = tfn.io.fileSystem("file:///home/snenene/Documents/School/B3-S1/AI/Project/server/assets/model.json");
    // const model1 = await tf.loadModel(handler);

   }

   const identify = async () => {
    //  const results = await model.classify(imageRef.current)
    //  console.log(results)
     let result = await model.predict(imageRef.current).data()
     console.log(result)
   }

   const renderImage = () => {
     if (image !== '') {
       return (
         <div>
        <img src={image} alt="" width="100%" height="400" crossOrigin="anonymous" ref={imageRef} />
        <button className="btn" onClick={identify}>Identify Pet</button>
        </div>

       )
     }
     else {
       return
     }

   }

  return (
    <div>
      <Navbar/>
      <div className="dashboard">
      <p>Upload a picture of a pet</p>
      <div>
      <label htmlFor="file-input" className="file-input"></label>
      <input id="file-input" type="file" onChange={onImageChange}/>
      </div>
      {renderImage()}
      </div>
    </div>
  );
}

export default App;
