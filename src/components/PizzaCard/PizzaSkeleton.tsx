import ContentLoader from "react-content-loader";

export const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="134" r="110" />
    <rect x="0" y="269" rx="5" ry="5" width="280" height="25" />
    <rect x="0" y="304" rx="5" ry="5" width="280" height="78" />
    <rect x="0" y="408" rx="5" ry="5" width="65" height="30" />
    <rect x="156" y="403" rx="22" ry="22" width="122" height="45" />
  </ContentLoader>
);
