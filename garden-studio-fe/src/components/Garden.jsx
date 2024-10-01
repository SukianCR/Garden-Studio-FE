import Plants from "./Plants";
import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Loading_Bar from "./Loading_Bar";

import LoadReference from "./reference.js";
import LazyUserRefresh from "./lazyRefresh.js";

import { useGetMyGardenQuery } from "../components_db/gardenSlice";
import MyGarden from "./MyGarden";

import GardenPlants from "./GardenPlants";

export default function Garden() {
  // load the reference data
  console.log("run reference from garden");
  LoadReference() ? LoadReference() : console.log("Still loading Reference");

  // Set up for navigation and the store
  const navigate = useNavigate();
  const store = useStore();

  // get the current logged in user from state
  let theUser = useSelector((state) => {
    return state.user.user;
  });

  // get the current logged in user's garden
  const myGarden = useSelector((state) => {
    return state.garden;
  });

  //if the garden isn't there yet, do the query
  //if (!myGarden?.id) {
  // **************** getting a complaint about the conditional **************//
  console.log("theUserID", theUser.id);
  const { data, error } = useGetMyGardenQuery(theUser.id);
  console.log("myGarden data", data);
  //}
  console.log("myGarden", myGarden);

  // just a note for now
  if (!theUser.id && window.sessionStorage.getItem("Token")) {
    console.log("Need LazyUserRefresh Call");
  }
  //reload the user with a refresh if it is needed
  const newRefresh = LazyUserRefresh();
  console.log("newRefresh: ", newRefresh);

  // get the zonelist to display users zone
  const zoneList = useSelector((state) => {
    return state.reference.zoneList;
  });

  // get the shapeList to display users Shape
  const shapeList = useSelector((state) => {
    return state.reference.shapeList;
  });

  console.log("Garden SHAPELIST: ", shapeList);
  console.log("Garden ZONELIST: ", zoneList);
  console.log("Garden USER: ", theUser);
  console.log("Garden MYGARDEN: ", myGarden);

  // // find the correct name for display based on id for zone

  const specificZoneName = zoneList
    ? zoneList.filter((obj) => {
        if (obj.id === theUser.zone_id) return obj;
      })
    : [{ zone_name: "no zone yet", temp_range: "the void" }];

  const displayZoneName =
    specificZoneName[0]?.zone_name +
    " (" +
    specificZoneName[0]?.temp_range +
    ")";

  // display the gardens shape
  function Garden_Canvas() {
    store.subscribe(() => {
      store.getState().garden.currentGardenCanvas;
    });

    const [userGardenCanvas, setUserGardenCanvas] = useState(
      useSelector((state) => {
        return state.garden.currentGardenCanvas;
      })
    );

    console.log(
      "Garden_Canvas userGardenCanvas (From State): ",
      userGardenCanvas
    );

    const specificShapeClass = shapeList?.filter((obj) => {
      if (obj.id === userGardenCanvas) return obj;
    });

    // set-up defaults
    let canvasClasses = " garden border-garden p-2 text-dark ";
    let canvasShape = "square";

    if (typeof specificShapeClass != "undefined") {
      canvasClasses += specificShapeClass[0]
        ? specificShapeClass[0].css_class
        : "square";
      canvasShape = specificShapeClass[0]?.shape_name
        ? specificShapeClass[0].shape_name
        : "Square";
    }

    console.log("Garden_Canvas - CanvasClasses: ", canvasClasses);
    console.log("Garden_Canvas- CanvasShape: ", canvasShape);

    return <div className={canvasClasses}>{canvasShape}</div>;
  }

  function UserCard() {
    if (!theUser)
      return <div>No User Found - Please logout and login again.</div>;
    else
      return (
        <div className=" border-primary mt-1 card">
          <div className="card-header card-email-header"> {theUser.email}</div>

          <div className="grid center pt-2 pb-3 card-user">
            <div className="center card-user">
              {theUser.firstname} {theUser.lastname}
            </div>
            <br></br>
            <div className="center card-user"> Zone: {displayZoneName} </div>

            <div className="center pt-3 ">
              <button
                type="button"
                className="btn btn-outline-warning btn-sm border border-warning"
                onClick={() => navigate("/user")}
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      );
  }

  return (
    <>
      {/* <div className="row"> */}
        <div className="accordion container-fluid w95">
          <div className="row">
            <div className="col-12 pt-3">
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    User Info
                  </button>
                </h3>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body garden-card">
                    <UserCard />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Garden Info
                  </button>
                </h3>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion body user-card">
                    <MyGarden />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Plants in My Garden
                  </button>
                </h3>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion body">
                    <GardenPlants />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-5   ">
              <div className=" garden-canvas ">
                <Garden_Canvas /> 
                <h5>Was Canvas</h5>
              </div>
            </div>
            <div className="col-3   ">
              <Plants />
              <h5>Was Plant Filter</h5>
            </div> */}
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
