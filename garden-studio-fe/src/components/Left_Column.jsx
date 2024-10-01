import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Left_Column() {
  // Set up for navigation and the store
  const navigate = useNavigate();
  // const store = useStore();

  const usr = useSelector((state) => {
    return state.usr;
  });
  const zones = useSelector((state) => {
    return state.plantsP.zones;
  });
  console.log(usr?.password + usr?.phone + usr?.zone + usr?.token);

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
        <div className="card-body">
          <p className="card-text">
            No User Found - Please logout and login again.
          </p>
        </div>
      );
    else
      return (
        <div className="card-body center fdc pb-3 pt-4">
          <p className="card-title center text-info ">{usr.email} </p>

          <p className="card-text center pt-2">{usr.fname + " " + usr.lname}</p>
          <p className="card-text center">
            <GetZoneName />
          </p>
        </div>
      );
  }

  function GardenCard() {
    return (
      <div className="card-body center fdc pb-3 pt-4">
        <p className="card-title center text-info ">{usr.email} </p>

        <p className="card-text center pt-2">{usr.fname + " " + usr.lname}</p>
        <p className="card-text center">
          <GetZoneName />
        </p>
      </div>
    );
  }

  return (
    <div className="left_column  ">
      <div className="card  mb-5  ">
        <p className="card-header center">Garden Info</p>
        <p className="p-3">
          {" "}
          name <br />
          shape <br />
          plants in garden <br />
          save garden - buy plants buttons{" "}
        </p>
        <GardenCard />

        {/* <MyGarden /> */}
      </div>

      <div className="card   ">
        <div className="card-header center">User Info</div>
        <UserCard />
      </div>
    </div>
  );
}
