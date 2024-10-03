import React from "react";
import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

// import Original_Containers from "./Original_Containers";
import Left_Column from "./Left_Column";
import Right_Column from "./Right_Column";
import { useSelector, useDispatch } from "react-redux";
import {
  setAllContainers,
  setPlantsInGarden,
  setAllPlants,
  setReferencePlants,
} from "../components_db/mainArraysSlice.js";
import { useNavigate } from "react-router-dom";

export default function Garden_model() {
  const ma = useSelector((state) => state.mainArrays);
  const allPlants = ma?.allPlants;
  const allContainers = ma?.allContainers;
  const plantsInGarden = ma?.plantsInGarden;
  const referencePlants = ma?.referencePlants;

  const dispatch = useDispatch();
  const cv = useSelector((state) => state.currentView);
  const shap = cv.cvShape;
  const navigate = useNavigate();

  function getAllPlants() {
    const allPlantsExtended = referencePlants?.plantList?.map((plant) => ({
      ...plant,
      in_garden: false,
      pic: Math.floor(Math.random() * 10),
      price: Math.floor(Math.random() * 30) + 10,
    }));

    // dispatch(setAllPlants(allPlantsExtended));
    // dispatch(setReferencePlants(allPlantsExtended));
  }
  function removeFPIG({ plant_id }) {
    const plantsInGarden_temp = [...plantsInGarden];
    const plantIndex = plantsInGarden_temp.findIndex(
      (plant) => plant.id == plant_id
    );
    const plantRemoved = plantsInGarden_temp.splice(plantIndex, 1);
    // console.log(plantsInGarden_temp);
    dispatch(setPlantsInGarden(plantsInGarden_temp));
  }

  function DraggableMarkup({ plant_id, old_cont }) {
    const plant_obj = referencePlants.filter((plant) => plant.id == plant_id);

    const path = "./src/assets/pictures/" + plant_obj[0]?.pic + ".png";
    const plant_name = plant_obj[0]?.plant_name;

    //const path = "";

    return (
      <>
        {" "}
        <Draggable id={plant_id} old_cont={old_cont}>
          <div className="dragInGarden ">
            <p>{plant_name}</p>
            <img src={path} className="mb-2" />
            <button
              type="button"
              className="btn btn-danger btn-sm"
              // onClick={removeFPIG(plant_id)}
            >
              x
            </button>
          </div>{" "}
        </Draggable>
      </>
    );
  }

  function GetDroppable({ container }) {
    const drop_id = Math.floor(Math.random() * 10000000);
    if (container.vacancy == false) {
      //in_garden={false}
      return (
        // <Droppable key={container.id} id={container.id}>
        <Droppable key={drop_id} id={drop_id}>
          {" "}
          <DraggableMarkup
            key={container.plant_id}
            plant_id={container.plant_id}
            old_cont={container.id}
          />{" "}
        </Droppable>
      );
    }

    return (
      <Droppable key={container.id} id={container.id}>
        {" "}
        <div className="white-soft"></div>
      </Droppable>
    );
  }
  function GetDroppables() {
    return (
      <div className="mainContainer">
        {allContainers.map((container) => (
          <GetDroppable key={container.id} container={container} />
        ))}
      </div>
    );
  }

  function Bring_Shape() {
    switch (shap) {
      case 1:
        return (
          <div className="text-light  shape p-3  ">
            <GetDroppables />
          </div>
        );

      case 2:
        return (
          <div className="  text-light  shape p-3 rounded-circle  ">
            <GetDroppables />
          </div>
        );

      case 3:
        return (
          <div className="   text-light  shape p-3 diamond ">
            <GetDroppables />
          </div>
        );

      case 4:
        return (
          <div className="   text-light  shape p-3 heart ">
            <GetDroppables />
          </div>
        );

      default:
        return <></>;
    }
  }

  function handleDragEnd(event) {
    const plant_id = event.active.id;
    const new_cont_id = event.over?.id;
    const old_cont_id = event.active.data.current.old_cont;

    const plant_obj = referencePlants?.filter((plant) => plant.id == plant_id);
    const plant_price = plant_obj[0]?.price;

    const plant_pic = plant_obj[0]?.pic;
    const plant_name = plant_obj[0]?.plant_name;
    const plant_mx_h = plant_obj[0]?.max_height;
    const plant_mx_w = plant_obj[0]?.max_width;
    const life_cycle_id = plant_obj[0]?.life_cycle_id;

    const new_cont_obj = {
      id: new_cont_id,
      plant_id: plant_id,
      plant_pic: plant_pic,
      vacancy: false,
    };

    const old_cont_obj = {
      id: old_cont_id,
      plant_id: null,
      plant_pic: null,
      vacancy: true,
    };

    const new_plantInGarden = {
      id: plant_id,
      name: plant_name,
      price: plant_price,
    };

    const new_plant = {
      id: plant_id,
      plant_name: plant_name,
      max_height: plant_mx_h,
      max_width: plant_mx_w,
      pic: plant_pic,
      price: plant_price,
      life_cycle_id: life_cycle_id,
    };

    // container 50 is the plant list container, which is also a "droppable"
    if (old_cont_id == 50) {
      // a.(add plant to the container in containers array ...
      const allContainers_temp = [...allContainers];
      const containerIndexN = allContainers_temp.findIndex(
        (container) => container.id == new_cont_id
      );
      allContainers_temp[containerIndexN] = new_cont_obj;
      dispatch(setAllContainers(allContainers_temp));

      // ... and remove plant from plants array)
      const allPlants_temp = [...allPlants];
      const plantIndex = allPlants_temp.findIndex(
        (plant) => plant.id == plant_id
      );

      allPlants_temp.splice(plantIndex, 1);
      // dispatch(setAllPlants(allPlants_temp));

      // b.(add plant to plantsInGarden)
      //setPlantsInGarden
      const plantsInGarden_temp = [...plantsInGarden];
      plantsInGarden_temp.push(new_plantInGarden);

      dispatch(setPlantsInGarden(plantsInGarden_temp));
    } else {
      if (new_cont_id == 50) {
        // a. add plant to plantsArray ,
        // cant do it yet until
        const allPlants_temp = [...allPlants];

        allPlants_temp.push(new_plant);
        // console.log(allPlants_temp);

        // console.log("all plants before new plant added" + ma.allPlants.length);
        dispatch(allPlants_temp);

        // console.log("all plants after new plant added" + ma.allPlants.length);

        // b. update containersArray (set old container to vacancy: true and plant_id: null)
        const allContainers_temp = [...allContainers];
        const containerIndexO = allContainers_temp.findIndex(
          (container) => container.id == old_cont_id
        );
        allContainers_temp[containerIndexO] = old_cont_obj;
        // console.log(allContainers_temp);
        dispatch(setAllContainers(allContainers_temp));

        // remove from plantsInGarden
        const plantsInGarden_temp = [...plantsInGarden];
        const plantIndex = plantsInGarden_temp.findIndex(
          (plant) => plant.id == plant_id
        );
        const plantRemoved = plantsInGarden_temp.splice(plantIndex, 1);
        // console.log(plantsInGarden_temp);
        dispatch(setPlantsInGarden(plantsInGarden_temp));
      } else {
        // update containers array , a. add plant in new container,

        const movedObj = {
          id: new_cont_id,
          plant_id: plant_id,
          plant_pic: plant_pic,
          vacancy: false,
        };
        const allContainers_temp = [...allContainers];
        const containerIndexN = allContainers_temp.findIndex(
          (container) => container.id == new_cont_id
        );
        allContainers_temp[containerIndexN] = movedObj;
        // dispatch(setAllContainers(allContainers_temp));

        //   b. remove plant from old container(set to vacancy: true and plant_id: null)

        const containerIndexO = allContainers_temp.findIndex(
          (container) => container.id == old_cont_id
        );
        allContainers_temp[containerIndexO] = old_cont_obj;
        dispatch(setAllContainers(allContainers_temp));
        // console.log("after empty last cont" + allContainers);
      }
    }
  }
  

  
  return (
    <div className="frame">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="row pt-4 frameInt   ">
          <div className="col-3  left_column  ">
            <Left_Column />
          </div>

          <div className="col-6  center  center_column  ">
            <Bring_Shape />
          </div>

          <div className="col-3  right_column   ">
            <Right_Column />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
