import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setEmail,
  setPassword,
  setFname,
  setLname,
  setPhone,
  setZone,
  setToken,
} from "../components_db/usrSlice.js";

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);
  const dispatch = useDispatch();

  const zoneList = useSelector((state) => {
    return state.plantsP.zones;
  });

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

  const submit = async (e) => {
    e.preventDefault();
    dispatch(setEmail(form.email));
    dispatch(setPassword(form.password));
    dispatch(setFname(form.fname));
    dispatch(setLname(form.lname));
    dispatch(setPhone(form.pnumber));
    dispatch(setZone(form.zone));
    dispatch(setToken(true));

    navigate("/garden");
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
                name="fname"
                placeholder="First Name"
                onChange={updateForm}
                required
              />
            </div>

            <div className="col-5 center ">
              <input
                type="text"
                className="form-control form-control-login "
                name="lname"
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
                name="pnumber"
                placeholder="(XXX) 867-5209"
                onChange={updateForm}
                required
              />
            </div>

            <div className="col-5 center reg ">
              <select
                onChange={updateFormOnListChange}
                className="form-control text-info"
                name="zone"
              >
                <option value={0}>&#x1F321; Zone &deg;F </option>
                {zoneList?.map((zone) => {
                  return (
                    <option key={zone.id} value={zone.id}>
                      &#x1F321; {zone.name} &deg;F{" "}
                    </option>
                  );
                })}
              </select>
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
