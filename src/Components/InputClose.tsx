import { styled } from '@mui/material/styles';
import { Box, IconButton, InputBase } from "@mui/material";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default function InputClose({value, id, updateValues, setDeleted} : {value:String, id: string, updateValues: Function, setDeleted: Function}) {
    const [show, setShow] = React.useState("flex");


    

    return (
    <Box sx={{ display: show, alignItems: "center", gap: "5px" }}>
        <BootstrapInput value={value} sx={{ width: "90%" }} onChange={(e) => updateValues(e.target.value)}/>
        <IconButton onClick={() => {setShow("none"); setDeleted(id)}}>
            <ClearIcon />
        </IconButton>
    </Box>
    )

}