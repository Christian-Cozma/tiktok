import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import "./upload-page.scss";
import Container from "../../components/container";
import Input from "../../components/input-field";
import { apiClient } from "../../../common/api";
import { notificationActions } from "../../store/slices/notification-slice";
import { RootState } from "../../../common/store";

const validationSchema = yup.object().shape({
	caption: yup.string().required("Required").max(150, "At most 150 characters"),
	music: yup.string().max(30, "At most 30 characters"),
	tags: yup.string().required("Required").max(100, "At most 100 characters")
});

const sizeLimit = 20971520; // 20MB

export default function UploadPage() {
	const [videoFile, setVideoFile] = useState<File>();
	const dispatch = useDispatch();
	const { username, token } = useSelector<RootState, any>(state => state.auth);

	const formik = useFormik({
		initialValues: {
			caption: "",
			music: "",
			tags: ""
		},
		validationSchema,
		onSubmit: async values => {
			try {
				if (!videoFile || videoFile.type !== "video/mp4")
					return dispatch(
						notificationActions.showNotification({
							type: "error",
							message: "Invalid video."
						})
					);

				if (videoFile.size > sizeLimit)
					return dispatch(
						notificationActions.showNotification({
							type: "error",
							message: "File too large"
						})
					);

				const formData = new FormData();
				formData.append("caption", values.caption);
				formData.append("tags", values.tags);
				formData.append("music", values.music);
				formData.append("video", videoFile);
				formData.append("username", username);
				formData.append("token", token);

				const res = await apiClient.post("/video/create", formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});

				console.log("in submit", res);
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
		<Container className="upload-page-container">
			<div className="card">
				<header>
					<h1>Upload video</h1>
					<h4>Post a video to your account</h4>
				</header>
				<div className="card-body">
					<label htmlFor="video">
						<div className="video-portion">
							{videoFile?.type === "video/mp4" ? (
								<video src={URL.createObjectURL(videoFile)} autoPlay muted>
									Your browser does not support videos.
								</video>
							) : (
								<>
									<i className="fas fa-video" />
									<h4>Select video to upload</h4>
									<p>
										<span>MP4 format</span>
										<span>9 / 16 aspect ratio (preferred)</span>
										<span>Less than 20 MB</span>
									</p>
								</>
							)}
							<input
								type="file"
								accept="video/mp4"
								id="video"
								onChange={e => setVideoFile(e.target.files?.[0])}
							/>
						</div>
					</label>
					<form className="description-portion" onSubmit={formik.handleSubmit}>
						<div className="form-group">
							<label htmlFor="caption">Caption</label>
							<Input
								id="caption"
								className="input"
								name="caption"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.caption && formik.errors.caption}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags</label>
							<Input
								id="tags"
								className="input"
								name="tags"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.tags && formik.errors.tags}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="music">Music</label>
							<Input
								id="music"
								className="input"
								name="music"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.music && formik.errors.music}
							/>
						</div>
						<button
							type="submit"
							className="primary-button"
							disabled={!formik.dirty || !formik.isValid || !videoFile}
						>
							Post
						</button>
					</form>
				</div>
			</div>
		</Container>
	);
}