type EditProfileProps = {
  handleSaveChanges: () => Promise<void>;
  toggleEditMode: () => void;
};


export const EditProfile = ({ handleSaveChanges, toggleEditMode }: EditProfileProps) => {
  return (

    <div className="w-full flex justify-between gap-4">
    <button
      onClick={handleSaveChanges}
      className="w-full bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-500 hover:to-green-700 transition-colors duration-300"
    >
      Save Changes
    </button>
    <button
      onClick={toggleEditMode}
      className="w-full bg-gradient-to-br from-gray-400 to-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-gray-500 hover:to-gray-700 transition-colors duration-300"
    >
      Cancel
    </button>
  </div>
  )

}