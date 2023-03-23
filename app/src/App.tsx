import * as tf from "@tensorflow/tfjs";
import { useRef, useState } from "react";
import PredictionTable from "../../app/src/components/PredictionTable";
import { breeds } from "./data/mapping";

const App = () => {
  const fileInputRef: any = useRef();
  const imageRef = useRef<any>();
  const [imgData, setImgData] = useState(null);
  const [predictions, setPredictions]: any = useState({});
  const [isLoading, setLoading] = useState(false);

  const detectObjectsOnImage = async (imageElement: any, imgSize: any) => {
    const model: any = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/snenenenenenene/pet-prediction/main/models/tfjs/model.json"
    );

    const tensor: tf.Tensor = tf.browser
      .fromPixels(imageRef.current)
      .div(255)
      .resizeNearestNeighbor([256, 256])
      .expandDims(0)
      .toFloat();

    const results = await model.predict(tensor).data();
    results.map((entry: any, i: any) => {
      setPredictions(
        (predictions[
          parseFloat(entry * 100)
            .toFixed(2)
            .replace(/\.?0+$/, "")
        ] = breeds[i])
      );
    });
    setPredictions(
      Object.fromEntries(
        Object.entries(predictions).sort().reverse().slice(0, 3)
      )
    );

    setLoading(false);
  };

  const readImage = (file: any) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onSelectImage = async (e: any) => {
    setLoading(true);

    const file = e.target.files[0];
    const imgData: any = await readImage(file);
    setImgData(imgData);

    const imageElement: any = document.createElement("img");
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

  return (
    <main className="w-screen h-screen flex bg-black text-white">
      <PredictionTable predictions={predictions} loading={isLoading} />
      <section className="w-full h-full flex relative">
        <div className="border-2 relative m-40 flex justify-center items-center border-white mx-auto">
          <p className="absolute text-xl">Click to select image</p>
          <input
            ref={fileInputRef}
            onChange={(e) => onSelectImage(e)}
            className="w-full cursor-pointer h-full z-20 opacity-0"
            type="file"
          />
          {imgData && (
            <img
              alt="target-prediction-subject"
              className="absolute z-10 w-full h-full object-cover"
              src={imgData}
              ref={imageRef}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
