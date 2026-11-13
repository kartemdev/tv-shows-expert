import { createContext } from "react";
import type { SearchedShowActions, SearchedShowState } from "../store/types";

export const SearchedShowStateContext = createContext<SearchedShowState | null>(
	null,
);
export const SearchedShowActionsContext =
	createContext<SearchedShowActions | null>(null);
