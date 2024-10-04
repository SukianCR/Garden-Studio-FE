import { useState } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCvShape, setCvPlants } from "../components_db/currentViewSlice.js";
import { setGName, setGShape, setGPlants } from "../components_db/grdnSlice";
import { Droppable } from "./Droppable.jsx";
import { Draggable } from "./Draggable.jsx";

export default function Left_Column() {
  // Set up for navigation and the store
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);
  const dispatch = useDispatch();
  // const store = useStore();

  const usr = useSelector((state) => {
    return state.usr;
  });
  const zones = useSelector((state) => {
    return state.plantsP.zones;
  });

  const grdn = useSelector((state) => state.grdn);
  // console.log("grdn" + grdn);

  const plantsInGarden = useSelector(
    (state) => state.mainArrays.plantsInGarden
  );

  const cv = useSelector((state) => state.currentView);
  // console.log("shapes" + cv.shapes.length);
  function Update_Garden({ ngname }) {
    const nshape = cv.cvShape;
    dispatch(setGName(ngname));
    dispatch(setGShape(nshape));
    dispatch(setGPlants(plantsInGarden));
    console.log(
      "gName" +
        grdn.name +
        " gShape" +
        grdn.shape +
        " plants in garden" +
        grdn.plants.length
    );
  }

  const submit = async (e) => {
    e.preventDefault();

    console.log("e target gname  " + e.target.children.gname.value);
    const ngname = e.target.children.gname.value;

    Update_Garden({ ngname });

    // if (form.email == usr.email && form.password == usr.password) {
    //   navigate("/garden");
    // } else {
    //   setErrM("Wrong email & password combination.");
    // }
  };

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const updateCvShape = (e) => {
    console.log("e NAME: " + e.target.name);
    console.log("e VALUE: " + e.target.value);

    const intValue = parseInt(e.target.value, 10);
    dispatch(setCvShape(intValue));
  };
  const GetZoneName = () => {
    const filteredZone = zones.filter((zn) => zn.id == usr.zone);
    return (
      <>
        Zone{" "}
        <span className="text-warning pr-1 pl-050"> {filteredZone[0]?.id}</span>
        &#x1F321; {filteredZone[0]?.name}&deg;F{" "}
      </>
    );
  };

  function UserCard() {
    if (!usr.token)
      return (
        <div className="card-body bg-dark">
          <p className="card-text">
            No User Found - Please logout and login again.
          </p>
        </div>
      );
    else
      return (
        <div className="card-body center fdc pb-3 pt-4 bg-dark">
          <p className="card-title center text-info ">{usr.email} </p>

          <p className="card-text center pt-2">{usr.fname + " " + usr.lname}</p>
          <p className="card-text center">
            <GetZoneName />
          </p>
        </div>
      );
  }
  function GetShape({ shape }) {
    switch (shape.id) {
      case 1:
        return <>&#9632; {shape.name}</>;

      case 2:
        return <> &#11044; {shape.name}</>;

      case 3:
        return <>&#11201; {shape.name}</>;
      case 4:
        return <>&#10084; {shape.name}</>;

      default:
        return <></>;
    }
  }

  function GardenCard() {
    return (
      <div className=" center  card-body bg-dark ">
        <div className="   mb-3 mt-3 w80">
          <form onSubmit={submit} name="formLogin">
            <div className="card-text center pt-3">
              {/* Shape: {grdn.shape} */}
              <select
                onChange={updateCvShape}
                name="s_shapes"
                className="form-control  cgray w-100 p-2 bg-dark  form-control-sm "
                defaultValue={cv.cvShape}
              >
                <option key="0" className="dropdown-item " value="0">
                  &#128160; All Shapes
                </option>
                {cv.shapes?.map((shape) => {
                  return (
                    <option
                      key={shape.id}
                      className="dropdown-item cgray p-2"
                      value={shape.id}
                    >
                      <GetShape shape={shape} />
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="pt-3">
              <input
                type="text"
                className="form-control  form-control-sm bg-dark text-info  pb-2 pt-2 "
                name="gname"
                placeholder={grdn.name}
                // onChange={updateForm}
                required
              />
            </div>
            <div className="pt-4">
              <small className="card-text text-warning ">
                Plants in the Garden
              </small>
              <ul className="list-group mb-4 mt-2 pig">
                {plantsInGarden?.map((plant) => {
                  return (
                    <li
                      key={plant.id}
                      className="list-group-item list-group-item-dark d-flex center text-white-50"
                    >
                      <small> {plant.name}</small>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="space-evenly pb-2">
              {" "}
              <button
                type="submit"
                className="btn btn-outline-success border border-success-subtle btn-sm m-1 p-2"
              >
                Save Garden
              </button>{" "}
              <button
                type="button"
                className="btn btn-outline-warning border border-warning-subtle btn-sm m-1 p-2"
                onClick={() => navigate("/buy")}
              >
                Buy Garden
              </button>
            </div>
          </form>
          {errM && (
            <div className="row pt-5 ">
              <div className="col-12 center">
                <p className="text-warning">{errM}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="left_column  ">
      <div className="card  mb-5 border border-dark-subtle ">
        <h5 className="card-header center bg-primary">Garden Info</h5>

        <GardenCard />

        {/* <MyGarden /> */}
      </div>

      <div className="card  border border-dark-subtle mb-5">
        <h5 className="card-header center bg-primary ">User Info</h5>
        <UserCard />
      </div>
    </div>
  );
}
