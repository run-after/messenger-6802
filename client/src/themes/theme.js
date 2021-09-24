import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
      fontFamily: 'Montserrat, sans-serif',
    },
    palette: {
      faded: '#BECCE2',
      userText: '#91A3C0'
    },
    color: "#3A8DFF"
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  }
});
