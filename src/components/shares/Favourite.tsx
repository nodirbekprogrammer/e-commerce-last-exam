  "use client";

import React, { useState } from "react";

// import Button from "@mui/material/Button";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import IconButton from "@mui/material/IconButton";

const Favourite = () => {
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);

    // Make an API call to save the user's favorite status
  };
  return (
    <div className="favourite">
      <IconButton size="large" onClick={toggleFavorite}>
        {favorite ? (
          <FavoriteOutlinedIcon style={{ color: "red" }} />
        ) : (
          <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
        )}
      </IconButton>
    </div>
  );
};

export default Favourite;
