import { FormEvent, useRef, useState } from "react";
import { login } from "../assets/http/http-requests";

const Login = () => {
  const [token, setToken] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      const model = {
        email: email,
        password: password,
        returnSecureToken: true,
      };

      const response = await login(model);
      setToken(response.data.idToken);
      localStorage.setItem("token", response.data.idToken);
    }
  };

  return (
    <div className="p-4 d-flex flex-row gap-5 card bg-light shadow border-1 mb-4">
      <form onSubmit={loginHandler} className="d-flex flex-column gap-3 w-25">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          ref={emailRef}
          defaultValue="raed.g@thymeapp.site"
        />
        <input
          type="text"
          className="form-control"
          placeholder="Password"
          ref={passwordRef}
          defaultValue="123456"
        />
        <button className="btn btn-primary fs-5" type="submit">
          Get Access Token
        </button>
      </form>
      <div className="form-group">
        <label className="form-label fs-5" htmlFor="token">
          Access Token
        </label>
        <textarea
          name="token"
          id="token"
          cols={180}
          rows={4}
          className="form-control"
          defaultValue={token}
        ></textarea>
      </div>
    </div>
  );
};

export default Login;
