"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

function UserProfile({ params }) {
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	const [userPosts, setUserPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params?.userId}/posts`);
			const data = await response.json();

			setUserPosts(data);
		};

		if (params?.userId) {
			fetchPosts();
		}
	}, [params.userId]);

	return <Profile name={userName} desc={`Welcome to ${userName}'s profile page.`} data={userPosts} />;
}

export default UserProfile;
