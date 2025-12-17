import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import Box  from "@mui/material/Box";
import Divider from "@mui/material/Divider";


const Header = (props ) => {
  const title = props.title
    const navigate = useNavigate();

  return (
        <Paper
      elevation={3}
      sx={{
        mt: 1,
        mb: 2,
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        background: "linear-gradient(90deg, rgba(22,23,39,.9) 0%, rgba(32,33,56,.9) 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ color: "#9ec6ff" }} />
      </IconButton>

      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Divider
          sx={{
            mx: "auto",
            mt: 1,
            width: { xs: "70%", sm: 380 },
            borderColor: "rgba(255,255,255,0.18)",
          }}
        />
      </Box>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon sx={{ color: "#9ec6ff" }} />
      </IconButton>
    </Paper>
  );
};

export default Header;
