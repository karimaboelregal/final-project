import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/reducer/boardsSlice';
import { AppDispatch, RootState } from '../store/store';
import { showModal } from '../store/reducer/modalSlice';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function BoardList({ currentBoard } : {currentBoard:string}) {
    const dispatch = useDispatch<AppDispatch>()
    const data = useSelector<RootState, Array<any>>(state => state.boards.value);
    const editStatus = useSelector<RootState, string>(state => state.board.editStatus);
    const addStatus = useSelector<RootState, string>(state => state.boards.addStatus);

    React.useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    React.useEffect(() => {
        if (editStatus === "success" || addStatus === "success") {
            dispatch(fetchPosts());
        }
    }, [editStatus, addStatus])
    const ListStyle = (selected:boolean) => {
        return {
            paddingLeft: "30px",
            borderEndEndRadius: "30px",
            borderTopRightRadius: "30px",
            marginBottom: "5px",
            backgroundColor: selected ? "#635FC7" : "",
            color: selected ? "white" : "grey",
            '& .MuiListItemIcon-root': {
                color: selected ? "white" : "grey"
            },
            ":hover": {
                backgroundColor: selected ? "#635FC7" : "#A8A4FF",
                color: "white",
                '& .MuiListItemIcon-root': {
                    color: "white"
                }
            }
        }
    }
    return (
        <>
            <Typography variant="subtitle1" sx={{ paddingLeft: "30px", fontSize: "12px" }}>ALL BOARDS ({data.length})</Typography>
            <List sx={{ width: "90%" }}>
                {data ? data.map((text, index) => (
                    <Link to={'/boards/' + text.id} style={{ textDecoration: "none" }}>
                        <ListItem key={text} disablePadding>
                            <ListItemButton sx={ListStyle(currentBoard === text.id)}>
                                <TableChartIcon sx={{ marginRight: "15px", }} />
                                <ListItemText primary={text.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )) : ""}
                <ListItemButton onClick={() => dispatch(showModal({ modal: "create-board" }))} sx={{ paddingLeft: "30px", ":hover": { backgroundColor: "transparent" }, borderEndEndRadius: "30px", borderTopRightRadius: "30px" }}>
                    <TableChartIcon sx={{ marginRight: "15px", color: "#635FC7" }} />
                    <ListItemText primary={<Typography sx={{ fontSize: "15px" }}>+ Create new board</Typography>} sx={{ color: "#635FC7" }} />
                </ListItemButton>

            </List>

        </>

    )

}