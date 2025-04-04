import React, { useState } from 'react';
import { FormControl, TextInput, Select, Textarea } from '@primer/react';
import { FiUpload } from 'react-icons/fi';

const AddProduct = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    weight: '',
    hasOptions: false,
    isDigital: false,
    tags: [],
    images: []
  });

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSizeClick = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleAddTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleColorClick = (color) => { 
    if (colors.includes(color)) {
      setColors(colors.filter(c => c !== color));
    } else {
      setColors([...colors, color]);
    }   
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-xl font-semibold text-blue-600">Add Product</h2>
            <div className="space-x-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-3 divide-x">
            <div className="col-span-2 p-6">
              <div className="space-y-6">
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-center">Information</h3>
                  <FormControl className="mb-4">
                    <label className="text-sm font-medium text-gray-900 text-center block">Product Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Summer T-Shirt"
                      className="text-gray-900 border-2 border-gray-300 rounded-md p-2"
                    />
                  </FormControl>

                  <FormControl>
                    <label className="text-sm font-medium text-gray-700 text-center block">Product Description</label>
                    <textarea   
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Product description here"
                      rows={4}
                      className="text-gray-900 w-3/4 border-2 border-gray-300 rounded-md p-2"
                    />
                  </FormControl>
                </section>

                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">
                    Images</h3>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
                    <FiUpload className="mx-auto h-12 w-12 text-blue-400" />
                    <div className="mt-2">
                      <p className="text-blue-600 font-medium">Add File</p>
                      <p className="text-sm text-gray-500">Or drag and drop files</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images, ...Array.from(e.target.files)]
                        }));
                      }}
                    />
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-semibold text-blue-600
                   mb-4 text-left">Price</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormControl>
                      <label className="text-sm font-medium text-gray-700 text-center block">Product Price</label>
                      <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="text-gray-900 text-center border-2 
                        border-gray-300 rounded-md w-4/5"
                      />
                    </FormControl>

                    <FormControl>
                      <label className="text-sm font-medium text-gray-700 text-center block">Discount Price</label>
                      <input
                        name="discountPrice"
                        type="number"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        placeholder="VND"
                        className="text-gray-900 text-center border-2
                         border-gray-300 rounded-md w-4/5"
                      />
                    </FormControl>                    
                  </div>

                  
                </section>
                    <div className="">
                      <FormControl className="mb-4">
                        <label className="text-sm font-medium text-gray-700 text-center block">Size</label>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                              key={size}
                              onClick={() => handleSizeClick(size)}
                              className={`px-3 py-1 rounded font-medium ${
                                sizes.includes(size)
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                      </FormControl>
                      <FormControl>
                        <label className="text-sm font-medium text-gray-700 text-center block">Color</label>
                        <div className="flex flex-wrap gap-2 justify-center ">
                          {['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White'].map(color => (
                            <button key={color}
                              onClick={() => handleColorClick(color)}   
                              className={`px-3 py-1 rounded font-medium ${
                                colors.includes(color)  
                                  ? `bg-${color.toLowerCase()}-100 text-${color.toLowerCase()}-500`
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {color}
                            </button >   
                          ))}
                        </div>
                      </FormControl>
                    </div>
                  

                
              </div>
            </div>

            <div className="p-6 bg-gray-50">
              <div className="space-y-6">
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">Categories</h3>
                  <div className="space-y-2 flex flex-col items-center justify-start">
                    <div className='w-full text-left'>
                    <select name="category" id="category" 
                    className="text-gray-900 border-2
                     border-gray-300 rounded-md mb-4 w-1/3">
                      <option value="">Select Category</option>
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="tshirt">T-Shirt</option>
                      <option value="hoodie">Hoodie</option>
                    </select>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800
                    text-sm font-medium text-left w-full">Create New</button>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">Tags</h3>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-200 rounded-full text-sm
                           text-gray-700 flex items-center"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      placeholder="Add tags"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTag(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="text-gray-900 w-full text-left border-2
                       border-gray-300 rounded-md mb-4 p-2"
                    />
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-blue-600">T-Shirt</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-blue-600">Men Clothes</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-blue-600">Summer Collection</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-center">SEO Settings</h3>
                  <FormControl className="mb-4">
                    <label className="text-sm font-medium text-gray-700 text-center block">Title</label>
                    <input
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleChange}
                      className="text-gray-900 text-center border-2
                       border-gray-300 rounded-md mb-4"
                    />
                  </FormControl>

                  <FormControl>
                    <label className="text-sm font-medium text-gray-700 text-center block">Description</label>
                    <textarea
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleChange}
                      rows={3}
                      className="text-gray-900 text-center border-2
                       border-gray-300 rounded-md mb-4"
                    />
                  </FormControl>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
