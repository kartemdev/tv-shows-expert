import { usePaginationButtonPresenter } from "./logic/usePaginationButtonPresenter";

type Props = {
	page: number;
	label: string;
	ariaLabel: string;
	isCurrent: boolean;
	isDisabled: boolean;
};

export const PaginationButton = ({
	page,
	label,
	ariaLabel,
	isCurrent,
	isDisabled,
}: Props) => {
	const { className, ariaCurrent, onClick } = usePaginationButtonPresenter(
		page,
		isCurrent,
	);

	return (
		<button
			className={className}
			type="button"
			aria-label={ariaLabel}
			aria-current={ariaCurrent}
			disabled={isDisabled}
			onClick={onClick}
		>
			{label}
		</button>
	);
};
