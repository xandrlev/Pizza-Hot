interface ICategoriesProps {
  categoryId: number;
  categoriesName: string[];
  onClickCategories: (index: number) => void;
}

export const Categories = ({
  categoryId,
  categoriesName,
  onClickCategories,
}: ICategoriesProps) => {
  return (
    <div className="categories">
      <ul>
        {categoriesName.map((item, index) => (
          <li
            onClick={() => onClickCategories(index)}
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
