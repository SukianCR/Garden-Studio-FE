import { useSelector, useDispatch } from "react-redux";
import uno from "../../images/1.png";
import dos from "../../images/2.png";
import tres from "../../images/3.png";
import cuatro from "../../images/4.png";
import cinco from "../../images/5.png";
import seis from "../../images/6.png";
import siete from "../../images/7.png";
import ocho from "../../images/8.png";
import nueve from "../../images/9.png";
import diez from "../../images/10.png";

export default function Home() {
  const ma = useSelector((state) => state.mainArrays);
  const plantsP = useSelector((state) => state.plantsP);

  function GetImg({ pic }) {
    switch (pic) {
      case 1:
        return (
          <>
            {" "}
            <img src={uno} />
          </>
        );
      case 2:
        return (
          <>
            {" "}
            <img src={dos} />
          </>
        );

      case 3:
        return (
          <>
            {" "}
            <img src={tres} />
          </>
        );
      case 4:
        return (
          <>
            {" "}
            <img src={cuatro} />
          </>
        );
      case 5:
        return (
          <>
            {" "}
            <img src={cinco} />
          </>
        );
      case 6:
        return (
          <>
            {" "}
            <img src={seis} />
          </>
        );
      case 7:
        return (
          <>
            {" "}
            <img src={siete} />
          </>
        );
      case 8:
        return (
          <>
            {" "}
            <img src={ocho} />
          </>
        );
      case 9:
        return (
          <>
            {" "}
            <img src={nueve} />
          </>
        );
      case 10:
        return (
          <>
            {" "}
            <img src={diez} />
          </>
        );
      default:
        return <></>;
    }
  }

  function GetPName({ name, id }) {
    switch (name) {
      case "zone":
        return <> {plantsP.zones.filter((zn) => zn.id == id)[0]?.name} </>;

      case "water":
        return <> {plantsP.waters.filter((zn) => zn.id == id)[0]?.name} </>;

      case "sun":
        return <> {plantsP.suns.filter((zn) => zn.id == id)[0]?.name} </>;
      case "soil":
        return <> {plantsP.soils.filter((zn) => zn.id == id)[0]?.name} </>;

      default:
        return <></>;
    }
  }

  function GetPlantRow({ plant }) {
    return (
      <tr className="table-active ">
        <td scope="row">{plant.plant_name}</td>

        <td>
          <GetImg pic={plant.pic} />
        </td>

        <td>
          <GetPName key={plant.zone} name="zone" id={plant.zone} />
        </td>
        <td>
          <GetPName key={plant.water} name="water" id={plant.water} />
        </td>
        <td>
          <GetPName key={plant.sun} name="sun" id={plant.sun} />
        </td>
        <td>
          <GetPName key={plant.soil} name="soil" id={plant.soil} />
        </td>
      </tr>
    );
  }

  function Load_Plants_Table() {
    return (
      <div className=" center">
        <div className="accordion w80 " id="accordionExample">
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header " id="headingOne">
              <button
                className="accordion-button bg-dark border border-success text-warning"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                All Plants Info
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse "
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body  p-0  ">
                <table className="table table-hover ">
                  <thead>
                    <tr className="table-active">
                      <th scope="col" className="p-3 text-info">
                        Name
                      </th>
                      <th scope="col " className="p-3 text-info">
                        Pic
                      </th>
                      <th scope="col" className="p-3 text-info">
                        {" "}
                        &#x1F321; Zone
                      </th>
                      <th scope="col" className="p-3 text-info">
                        {" "}
                        &#x1F4A7; Water
                      </th>
                      <th scope="col" className="p-3 text-info">
                        &#9728; Sun
                      </th>
                      <th scope="col" className="p-3 text-info">
                        &#9968; Soil
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ma?.referencePlants?.map((plant) => {
                      return <GetPlantRow key={plant.id} plant={plant} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <h3 className="mt-5">Garden Studio</h3>
      <p className="text-warning"> 🌵 Design your own Garden 🌿</p>
      <img src={uno} />
      <section className="mt-2 center  ">
        <div className=" mt-4 home-container  pt-2 pb-2 ">
          {ma?.referencePlants?.map((plant) => {
            // const picSrc = "src/assets/pictures/" + plant.pic + ".png";
            const picSrc = `../../images/${plant.pic}.png`;

            return (
              <div key={plant.id} className="center ">
                <div className="  h-plant-card  m-5 p-4 shadow  ">
                  <div className="center   hoverable-button ">
                    <img src={picSrc} className="pb-2" />
                  </div>
                  <p className=" display-on-hover glow p-0">
                    {plant.plant_name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Load_Plants_Table />
    </>
  );
}
