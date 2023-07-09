import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BoardList from "./List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from "react-redux";
import { changeTheme } from "../store/reducer/themeSlice"
import { AppDispatch } from "../store/store";
import { Routes, Route } from "react-router-dom";
import MainContent from './MainContent';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));



const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

const BlueSwitch = styled(Switch)(({ }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: "#635FC7",

	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: "#635FC7",
	},
}));



const MainComp = styled(Main)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	minHeight: "calc(100vh - 48px)",
	height: "100%"
}));
export default function PersistentDrawerLeft({open, setOpen} : {open:boolean, setOpen:Function}	) {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>()

	const [currentBoard, setCurrentBoard] = React.useState("");



	const handleDrawerClose = () => {
		setOpen(false);
	};




	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer
				sx={{
					display: { md: "block", sm: "block", xs: "none" },
					marginTop: "40px",
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				open={open}
			>
				<DrawerHeader />
				<Box sx={{ width: "100%", overflow: "auto", marginTop: "20px", height: "75%", display: "flex", flexDirection: "column", justifyContent: "start", paddingTop: "30px" }}>
					<BoardList currentBoard={currentBoard}/>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "center", paddingBottom: "10px" }}>
					<Box sx={{ width: "85%", display: "flex", flexDirection: "column", }}>
						<ListItemButton sx={{ display: "flex", justifyContent: "center", ":hover": {backgroundColor: "rgba(100, 100, 100, 0.2);"}}}>
							<LightModeIcon sx={{ color: "grey" }} />
							{theme.palette.mode === "light"? <BlueSwitch onClick={() => dispatch(changeTheme())}  /> : <BlueSwitch onClick={() => dispatch(changeTheme())}  defaultChecked/>}
							<DarkModeIcon sx={{ color: "grey" }} />
						</ListItemButton>
						<ListItemButton onClick={handleDrawerClose} sx={{":hover": {backgroundColor: "rgba(100, 100, 100, 0.2);"}}}>
							<VisibilityOffIcon sx={{ color: "grey", marginRight: "10px" }} />
							<ListItemText primary='Hide Sidebar' />
						</ListItemButton>

					</Box>
				</Box>

			</Drawer >

			<MainComp open={open} >
				<DrawerHeader />
					<Routes>
						<Route path="/boards/:id" element={<MainContent setCurrentBoard={setCurrentBoard}/>}></Route>
					</Routes>
			</MainComp>
		</Box >
	);
}