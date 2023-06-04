import React from 'react';

interface ProfileProps {
    bannerUrl: string;
    avatarUrl: string;
    username: string;
    fullName: string;
}

const Profile: React.FC<ProfileProps> = ({ bannerUrl, avatarUrl, username, fullName }) => {
    return (
        <div className="bg-gray-900 text-white">
            <div className="bg-gray-800 h-40 flex items-center justify-center">
                <img src={bannerUrl} alt="Banner" className="object-cover w-full h-full" />
            </div>
            <div className="flex items-center justify-center -mt-16">
                <img src={avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-gray-900" />
            </div>
            <div className="text-center mt-4">
                <h1 className="text-3xl font-bold">{username}</h1>
                <p className="text-gray-400">{fullName}</p>
            </div>
        </div>
    );
};

export default Profile;
