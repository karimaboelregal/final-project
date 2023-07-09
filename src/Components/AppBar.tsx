import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersistentDrawerLeft from "./Drawer";
import logo from "../images/logo.png";
import Button from '@mui/material/Button';
import { showModal } from '../store/reducer/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Switch, ListItemButton, AppBar, IconButton } from '@mui/material';
import { changeTheme } from '../store/reducer/themeSlice';
import CustomModal from "./Modal";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BoardList from './List';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const CustomButton2 = styled(Button)(({ theme }) => ({
    backgroundColor: "#635FC7",
    color: "white",
    textTransform: "none",
    borderRadius: "20px",
    padding: "10px",
    "&:hover": {
        backgroundColor: "#635FC7",
        opacity: "0.8"
    }

}))


export default function KanbanAppBar() {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch<AppDispatch>()
    const id = useSelector<RootState, string>((state:RootState) => state.board.id);



    return (
        <>
            <CustomModal />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, elevation: 0, boxShadow: "none", left: 0, borderBottom: "1px solid #999", maxWidth: "100vw" }}>
                    <Box sx={{ height: "70px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <Box sx={{ display: { md: "flex", sm: "flex", xs: "none" }, height: "100%", alignItems: "center", justifyContent: "start", gap: "10px", borderRight: "1px solid #999", width: open ? "259px" : "180px" }}>
                            <Box component="img" src={logo} alt="here" sx={{ paddingLeft: "30px" }} />
                            <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>Kanban</Typography>
                        </Box>
                        <Box sx={{ display: "flex", height: "100%", flexGrow: 1, alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center"}}>
                                <Box component="img" src={logo} alt="here" sx={{ paddingLeft: "30px", display: { md: "none", sm: "none", xs: "block" } }} />

                                <Typography sx={{ display: { md: "block", sm: "block", xs: "none" }, fontSize: "24px", fontWeight: "700", paddingLeft: "10px" }}>Platform Launch</Typography>

                                <Box sx={{ display: { md: "none", sm: "none", xs: "flex" }, alignItems: "center", cursor: "pointer" }}>
                                    <DropMenu id={id}/>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "5px", paddingRight: "10px" }}>
                                <CustomButton2 onClick={() => {if (id !== "") {dispatch(showModal({ modal: "add-task" }))} else {alert("Please select a board first")}}}><AddIcon /> <Typography sx={{ display: { md: "block", sm: "block", xs: "none" } }}>Add new task</Typography></CustomButton2>
                                <BasicMenu id={id}/>

                            </Box>
                        </Box>
                    </Box>
                </AppBar>
                <PersistentDrawerLeft open={open} setOpen={setOpen} />

                {open ? "" : <IconButton onClick={() => setOpen(true)} sx={{ position: "fixed", width: "60px", height: "50px", display: "flex", justifyContent: "center", borderRadius: 0, borderTopRightRadius: "20px", borderBottomRightRadius: "20px", ":hover": { backgroundColor: "#A8A4FF" }, backgroundColor: "#635FC7", left: 0, bottom: "20px", padding: "10px" }}><VisibilityIcon sx={{ color: "white" }} /></IconButton>}
            </Box>
        </>
    );
}

function BasicMenu({id} : {id:string}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch<AppDispatch>()


    return (
        <div>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { if (id !== "") {dispatch(showModal({ modal: "edit-board" })); handleClose() } else {alert("Please choose a board")}} }>Edit board</MenuItem>
                <MenuItem onClick={() => { if (id !== "") {dispatch(showModal({ modal: "delete-board" })); handleClose() } else {alert("Please choose a board")} }}>Delete board</MenuItem>
            </Menu>
        </div>
    );
}

const BlueSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: "#635FC7",

    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: "#635FC7",
    },
}));

function DropMenu({id} : {id:string}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch<AppDispatch>()

    const theme = useTheme();

    return (
        <div>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : 'true'}
                onClick={handleClick}
                sx={{ color: theme.palette.text.primary, textTransform: "none" }}
            >
                <Typography sx={{ fontSize: "4vw", fontWeight: "700",  color: theme.palette.text.primary }}>Platform Launch</Typography>
                <KeyboardArrowDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ marginTop: "30px", padding: 0, ".MuiMenu-paper": {borderRadius: "10px", width: "264px", boxShadow: "0 0 0 50vmax rgba(0, 0, 0, 0.5);"} }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',

                }}
            >
                <Box sx={{marginTop: "20px"}}>
                    <BoardList currentBoard={id} />
                    <ListItemButton sx={{ display: "flex", justifyContent: "center", ":hover": { backgroundColor: "rgba(100, 100, 100, 0.2);" } }}>
                        <LightModeIcon sx={{ color: "grey" }} />
                        {theme.palette.mode === "light" ? <BlueSwitch onClick={() => dispatch(changeTheme())} /> : <BlueSwitch onClick={() => dispatch(changeTheme())} defaultChecked />}
                        <DarkModeIcon sx={{ color: "grey" }} />
                    </ListItemButton>

                </Box>
            </Menu>
        </div>
    );
}
