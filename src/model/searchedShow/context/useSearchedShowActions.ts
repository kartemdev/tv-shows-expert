import { useContext } from "react";
import { SearchedShowActionsContext } from "./types";

export const useSearchedShowActions = () => {
	const actions = useContext(SearchedShowActionsContext);

	if (!actions) {
		throw new Error(
			"useSearchedShowActions должен использоваться в SearchedShowProvider",
		);
	}

	return actions;
};
