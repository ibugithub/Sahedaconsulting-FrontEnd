import { useState } from "react";
import { EmploymentHistoryProps } from "../interface";
export const EmploymentHistory: React.FC<EmploymentHistoryProps> = ({userInfo, setUserInfo, isEditMode, protectedRoute}) => {
  const [isAddEmploymentBtnClicked, setIsAddEmploymentBtnClicked] = useState(false);

  const [employmentData, setEmploymentData] = useState({
    jobTitle: "",
    company: "",
    startDate: new Date(),
    endDate: new Date(),
  })
  const handleEmploymentHistoryChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const { name, value } = e.target;
    setUserInfo(prevUserInfo => {
      const updatedHistory = [...prevUserInfo.employmentHistory];
      updatedHistory[index] = {
        ...updatedHistory[index],
        [name]: field === 'startDate' || field === 'endDate' ? new Date(value) : value
      };
      return {
        ...prevUserInfo,
        employmentHistory: updatedHistory
      };
    });
  }

  const handleAddEmploymentHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmploymentData({ ...employmentData, [name]: value });
  }

  const handleSaveEmployment = async () => {
    setIsAddEmploymentBtnClicked(false)
    const updatedUserInfo = {
      ...userInfo,
      employmentHistory: [...userInfo.employmentHistory, employmentData]
    };
    setUserInfo(updatedUserInfo);
    const url = "/users/saveUserData";
    const response = await protectedRoute.post(url, {userInfo : updatedUserInfo});
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Employment History</h2>
      {userInfo.employmentHistory?.length && userInfo.employmentHistory?.length > 0 && (
        <>
          {isEditMode ? (
            userInfo.employmentHistory.map((job, index) => (
              <div key={index} className="mb-4">
                <input
                  className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
                  type="text"
                  value={job.jobTitle}
                  name="jobTitle"
                  placeholder="Job Title"
                  onChange={(e) => handleEmploymentHistoryChange(e, index, 'jobTitle')}
                />
                <input
                  className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
                  type="text"
                  name="company"
                  value={job.company}
                  placeholder="Company"
                  onChange={(e) => handleEmploymentHistoryChange(e, index, 'company')}
                />
                <input
                  className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
                  type="date"
                  name="startDate"
                  value={job.startDate ? new Date(job.startDate).toISOString().split('T')[0] : ''}
                  placeholder="Start Date"
                  onChange={(e) => handleEmploymentHistoryChange(e, index, 'startDate')}
                />
                <input
                  className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                  type="date"
                  name="endDate"
                  value={job.endDate ? new Date(job.endDate).toISOString().split('T')[0] : ''}
                  placeholder="End Date"
                  onChange={(e) => handleEmploymentHistoryChange(e, index, 'endDate')}
                />
              </div>
            ))
          ) : (
            userInfo.employmentHistory.map((job, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">Job Title:</span> {job.jobTitle}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">Company:</span> {job.company}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">Start Date:</span> {job.startDate ? new Date(job.startDate).toLocaleDateString() : ''}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">End Date:</span> {job.endDate ? new Date(job.endDate).toLocaleDateString() : ''}
                </p>
              </div>
            ))
          )}
        </>
      )}

      {isAddEmploymentBtnClicked && (
        <div className="mb-4">
          <input
            className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
            type="text"
            value={employmentData.jobTitle}
            name="jobTitle"
            placeholder="Job Title"
            onChange={(e) => handleAddEmploymentHistory(e)}
          />
          <input
            className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
            type="text"
            value={employmentData.company}
            name="company"
            placeholder="Company"
            onChange={(e) => handleAddEmploymentHistory(e)}
          />
          <input
            className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
            type="date"
            value={employmentData.startDate ? new Date(employmentData.startDate).toISOString().split('T')[0] : ''}
            name="startDate"
            placeholder="Start Date"
            onChange={(e) => handleAddEmploymentHistory(e)}
          />
          <input
            className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="date"
            value={employmentData.endDate ? new Date(employmentData.endDate).toISOString().split('T')[0] : ''}
            name="endDate"
            placeholder="End Date"
            onChange={(e) => handleAddEmploymentHistory(e)}
          />
          <button
            className="bg-purple-600 text-white p-2 rounded mt-2"
            onClick={handleSaveEmployment}
          >
            Add
          </button>
          <button
            className="bg-purple-600 text-white p-2 rounded mt-2 ml-2"
            onClick={() => { setIsAddEmploymentBtnClicked(false) }}
          >
            Cancel
          </button>
        </div>
      )}
      <button className="bg-green-300 p-2 rounded text-sm text-gray-700 mb-2" onClick={() => setIsAddEmploymentBtnClicked(true)}>
        Add Employment
      </button>

    </div>
  );
}