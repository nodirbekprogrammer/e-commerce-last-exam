import Skeleton from "@mui/material/Skeleton";

import "./style.scss";

const CategoryCardSkeleton = () => {
  return (
    <div id="category-skeleton">
      <Skeleton variant="rounded" width={100} height="100%" animation="wave" />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width="80%" />
    </div>
  );
};

export default CategoryCardSkeleton;