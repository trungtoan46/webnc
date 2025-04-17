import React from 'react';
import { FormControl, TextInput, Textarea } from '@primer/react';
import CurrencyInput from 'react-currency-input-field';

const ProductForm = ({ formData, handleChange, handlePriceChange, categories = [] }) => {
  return (
    <div className="space-y-4">
      <FormControl>
        <FormControl.Label className="text-gray-700 font-medium">Tên sản phẩm</FormControl.Label>
        <TextInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nhập tên sản phẩm"
          required
          className="text-gray-800"
        />
      </FormControl>

      <FormControl>
        <FormControl.Label className="text-gray-700 font-medium">Mô tả</FormControl.Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả sản phẩm"
          rows={4}
          className="text-gray-800"
        />
      </FormControl>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormControl>
          <FormControl.Label className="text-gray-700 font-medium">Giá gốc</FormControl.Label>
          <CurrencyInput
            name="price"
            value={formData.price}
            onValueChange={(value) => handlePriceChange(value || '')}
            placeholder="Nhập giá sản phẩm"
            prefix="₫"
            groupSeparator=","
            decimalSeparator="."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label className="text-gray-700 font-medium">Giá khuyến mãi</FormControl.Label>
          <CurrencyInput
            name="sale_price"
            value={formData.sale_price}
            onValueChange={(value) => {
              handleChange({
                target: {
                  name: 'sale_price',
                  value: value || ''
                }
              });
            }}
            placeholder="Nhập giá khuyến mãi"
            prefix="₫"
            groupSeparator=","
            decimalSeparator="."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
          />
          <FormControl.Caption className="text-gray-500 text-sm mt-1">Để trống nếu không có khuyến mãi</FormControl.Caption>
        </FormControl>
      </div>

      <FormControl>
        <FormControl.Label className="text-gray-700 font-medium">Danh mục</FormControl.Label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
          required
        >
          <option value="" className="text-gray-500">Chọn danh mục</option>
          {categories.map(category => (
            <option 
              key={category._id} 
              value={category._id}
              className="text-gray-800"
            >
              {category.name}
            </option>
          ))}
        </select>
      </FormControl>

      <FormControl>
        <FormControl.Label className="text-gray-700 font-medium">Trạng thái</FormControl.Label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
        >
          <option value="active" className="text-gray-800">Đang bán</option>
          <option value="inactive" className="text-gray-800">Ngừng bán</option>
          <option value="draft" className="text-gray-800">Nháp</option>
        </select>
      </FormControl>
    </div>
  );
};

export default ProductForm; 