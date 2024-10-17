import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

import uno from "../../images/1.png";
import itResume from "../../images/resume.pdf";
import { setPaths, setGPlants } from "../components_db/grdnSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const plantsP = useSelector((state) => state.plantsP);
  const [pictures, setPictures] = useState([]);

  const grdn = useSelector((state) => state.grdn);
  const paths = grdn.paths;
  const ma = useSelector((state) => state.mainArrays);
  let i = 0;
  const dispatch = useDispatch();

  useEffect(() => {
    const picNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const paths_temp = [];

    // console.log("paths_temp " + paths_temp);
    // console.log("paths_temp above fetch " + Object.isSealed(paths_temp));

    const fetchImage = async (pic) => {
      try {
        const response = await import(`../../images/${pic}.png`);
        // console.log("paths_temp inside fetch " + Object.isSealed(paths_temp));
        const newPath = response.default;
        paths_temp[i] = newPath;
        // paths_temp.push(newPath);
        console.log(i + newPath);
        setPictures(paths_temp);
        i = i + 1;

        // try creating a function to update the arrays outside from use useEffect

        // console.log(response.default);
        // console.log(paths_temp.length);
        // console.log(paths_temp[pic - 1]);
      } catch (err) {
        console.log(err);
      }
    };

    picNums.forEach((pic) => fetchImage(pic));
  }, []);

  // pictures.forEach((pic) => console.log("pic " + pic));
  // console.log("pictures length " + pictures?.length);
  dispatch(setPaths(pictures));

  //console.log("paths length " + paths?.length);

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
    // const path = pictures[`${plant.pic}`];
    const index = plant.pic - 1;

    // const path = paths[index];
    const path = paths[index];

    return (
      <tr className="table-active ">
        <td scope="row">{plant.plant_name}</td>

        <td>
          <img src={path} />
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
  function LinkDin() {
    // navigate("https://www.linkedin.com/in/susana-fernandez-suki/");
    window.location.href = "https://www.linkedin.com/in/susana-fernandez-suki/";
  }
  function Resume() {
    navigate(itResume);
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
      <div className="center">
        <div className=" intro p-3 w80 rounded-1">
          <div className=" w70 p-3 ">
            {" "}
            <small className="text-light font-italic font-weight-light ">
              Hello . I'm Susana (Suki), a FullStack PERN developer. I just
              graduated from FullStack Academy Web Development Bootcamp
              (8/2024). I'm also a legal immigrant in USA from Costa Rica. Based
              in Las Vegas, NV, but willing to relocate for a good opportunity .
              This is my demo for front end. If you can't see the 10 plants
              pictures in this landing page, then just reload the page. That's
              the last bug I'm working on . Once you all the plants images, you
              can then register and design your own garden. Drag and drop plants
              to your garden. Move them around . Change the garden's shape. Save
              and or buy your garden (and all it's plants). Two lists of plants
              are being updated in real time, every time a plant gets dropped or
              moved . The "Original Plants" list, that you can also filter by 4
              parameters and "Plants in Garden" . This is fully front end, made
              with react , bootswatch, react-redux, reduxjs, dnd-kit . Enjoy! .
              As soon as I finish fixing the last small bug I'll go ahead and
              finish the backend and Authentication with Postgress, Prisma,
              Express, JsonWebToken, which I also know how to do. Thank You.
            </small>
          </div>

          <div className=" w30 p-3">
            <small className="text-secondary text-center ">
              Susana Fernandez . Las Vegas, NV based (open to relocate).{" "}
              <button type="button" class="btn btn-outline-success btn-sm m-2">
                sukimixcr@gmail.com
              </button>
              Looking for work as Fullstack, FrontEnd or BackEnd Web Developer.
              Interested in UI design, DevOps, AI and machine learning. I'm also
              a mixologyst enthusiast and
              <button
                type="button"
                className="btn btn-outline-success pt1  btn-sm m-2 "
                onClick={() => Resume()}
              >
                this is my IT Resume
              </button>
              and{" "}
              <button
                type="button"
                className="btn btn-outline-success pt1 btn-sm m-2  "
                onClick={() => LinkDin()}
              >
                LinkDin
              </button>
              {/* <button
                href="https://www.linkedin.com/in/susana-fernandez-suki/"
                target="_blank'"
                className="stretched-link p-2"
              >
                LinkDin
              </button> */}
              Thank you.
            </small>
          </div>
        </div>
      </div>

      <h3 className="mt-5">Garden Studio</h3>
      <p className="text-warning"> 🌵 Design your own Garden 🌿</p>
      {/* {<img src={uno} /> }   */}

      <section className="mt-2 center  ">
        <div className=" mt-4 home-container  pt-2 pb-2 ">
          {ma?.referencePlants?.map((plant) => {
            // const picSrc = "src/assets/pictures/" + plant.pic + ".png";
            // const path = pictures[`${plant.pic}`];
            const index = plant.pic - 1;

            const path = paths[index];

            return (
              <div key={plant.id} className="center ">
                <div className="  h-plant-card  m-5 p-4 shadow  ">
                  <div className="center   hoverable-button ">
                    <img src={path} className="pb-2" />
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
