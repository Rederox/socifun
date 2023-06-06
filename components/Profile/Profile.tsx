/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { UserContext } from "@/contexts/UserProvider";
import { supabase } from "@/lib/supabaseClient";
import { Avatar } from "@bigheads/core";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { generateRandomAvatar } from "../Avatar/RandomAvatar";
import { MdModeEdit } from "react-icons/md";

type ProfileType = {
  avatar_url: string;
  avatarMode: string;
  username: string;
  full_name: string;
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarMode, setAvatarMode] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<Record<
    string,
    any
  > | null>(null);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Profile component must be used within a UserProvider");
  }

  const { user, setUser, loading } = context;
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, avatarMode, username, full_name")
          .eq("id", user?.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
          setUsername(data.username);
          setFullName(data.full_name);
          setAvatarUrl(data.avatar_url);
          setAvatarMode(data.avatarMode);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const openModal = () => {
    setIsEditing(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsEditing(false);
    setPreviewImage(null);
    document.body.style.overflow = "auto";
  };

  const updateProfile = async () => {
    if (user) {
      let newAvatarUrl = avatarUrl;
      if (avatarMode !== "avatar" && avatarFile) {
        const uniqueFileName = `${Date.now()}-${avatarFile.name}`;
        const filePath = `public/avatars/${user.id}/${uniqueFileName}`;
        let { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile);
        if (uploadError) {
          console.error("Error uploading avatar:", uploadError);
          return;
        }
        let { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
        newAvatarUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: newAvatarUrl,
          avatarMode: avatarMode,
          username: username,
          full_name: fullName,
        })
        .eq("id", user?.id);

      if (error) {
        if (error.code == "23505") {
          setErrorMsg("Le pseudo déja prise");
        } else {
          setErrorMsg(error.message);
        }

        console.error("Error updating profile:", error);
      } else {
        setPreviewImage(null);
        closeModal();
        location.reload();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      // Read the file as DataURL for preview.
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAndSetNewAvatar = () => {
    const newAvatar = generateRandomAvatar();
    setAvatarUrl(JSON.stringify(newAvatar));
    setPreviewAvatar(newAvatar);
  };

  return (
    <div className="bg-gray-900 text-white rounded-[8px]">
      <div className="relative bg-gray-800 rounded-[8px]">
        <Image
          src={"/bannerCrop.jpg"}
          alt={"banner"}
          width={970}
          height={250}
          className="object-fill w-full rounded-[8px]"
          priority
        />
        <button
          onClick={openModal}
          className="absolute top-0 right-0 m-4 flex items-center gap-2 bg-[#2e2e52] text-white rounded-md px-4 py-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
        >
          <MdModeEdit />
          Edit
        </button>
      </div>
      <div className="flex items-center md:justify-center md:-mt-16 mt-2 rounded-sm md:flex-col gap-2 relative">
        <div className="md:w-32 md:h-32 w-16 h-16 rounded-full md:border-4 border-2 border-[#1a1a2e] bg-[#2e2e52] overflow-hidden">
          {user ? (
            profile?.avatarMode === "image" ? (
              <Image
                src={profile?.avatar_url}
                alt={"Profile"}
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            ) : profile?.avatarMode === "avatar" ? (
              <Avatar
                {...JSON.parse(profile?.avatar_url)}
                className="rounded-full"
              />
            ) : (
              <></>
            )
          ) : (
            <Image
              src={"/assets/login.svg"}
              alt={"Profile"}
              width={128}
              height={128}
              className="object-cover rounded-full"
            />
          )}
        </div>
        <div>
          <h1 className="md:text-3xl font-bold">{profile?.full_name}</h1>
          <h3 className="md:text-[20px] text-[13px] text-gray-400  font-bold">
            @{profile?.username}
          </h3>
        </div>
      </div>

      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="w-4/5 max-w-md bg-[#1a202c] text-white p-5 rounded-md flex flex-col gap-4 mx-auto">
            <h2 className="text-center text-xl font-bold">
              Modifier le profile
            </h2>

            <label>
              Pseudo
              <input
                type="text"
                value={username ? username : ""}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Pseudo"
                className="transition duration-300 ease-in-out bg-gray-800 text-white w-full rounded-md px-3 py-2 mt-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </label>
            <div>
              {
                errorMsg && (
                  < p className=" text-red-600">{errorMsg}</p>
                )
              }
            </div>

            <label>
              Nom
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nom"
                className="transition duration-300 ease-in-out bg-gray-800 text-white w-full rounded-md px-3 py-2 mt-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </label>

            <label>
              Mode d'avatar
              <select
                value={avatarMode}
                onChange={(e) => setAvatarMode(e.target.value)}
                className="transition duration-300 ease-in-out bg-gray-800 text-white w-full rounded-md px-3 py-2 mt-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="image">Image</option>
                <option value="avatar">Avatar</option>
              </select>
            </label>

            <label>
              Avatar
              {avatarMode === "avatar" ? (
                <button
                  onClick={generateAndSetNewAvatar}
                  className="transition duration-300 ease-in-out bg-gray-800 text-white w-full rounded-md px-3 py-2 mt-2 cursor-pointer hover:bg-gray-700"
                >
                  Generate Random Avatar
                </button>
              ) : (
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="transition duration-300 ease-in-out bg-gray-800 text-white w-full rounded-md px-3 py-2 mt-2 cursor-pointer hover:bg-gray-700"
                />
              )}
            </label>
            {previewImage && avatarMode === "image" ? (
              <div className="mt-2 flex items-center justify-center">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={150}
                  height={150}
                  className="object-cover rounded-full border bg-[#21243d] p-2"
                />
              </div>
            ) : (
              previewAvatar && (
                <div className=" flex items-center justify-center w-[100%] ">
                  <div className="h-[150px] w-[150px] rounded-full border bg-[#21243d] p-2">
                    <Avatar {...previewAvatar} />
                  </div>
                </div>
              )
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <button
                onClick={updateProfile}
                className="transition duration-300 ease-in-out bg-blue-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-500"
              >
                Enregistrer le changement
              </button>
              <button
                onClick={closeModal}
                className="transition duration-300 ease-in-out bg-red-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-red-500"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Profile;
