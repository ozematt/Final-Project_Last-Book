import { API } from "./constans";

fetch(`${API}/books`, {})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
