import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from "react-redux";

export default function Protected() {
  const usr = useSelector((state) => {
    return state.usr;
  });

  if (!usr.token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
