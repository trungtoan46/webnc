import React from 'react';
import { FormControl, TextInput, Textarea } from '@primer/react';
import { FiUpload } from 'react-icons/fi';

const ProductForm = ({ 
  formData, 
  handleChange, 
  handleThumbnailChange, 
  handleDetailImagesChange,
  thumbnailFile,
  selectedFiles,
  handleImageDelete,
  prices,
  handlePriceChange
}) => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-base font-semibold text-blue-600 mb-4 text-center">Thông Tin</h3>
        <FormControl>
          <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
            Tên Sản Phẩm
          </FormControl.Label>
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Áo thun mùa hè"
            sx={{
              "& input": {
                color: "#1F2937",
                textAlign: "left",
                padding: "4px",
                border: "2px solid #d1d5db",
                borderRadius: "8px",
              }
            }}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px", marginTop: "10px" }}>
            Mô Tả Sản Phẩm
          </FormControl.Label>
          <Textarea   
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả sản phẩm"
            rows={4}
            sx={{
              "& textarea": {
                color: "#1F2937",
                textAlign: "left",
                border: "2px solid #d1d5db",
                borderRadius: "8px",
                padding: "10px"
              }
            }}
          />
        </FormControl>
      </section>

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
              src={URL.createObjectURL(thumbnailFile)} 
              alt="Ảnh đại diện" 
              className="w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-150 transition-transform group-hover:scale-150"
            />
            <button 
              onClick={() => setThumbnailFile(null)}
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
        <div className="mt-4 flex gap-10 flex-wrap">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Ảnh ${index + 1}`} 
                className="w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-150 transition-transform group-hover:scale-150"
              />
              <button 
                onClick={() => handleImageDelete(index)}
                className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold shadow-md transition-transform group-hover:translate-x-[50%] group-hover:translate-y-[-50%] group-hover:scale-150"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">Giá</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormControl id="price-input">
            <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
              Giá Sản Phẩm
            </FormControl.Label>
            <TextInput
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Nhập giá"
              sx={{
                "& input": {
                  color: "#1F2937",
                  textAlign: "center",
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                },
                width: "80%"
              }}
            />
            <div className='flex gap-5 justify-center'>
              {prices.map((price, index) => (
                <button 
                  key={index} 
                  className='text-sm text-blue-600 text-center block bg-gray-100 p-[5px] rounded-full'
                  onClick={() => handlePriceChange(price.value)}
                >
                  {price.value.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </button>
              ))}
            </div>
          </FormControl>
          <FormControl>
            <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
              Số Lượng
            </FormControl.Label>
            <TextInput
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Nhập số lượng"
              sx={{
                "& input": {
                  color: "#1F2937",
                  textAlign: "center",
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                },
                width: "80%"
              }}
            />
          </FormControl>
        </div>
      </section>
    </div>
  );
};

export default ProductForm; 