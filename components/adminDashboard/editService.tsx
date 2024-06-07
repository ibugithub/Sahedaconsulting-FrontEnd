
import { useState } from "react";
import axios from "axios";
import { Service } from "../interface";
import { toast } from "react-toastify";
import { AxiosRequests } from "../utils/axiosRequests";

interface EditServiceProps {
  service: Service;
  onSave: () => void;
  onCancel: () => void;
}

export const EditService = ({ service, onSave, onCancel }: EditServiceProps) => {
  const protectedRoute = AxiosRequests();
  const [editedService, setEditedService] = useState({
    _id: service._id,
    title: service.title,
    description: service.description,
    price: service.price,
    imgPath: service.image,
    imgFile: null as File | unknown
  })
  const [isImageChanged, setIsChangedImage] = useState(false);

  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isChanged =
      service._id !== editedService?._id ||
      service.title !== editedService?.title ||
      service.description !== editedService?.description ||
      service.price !== editedService?.price ||
      isImageChanged;
    if (isChanged) {
      try {
        const url = `/service/edit/${editedService._id}`
        const response = await protectedRoute.put(url, editedService, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('response is ', response)
        if (response.status === 200) {
          toast.success('Product updated successfully')
        }

      } catch (err) {
        console.error("Error updating product", err);
      }
    }
    onSave();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedService({ ...editedService, [e.target.name]: e.target.value })
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (!selectedImage) {
      setError('Please choose a file')
      return;
    }
    setEditedService({ ...editedService, imgFile: selectedImage })
    setIsChangedImage(true)
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Service</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <span className="text-red-500">{error}</span>
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedService.title}
            placeholder="Service"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full text-xl font-bold text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editedService.description}
            placeholder="Description"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-600"
            rows={3}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedService.price}
            placeholder="Price"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 font-semibold"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            placeholder="Image"
            onChange={handleChangeImg}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}