import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { setSegment, setTheme, type Theme } from '../store/preferences'
import type { Segment } from '../types'
export function usePreferences() {
  const dispatch = useDispatch<AppDispatch>()
  const { theme, segment } = useSelector((state: RootState) => state.preferences)
  return {
    theme,
    segment,
    setTheme: (value: Theme) => dispatch(setTheme(value)),
    setSegment: (value: Segment) => dispatch(setSegment(value)),
  }
}
