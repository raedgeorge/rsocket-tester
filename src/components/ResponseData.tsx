interface Props {
  resultData: { [key: string]: any }[];
}

const ResponseData = ({ ...props }: Props) => {
  return (
    <div className="card shadow bg-light form-group">
      <label
        htmlFor="response"
        className="form-label bg-success-subtle m-0 py-1 fs-4 text-center roboto-regular"
      >
        Response From Server
      </label>
      {props.resultData?.length > 0 && (
        <>
          <h5 className="text-primary px-5 mt-2 roboto-bold">
            Total Elements: {props.resultData?.length}
          </h5>
          <div className="mt-4 px-5">
            {props.resultData.map((result, index) => (
              <div key={index} className="mb-2">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key}>
                    <strong className="roboto-light">{key}:</strong>{" "}
                    <span className="roboto-medium">{value}</span>
                  </div>
                ))}
                <hr />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResponseData;
