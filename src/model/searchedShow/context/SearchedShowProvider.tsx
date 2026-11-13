import type { ReactNode } from "react";
import { useSearchedShowStore } from "../store";
import { SearchedShowActionsContext, SearchedShowStateContext } from "./types";

type Props = {
	children: ReactNode;
};

export const SearchedShowProvider = ({ children }: Props) => {
	const { state, actions } = useSearchedShowStore();

	return (
		<SearchedShowStateContext.Provider value={state}>
			<SearchedShowActionsContext.Provider value={actions}>
				{children}
			</SearchedShowActionsContext.Provider>
		</SearchedShowStateContext.Provider>
	);
};
