import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.8rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  section: {
      marginTop: 10,
      marginBottom: 10,
  },
  footer: {
      textAlign: "center",
      marginTop: 10,
  },
  form: {
    maxWidth: 750,
    margin: "0 auto"
  },
  navbarButton: {
    color: "orange",
    textTransform: 'initial'
  }
});

export default useStyles;
