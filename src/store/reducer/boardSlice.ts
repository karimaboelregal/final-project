import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface boardState {
    value: Array<Array<any>>,
    status: string,
    id: string,
    updateStatus: string,
    boardName: string,
    boardStatus: string,
    addStatus: string,
    deleteTaskStatus: string, 
    columnStatus: string,
    deleteStatus: string,
    editStatus: string,
    error: any
}

const initialState: boardState = {
    value: [[]],
    status: "idle",
    id: "",
    updateStatus: "idle",
    boardName: "",
    boardStatus: "idle",
    addStatus: "idle",
    columnStatus: "idle",
    deleteTaskStatus: "idle",
    deleteStatus: "idle",
    editStatus: "idle",
    error: null
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {

        restoreStatus: (state) => {
            state.updateStatus = "idle";
            state.addStatus = "idle";
            state.columnStatus = "idle";
            state.deleteStatus = "idle";
            state.boardStatus = "idle";
            state.deleteTaskStatus = "idle";
        },


        setPending: (state) => {
            state.status = "pending"
        }


    },
    extraReducers: (builder) => {
        builder.addCase(getBoard.pending, (state, action) => {
            state.status = "pending";
        })
        builder.addCase(getBoard.fulfilled, (state, action) => {
            state.status = "success";
            state.value = action.payload[0]
            state.id = action.payload[1]
        })
        builder.addCase(getBoard.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload
        })
        builder.addCase(editTask.pending, (state, action) => {
            state.updateStatus = "pending";
        })
        builder.addCase(editTask.fulfilled, (state, action) => {
            state.updateStatus = "success";
        })
        builder.addCase(editTask.rejected, (state, action) => {
            state.updateStatus = "error";
            state.error = action.payload
        })
        builder.addCase(addTask.pending, (state, action) => {
            state.addStatus = "pending";
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.addStatus = "success";
        })
        builder.addCase(addTask.rejected, (state, action) => {
            state.addStatus = "error";
            state.error = action.payload
        })

        builder.addCase(createColumn.pending, (state, action) => {
            state.columnStatus = "pending";
        })
        builder.addCase(createColumn.fulfilled, (state, action) => {
            state.columnStatus = "success";
        })
        builder.addCase(createColumn.rejected, (state, action) => {
            state.columnStatus = "error";
            state.error = action.payload
        })

        builder.addCase(deleteBoard.pending, (state, action) => {
            state.deleteStatus = "pending";
        })
        builder.addCase(deleteBoard.fulfilled, (state, action) => {
            state.deleteStatus = "success";
        })
        builder.addCase(deleteBoard.rejected, (state, action) => {
            state.deleteStatus = "error";
            state.error = action.payload
        })

        builder.addCase(getBoardInfo.pending, (state, action) => {
            state.boardStatus = "pending";
        })
        builder.addCase(getBoardInfo.fulfilled, (state, action) => {
            state.boardStatus = "success";
            state.boardName = action.payload;
        })
        builder.addCase(getBoardInfo.rejected, (state, action) => {
            state.boardStatus = "error";
            state.error = action.payload
        })


        builder.addCase(editBoard.pending, (state, action) => {
            state.editStatus = "pending";
        })
        builder.addCase(editBoard.fulfilled, (state, action) => {
            state.editStatus = "success";
        })
        builder.addCase(editBoard.rejected, (state, action) => {
            state.editStatus = "error";
            state.error = action.payload
        })

        builder.addCase(deleteTask.pending, (state, action) => {
            state.deleteTaskStatus = "pending";
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.deleteTaskStatus = "success";
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.deleteTaskStatus = "error";
            state.error = action.payload
        })



    }
})

// Action creators are generated for each case reducer function
export const { restoreStatus, setPending } = boardSlice.actions

export default boardSlice.reducer


export const getBoard = createAsyncThunk('board/getBoard', async (id: string) => {

    let data: any[] = [];
    let data2: any[] = []
    await fetch('https://api.trello.com/1/boards/' + id + '/lists?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.text())
        .then(text => { data = JSON.parse(text) })
        .catch(err => data = err);


    await fetch('https://api.trello.com/1/boards/' + id + '/cards?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
        method: 'GET'
    }).then(response => response.text())
        .then(text => data2 = JSON.parse(text))
        .catch(err => data = err);




    for (let i = 0; i < data.length; i++) {
        data[i]["cards"] = []
        for (let j = 0; j < data2.length; j++) {

            if (data[i]['id'] === data2[j]['idList']) {
                data[i]['cards'].push(data2[j]);
            }
        }
    }


    data = [data, id]
    return data;
})

export const getBoardInfo = createAsyncThunk('board/getBoardInfo', async (id: string) => {

    let data = "";
    await fetch('https://api.trello.com/1/boards/' + id + '?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.text())
        .then(text => { data = JSON.parse(text).name })
        .catch(err => data = err);
    return data;
})


export const editBoard = createAsyncThunk('board/editBoard', async (data: Array<any>) => {
    let rdata = "";


    const nameChange = async () => {
        await fetch('https://api.trello.com/1/boards/' + data[0] + '?name=' + data[1] + '&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.text())
            .then(text => {

            })
            .catch(err => rdata += err)
    }


    const listUpdate = () => {
        data[2].map(async (elem:any, i:number) => {
            if (i === 0) {
                await elem.forEach(async (elm:Array<any>) => {

                    await fetch('https://api.trello.com/1/lists/' + elm[1] + '?name=' + elm[0] + '&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
                        method: 'PUT',
                    })
                        .then(response => response.text())
                        .then(text => rdata += text)
                        .catch(err => rdata += err);

                })
            } else {
                await elem.forEach(async (elm:Array<any>) => {
                    await fetch('https://api.trello.com/1/boards/' + data[0] + '/lists?name=' + elm[0] + '&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                        .then(response => response.text())
                        .then(text => rdata += text)
                        .catch(err => rdata += err);
                })

            }
        })
    }


    const deleteList = () => {
        data[3].map(async (elem:string) => {
            await fetch('https://api.trello.com/1/lists/' + elem + '/closed?value=true&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
                method: 'PUT',
            })
                .then(response => response.text())
                .then(text => rdata += text)
                .catch(err => rdata += err);
        })
    }

    await Promise.all([
        nameChange(),
        listUpdate(),
        deleteList()
    ])


    return data;
});


export const createColumn = createAsyncThunk('board/createColumn', async (data: Array<string>) => {
    let rdata = "";
    await fetch('https://api.trello.com/1/boards/' + data[0] + '/lists?name=' + data[1] + '&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.text())
        .then(text => rdata = text)
        .catch(err => rdata = err);
    return rdata;
});


export const deleteBoard = createAsyncThunk('board/deleteBoard', async (id:string) => {
    let rdata = "";
    await fetch('https://api.trello.com/1/boards/' + id + '?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.text())
        .then(text => rdata = text)
        .catch(err => rdata = err);
    return rdata;
});


export const deleteTask = createAsyncThunk('board/deleteTask', async (id: string) => {
    let rdata = "";
    await fetch('https://api.trello.com/1/cards/' + id + '?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.text())
        .then(text => rdata = text)
        .catch(err => rdata = err);

        return rdata;
});


export const editTask = createAsyncThunk('board/editTask', async (dataSent: Array<string>) => {

    let data = ""
    await fetch('https://api.trello.com/1/cards/' + dataSent[0] + '?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411&name=' + dataSent[1] + '&desc=' + dataSent[2] + '&idList=' + dataSent[3], {
        method: 'PUT',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.text())
        .then(text => data = text)
        .catch(err => data = err);


    return data;
})

export const addTask = createAsyncThunk('board/addTask', async (dataSent: Array<string>) => {

    let data = ""
    await fetch('https://api.trello.com/1/cards?idList=' + dataSent[0] + '&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411&name=' + dataSent[1] + '&desc=' + dataSent[2], {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.text())
        .then(text => data = text)
        .catch(err => data = err);


    return data;
})



