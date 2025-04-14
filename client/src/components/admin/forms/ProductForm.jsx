import React from 'react';
import { FormControl, TextInput, Textarea } from '@primer/react';
import { FiUpload } from 'react-icons/fi';


const prices = [
  { value: 100000, label: '100.000 VNĐ' },
  { value: 200000, label: '200.000 VNĐ' },
  { value: 300000, label: '300.000 VNĐ' }

]

const ProductForm = ({ 
  formData, 
  handleChange, 
  handlePriceChange,
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