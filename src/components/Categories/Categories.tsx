interface CategoriesProps {
  categoryId: number;
  onClickCategory: (id: number) => void;
}

export const Categories = ({
  onClickCategory,
  categoryId,
}: CategoriesProps) => {
  const categories = ["All", "Meat", "Vegetarian", "BBQ", "Spicy", "Сheese"];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategory(index)}
            key={index}
            className={categoryId === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
