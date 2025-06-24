import { Link } from "react-router";

export default function App() {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <h3>Home page</h3>
      <Link to="/form">Go to Form</Link>
      <p>Welcome to the home page!</p>
    </div>
  );
}
