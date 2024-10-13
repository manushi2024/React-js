import {createSlice} from "@reduxjs/toolkit"
const initialState = {
  data: [],
  editData: {},
  editId: null,
  
};

const curdSlice = createSlice({
  name: "AddFrom",
  initialState,
  reducers: {
    AddFrom: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    DeleteFrom: (state, action) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
    },
    UpdateFrom: (state, action) => {
      // Store the user data for binding
      state.editData = action.payload;
      state.editId = action.payload.id;
    },
    EditFrom: (state, action) => {
      const updatedData = state.data.map((emp) => {
        if (state.editId === emp.id) {
          const empData = { ...action.payload };
          return empData;
        } else {
          return emp;
        }
      });
      state.data = updatedData;
    },
    searchEmployees: (state, action) => {
      const searchQuery = action.payload;

      // Filter data based on search query
      state.data = state.data.filter((emp) => {
        return (
          emp.name.toLowerCase().includes(searchQuery) ||
          emp.username.toLowerCase().includes(searchQuery) ||
          emp.email.toLowerCase().includes(searchQuery) ||
          emp.Address.toLowerCase().includes(searchQuery)
        );
      });

     
    },
    importdata:(state,action)=>{
        state.data=action.payload
    }
    
    
  
  },
});

export const { AddFrom, DeleteFrom, UpdateFrom, EditFrom, searchEmployees, autoSuggestions, clearAutoSuggestions, importdata } = curdSlice.actions;

export default curdSlice.reducer;
