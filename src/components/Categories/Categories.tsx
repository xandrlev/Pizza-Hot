import { useState } from "react";

export const Categories = () => {
  const [selected, setSelected] = useState(0);

  const categories = ["All", "Meat", "Vegetarian", "BBQ", "Spicy", "Сheese"];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => setSelected(index)}
            key={index}
            className={selected === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
