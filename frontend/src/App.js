import React, { useState, useRef } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";

const App = () => {
  const fileInputRef = useRef();
  const imageRef = useRef();
  const [imgData, setImgData] = useState(null);
  const [predictions, setPredictions] = useState({});
  const [predictionFinished, setPredictionFinished] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const isEmptyPredictions = !predictions || predictions.length === 0;
  let breeds = {
    0: "abyssinian",
    1: "american_bulldog",
    2: "american_pit_bull_terrier",
    3: "basset_hound",
    4: "beagle",
    5: "bengal",
    6: "birman",
    7: "bombay",
    8: "boxer",
    9: "british_shorthair",
    10: "chihuahua",
    11: "egyptian_mau",
    12: "english_cocker_spaniel",
    13: "english_setter",
    14: "german_shorthaired",
    15: "great_pyrenees",
    16: "havanese",
    17: "japanese_chin",
    18: "keeshond",
    19: "leonberger",
    20: "maine_coon",
    21: "miniature_pinscher",
    22: "newfoundland",
    23: "persian",
    24: "pomeranian",
    25: "pug",
    26: "ragdoll",
    27: "russian_blue",
    28: "saint_bernard",
    29: "samoyed",
    30: "scottish_terrier",
    31: "shiba_inu",
    32: "siamese",
    33: "sphynx",
    34: "staffordshire_bull_terrier",
    35: "wheaten_terrier",
    36: "yorkshire_terrier",
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const mapper = (value) => {
    return breeds[value]
  }

  const detectObjectsOnImage = async (imageElement, imgSize) => {
    const model = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/snenenenenenene/pet-prediction/main/models/tfjs/model.json"
    );
    const tensor = tf.browser
      .fromPixels(imageRef.current, 3)
      .resizeNearestNeighbor([180, 180])
      .expandDims()
      .toFloat();
    let result = await model.predict(tensor, 180).data();
    console.log("RESULT");
    
    console.log(result)
    const value = Math.max(result)
    console.log(value)
    const move_name = mapper(value)
    console.log(move_name)

    // result.map((entry, i) => {
    //   console.log(entry)
    //   setPredictions(
    //     (predictions[
    //       parseFloat(entry * 100)
    //         .toFixed(8)
    //         // .replace(/\.?0+$/, "")
    //     ] = breeds[i])
    //   );
    // });
    // setPredictions(
    //   Object.fromEntries(
    //     Object.entries(predictions).sort().reverse().slice(0, 3)
    //   )
    // );

    setPredictionFinished(true);
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
          {Object.keys(predictions).map((keys) => {
            return (
              <div className="prediction-box">
                {predictions[keys]}: {keys}
              </div>
            );
          })}
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="detector">
          {imgData && (
            <img className="target-image" src={imgData} ref={imageRef} />
          )}
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
};

export default App;
