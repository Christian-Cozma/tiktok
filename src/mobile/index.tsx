import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./index.scss";
import Notification from "../common/components/notification";
import FullscreenSpinner from "../common/components/fullscreen-spinner";
import { useAppSelector } from "../common/store";
import AuthModal from "../common/components/auth-modal";
import PrivateRoute from "../common/components/private-route";
const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));
const OwnProfile = lazy(() => import("./pages/profile/OwnProfile"));
const Video = lazy(() => import("./pages/video"));
const EditProfile = lazy(() => import("./pages/edit-profile"));

export default function MobileLayout() {
	const { notification, authModal } = useAppSelector(state => state);

	return (
		<main className="root-container">
			{notification.show && (
				<Notification
					type={notification.type!}
					message={notification.message!}
					isMobile={true}
				/>
			)}
			{authModal.show && <AuthModal isMobile={true} />}
			<Suspense fallback={<FullscreenSpinner />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<OwnProfile />} />
					<Route path="/user/:username" element={<Profile />} />
					<Route path="/video/:videoId" element={<Video />} />
					<Route element={<PrivateRoute />}>
						<Route path="/edit-profile" element={<EditProfile />} />
					</Route>
				</Routes>
			</Suspense>
			<div id="portal" />
		</main>
	);
}
