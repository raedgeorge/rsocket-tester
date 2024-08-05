import { useState } from "react";
import Login from "./components/Login";
import RequestData from "./components/RequestData";
import ResponseData from "./components/ResponseData";
import ServiceRoutes from "./components/ServiceRoutes";

function App() {
  // const [result, setResult] = useState();
  const [result, setResult] = useState<{ [key: string]: any }[]>([]);

  const responseResultHandler = (data: any) => {
    setResult(data);
  };

  return (
    <div className="p-4 container-fluid">
      <Login />
      <ServiceRoutes />
      <div className="row">
        <div className="col-xl-6">
          <RequestData onResponseResult={responseResultHandler} />
        </div>
        <div className="col-xl-6">
          <ResponseData resultData={result} />
        </div>
      </div>
    </div>
  );
}

export default App;
