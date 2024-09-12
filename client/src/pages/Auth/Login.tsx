import "bootstrap/dist/css/bootstrap.min.css";
import { FieldValues } from "react-hook-form";
import "./auth.css";
import { useAuth } from "../../contexts/AuthContext";
import AuthForm from "../../components/common/AuthForm";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const auth = useAuth();

  const onSubmit = (data: FieldValues) => {
    auth.loginAction({ email: data.email, password: data.password });
  };

  return (
    <div className="login_form card">
      <div
        className="form_heading"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span>
          <h1>Todo</h1>
        </span>
        <span className="text-muted">
          <h1>App</h1>
        </span>
      </div>

      <div className="login_form-field" style={{ marginTop: "6rem" }}>
        <AuthForm onSubmit={onSubmit} formType="login" />
        <span>
          Don't have an account?<a href="/signUp">register</a>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
