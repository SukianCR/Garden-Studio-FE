import React from "react";
import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import Left_Column from "./Left_Column";
import Right_Column from "./Right_Column";
import { useSelector, useDispatch } from "react-redux";
import {
  setAllContainers,
  setPlantsInGarden,
  setAllPlants,
} from "../components_db/mainArraysSlice.js";

export default function Garden_model() {
  const ma = useSelector((state) => state.mainArrays);
  const allPlants = ma?.allPlants;
  const allContainers = ma?.allContainers;
  const plantsInGarden = ma?.plantsInGarden;
  const referencePlants = ma?.referencePlants;
  const paths = ma.pixPaths;
  const cv = useSelector((state) => state.currentView);
  const shap = cv.cvShape;

  const dispatch = useDispatch();

  useEffect(() => {
    const picNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const fetchImage = async (pic) => {
      try {
        const response = await import(`../../images/${pic}.png`);
        console.log(response.default);
      } catch (err) {
        console.log(err);
      }
    };

    picNums.forEach((pic) => fetchImage(pic));
  }, []);

  function DraggableMarkup({ plant_id, old_cont }) {
    const plant_obj = referencePlants.filter((plant) => plant.id == plant_id);

    // const path = pictures[`${plant_obj[0]?.pic}`];
    const path = paths[Number(`${plant_obj[0]?.pic}`)];

    const plant_name = plant_obj[0]?.plant_name;

    //const path = "";

    return (
      <>
        {" "}
        <Draggable id={plant_id} old_cont={old_cont}>
          <div className="dragInGarden ">
            <p>{plant_name}</p>
            <img src={path} />
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
          <div className="text-light  square p-3  ">
            <GetDroppables />
          </div>
        );

      case 2:
        return (
          <div className="  text-light  circle p-3 rounded-circle  ">
            <GetDroppables />
          </div>
        );

      case 3:
        return (
          <div className="   text-light  square p-3 diamond ">
            <GetDroppables />
          </div>
        );

      case 4:
        return (
          <div className="   text-light  square p-3 heart ">
            <GetDroppables />
          </div>
        );

      default:
        return <></>;
    }
  }

  // function addPlantNewCont({new_cont_id, movedObj}) {
  //   const allContainers_temp2 = [...allContainers];
  //   const containerIndexN = allContainers_temp2.findIndex(
  //     (container) => container.id == new_cont_id
  //   );
  //   allContainers_temp2[containerIndexN] = movedObj;
  //   console.log(allContainers_temp2);

  //   dispatch(setAllContainers(allContainers_temp2));
  // }

  function handleDragEnd(event) {
    const plant_id = event.active.id;
    const new_cont_id = event.over?.id;
    const old_cont_id = event.active.data.current.old_cont;

    const plant_obj = referencePlants?.filter((plant) => plant.id == plant_id);
    const plant = plant_obj[0];
    const plant_price = plant?.price;
    const plant_pic = plant?.pic;
    const plant_name = plant?.plant_name;
    const plant_zone = plant?.zone;
    const plant_water = plant?.water;
    const plant_sun = plant?.sun;
    const plant_soil = plant?.soil;

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
      pic: plant_pic,
      price: plant_price,
      zone: plant_zone,
      water: plant_water,
      sun: plant_sun,
      soil: plant_soil,
    };

    const movedObj = {
      id: new_cont_id,
      plant_id: plant_id,
      plant_pic: plant_pic,
      vacancy: false,
    };

    // container 50 is the plant list container, which is also a "droppable"
    if (old_cont_id == 50) {
      // a.(add plant to the new container in containers array ...
      const allContainers_temp = [...allContainers];
      const containerIndexN = allContainers_temp.findIndex(
        (container) => container.id == new_cont_id
      );
      allContainers_temp[containerIndexN] = new_cont_obj;
      dispatch(setAllContainers(allContainers_temp));

      // b. remove from all plants
      const allPlants_temp = [...allPlants];
      const plantIndex = allPlants_temp.findIndex(
        (plant) => plant.id == plant_id
      );
      const plantRemoved = allPlants_temp.splice(plantIndex, 1);
      dispatch(setAllPlants(allPlants_temp));

      // c.(add plant to plantsInGarden)
      //setPlantsInGarden
      const plantsInGarden_temp = [...plantsInGarden];
      plantsInGarden_temp.push(new_plantInGarden);

      dispatch(setPlantsInGarden(plantsInGarden_temp));
    } else {
      if (new_cont_id == 50) {
        // delete plant from PlantsInGarden
        const plantsInGarden_temp = [...plantsInGarden];
        const plantIndex = plantsInGarden_temp.findIndex(
          (plant) => plant.id == plant_id
        );
        const plantRemoved = plantsInGarden_temp.splice(plantIndex, 1);
        dispatch(setPlantsInGarden(plantsInGarden_temp));

        // add plant to AllPlants
        const allPlants_temp = [...allPlants];
        allPlants_temp.push(new_plant);
        dispatch(setAllPlants(allPlants_temp));

        // delete from containers array (clear old container)
        const allContainers_temp3 = [...allContainers];
        const containerIndexO = allContainers_temp3.findIndex(
          (container) => container.id == old_cont_id
        );
        allContainers_temp3[containerIndexO] = old_cont_obj;

        dispatch(setAllContainers(allContainers_temp3));
      } else {
        if (old_cont_id === new_cont_id) {
          console.log("el mismo do nothing");
        } else {
          // a. add plant in new container
          // b. remove plant from old container(set to vacancy: true and plant_id: null)

          // addPlantNewCont(new_cont_id , movedObj);
          const allContainers_temp2 = [...allContainers];
          const containerIndexN = allContainers_temp2.findIndex(
            (container) => container.id == new_cont_id
          );
          allContainers_temp2[containerIndexN] = movedObj;

          const containerIndexO = allContainers_temp2.findIndex(
            (container) => container.id == old_cont_id
          );
          allContainers_temp2[containerIndexO] = old_cont_obj;

          dispatch(setAllContainers(allContainers_temp2));
        }
      }
    }
  }

  return (
    <div className="frame pt-5">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="row frameInt   ">
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
