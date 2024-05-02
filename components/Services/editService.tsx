
import { useState } from "react";
import axios from "axios";
import { Service } from "../interface";
import { toast } from "react-toastify";

interface EditServiceProps {
  service: Service;
  onSave: () => void;
  onCancel: () => void;
}

export const EditService = ({ service, onSave, onCancel }: EditServiceProps) => {

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
        const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/service/edit/${editedService._id}`
        const response = await axios.put(url, editedService, {
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
    <>
      <form onSubmit={handleSubmit} className="py-5 flex flex-col gap-2 w-[250px] items-start">
        <span className="text-red-500">{error}</span>
        <input type="text" name="title" value={editedService.title} placeholder="Service" onChange={handleChange} />
        <textarea cols={20} rows={2} name="description" value={editedService.description} placeholder="Description" onChange={handleChange} />
        <input type="number" name="price" value={editedService.price} placeholder="Price" onChange={handleChange} />
        <input type="file" name="image" placeholder="Image" onChange={handleChangeImg} />
        <div className="flex gap-2">
          <button className="bg-blue-300 py-1 px-3" type="submit">Save</button>
          <button className="bg-red-300 py-1 px-3" type="button" onClick={onCancel}>Cancel</button>
        </div>

      </form>
    </>
  );
}