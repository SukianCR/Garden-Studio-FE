import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../components_db/userSlice";
import Loading_Bar from "./Loading_Bar";

import { useEffect, useState } from "react";
import LoadReference from "./reference";

export default function Login() {
  LoadReference() ? LoadReference() : console.log("loading reference in Login");
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);
  const [loginUser] = useLoginMutation();

  const submit = async (e) => {
    e.preventDefault();
    try {
      let success = false;
      success = await loginUser(form).unwrap();

      console.log("Login() SUCCESS: ", success);

      if (!success?.token) {
        return Loading_Bar("50");
      }

      if (success?.token) {
        window.sessionStorage.setItem("Token", success.token);

        navigate("/garden");
      } else {
        setErrM(
          "Invalid Username or Password, Please check your input and try again."
        );
      }
    } catch (err) {
      setErrM(
        "Invalid Username or Password, Please check your input and try again."
      );
    }
  };

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="row  center pt-5 ">
      <div className=" col-5 card  border-secondary mt-5 p-0 pb-5">
        <div className=" card-header  center p-3 ">
          <h4>Login</h4>
        </div>
        <form onSubmit={submit} name="formLogin">
          <div className="row pt-5 center">
            <div className="col-10 center">
              <input
                type="email"
                className="form-control input"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={updateForm}
                required
              />
            </div>{" "}
          </div>

          <div className="row center pt-4">
            <div className="col-10 center">
              <input
                type="password"
                className="form-control  input"
                name="password"
                placeholder="Password"
                onChange={updateForm}
                required
              />
            </div>
          </div>

          <div className="row center pt-5">
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
      </div>
    </div>
  );
}
