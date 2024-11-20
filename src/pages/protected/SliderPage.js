import React, { useState, useEffect } from 'react';
import TitleCard from '../../components/Cards/TitleCard';

const Slider = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [selectedImages, setSelectedImages] = useState([]); // Track selected images

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://3.108.36.199:5000/api/slider/GetSliderImages');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();

        if (data.success && data.Data && Array.isArray(data.Data) && data.Data.length > 0) {
          // Ensure we access the first element and images array safely
          setImages(data.Data[0].images || []);
        } else {
          console.error("Error: API did not return success or no images found.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = (id) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== id));
  };

  // Handle image selection
  const handleImageSelection = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + selectedImages.length <= 4) {
      setSelectedImages((prevImages) => [...prevImages, ...selectedFiles]);
    } else {
      alert('You can only select up to 4 images.');
    }
  };

  // Handle image upload
  const handleAddImages = () => {
    setImages((prevImages) => [...prevImages, ...selectedImages.map(file => URL.createObjectURL(file))]);
    setSelectedImages([]); // Reset selected images after adding
    setShowModal(false); // Close the modal
  };

  return (
    <TitleCard title={'Slider'} topMargin="mt-2">
    <div className="slider-container p-4">

      <div className="grid grid-cols-2 gap-6">
        {images.length > 0 ? (
          images.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`Slider ${index + 1}`}
                className="w-full h-[200px] object-cover rounded-md shadow-lg"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No images available. Upload some to view them here.
          </p>
        )}
      </div>

      {/* Add Image Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Image
        </button>
      </div>

      {/* Modal for selecting images */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Select Images (Max 4)</h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelection}
              className="mb-4 p-2 border rounded-lg"
            />
            <div className="mb-4">
              {selectedImages.length > 0 && (
                <div>
                  <h3 className="font-semibold">Selected Images:</h3>
                  <ul>
                    {selectedImages.map((image, index) => (
                      <li key={index} className="text-sm">{image.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddImages}
                className="px-4 py-6  bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Images
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </TitleCard>
  );
};

export default Slider;