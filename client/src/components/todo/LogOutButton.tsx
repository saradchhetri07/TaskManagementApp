import { useAuth } from "../../contexts/AuthContext";

const LogOutButton = () => {
  const { logOut } = useAuth();

  return (
    <button
      type="submit"
      className="btn btn-dark"
      style={{ marginLeft: "70vw" }}
      onClick={() => logOut()}
    >
      LogOut
    </button>
  );
};

export default LogOutButton;
