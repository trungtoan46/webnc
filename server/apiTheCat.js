const { TheCatAPI } = require("@thatapicompany/thecatapi");
const e = require("express");
const { get } = require("mongoose");
const theCatAPI = new TheCatAPI("live_yVw0kGZkpx9LlMGtP160fwixaePXrnv0WQ31ugvG4Hb4UjqbKXnosBuVIn3CRfcN");
const { Category } = require("./model");
const { name } = require("ejs");
const connectDB = require('./database');
connectDB();
// theCatAPI.images
//   .searchImages({
//     limit: 6,
//     has_breeds: true,
//   })
//   .then((images) => {
//     console.log(images);
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   });
// async/await
async function getImages() {
    try {
    const images = await theCatAPI.images.searchImages({
        limit: 6,
        has_breeds: true,

    });
    console.log(images);
    } catch (error) {
    // handle error
    console.log(error);
    }
}





async function getBreedName() {
    const categories = await Category.find({});
    try{
        const breedEntries = Object.entries(breedNames[0]);
        const randomIndex = Math.floor(Math.random() * breedEntries.length);
        const englishBreedName = breedEntries[randomIndex][0];
        const existingCategory = categories.find(category => category.name === englishBreedName);
        if (!existingCategory){
            return breedNames[0][englishBreedName];
        }else{
            return existingCategory.name;
        }
        
    }catch(e){
        console.log(e)
    }
}
const breedNames =[
    {
        "Abyssinian": "Mèo Abyssinian",
        "Aegean": "Mèo Aegean",
        "American Bobtail": "Mèo Bobtail Mỹ",
        "American Curl": "Mèo American Curl (Mèo Xoăn Mỹ)",
        "American Shorthair": "Mèo Mỹ Lông Ngắn",
        "American Wirehair": "Mèo American Wirehair",
        "Arabian Mau": "Mèo Mau Ả Rập",
        "Australian Mist": "Mèo Sương mù Úc",
        "Balinese": "Mèo Balinese",
        "Bambino": "Mèo Bambino",
        "Bengal": "Mèo Bengal",
        "Birman": "Mèo Birman",
        "Bombay": "Mèo Bombay",
        "British Longhair": "Mèo Anh Lông Dài",
        "British Shorthair": "Mèo Anh Lông Ngắn",
        "Burmese": "Mèo Miến Điện",
        "Burmilla": "Mèo Burmilla",
        "California Spangled": "Mèo California Spangled",
        "Chantilly-Tiffany": "Mèo Chantilly-Tiffany",
        "Chartreux": "Mèo Chartreux",
        "Chausie": "Mèo Chausie",
        "Cheetoh": "Mèo Cheetoh",
        "Colorpoint Shorthair": "Mèo Lông Ngắn Colorpoint",
        "Cornish Rex": "Mèo Cornish Rex",
        "Cymric": "Mèo Cymric",
        "Cyprus": "Mèo Cyprus",
        "Devon Rex": "Mèo Devon Rex",
        "Donskoy": "Mèo Donskoy",
        "Dragon Li": "Mèo Dragon Li",
        "Egyptian Mau": "Mèo Mau Ai Cập",
        "European Burmese": "Mèo Burmese Châu Âu",
        "Exotic Shorthair": "Mèo Exotic Shorthair",
        "Havana Brown": "Mèo Havana Brown",
        "Himalayan": "Mèo Himalayan",
        "Japanese Bobtail": "Mèo Bobtail Nhật",
        "Javanese": "Mèo Javanese",
        "Khao Manee": "Mèo Khao Manee",
        "Korat": "Mèo Korat",
        "Kurilian": "Mèo Kurilian",
        "LaPerm": "Mèo LaPerm",
        "Maine Coon": "Mèo Maine Coon",
        "Malayan": "Mèo Malayan",
        "Manx": "Mèo Manx",
        "Munchkin": "Mèo Munchkin",
        "Nebelung": "Mèo Nebelung",
        "Norwegian Forest Cat": "Mèo Rừng Na Uy",
        "Ocicat": "Mèo Ocicat",
        "Oriental": "Mèo Oriental",
        "Persian": "Mèo Ba Tư",
        "Pixie-bob": "Mèo Pixie-bob",
        "Ragamuffin": "Mèo Ragamuffin",
        "Ragdoll": "Mèo Ragdoll",
        "Russian Blue": "Mèo Nga Xanh",
        "Savannah": "Mèo Savannah",
        "Scottish Fold": "Mèo Tai Cụp Scotland",
        "Selkirk Rex": "Mèo Selkirk Rex",
        "Siamese": "Mèo Xiêm",
        "Siberian": "Mèo Siberian",
        "Singapura": "Mèo Singapura",
        "Snowshoe": "Mèo Snowshoe",
        "Somali": "Mèo Somali",
        "Sphynx": "Mèo Sphynx",
        "Tonkinese": "Mèo Tonkinese",
        "Toyger": "Mèo Toyger",
        "Turkish Angora": "Mèo Thổ Nhĩ Kỳ Angora",
        "Turkish Van": "Mèo Thổ Nhĩ Kỳ Van",
        "York Chocolate": "Mèo York Chocolate"
      }
      
]


module.exports = {getImages, getBreedName};
