import { useFormik } from "formik";
import * as yup from "yup";

import { FormProps } from ".";
import Input from "../input-field";
import { useAppDispatch } from "../../../common/store";
import { loginThunk } from "../../../common/store/slices/auth";
import { notificationActions } from "../../store/slices/notification-slice";

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.trim()
		.required("Required")
		.min(4, "At least 4 characters")
		.max(15, "At most 15 characters"),
	password: yup
		.string()
		.trim()
		.required("Required")
		.min(6, "At least 6 characters")
});

export default function LogIn({ setAuthType, handleModalClose }: FormProps) {
	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema,
		onSubmit: async values => {
			try {
				await dispatch(loginThunk(values)).unwrap();
				handleModalClose();
			} catch (err: any) {
				dispatch(
					notificationActions.showNotification({
						type: "error",
						message: err.message
					})
				);
			}
		}
	});

	return (
		<>
			<h1>Log into TikTok</h1>
			<form onSubmit={formik.handleSubmit}>
				<h3>Log in via username</h3>
				<Input
					placeholder="Username"
					name="username"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.username && formik.errors.username}
				/>
				<Input
					placeholder="Password"
					type="password"
					name="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.password && formik.errors.password}
				/>
				<button
					type="submit"
					className="primary-button"
					disabled={!formik.dirty || !formik.isValid}
				>
					Log In
				</button>
			</form>
			<div className="switch-state">
				Don't have an account?
				<span onClick={() => setAuthType("signup")}> Sign up</span>
			</div>
		</>
	);
}
