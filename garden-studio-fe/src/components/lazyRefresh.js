import { useGetRefreshQuery } from "../components_db/userSlice";

//
const LazyUserRefresh = () => {
 // console.log("LazyUserRefresh");

  // FROM -- Created infinite loop
  // const [theUserData, setTheUserData] = useState();
  // //const [getLazyUser, results] = useLazyGetRefreshQuery();

  // // useEffect(() => {
  // //   if (results && results.data) {
  // //     setTheUserData([results.data]);
  // //     console.log("useLazyGetRefreshQuery results: ", results);
  // //     console.log("useLazyGetRefreshQuery results.data: ", results.data);
  // //   }
  // //   console.log("useLazyGetRefreshQuery before its back results: ", results);
  // // }, [results]);

  // // getLazyUser();

  // // return results.data;
  //TO

  // FROM THIS
  const { status, data, isSuccess, isLoading, isError, error } =
    useGetRefreshQuery();

  if (isSuccess) {
   // console.log("Lazy Refresh ", data);
  }
  if (isError) {
   // console.log("lazyRefresh isError", isError);
  }
  //TO THIS
};

export default LazyUserRefresh;
