import { ChangeEvent, useContext, useRef, useState } from "react";
import { ApplicationContext } from "../context/app-context";

const servicesList = [
  "client",
  "seller",
  "store",
  "company",
  "station",
  "inventory",
  "devices",
  "employees",
  "invoice",
  "settings",
];

type errorTypes = "BaseUrl" | "Route" | "";

const ServiceRoutes = () => {
  const [errorType, setErrorType] = useState<errorTypes>("");

  const urlRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [requestUrl, setRequestUrl] = useState<string>("");
  const [completeUrl, setCompleteUrl] = useState<string>("");
  const { addRouteToHistory } = useContext(ApplicationContext);

  const baseUrlSetHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    if (enteredValue) {
      setBaseUrl(enteredValue);
      setCompleteUrl(enteredValue);
    } else {
      setBaseUrl("");
      setCompleteUrl("");
    }
  };

  const routeHandler = () => {
    const url = urlRef.current?.value;
    const service = serviceRef.current?.value;

    setErrorType("");

    console.log("check 1");

    if (!baseUrl) {
      console.log("check 2");
      setErrorType("BaseUrl");
    } else {
      setErrorType("");
    }

    if (!url) {
      console.log("check 3");
      setErrorType("Route");
    } else {
      setErrorType("");
    }

    console.log("check 4");

    if (url && service) {
      setRequestUrl("wss://gatewayprod.thymeapp.site/" + url);
      addRouteToHistory(url);
      setCompleteUrl(baseUrl + "/" + url);
      localStorage.setItem("route", url);
      localStorage.setItem("service", service);
    }
  };

  return (
    <div className="card shadow bg-light border-1 mb-4 p-4">
      {requestUrl && (
        <p className="bg-light text-primary p-1 fs-5 rounded roboto-regular">
          {requestUrl}
        </p>
      )}

      <div className="row mb-4">
        <div className="col-xl-4">
          <label className="form-label text-dark fs-6 roboto-regular">
            Base Url
          </label>
          <input
            type="text"
            onChange={baseUrlSetHandler}
            className={`${
              errorType == "BaseUrl" ? "border-danger" : ""
            } form-control roboto-medium shadow-none`}
          />
        </div>
        <div className="col-xl-8">
          <label
            htmlFor="complete-url"
            className="form-label text-dark fs-6 roboto-regular"
          >
            Complete Url
          </label>
          <input
            disabled
            type="text"
            id="complete-url"
            value={completeUrl}
            className="form-control w-100"
          />
        </div>
      </div>
      <div className="d-flex flex-row gap-5 align-items-end">
        <div className="form-group w-25">
          <label
            htmlFor="route"
            className="form-label text-dark fs-6 roboto-regular"
          >
            Service Route
          </label>
          <input
            type="text"
            ref={urlRef}
            placeholder="Service Route"
            className={`${
              errorType == "BaseUrl" ? "border-danger" : ""
            } form-control roboto-medium shadow-none`}
          />
        </div>
        <div className="form-group w-25">
          <label
            htmlFor="service"
            className="text-dark form-label fs-6 roboto-regular"
          >
            Select Service
          </label>
          <select
            name="services"
            id="service"
            className="form-select roboto-medium"
            ref={serviceRef}
          >
            <option value="">-- Select Service --</option>
            {servicesList.map((service, index) => (
              <option key={index} value={service}>
                {service.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={routeHandler}
          className="btn btn-primary w-25 fs-5 roboto-bold"
        >
          Save Route Parameters
        </button>
      </div>
    </div>
  );
};

export default ServiceRoutes;
