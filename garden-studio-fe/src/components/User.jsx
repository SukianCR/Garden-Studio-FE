import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function User() {
  // setup the return button
  const navigate = useNavigate();
  const [form, setForm] = useState(user);
  const [errM, setErrM] = useState(null);
  const [successM, setSuccessM] = useState(null);
  const zoneList = useSelector((state) => {
    return state.plantsP.zones;
  });

  //  What to do when the submit button is clicked
  const submit = async (e) => {
    e.preventDefault();
    alert("suxess");
    navigate("/garden");
  };

  const updateForm = (e) => {
    //  console.log(`updateForm: ${e.target.name}: ${e.target.value}`);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateFormOnListChange = (e) => {
    // console.log(`updateFormOnListChange: ${e.target.name}: ${e.target.value}`);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //  console.log(updateFormOnListChange);
    //  console.log(form);
  };

  return (
    <div className="row  center pt-5 ">
      <div className=" col-6 card bg-dark border-secondary mt-5 p-0 pb-5">
        <div className=" card-header  center p-3 ">
          <h4>User Details</h4>
        </div>
        <form onSubmit={submit} name="formUserUpdate">
          <div className="row pt-5 center">
            <div className="col-10 center">
              <input
                type="email"
                className="form-control text_input"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={updateForm}
                value={form.email}
                disabled
                required
              />
            </div>{" "}
          </div>

          <div className="row center pt-4">
            <div className="col-10 center">
              <input
                type="text"
                className="form-control text_input"
                name="firstname"
                placeholder="First Name"
                onChange={updateForm}
                value={form.firstname}
                required
              />
            </div>
          </div>

          <div className="row center pt-4">
            <div className="col-10 center">
              <input
                type="phone"
                className="form-control text_input"
                name="phone_number"
                placeholder="(XXX) 867-5209"
                onChange={updateForm}
                value={form.phone_number}
                required
              />
            </div>
          </div>

          <div className="row center pt-4">
            <div className="col-10 center">
              <input
                type="text"
                className="form-control text_input"
                name="lastname"
                placeholder="Last Name"
                value={form.lastname}
                onChange={updateForm}
                required
              />
            </div>
          </div>

          <div className="row center pt-4">
            <div className="col-10 center">
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

          <div className="row center  pt-5 ">
            <div className="col-10 center pb-2">
              <button type="submit" className="btn btn-success form-control  ">
                Submit
              </button>
              <button type="button" className="btn btn-success mt-3">
                Return
              </button>
            </div>
          </div>
        </form>

        {successM && (
          <div className="row pt-5 ">
            <div className="col-12 center">
              <p className="text-warning">{successM}</p>
            </div>
          </div>
        )}

        {errM && (
          <div className="row pt-5 ">
            <div className="col-12 center">
              <p className="text-warning">{errM}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
