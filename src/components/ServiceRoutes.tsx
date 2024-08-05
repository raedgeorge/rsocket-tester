import { useRef, useState } from "react";

const servicesList = ["client", "store", "company", "inventory"];

const ServiceRoutes = () => {
  const urlRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [requestUrl, setRequestUrl] = useState<string>("");

  const routeHandler = () => {
    const url = urlRef.current?.value;
    const service = serviceRef.current?.value;

    if (url && service) {
      setRequestUrl("wss://gatewayprod.thymeapp.site/" + url);
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

      <div className="d-flex flex-row gap-5 align-items-end">
        <div className="form-group w-25">
          <label
            htmlFor="route"
            className="form-label text-dark fs-5 roboto-regular"
          >
            Service Route
          </label>
          <input
            type="text"
            ref={urlRef}
            className="form-control roboto-medium"
            placeholder="Service Route"
          />
        </div>
        <div className="form-group w-25">
          <label
            htmlFor="service"
            className="text-dark form-label fs-5  roboto-regular"
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
