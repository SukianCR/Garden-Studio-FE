import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Droppable } from "./Droppable.jsx";
import { Draggable } from "./Draggable.jsx";

import { useSelector, useDispatch } from "react-redux";

import {
  setSun,
  setSoil,
  setWater,
  setZone,
  setCvPlants,
} from "../components_db/currentViewSlice.js";

export default function Right_Column() {
  // const plantsOriginal = useSelector((state) => {
  //   return state.mainArrays.allPlants;
  // });
  // const containersOriginal = useSelector((state) => {
  //   return state.mainArrays.allContainers;
  // });
  // // const zones = useSelector((state) => {
  //   return state.plantsP.zones;
  // });
  const cv = useSelector((state) => state.currentView);
  const cvPlants = cv.cvPlants;

  const pplants = useSelector((state) => state.plantsP);
  const soils = pplants.soils;
  const suns = pplants.suns;
  const waters = pplants.waters;
  const zones = pplants.zones;

  const ma = useSelector((state) => state.mainArrays);
  const allPlants = ma.allPlants;
  const allContainers = ma.allContainers;
  const plantsInGarden = ma.plantsInGarden;
  const referencePlants = ma.referencePlants;

  // console.log("PIG" + ma?.PlantsInGarden?.length);
  console.log("ALL Plants" + allPlants?.length);
  console.log("ALL Containers" + allContainers?.length);
  console.log("ALL plantsInGarden" + plantsInGarden?.length);
  console.log("ALL referencePlants" + referencePlants?.length);

  // console.log("cv plants" + cvPlants.length);

  // console.log("ALL Reference Plants" + ma?.referencePlants?.length);

  const dispatch = useDispatch();

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
    console.log("im in manage filters");

    const filters = [];

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
    const newCV = [];
    switch (filters.length) {
      case 0: // 0 filters
        dispatch(setCvPlants(allPlants));
        break;

      case 1: // 1 filter
        allPlants?.forEach((plant) => {
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
        dispatch(setCvPlants(newCV));
        break;

      case 2: // 2 filters
        allPlants?.forEach((plant) => {
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
        dispatch(setCvPlants(newCV));
        break;

      case 3: // 3 filters
        allPlants?.forEach((plant) => {
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
        dispatch(setCvPlants(newCV));
        break;

      case 4:
        allPlants?.forEach((plant) => {
          if (
            cv.zone == plant.zone_id &&
            cv.soil == plant.soil_requirement_id &&
            cv.water == plant.water_requirement_id &&
            cv.sun == plant.sun_requirement_id
          ) {
            newCV.push(plant);
          }
        });
        dispatch(setCvPlants(newCV));
        break;

      default:
        break;
    }
  }

  function Plant_List() {
    Manage_Filters();
    console.log("cv plants" + cvPlants?.length);

    return (
      <div>
       hola
        {/* {cvPlants?.map((plant) => {
          // const img = "../src/assets/pictures/" + random_number + ".png";
          const path = `./src/assets/pictures/${plant.pic}.png`;

          if (plant.in_garden == false) {
            return (
              <>
                <div className=" plant_box  p-1 mb-2 bg-primary border border-success">
                  <div className="center">
                    {" "}
                    <img src={path} />
                  </div>

                  <div className="row pc_info ">
                    <div className="col-12 center  aife   ">
                      <h6>{plant.plant_name}</h6>
                    </div>

                    <div className="col-12">${plant.price} each</div>
                  </div>
                </div>
              </>
            );
          }
        })} */}
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
                className="form-control  cgray w-100 p-2 bg-dark "
              >
                <option key="0" className="dropdown-item" value="0" key2="0">
                  &#x1F321; Zone
                </option>
                {zones?.map((zone) => {
                  return (
                    <option
                      key={zone.id}
                      className="dropdown-item cgray"
                      value={zone.id}
                      key2={zone.id}
                    >
                      &#x1F321;{zone.name}
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
                className="form-control cgray w-100 p-2 bg-dark"
              >
                <option key="0" className="dropdown-item" key2="0">
                  &#x1F4A7; Water
                </option>
                {waters?.map((h2o) => {
                  return (
                    <option key={h2o.id} key2={h2o.id} className="text-light">
                      {" "}
                      &#x1F4A7; {h2o.name}
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
                className="form-control cgray w-100 p-2 bg-dark"
              >
                <option key="0" className="dropdown-item" key2="0">
                  &#9728; Sun{" "}
                </option>
                {suns?.map((sun) => {
                  return (
                    <option
                      key={sun.id}
                      className="dropdown-item"
                      key2={sun.id}
                    >
                      &#9728; {sun.name}
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
                className="form-control cgray w-100 p-2 bg-dark"
              >
                <option key="0" key2="0" className="dropdown-item  ">
                  &#9968; Soil{" "}
                </option>
                {soils?.map((soil) => {
                  return (
                    <option key={soil.id} key2={soil.id}>
                      &#9968; {soil.name}
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

{
  /* 
  function Plant_List() {
  <div>
<Droppable id={50} key={50}>
  {cvPlants?.map((plant) => {
    // const img = "../src/assets/pictures/" + random_number + ".png";
    const path = `./src/assets/pictures/${plant.pic}.png`;

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

              <div className="col-12">${plant.price} each</div>
            </div>
          </div>
        </Draggable>
      );
    }
  })}
</Droppable>
</div> */
}
