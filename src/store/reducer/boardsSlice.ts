import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface boardsState {
    value: Array<Array<String>>,
    status: String,
    addStatus: string,
    error: any
}

const initialState: boardsState = {
    value: [[]],
    status: "idle",
    addStatus: "idle",
    error: null
}

export const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {

        restoreEditStatus: (state) => {
            state.addStatus = "idle"
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = "pending";
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "success";
            state.value = action.payload
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload
        })

        builder.addCase(addBoard.pending, (state, action) => {
            state.addStatus = "pending";
        })
        builder.addCase(addBoard.fulfilled, (state, action) => {
            state.addStatus = "success";
        })
        builder.addCase(addBoard.rejected, (state, action) => {
            state.addStatus = "error";
            state.error = action.payload
        })

    }
})

// Action creators are generated for each case reducer function
export const { restoreEditStatus } = boardsSlice.actions

export default boardsSlice.reducer


export const fetchPosts = createAsyncThunk('board/fetchBoards', async () => {
    let url = "https://api.trello.com/1/members/me/boards?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411";
    let data: any[] = []
    await fetch(url)
        .then(response => response.json())
        .then(json => {

            data = json;
        }).catch(error => { data = error })
    return data
})

export const addBoard = createAsyncThunk('board/addBoard', async (data: any) => {

    await fetch('https://api.trello.com/1/boards/?name=' + data[0] + '&defaultLabels=false&defaultLists=false&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
        method: 'POST',

    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => {
            const ID = JSON.parse(text).id;
            data[1].map(async (elem:string) => {
                await fetch('https://api.trello.com/1/boards/' + ID + '/lists?name=' + elem + '&key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(
                            `Response: ${response.status} ${response.statusText}`
                        );
                        return response.text();
                    })
                    .then(text => console.log(text))
                    .catch(err => console.error(err));

            })
        })
        .catch(err => console.error(err));

})


