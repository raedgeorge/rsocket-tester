import { ChangeEvent, useEffect, useState } from "react";
import { useSocket } from "../assets/http/rsocket";

interface Props {
  onResponseResult: (result: any) => void;
}

const RequestData = ({ onResponseResult }: Props) => {
  const [requestedRoute, setRequestedRoute] = useState<string>("");
  const [data, setData] = useState<{ name: string; value: string | [] }[]>([]);
  const [requestPayload, setRequestPayload] = useState<{
    [key: string]: string | [];
  }>();

  const response = useSocket<any, any>(
    requestedRoute,
    "dataStream",
    Boolean(requestPayload),
    requestPayload
  );

  useEffect(() => {
    if (response.length > 0) {
      onResponseResult(response);
    }
  }, [response]);

  const resetFieldsHandler = () => setData([]);

  const fieldRemoveHandler = (fieldName: string) => {
    const newList = data.filter((d) => d.name !== fieldName);
    setData(newList);
  };

  const fileReadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (event) => {
        if (event.target?.result) {
          try {
            const jsonData = JSON.parse(event.target.result as string);

            const payloadData: [{ name: string; value: string }] = [
              { name: "", value: "" },
            ];

            payloadData.pop();

            for (const key in jsonData) {
              payloadData.push({ name: key, value: jsonData[key] });
            }

            setData(payloadData);
          } catch (error) {
            console.log("Error reading file. " + error);
          }
        }
      };

      reader.onerror = (error) => console.log("Error reading file. " + error);
    }
  };

  const submitDataFromFile = () => {
    const fields = data.map((d) => d.name);

    const values = data.map((d) => d.value);

    const payload = fields.map((f, index) => {
      return `${f}:` + values[index];
    });

    const payloadObject = payload.reduce((acc, curr) => {
      const [key, value] = curr.split(":");
      acc[key] = value ? value : [];
      return acc;
    }, {} as { [key: string]: string | [] });

    console.log(payloadObject);
    setRequestPayload(payloadObject);

    const route = localStorage.getItem("route");
    setRequestedRoute(route!);
  };

  return (
    <div className="card shadow bg-light p-4">
      <div className="d-flex flex-row justify-content-between">
        <h4 className="text-dark roboto-regular">Payload Data</h4>
      </div>
      <hr />
      <h5 className="roboto-regular">Read Payload From File</h5>
      <div className="d-flex flex-row justify-content-between align-items-baseline">
        <input
          type="file"
          accept=".json"
          onChange={fileReadHandler}
          className="form-control mb-3 roboto-bold-italic w-50"
        />
      </div>
      <hr />
      {data.length > 0 && (
        <div>
          {data?.map((d) => (
            <div className="row" key={d.name}>
              <span className="col-xl-4">
                Field: <span className="text-primary">{d.name}</span>{" "}
              </span>
              <span className="col-xl-7">
                Value: <span className="text-primary">{d.value}</span>{" "}
              </span>
              <button
                type="button"
                className="btn btn-link text-decoration-none text-danger col-xl-1"
                onClick={fieldRemoveHandler.bind(this, d.name)}
              >
                X
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-primary w-25 fs-5 roboto-regular"
          onClick={submitDataFromFile}
        >
          Submit Request
        </button>
        <button
          type="button"
          disabled={data.length === 0}
          className="btn btn-danger w-25 fs-5 roboto-regular"
          onClick={resetFieldsHandler}
        >
          Reset All Fields
        </button>
      </div>
    </div>
  );
};

export default RequestData;
