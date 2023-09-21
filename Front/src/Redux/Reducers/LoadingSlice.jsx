import { createSlice } from '@reduxjs/toolkit';

const initialState = false; // El estado inicial es "false" (sin carga)

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return action.payload; // Cambia el estado de carga según la acción
    },
  },
});

export const { setLoading } = loadingSlice.actions; // Exporta la acción
export default loadingSlice.reducer; // Exporta el reducer