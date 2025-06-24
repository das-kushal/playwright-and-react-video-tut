import { useState } from "react";
import { Link } from "react-router";

export default function Form() {
  const [items, setItems] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
  );
  const [item, setItem] = useState("");
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <h3>Form page</h3>
      <Link to="https://playwright.com">Go to Playwright</Link>
      <Link to="/">Go to Home</Link>
      <form
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter item name"
          onChange={(e) => setItem(e.target.value)}
          value={item}
        />
        <br></br>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setItems([...items, { name: item }]);
            localStorage.setItem(
              "items",
              JSON.stringify([...items, { name: item }])
            );
            setItem("");
          }}
        >
          Add Item
        </button>
      </form>
      <div>
        <ul>
          {items.length > 0 &&
            items.map((item, index) => <li key={index}>{item.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
