import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { Segment } from '../types/enum'
export type Theme = 'light' | 'dark'
export interface PreferencesState {
  theme: Theme
  segment: Segment
}
const initialState: PreferencesState = {
  theme: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  segment: Segment.Retail,
}
const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
    setSegment(state, action: PayloadAction<Segment>) {
      state.segment = action.payload
    },
  },
})
export const { setTheme, setSegment } = preferencesSlice.actions
export default preferencesSlice.reducer
