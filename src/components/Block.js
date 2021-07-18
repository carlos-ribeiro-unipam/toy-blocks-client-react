import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({ id, description }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography
          variant="h5"
          className={classes.title}
        >
          {showID(id)}
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.description}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const showID = (id) => {
  return id.padStart(3, '0');
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px",
    margin: "4px 0",
    borderRadius: "2px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blocksBackground,
  },
  title: {
    fontSize: theme.typography.pxToRem(10),
    color: colors.blocksIndex,
    display: "block",
    lineHeight: "16px",
    fontStyle: "normal",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },
  description: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.text,
    lineHeight: "20px",
    fontStyle: "normal",
    fontWeight: "normal",
    letterSpacing: "0.25px",
  },
}));

Block.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Block;
