import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useState } from 'react';
import InputClose from './InputClose';
import { hideModal } from '../store/reducer/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addBoard, restoreEditStatus } from '../store/reducer/boardsSlice';
import { editTask, restoreStatus, addTask, setPending, createColumn, deleteBoard, getBoardInfo, editBoard, deleteTask } from '../store/reducer/boardSlice';

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode !== "dark" ? theme.palette.action.hover : "white",
    color: theme.palette.mode !== "dark" ? "white" : "black",
    textTransform: "none",
    borderRadius: "20px",
    "&:hover": {
        backgroundColor: theme.palette.mode !== "dark" ? theme.palette.action.hover : "white",
        opacity: "0.8"
    }

}))

const CustomButton2 = styled(Button)(({ theme }) => ({
    backgroundColor: "#635FC7",
    color: "white",
    textTransform: "none",
    borderRadius: "20px",
    "&:hover": {
        backgroundColor: "#635FC7",
        opacity: "0.8"
    }

}))



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
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: "5px",
    transform: 'translate(-50%, -50%)',
    width: { md: 400, sm: 350, xs: 300 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function CustomModal() {
    const dispatch = useDispatch<AppDispatch>()
    const show = useSelector<RootState, boolean>(state => state.modal.show);
    const value = useSelector<RootState, any>(state => state.modal.value);


    return (
        value !== <Typography></Typography> ?
            <div>
                <Modal
                    keepMounted
                    open={show}
                    onClose={() => dispatch(hideModal())}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box>
                        {value.modal === "create-board" ? <CreateBoard show={show} dispatch={dispatch} /> : ""}

                        {value.modal === "edit-task" ? <EditTask values={value} /> : ""}
                        {value.modal === "add-task" ? <AddTask /> : ""}

                        {value.modal === "add-column" ? <AddColumn /> : ""}

                        {value.modal === "edit-board" ? <EditBoard show={show} /> : ""}
                        {value.modal === "delete-board" ? <DeleteBoard /> : ""}

                    </Box>
                </Modal>
            </div> : <Typography></Typography>
    );
}

function EditTask({ values } : {values:any}) {

    const dispatch = useDispatch<AppDispatch>()
    const [status, setStatus] = React.useState(values.status);
    const [title, setTitle] = React.useState(values.name);
    const [desc, setDesc] = React.useState(values.desc);
    const data = useSelector<RootState, Array<any>>(state => state.board.value);
    const updateStatus = useSelector<RootState, string>(state => state.board.updateStatus);
    const [error, setError] = useState<string>("");

    const handleClick = () => {
        let proceed = true;

        if (title === "" || status === "") {
            setError("Please fill in the data")
            proceed = false
        }


        if (proceed) {
            dispatch(hideModal());
            dispatch(setPending());
            dispatch(editTask([values.id, title, desc, status]));
        }
    }

    if (updateStatus === "success") {
        dispatch(restoreStatus());
    }
    const handleDelete = () => {
        dispatch(hideModal());
        dispatch(setPending());
        dispatch(deleteTask(values.id));

    };

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    return <Box sx={style}>
        <Typography variant="h5">
            Edit Task
        </Typography>
        {error !== "" ? <Typography sx={{paddingTop: "10px", color: "red"}}>
                {error}
            </Typography> : ""}

        <Box sx={{ paddingTop: "30px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="subtitle1">Title</Typography>
            <BootstrapInput sx={{ width: "100%" }} value={title} placeholder='e.g Web Design' onChange={(e) => setTitle(e.target.value)} />
            <Typography variant="subtitle1">Description (Optional)</Typography>
            <BootstrapInput sx={{ width: "100%" }} value={desc} placeholder='e.g Its always nice to take a break' onChange={(e) => setDesc(e.target.value)} />
            <Typography variant="subtitle1">Status</Typography>

            <FormControl size="small" sx={{ paddingBottom: "10px" }}>
                <Select
                    id="demo-simple-select"
                    value={status}
                    onChange={handleChange}
                >
                    {data.map((elem) => {
                        return <MenuItem value={elem.id} selected={true}>{elem.name}</MenuItem>
                    })}

                </Select>
            </FormControl>
            <CustomButton2 onClick={handleDelete} sx={{backgroundColor: "red", ":hover": {backgroundColor: "red", opacity: 0.7}}}>Delete task</CustomButton2>
            <CustomButton2 onClick={handleClick}>Edit task</CustomButton2>


        </Box>

    </Box>
}


function DeleteBoard() {
    const dispatch = useDispatch<AppDispatch>();
    const id = useSelector<RootState, string>(state => state.board.id);

    return (
        <Box sx={style}>
            <Typography variant="h5" sx={{ color: "red", paddingBottom: "20px" }}>
                Delete Board
            </Typography>
            <Typography sx={{ paddingBottom: "15px" }}>
                Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.
            </Typography>
            <Stack direction={"row"} width={"100%"} gap={"10px"}>
                <CustomButton2 sx={{ backgroundColor: "red", width: "50%", ":hover": { backgroundColor: "red" } }} onClick={() => { dispatch(setPending());dispatch(hideModal()); dispatch(deleteBoard(id)) }}>Delete</CustomButton2>
                <CustomButton sx={{ width: "50%" }} onClick={() => dispatch(hideModal())}>Cancel</CustomButton>
            </Stack>
        </Box>
    )
}

function EditBoard({ show } : {show:boolean}) {
    const dispatch = useDispatch<AppDispatch>()
    const boardNam = useSelector<RootState, string>(state => state.board.boardName);
    const boardStatus = useSelector<RootState, string>(state => state.board.boardStatus);
    const [boardName, setBoardName] = useState("");
    const [inputs, setInputs] = useState<Array<any>>([[], []]);
    const [deleted, setDeleted] = useState<Array<String>>([]);
    const addStatus2 = useSelector<RootState, string>(state => state.boards.addStatus);


    const value = useSelector<RootState, Array<any>>(state => state.board.value);
    const id = useSelector<RootState, string>(state => state.board.id);


    if (show === false && inputs.length !== 0) {
        setInputs([]);
    }

    if ( addStatus2 === "success") {
        dispatch(restoreEditStatus());
    }

    React.useEffect( () => {
        if (boardStatus === "success") {
            dispatch(restoreStatus());
            setBoardName(boardNam);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [boardStatus])

    React.useEffect( () => {
        let list = Array();
        value.forEach((elem:any) => {
            if (boardName === "") {
                dispatch(getBoardInfo(id));
            }
            list.push([elem.name, elem.id]);
        })
        let u = [...inputs];
        u[0] = list;
        setInputs(u);
    }, [])

    const addNewInput = () => {
        let spread = [...inputs];
        spread[1].push(["", ""])
        console.log(spread);
        setInputs(spread);
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">
                Edit board
            </Typography>
            <Box sx={{ paddingTop: "30px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography variant="subtitle1">Board name</Typography>
                <BootstrapInput sx={{ width: "100%" }} value={boardName} placeholder='e.g Web Design' onChange={(e) => setBoardName(e.target.value)} />
                <Typography variant="subtitle1" sx={{ paddingTop: "20px" }}>Columns</Typography>
                {inputs.map((v, i) => {
                    return v.map((elm:any, ind:number) => {
                        const updateFunction = (val:string) => {
                            let all = [...inputs];
                            all[i][ind][0] = val;
                            setInputs(all);
                        }

                        const deleteFunction = (val:string) => {
                            if (i === 1) {
                                let all = [...inputs];
                                if (all[1].length > 1) {
                                    all[1].splice(ind, 1);
                                } else {
                                    all[1] = []
                                }
                                setInputs(all)
                            } else {
                                setDeleted([...deleted, val])
                            }
                        }

                        return <InputClose key={ind} id={elm[1]} value={elm[0]} updateValues={updateFunction} setDeleted={deleteFunction} />
                    })
                })}
                <CustomButton onClick={addNewInput}>Add new column</CustomButton>
                <CustomButton2 onClick={() => {dispatch(hideModal());dispatch(setPending());dispatch(editBoard([id, boardName, inputs, deleted]))}}>Save changes</CustomButton2>
            </Box>
        </Box>

    )

}

function AddTask() {

    const dispatch = useDispatch<AppDispatch>()
    const [status, setStatus] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const data = useSelector<RootState, Array<any>>(state => state.board.value);
    const addStatus = useSelector<RootState, string>(state => state.board.addStatus);
    const [error, setError] = useState<string>("");

    const handleClick = () => {
        let proceed = true;

        if (title === "" || desc === "" || status === "") {
            setError("Please fill in the data")
            proceed = false
        }


        if (proceed) {
            dispatch(hideModal());
            dispatch(setPending());
            dispatch(addTask([status, title, desc]))
        }
    }




    if (addStatus === "success") {
        dispatch(restoreStatus());
    }

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    return <Box sx={style}>
        <Typography variant="h5">
            Add Task
        </Typography>
        {error !== "" ? <Typography sx={{paddingTop: "10px", color: "red"}}>
                {error}
            </Typography> : ""}
        <Box sx={{ paddingTop: "30px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="subtitle1">Title</Typography>
            <BootstrapInput sx={{ width: "100%" }} value={title} placeholder='e.g Web Design' onChange={(e) => setTitle(e.target.value)} />
            <Typography variant="subtitle1">Description</Typography>
            <BootstrapInput sx={{ width: "100%" }} value={desc} placeholder='e.g Its always nice to take a break' onChange={(e) => setDesc(e.target.value)} />
            <Typography variant="subtitle1">Status</Typography>

            <FormControl size="small" sx={{ paddingBottom: "10px" }}>
                <Select
                    id="demo-simple-select"
                    value={status}
                    onChange={handleChange}
                >
                    {data.map((elem) => {
                        return <MenuItem value={elem.id} selected={true}>{elem.name}</MenuItem>
                    })}

                </Select>
            </FormControl>
            <CustomButton2 onClick={handleClick}>Create Task</CustomButton2>


        </Box>

    </Box>


}

function AddColumn() {

    const dispatch = useDispatch<AppDispatch>()
    const [title, setTitle] = React.useState("");
    const addStatus = useSelector<RootState, string>(state => state.board.addStatus);
    const id = useSelector<RootState, string>(state => state.board.id);

    const [error, setError] = useState<string>("");

    const handleClick = () => {
        let proceed = true;

        if (title === "") {
            setError("Please type the column name")
            proceed = false
        }
        if (proceed) {
            dispatch(hideModal());
            dispatch(setPending());
            dispatch(createColumn([id, title]))
        }
    }


    if (addStatus === "success") {
        dispatch(restoreStatus());
    }


    return <Box sx={style}>
        <Typography variant="h5">
            Add Column
        </Typography>
        {error !== "" ? <Typography sx={{paddingTop: "10px", color: "red"}}>
                {error}
            </Typography> : ""}
        <Box sx={{ paddingTop: "30px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="subtitle1">Title</Typography>
            <BootstrapInput sx={{ width: "100%" }} value={title} placeholder='e.g Web Design' onChange={(e) => setTitle(e.target.value)} />
            <CustomButton2 onClick={handleClick}>Create Column</CustomButton2>


        </Box>

    </Box>


}




function CreateBoard({ show, dispatch } : {show:boolean, dispatch:Function}) {
    const [boardName, setBoardName] = useState("");
    const [inputs, setInputs] = useState<Array<String>>([]);
    const [error, setError] = useState<string>("");

    if (show === false && inputs.length !== 0) {
        setInputs([]);
    }

    const handleClick = () => {
        let proceed = true;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i] === "") {
                setError("Please fill all the columns")
                proceed = false
            }
        }

        if (boardName === "") {
            setError("Please type the board name")
            proceed = false
        }
        if (proceed) {
            dispatch(hideModal());
            dispatch(setPending());
            dispatch(addBoard([boardName, inputs]))
        }
    }

    return (
        <Box sx={style}>
            <Typography variant="h5">
                Add board
            </Typography>
            {error !== "" ? <Typography sx={{paddingTop: "10px", color: "red"}}>
                {error}
            </Typography> : ""}
            <Box sx={{ paddingTop: "30px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography variant="subtitle1">Board name</Typography>
                <BootstrapInput sx={{ width: "100%" }} placeholder='e.g Web Design' onChange={(e) => setBoardName(e.target.value)} />
                <Typography variant="subtitle1" sx={{ paddingTop: "20px" }}>Columns</Typography>
                {inputs.map((v, i) => {
                    const updateValue = (val:string) => {
                        let all = [...inputs];
                        all[i] = val;
                        setInputs(all)
                    } 
                    return <InputClose key={i} id={""} value={v} updateValues={updateValue} setDeleted={() => {}} />
                })}
                <CustomButton onClick={() => setInputs([...inputs, ""])}>Add new column</CustomButton>
                <CustomButton2 onClick={handleClick}>Add Board</CustomButton2>
            </Box>
        </Box>

    )

}

