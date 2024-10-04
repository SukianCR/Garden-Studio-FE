import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Buy() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usr = useSelector((state) => state.usr);
  const grdn = useSelector((state) => state.grdn);
  const cv = useSelector((state) => state.currentView);
  const ma = useSelector((state) => state.mainArrays);
  const plantsInGarden = ma?.plantsInGarden;
  const shap = cv.cvShape;
  const today = new Date();

  function GetShape() {
    switch (shap) {
      case 1:
        return <>&#9632; </>;
      case 2:
        return <> &#11044; </>;
      case 3:
        return <>&#11201; </>;
      case 4:
        return <>&#10084; </>;

      default:
        return <></>;
    }
  }
  // const sum = plantsInGarden.reduce(
  //   (accumulator, plant) => accumulator + plant.price,
  //   0
  // );

  // Sum the prices of all items
  const sum = plantsInGarden.reduce(
    (sum, item) => sum + parseInt(item.price, 10),
    0
  );

  return (
    <div className="row  center pt-5   ">
      <div className=" col-7 buy_paper ">
        <ul className="list-group bg-transparent p-3 ">
          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-1">
            {today.toDateString()}
          </li>

          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-1">
            <span className="text-info pr-1">{usr.email}</span>
          </li>

          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-1">
            {usr.fname + " " + usr.lname}
          </li>

          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-1">
            <span className="text-success pr-1">Garden: </span>{" "}
            <span className="pr-1">{grdn.name}</span>
            <GetShape />
          </li>
          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-1 text-warning pt-4">
            Plants in Garden
          </li>
          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-1 ">
            <table className="table table-hover  ">
              {plantsInGarden?.map((plant) => {
               
                const path = `./images/${plant.pic}.png`;
                
                return (
                  <tr
                    className="table-active  border-bottom border-dark-subtle"
                    key={plant.id}
                  >
                    <td scope="row" className="bg-transparent">
                      1
                    </td>
                    <td scope="row" className="bg-transparent">
                      {plant.name}
                    </td>
                    <td className="bg-transparent">
                      <img src={path} className="plantInBuy bg-transparent" />
                    </td>
                    <td className="bg-transparent">${plant.price}</td>
                  </tr>
                );
              })}
            </table>
          </li>

          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-0 total ">
            <span className="text-danger ">Total:</span>{" "}
            <span className="pr-035 text-warning">${sum}</span>
          </li>
          <li className="list-group-item list-group-item-primary d-flex  bg-transparent border-0 p-0 pt-3 ">
            <button
              type="submit"
              className="btn btn-success border border-success-subtle btn-sm  p-2"
            >
              Checkout
            </button>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
