import { createTheme } from "@mui/material";
import "./Fonts.css"

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#fff",
            paper: "#fff",
        },
        common: {
            white: "#F4F7FD"
        },
        action: {
            hover: "#A8A4FF",
            
        },
        text: {
            primary: "#000",
        },
    },
    typography: {
        fontFamily: "PlusJakartaSans",
        subtitle1: {
            color: "#828FA3",
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "white",
                    color: "black"
                }

            }
        },
        MuiModal: {
            styleOverrides : {
                root: {
                    color: "black"
                }
            }            
        },


    }
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            paper: "#2B2C37",
        },
        common: {
            white: "#2B2C37"
        },
        text: {
            primary: "#fff",
        },
        
    },
    typography: {
        fontFamily: "PlusJakartaSans",
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2B2C37",
                    color: "white",
                    backgroundImage: "none"
                }

            }
        },
        MuiModal: {
            styleOverrides : {
                root: {
                    color: "white"
                }
            }
        }
    }
});