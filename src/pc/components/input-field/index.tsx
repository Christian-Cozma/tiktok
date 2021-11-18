import { ReactNode } from "react";

import classes from "./input.module.scss";
import { joinClasses } from "../../../common/utils";

interface InputProps {
	type?: "text" | "password" | "email" | "number";
	placeholder?: string;
	className?: string;
	icon?: ReactNode;
	onChange?: (a: any) => void;
	onBlur?: (a: any) => void;
	value?: string;
	name?: string;
	error?: string | false;
}

export default function Input({
	type,
	placeholder,
	className,
	icon,
	onChange,
	onBlur,
	value,
	name,
	error
}: InputProps) {
	return (
		<div>
			<div
				className={joinClasses(
					classes["app-input-field"],
					error ? classes["error"] : "",
					className
				)}
			>
				{icon}
				<input
					type={type ? type : "text"}
					placeholder={placeholder}
					onChange={onChange}
					onKeyUp={onBlur}
					onBlur={onBlur}
					value={value}
					name={name}
				/>
			</div>
			{error && <div className={classes["form-error-container"]}>{error}</div>}
		</div>
	);
}
