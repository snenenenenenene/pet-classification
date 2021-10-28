import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as json from 'json-keys-sort'
import _ from 'lodash';

const App = () => {

  const fileInputRef = useRef();
  const imageRef = useRef();
  const [imgData, setImgData] = useState(null);
  const [predictions, setPredictions] = useState({});
  const [predictionFinished, setPredictionFinished] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const isEmptyPredictions = !predictions || predictions.length === 0;

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

   
   const detectObjectsOnImage = async (imageElement, imgSize) => {
    let breeds = {  0:'Basset Hound', 1:'Beagle', 2:'Russian Blue', 3:'Pomeranian', 4:'Ragdoll', 
    5:'Staffordshire Bull Terrier', 6:'Keeshond', 7:'Siamese', 8:'Pug', 9:'Shiba inu', 
    10:'American Pit Bull Terrier', 11:'Bengal', 12:'British Shorthair', 13:'Newfoundlander', 
    14:'Havanese', 15:'Japanese Chin', 16:'German Shorthaired', 17:'Birman', 18:'Maine Coon', 
    19:'English Cocker Spaniel', 20:'Scottish Terrier', 21:'Wheaten Terrier', 22:'Chihuahua', 
    23:'American Bulldog', 24:'Abyssinian', 25:'Boxer', 26:'Yorkshire Terrier', 27:'Miniature Pinscher', 
    28:'Sphynx', 29:'Samoyed', 30:'Leonberger', 31:'Bombay', 32:'English Setter', 33:'Persian', 
    34:'Great Pyrenees', 35:'Egyptian Mau', 36:'Saint Bernard' } 

    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/snenenenenenene/pet-prediction/main/models/tfjs/model.json');
    const tensor = tf.browser
    .fromPixels(imageRef.current, 3)
    .resizeNearestNeighbor([180, 180])
    .expandDims()
    .toFloat();
    let result = await model.predict(tensor, 180).data()
    console.log("RESULT")
    result.map((entry, i) => {
      setPredictions(predictions[parseFloat(entry*100).toFixed(8).replace(/\.?0+$/,"")] = breeds[i])
    })
    setPredictions(Object.fromEntries(Object.entries(predictions).sort().reverse().slice(0, 3)))
    console.log(predictions)
    setPredictionFinished(true)
  };
  
   const readImage = (file) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

   const onSelectImage = async (e) => {
    setPredictions([]);
    setLoading(true);

    const file = e.target.files[0];
    const imgData = await readImage(file);
    setImgData(imgData);

    const imageElement = document.createElement("img");
    imageElement.src = imgData;

    imageElement.onload = async () => {
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      };
      await detectObjectsOnImage(imageElement, imgSize);
      setLoading(false);
    };
  };

  const showPredictions = () => {
    if (predictionFinished === true) {
        return (
          <div className="predictions-container">
            {Object.keys(predictions).map(keys => {
              return (<div className="prediction-box">{predictions[keys]}: {keys}</div>)}
              )}
          </div>
        )
    }
    else {
      return;
    }
  }

  return (
    <div className="App">
    <div className="container">
      <div className="detector">
      {imgData && <img className="target-image" src={imgData} ref={imageRef} />}
      </div>
      <input
      type="file"
      ref={fileInputRef}
      onChange={onSelectImage}
      className="hidden-input"
      />
      <button onClick={openFilePicker}>
        {isLoading ? "Recognising..." : "Select Image"}
      </button>
      {showPredictions()}
    </div>
    </div>
  );
}

export default App;