import { apiClient } from ".";
import { UserQuery } from "../types";

const userURL = "/user";

const shortParams: UserQuery = {
	name: "1",
	description: "1",
	followers: "num",
	totalLikes: "1"
};
export const getShortUser = (username: string) =>
	apiClient.get(userURL + "/" + username, { params: shortParams });

const params: UserQuery = {
	...shortParams,
	name: "1",
	following: "num",
	videos: "uploaded"
};
export const getUser = (username: string) =>
	apiClient.get(userURL + "/" + username, { params });

export const getLikedVideos = (username: string) =>
	apiClient.get(userURL + "/" + username, { params: { videos: "liked" } });
