import { AsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export function useAsyncThunk<Type>(thunk: AsyncThunk<Type, any, { state: RootState }>): Type {

}