const express = require('express');
const app = express();
const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
  
      if (!category) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }
  
      res.json({ message: "Xóa danh mục thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });
  
  
  
  
  router.put('/:id', async (req, res) => {
    try {
      const { name } = req.body;
      const updated_at = new Date();
      console.log(req.body)
      if (!name) {
        return res.status(400).json({ message: "Vui lòng nhập tên danh mục" });
      }
  
      const category = await Category.findByIdAndUpdate(req.params.id, { name, updated_at }, { new: true });
  
      if (!category) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }
  
      res.json({ message: "Cập nhật danh mục thành công", category });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });
  
  
  router.post('/', async (req, res) =>{
    try{
      const name = req.body.name;
      const created_at = new Date();
      const updated_at = new Date();
  
      if (!name){
        return res.status(400).json({message: "Vui lòng nhập tên danh mục"});
      }
      
      // Check if category already exists
      const existingCategory = await Category.findOne({ name });
      if (!existingCategory) {
        const newCategory = new Category({ name, created_at, updated_at });
        await newCategory.save();
        res.status(201).json({ message: "Thêm danh mục thành công" });
      }else{
        res.status(400).json ({message: "Danh mục đã tồn tại"})
      }
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi: ", error: error.message });
    }
  });
  
  // Handle 404 
  router.use(function (req, res, next) {
    res.status(404).send("Page Not Found");
  });
  //random
  router.post('/rnd', async (req, res) =>{
    try{
      const radCategories = await getBreedName();
      res.status(200).json(radCategories);
    }catch (error){
      console.log(error);
      res.status(500).json({ message: "Error retrieving random category", error: error.message });
    }
  });
  
module.exports = router;
