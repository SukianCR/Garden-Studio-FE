import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading_Bar from "./Loading_Bar.jsx";
import loadReference from "./reference.js";
import {
  setSun,
  setSoil,
  setWater,
  setZone,
} from "../components_db/currentViewSlice.js";

import { useSelector, useDispatch } from "react-redux";

export default function Plants() {
  const allPlantsBurnt_Hold = [
    {
      id: 0,
      plant_name: "Netleaf willow",
      zone_id: "f8cb79dd-7e13-4f3c-8aa0-3a464a27d04a", // 3a
      water_requirement_id: "542cf1e2-6526-4988-ab10-9b6244b5b1d4", //dry
      sun_requirement_id: "ff25b1d9-6222-4771-b981-79dd5cd9fc8e", //  Part Shade
      soil_requirement_id: "13313161-f9a9-43d3-b7b2-3de6d8279644", // Loam Soil
      pic: "0",
    },
    {
      id: 1,
      plant_name: "Dwarf",
      zone_id: "83ec730b-86d9-470f-8976-66d7c2493f02", // 6A
      water_requirement_id: "97ee6f82-7570-4741-8dc0-32571e99330c", // Wet
      sun_requirement_id: "996e59b5-a311-41a9-a323-37e667852b25", // Shade
      soil_requirement_id: "13313161-f9a9-43d3-b7b2-3de6d8279644", // Loam Soil
      pic: "1",
    },
    {
      id: 2,
      plant_name: "Crowberr",
      zone_id: "2150bf16-e297-409a-a487-586478f98b22", // 5A
      water_requirement_id: "97ee6f82-7570-4741-8dc0-32571e99330c", // Wet
      sun_requirement_id: "98d6ac5a-5a50-4bf6-9b43-a6d6866c4de8", //full sun
      soil_requirement_id: "25b0ae9f-daa0-4b51-bc2c-44d404403194", //Clay Soil
      pic: "2",
    },
    {
      id: 3,
      plant_name: "Paper birc",
      zone_id: "83ec730b-86d9-470f-8976-66d7c2493f02", // 6A
      water_requirement_id: "97ee6f82-7570-4741-8dc0-32571e99330c", // Wet
      sun_requirement_id: "996e59b5-a311-41a9-a323-37e667852b25", // Shade
      soil_requirement_id: "13313161-f9a9-43d3-b7b2-3de6d8279644", // Loam Soil
      pic: "3",
    },
    {
      id: 4,
      plant_name: "Bunchberry",
      zone_id: "2150bf16-e297-409a-a487-586478f98b22", // 5A
      water_requirement_id: "97ee6f82-7570-4741-8dc0-32571e99330c", // Wet
      sun_requirement_id: "98d6ac5a-5a50-4bf6-9b43-a6d6866c4de8", //full sun
      soil_requirement_id: "25b0ae9f-daa0-4b51-bc2c-44d404403194", //Clay Soil
      pic: "4",
    },
    {
      id: 5,
      plant_name: "Silverberry",
      zone_id: "ed8ab558-2d7f-4a6f-94f8-e5e975062da9", // 4A
      water_requirement_id: "9b2ce2d0-7e2f-4404-a7aa-d3505d6b3079", // Moderate
      sun_requirement_id: "03d4d735-e460-4b7f-9c27-63bfe2441455", // Part Sun
      soil_requirement_id: "71bd5721-9da4-4b7f-8e30-3b104e91f67d", // Chalk Soil
      pic: "5",
    },
    {
      id: 6,
      plant_name: "Foxglove",
      zone_id: "2150bf16-e297-409a-a487-586478f98b22", // 5A
      water_requirement_id: "97ee6f82-7570-4741-8dc0-32571e99330c", // Wet
      sun_requirement_id: "98d6ac5a-5a50-4bf6-9b43-a6d6866c4de8", //full sun
      soil_requirement_id: "6fd3f3e0-4a07-44bc-9aa4-ceb8a2f2e79a", //Silty Soil
      pic: "6",
    },
    {
      id: 7,
      plant_name: "Common juniper",
      zone_id: "f8cb79dd-7e13-4f3c-8aa0-3a464a27d04a", // 3a
      water_requirement_id: "542cf1e2-6526-4988-ab10-9b6244b5b1d4", //dry
      sun_requirement_id: "03d4d735-e460-4b7f-9c27-63bfe2441455", // Part Sun
      soil_requirement_id: "13313161-f9a9-43d3-b7b2-3de6d8279644", // Loam Soil
      pic: "7",
    },
    {
      id: 8,
      plant_name: "Goldenrod",
      zone_id: "83ec730b-86d9-470f-8976-66d7c2493f02", // 6A
      water_requirement_id: "97ee6f82-7570-4741-8dc0-32571e99330c", // Wet
      sun_requirement_id: "996e59b5-a311-41a9-a323-37e667852b25", // Shade
      soil_requirement_id: "13313161-f9a9-43d3-b7b2-3de6d8279644", // Loam Soil
      pic: "8",
    },
    {
      id: 9,
      plant_name: "Sugar maple",
      zone_id: "f8cb79dd-7e13-4f3c-8aa0-3a464a27d04a", // 3a
      water_requirement_id: "5a1da49a-b12f-4f1c-ac1a-5312df8f34e1", // Damp
      sun_requirement_id: "98d6ac5a-5a50-4bf6-9b43-a6d6866c4de8", //full sun
      soil_requirement_id: "45fbacc2-777b-432c-a97b-0763398e7e2f", //Sandy Soil
      pic: "9",
    },

    {
      id: 10,
      plant_name: "Crabapple tree",
      zone_id: "ed8ab558-2d7f-4a6f-94f8-e5e975062da9", // 4a
      water_requirement_id: "a670a36b-9ce9-4165-81bc-795d12bec052", // Moist
      sun_requirement_id: "03d4d735-e460-4b7f-9c27-63bfe2441455", // Part Sun
      soil_requirement_id: "45fbacc2-777b-432c-a97b-0763398e7e2f", //Sandy Soil
      pic: "0",
    },
    {
      id: 11,
      plant_name: "Delphinium",
      zone_id: "f8cb79dd-7e13-4f3c-8aa0-3a464a27d04a", // 3a
      water_requirement_id: "5a1da49a-b12f-4f1c-ac1a-5312df8f34e1", // Damp
      sun_requirement_id: "98d6ac5a-5a50-4bf6-9b43-a6d6866c4de8", //full sun
      soil_requirement_id: "45fbacc2-777b-432c-a97b-0763398e7e2f", //Sandy Soil
      pic: "1",
    },
  ];
  let isLoading = true;
  loadReference();
  // const sta = useSelector((state) => state.reference);
  const allRef = useSelector((state) => state.reference);
  const cv = useSelector((state) => state.currentView);
  const allPlants = useSelector((state) => state.reference.plantList);
  const allZones = allRef.zoneList;
  const allSuns = allRef.sunRequirementList;
  const allH2O = allRef.waterRequirementList;
  const allSoil = allRef.soilRequirementList;
  const lifeCycleList = allRef.lifeCycleList;

  const allPlantsBurnt = allRef.plantList;

  let newCV = [];

  // const fullSelects = [];

  isLoading = false;

  console.log("all ref: ", allRef);

  const dispatch = useDispatch();

  if (isLoading) {
    return Loading_Bar();
  }

  if (allPlants?.length == 0) {
    return <div>No plants found.</div>;
  }

  const updateCurrentView = (e) => {
    // console.log("NAME: " + e.target.name);
    // console.log("VALUE: " + e.target.value);
    const selectedIndex = e.target.options.selectedIndex;
    const newValue = e.target.options[selectedIndex].getAttribute("key2");
    console.log("NEW VALUE" + newValue);

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

  function Manage_1_Filter() {
    allPlantsBurnt?.forEach((plant) => {
      if (cv.zone != 0) {
        if (cv.zone == plant.zone_id) {
          newCV.push(plant);
        }
      }
      if (cv.sun != 0) {
        if (cv.sun == plant.sun_requirement_id) {
          newCV.push(plant);
        }
        //es sun
      }
      if (cv.water != 0) {
        if (cv.water == plant.water_requirement_id) {
          newCV.push(plant);
        }
        //es water
      }
      if (cv.soil != 0) {
        //es soil
        if (cv.soil == plant.soil_requirement_id) {
          newCV.push(plant);
        }
      }
    });
  }

  // function Manage_2_Filters() {}
  // function Manage_3_Filters() {}

  function Manage_Filters() {
    newCV = [];
    console.log("NewCV in manage filters" + newCV);
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

    switch (filters.length) {
      case 0: // 0 filters
        newCV = allPlantsBurnt;
        break;

      case 1: // 1 filter
        allPlantsBurnt?.forEach((plant) => {
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
        allPlantsBurnt?.forEach((plant) => {
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
        allPlantsBurnt?.forEach((plant) => {
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
        allPlantsBurnt?.forEach((plant) => {
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
    console.log("current view" + cv);

    Manage_Filters();

    console.log("All Plants: " + allPlantsBurnt);
    console.log("CURRENT VIEW " + newCV);

    return (
      <table className="table table-hover">
        <tbody>
          {newCV?.map((plant) => {
            const random_number = Math.floor(Math.random() * 10);
            const img = "../src/assets/pictures/" + random_number + ".png";
            console.log("allPlantsBurnt", allPlantsBurnt);
            const lifeCycleName = lifeCycleList
              ? lifeCycleList.filter((obj) => {
                  if (obj.id === plant.life_cycle_id) return obj;
                })
              : [{ life_cycle_name: "no name yet" }];
            console.log("lifeCycleName", lifeCycleName);
            const displayLifeCycleName = lifeCycleName[0]?.life_cycle_name;
            console.log("life cycle", displayLifeCycleName);

            return (
              <tr className=" table-dark" key={plant.id}>
                <td scope="row" className="w30">
                  <strong>{plant.plant_name}</strong> {displayLifeCycleName}-
                  {plant.max_height}x{plant.max_width}
                </td>
                <td className="w70">
                  <img src={img} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <div className=" border-dark bg-primary  card">
        <div className="card-header ">Plants</div>

        <div className=" row   center mt-4 mb-3 m-1">
          <div className="col-sm-6  ">
            <select
              className="list-select form-control input-sm p-1 dropdown-item text-warning dropdown border border-warning "
              defaultValue="0"
              onChange={updateCurrentView}
              name="s_zone"
            >
              <option key="0" className="dropdown-item" value="0" key2="0">
                Zone &#x1F321; &#8623;
              </option>

              {allZones?.map((zone) => {
                return (
                  <option
                    key={zone.id}
                    className="dropdown-item"
                    value={zone.id}
                    key2={zone.id}
                  >
                    {zone.zone_name}
                    &#x1F321; {zone.temp_range}
                    {/* &#127811; */}
                  </option>
                );
              })}
            </select>{" "}
          </div>

          <div className="col-sm-6 ">
            {/* <label htmlFor="s_water"> Water</label> */}
            <select
              className="list-select form-control input-sm p-1  dropdown-item text-warning dropdown border border-warning"
              defaultValue="0"
              onChange={updateCurrentView}
              name="s_water"
            >
              <option key="0" className="dropdown-item" key2="0">
                Water &#x1F4A7; &#8623;
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

        <div className="row   center   mb-4 m-1 ">
          <div className="col-sm-6 nav-item dropdown ">
            <select
              className=" form-control input-sm p-1 dropdown-item text-warning dropdown border border-warning"
              defaultValue="0"
              onChange={updateCurrentView}
              name="s_sun"
            >
              <option key="0" className="dropdown-item" key2="0">
                Sun &#9728; &#8623;{" "}
              </option>
              {allSuns?.map((sun) => {
                return (
                  <option key={sun.id} className="dropdown-item" key2={sun.id}>
                    &#9728; {sun.sun_name}
                  </option>
                );
              })}
            </select>{" "}
          </div>

          <div className="col-sm-6 ">
            <select
              className="list-select form-control input-sm p-1 dropdown-item text-warning dropdown border border-warning"
              defaultValue="0"
              onChange={updateCurrentView}
              name="s_soil"
            >
              <option key="0" key2="0" className="dropdown-item  ">
                Soil &#9968; &#8623;{" "}
              </option>
              {allSoil?.map((soil) => {
                return (
                  <option key={soil.id} key2={soil.id}>
                    &#9178; {soil.soil_name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="table-responsive  ">
          <Plant_List />
        </div>
      </div>
    </>
  );
}
