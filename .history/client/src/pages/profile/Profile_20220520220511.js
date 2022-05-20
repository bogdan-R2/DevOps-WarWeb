import React, { useState, useEffect } from 'react';
import ProfileCard from './../components/ProfileCard';
import { useAuth } from '../contexts/AuthContext';
import { useFetch } from '../contexts/FetchContext';
import Navigation from '../components/Navigation';

const Profile = () => {
	const { currentUser } = useAuth();
	const { fetchUserData, fetchUserType } = useFetch();
	const [userType, setUserType] = useState({ value: {}, isFetching: false });
	const [userData, setUserData] = useState({ value: {}, isFetching: false });

	useEffect(() => {
		const setAsyncUserType = async () => {
			try {
				// Initially, userType.value is set {}
				setUserType({ value: userType.value, isFetching: true });
				const type = await fetchUserType(currentUser);
				setUserType({ value: type, isFetching: false });
			} catch (err) {
				console.log(err);
				setUserType({ value: userType.value, isFetching: false });
			}
		};

		const setAsyncUserData = async () => {
			try {
				// Initially, userData.value is set {}
				setUserData({ value: userData.value, isFetching: true });
				const data = await fetchUserData(currentUser);
				setUserData({ value: data, isFetching: false });
			} catch (err) {
				console.log(err);
				setUserData({ value: userData.value, isFetching: false });
			}
		};

		setAsyncUserType();
		setAsyncUserData();
	}, []); // it's only called once after mounting - due to []

	return (
		<>
			{/* The page is going to load only after the data has been fetched */}
			{!userData.isFetching && !userType.isFetching && (
				<>
					<Navigation userType={userType.value} userData={userData.value} />
					<br />
					<ProfileCard
						userType={userType.value}
						userData={userData.value}
					/>
				</>
			)}
		</>
	);
};

export default Profile;
