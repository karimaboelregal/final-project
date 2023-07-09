import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { getBoard } from "../store/reducer/boardSlice";
import LoadingCircle from "./LoadingCircle";
import Box from "@mui/material/Box";
import { Button, Card, CardActionArea, CardContent, Typography, styled } from "@mui/material";
import { showModal } from "../store/reducer/modalSlice";
import AddIcon from '@mui/icons-material/Add';

const CustomButton2 = styled(Button)(({ theme }) => ({
    backgroundColor: "#635FC7",
    color: "white",
    textTransform: "none",
    padding: "5px",
    borderRadius: "20px",
    "&:hover": {
        backgroundColor: "#635FC7",
        opacity: "0.8"
    }

}))
export default function MainContent({ setCurrentBoard } : {setCurrentBoard:Function}) {

    let { id } = useParams();
    let aid:string = id!;
    const dispatch = useDispatch<AppDispatch>()
    const updateStatus = useSelector<RootState, string>(state => state.board.updateStatus);
    const addStatus = useSelector<RootState, string>(state => state.board.addStatus);
    const columnStatus = useSelector<RootState, string>(state => state.board.columnStatus);
    const deleteStatus = useSelector<RootState, string>(state => state.board.deleteStatus);
    const editStatus = useSelector<RootState, string>(state => state.board.editStatus);
    const addStatus2 = useSelector<RootState, string>(state => state.boards.addStatus);
    const deleteTask = useSelector<RootState, string>(state => state.board.deleteTaskStatus);

    const navigate = useNavigate();

    useEffect(() => {
        if (updateStatus === "success" || addStatus === "success" || columnStatus === "success" || deleteStatus === "success" || editStatus === "success" || addStatus2 === "success" || deleteTask === "success") {
            if (deleteStatus === "success") {
                navigate("/boards");
                window.location.reload();
            }
            setCurrentBoard(aid);
            dispatch(getBoard(aid));
        }
    }, [updateStatus, addStatus, columnStatus, deleteStatus, editStatus, addStatus2, deleteTask])

    useEffect(() => {
        setCurrentBoard(aid);
        dispatch(getBoard(aid));
    }, [aid])

    const data = useSelector<RootState, Array<any>>(state => state.board.value);
    const status = useSelector<RootState, string>(state => state.board.status);

    return (
        status !== "success" ?
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <LoadingCircle />

            </Box> : <Box sx={{ display: "flex", paddingTop: "15px", gap: "20px" }}>
                {data.length === 0 ?
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", alignItems: "center" }}>
                        <Typography sx={{color: "#828FA3"}}>This board is empty. Create new column to get started.</Typography>
                        <CustomButton2 onClick={() => dispatch(showModal({ modal: "add-column" }))}><AddIcon/> Add new column</CustomButton2>
                    </Box> :
                    <>
                        {data.map((elem) => {
                            return <Box sx={{ width: "350px" }}><Column title={elem.name} id={elem.id} cards={elem.cards} /></Box>
                        })}
                        <Button variant="outlined" sx={{ height: "80vh" }} onClick={() => dispatch(showModal({ modal: "add-column" }))} >Create new column</Button></>}
            </Box>

    )
}




function Column({ title, id, cards } : {title:string, id:string, cards:Array<any>}) {
    const color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    console.log(cards);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <div style={{ width: "15px", height: "15px", backgroundColor: color, borderRadius: "50%" }}></div>
                <Typography sx={{ color: "#828FA3", fontSize: "14px", textTransform: "uppercase" }}>{title + " (" + cards.length + ")"}</Typography>
            </Box>
            {cards.map((elem) => {
                if (elem.idList === id) {
                    return <MultiActionAreaCard name={elem.name} id={elem.id} desc={elem.desc} status={elem.idList} />
                }
            })}
        </Box>
    )
}


function MultiActionAreaCard({ name, desc, id, status }: {name:string, desc:string, id:string, status:string}) {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Card sx={{ maxWidth: 310, borderRadius: "7px", boxShadow: "0px 4px 6px 0px #364E7E1A", ":hover": { color: "#635FC7" } }}>
            <CardActionArea sx={{ padding: "10px" }} onClick={() => dispatch(showModal({ modal: "edit-task", id: id, name: name, desc: desc, status: status }))}>

                <CardContent>
                    <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                        {name}
                    </Typography>
                    <Typography sx={{ color: "#828FA3", fontSize: "13px" }}>
                        no subtasks
                    </Typography>

                </CardContent>
            </CardActionArea>

        </Card>
    );
}