
import { useSelector, useDispatch } from "react-redux";

export default function Home() {

  const ma = useSelector((state) => state.mainArrays);
  

  

  return (
    <>
      <h3 className="mt-4">Garden Studio</h3>
      <p className="text-warning"> 🌵 Design your own Garden 🌿</p>
      <section className="mt-2 center  ">
        <div className=" mt-4 home-container  pt-2 pb-2 ">
          {ma?.referencePlants?.map((plant) => {
            const picSrc = "./src/assets/pictures/" + plant.pic + ".png";
            return (
              <div key={plant.id} className="center ">
                <div className="  h-plant-card  m-5 p-4 shadow  ">
                  <div className="center   hoverable-button ">
                    {" "}
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
    </>
  );
}
