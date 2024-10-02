import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);
  const usr = useSelector((state) => {
    return state.usr;
  });

  // console.log(
  //   usr.email +
  //     usr.password +
  //     usr.fname +
  //     usr.lname +
  //     usr.phone +
  //     usr.zone +
  //     usr.token
  // );

  const submit = async (e) => {
    e.preventDefault();

    if (form.email == usr.email && form.password == usr.password) {
      navigate("/garden");
    } else {
      setErrM("Wrong email & password combination.");
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
