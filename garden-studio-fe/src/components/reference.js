import { useGetReferenceQuery } from "../components_db/referenceSlice";
import { useEffect } from "react";

// Load the reference data
// TODO - should add a pop up if it fails
const LoadReference = () => {
  // console.log("LoadReference");

  useEffect(() => {
    // console.log("LOAD mounted");
  });

  // const [errM, setErrM] = useState(null);
  const { data, isSuccess, isLoading, isError, error } = useGetReferenceQuery();

  if (isSuccess) {
    console.log("all the lists: ", data);
  } else {
    console.log("error from load reference" + error);
  }
};

export default LoadReference;
