import "bootstrap/dist/css/bootstrap.min.css";
import { FieldValues } from "react-hook-form";
import "./auth.css";
import { useAuth } from "../../contexts/AuthContext";
import AuthForm from "../../components/common/AuthForm";

const SignUp = () => {
  const auth = useAuth();

  const onSubmit = (data: FieldValues) => {
    auth.signUpAction({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="signup_form card">
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

      <div className="signup_form-field" style={{ marginTop: "6rem" }}>
        <AuthForm onSubmit={onSubmit} formType="signup" />
        <span>
          Already have an account?<a href="/login">login</a>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
