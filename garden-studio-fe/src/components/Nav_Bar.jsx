import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setPassword,
  setFname,
  setLname,
  setPhone,
  setZone,
  setToken,
} from "../components_db/usrSlice";

export default function Nav_Bar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function Logout() {
    resetUser();
  }
  function resetUser() {
    dispatch(setEmail("0"));
    dispatch(setPassword("0"));
    dispatch(setFname("0"));
    dispatch(setLname("0"));
    dispatch(setPhone("0"));
    dispatch(setZone("0"));
    dispatch(setToken(false));

    navigate("/login");
  }

  const usr = useSelector((state) => {
    return state.usr;
  });

  const token = usr.token;
  const fname = usr.fname;

  // console.log("tiene token?" + token);

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <span className="material-symbols-outlined">yard</span>

        <NavLink to="/" className="navbar-brand ">
          Botanica Gardenscape
        </NavLink>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          {!token && (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/garden" className="nav-link ">
                  My Garden
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/login" className="nav-link ">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/registration" className="nav-link ">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
          {token && (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/garden" className="nav-link ">
                  My Garden
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user" className="nav-link text-success ">
                {fname}
                </NavLink>
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-link pt1   "
                  onClick={() => Logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
