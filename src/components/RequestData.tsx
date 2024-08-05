import { useEffect, useRef, useState } from "react";
import { useSocket } from "../assets/http/rsocket";

interface Props {
  onResponseResult: (result: any) => void;
}

const RequestData = ({ onResponseResult }: Props) => {
  const fieldNameRef = useRef<HTMLInputElement>(null);
  const fieldValueRef = useRef<HTMLInputElement>(null);
  const stringArrayRef = useRef<HTMLInputElement>(null);
  const numberArrayRef = useRef<HTMLInputElement>(null);
  const [isNumberArrayDisabled, setIsNumberArrayDisabled] =
    useState<boolean>(false);
  const [isStringArrayDisabled, setIsStringArrayDisabled] =
    useState<boolean>(false);
  const [isValueFieldDisabled, setIsValueFieldDisabled] =
    useState<boolean>(false);
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

  const saveFieldData = () => {
    const fieldName = fieldNameRef.current?.value;
    const fieldValue = fieldValueRef.current?.value;

    if (
      fieldName &&
      (numberArrayRef.current?.checked || stringArrayRef.current?.checked)
    ) {
      setData((prevData) => {
        return [...prevData, { name: fieldName, value: [] }];
      });

      fieldNameRef.current.value = "";
      setIsValueFieldDisabled(false);
      setIsNumberArrayDisabled(false);
      setIsStringArrayDisabled(false);
      numberArrayRef!.current!.checked = false;
      stringArrayRef!.current!.checked = false;

      return;
    }

    if (fieldName && fieldValue) {
      setData((prevData) => {
        return [...prevData, { name: fieldName, value: fieldValue }];
      });

      fieldNameRef.current.value = "";
      fieldValueRef.current.value = "";
    }
  };

  const requestSubmitHandler = () => {
    if (data.length > 0) {
      const fields = data.map((d) => d.name);

      const values = data.map((d) => d.value);

      const payload = fields.map((f, index) => {
        return `${f}:` + values[index];
      });

      console.log(data);
      console.log(payload);

      const payloadObject = payload.reduce((acc, curr) => {
        const [key, value] = curr.split(":");
        acc[key] = value ? value : [];
        return acc;
      }, {} as { [key: string]: string | [] });

      console.log(payloadObject);
      setRequestPayload(payloadObject);
    }

    const route = localStorage.getItem("route");
    setRequestedRoute(route!);
  };

  const resetFieldsHandler = () => setData([]);

  const checkboxHandler = (identifier: string) => {
    if (identifier === "number" && numberArrayRef.current?.checked) {
      setIsStringArrayDisabled(true);
      setIsValueFieldDisabled(true);
      return;
    }

    if (identifier === "string" && stringArrayRef.current?.checked) {
      setIsNumberArrayDisabled(true);
      setIsValueFieldDisabled(true);
      return;
    }

    setIsStringArrayDisabled(false);
    setIsNumberArrayDisabled(false);
    setIsValueFieldDisabled(false);
  };

  return (
    <div className="card shadow bg-light p-4">
      <div className="d-flex flex-row justify-content-between">
        <h4 className="text-dark">Payload Data</h4>
        <button
          type="button"
          className="btn btn-success btn-sm float-end w-25 fs-5"
          onClick={saveFieldData}
        >
          Add Field
        </button>
      </div>
      <hr />
      <div className="row">
        <div className="col-xl-12">
          <form>
            <div className="d-flex flex-row gap-3 align-items-baseline">
              <input
                type="text"
                ref={fieldNameRef}
                className="form-control w-50"
                placeholder="Field Name"
              />
              <input
                type="text"
                ref={fieldValueRef}
                disabled={isValueFieldDisabled}
                className="form-control w-100"
                placeholder="Field Value"
              />
              <div className="w-50">
                <input
                  type="checkbox"
                  disabled={isStringArrayDisabled}
                  className="form-check-input"
                  ref={stringArrayRef}
                  onChange={checkboxHandler.bind(this, "string")}
                />
                <label htmlFor="" className="px-1">
                  String Array
                </label>
              </div>
              <div className="w-50">
                <input
                  type="checkbox"
                  disabled={isNumberArrayDisabled}
                  className="form-check-input"
                  ref={numberArrayRef}
                  onChange={checkboxHandler.bind(this, "number")}
                />
                <label htmlFor="" className="px-1">
                  Number Array
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />
      {data.length > 0 && (
        <div>
          {data?.map((d) => (
            <div className="row" key={d.name}>
              <span className="col-xl-4">
                Field: <span className="text-primary">{d.name}</span>{" "}
              </span>
              <span className="col-xl-8">
                Value: <span className="text-primary">{d.value}</span>{" "}
              </span>
              <hr />
            </div>
          ))}
        </div>
      )}
      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-primary w-25 fs-5"
          onClick={requestSubmitHandler}
        >
          Submit Request
        </button>
        <button
          type="button"
          disabled={data.length === 0}
          className="btn btn-danger w-25 fs-5"
          onClick={resetFieldsHandler}
        >
          Reset All Fields
        </button>
      </div>
    </div>
  );
};

export default RequestData;
