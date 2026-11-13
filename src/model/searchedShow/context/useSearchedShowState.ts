import { useContext } from "react";
import { SearchedShowStateContext } from "./types";

export const useSearchedShowState = () => {
	const state = useContext(SearchedShowStateContext);

	if (!state) {
		throw new Error(
			"useSearchedShowState должен использоваться в SearchedShowProvider",
		);
	}

	return state;
};
