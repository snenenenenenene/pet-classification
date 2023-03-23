import Loader from "./Loader";

export const PredictionTable = ({
  predictions,
  loading,
}: {
  predictions: any;
  loading: boolean;
}) => {
  return (
    <div className=" border-r-2 border-white h-full w-[20rem]">
      <h2 className="border-b-2 border-white h-10 flex justify-center items-center">
        PREDICTIONS (%)
      </h2>
      <section>
        {loading && <Loader />}
        {Object.keys(predictions).map((keys: any, i: number) => {
          console.log(keys);
          return (
            <div key={i} className="border-b-2 border-white flex pl-5 py-4">
              {predictions[keys]}: {keys}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default PredictionTable;
