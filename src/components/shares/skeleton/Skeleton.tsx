import Skeleton from "@mui/material/Skeleton";

import "./style.scss";

const Skelet = () => {
  return (
    <div id="sceleton-wrapper">
      <div className="skeleton">
        <Skeleton
          variant="rounded"
          width="100%"
          height={320}
          animation="wave"
        />
        <br />
        <div className="content">
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width="60%" />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
          <br />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        </div>
      </div>
    </div>
  );
};

export default Skelet;
