import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading_Bar from "./Loading_Bar.jsx";
import loadReference from "./reference.js";

import { Droppable } from "./Droppable.jsx";
import { Draggable } from "./Draggable.jsx";

import { useSelector, useDispatch } from "react-redux";

import {
  setSun,
  setSoil,
  setWater,
  setZone,
} from "../components_db/currentViewSlice.js";

export default function Right_Column() {
  let isLoading = true;
  loadReference();

  const allRef = useSelector((state) => state.reference);
  const cv = useSelector((state) => state.currentView);
  const ma = useSelector((state) => state.mainArrays);

  // const allPlants = useSelector((state) => state.reference.plantList);
  const allZones = allRef.zoneList;
  const allSuns = allRef.sunRequirementList;
  const allH2O = allRef.waterRequirementList;
  const allSoil = allRef.soilRequirementList;
  const lifeCycleList = allRef.lifeCycleList;

  console.log("PIG" + ma?.PlantsInGarden?.length);
  console.log("ALL P" + ma?.allPlants?.length);
  console.log("ALL C" + ma?.allContainers?.length);

  const dispatch = useDispatch();

  const allPlants = ma?.allPlants;

  isLoading = false;

  let newCV = [];

  if (isLoading) {
    return Loading_Bar();
  }

  const updateCurrentView = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    const newValue = e.target.options[selectedIndex].getAttribute("key2");
    //console.log("NEW VALUE" + newValue);

    switch (e.target.name) {
      case "s_soil":
        dispatch(setSoil(newValue));
        break;
      case "s_sun":
        dispatch(setSun(newValue));
        break;
      case "s_water":
        dispatch(setWater(newValue));
        break;
      case "s_zone":
        dispatch(setZone(newValue));
        break;
      default:
        break;
    }
  };

  function Manage_Filters() {
    newCV = [];
    const filters = [];
    const allP = useSelector((state) => state.mainArrays.allPlants);

    if (cv.zone != "0") {
      filters.push("zone");
    }
    if (cv.water != "0") {
      filters.push("water");
    }
    if (cv.soil != "0") {
      filters.push("soil");
    }
    if (cv.sun != "0") {
      filters.push("sun");
    }

    switch (filters.length) {
      case 0: // 0 filters
        newCV = allPlants;
        break;

      case 1: // 1 filter
        allP?.forEach((plant) => {
          if (cv.zone != 0) {
            if (cv.zone == plant.zone_id) {
              newCV.push(plant);
            }
          }
          if (cv.sun != 0) {
            if (cv.sun == plant.sun_requirement_id) {
              newCV.push(plant);
            }
          }
          if (cv.water != 0) {
            if (cv.water == plant.water_requirement_id) {
              newCV.push(plant);
            }
          }
          if (cv.soil != 0) {
            if (cv.soil == plant.soil_requirement_id) {
              newCV.push(plant);
            }
          }
        });
        break;

      case 2: // 2 filters
        allP?.forEach((plant) => {
          if (cv.zone != 0 && cv.water != 0) {
            //zone & waterq
            if (
              cv.zone == plant.zone_id &&
              cv.water == plant.water_requirement_id
            ) {
              newCV.push(plant);
            }
          }

          if (cv.zone != 0 && cv.sun != 0) {
            //zone & sun
            if (
              cv.zone == plant.zone_id &&
              cv.sun == plant.sun_requirement_id
            ) {
              newCV.push(plant);
            }
          }

          if (cv.zone != 0 && cv.soil != 0) {
            //zone & soil
            if (
              cv.zone == plant.zone_id &&
              cv.soil == plant.soil_requirement_id
            ) {
              newCV.push(plant);
            }
          }

          if (cv.water != 0 && cv.sun != 0) {
            //water & sun
            if (
              cv.sun == plant.sun_requirement_id &&
              cv.water == plant.water_requirement_id
            ) {
              newCV.push(plant);
            }
          }

          if (cv.water != 0 && cv.soil != 0) {
            //water & soil
            if (
              cv.soil == plant.soil_requirement_id &&
              cv.water == plant.water_requirement_id
            ) {
              newCV.push(plant);
            }
          }

          if (cv.sun != 0 && cv.soil != 0) {
            //sun & soil
            if (
              cv.soil == plant.soil_requirement_id &&
              cv.sun == plant.sun_requirement_id
            ) {
              newCV.push(plant);
            }
          }
        });
        break;

      case 3: // 3 filters
        allP?.forEach((plant) => {
          if (cv.zone == 0) {
            // selected are soil, h20, sun
            if (
              cv.soil == plant.soil_requirement_id &&
              cv.water == plant.water_requirement_id &&
              cv.sun == plant.sun_requirement_id
            ) {
              newCV.push(plant);
            }
          }
          if (cv.sun == 0) {
            // selected are soil, water, zone
            if (
              cv.soil == plant.soil_requirement_id &&
              cv.water == plant.water_requirement_id &&
              cv.zone == plant.zone_id
            ) {
              newCV.push(plant);
            }
          }
          if (cv.water == 0) {
            // selected are soil, sun, zone
            if (
              cv.soil == plant.soil_requirement_id &&
              cv.zone == plant.zone_id &&
              cv.sun == plant.sun_requirement_id
            ) {
              newCV.push(plant);
            }
          }
          if (cv.soil == 0) {
            // selected are sun, water, zone
            if (
              cv.water == plant.water_requirement_id &&
              cv.zone == plant.zone_id &&
              cv.sun == plant.sun_requirement_id
            ) {
              newCV.push(plant);
            }
          }
        });
        break;

      case 4:
        allP?.forEach((plant) => {
          if (
            cv.zone == plant.zone_id &&
            cv.soil == plant.soil_requirement_id &&
            cv.water == plant.water_requirement_id &&
            cv.sun == plant.sun_requirement_id
          ) {
            newCV.push(plant);
          }
        });
        break;

      default:
        break;
    }
  }

  function Plant_List() {
    const cv = useSelector((state) => state.currentView);

    Manage_Filters();

    return (
      <div>
        <Droppable id={50} key={50}>
          {newCV?.map((plant) => {
            // const img = "../src/assets/pictures/" + random_number + ".png";
            const path = `./src/assets/pictures/${plant.pic}.png`;

            const lifeCycleName = lifeCycleList
              ? lifeCycleList.filter((obj) => {
                  if (obj.id === plant.life_cycle_id) return obj;
                })
              : [{ life_cycle_name: "no name yet" }];

            const displayLifeCycleName = lifeCycleName[0]?.life_cycle_name;

            if (plant.in_garden == false) {
              return (
                <Draggable id={plant.id} key={plant.id} old_cont={50}>
                  <div className=" plant_box  p-1 mb-2 bg-primary border border-success">
                    <div className="center">
                      {" "}
                      <img src={path} />
                    </div>

                    <div className="row pc_info ">
                      <div className="col-12 center  aife   ">
                        <h6>{plant.plant_name}</h6>
                      </div>

                      <div className="col-4 "> {displayLifeCycleName} - </div>
                      <div className="col-4">
                        {" "}
                        {plant.max_height} x{plant.max_width}{" "}
                      </div>
                      <div className="col-4">${plant.price} each</div>
                    </div>
                  </div>
                </Draggable>
              );
            }
          })}
        </Droppable>
      </div>
    );
  }

  return (
    <>
      {/* row card bg-light card plant_box  mt-2 */}

      <div className="card  mb-3 ">
        <div className="card-header center">Plants</div>

        {/* <Filters /> */}
        <div className="card-body center fdc pb-4">
          <div className="row pt-2 center ">
            <div className="col-6 center ">
              <select
                defaultValue="0"
                onChange={updateCurrentView}
                name="s_zone"
                className="form-control  cgray w-100 p-2 "
              >
                <option key="0" className="dropdown-item" value="0" key2="0">
                  &#x1F321; Zone
                </option>
                {allZones?.map((zone) => {
                  return (
                    <option
                      key={zone.id}
                      className="dropdown-item"
                      value={zone.id}
                      key2={zone.id}
                    >
                      &#x1F321;{zone.zone_name}
                      {zone.temp_range}
                      {/* &#127811; */}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-6 center ">
              <select
                defaultValue="0"
                onChange={updateCurrentView}
                name="s_water"
                className="form-control cgray w-100 p-2"
              >
                <option key="0" className="dropdown-item" key2="0">
                  &#x1F4A7; Water
                </option>
                {allH2O?.map((h2o) => {
                  return (
                    <option key={h2o.id} key2={h2o.id}>
                      {" "}
                      &#x1F4A7; {h2o.water_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row pt-4 center ">
            <div className="col-6 center ">
              <select
                defaultValue="0"
                onChange={updateCurrentView}
                name="s_sun"
                className="form-control cgray w-100 p-2"
              >
                <option key="0" className="dropdown-item" key2="0">
                  &#9728; Sun{" "}
                </option>
                {allSuns?.map((sun) => {
                  return (
                    <option
                      key={sun.id}
                      className="dropdown-item"
                      key2={sun.id}
                    >
                      &#9728; {sun.sun_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-6 center ">
              <select
                defaultValue="0"
                onChange={updateCurrentView}
                name="s_soil"
                className="form-control cgray w-100 p-2"
              >
                <option key="0" key2="0" className="dropdown-item  ">
                  &#9968; Soil{" "}
                </option>
                {allSoil?.map((soil) => {
                  return (
                    <option key={soil.id} key2={soil.id}>
                      &#9968; {soil.soil_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Plant_List />
      </div>
    </>
  );
}
