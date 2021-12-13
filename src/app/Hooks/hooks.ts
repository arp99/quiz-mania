import { TypedUseSelectorHook , useDispatch , useSelector } from "react-redux"
import { RootState , AppDispatch } from  "../store"

//make the typed version of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector