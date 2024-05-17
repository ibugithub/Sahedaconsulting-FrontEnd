type EditProfileProps = {
  handleSaveChanges: () => Promise<void>;
  toggleEditMode: () => void;
};


export const EditProfile = ({handleSaveChanges, toggleEditMode} : EditProfileProps)  => {
  return (
      <div className="flex justify-start w-full">
    <button
      type="button"
      className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 mr-2"
      onClick={handleSaveChanges}
    >
      Save
    </button>
    <button
      type="button"
      className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
      onClick={toggleEditMode}
    >
      Cancel
    </button>
  </div>
  )

}