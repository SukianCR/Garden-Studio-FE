import { useUpdateGardenMutation } from "../components_db/gardenSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SelectList from "./SelectList";
import Loading_Bar from "./Loading_Bar";
import { setCurrentGardenCanvas } from "../components_db/gardenSlice.js";
import { setShape } from "../components_db/currentViewSlice.js";

export default function MyGarden() {
  // setup the dispatch for the subscribe on canvase
  const dispatch = useDispatch();

  // Get the current User id
  const id = useSelector((state) => {
    return state.user.id;
  });
  //console.log(`(useSelector(state) - function User() USER: ${id}`);
  const garden = useSelector((state) => {
    return state?.garden;
  });
  // console.log("myGarden page's garden", garden);
  const garden_id = garden?.garden?.[0]?.id;
  //   const gardenId = useSelector((state) => {
  //     return state?.garden?.garden[0]?.id;
  //   });
  // Get the reference list for Zone
  const zoneList = useSelector((state) => {
    return state.reference.zoneList;
  });
  const shapeList = useSelector((state) => {
    return state.reference.shapeList;
  });
  const waterRequirementList = useSelector((state) => {
    return state.reference.waterRequirementList;
  });
  const sunRequirementList = useSelector((state) => {
    return state.reference.sunRequirementList;
  });
  const soilRequirementList = useSelector((state) => {
    return state.reference.soilRequirementList;
  });

  // set up the relationship to the garden mutation
  const [updateGarden] = useUpdateGardenMutation();

  const [form, setForm] = useState(garden?.garden?.[0]);
  const [errM, setErrM] = useState(null);
  const [successM, setSuccessM] = useState(null);
  useEffect(() => {
    if (garden?.garden?.[0]) {
      setForm(garden.garden[0]);
    }
  }, [garden]);

  // console.log("function User() SETFORM currentUser: ", form);

  const submit = async (e) => {
    e.preventDefault();
    // console.log("FORM" + form);
    switch (form.shape_id) {
      case "dbb444c3-b50e-44ab-9aa9-51490cc4c5bd":
        dispatch(setShape("sq"));
        break;
      case "cc484fd1-d66c-45af-b233-246ceb282fcb":
        dispatch(setShape("cir"));
        break;
      default:
        dispatch(setShape("sq"));
        break;
    }

    try {
      let updateGardenSuccess = false;
      //  console.log("gardenID", garden_id);
      // console.log("form preparing to submit", form);
      updateGardenSuccess = await updateGarden({ garden_id, form }).unwrap();

      // console.log(
      //   "(function User() SUBMIT UPDATEGARDENSUCCESS:",
      //   updateGardenSuccess
      // );

      if (!updateGardenSuccess) {
        return Loading_Bar("30");
      } else if (updateGardenSuccess) {
        return setSuccessM("Garden information updated successfully!");
      }
    } catch (err) {
      //   setErrM(err?.data?.message);
      // console.log("update garden error", err);
    }
  };

  const updateForm = (e) => {
    // console.log(`updateForm: ${e.target.name}: ${e.target.value}`);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateFormOnListChange = (e) => {
    //  console.log(`updateFormOnListChange: ${e.target.name}: ${e.target.value}`);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //  console.log(updateFormOnListChange);
    //  console.log(form);
  };

  // FROM currentGardenCanvas
  // get the current garden shape stored in the state
  // variable from  currentGardenCanvas
  const updateCanvasOnListChange = (e) => {
    // set the variable in the store
    dispatch(setCurrentGardenCanvas(e.target.value));

    // set the variable for my garden
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //TO currentGardenCanvas

  return (
    <form onSubmit={submit} name="formGardenUpdate">
      <div className="card-body center fdc pb-4">
        <p className="card-text center pt-2">
          Your garden. Feel free to edit it.
        </p>

        <div className="row pt-3 center ">
          <div className="col-6 center ">
            <input
              type="text"
              className="form-control text_input cgray p-2"
              name="description"
              //   aria-describedby="emailHelp"
              //   placeholder="default"
              onChange={updateForm}
              value={form?.description}
              //   disabled
              required
            />
          </div>

          <div className="col-6 center ">
            <SelectList
              theList={zoneList}
              theListName="zone_id"
              theParentForm="GardenUpdate"
              onChangeFunction={updateFormOnListChange}
              theCurrentValue={form?.zone_id}
              theFieldName="zone_name"
              the2FieldName="temp_range"
            />
          </div>
        </div>

        <div className="row pt-4 center ">
          <div className="col-6 center ">
            <SelectList
              theList={shapeList}
              theListName="shape_id"
              theParentForm="GardenUpdate"
              onChangeFunction={updateCanvasOnListChange}
              theCurrentValue={form?.shape_id}
              theFieldName="shape_name"
              the2FieldName="description"
            />
          </div>

          <div className="col-6 center ">
            <SelectList
              theList={soilRequirementList}
              theListName="soil_requirement_id"
              theParentForm="GardenUpdate"
              onChangeFunction={updateFormOnListChange}
              theCurrentValue={form?.soil_requirement_id}
              theFieldName="soil_name"
              the2FieldName="description"
            />
          </div>
        </div>
        <div className="row pt-4 center ">
          <div className="col-6 center ">
            <SelectList
              theList={waterRequirementList}
              theListName="water_requirement_id"
              theParentForm="GardenUpdate"
              onChangeFunction={updateFormOnListChange}
              theCurrentValue={form?.water_requirement_id}
              theFieldName="water_name"
              the2FieldName="description"
            />
          </div>

          <div className="col-6 center ">
            <SelectList
              theList={sunRequirementList}
              theListName="sun_requirement_id"
              theParentForm="GardenUpdate"
              onChangeFunction={updateFormOnListChange}
              theCurrentValue={form?.sun_requirement_id}
              theFieldName="sun_name"
              the2FieldName="description"
            />
          </div>
        </div>

        <div className="row pt-4 center ">
          <div className="col-10  center ">
            <button type="submit" className="btn btn-success p-2  m-3">
              Save Garden
            </button>
          </div>
        </div>

        {successM && (
          <div className="row pt-4 ">
            <div className="col-12 center">
              <p className="text-warning">{successM}</p>
            </div>
          </div>
        )}

        {errM && (
          <div className="row pt-4 ">
            <div className="col-12 center">
              <p className="text-danger">{errM}</p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
