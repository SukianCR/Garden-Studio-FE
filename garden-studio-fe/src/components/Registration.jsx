import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../components_db/registrationSlice";
import { useLoginMutation } from "../components_db/userSlice";

import Loading_Bar from "./Loading_Bar";
import LoadReference from "./reference";
import SelectList from "./SelectList";
import { useCreateGardenMutation } from "../components_db/gardenSlice";

export default function Registration() {
  // load the reference data
  // console.log("run reference from Registration");
  LoadReference() ? LoadReference() : console.log("");
  // LoadReference() ? LoadReference() : console.log("Still loading Reference");
  //  test this call

  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);

  const [registerUser] = useRegistrationMutation();
  const [createGarden] = useCreateGardenMutation();
  const [loginUser] = useLoginMutation();

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

  const createDefaultGarden = ({ id, zone_id }) => {
    return {
      description: "default garden",
      user_id: id,
      zone_id: zone_id,
      shape_id: shapeList[0].id,
      water_requirement_id: waterRequirementList[0].id,
      sun_requirement_id: sunRequirementList[0].id,
      soil_requirement_id: soilRequirementList[0].id,
    };
  };

  const submit = async (e) => {
    e.preventDefault();
    // console.log("submit");

    try {
      let success;
      let loginSuccess;
      let gardenSuccess;

      // TO DO - correctly handle user_role_id
      form.user_role_id = "8b8329b7-943a-4f12-9803-dcba09ec1ede";

      success = await registerUser(form).unwrap();
      //  console.log("registration success REGISTERUSER: ", success);
      if (success?.token) {
        loginSuccess = await loginUser(form).unwrap();
        //      console.log("registration loginSuccess LOGINUSER:", loginSuccess);

        // TODO Handle failed registration better
        // TODO Handle failed login better
        // TODO Handle failed create garden better
        // test if we got the token back from registration

        // NOTE- May figured out the timing problem here - Set the token because we have a timing issue
        //window.sessionStorage.setItem("Token", loginSuccess.token);
        const specifications = createDefaultGarden(loginSuccess.user);

        gardenSuccess = await createGarden({ specifications }).unwrap();

        //   console.log("registration gardenSuccess CREATEGARDEN:", gardenSuccess);

        if (loginSuccess?.token) {
          navigate("/garden");
        } else {
          setErrM(
            "There is a problem with your registration, please try again."
          );
        }
      } else {
        setErrM(
          "There is a problem with your registration, please try again. If you already registered with this email, please login."
        );
      }
    } catch (err) {
      setErrM(
        "There is a problem with your registration, please try again. If you already registered with this email, please login."
      );
    }
  };

  const updateForm = (e) => {
    // console.log("updateForm");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateFormOnListChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="row  center pt-5   ">
      <div className=" col-6 card  border-secondary mt-5 p-0 pb-5 ">
        <div className="card-header center p-3 mb-3  ">
          <h4 className="center">Registration</h4>
        </div>
        <form onSubmit={submit} name="formRegister">
          <div className="row pt-5 center ">
            <div className="col-5 center ">
              <input
                type="email"
                className="form-control form-control-login "
                name="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={updateForm}
                required
              />
            </div>

            <div className="col-5 center ">
              <input
                type="password"
                className="form-control form-control-login "
                name="password"
                placeholder="Password"
                onChange={updateForm}
                required
              />
            </div>
          </div>

          <div className="row pt-4 center">
            <div className="col-5 center">
              <input
                type="text"
                className="form-control form-control-login "
                name="firstname"
                placeholder="First Name"
                onChange={updateForm}
                required
              />
            </div>

            <div className="col-5 center ">
              <input
                type="text"
                className="form-control form-control-login "
                name="lastname"
                placeholder="Last Name"
                onChange={updateForm}
                required
              />
            </div>
          </div>

          <div className="row pt-4 center">
            <div className="col-5 center">
              <input
                type="phone"
                className="form-control "
                name="phone_number"
                placeholder="(XXX) 867-5209"
                onChange={updateForm}
                required
              />
            </div>

            <div className="col-5 center reg ">
              <SelectList
                theList={zoneList}
                theListName="zone_id"
                theParentForm="Registration"
                onChangeFunction={updateFormOnListChange}
                theFieldName="zone_name"
                the2FieldName="temp_range"
              />
            </div>
          </div>

          <div className="row center  pt-5">
            <div className="col-10 center ">
              <button type="submit" className="btn btn-success form-control  ">
                Submit
              </button>
            </div>
          </div>
        </form>
        {errM && (
          <div className="row pt-5 ">
            <div className="col-12 center">
              <p className="text-warning">{errM}</p>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
}
