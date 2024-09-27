import { FormEvent, useRef, useState } from "react";
import { login } from "../assets/http/http-requests";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginModel } from "../models/login-model";

const Login = () => {
  const [token, setToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>();

  const loginHandler: SubmitHandler<LoginModel> = async (payload) => {
    payload.returnSecureToken = true;

    const response = await login(payload);
    setToken(response.data.idToken);
    localStorage.setItem("token", response.data.idToken);
  };

  return (
    <div className="p-4 d-flex flex-row gap-5 card bg-light shadow border-1 mb-4">
      <form
        autoComplete="true"
        onSubmit={handleSubmit(loginHandler)}
        className="d-flex flex-column gap-3 w-25"
      >
        <input
          type="text"
          placeholder="username"
          defaultValue="raed.g@thymeapp.site"
          {...register("email", { required: true })}
          className={`form-control roboto-light shadow-none ${
            errors.email ? "border-danger" : "undefined"
          }`}
        />
        <input
          type="text"
          defaultValue="123456"
          placeholder="password"
          {...register("password", { required: true })}
          className={`form-control roboto-light shadow-none ${
            errors.password ? "border-danger" : "undefined"
          }`}
        />
        <button className="btn btn-primary fs-5 roboto-bold" type="submit">
          Get Access Token
        </button>
      </form>
      <div className="form-group">
        <label className="form-label fs-5 roboto-regular" htmlFor="token">
          Access Token
        </label>
        <textarea
          name="token"
          id="token"
          cols={180}
          rows={4}
          className="form-control roboto-regular"
          defaultValue={token}
        ></textarea>
      </div>
    </div>
  );
};

export default Login;
