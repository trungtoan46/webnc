import React from 'react';
import { FormControl, TextInput, Textarea } from '@primer/react';
import { FiUpload } from 'react-icons/fi';

const EventForm = ({ 
  formData, 
  handleChange, 
  handleImageChange,
  imageFile
}) => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-base font-semibold text-blue-600 mb-4 text-center">Thông Tin Sự Kiện</h3>
        <FormControl>
          <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
            Tên Sự Kiện
          </FormControl.Label>
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Black Friday"
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
            Mô Tả Sự Kiện
          </FormControl.Label>
          <Textarea   
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả sự kiện"
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

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormControl>
            <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
              Ngày Bắt Đầu
            </FormControl.Label>
            <TextInput
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              sx={{
                "& input": {
                  color: "#1F2937",
                  textAlign: "left",
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                },
                width: "100%"
              }}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
              Ngày Kết Thúc
            </FormControl.Label>
            <TextInput
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
              sx={{
                "& input": {
                  color: "#1F2937",
                  textAlign: "left",
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                },
                width: "100%"
              }}
            />
          </FormControl>
        </div>

        <FormControl className="mt-4">
          <FormControl.Label sx={{ color: "#2563eb", marginBottom: "10px" }}>
            Trạng Thái
          </FormControl.Label>
          <select
            name="is_active"
            value={formData.is_active}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md text-gray-900"
          >
            <option value={true}>Kích hoạt</option>
            <option value={false}>Vô hiệu hóa</option>
          </select>
        </FormControl>
      </section>

      <section>
        <h3 className="text-base font-semibold text-blue-600 mb-4">Hình Ảnh</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <div className="mb-3">
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <FiUpload className="text-blue-500 text-2xl mb-2" />
                <span className="text-sm text-gray-500">Tải lên hình ảnh sự kiện</span>
              </div>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          
          {imageFile && (
            <div className="relative mt-4">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Event preview"
                className="h-40 w-auto mx-auto object-contain rounded-md"
              />
              <button
                onClick={() => handleImageChange(null)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                ×
              </button>
            </div>
          )}
          
          {formData.image && !imageFile && (
            <div className="relative mt-4">
              <img
                src={formData.image}
                alt="Event"
                className="h-40 w-auto mx-auto object-contain rounded-md"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventForm; 