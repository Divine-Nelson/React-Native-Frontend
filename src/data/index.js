export const getProductDetails = ({ category, productId, deal, searchTerm }) => {
    let filteredProducts;

    if (productId) {
        filteredProducts = (product) => product.id === productId;
    } else if (deal) {
        filteredProducts = (product) => product.deal === true;
    } else if (category) {
        filteredProducts = (product) => product.category === category;
    } else if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredProducts = (product) =>
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.description.toLowerCase().includes(lowerCaseSearchTerm);
    } else {
        // Default case: return all products if no filters are provided
        return productData;
    }

    return productData.filter(filteredProducts);
};

export const productData = [
    { id: 1, name: "Hex Hantel", image: require('../assets/massage gun 9.jpg'), price: 100, currency: "kr", deal: false, category: "Dumbbells", description: "High-quality hexagonal dumbbell for versatile workouts, designed to provide a firm grip and ensure durability over time.", quantityAvailable: 35 },
    { id: 2, name: "Abilica Dumbbell", image: require('../assets/massage gun 13.jpg'), price: 100, currency: "kr", deal: false, category: "Dumbbells", description: "Durable Abilica dumbbell for strength training, perfect for home or gym use and crafted for superior performance.", quantityAvailable: 35 },
    { id: 3, name: "Abilica Dumbbell", image: require('../assets/massage gun 5.webp'), price: 100, currency: "kr", deal: false, category: "Dumbbells", description: "Compact and ergonomic Abilica dumbbell, ideal for a variety of strength exercises and easy to store.", quantityAvailable: 35 },
    { id: 4, name: "Rubber Hex Dumbbells", image: require('../assets/Massage gun 6.png'), price: 100, currency: "kr", deal: false, category: "Dumbbells", description: "Rubber-coated hex dumbbells for noise reduction, designed to protect your floors and enhance workout safety.", quantityAvailable: 35 },
    { id: 5, name: "Rubber Hex Dumbbells", image: require('../assets/newdumbell.jpg'), price: 100, currency: "kr", deal: false, category: "Dumbbells", description: "Durable and versatile hex dumbbells, suitable for both beginners and experienced fitness enthusiasts.", quantityAvailable: 35 },
    { id: 6, name: "Rubber Hex Dumbbells", image: require('../assets/newdumbell2.jpg'), price: 100, currency: "kr", deal: false, category: "Dumbbells", description: "Premium rubber hex dumbbells for strength training, featuring an ergonomic design for maximum comfort.", quantityAvailable: 35 },
    { id: 7, name: "Rubber Hex Dumbbells", image: require('../assets/preview2.png'), price: 100, currency: "kr", deal: true, category: "Dumbbells", description: "High-performance dumbbells on special deal, offering exceptional value and durability for your workouts.", quantityAvailable: 35 },
    { id: 20, name: "Rubber Hex Dumbbells", image: require('../assets/preview2.png'), price: 100, currency: "kr", deal: true, category: "Dumbbells", description: "Affordable rubber hex dumbbells on sale, designed for effective strength training and long-term use.", quantityAvailable: 35 },
    { id: 8, name: "Pink Yoga Mat", image: require('../assets/mats4.jpg'), price: 100, currency: "kr", deal: false, category: "Mats", description: "Stylish and non-slip pink yoga mat, perfect for yoga, pilates, and other floor exercises with added cushioning.", quantityAvailable: 35 },
    { id: 9, name: "Manduka Yoga Mats", image: require('../assets/mats7.jpg'), price: 100, currency: "kr", deal: false, category: "Mats", description: "Eco-friendly and durable Manduka yoga mat, offering excellent support and stability for every pose.", quantityAvailable: 35 },
    { id: 10, name: "Scandinavian Design", image: require('../assets/preview.jpg'), price: 100, currency: "kr", deal: true, category: "Mats", description: "Minimalistic Scandinavian yoga mat on offer, crafted for optimal performance and aesthetic appeal.", quantityAvailable: 35 },
    { id: 11, name: "Adidas Mats", image: require('../assets/addidas_mat.jpg'), price: 100, currency: "kr", deal: false, category: "Mats", description: "High-quality Adidas yoga mat for all levels, designed to provide comfort and durability during workouts.", quantityAvailable: 35 },
    { id: 12, name: "Elastic Band", image: require('../assets/band.jpg'), price: 100, currency: "kr", deal: false, category: "Bands", description: "Flexible and durable elastic exercise band, ideal for resistance training and rehabilitation exercises.", quantityAvailable: 35 },
    { id: 13, name: "Resistance Band", image: require('../assets/Band1.jpg'), price: 100, currency: "kr", deal: false, category: "Bands", description: "High-resistance band for strength training, designed to enhance your workout and build muscle effectively.", quantityAvailable: 35 },
    { id: 14, name: "Belus Resistance Band", image: require('../assets/preview.jpg'), price: 100, currency: "kr", deal: true, category: "Bands", description: "Premium Belus resistance band at a discount, perfect for versatile training and achieving fitness goals.", quantityAvailable: 35 },
    { id: 15, name: "Gestops Exercise Band", image: require('../assets/band4.jpg'), price: 100, currency: "kr", deal: false, category: "Bands", description: "Ergonomic and lightweight exercise band, offering excellent flexibility and durability for everyday use.", quantityAvailable: 35 },
    { id: 16, name: "DeerRun Massage Roller", image: require('../assets/preview.jpg'), price: 100, currency: "kr", deal: true, category: "Rollers", description: "Effective massage roller for muscle relief, designed to alleviate tension and improve recovery.", quantityAvailable: 35 },
    { id: 17, name: "321 Set", image: require('../assets/roller2.jpg'), price: 100, currency: "kr", deal: false, category: "Rollers", description: "Comprehensive 321 roller set for recovery, including multiple sizes for targeted muscle relief.", quantityAvailable: 35 },
    { id: 18, name: "5-in-1 Yoga Set", image: require('../assets/roller3.jpg'), price: 100, currency: "kr", deal: false, category: "Rollers", description: "Multi-functional 5-in-1 yoga set, ideal for enhancing your yoga practice and overall fitness routine.", quantityAvailable: 35 },
    { id: 19, name: "Foam Roller + Resistance Band", image: require('../assets/preview.jpg'), price: 100, currency: "kr", deal: true, category: "Rollers", description: "Combo foam roller and resistance band on sale, perfect for recovery and resistance training in one package.", quantityAvailable: 35 },
];

export const machinesData = [
    {id: 1, image: require("../assets/11.png"), },
    {id: 2, image: require("../assets/2.jpg"), },
    {id: 3, image: require("../assets/30.jpg"), },
    {id: 4, image: require("../assets/25.jpg"), },
    {id: 5, image: require("../assets/1.png"), },
];

export const popularMachines = [
    {id: 1, image: require("../assets/10.jpg"),},
    {id: 2, image: require("../assets/15.webp")},
    {id: 3, image: require("../assets/equipment.png")},
    {id: 4, image: require("../assets/machine.png")},
    {id: 5, image: require("../assets/machine.png")},
];