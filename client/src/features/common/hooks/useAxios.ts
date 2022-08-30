import { useMemo } from "react";
import { instance } from "../axios";

export const useAxios = () => useMemo(() => instance, []);