const Footer = () => {
  return (
    <div className="card footer shadow bg-dark rounded-0">
      <div className="d-flex flex-row py-5 justify-content-center align-items-center gap-5">
        <p className="roboto-medium text-light">Copyright &copy; 2024 </p>
        <p className="roboto-medium text-light">
          Developed with{" "}
          <span className="text-danger">
            <i className="bi bi-heart"></i>
          </span>{" "}
          By Ra'ed Abu Sa'da
        </p>
        <p className="roboto-medium text-light">
          RSocket API Tester{" "}
          <span className="text-primary roboto-bold">Version 1.0</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
