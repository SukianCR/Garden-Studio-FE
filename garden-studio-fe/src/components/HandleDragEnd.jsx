export function HandleDragEnd({ event }) {
  const plant_id = event.active.id;
  const new_cont_id = event.over?.id;
  const old_cont_id = event.active.data.current.old_cont;

  const plant_obj = referencePlants?.filter((plant) => plant.id == plant_id);
  const plant_price = plant_obj[0]?.price;
  const plant_pic = plant_obj[0]?.pic;
  const plant_name = plant_obj[0]?.plant_name;

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
    if (new_cont_id == 150) {
      console.log("plant en 150 no haga nada");
    } else {
      // a. add plant in new container,

      const allContainers_temp3 = [...allContainers];
      const containerIndexN = allContainers_temp3.findIndex(
        (container) => container.id == new_cont_id
      );
      allContainers_temp3[containerIndexN] = movedObj;
      console.log(allContainers_temp3);

      dispatch(setAllContainers(allContainers_temp3));

      //   b. remove plant from old container(set to vacancy: true and plant_id: null)

      const allContainers_temp2 = [...allContainers];
      const containerIndexO = allContainers_temp2.findIndex(
        (container) => container.id == old_cont_id
      );
      allContainers_temp2[containerIndexO] = old_cont_obj;
      dispatch(setAllContainers(allContainers_temp2));
    }
  }
}
