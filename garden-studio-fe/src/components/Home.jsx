import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const cv = useSelector((state) => state.currentView);
  const ma = useSelector((state) => state.mainArrays);
  const usr = useSelector((state) => state.usr);


  console.log("cv" + cv);
  console.log("ma" + ma);
  console.log("usr" + usr);
  

  return (
    <>
      <h3 className="mt-4">Garden Studio</h3>
      <section className="mt-2 center  ">
        <div className=" mt-4 home-container  pt-2 pb-2 ">
          {ma?.referencePlants?.map((plant) => {
            const picSrc = "./src/assets/pictures/" + plant.pic + ".png";
            return (
              <div key={plant.id} className="center">
                <div className="  h-plant-card  m-5 p-4 shadow ">
                  <div className="center hoverable-button ">
                    {" "}
                    <img src={picSrc} />
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
    </>
  );
}
