import React from 'react';
import { FiUpload } from 'react-icons/fi';

const ProductImages = ({ 
  thumbnailFile, 
  setThumbnailFile, 
  selectedFiles, 
  handleThumbnailChange,
  handleDetailImagesChange,
  handleImageDelete 

}) => {
  

  return (
    <div>
      <section>
        <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">
          Hình Ảnh Đại Diện
        </h3>
        <label className="border-2 border-dashed rounded-lg p-8 
          text-center bg-gray-50 cursor-pointer w-full h-36
          flex flex-col items-center justify-center">
          <FiUpload className="mx-auto h-12 w-12 text-blue-400" />
          <div className="mt-2">
            <p className="text-blue-600 font-medium">Thêm Tệp</p>
            <p className="text-sm text-gray-500">Hoặc kéo và thả tệp</p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleThumbnailChange}
          />
        </label>
        {thumbnailFile && (
          <div className="mt-4 relative group w-24 h-24">
            <img 
              src={typeof thumbnailFile === 'object' 
                      ? URL.createObjectURL(thumbnailFile) 
                      : thumbnailFile} 
              alt="Ảnh đại diện" 
              className="w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-150 transition-transform group-hover:scale-150"
            />
            <button 
              onClick={() => {
                setThumbnailFile(null);
              }}
              className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold shadow-md transition-transform group-hover:translate-x-[50%] group-hover:translate-y-[-50%] group-hover:scale-150"
            >
              ✕
            </button>
          </div>
        )}

      </section>

      <section>
        <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">
          Hình Ảnh Chi Tiết
        </h3>
        <label className="border-2 border-dashed rounded-lg p-8 
          text-center bg-gray-50 cursor-pointer w-full h-36
          flex flex-col items-center justify-center">
          <FiUpload className="mx-auto h-12 w-12 text-blue-400" />
          <div className="mt-2">
            <p className="text-blue-600 font-medium">Thêm Tệp</p>
            <p className="text-sm text-gray-500">Hoặc kéo và thả tệp</p>
          </div>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleDetailImagesChange}
          />
        </label>
        <div className="mt-4 flex gap-4 flex-wrap">
          {selectedFiles && selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <img 
                src={typeof file === 'object' 
                        ? URL.createObjectURL(file) 
                        : file}   
                alt={`Ảnh ${index + 1}`} 
                className="w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-150 transition-transform group-hover:scale-150"
              />
              <button 
                onClick={() => handleImageDelete(index)}
                className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold shadow-md transition-transform group-hover:translate-x-[50%] group-hover:translate-y-[-50%] group-hover:scale-150"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 text-xs bg-black bg-opacity-50 text-white p-1 text-center truncate">
                {typeof file === 'object' ? 'New Image' : 'Saved Image'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductImages; 