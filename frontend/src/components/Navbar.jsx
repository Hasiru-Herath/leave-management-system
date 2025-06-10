import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav>
      <div className="container">
        <h1>Leave Management System</h1>
        <div>
          {role && (
            <>
              <span style={{ marginRight: "1rem" }}>Welcome, {role}</span>
              <button onClick={() => navigate("/register")} style={{ marginRight: "1rem" ,backgroundColor:"grey"}}>
                Register
              </button>
              <button onClick={handleLogout}>Logout</button>
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
