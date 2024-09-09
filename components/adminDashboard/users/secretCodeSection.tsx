import { Eye, EyeOff, Trash2, Copy, Plus, ClipboardCheck  } from 'lucide-react';
import { AxiosRequests } from "../../utils/axiosRequests";
import { useState } from 'react';
import { secretCodeInterface } from '@/components/interface';
import { toast } from 'react-toastify';

export const SecretCodesSection = () => {
  const protectedRoute = AxiosRequests();
  const [secretCodes, setSecretCodes] = useState<secretCodeInterface[]>([]);
  const [showSecretCodes, setShowSecretCodes] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const getSecretCodes = async () => {
    const url = '/admin/showSecretCodes';
    const response = await protectedRoute.get(url);
    if (response.status === 201) {
      setSecretCodes(response.data.codes);
    }
  };

  const showAllCodes = async () => {
    setShowSecretCodes(!showSecretCodes);
    getSecretCodes();
  };

  const generateSecretCode = async () => {
    const url = '/admin/createSecretCode';
    const response = await protectedRoute.post(url);
    if (response.status === 201) {
      getSecretCodes();
      toast.success("Secret Code Generated Successfully");
    }
  };

  const deleteSecretCode = async (id: string) => {
    const url = `/admin/deleteSecretCode/${id}`;
    const response = await protectedRoute.delete(url);
    if (response.status === 201) {
      getSecretCodes();
      toast.success("Secret Code Deleted Successfully");
    }
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 3000);
  };

  return (
    <div className="mt-12">
      <button
        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out flex items-center mb-4"
        onClick={showAllCodes}
      >
        {showSecretCodes ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
        {showSecretCodes ? "Hide Secret Codes" : "Show Secret Codes"}
      </button>

      {showSecretCodes && (
        <div className="bg-white shadow-md rounded-lg p-6">
          {secretCodes.length > 0 ? (
            <div className="space-y-4">
              {secretCodes.map((secretCode) => (
                <div key={secretCode._id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <span className="text-gray-700 font-mono">{secretCode.code}</span>
                  <div className="space-x-2">
                    <button
                      title='Copy Secret Code'
                      className={`transition duration-300 ease-in-out`}
                      onClick={() => handleCopy(secretCode.code, secretCode._id)}
                    >
                      {copiedCodeId === secretCode._id ? <ClipboardCheck  size={20} /> : <Copy size={20} />}
                    </button>
                    <button
                      title='Delete Secret Code'
                      className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                      onClick={() => deleteSecretCode(secretCode._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No secret codes available.</p>
          )}
          <button
            onClick={generateSecretCode}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out flex items-center"
          >
            <Plus className="mr-2" /> Generate New Secret Code
          </button>
        </div>
      )}
    </div>
  );
};
