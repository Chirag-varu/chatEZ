import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, X, Edit2, Trash } from "lucide-react";
import Modal from "../Components/Modal";
import avatar from "../assets/avatar.png";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile, deleteProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [name, setName] = useState<string>(authUser?.name || "");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authUser?.profilePic) {
      setSelectedImg(authUser.profilePic);
    }
    if (authUser?.name) {
      setName(authUser.name);
    }
  }, [authUser?.profilePic, authUser?.name]);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      setImageChanged(true);
    };
  };

  const handleSave = async () => {
    if (authUser) {
      await updateProfile({ name, profilePic: selectedImg || "" });
    }
    setImageChanged(false);
    setIsEditingName(false);
    setReload(!reload);
    window.location.reload();
  };

  const handleCancel = () => {
    setSelectedImg(authUser?.profilePic || avatar);
    setName(authUser?.name || "");
    setImageChanged(false);
    setIsEditingName(false);
  };

  const handleDeleteAccount = async () => {
    setIsModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    await deleteProfile({ email: authUser?.email || "" });
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold dark:text-white text-gray-900">Profile</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-300">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="relative">
              <img
                src={selectedImg || avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 transition-transform transform hover:scale-105"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                  aria-label="Upload Profile Picture"
                />
              </label>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6 mt-8">
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="flex justify-between items-center cursor-pointer">
                <div className="text-sm text-gray-400 dark:text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsEditingName(!isEditingName)}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </label>
              {isEditingName ? (
                <input
                  id="name-input"
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border dark:border-gray-600 w-full"
                />
              ) : (
                <p className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                  {name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 dark:text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-medium dark:text-white text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-700 dark:border-gray-50">
                <span className="text-gray-500 dark:text-gray-400">Member Since</span>
                {authUser?.createdAt ? (
                  <span>{authUser.createdAt.split("T")[0]}</span>
                ) : (
                  <span>Loading...</span>
                )}

              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500 dark:text-gray-400">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

          {/* Save or Cancel Button Section */}
          {(imageChanged || name !== authUser?.name) ? (
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700 flex items-center gap-2"
              >
                <X className="w-5 h-5" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
              >
                Save Profile
              </button>
            </div>
          ) : (
            <div className="flex justify-end gap-6 mt-6">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 flex items-center gap-2"
              >
                <Trash className="w-5 h-5" /> Delete Account
              </button>
            </div>
          )}

          {/* Delete Account Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmDeleteAccount}
            title="Delete Account"
            description="Are you sure you want to delete your account? This action cannot be undone."
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
