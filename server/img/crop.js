const sharp = require('sharp');



// Kích thước và vị trí cắt
const width = 312;   // Chiều rộng ảnh sau khi cắt
const height = 312;  // Chiều cao ảnh sau khi cắt
const left = 50;     // Tọa độ x bắt đầu cắt
const top = 50;      // Tọa độ y bắt đầu cắt
async function cropImage(inputImagePath) {
    const output = 'output.jpg';
    try {
        await sharp(inputImagePath)
        .extract({ width: width, height: height, left: left, top: top })
        .toFile(output);
        console.log('Cắt ảnh thành công!');
        return output;
    } catch (err) {
        console.error('Lỗi khi cắt ảnh:', err);
        throw err;
    }
}  


  module.exports = { cropImage };