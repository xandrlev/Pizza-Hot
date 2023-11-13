import { FC, memo } from "react";
// import { useWhyDidYouUpdate } from "ahooks";

interface ICategoriesProps {
  categoryId: number;
  categoriesName: string[];
  onClickCategories: (index: number) => void;
}

export const Categories: FC<ICategoriesProps> = memo(
  ({ categoryId, categoriesName, onClickCategories }) => {
    // * hook показывает рендеры в компоненте
    // useWhyDidYouUpdate("Categories", {
    //   categoryId,
    //   categoriesName,
    //   onClickCategories,
    // });

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
  }
);
