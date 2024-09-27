import { useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import RequestData from "./components/RequestData";
import ResponseData from "./components/ResponseData";
import ServiceRoutes from "./components/ServiceRoutes";
import Footer from "./components/Footer";
import { ApplicationContext } from "./context/app-context";

function App() {
  const [result, setResult] = useState<{ [key: string]: any }[]>([]);
  const { routesHistory } = useContext(ApplicationContext);

  useEffect(() => {
    if (routesHistory) {
      console.log(routesHistory);
    }
  }, [routesHistory]);

  const responseResultHandler = (data: any) => {
    setResult(data);
  };

  return (
    <>
      <div className="p-4 container-fluid">
        <Login />
        <ServiceRoutes />
        <div className="row">
          <div className="col-xl-7">
            <RequestData onResponseResult={responseResultHandler} />
          </div>
          <div className="col-xl-5">
            <ResponseData resultData={result} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
