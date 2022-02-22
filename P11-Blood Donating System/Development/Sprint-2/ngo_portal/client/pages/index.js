import { useContext } from "react";
import { NGOContext } from "../context";
import { Carousel } from "antd";

const Home = () => {
  const [state, setState] = useContext(NGOContext);
  const contentStyle1 = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const contentStyle2 = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#573679",
  };
  const contentStyle3 = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#660650",
  };

  return (
    <div className="d-flex flex-column">
      <div>
        <h3 className="text-center pt-4 pb-2">
          NGO Portal for Blood Donation System
        </h3>
        <hr className="mb-4" />
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle1}>Labore culpa nulla eu proident.</h3>
          </div>
          <div>
            <h3 style={contentStyle2}>
              Aliquip aliquip eiusmod sit ea id dolore esse est sit
              reprehenderit minim.
            </h3>
          </div>
          <div>
            <h3 style={contentStyle3}>
              Fugiat voluptate dolore quis mollit adipisicing laborum velit
              aliquip dolore incididunt esse excepteur.
            </h3>
          </div>
        </Carousel>
      </div>
      <hr className="my-2" />
      <ul className="p-3 m-1 text-center">
        <h4>Ex nisi ex elit incididunt duis mollit.</h4>
        <li>
          <h6 className="p-2">Commodo consectetur velit nisi minim adipisicing nisi.</h6>
        </li>
        <li>
          <h6 className="p-2">Occaecat culpa quis dolore ad.</h6>
        </li>
        <li>
          <h6 className="p-2">
            Exercitation proident aute esse labore ex dolor enim et commodo
            reprehenderit.
          </h6>
        </li>
        <li>
          <h6 className="p-2">
            Et fugiat in aliqua dolore nostrud officia officia esse.
          </h6>
        </li>
      </ul>
    </div>
  );
};

export default Home;
