import { useState } from "react";
// import { useParams } from "react-router-dom";

import "./profile.scss";
import Container from "../../components/container";
import Sidebar, { suggestedAccounts } from "../../components/sidebar";
import ProfileButtons from "../../components/profile-buttons";
import ProfileCard from "../../components/profile-card";
import LazyModal from "../../components/video-modal/LazyModal";

const user = {
	userId: "1",
	profilePhoto:
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Narendra_Modi_2021.jpg/1200px-Narendra_Modi_2021.jpg",
	name: "Narendra Modi",
	username: "narendramodi",
	followingNum: "102",
	followersNum: "20M",
	totalLikes: "50M",
	description:
		"The absolute throat goat and I mean that shit. No one can come close to me when it comes to gulping down a fat one. Oh, and also the PM of India or whatever who cares lol bye",
	videos: [
		"https://v39-eu.tiktokcdn.com/67c569b77da2a2697a8f0ea141f46eb2/6192973e/video/tos/useast2a/tos-useast2a-ve-0068c002/16ec2693dd73454692f17a8cc39c7532/?a=1233&br=2708&bt=1354&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~R8F8rkag3-I&l=202111151121530101890501594C0982E8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZwbmk6ZjlvOTMzNzczM0ApPDNmNDk1OjtmN2c0OzY4aWdwMl5gcjRnNDVgLS1kMTZzczRfNTUtMmAvLWEuXi1gNTU6Yw%3D%3D&vl=&vr=",
		"https://v39-eu.tiktokcdn.com/67c569b77da2a2697a8f0ea141f46eb2/6192973e/video/tos/useast2a/tos-useast2a-ve-0068c002/16ec2693dd73454692f17a8cc39c7532/?a=1233&br=2708&bt=1354&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~R8F8rkag3-I&l=202111151121530101890501594C0982E8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZwbmk6ZjlvOTMzNzczM0ApPDNmNDk1OjtmN2c0OzY4aWdwMl5gcjRnNDVgLS1kMTZzczRfNTUtMmAvLWEuXi1gNTU6Yw%3D%3D&vl=&vr=",
		"https://v39-eu.tiktokcdn.com/67c569b77da2a2697a8f0ea141f46eb2/6192973e/video/tos/useast2a/tos-useast2a-ve-0068c002/16ec2693dd73454692f17a8cc39c7532/?a=1233&br=2708&bt=1354&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~R8F8rkag3-I&l=202111151121530101890501594C0982E8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZwbmk6ZjlvOTMzNzczM0ApPDNmNDk1OjtmN2c0OzY4aWdwMl5gcjRnNDVgLS1kMTZzczRfNTUtMmAvLWEuXi1gNTU6Yw%3D%3D&vl=&vr=",
		"https://v39-eu.tiktokcdn.com/67c569b77da2a2697a8f0ea141f46eb2/6192973e/video/tos/useast2a/tos-useast2a-ve-0068c002/16ec2693dd73454692f17a8cc39c7532/?a=1233&br=2708&bt=1354&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~R8F8rkag3-I&l=202111151121530101890501594C0982E8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZwbmk6ZjlvOTMzNzczM0ApPDNmNDk1OjtmN2c0OzY4aWdwMl5gcjRnNDVgLS1kMTZzczRfNTUtMmAvLWEuXi1gNTU6Yw%3D%3D&vl=&vr=",
		"https://v39-eu.tiktokcdn.com/67c569b77da2a2697a8f0ea141f46eb2/6192973e/video/tos/useast2a/tos-useast2a-ve-0068c002/16ec2693dd73454692f17a8cc39c7532/?a=1233&br=2708&bt=1354&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZ~R8F8rkag3-I&l=202111151121530101890501594C0982E8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajZwbmk6ZjlvOTMzNzczM0ApPDNmNDk1OjtmN2c0OzY4aWdwMl5gcjRnNDVgLS1kMTZzczRfNTUtMmAvLWEuXi1gNTU6Yw%3D%3D&vl=&vr="
	],
	caption: "hello",
	likesNum: "11K",
	commentsNum: "11K",
	sharesNum: "11K",
	music: "PAW - Bardi C",
	uploadTime: "20h ago"
};

let videoInd: number;

export default function Profile() {
	// const {username} = useParams();
	const [showModal, setShowModal] = useState(false);

	function handleModalOpen(ind: number) {
		document.documentElement.style.overflowY = "hidden";
		videoInd = ind;
		setShowModal(true);
	}

	return (
		<Container className="profile-page-container">
			<Sidebar />
			<LazyModal
				showModal={showModal}
				setShowModal={setShowModal}
				{...user}
				video={user.videos[videoInd]}
			/>
			<div className="profile-container">
				<header>
					<div className="rounded-photo">
						<img src={user.profilePhoto} alt={user.name} />
					</div>
					<div className="names">
						<h1>{user.username}</h1>
						<h4>{user.name}</h4>
						<button className="primary-button">Follow</button>
					</div>
				</header>
				<div className="user-details">
					<div className="counts">
						<p>
							<strong>{user.followingNum}</strong> Following
						</p>
						<p>
							<strong>{user.followersNum}</strong> Followers
						</p>
						<p>
							<strong>{user.totalLikes}</strong> Likes
						</p>
					</div>
					<p className="description">{user.description}</p>
				</div>
				<div className="suggested">
					<h5>
						<span>Suggested accounts</span>
						<span className="see-all">See all</span>
					</h5>
					<div className="account-buttons">
						{suggestedAccounts.slice(0, 3).map((acc, i) => (
							<div key={i} className="acc-btn">
								<div className="rounded-photo">
									<img src={acc.photo} alt={acc.name} />
								</div>
								<h4>{acc.username}</h4>
							</div>
						))}
					</div>
				</div>
				<ProfileButtons />
				<div className="profile-cards-container">
					{user.videos.map((video, i) => (
						<ProfileCard
							key={i}
							index={i}
							video={video}
							handleModalOpen={handleModalOpen}
						/>
					))}
				</div>
			</div>
		</Container>
	);
}