import * as React from 'react';
import KanbanAppBar from './AppBar';
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./Theme";
import { ThemeProvider } from '@mui/material';
import { RootState } from '../store/store';


export default function MainComponent() {
    const theme = useSelector((state: RootState) => state.theme.value)

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>

            <KanbanAppBar />
        </ThemeProvider>

    )
}