import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Loading_Bar from "./Loading_Bar";

import LoadReference from "./reference.js";
import LazyUserRefresh from "./lazyRefresh.js";

import { useGetMyGardenQuery } from "../components_db/gardenSlice.js";
import MyGarden from "./MyGarden";

import GardenPlants from "./GardenPlants";

export default function Left_Column() {
  // load the reference data
 // console.log("run reference from garden");
  //LoadReference() ? LoadReference() : console.log("Still loading Reference");
  LoadReference() ? LoadReference() : console.log("");
  // load the reference data
  //console.log("run reference from garden");
 // LoadReference() ? LoadReference() : console.log("Still loading Reference");
  LoadReference() ? LoadReference() : console.log("");

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

  const { data, error } = useGetMyGardenQuery(theUser.id);

  if (error) {
  //  console.log(error);
  }

  // console.log("myGarden data", data);
  // console.log("myGarden", myGarden);

  // just a note for now
  if (!theUser.id && window.sessionStorage.getItem("Token")) {
    console.log("Need LazyUserRefresh Call");
  }

  //reload the user with a refresh if it is needed
  const newRefresh = LazyUserRefresh();
  //console.log("newRefresh: ", newRefresh);

  // get the zonelist to display users zone
  const zoneList = useSelector((state) => {
    return state.reference.zoneList;
  });

  // get the shapeList to display users Shape
  const shapeList = useSelector((state) => {
    return state.reference.shapeList;
  });

 // console.log("Garden SHAPELIST: ", shapeList);
 // console.log("Garden ZONELIST: ", zoneList);
 // console.log("Garden USER: ", theUser);
 // console.log("Garden MYGARDEN: ", myGarden);

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

  //

  function UserCard() {
    if (!theUser)
      return (
        <div className="card-body">
          <p className="card-text">
            No User Found - Please logout and login again.
          </p>
        </div>
      );
    else
      return (
        <div className="card-body center fdc pb-3 pt-4">
          <h4 className="card-title center ">{theUser.email}</h4>
          <p className="card-text center pt-2">
            {theUser.firstname} {theUser.lastname}
          </p>
          <p className="card-text center">Zone: {displayZoneName}</p>
          <div className="center  pb-3 pt-2">
            {" "}
            <button
              type="button"
              className="btn btn-success p-2"
              onClick={() => navigate("/user")}
            >
              Edit User
            </button>
          </div>
        </div>
      );
  }

  return (
    <div className="left_column  ">
      <div className="card  mb-5  ">
        <div className="card-header center">Garden Info</div>
        <MyGarden />
      </div>
      <div className="card   ">
        <div className="card-header center">User Info</div>
        <UserCard />
      </div>
    </div>
  );
}
