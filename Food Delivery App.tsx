// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// start
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import * as echarts from 'echarts';
const App: React.FC = () => {
// Add Tailwind animation classes
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}
@keyframes slideInRight {
from { transform: translateX(100%); }
to { transform: translateX(0); }
}
@keyframes scaleIn {
from { transform: scale(0.95); opacity: 0; }
to { transform: scale(1); opacity: 1; }
}
.animate-fadeIn {
animation: fadeIn 0.3s ease-out;
}
.animate-slideInRight {
animation: slideInRight 0.3s ease-out;
}
.animate-scaleIn {
animation: scaleIn 0.3s ease-out;
}
`;
document.head.appendChild(style);
const [isCartOpen, setIsCartOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState('All');
const [isDarkMode, setIsDarkMode] = useState(false);
const [notifications, setNotifications] = useState([
{
id: 1,
title: 'Order Confirmed',
message: 'Your order #12345 has been confirmed',
time: '2 mins ago',
isRead: false
},
{
id: 2,
title: 'Delivery Update',
message: 'Your order is on the way',
time: '5 mins ago',
isRead: false
}
]);
const [showNotifications, setShowNotifications] = useState(false);
const [showFeatures, setShowFeatures] = useState(false);
const [unreadNotifications, setUnreadNotifications] = useState(2);
useEffect(() => {
if (selectedCategory === 'All') {
setPopularDishes(allDishes);
} else {
const filteredDishes = allDishes.filter(dish => dish.category === selectedCategory);
setPopularDishes(filteredDishes);
}
}, [selectedCategory]);
const [cartItems, setCartItems] = useState<Array<{
id: number;
name: string;
price: number;
quantity: number;
specialInstructions?: string;
spicyLevel?: 'regular' | 'spicy';
extraCheese?: boolean;
}>>([]);
const [relatedItems, setRelatedItems] = useState<Array<{id: number; name: string; price: number; description: string; image: string}>>([]);
const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
const [showOrderProcess, setShowOrderProcess] = useState(false);
const [selectedDish, setSelectedDish] = useState<{
id: number;
name: string;
price: number;
description: string;
image: string;
ingredients?: string[];
nutritionFacts?: {
calories: number;
protein: number;
carbs: number;
fat: number;
};
preparationTime?: string;
chefNote?: string;
quantity?: number;
specialInstructions?: string;
spicyLevel?: 'regular' | 'spicy';
extraCheese?: boolean;
} | null>(null);
const categories = [
{ id: 1, name: 'All', icon: 'fa-solid fa-utensils' },
{ id: 2, name: 'Pizza', icon: 'fa-solid fa-pizza-slice' },
{ id: 3, name: 'Burgers', icon: 'fa-solid fa-burger' },
{ id: 4, name: 'Sushi', icon: 'fa-solid fa-fish' },
{ id: 5, name: 'Desserts', icon: 'fa-solid fa-ice-cream' },
{ id: 6, name: 'Indian', icon: 'fa-solid fa-bowl-food' },
{ id: 7, name: 'Seafood', icon: 'fa-solid fa-fish-fins' },
{ id: 8, name: 'Ice Cream', icon: 'fa-solid fa-ice-cream' },
{ id: 9, name: 'Chicken', icon: 'fa-solid fa-drumstick-bite' },
{ id: 10, name: 'Vegetables', icon: 'fa-solid fa-carrot' },
];
const restaurantRelatedItems = {
1: [ // The Gourmet Kitchen related items
{
id: 501,
name: 'Beef Wellington',
price: 45.99,
description: 'Premium beef tenderloin wrapped in puff pastry',
image: 'https://public.readdy.ai/ai/img_res/d700e9c01788616c182923abd639a5c0.jpg'
},
{
id: 502,
name: 'Lobster Thermidor',
price: 52.99,
description: 'Classic French lobster dish with rich cream sauce',
image: 'https://public.readdy.ai/ai/img_res/198855308985ddb47f4b78e76e0bb972.jpg'
}
],
2: [ // Sushi Master related items
{
id: 601,
name: 'Omakase Set',
price: 89.99,
description: 'Chef\'s selection of premium sushi and sashimi',
image: 'https://public.readdy.ai/ai/img_res/4cfbdc42b233aa11d4a55c838a9efcc9.jpg'
},
{
id: 602,
name: 'Wagyu Nigiri',
price: 32.99,
description: 'Seared A5 wagyu beef nigiri with truffle',
image: 'https://public.readdy.ai/ai/img_res/464d5d5edaffbeaf5369d18a08002dd5.jpg'
}
],
3: [ // Burger Paradise related items
{
id: 701,
name: 'Truffle Burger',
price: 28.99,
description: 'Black truffle infused beef patty with aged cheddar',
image: 'https://public.readdy.ai/ai/img_res/dda6a9f209420ce212471037cc73be21.jpg'
},
{
id: 702,
name: 'Surf & Turf Burger',
price: 34.99,
description: 'Premium beef patty topped with butter poached lobster',
image: 'https://public.readdy.ai/ai/img_res/993f50064d0f153ba493677d84e258b3.jpg'
}
]
};
const restaurants = [
{
id: 1,
name: 'The Gourmet Kitchen',
rating: 4.8,
deliveryTime: '25-35',
minOrder: 15,
cuisine: 'International',
image: 'https://public.readdy.ai/ai/img_res/698002e2675eaf5cfbd6c13ae8e99b9d.jpg'
},
{
id: 2,
name: 'Sushi Master',
rating: 4.9,
deliveryTime: '30-40',
minOrder: 20,
cuisine: 'Japanese',
image: 'https://public.readdy.ai/ai/img_res/b3cc718ede217467daac1d666a3033be.jpg'
},
{
id: 3,
name: 'Burger Paradise',
rating: 4.6,
deliveryTime: '20-30',
minOrder: 12,
cuisine: 'American',
image: 'https://public.readdy.ai/ai/img_res/1f951f1fe72fcad6a17807264154fbcc.jpg'
},
];
const allDishes = [
// Indian Food
{
id: 39,
category: 'Indian',
name: 'Biryani Feast',
price: 21.99,
description: 'Aromatic basmati rice with tender meat and spices',
image: 'https://public.readdy.ai/ai/img_res/f2327730932ffddbd6f15d669ac4f91c.jpg',
ingredients: ['Basmati Rice', 'Meat', 'Saffron', 'Indian Spices', 'Fried Onions', 'Mint'],
nutritionFacts: {
calories: 720,
protein: 38,
carbs: 65,
fat: 42
},
preparationTime: '30-35 minutes',
chefNote: 'Our signature biryani is slow-cooked to perfection with premium spices.'
},
{
id: 40,
category: 'Indian',
name: 'Palak Paneer',
price: 16.99,
description: 'Creamy spinach curry with cottage cheese',
image: 'https://public.readdy.ai/ai/img_res/ed10d374b6825e00d6edd8f0b47d53f7.jpg',
ingredients: ['Fresh Spinach', 'Cottage Cheese', 'Cream', 'Indian Spices', 'Garlic', 'Ginger'],
nutritionFacts: {
calories: 450,
protein: 22,
carbs: 28,
fat: 32
},
preparationTime: '25-30 minutes',
chefNote: 'A healthy and delicious vegetarian curry made with fresh spinach.'
},
{
id: 41,
category: 'Indian',
name: 'Tandoori Platter',
price: 27.99,
description: 'Assorted tandoor-grilled meats and breads',
image: 'https://public.readdy.ai/ai/img_res/20597cde6a823c711295523e8404b522.jpg',
ingredients: ['Chicken', 'Lamb', 'Naan', 'Yogurt', 'Tandoori Spices', 'Mint Chutney'],
nutritionFacts: {
calories: 850,
protein: 52,
carbs: 45,
fat: 48
},
preparationTime: '35-40 minutes',
chefNote: 'A feast of tandoor-grilled delicacies perfect for sharing.'
},
{
id: 42,
category: 'Indian',
name: 'Dal Makhani',
price: 15.99,
description: 'Creamy black lentils simmered overnight',
image: 'https://public.readdy.ai/ai/img_res/64ac2df049e4c4c5faa36b8959ee0318.jpg',
ingredients: ['Black Lentils', 'Cream', 'Butter', 'Tomatoes', 'Indian Spices', 'Garlic'],
nutritionFacts: {
calories: 420,
protein: 18,
carbs: 48,
fat: 22
},
preparationTime: '40-45 minutes',
chefNote: 'Our signature dal is slow-cooked for 24 hours for perfect texture.'
},
{
id: 43,
category: 'Indian',
name: 'Rogan Josh',
price: 23.99,
description: 'Kashmiri-style lamb curry with aromatic spices',
image: 'https://public.readdy.ai/ai/img_res/6332468d09c52f8ecc4ca878937a34da.jpg',
ingredients: ['Lamb', 'Yogurt', 'Kashmiri Chilies', 'Indian Spices', 'Onions', 'Garlic'],
nutritionFacts: {
calories: 580,
protein: 35,
carbs: 25,
fat: 42
},
preparationTime: '35-40 minutes',
chefNote: 'A royal Kashmiri curry made with traditional spices and tender lamb.'
},
// Seafood
{
id: 44,
category: 'Seafood',
name: 'Lobster Thermidor',
price: 42.99,
description: 'Baked lobster with rich cream sauce',
image: 'https://public.readdy.ai/ai/img_res/5fcb4c20dab3b6575680ba4b47ec6897.jpg',
ingredients: ['Lobster', 'Cream', 'Gruyere Cheese', 'Mustard', 'White Wine', 'Herbs'],
nutritionFacts: {
calories: 680,
protein: 42,
carbs: 18,
fat: 48
},
preparationTime: '35-40 minutes',
chefNote: 'A classic French preparation featuring premium lobster.'
},
{
id: 45,
category: 'Seafood',
name: 'Seafood Paella',
price: 36.99,
description: 'Spanish rice with mixed seafood',
image: 'https://public.readdy.ai/ai/img_res/44f370f375597de0d48bbde8c160d033.jpg',
ingredients: ['Saffron Rice', 'Shrimp', 'Mussels', 'Squid', 'Bell Peppers', 'Peas'],
nutritionFacts: {
calories: 620,
protein: 32,
carbs: 65,
fat: 28
},
preparationTime: '40-45 minutes',
chefNote: 'Authentic Spanish paella made with premium seafood and saffron.'
},
{
id: 46,
category: 'Seafood',
name: 'Cioppino',
price: 34.99,
description: 'San Francisco-style seafood stew',
image: 'https://public.readdy.ai/ai/img_res/71a95ba2a1a166da74024545f28a4034.jpg',
ingredients: ['Mixed Seafood', 'Tomatoes', 'White Wine', 'Fennel', 'Herbs', 'Garlic'],
nutritionFacts: {
calories: 480,
protein: 45,
carbs: 22,
fat: 24
},
preparationTime: '35-40 minutes',
chefNote: 'A hearty seafood stew featuring the freshest catch of the day.'
},
{
id: 47,
category: 'Seafood',
name: 'Miso Black Cod',
price: 38.99,
description: 'Miso-glazed black cod with sake',
image: 'https://public.readdy.ai/ai/img_res/55cbb13c7908af44615e229e6bd3d45d.jpg',
ingredients: ['Black Cod', 'Miso Paste', 'Sake', 'Mirin', 'Sugar', 'Ginger'],
nutritionFacts: {
calories: 420,
protein: 38,
carbs: 15,
fat: 26
},
preparationTime: '30-35 minutes',
chefNote: 'Marinated for 72 hours in our special miso blend.'
},
{
id: 48,
category: 'Seafood',
name: 'Seafood Tower',
price: 89.99,
description: 'Luxurious tower of fresh seafood',
image: 'https://public.readdy.ai/ai/img_res/908dd282a210c2c63816779aa1e483f9.jpg',
ingredients: ['Lobster', 'Oysters', 'Shrimp', 'Crab', 'Mignonette', 'Cocktail Sauce'],
nutritionFacts: {
calories: 720,
protein: 85,
carbs: 12,
fat: 35
},
preparationTime: '25-30 minutes',
chefNote: 'A stunning presentation of the finest fresh seafood.'
},
// Ice Cream
{
id: 49,
category: 'Ice Cream',
name: 'Truffle Chocolate',
price: 11.99,
description: 'Dark chocolate ice cream with truffle',
image: 'https://public.readdy.ai/ai/img_res/4b62cfc0430cf308ebd757b580272b63.jpg',
ingredients: ['Dark Chocolate', 'Truffle', 'Cream', 'Vanilla', 'Gold Leaf', 'Sea Salt'],
nutritionFacts: {
calories: 380,
protein: 6,
carbs: 35,
fat: 24
},
preparationTime: '5-10 minutes',
chefNote: 'Made with premium dark chocolate and real truffle shavings.'
},
{
id: 50,
category: 'Ice Cream',
name: 'Pistachio Rose',
price: 10.99,
description: 'Persian-inspired pistachio rose ice cream',
image: 'https://public.readdy.ai/ai/img_res/d3e5dc67e85bffcc79b247f58452f805.jpg',
ingredients: ['Pistachios', 'Rose Water', 'Cream', 'Milk', 'Honey', 'Rose Petals'],
nutritionFacts: {
calories: 320,
protein: 8,
carbs: 28,
fat: 22
},
preparationTime: '5-10 minutes',
chefNote: 'A delicate blend of Persian flavors and premium pistachios.'
},
{
id: 51,
category: 'Ice Cream',
name: 'Caramel Macchiato',
price: 9.99,
description: 'Coffee ice cream with caramel swirl',
image: 'https://public.readdy.ai/ai/img_res/83b39c7d1d6ae262dae3005edd87a6e1.jpg',
ingredients: ['Coffee', 'Caramel', 'Cream', 'Milk', 'Chocolate Shavings', 'Sea Salt'],
nutritionFacts: {
calories: 340,
protein: 5,
carbs: 42,
fat: 18
},
preparationTime: '5-10 minutes',
chefNote: 'Made with premium espresso and house-made caramel sauce.'
},
{
id: 52,
category: 'Ice Cream',
name: 'Berry Pavlova',
price: 12.99,
description: 'Mixed berry ice cream with meringue',
image: 'https://public.readdy.ai/ai/img_res/2b35f5403f0c6336a4b7b7b623b30977.jpg',
ingredients: ['Mixed Berries', 'Meringue', 'Cream', 'Vanilla', 'Berry Compote', 'Mint'],
nutritionFacts: {
calories: 290,
protein: 4,
carbs: 45,
fat: 12
},
preparationTime: '5-10 minutes',
chefNote: 'A refreshing blend of seasonal berries and crispy meringue.'
},
{
id: 53,
category: 'Ice Cream',
name: 'Salted Caramel Pretzel',
price: 10.99,
description: 'Salted caramel ice cream with pretzel bits',
image: 'https://public.readdy.ai/ai/img_res/704093f112eefb607cd4f46971b9a220.jpg',
ingredients: ['Caramel', 'Pretzels', 'Cream', 'Sea Salt', 'Vanilla', 'Toffee Bits'],
nutritionFacts: {
calories: 360,
protein: 6,
carbs: 48,
fat: 16
},
preparationTime: '5-10 minutes',
chefNote: 'The perfect balance of sweet and salty flavors.'
},
// Chicken
{
id: 54,
category: 'Chicken',
name: 'Coq au Vin',
price: 28.99,
description: 'Classic French braised chicken in wine',
image: 'https://public.readdy.ai/ai/img_res/170d17384cdb23832d97272853fe585a.jpg',
ingredients: ['Chicken', 'Red Wine', 'Pearl Onions', 'Mushrooms', 'Bacon', 'Herbs'],
nutritionFacts: {
calories: 580,
protein: 42,
carbs: 18,
fat: 38
},
preparationTime: '45-50 minutes',
chefNote: 'A classic French dish slow-cooked to perfection.'
},
{
id: 55,
category: 'Chicken',
name: 'Nashville Hot',
price: 22.99,
description: 'Spicy Nashville-style fried chicken',
image: 'https://public.readdy.ai/ai/img_res/343088e402bdcc8d5037860e75163314.jpg',
ingredients: ['Chicken', 'Cayenne', 'Spices', 'Pickles', 'White Bread', 'Honey'],
nutritionFacts: {
calories: 720,
protein: 45,
carbs: 35,
fat: 48
},
preparationTime: '25-30 minutes',
chefNote: 'Our take on the Nashville classic with adjustable heat levels.'
},
{
id: 56,
category: 'Chicken',
name: 'Chicken Marsala',
price: 24.99,
description: 'Italian-style chicken with marsala wine',
image: 'https://public.readdy.ai/ai/img_res/45bc944c31ef5aa09fe9e60db0ae3467.jpg',
ingredients: ['Chicken', 'Marsala Wine', 'Mushrooms', 'Garlic', 'Herbs', 'Butter'],
nutritionFacts: {
calories: 520,
protein: 38,
carbs: 15,
fat: 32
},
preparationTime: '30-35 minutes',
chefNote: 'Made with authentic Italian marsala wine and fresh mushrooms.'
},
{
id: 57,
category: 'Chicken',
name: 'Peruvian Rotisserie',
price: 25.99,
description: 'Peruvian-style rotisserie chicken',
image: 'https://public.readdy.ai/ai/img_res/937484c9708c236f22710da65df03d45.jpg',
ingredients: ['Chicken', 'Peruvian Spices', 'Lime', 'Garlic', 'Cilantro', 'Aji Sauce'],
nutritionFacts: {
calories: 620,
protein: 48,
carbs: 12,
fat: 42
},
preparationTime: '40-45 minutes',
chefNote: 'Marinated for 24 hours in our special Peruvian spice blend.'
},
{
id: 58,
category: 'Chicken',
name: 'Chicken Katsu Curry',
price: 21.99,
description: 'Japanese curry with crispy chicken',
image: 'https://public.readdy.ai/ai/img_res/719234fe2714c4eb19a0492a3ca7b0fb.jpg',
ingredients: ['Chicken', 'Japanese Curry', 'Rice', 'Panko', 'Pickles', 'Tonkatsu Sauce'],
nutritionFacts: {
calories: 680,
protein: 35,
carbs: 75,
fat: 28
},
preparationTime: '25-30 minutes',
chefNote: 'Crispy chicken cutlet with our signature Japanese curry sauce.'
},
// Vegetables
{
id: 59,
category: 'Vegetables',
name: 'Ratatouille',
price: 19.99,
description: 'Classic French vegetable stew',
image: 'https://public.readdy.ai/ai/img_res/346afca1bde952481200693ef3cf421c.jpg',
ingredients: ['Eggplant', 'Zucchini', 'Tomatoes', 'Bell Peppers', 'Herbs', 'Olive Oil'],
nutritionFacts: {
calories: 280,
protein: 8,
carbs: 35,
fat: 16
},
preparationTime: '35-40 minutes',
chefNote: 'A beautiful presentation of classic Provençal vegetables.'
},
{
id: 60,
category: 'Vegetables',
name: 'Truffle Risotto',
price: 24.99,
description: 'Creamy mushroom risotto with truffle',
image: 'https://public.readdy.ai/ai/img_res/dc5059a1389ccf6fc6b3a82af52a0fbe.jpg',
ingredients: ['Arborio Rice', 'Mushrooms', 'Truffle', 'Parmesan', 'White Wine', 'Herbs'],
nutritionFacts: {
calories: 420,
protein: 12,
carbs: 65,
fat: 18
},
preparationTime: '30-35 minutes',
chefNote: 'Made with premium Italian rice and fresh truffles.'
},
{
id: 61,
category: 'Vegetables',
name: 'Mediterranean Platter',
price: 22.99,
description: 'Assorted grilled Mediterranean vegetables',
image: 'https://public.readdy.ai/ai/img_res/384f2d91c08d0c6faefa89f79d383555.jpg',
ingredients: ['Mixed Vegetables', 'Hummus', 'Pita', 'Olive Oil', 'Za\'atar', 'Tahini'],
nutritionFacts: {
calories: 380,
protein: 12,
carbs: 45,
fat: 22
},
preparationTime: '25-30 minutes',
chefNote: 'A healthy and flavorful selection of grilled vegetables.'
},
{
id: 62,
category: 'Vegetables',
name: 'Thai Green Curry',
price: 18.99,
description: 'Vegetable curry with coconut milk',
image: 'https://public.readdy.ai/ai/img_res/4a3486fd61ec70b893fa245b3f25aa0c.jpg',
ingredients: ['Mixed Vegetables', 'Coconut Milk', 'Green Curry Paste', 'Thai Basil', 'Lime Leaves', 'Rice'],
nutritionFacts: {
calories: 320,
protein: 8,
carbs: 38,
fat: 18
},
preparationTime: '25-30 minutes',
chefNote: 'A fragrant Thai curry made with authentic ingredients.'
},
{
id: 63,
category: 'Vegetables',
name: 'Cauliflower Steak',
price: 20.99,
description: 'Roasted cauliflower with herb sauce',
image: 'https://public.readdy.ai/ai/img_res/8f0a80228d0a7bc0cd02084b175ffeed.jpg',
ingredients: ['Cauliflower', 'Herbs', 'Garlic', 'Pine Nuts', 'Olive Oil', 'Lemon'],
nutritionFacts: {
calories: 260,
protein: 8,
carbs: 22,
fat: 18
},
preparationTime: '25-30 minutes',
chefNote: 'A creative vegetarian take on a classic steak presentation.'
},
{
id: 29,
category: 'Indian',
name: 'Butter Chicken with Naan',
price: 18.99,
description: 'Creamy tomato curry with tender chicken and fresh naan bread',
image: 'https://public.readdy.ai/ai/img_res/a378cd91929f207f58189e169b1b8040.jpg',
ingredients: ['Chicken', 'Tomato', 'Cream', 'Butter', 'Indian Spices', 'Naan Bread'],
nutritionFacts: {
calories: 650,
protein: 35,
carbs: 48,
fat: 38
},
preparationTime: '25-30 minutes',
chefNote: 'Our signature butter chicken features a rich, creamy tomato sauce and tender chicken pieces.'
},
{
id: 30,
category: 'Indian',
name: 'Garlic Butter Chapathi',
price: 12.99,
description: 'Whole wheat flatbread with garlic butter',
image: 'https://public.readdy.ai/ai/img_res/23278c24531531c1a5406d6cf554c730.jpg',
ingredients: ['Whole Wheat Flour', 'Garlic', 'Butter', 'Herbs', 'Salt'],
nutritionFacts: {
calories: 380,
protein: 8,
carbs: 52,
fat: 18
},
preparationTime: '20-25 minutes',
chefNote: 'Traditional Indian flatbread enhanced with aromatic garlic butter.'
},
// Seafood
{
id: 31,
category: 'Seafood',
name: 'Grilled Salmon',
price: 28.99,
description: 'Fresh Atlantic salmon with lemon herb butter',
image: 'https://public.readdy.ai/ai/img_res/666846ab25b7ff45840e782d4f63ae1a.jpg',
ingredients: ['Atlantic Salmon', 'Lemon', 'Butter', 'Fresh Herbs', 'Garlic'],
nutritionFacts: {
calories: 420,
protein: 46,
carbs: 2,
fat: 28
},
preparationTime: '20-25 minutes',
chefNote: 'Premium salmon grilled to perfection with our signature lemon herb butter.'
},
{
id: 32,
category: 'Seafood',
name: 'Fish & Chips',
price: 22.99,
description: 'Beer-battered cod with crispy fries',
image: 'https://public.readdy.ai/ai/img_res/83ac73243c0a73b39c86136d599d0cdf.jpg',
ingredients: ['Cod', 'Beer Batter', 'Potatoes', 'Tartar Sauce', 'Lemon'],
nutritionFacts: {
calories: 780,
protein: 32,
carbs: 82,
fat: 38
},
preparationTime: '25-30 minutes',
chefNote: 'Classic British-style fish and chips with our special beer batter recipe.'
},
// Ice Cream
{
id: 33,
category: 'Ice Cream',
name: 'Artisanal Gelato',
price: 9.99,
description: 'Handcrafted Italian-style ice cream',
image: 'https://public.readdy.ai/ai/img_res/be0b3d21c9f92cccf7dc36a8de9c83a4.jpg',
ingredients: ['Fresh Cream', 'Natural Flavors', 'Berries', 'Chocolate', 'Nuts'],
nutritionFacts: {
calories: 280,
protein: 4,
carbs: 32,
fat: 14
},
preparationTime: '5-10 minutes',
chefNote: 'Authentic Italian gelato made fresh daily with premium ingredients.'
},
{
id: 34,
category: 'Ice Cream',
name: 'Sundae Delight',
price: 12.99,
description: 'Premium vanilla ice cream with toppings',
image: 'https://public.readdy.ai/ai/img_res/5fb1022f2df82a2ddb6a7d57e6556ecd.jpg',
ingredients: ['Vanilla Ice Cream', 'Chocolate Sauce', 'Whipped Cream', 'Cherries', 'Nuts'],
nutritionFacts: {
calories: 450,
protein: 6,
carbs: 52,
fat: 24
},
preparationTime: '8-10 minutes',
chefNote: 'A classic sundae made with our signature vanilla ice cream and premium toppings.'
},
// Chicken
{
id: 35,
category: 'Chicken',
name: 'Roasted Herb Chicken',
price: 24.99,
description: 'Herb-roasted chicken with vegetables',
image: 'https://public.readdy.ai/ai/img_res/5d54fccb5ea93d92e00b1fc1583c24b8.jpg',
ingredients: ['Free-range Chicken', 'Fresh Herbs', 'Root Vegetables', 'Garlic', 'White Wine'],
nutritionFacts: {
calories: 580,
protein: 48,
carbs: 22,
fat: 32
},
preparationTime: '45-50 minutes',
chefNote: 'Slow-roasted chicken with fresh herbs and seasonal vegetables.'
},
{
id: 36,
category: 'Chicken',
name: 'Korean Fried Chicken',
price: 19.99,
description: 'Crispy fried chicken with sweet and spicy sauce',
image: 'https://public.readdy.ai/ai/img_res/ab7508115b1735cccbe00af28032c449.jpg',
ingredients: ['Chicken Wings', 'Korean Spices', 'Soy Sauce', 'Gochujang', 'Sesame Seeds'],
nutritionFacts: {
calories: 680,
protein: 42,
carbs: 38,
fat: 42
},
preparationTime: '30-35 minutes',
chefNote: 'Double-fried chicken wings glazed with our secret Korean sauce recipe.'
},
// Vegetables
{
id: 37,
category: 'Vegetables',
name: 'Buddha Bowl',
price: 16.99,
description: 'Healthy grain bowl with roasted vegetables',
image: 'https://public.readdy.ai/ai/img_res/c0af28f3e0e66d48a15ca7ccf427afc2.jpg',
ingredients: ['Quinoa', 'Roasted Vegetables', 'Avocado', 'Chickpeas', 'Tahini'],
nutritionFacts: {
calories: 420,
protein: 14,
carbs: 58,
fat: 18
},
preparationTime: '20-25 minutes',
chefNote: 'A nutritious and colorful bowl packed with seasonal vegetables and grains.'
},
{
id: 38,
category: 'Vegetables',
name: 'Grilled Vegetable Platter',
price: 18.99,
description: 'Assorted grilled vegetables with dips',
image: 'https://public.readdy.ai/ai/img_res/94c7a59eeab5112285dbb289445128b1.jpg',
ingredients: ['Zucchini', 'Eggplant', 'Bell Peppers', 'Asparagus', 'Hummus'],
nutritionFacts: {
calories: 320,
protein: 8,
carbs: 42,
fat: 16
},
preparationTime: '25-30 minutes',
chefNote: 'Seasonal vegetables grilled to perfection and served with house-made dips.'
},
{
id: 1,
category: 'Pizza',
name: 'Truffle Pizza',
price: 24.99,
description: 'Fresh mozzarella, truffle oil, mushrooms',
image: 'https://public.readdy.ai/ai/img_res/b56aa94a5beffd71444a2d9e61c59836.jpg',
ingredients: ['Fresh Mozzarella', 'Black Truffle Oil', 'Wild Mushrooms', 'Artisanal Pizza Dough', 'Fresh Basil', 'Extra Virgin Olive Oil'],
nutritionFacts: {
calories: 285,
protein: 12,
carbs: 28,
fat: 15
},
preparationTime: '20-25 minutes',
chefNote: 'Our signature truffle pizza features hand-stretched dough and carefully selected Italian black truffles for an authentic gourmet experience.'
},
{
id: 2,
category: 'Burgers',
name: 'Wagyu Burger',
price: 29.99,
description: 'Premium wagyu beef, caramelized onions',
image: 'https://public.readdy.ai/ai/img_res/9ccab19017d4a44711d0a824db353853.jpg',
ingredients: ['A5 Wagyu Beef', 'Brioche Bun', 'Caramelized Onions', 'Aged Cheddar', 'Arugula', 'House-made Aioli'],
nutritionFacts: {
calories: 850,
protein: 45,
carbs: 35,
fat: 58
},
preparationTime: '15-20 minutes',
chefNote: 'Our wagyu burger features premium A5 grade Japanese beef, perfectly grilled to medium-rare to preserve its exceptional marbling and flavor.'
},
{
id: 3,
category: 'Sushi',
name: 'Dragon Roll',
price: 18.99,
description: 'Tempura shrimp, avocado, spicy mayo',
image: 'https://public.readdy.ai/ai/img_res/1753c26a7c97b2e7cb99ac5fd86cd642.jpg',
ingredients: ['Tempura Shrimp', 'Fresh Avocado', 'Sushi Rice', 'Nori', 'Tobiko', 'Spicy Mayo', 'Unagi Sauce'],
nutritionFacts: {
calories: 420,
protein: 18,
carbs: 45,
fat: 22
},
preparationTime: '12-15 minutes',
chefNote: 'Our signature Dragon Roll combines crispy tempura shrimp with creamy avocado, finished with a drizzle of house-made spicy mayo and sweet unagi sauce.'
},
{
id: 4,
category: 'Pizza',
name: 'Margherita Pizza',
price: 19.99,
description: 'Fresh tomatoes, mozzarella, basil',
image: 'https://public.readdy.ai/ai/img_res/0e190179cb828e2f0f33159dfdb9a13c.jpg',
ingredients: ['San Marzano Tomatoes', 'Fresh Mozzarella', 'Basil Leaves', 'Extra Virgin Olive Oil', 'Sea Salt'],
nutritionFacts: {
calories: 250,
protein: 10,
carbs: 30,
fat: 12
},
preparationTime: '15-20 minutes',
chefNote: 'Our classic Margherita pizza is made with the finest Italian ingredients and cooked in a traditional wood-fired oven.'
},
{
id: 5,
category: 'Burgers',
name: 'Classic Cheeseburger',
price: 16.99,
description: 'Angus beef, cheddar, lettuce, tomato',
image: 'https://public.readdy.ai/ai/img_res/6f2c11a75a56aa241a09920817d4341a.jpg',
ingredients: ['Angus Beef Patty', 'Cheddar Cheese', 'Fresh Lettuce', 'Tomato', 'Red Onion', 'Special Sauce'],
nutritionFacts: {
calories: 650,
protein: 35,
carbs: 40,
fat: 45
},
preparationTime: '12-15 minutes',
chefNote: 'Our classic cheeseburger is made with premium Angus beef and topped with melted cheddar cheese.'
},
{
id: 6,
category: 'Sushi',
name: 'Rainbow Roll',
price: 21.99,
description: 'Assorted sashimi, avocado, cucumber',
image: 'https://public.readdy.ai/ai/img_res/9bec3d4aacaa3964e1555eba4bd68970.jpg',
ingredients: ['Assorted Sashimi', 'Avocado', 'Cucumber', 'Sushi Rice', 'Nori', 'Tobiko'],
nutritionFacts: {
calories: 380,
protein: 20,
carbs: 40,
fat: 18
},
preparationTime: '15-20 minutes',
chefNote: 'Our Rainbow Roll features the freshest fish of the day, perfectly layered over a California roll base.'
},
{
id: 7,
category: 'Desserts',
name: 'Tiramisu',
price: 12.99,
description: 'Classic Italian dessert with coffee and mascarpone',
image: 'https://public.readdy.ai/ai/img_res/270f38860b32970d045dfb52d79c7f78.jpg',
ingredients: ['Ladyfingers', 'Mascarpone Cheese', 'Espresso', 'Cocoa Powder', 'Heavy Cream'],
nutritionFacts: {
calories: 350,
protein: 6,
carbs: 35,
fat: 22
},
preparationTime: '30 minutes',
chefNote: 'Our Tiramisu is made with authentic Italian mascarpone and premium espresso.'
},
{
id: 8,
category: 'Desserts',
name: 'Chocolate Lava Cake',
price: 14.99,
description: 'Warm chocolate cake with molten center',
image: 'https://public.readdy.ai/ai/img_res/d02240879585fc253a0e6ae1420a8e33.jpg',
ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Flour', 'Vanilla Ice Cream'],
nutritionFacts: {
calories: 420,
protein: 8,
carbs: 45,
fat: 28
},
preparationTime: '20 minutes',
chefNote: 'Our Chocolate Lava Cake features premium dark chocolate and is served with vanilla bean ice cream.'
},
// Additional Pizzas
{
id: 9,
category: 'Pizza',
name: 'Quattro Formaggi',
price: 23.99,
description: 'Four cheese blend with fresh herbs',
image: 'https://public.readdy.ai/ai/img_res/8fe20f6e80c32becc71ba0f08ad29e00.jpg',
ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesan', 'Fontina', 'Fresh Basil', 'Olive Oil'],
nutritionFacts: {
calories: 320,
protein: 15,
carbs: 28,
fat: 18
},
preparationTime: '18-22 minutes',
chefNote: 'Our four cheese pizza combines the finest Italian cheeses for a rich and indulgent experience.'
},
{
id: 10,
category: 'Pizza',
name: 'Mediterranean',
price: 21.99,
description: 'Olives, feta, sun-dried tomatoes',
image: 'https://public.readdy.ai/ai/img_res/466bd1bef8b79038133e18bfa5a75443.jpg',
ingredients: ['Feta Cheese', 'Kalamata Olives', 'Sun-dried Tomatoes', 'Red Onions', 'Fresh Oregano'],
nutritionFacts: {
calories: 280,
protein: 12,
carbs: 32,
fat: 14
},
preparationTime: '15-20 minutes',
chefNote: 'A taste of the Mediterranean with authentic ingredients and flavors.'
},
{
id: 11,
category: 'Pizza',
name: 'Prosciutto & Arugula',
price: 25.99,
description: 'Thin-sliced prosciutto and fresh arugula',
image: 'https://public.readdy.ai/ai/img_res/749d1e9e2d1d5e1c753e3131e69422b3.jpg',
ingredients: ['Prosciutto di Parma', 'Fresh Arugula', 'Mozzarella', 'Cherry Tomatoes', 'Balsamic Glaze'],
nutritionFacts: {
calories: 290,
protein: 18,
carbs: 26,
fat: 16
},
preparationTime: '16-20 minutes',
chefNote: 'Premium prosciutto and fresh arugula create a perfect balance of flavors.'
},
{
id: 12,
category: 'Pizza',
name: 'BBQ Chicken',
price: 22.99,
description: 'Grilled chicken with BBQ sauce',
image: 'https://public.readdy.ai/ai/img_res/461455c20e237ac87dfb7a03f4ae7a89.jpg',
ingredients: ['Grilled Chicken', 'BBQ Sauce', 'Red Onions', 'Mozzarella', 'Cilantro'],
nutritionFacts: {
calories: 310,
protein: 22,
carbs: 35,
fat: 14
},
preparationTime: '17-22 minutes',
chefNote: 'Our signature BBQ sauce perfectly complements the tender grilled chicken.'
},
{
id: 13,
category: 'Pizza',
name: 'Seafood Delight',
price: 27.99,
description: 'Mixed seafood with garlic butter sauce',
image: 'https://public.readdy.ai/ai/img_res/9378a694a114129b1e52f20a03df49f5.jpg',
ingredients: ['Shrimp', 'Scallops', 'Garlic Butter', 'Mozzarella', 'Fresh Parsley'],
nutritionFacts: {
calories: 340,
protein: 24,
carbs: 30,
fat: 18
},
preparationTime: '20-25 minutes',
chefNote: 'Fresh seafood and garlic butter create a luxurious pizza experience.'
},
// Additional Burgers
{
id: 14,
category: 'Burgers',
name: 'Truffle Mushroom',
price: 24.99,
description: 'Sautéed mushrooms with truffle aioli',
image: 'https://public.readdy.ai/ai/img_res/6b701218f9f61eab0cfc97a195714ff8.jpg',
ingredients: ['Angus Beef', 'Sautéed Mushrooms', 'Truffle Aioli', 'Swiss Cheese', 'Arugula'],
nutritionFacts: {
calories: 780,
protein: 42,
carbs: 38,
fat: 52
},
preparationTime: '15-20 minutes',
chefNote: 'Earthy mushrooms and luxurious truffle create an unforgettable burger.'
},
{
id: 15,
category: 'Burgers',
name: 'Blue Cheese Buffalo',
price: 21.99,
description: 'Buffalo sauce and blue cheese crumbles',
image: 'https://public.readdy.ai/ai/img_res/9769f819de533a7e944b5bf69e54d136.jpg',
ingredients: ['Angus Beef', 'Buffalo Sauce', 'Blue Cheese', 'Celery', 'Ranch Dressing'],
nutritionFacts: {
calories: 820,
protein: 45,
carbs: 42,
fat: 54
},
preparationTime: '14-18 minutes',
chefNote: 'The perfect combination of spicy buffalo sauce and creamy blue cheese.'
},
{
id: 16,
category: 'Burgers',
name: 'Mediterranean Lamb',
price: 26.99,
description: 'Seasoned lamb with tzatziki sauce',
image: 'https://public.readdy.ai/ai/img_res/c85909ca066fbe4142bbcc15c272defb.jpg',
ingredients: ['Ground Lamb', 'Tzatziki', 'Feta Cheese', 'Red Onion', 'Fresh Mint'],
nutritionFacts: {
calories: 750,
protein: 48,
carbs: 35,
fat: 50
},
preparationTime: '16-20 minutes',
chefNote: 'Authentic Mediterranean flavors in every bite.'
},
{
id: 17,
category: 'Burgers',
name: 'Korean BBQ',
price: 23.99,
description: 'Korean BBQ sauce with kimchi slaw',
image: 'https://public.readdy.ai/ai/img_res/cd2fa19579ed5e4eaa1cfc15b3d73fce.jpg',
ingredients: ['Angus Beef', 'Korean BBQ Sauce', 'Kimchi Slaw', 'Gochujang Mayo', 'Green Onions'],
nutritionFacts: {
calories: 790,
protein: 44,
carbs: 45,
fat: 48
},
preparationTime: '15-20 minutes',
chefNote: 'A fusion of Korean flavors with classic American burger.'
},
{
id: 18,
category: 'Burgers',
name: 'Portobello Veggie',
price: 19.99,
description: 'Grilled portobello with goat cheese',
image: 'https://public.readdy.ai/ai/img_res/8e9315f88d5fabd0508d7f9ccee23246.jpg',
ingredients: ['Portobello Mushroom', 'Goat Cheese', 'Caramelized Onions', 'Roasted Red Peppers', 'Balsamic Glaze'],
nutritionFacts: {
calories: 520,
protein: 18,
carbs: 48,
fat: 32
},
preparationTime: '12-15 minutes',
chefNote: 'A vegetarian delight that satisfies like a traditional burger.'
},
// Additional Sushi
{
id: 19,
category: 'Sushi',
name: 'Volcano Roll',
price: 24.99,
description: 'Spicy baked seafood on California roll',
image: 'https://public.readdy.ai/ai/img_res/36376eabe05e8abe21f040ee12292216.jpg',
ingredients: ['Crab Mix', 'Scallops', 'Spicy Mayo', 'Tempura Flakes', 'Unagi Sauce'],
nutritionFacts: {
calories: 450,
protein: 22,
carbs: 42,
fat: 24
},
preparationTime: '15-20 minutes',
chefNote: 'Our signature baked seafood topping creates an explosion of flavors.'
},
{
id: 20,
category: 'Sushi',
name: 'Truffle Salmon',
price: 26.99,
description: 'Fresh salmon with truffle oil',
image: 'https://public.readdy.ai/ai/img_res/07d7e69cb98a83d25eccded91225e323.jpg',
ingredients: ['Fresh Salmon', 'Truffle Oil', 'Avocado', 'Gold Flakes', 'Special Sauce'],
nutritionFacts: {
calories: 380,
protein: 24,
carbs: 38,
fat: 20
},
preparationTime: '12-15 minutes',
chefNote: 'Premium salmon enhanced with luxurious truffle oil.'
},
{
id: 21,
category: 'Sushi',
name: 'Spider Roll',
price: 22.99,
description: 'Soft shell crab with cucumber',
image: 'https://public.readdy.ai/ai/img_res/296c6db4462ce441bdfea08a990b5746.jpg',
ingredients: ['Soft Shell Crab', 'Cucumber', 'Avocado', 'Spicy Mayo', 'Eel Sauce'],
nutritionFacts: {
calories: 420,
protein: 18,
carbs: 45,
fat: 22
},
preparationTime: '15-18 minutes',
chefNote: 'Crispy soft shell crab creates a perfect texture contrast.'
},
{
id: 22,
category: 'Sushi',
name: 'Wagyu Roll',
price: 34.99,
description: 'Seared wagyu beef with truffle',
image: 'https://public.readdy.ai/ai/img_res/7c59679eb84ec0003dce0e863ec7c8a9.jpg',
ingredients: ['A5 Wagyu Beef', 'Truffle', 'Asparagus', 'Gold Leaf', 'Special Sauce'],
nutritionFacts: {
calories: 460,
protein: 28,
carbs: 35,
fat: 26
},
preparationTime: '15-20 minutes',
chefNote: 'Premium wagyu beef creates an unforgettable sushi experience.'
},
{
id: 23,
category: 'Sushi',
name: 'Cherry Blossom',
price: 25.99,
description: 'Tuna and salmon with pink soy paper',
image: 'https://public.readdy.ai/ai/img_res/eae7477e454c8fd5684a34401ca82ff0.jpg',
ingredients: ['Tuna', 'Salmon', 'Pink Soy Paper', 'Avocado', 'Tempura Flakes'],
nutritionFacts: {
calories: 390,
protein: 24,
carbs: 40,
fat: 18
},
preparationTime: '15-20 minutes',
chefNote: 'A visually stunning roll that tastes as good as it looks.'
},
// Additional Desserts
{
id: 24,
category: 'Desserts',
name: 'Matcha Cheesecake',
price: 13.99,
description: 'Green tea flavored cheesecake',
image: 'https://public.readdy.ai/ai/img_res/08a129df67672c8b5d7e496ab3d6b57d.jpg',
ingredients: ['Matcha Powder', 'Cream Cheese', 'White Chocolate', 'Graham Cracker', 'Gold Leaf'],
nutritionFacts: {
calories: 380,
protein: 8,
carbs: 42,
fat: 24
},
preparationTime: '25 minutes',
chefNote: 'Japanese-inspired cheesecake with premium matcha powder.'
},
{
id: 25,
category: 'Desserts',
name: 'Crème Brûlée',
price: 12.99,
description: 'Classic French vanilla custard',
image: 'https://public.readdy.ai/ai/img_res/1a416aaa3f501e906c01b59d54554cb2.jpg',
ingredients: ['Heavy Cream', 'Vanilla Bean', 'Egg Yolks', 'Sugar', 'Fresh Berries'],
nutritionFacts: {
calories: 420,
protein: 6,
carbs: 38,
fat: 28
},
preparationTime: '35 minutes',
chefNote: 'Traditional French dessert with perfectly caramelized top.'
},
{
id: 26,
category: 'Desserts',
name: 'Mango Passion',
price: 14.99,
description: 'Tropical mango mousse cake',
image: 'https://public.readdy.ai/ai/img_res/6fdb96e0083e4271f90a220a3c2450d6.jpg',
ingredients: ['Fresh Mango', 'Passion Fruit', 'White Chocolate', 'Heavy Cream', 'Mirror Glaze'],
nutritionFacts: {
calories: 360,
protein: 5,
carbs: 45,
fat: 20
},
preparationTime: '30 minutes',
chefNote: 'A tropical paradise in every bite.'
},
{
id: 27,
category: 'Desserts',
name: 'Opera Cake',
price: 15.99,
description: 'Classic French coffee layered cake',
image: 'https://public.readdy.ai/ai/img_res/b8224076ef6893d1bca96843414dc4c4.jpg',
ingredients: ['Coffee Syrup', 'Chocolate Ganache', 'Almond Sponge', 'Coffee Buttercream', 'Gold Leaf'],
nutritionFacts: {
calories: 450,
protein: 7,
carbs: 48,
fat: 26
},
preparationTime: '40 minutes',
chefNote: 'A sophisticated French classic with perfect coffee flavor.'
},
{
id: 28,
category: 'Desserts',
name: 'Pistachio Rose',
price: 16.99,
description: 'Middle Eastern inspired dessert',
image: 'https://public.readdy.ai/ai/img_res/f31f6d0517ee9e7dee70b30d4d6270b9.jpg',
ingredients: ['Pistachios', 'Rose Water', 'Mascarpone', 'Honey', 'Edible Rose Petals'],
nutritionFacts: {
calories: 390,
protein: 9,
carbs: 42,
fat: 24
},
preparationTime: '35 minutes',
chefNote: 'A luxurious blend of Middle Eastern flavors.'
}
];
const [popularDishes, setPopularDishes] = useState(allDishes);
useEffect(() => {
const chartDom = document.getElementById('orderChart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
tooltip: {
trigger: 'axis'
},
xAxis: {
type: 'category',
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
},
yAxis: {
type: 'value'
},
series: [{
data: [150, 230, 224, 218, 135, 147, 260],
type: 'line',
smooth: true
}]
};
myChart.setOption(option);
}
}, []);
const relatedItemsData = {
1: [ // Related items for Truffle Pizza
{
id: 101,
name: 'Truffle Fries',
price: 12.99,
description: 'Hand-cut fries with truffle oil and parmesan',
image: 'https://public.readdy.ai/ai/img_res/08fe8f0271290809410af86ff70e66fa.jpg'
},
{
id: 102,
name: 'Mushroom Risotto',
price: 22.99,
description: 'Creamy risotto with wild mushrooms and truffle',
image: 'https://public.readdy.ai/ai/img_res/3fbbeb4d118cca8ae661baceb03907e3.jpg'
}
],
2: [ // Related items for Wagyu Burger
{
id: 201,
name: 'Truffle Aioli Fries',
price: 9.99,
description: 'Golden fries with house-made truffle aioli',
image: 'https://public.readdy.ai/ai/img_res/d429926772b1f72d8365a4af9cf375df.jpg'
},
{
id: 202,
name: 'Wagyu Sliders',
price: 18.99,
description: 'Mini wagyu burgers with caramelized onions',
image: 'https://public.readdy.ai/ai/img_res/02d27d79c38928799b9a45381ca77608.jpg'
}
],
3: [ // Related items for Dragon Roll
{
id: 301,
name: 'Miso Soup',
price: 6.99,
description: 'Traditional Japanese miso soup with tofu',
image: 'https://public.readdy.ai/ai/img_res/1a0c2e1e7efcc501d6c3d1a2ee369998.jpg'
},
{
id: 302,
name: 'Tempura Udon',
price: 16.99,
description: 'Udon noodles with crispy tempura shrimp',
image: 'https://public.readdy.ai/ai/img_res/6dcbf1600878c49ede78465f3df1f5c7.jpg'
}
]
};
const addToCart = (item: { id: number; name: string; price: number }) => {
setCartItems(prev => {
const existingItem = prev.find(cartItem => cartItem.id === item.id);
if (existingItem) {
return prev.map(cartItem =>
cartItem.id === item.id
? { ...cartItem, quantity: cartItem.quantity + 1 }
: cartItem
);
}
return [...prev, { ...item, quantity: 1 }];
});
setIsCartOpen(true);
// Update related items based on the added item
if (relatedItemsData[item.id]) {
setRelatedItems(relatedItemsData[item.id]);
}
};
const removeFromCart = (itemId: number) => {
setCartItems(prev => prev.filter(item => item.id !== itemId));
};
const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
return (
<div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50'}`}>
{/* Header */}
<header className={`fixed top-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-purple-100'} backdrop-blur-md shadow-lg z-50 border-b`}>
<div className="max-w-7xl mx-auto px-4">
<div className="flex items-center justify-between h-16">
<div className="flex items-center space-x-8">
<div className={`text-2xl font-bold ${isDarkMode ? 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'} text-transparent bg-clip-text`}>FoodHub</div>
<div className="relative">
<input
type="text"
placeholder="Search for food or restaurants..."
className={`w-96 pl-10 pr-4 py-2 rounded-lg border-none ${
isDarkMode ? 'bg-gray-700 text-gray-200 placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'
} focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
/>
<i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
</div>
</div>
<div className="flex items-center space-x-6">
<button
onClick={() => setIsDarkMode(!isDarkMode)}
className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
} transition-colors !rounded-button whitespace-nowrap`}
>
<i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
<span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
</button>
<button className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}>
<i className="fa-solid fa-location-dot"></i>
<span>New York</span>
</button>
<div className="flex items-center space-x-4">
<button
className="relative !rounded-button whitespace-nowrap"
onClick={() => setShowNotifications(!showNotifications)}
>
<i className="fa-solid fa-bell"></i>
{unreadNotifications > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
{unreadNotifications}
</span>
)}
</button>
<button
className="relative !rounded-button whitespace-nowrap"
onClick={() => setIsCartOpen(!isCartOpen)}
>
<i className="fa-solid fa-shopping-cart"></i>
{cartItems.length > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
{cartItems.length}
</span>
)}
</button>
<button
className="relative !rounded-button whitespace-nowrap"
onClick={() => setShowFeatures(!showFeatures)}
>
<i className="fa-solid fa-bars"></i>
</button>
</div>
<div className="relative">
<button
onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
className="!rounded-button whitespace-nowrap"
>
<i className="fa-solid fa-user"></i>
</button>
{isUserMenuOpen && (
<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
<button
onClick={() => {
const profileModal = document.createElement('div');
profileModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
profileModal.innerHTML = `
<div class="bg-white rounded-lg w-[1000px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">My Profile</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="grid grid-cols-3 gap-8">
<div class="col-span-1">
<div class="bg-gray-50 p-6 rounded-lg text-center">
<div class="w-32 h-32 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
<i class="fa-solid fa-user text-4xl text-indigo-600"></i>
</div>
<h3 class="text-xl font-semibold mb-2">Alexander Mitchell</h3>
<p class="text-gray-600 mb-4">Premium Member</p>
<div class="flex justify-center space-x-2">
<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
<i class="fa-solid fa-star mr-1"></i>4.9
</span>
<span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
<i class="fa-solid fa-award mr-1"></i>VIP
</span>
</div>
</div>
</div>
<div class="col-span-2">
<div class="bg-gray-50 p-6 rounded-lg mb-6">
<h3 class="text-lg font-semibold mb-4">Personal Information</h3>
<div class="grid grid-cols-2 gap-4">
<div>
<label class="block text-sm text-gray-600 mb-1">Full Name</label>
<input type="text" value="Alexander Mitchell" class="w-full p-2 border border-gray-300 rounded-lg" />
</div>
<div>
<label class="block text-sm text-gray-600 mb-1">Email</label>
<input type="email" value="alex.mitchell@example.com" class="w-full p-2 border border-gray-300 rounded-lg" />
</div>
<div>
<label class="block text-sm text-gray-600 mb-1">Phone</label>
<input type="tel" value="+1 (555) 123-4567" class="w-full p-2 border border-gray-300 rounded-lg" />
</div>
<div>
<label class="block text-sm text-gray-600 mb-1">Date of Birth</label>
<input type="date" value="1990-05-15" class="w-full p-2 border border-gray-300 rounded-lg" />
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Recent Orders</h3>
<div class="space-y-4">
<div class="bg-white p-4 rounded-lg">
<div class="flex justify-between items-start">
<div>
<div class="font-semibold">Order #12345</div>
<div class="text-sm text-gray-600">2 items • $45.98</div>
<div class="text-sm text-gray-600">February 18, 2025</div>
</div>
<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Delivered</span>
</div>
</div>
<div class="bg-white p-4 rounded-lg">
<div class="flex justify-between items-start">
<div>
<div class="font-semibold">Order #12344</div>
<div class="text-sm text-gray-600">3 items • $68.97</div>
<div class="text-sm text-gray-600">February 15, 2025</div>
</div>
<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Delivered</span>
</div>
</div>
<div class="bg-white p-4 rounded-lg">
<div class="flex justify-between items-start">
<div>
<div class="font-semibold">Order #12343</div>
<div class="text-sm text-gray-600">1 item • $29.99</div>
<div class="text-sm text-gray-600">February 12, 2025</div>
</div>
<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Delivered</span>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="grid grid-cols-3 gap-8 mt-8">
<div class="col-span-1">
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Account Settings</h3>
<div class="space-y-4">
<div class="flex items-center justify-between">
<span class="text-gray-600">Email Notifications</span>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer" checked>
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
<div class="flex items-center justify-between">
<span class="text-gray-600">SMS Notifications</span>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer" checked>
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
<div class="flex items-center justify-between">
<span class="text-gray-600">Dark Mode</span>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer">
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
</div>
</div>
</div>
<div class="col-span-2">
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Saved Addresses</h3>
<div class="grid grid-cols-2 gap-4">
<div class="bg-white p-4 rounded-lg border-2 border-indigo-600">
<div class="flex justify-between items-start mb-2">
<div class="font-semibold">Home</div>
<span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">Default</span>
</div>
<p class="text-gray-600 text-sm">1234 Central Park West</p>
<p class="text-gray-600 text-sm">New York, NY 10024</p>
</div>
<div class="bg-white p-4 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-2">
<div class="font-semibold">Office</div>
</div>
<p class="text-gray-600 text-sm">555 Madison Avenue</p>
<p class="text-gray-600 text-sm">New York, NY 10022</p>
</div>
</div>
</div>
</div>
</div>
<div class="flex justify-between mt-8">
<button class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors !rounded-button whitespace-nowrap" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-right-from-bracket mr-2"></i>Logout
</button>
<button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap" onclick="this.closest('.fixed').remove()">
Save Changes
</button>
</div>
</div>
`;
document.body.appendChild(profileModal);
}}
className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</button>
<button
onClick={() => {
const ordersModal = document.createElement('div');
ordersModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
ordersModal.innerHTML = `
<div class="bg-white rounded-lg w-[1000px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">My Orders</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="bg-gray-50 p-6 rounded-lg">
<div class="flex justify-between items-start mb-4">
<div>
<div class="text-xl font-semibold">Order #12345</div>
<div class="text-gray-600">Placed on February 18, 2025 at 11:30 AM</div>
</div>
<span class="bg-green-100 text-green-600 px-4 py-2 rounded-full">Delivered</span>
</div>
<div class="border-t border-gray-200 pt-4">
<div class="grid grid-cols-4 gap-4">
<div class="col-span-2">
<div class="space-y-4">
<div class="flex items-center space-x-4">
<img src="https://public.readdy.ai/ai/img_res/dd4531230892cea5b038d5f001d51070.jpg" class="w-20 h-20 object-cover rounded-lg" />
<div>
<div class="font-semibold">Truffle Pizza</div>
<div class="text-gray-600">Quantity: 1</div>
<div class="text-gray-600">$24.99</div>
</div>
</div>
<div class="flex items-center space-x-4">
<img src="https://public.readdy.ai/ai/img_res/169dcd0de27ab834eb4ec3c9977e3723.jpg" class="w-20 h-20 object-cover rounded-lg" />
<div>
<div class="font-semibold">Tiramisu</div>
<div class="text-gray-600">Quantity: 1</div>
<div class="text-gray-600">$12.99</div>
</div>
</div>
</div>
</div>
<div>
<div class="text-sm font-semibold mb-2">Delivery Address</div>
<div class="text-gray-600">
1234 Central Park West<br>
New York, NY 10024
</div>
</div>
<div>
<div class="text-sm font-semibold mb-2">Order Summary</div>
<div class="space-y-2">
<div class="flex justify-between text-gray-600">
<span>Subtotal</span>
<span>$37.98</span>
</div>
<div class="flex justify-between text-gray-600">
<span>Delivery Fee</span>
<span>$0.00</span>
</div>
<div class="flex justify-between font-semibold">
<span>Total</span>
<span>$37.98</span>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<div class="flex justify-between items-start mb-4">
<div>
<div class="text-xl font-semibold">Order #12344</div>
<div class="text-gray-600">Placed on February 15, 2025 at 7:45 PM</div>
</div>
<span class="bg-green-100 text-green-600 px-4 py-2 rounded-full">Delivered</span>
</div>
<div class="border-t border-gray-200 pt-4">
<div class="grid grid-cols-4 gap-4">
<div class="col-span-2">
<div class="space-y-4">
<div class="flex items-center space-x-4">
<img src="https://public.readdy.ai/ai/img_res/55eded61f954877087672a5d71cffd83.jpg" class="w-20 h-20 object-cover rounded-lg" />
<div>
<div class="font-semibold">Wagyu Burger</div>
<div class="text-gray-600">Quantity: 2</div>
<div class="text-gray-600">$59.98</div>
</div>
</div>
</div>
</div>
<div>
<div class="text-sm font-semibold mb-2">Delivery Address</div>
<div class="text-gray-600">
555 Madison Avenue<br>
New York, NY 10022
</div>
</div>
<div>
<div class="text-sm font-semibold mb-2">Order Summary</div>
<div class="space-y-2">
<div class="flex justify-between text-gray-600">
<span>Subtotal</span>
<span>$59.98</span>
</div>
<div class="flex justify-between text-gray-600">
<span>Delivery Fee</span>
<span>$0.00</span>
</div>
<div class="flex justify-between font-semibold">
<span>Total</span>
<span>$59.98</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
`;
document.body.appendChild(ordersModal);
}}
className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</button>
<button
onClick={() => {
const settingsModal = document.createElement('div');
settingsModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
settingsModal.innerHTML = `
<div class="bg-white rounded-lg w-[800px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Settings</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-8">
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Notification Preferences</h3>
<div class="space-y-4">
<div class="flex items-center justify-between">
<div>
<div class="font-medium">Email Notifications</div>
<div class="text-sm text-gray-600">Receive order updates and promotions</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer" checked>
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
<div class="flex items-center justify-between">
<div>
<div class="font-medium">SMS Notifications</div>
<div class="text-sm text-gray-600">Receive delivery updates via text</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer" checked>
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
<div class="flex items-center justify-between">
<div>
<div class="font-medium">Push Notifications</div>
<div class="text-sm text-gray-600">Receive updates on your device</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer">
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Privacy Settings</h3>
<div class="space-y-4">
<div class="flex items-center justify-between">
<div>
<div class="font-medium">Share Order History</div>
<div class="text-sm text-gray-600">Allow restaurants to view your past orders</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer" checked>
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
<div class="flex items-center justify-between">
<div>
<div class="font-medium">Location Services</div>
<div class="text-sm text-gray-600">Use your location for better recommendations</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer" checked>
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Payment Methods</h3>
<div class="space-y-4">
<div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
<div class="flex items-center space-x-4">
<i class="fa-solid fa-credit-card text-2xl text-gray-600"></i>
<div>
<div class="font-medium">Visa ending in 4242</div>
<div class="text-sm text-gray-600">Expires 12/25</div>
</div>
</div>
<span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">Default</span>
</div>
<div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
<div class="flex items-center space-x-4">
<i class="fa-solid fa-credit-card text-2xl text-gray-600"></i>
<div>
<div class="font-medium">Mastercard ending in 8888</div>
<div class="text-sm text-gray-600">Expires 09/24</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="flex justify-end mt-8">
<button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap" onclick="this.closest('.fixed').remove()">
Save Changes
</button>
</div>
</div>
`;
document.body.appendChild(settingsModal);
}}
className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</button>
<button
onClick={() => {
const logoutModal = document.createElement('div');
logoutModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
logoutModal.innerHTML = `
<div class="bg-white rounded-lg w-[400px] p-8">
<div class="text-center mb-6">
<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
<i class="fa-solid fa-right-from-bracket text-2xl text-red-600"></i>
</div>
<h2 class="text-2xl font-bold">Logout</h2>
<p class="text-gray-600 mt-2">Are you sure you want to logout?</p>
</div>
<div class="flex space-x-4">
<button class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap" onclick="this.closest('.fixed').remove()">
Cancel
</button>
<button class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors !rounded-button whitespace-nowrap" onclick="this.closest('.fixed').remove()">
Logout
</button>
</div>
</div>
`;
document.body.appendChild(logoutModal);
}}
className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
</div>
)}
</div>
</div>
</div>
</div>
</header>
{/* Main Content */}
<main className="pt-16">
{/* Hero Section */}
<div className="relative h-[500px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden shadow-2xl">
<div className="max-w-7xl mx-auto px-4 h-full flex items-center">
<div className="w-1/2 text-white z-10">
<h1 className="text-5xl font-bold mb-6">Delicious Food Delivered to Your Door</h1>
<p className="text-xl mb-8">Order from the best local restaurants with easy, on-demand delivery.</p>
<button
onClick={() => setShowOrderProcess(true)}
className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors !rounded-button whitespace-nowrap">
Order Now
</button>
</div>
<div className="absolute top-0 right-0 w-3/5 h-full">
<img
src="https://public.readdy.ai/ai/img_res/863864201965468d3f0d9bd83def183f.jpg"
alt="Delicious Food"
className="w-full h-full object-cover"
/>
</div>
</div>
</div>
{/* Categories */}
<div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
<h2 className="text-2xl font-bold mb-8">Categories</h2>
<div className="flex space-x-6">
{categories.map(category => (
<button
key={category.id}
onClick={() => setSelectedCategory(category.name)}
className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
selectedCategory === category.name
? 'bg-indigo-600 text-white'
: 'bg-white text-gray-600 hover:bg-gray-50'
} !rounded-button whitespace-nowrap`}
>
<i className={`${category.icon} text-2xl mb-2`}></i>
<span>{category.name}</span>
</button>
))}
</div>
</div>
{/* Popular Dishes */}
<div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
<h2 className="text-2xl font-bold mb-8">Popular Dishes</h2>
<div className="grid grid-cols-3 gap-8 transform hover:scale-[0.99] transition-transform duration-300">
{popularDishes.map(dish => (
<div key={dish.id} className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700/50 hover:bg-gray-700/90' : 'bg-white/90 border-purple-100/50 hover:bg-white'} backdrop-blur-sm rounded-lg shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border transform hover:scale-105 hover:-translate-y-1 motion-safe:animate-fadeIn`} onClick={() => setSelectedDish(dish)}>
<img src={dish.image} alt={dish.name} className="w-full h-48 object-cover hover:opacity-90 transition-opacity" />
<div className="p-4">
<h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{dish.name}</h3>
<p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{dish.description}</p>
<div className="flex items-center justify-between">
<span className="text-lg font-bold">${dish.price}</span>
<button
onClick={() => addToCart(dish)}
className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg !rounded-button whitespace-nowrap"
>
Add to Cart
</button>
</div>
</div>
</div>
))}
</div>
</div>
{/* Related Items */}
{relatedItems.length > 0 && (
<div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
<h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
<div className="grid grid-cols-2 gap-8">
{relatedItems.map(item => (
<div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
<img src={item.image} alt={item.name} className="w-48 h-48 object-cover" />
<div className="p-6 flex flex-col justify-between flex-1">
<div>
<h3 className="text-xl font-semibold mb-2">{item.name}</h3>
<p className="text-gray-600 mb-4">{item.description}</p>
</div>
<div className="flex items-center justify-between">
<span className="text-lg font-bold">${item.price}</span>
<button
onClick={() => addToCart(item)}
className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap"
>
Add to Cart
</button>
</div>
</div>
</div>
))}
</div>
</div>
)}
{/* Restaurants */}
<div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
<h2 className="text-2xl font-bold mb-8">Featured Restaurants</h2>
<div className="grid grid-cols-3 gap-8 transform hover:scale-[0.99] transition-transform duration-300">
{restaurants.map(restaurant => (
<div
key={restaurant.id}
className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
onClick={() => {
setRelatedItems(restaurantRelatedItems[restaurant.id]);
}}
>
<img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
<div className="p-4">
<div className="flex items-center justify-between mb-2">
<h3 className="text-xl font-semibold">{restaurant.name}</h3>
<div className="flex items-center">
<i className="fa-solid fa-star text-yellow-400 mr-1"></i>
<span>{restaurant.rating}</span>
</div>
</div>
<p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
<div className="flex items-center justify-between text-sm text-gray-500">
<span>{restaurant.deliveryTime} mins</span>
<span>Min. order ${restaurant.minOrder}</span>
</div>
</div>
</div>
))}
</div>
</div>
{/* Order Analytics */}
<div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
<h2 className="text-2xl font-bold mb-8">Order Analytics</h2>
<div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-purple-100/50 hover:shadow-2xl transition-all duration-300">
<div id="orderChart" style={{ height: '400px' }} className="cursor-pointer" onClick={() => {
const addressModal = document.createElement('div');
addressModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
addressModal.innerHTML = `
<div class="bg-white rounded-lg w-[800px] p-8">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Delivery Address & Map</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="mb-6">
<div class="bg-gray-100 p-4 rounded-lg mb-4">
<h3 class="font-semibold mb-2">Current Address</h3>
<p class="text-gray-600">123 Broadway St, New York, NY 10013</p>
</div>
<div class="bg-gray-100 h-[400px] rounded-lg flex items-center justify-center">
<p class="text-gray-500">Map View</p>
</div>
</div>
<button class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap" onclick="this.closest('.fixed').remove()">
Confirm Location
</button>
</div>
`;
document.body.appendChild(addressModal);
}}></div>
</div>
</div>
</main>
{/* Order Process Modal */}
{showOrderProcess && (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
<div className="bg-white rounded-lg w-[600px] p-8">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-gray-800">How It Works</h2>
<button
onClick={() => setShowOrderProcess(false)}
className="text-gray-500 hover:text-gray-700"
>
<i className="fa-solid fa-times"></i>
</button>
</div>
<div className="space-y-6">
<div className="flex items-start space-x-4">
<div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
<i className="fa-solid fa-utensils text-indigo-600 text-xl"></i>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">1. Choose Your Food</h3>
<p className="text-gray-600">Browse our extensive menu of delicious dishes from top-rated restaurants in your area.</p>
</div>
</div>
<div className="flex items-start space-x-4">
<div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
<i className="fa-solid fa-cart-shopping text-indigo-600 text-xl"></i>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">2. Add to Cart</h3>
<p className="text-gray-600">Select your favorite items and customize them according to your preferences.</p>
</div>
</div>
<div className="flex items-start space-x-4">
<div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
<i className="fa-solid fa-credit-card text-indigo-600 text-xl"></i>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">3. Easy Payment</h3>
<p className="text-gray-600">Pay securely using your preferred payment method - credit card, digital wallet, or cash on delivery.</p>
</div>
</div>
<div className="flex items-start space-x-4">
<div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
<i className="fa-solid fa-truck text-indigo-600 text-xl"></i>
</div>
<div>
<h3 className="font-semibold text-lg mb-1">4. Fast Delivery</h3>
<p className="text-gray-600">Track your order in real-time as our delivery partners bring your food right to your doorstep.</p>
</div>
</div>
</div>
<div className="mt-8">
<button
onClick={() => {
setShowOrderProcess(false);
document.getElementById('menuSection')?.scrollIntoView({ behavior: 'smooth' });
}}
className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap"
>
Start Ordering
</button>
</div>
</div>
</div>
)}
{/* Dish Detail Modal */}
{selectedDish && (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
<div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto animate-scaleIn">
<div className="relative">
<img src={selectedDish.image} alt={selectedDish.name} className="w-full h-64 object-cover" />
<button
onClick={() => setSelectedDish(null)}
className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
>
<i className="fa-solid fa-times"></i>
</button>
</div>
<div className="p-8">
<div className="flex justify-between items-start mb-6">
<div>
<h2 className="text-3xl font-bold mb-2">{selectedDish.name}</h2>
<p className="text-gray-600 text-lg">{selectedDish.description}</p>
</div>
<div className="text-2xl font-bold text-indigo-600">${selectedDish.price}</div>
</div>
<div className="grid grid-cols-2 gap-8 mb-8">
<div>
<h3 className="text-xl font-semibold mb-4">Ingredients</h3>
<ul className="space-y-2">
{selectedDish.ingredients?.map((ingredient, index) => (
<li key={index} className="flex items-center">
<i className="fa-solid fa-check text-green-500 mr-2"></i>
{ingredient}
</li>
))}
</ul>
</div>
<div>
<h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
<div className="grid grid-cols-2 gap-4">
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-600">Calories</div>
<div className="text-xl font-semibold">{selectedDish.nutritionFacts?.calories} kcal</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-600">Protein</div>
<div className="text-xl font-semibold">{selectedDish.nutritionFacts?.protein}g</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-600">Carbs</div>
<div className="text-xl font-semibold">{selectedDish.nutritionFacts?.carbs}g</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-600">Fat</div>
<div className="text-xl font-semibold">{selectedDish.nutritionFacts?.fat}g</div>
</div>
</div>
</div>
</div>
<div className="mb-8">
<h3 className="text-xl font-semibold mb-4">Preparation Time</h3>
<div className="flex items-center text-gray-600">
<i className="fa-solid fa-clock mr-2"></i>
{selectedDish.preparationTime}
</div>
</div>
<div className="mb-8">
<h3 className="text-xl font-semibold mb-4">Chef's Note</h3>
<p className="text-gray-600 italic">{selectedDish.chefNote}</p>
</div>
<div className="space-y-6">
<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
<div className="flex items-center space-x-4">
<span className="font-semibold">Quantity:</span>
<div className="flex items-center space-x-2">
<button
onClick={() => {
if (selectedDish.quantity && selectedDish.quantity > 1) {
setSelectedDish({...selectedDish, quantity: selectedDish.quantity - 1});
}
}}
className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 !rounded-button whitespace-nowrap"
>
<i className="fa-solid fa-minus text-sm"></i>
</button>
<span className="w-8 text-center font-semibold">{selectedDish.quantity || 1}</span>
<button
onClick={() => {
setSelectedDish({...selectedDish, quantity: (selectedDish.quantity || 1) + 1});
}}
className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 !rounded-button whitespace-nowrap"
>
<i className="fa-solid fa-plus text-sm"></i>
</button>
</div>
</div>
<div className="font-semibold">
Total: ${((selectedDish.price || 0) * (selectedDish.quantity || 1)).toFixed(2)}
</div>
</div>
<div className="space-y-3">
<label className="block font-semibold">Special Instructions</label>
<textarea
placeholder="Add any special requests, allergies, or preferences..."
className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
value={selectedDish.specialInstructions || ''}
onChange={(e) => setSelectedDish({...selectedDish, specialInstructions: e.target.value})}
></textarea>
</div>
<div className="space-y-3">
<div className="font-semibold">Preferences</div>
<div className="grid grid-cols-2 gap-3">
<button
onClick={() => setSelectedDish({...selectedDish, spicyLevel: (selectedDish.spicyLevel === 'spicy' ? 'regular' : 'spicy')})}
className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
selectedDish.spicyLevel === 'spicy' ? 'border-red-500 text-red-500' : 'border-gray-300'
} hover:bg-gray-50 !rounded-button whitespace-nowrap`}
>
<i className="fa-solid fa-pepper-hot"></i>
<span>Spicy</span>
</button>
<button
onClick={() => setSelectedDish({...selectedDish, extraCheese: !selectedDish.extraCheese})}
className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
selectedDish.extraCheese ? 'border-yellow-500 text-yellow-500' : 'border-gray-300'
} hover:bg-gray-50 !rounded-button whitespace-nowrap`}
>
<i className="fa-solid fa-cheese"></i>
<span>Extra Cheese</span>
</button>
</div>
</div>
<button
onClick={() => {
addToCart({
...selectedDish,
quantity: selectedDish.quantity || 1,
specialInstructions: selectedDish.specialInstructions,
spicyLevel: selectedDish.spicyLevel,
extraCheese: selectedDish.extraCheese
});
setSelectedDish(null);
}}
className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap text-lg font-semibold"
>
Add to Cart - ${((selectedDish.price || 0) * (selectedDish.quantity || 1)).toFixed(2)}
</button>
</div>
</div>
</div>
</div>
)}
{/* Notifications Panel */}
{showNotifications && (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn">
<div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl animate-slideInRight">
<div className="p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-xl font-bold">Notifications</h2>
<button
onClick={() => {
setShowNotifications(false);
setUnreadNotifications(0);
}}
className="text-gray-500 hover:text-gray-700"
>
<i className="fa-solid fa-times"></i>
</button>
</div>
<div className="space-y-4">
{notifications.map(notification => (
<div key={notification.id} className={`p-4 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}>
<div className="flex justify-between items-start mb-2">
<h3 className="font-semibold">{notification.title}</h3>
<span className="text-xs text-gray-500">{notification.time}</span>
</div>
<p className="text-gray-600 text-sm">{notification.message}</p>
</div>
))}
</div>
</div>
</div>
</div>
)}
{/* Features Panel */}
{showFeatures && (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn">
<div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl animate-slideInRight">
<div className="p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-xl font-bold">Features</h2>
<button
onClick={() => setShowFeatures(false)}
className="text-gray-500 hover:text-gray-700"
>
<i className="fa-solid fa-times"></i>
</button>
</div>
<div className="space-y-4">
<button onClick={() => {
const orderManagementModal = document.createElement('div');
orderManagementModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
orderManagementModal.innerHTML = `
<div class="bg-white rounded-lg w-[1000px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Order Management</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="flex space-x-4 mb-6">
<button onclick="
this.classList.add('bg-indigo-600', 'text-white');
this.classList.remove('bg-gray-100', 'text-gray-700');
this.nextElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.nextElementSibling.classList.add('bg-gray-100', 'text-gray-700');
this.nextElementSibling.nextElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.nextElementSibling.nextElementSibling.classList.add('bg-gray-100', 'text-gray-700');
document.getElementById('activeOrders').classList.remove('hidden');
document.getElementById('pastOrders').classList.add('hidden');
document.getElementById('cancelledOrders').classList.add('hidden');
" class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Active Orders</button>
<button onclick="
this.classList.add('bg-indigo-600', 'text-white');
this.classList.remove('bg-gray-100', 'text-gray-700');
this.previousElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.previousElementSibling.classList.add('bg-gray-100', 'text-gray-700');
this.nextElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.nextElementSibling.classList.add('bg-gray-100', 'text-gray-700');
document.getElementById('activeOrders').classList.add('hidden');
document.getElementById('pastOrders').classList.remove('hidden');
document.getElementById('cancelledOrders').classList.add('hidden');
" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">Past Orders</button>
<button onclick="
this.classList.add('bg-indigo-600', 'text-white');
this.classList.remove('bg-gray-100', 'text-gray-700');
this.previousElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.previousElementSibling.classList.add('bg-gray-100', 'text-gray-700');
this.previousElementSibling.previousElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.previousElementSibling.previousElementSibling.classList.add('bg-gray-100', 'text-gray-700');
document.getElementById('activeOrders').classList.add('hidden');
document.getElementById('pastOrders').classList.add('hidden');
document.getElementById('cancelledOrders').classList.remove('hidden');
" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">Cancelled</button>
</div>
<!-- Active Orders -->
<div class="space-y-6">
<!-- Current Cart Order -->
${cartItems.length > 0 ? `
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">#${Math.floor(Math.random() * 10000)} - New Order</h3>
<p class="text-gray-600">Placed on Feb 18, 2025 at 11:34 AM</p>
</div>
<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Cart Items</span>
</div>
<div class="space-y-4 mb-4">
${cartItems.map(item => `
<div class="flex justify-between items-center py-2 border-b">
<div class="flex items-center space-x-4">
<img src="${item.image || 'https://public.readdy.ai/ai/img_res/79d598e2bebd5f8f7ad3bc27bfbbb53e.jpg'}" class="w-12 h-12 rounded-lg object-cover" />
<div>
<div class="font-medium">${item.name}</div>
<div class="text-sm text-gray-600">Quantity: ${item.quantity}</div>
</div>
</div>
<div class="font-medium">$${(item.price * item.quantity).toFixed(2)}</div>
</div>
`).join('')}
</div>
<div class="flex justify-between items-center font-semibold text-lg mb-4">
<span>Total Amount:</span>
<span>$${cartTotal.toFixed(2)}</span>
</div>
<div class="flex space-x-4">
<button class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Proceed to Checkout</button>
</div>
</div>
` : ''}
<!-- In Progress Order -->
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">#12345 - In Progress</h3>
<p class="text-gray-600">Placed on Feb 18, 2025 at 11:30 AM</p>
</div>
<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Preparing</span>
</div>
<div class="grid grid-cols-2 gap-8">
<div class="space-y-4">
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Restaurant</div>
<div class="font-medium">The Gourmet Kitchen</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Order Details</div>
<div class="space-y-2">
<div class="flex justify-between">
<span>Truffle Pizza x 1</span>
<span>$24.99</span>
</div>
<div class="flex justify-between">
<span>Wagyu Burger x 1</span>
<span>$29.99</span>
</div>
</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Delivery Address</div>
<div class="font-medium">1234 Central Park West, New York, NY 10024</div>
</div>
</div>
<div class="space-y-4">
<div class="bg-gray-50 h-48 rounded-lg relative overflow-hidden">
<img src="https://public.readdy.ai/ai/img_res/71fd387fbb9f96c40703b0e6ab57b532.jpg"
alt="Delivery Route"
class="w-full h-full object-cover"
/>
<div class="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-lg">
<div class="flex items-center justify-between text-sm">
<span>Estimated Arrival:</span>
<span class="font-semibold">25-30 mins</span>
</div>
</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="space-y-4">
<div class="flex items-center">
<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
<i class="fa-solid fa-check"></i>
</div>
<div class="h-1 flex-1 bg-green-500"></div>
<div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
<i class="fa-solid fa-utensils"></i>
</div>
<div class="h-1 flex-1 bg-gray-300"></div>
<div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
<i class="fa-solid fa-truck"></i>
</div>
</div>
<div class="grid grid-cols-3 text-center text-sm">
<div class="text-green-500">Order Confirmed</div>
<div class="text-indigo-600">Preparing</div>
<div class="text-gray-500">On the Way</div>
</div>
</div>
</div>
</div>
</div>
<div class="flex space-x-4 mt-4">
<button class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Track Order</button>
<button class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors !rounded-button whitespace-nowrap">Cancel Order</button>
</div>
</div>
<!-- Past Orders -->
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">#12344 - Completed</h3>
<p class="text-gray-600">Delivered on Feb 15, 2025 at 7:45 PM</p>
</div>
<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Delivered</span>
</div>
<div class="grid grid-cols-2 gap-4 mb-4">
<div>
<div class="text-sm text-gray-600 mb-1">Restaurant</div>
<div class="font-medium">Sushi Master</div>
</div>
<div>
<div class="text-sm text-gray-600 mb-1">Total Amount</div>
<div class="font-medium">$89.99</div>
</div>
<div>
<div class="text-sm text-gray-600 mb-1">Items</div>
<div class="font-medium">Omakase Set, Wagyu Nigiri</div>
</div>
<div>
<div class="text-sm text-gray-600 mb-1">Delivery Time</div>
<div class="font-medium">Delivered in 28 mins</div>
</div>
</div>
<div class="flex space-x-4">
<button class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Order Again</button>
<button onclick="
const orderDetailsModal = document.createElement('div');
orderDetailsModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center';
orderDetailsModal.innerHTML = \`
<div class='bg-white rounded-lg w-[800px] p-8 max-h-[90vh] overflow-y-auto'>
<div class='flex justify-between items-center mb-6'>
<h2 class='text-2xl font-bold'>Order Details #12344</h2>
<button onclick='this.closest(\".fixed\").remove()' class='text-gray-500 hover:text-gray-700'>
<i class='fa-solid fa-times'></i>
</button>
</div>
<div class='space-y-6'>
<div class='grid grid-cols-2 gap-6'>
<div class='bg-gray-50 p-4 rounded-lg'>
<div class='text-sm text-gray-600 mb-1'>Order Status</div>
<div class='flex items-center space-x-2'>
<span class='w-3 h-3 bg-green-500 rounded-full'></span>
<span class='font-medium'>Delivered</span>
</div>
</div>
<div class='bg-gray-50 p-4 rounded-lg'>
<div class='text-sm text-gray-600 mb-1'>Order Date & Time</div>
<div class='font-medium'>February 15, 2025 at 7:45 PM</div>
</div>
</div>
<div class='bg-gray-50 p-6 rounded-lg'>
<h3 class='font-semibold mb-4'>Order Items</h3>
<div class='space-y-4'>
<div class='flex items-center justify-between py-2 border-b'>
<div class='flex items-center space-x-4'>
<img src='https://public.readdy.ai/ai/img_res/55d72d313c5c7880b17ea362e7b470c2.jpg' class='w-16 h-16 rounded-lg object-cover'/>
<div>
<div class='font-medium'>Omakase Set</div>
<div class='text-sm text-gray-600'>Quantity: 1</div>
</div>
</div>
<div class='font-medium'>$89.99</div>
</div>
<div class='flex items-center justify-between py-2 border-b'>
<div class='flex items-center space-x-4'>
<img src='https://public.readdy.ai/ai/img_res/27e066c7f072bc442c2aac68c41835e4.jpg' class='w-16 h-16 rounded-lg object-cover'/>
<div>
<div class='font-medium'>Wagyu Nigiri</div>
<div class='text-sm text-gray-600'>Quantity: 1</div>
</div>
</div>
<div class='font-medium'>$32.99</div>
</div>
</div>
<div class='mt-4 space-y-2'>
<div class='flex justify-between text-sm text-gray-600'>
<span>Subtotal</span>
<span>$122.98</span>
</div>
<div class='flex justify-between text-sm text-gray-600'>
<span>Delivery Fee</span>
<span>Free</span>
</div>
<div class='flex justify-between text-sm text-gray-600'>
<span>Tax</span>
<span>$9.84</span>
</div>
<div class='flex justify-between font-semibold pt-2 border-t'>
<span>Total</span>
<span>$132.82</span>
</div>
</div>
</div>
<div class='bg-gray-50 p-6 rounded-lg'>
<h3 class='font-semibold mb-4'>Delivery Details</h3>
<div class='space-y-4'>
<div class='flex items-start space-x-3'>
<i class='fa-solid fa-location-dot text-gray-600 mt-1'></i>
<div>
<div class='font-medium'>Delivery Address</div>
<div class='text-gray-600'>555 Madison Avenue, New York, NY 10022</div>
</div>
</div>
<div class='flex items-start space-x-3'>
<i class='fa-solid fa-user text-gray-600 mt-1'></i>
<div>
<div class='font-medium'>Delivery Partner</div>
<div class='text-gray-600'>James Wilson</div>
<div class='text-sm text-gray-500'>Order delivered in 28 minutes</div>
</div>
</div>
</div>
</div>
<div class='bg-gray-50 p-6 rounded-lg'>
<h3 class='font-semibold mb-4'>Payment Information</h3>
<div class='space-y-4'>
<div class='flex items-center space-x-3'>
<i class='fa-solid fa-credit-card text-gray-600'></i>
<div>
<div class='font-medium'>Payment Method</div>
<div class='text-gray-600'>Mastercard ending in 8888</div>
</div>
</div>
<div class='flex items-center space-x-3'>
<i class='fa-solid fa-receipt text-gray-600'></i>
<div>
<div class='font-medium'>Transaction ID</div>
<div class='text-gray-600'>TXN123456789</div>
</div>
</div>
</div>
</div>
<div class='flex space-x-4'>
<button class='flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap'>
<i class='fa-solid fa-download mr-2'></i>Download Receipt
</button>
<button class='flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap'>
<i class='fa-solid fa-rotate-left mr-2'></i>Reorder
</button>
</div>
</div>
</div>
\`;
document.body.appendChild(orderDetailsModal);
" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">View Details</button>
</div>
</div>
<!-- Cancelled Order -->
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">#12343 - Cancelled</h3>
<p class="text-gray-600">Cancelled on Feb 12, 2025 at 6:30 PM</p>
</div>
<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Cancelled</span>
</div>
<div class="grid grid-cols-2 gap-4 mb-4">
<div>
<div class="text-sm text-gray-600 mb-1">Restaurant</div>
<div class="font-medium">Burger Paradise</div>
</div>
<div>
<div class="text-sm text-gray-600 mb-1">Refund Status</div>
<div class="font-medium text-green-600">$34.94 Refunded (- $5.00 fee)</div>
</div>
<div>
<div class="text-sm text-gray-600 mb-1">Items</div>
<div class="font-medium">Truffle Burger, Surf & Turf Burger</div>
</div>
<div>
<div class="text-sm text-gray-600 mb-1">Cancellation Reason</div>
<div class="font-medium">Customer requested cancellation</div>
</div>
</div>
<div class="flex space-x-4">
<button class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Order Again</button>
<button onclick="
const orderDetailsModal = document.createElement('div');
orderDetailsModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center';
orderDetailsModal.innerHTML = \`
<div class='bg-white rounded-lg w-[800px] p-8 max-h-[90vh] overflow-y-auto'>
<div class='flex justify-between items-center mb-6'>
<h2 class='text-2xl font-bold'>Order Details #12344</h2>
<button onclick='this.closest(\".fixed\").remove()' class='text-gray-500 hover:text-gray-700'>
<i class='fa-solid fa-times'></i>
</button>
</div>
<div class='space-y-6'>
<div class='grid grid-cols-2 gap-6'>
<div class='bg-gray-50 p-4 rounded-lg'>
<div class='text-sm text-gray-600 mb-1'>Order Status</div>
<div class='flex items-center space-x-2'>
<span class='w-3 h-3 bg-green-500 rounded-full'></span>
<span class='font-medium'>Delivered</span>
</div>
</div>
<div class='bg-gray-50 p-4 rounded-lg'>
<div class='text-sm text-gray-600 mb-1'>Order Date & Time</div>
<div class='font-medium'>February 15, 2025 at 7:45 PM</div>
</div>
</div>
<div class='bg-gray-50 p-6 rounded-lg'>
<h3 class='font-semibold mb-4'>Order Items</h3>
<div class='space-y-4'>
<div class='flex items-center justify-between py-2 border-b'>
<div class='flex items-center space-x-4'>
<img src='https://readdy.ai/api/search-image?query=elegant omakase sushi set with various premium fish and garnishes arranged beautifully on dark stone plate professional lighting&width=80&height=80&orientation=squarish' class='w-16 h-16 rounded-lg object-cover'/>
<div>
<div class='font-medium'>Omakase Set</div>
<div class='text-sm text-gray-600'>Quantity: 1</div>
</div>
</div>
<div class='font-medium'>$89.99</div>
</div>
<div class='flex items-center justify-between py-2 border-b'>
<div class='flex items-center space-x-4'>
<img src='https://readdy.ai/api/search-image?query=premium wagyu beef nigiri sushi with gold leaf and truffle on black slate plate professional lighting&width=80&height=80&orientation=squarish' class='w-16 h-16 rounded-lg object-cover'/>
<div>
<div class='font-medium'>Wagyu Nigiri</div>
<div class='text-sm text-gray-600'>Quantity: 1</div>
</div>
</div>
<div class='font-medium'>$32.99</div>
</div>
</div>
<div class='mt-4 space-y-2'>
<div class='flex justify-between text-sm text-gray-600'>
<span>Subtotal</span>
<span>$122.98</span>
</div>
<div class='flex justify-between text-sm text-gray-600'>
<span>Delivery Fee</span>
<span>Free</span>
</div>
<div class='flex justify-between text-sm text-gray-600'>
<span>Tax</span>
<span>$9.84</span>
</div>
<div class='flex justify-between font-semibold pt-2 border-t'>
<span>Total</span>
<span>$132.82</span>
</div>
</div>
</div>
<div class='bg-gray-50 p-6 rounded-lg'>
<h3 class='font-semibold mb-4'>Delivery Details</h3>
<div class='space-y-4'>
<div class='flex items-start space-x-3'>
<i class='fa-solid fa-location-dot text-gray-600 mt-1'></i>
<div>
<div class='font-medium'>Delivery Address</div>
<div class='text-gray-600'>555 Madison Avenue, New York, NY 10022</div>
</div>
</div>
<div class='flex items-start space-x-3'>
<i class='fa-solid fa-user text-gray-600 mt-1'></i>
<div>
<div class='font-medium'>Delivery Partner</div>
<div class='text-gray-600'>James Wilson</div>
<div class='text-sm text-gray-500'>Order delivered in 28 minutes</div>
</div>
</div>
</div>
</div>
<div class='bg-gray-50 p-6 rounded-lg'>
<h3 class='font-semibold mb-4'>Payment Information</h3>
<div class='space-y-4'>
<div class='flex items-center space-x-3'>
<i class='fa-solid fa-credit-card text-gray-600'></i>
<div>
<div class='font-medium'>Payment Method</div>
<div class='text-gray-600'>Mastercard ending in 8888</div>
</div>
</div>
<div class='flex items-center space-x-3'>
<i class='fa-solid fa-receipt text-gray-600'></i>
<div>
<div class='font-medium'>Transaction ID</div>
<div class='text-gray-600'>TXN123456789</div>
</div>
</div>
</div>
</div>
<div class='flex space-x-4'>
<button class='flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap'>
<i class='fa-solid fa-download mr-2'></i>Download Receipt
</button>
<button class='flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap'>
<i class='fa-solid fa-rotate-left mr-2'></i>Reorder
</button>
</div>
</div>
</div>
\`;
document.body.appendChild(orderDetailsModal);
" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">View Details</button>
</div>
</div>
</div>
</div>
</div>
`;
document.body.appendChild(orderManagementModal);
}} className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50">
<div className="flex items-center">
<div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
<i className="fa-solid fa-clipboard-list text-indigo-600"></i>
</div>
<span>Order Management</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</button>
<button onClick={() => {
const paymentHistoryModal = document.createElement('div');
paymentHistoryModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
paymentHistoryModal.innerHTML = `
<div class="bg-white rounded-lg w-[1000px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Payment History</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="grid grid-cols-4 gap-4 mb-6">
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Total Spent</div>
<div class="text-2xl font-bold">$1,234.56</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Total Orders</div>
<div class="text-2xl font-bold">24</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Completed Orders</div>
<div class="text-2xl font-bold text-green-600">21</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Cancelled Orders</div>
<div class="text-2xl font-bold text-red-600">3</div>
</div>
</div>
<div class="bg-white p-6 rounded-lg border border-gray-200 mb-6">
<h3 class="text-lg font-semibold mb-4">Payment Methods</h3>
<div class="grid grid-cols-3 gap-4">
<div class="border rounded-lg p-4">
<div class="flex items-center space-x-3">
<i class="fa-solid fa-credit-card text-2xl text-indigo-600"></i>
<div>
<div class="font-medium">Visa ending in 4242</div>
<div class="text-sm text-gray-600">Expires 12/25</div>
</div>
</div>
</div>
<div class="border rounded-lg p-4">
<div class="flex items-center space-x-3">
<i class="fa-solid fa-credit-card text-2xl text-indigo-600"></i>
<div>
<div class="font-medium">Mastercard ending in 8888</div>
<div class="text-sm text-gray-600">Expires 09/24</div>
</div>
</div>
</div>
<div class="border rounded-lg p-4">
<div class="flex items-center space-x-3">
<i class="fa-solid fa-wallet text-2xl text-indigo-600"></i>
<div>
<div class="font-medium">Digital Wallet</div>
<div class="text-sm text-gray-600">Connected</div>
</div>
</div>
</div>
</div>
</div>
<div class="space-y-4">
<!-- Active Order Payment -->
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">Order #12345 - In Progress</h3>
<p class="text-gray-600">Feb 18, 2025 at 11:30 AM</p>
</div>
<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Processing</span>
</div>
<div class="grid grid-cols-2 gap-8">
<div class="space-y-3">
<div class="flex justify-between text-sm">
<span class="text-gray-600">Subtotal</span>
<span>$54.98</span>
</div>
<div class="flex justify-between text-sm">
<span class="text-gray-600">Delivery Fee</span>
<span>$5.00</span>
</div>
<div class="flex justify-between text-sm">
<span class="text-gray-600">Tax</span>
<span>$4.80</span>
</div>
<div class="flex justify-between font-semibold pt-2 border-t">
<span>Total</span>
<span>$64.78</span>
</div>
</div>
<div class="space-y-3">
<div class="flex items-center text-sm text-gray-600">
<i class="fa-solid fa-credit-card mr-2"></i>
<span>Visa ending in 4242</span>
</div>
<div class="flex items-center text-sm text-gray-600">
<i class="fa-solid fa-clock mr-2"></i>
<span>Payment authorized</span>
</div>
</div>
</div>
</div>
<!-- Completed Order Payment -->
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">Order #12344 - Completed</h3>
<p class="text-gray-600">Feb 15, 2025 at 7:45 PM</p>
</div>
<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Paid</span>
</div>
<div class="grid grid-cols-2 gap-8">
<div class="space-y-3">
<div class="flex justify-between text-sm">
<span class="text-gray-600">Subtotal</span>
<span>$89.99</span>
</div>
<div class="flex justify-between text-sm">
<span class="text-gray-600">Delivery Fee</span>
<span>$0.00</span>
</div>
<div class="flex justify-between text-sm">
<span class="text-gray-600">Tax</span>
<span>$7.20</span>
</div>
<div class="flex justify-between font-semibold pt-2 border-t">
<span>Total</span>
<span>$97.19</span>
</div>
</div>
<div class="space-y-3">
<div class="flex items-center text-sm text-gray-600">
<i class="fa-solid fa-credit-card mr-2"></i>
<span>Mastercard ending in 8888</span>
</div>
<div class="flex items-center text-sm text-green-600">
<i class="fa-solid fa-check-circle mr-2"></i>
<span>Payment completed</span>
</div>
</div>
</div>
</div>
<!-- Cancelled Order Payment -->
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">Order #12343 - Cancelled</h3>
<p class="text-gray-600">Feb 12, 2025 at 6:30 PM</p>
</div>
<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Refunded</span>
</div>
<div class="grid grid-cols-2 gap-8">
<div class="space-y-3">
<div class="flex justify-between text-sm">
<span class="text-gray-600">Original Amount</span>
<span>$39.99</span>
</div>
<div class="flex justify-between text-sm">
<span class="text-gray-600">Cancellation Fee</span>
<span class="text-red-600">-$5.00</span>
</div>
<div class="flex justify-between font-semibold pt-2 border-t">
<span>Refunded Amount</span>
<span class="text-green-600">$34.99</span>
</div>
</div>
<div class="space-y-3">
<div class="flex items-center text-sm text-gray-600">
<i class="fa-solid fa-credit-card mr-2"></i>
<span>Visa ending in 4242</span>
</div>
<div class="flex items-center text-sm text-green-600">
<i class="fa-solid fa-check-circle mr-2"></i>
<span>Refund processed</span>
</div>
<div class="text-sm text-gray-600">
<i class="fa-solid fa-info-circle mr-2"></i>
<span>Refund will appear in 3-5 business days</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
`;
document.body.appendChild(paymentHistoryModal);
}} className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50">
<div className="flex items-center">
<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
<i className="fa-solid fa-credit-card text-green-600"></i>
</div>
<span>Payment History</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</button>
<button onClick={() => {
const deliveryInfoModal = document.createElement('div');
deliveryInfoModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
deliveryInfoModal.innerHTML = `
<div class="bg-white rounded-lg w-[800px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Delivery Information</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Saved Addresses</h3>
<div class="space-y-4">
<div class="bg-white p-4 rounded-lg border-2 border-indigo-600">
<div class="flex justify-between items-start mb-2">
<div class="font-semibold">Home</div>
<span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">Default</span>
</div>
<p class="text-gray-600">1234 Central Park West</p>
<p class="text-gray-600">New York, NY 10024</p>
</div>
<div class="bg-white p-4 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-2">
<div class="font-semibold">Office</div>
</div>
<p class="text-gray-600">555 Madison Avenue</p>
<p class="text-gray-600">New York, NY 10022</p>
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Delivery Preferences</h3>
<div class="space-y-4">
<div class="flex items-center justify-between">
<div>
<div class="font-medium">Contactless Delivery</div>
<div class="text-sm text-gray-600">Leave order at the door</div>
</div>
<label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" class="sr-only peer" checked>
<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
</label>
</div>
<div class="flex items-center justify-between">
<div>
<div class="font-medium">Delivery Instructions</div>
<div class="text-sm text-gray-600">Special instructions for delivery</div>
</div>
<button class="text-indigo-600 hover:text-indigo-700">Edit</button>
</div>
</div>
</div>
</div>
</div>
`;
document.body.appendChild(deliveryInfoModal);
}} className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50">
<div className="flex items-center">
<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
<i className="fa-solid fa-truck text-blue-600"></i>
</div>
<span>Delivery Information</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</button>
<button onClick={() => {
const availabilityModal = document.createElement('div');
availabilityModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
availabilityModal.innerHTML = `
<div class="bg-white rounded-lg w-[800px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Availability Settings</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Delivery Hours</h3>
<div class="grid grid-cols-2 gap-4">
<div>
<label class="block text-sm text-gray-600 mb-1">Opening Time</label>
<input type="time" value="09:00" class="w-full p-2 border border-gray-300 rounded-lg" />
</div>
<div>
<label class="block text-sm text-gray-600 mb-1">Closing Time</label>
<input type="time" value="22:00" class="w-full p-2 border border-gray-300 rounded-lg" />
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Delivery Days</h3>
<div class="grid grid-cols-7 gap-2">
<button class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Mon</button>
<button class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Tue</button>
<button class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Wed</button>
<button class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Thu</button>
<button class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Fri</button>
<button class="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Sat</button>
<button class="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors !rounded-button whitespace-nowrap">Sun</button>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Delivery Range</h3>
<div class="space-y-4">
<div>
<label class="block text-sm text-gray-600 mb-1">Maximum Distance</label>
<input type="range" min="1" max="20" value="10" class="w-full" />
<div class="flex justify-between text-sm text-gray-600">
<span>1 km</span>
<span>10 km</span>
<span>20 km</span>
</div>
</div>
</div>
</div>
</div>
<div class="flex justify-end mt-6">
<button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap" onclick="this.closest('.fixed').remove()">
Save Changes
</button>
</div>
</div>
`;
document.body.appendChild(availabilityModal);
}} className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50">
<div className="flex items-center">
<div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
<i className="fa-solid fa-clock text-purple-600"></i>
</div>
<span>Availability Settings</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</button>
<button onClick={() => {
const helpSupportModal = document.createElement('div');
helpSupportModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
helpSupportModal.innerHTML = `
<div class="bg-white rounded-lg w-[800px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Help and Support</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">FAQs</h3>
<div class="space-y-4">
<div class="bg-white p-4 rounded-lg">
<button class="flex justify-between items-center w-full">
<span class="font-medium">How do I track my order?</span>
<i class="fa-solid fa-chevron-down text-gray-400"></i>
</button>
<p class="text-gray-600 mt-2">You can track your order in real-time through the app's tracking feature. Simply go to your active orders and click on 'Track Order'.</p>
</div>
<div class="bg-white p-4 rounded-lg">
<button class="flex justify-between items-center w-full" onclick="this.nextElementSibling.classList.toggle('hidden')">
<span class="font-medium">What if I need to cancel my order?</span>
<i class="fa-solid fa-chevron-down text-gray-400"></i>
</button>
<div class="hidden mt-2">
<p class="text-gray-600 mb-2">To cancel your order:</p>
<ol class="list-decimal list-inside text-gray-600 space-y-1">
<li>Go to 'Active Orders' in your account</li>
<li>Find the order you want to cancel</li>
<li>Click the 'Cancel Order' button</li>
<li>Select a cancellation reason</li>
<li>Confirm cancellation</li>
</ol>
<p class="text-gray-600 mt-2">Note: Orders can only be cancelled within 5 minutes of placing or before the restaurant starts preparing your food. Refunds will be processed according to our refund policy.</p>
</div>
</div>
<div class="bg-white p-4 rounded-lg">
<button class="flex justify-between items-center w-full" onclick="this.nextElementSibling.classList.toggle('hidden')">
<span class="font-medium">How do I contact customer support?</span>
<i class="fa-solid fa-chevron-down text-gray-400"></i>
</button>
<div class="hidden mt-2">
<p class="text-gray-600">You can reach our customer support team through multiple channels:</p>
<ul class="list-disc list-inside text-gray-600 mt-2 space-y-1">
<li>24/7 Live Chat Support</li>
<li>Phone Support: +1 (555) 123-4567</li>
<li>Email: support@foodhub.com</li>
<li>Video Call Support (Available 9 AM - 6 PM)</li>
</ul>
</div>
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="text-lg font-semibold mb-4">Contact Support</h3>
<div class="grid grid-cols-2 gap-4">
<button onclick="
const chatModal = document.createElement('div');
chatModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center';
chatModal.innerHTML = \`
<div class='bg-white rounded-lg w-[400px] h-[600px] flex flex-col'>
<div class='p-4 border-b flex justify-between items-center'>
<div class='flex items-center space-x-3'>
<div class='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
<i class='fa-solid fa-robot text-green-600'></i>
</div>
<div>
<div class='font-semibold'>AI Support Assistant</div>
<div class='text-sm text-green-600'>Online</div>
</div>
</div>
<button onclick='this.closest(\".fixed\").remove()' class='text-gray-500 hover:text-gray-700'>
<i class='fa-solid fa-times'></i>
</button>
</div>
<div class='flex-1 p-4 space-y-4 overflow-y-auto'>
<div class='flex items-start space-x-3'>
<div class='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
<i class='fa-solid fa-robot text-green-600 text-sm'></i>
</div>
<div class='bg-gray-100 rounded-lg p-3 max-w-[80%]'>
<p>Hello! I'm your AI support assistant. How can I help you today?</p>
</div>
</div>
</div>
<div class='p-4 border-t'>
<div class='flex space-x-2'>
<input type='text' placeholder='Type your message...' class='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'>
<button class='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap'>
<i class='fa-solid fa-paper-plane'></i>
</button>
</div>
<div class='mt-2 flex space-x-2'>
<button class='text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap'>Cancel order</button>
<button class='text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap'>Delivery issue</button>
<button class='text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap'>Payment help</button>
</div>
</div>
</div>
\`;
document.body.appendChild(chatModal);
" class="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 !rounded-button whitespace-nowrap">
<i class="fa-solid fa-comments text-indigo-600"></i>
<span>Live Chat</span>
</button>
<button onclick="
const callModal = document.createElement('div');
callModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center';
callModal.innerHTML = \`
<div class='bg-white rounded-lg w-[400px] p-6'>
<div class='text-center mb-6'>
<div class='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
<i class='fa-solid fa-headset text-2xl text-indigo-600'></i>
</div>
<h3 class='text-xl font-semibold'>Contact Support Team</h3>
<p class='text-gray-600 mt-2'>Our support team is available 24/7</p>
</div>
<div class='space-y-4'>
<div class='bg-gray-50 p-4 rounded-lg'>
<div class='text-sm text-gray-600 mb-1'>Support Hotline</div>
<div class='font-semibold'>+1 (555) 123-4567</div>
</div>
<div class='bg-gray-50 p-4 rounded-lg'>
<div class='text-sm text-gray-600 mb-1'>Current Wait Time</div>
<div class='font-semibold text-green-600'>< 2 minutes</div>
</div>
</div>
<div class='flex space-x-4 mt-6'>
<button onclick='this.closest(\".fixed\").remove()' class='flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap'>
Cancel
</button>
<button class='flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap'>
<i class='fa-solid fa-phone mr-2'></i>
Call Now
</button>
</div>
</div>
\`;
document.body.appendChild(callModal);
" class="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 !rounded-button whitespace-nowrap">
<i class="fa-solid fa-phone text-indigo-600"></i>
<span>Call Support</span>
</button>
<button onclick="
const emailModal = document.createElement('div');
emailModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center';
emailModal.innerHTML = \`
<div class='bg-white rounded-lg w-[500px] p-6'>
<div class='flex justify-between items-center mb-6'>
<h3 class='text-xl font-semibold'>Email Support</h3>
<button onclick='this.closest(\".fixed\").remove()' class='text-gray-500 hover:text-gray-700'>
<i class='fa-solid fa-times'></i>
</button>
</div>
<div class='space-y-4'>
<div>
<label class='block text-sm text-gray-600 mb-1'>Subject</label>
<select class='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'>
<option>Order Issue</option>
<option>Payment Problem</option>
<option>Delivery Concern</option>
<option>Account Support</option>
<option>Other</option>
</select>
</div>
<div>
<label class='block text-sm text-gray-600 mb-1'>Message</label>
<textarea class='w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Please describe your issue...'></textarea>
</div>
<div>
<label class='block text-sm text-gray-600 mb-1'>Attachments</label>
<div class='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center'>
<i class='fa-solid fa-cloud-upload text-2xl text-gray-400 mb-2'></i>
<p class='text-sm text-gray-600'>Drag and drop files here or click to upload</p>
</div>
</div>
</div>
<div class='flex justify-end mt-6'>
<button onclick='this.closest(\".fixed\").remove()' class='bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap'>
Send Message
</button>
</div>
</div>
\`;
document.body.appendChild(emailModal);
" class="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 !rounded-button whitespace-nowrap">
<i class="fa-solid fa-envelope text-indigo-600"></i>
<span>Email Support</span>
</button>
<button class="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 !rounded-button whitespace-nowrap">
<i class="fa-solid fa-video text-indigo-600"></i>
<span>Video Call</span>
</button>
</div>
</div>
</div>
</div>
`;
document.body.appendChild(helpSupportModal);
}} className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50">
<div className="flex items-center">
<div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
<i className="fa-solid fa-headset text-yellow-600"></i>
</div>
<span>Help and Support</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</button>
<button onClick={() => {
const requestManagementModal = document.createElement('div');
requestManagementModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
requestManagementModal.innerHTML = `
<div class="bg-white rounded-lg w-[800px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Request Management</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="flex space-x-4 mb-6">
<button onclick="
this.classList.add('bg-indigo-600', 'text-white');
this.classList.remove('bg-gray-100', 'text-gray-700');
this.nextElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.nextElementSibling.classList.add('bg-gray-100', 'text-gray-700');
this.nextElementSibling.nextElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.nextElementSibling.nextElementSibling.classList.add('bg-gray-100', 'text-gray-700');
document.getElementById('activeRequests').classList.remove('hidden');
document.getElementById('completedRequests').classList.add('hidden');
document.getElementById('cancelledRequests').classList.add('hidden');
" class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">Active</button>
<button onclick="
this.classList.add('bg-indigo-600', 'text-white');
this.classList.remove('bg-gray-100', 'text-gray-700');
this.previousElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.previousElementSibling.classList.add('bg-gray-100', 'text-gray-700');
this.nextElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.nextElementSibling.classList.add('bg-gray-100', 'text-gray-700');
document.getElementById('activeRequests').classList.add('hidden');
document.getElementById('completedRequests').classList.remove('hidden');
document.getElementById('cancelledRequests').classList.add('hidden');
" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">Completed</button>
<button onclick="
this.classList.add('bg-indigo-600', 'text-white');
this.classList.remove('bg-gray-100', 'text-gray-700');
this.previousElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.previousElementSibling.classList.add('bg-gray-100', 'text-gray-700');
this.previousElementSibling.previousElementSibling.classList.remove('bg-indigo-600', 'text-white');
this.previousElementSibling.previousElementSibling.classList.add('bg-gray-100', 'text-gray-700');
document.getElementById('activeRequests').classList.add('hidden');
document.getElementById('completedRequests').classList.add('hidden');
document.getElementById('cancelledRequests').classList.remove('hidden');
" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">Cancelled</button>
</div>
<div class="space-y-4" id="activeRequests">
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">#REQ12345 - Special Request</h3>
<p class="text-gray-600">Submitted on Feb 18, 2025 at 11:30 AM</p>
</div>
<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">In Progress</span>
</div>
<div class="space-y-4">
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Request Details</div>
<p class="font-medium">Extra utensils and napkins needed for large party order</p>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Restaurant Response</div>
<p class="font-medium">We'll include extra utensils and napkins with your order</p>
</div>
</div>
<div class="flex space-x-4 mt-4">
<button class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors !rounded-button whitespace-nowrap">Accept Response</button>
<button onclick="
const messageModal = document.createElement('div');
messageModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center';
messageModal.innerHTML = \`
<div class='bg-white rounded-lg w-[500px] p-6'>
<div class='flex justify-between items-center mb-6'>
<div class='flex items-center space-x-3'>
<div class='w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center'>
<i class='fa-solid fa-utensils text-indigo-600'></i>
</div>
<div>
<h3 class='text-xl font-semibold'>The Gourmet Kitchen</h3>
<div class='text-sm text-gray-600'>Usually responds within 5 minutes</div>
</div>
</div>
<button onclick='this.closest(\".fixed\").remove()' class='text-gray-500 hover:text-gray-700'>
<i class='fa-solid fa-times'></i>
</button>
</div>
<div class='h-64 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto'>
<div class='flex flex-col space-y-4'>
<div class='flex items-start space-x-3'>
<div class='w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
<i class='fa-solid fa-utensils text-indigo-600 text-sm'></i>
</div>
<div class='bg-white rounded-lg p-3 shadow-sm max-w-[80%]'>
<p class='text-gray-800'>We'll include extra utensils and napkins with your order.</p>
<div class='text-xs text-gray-500 mt-1'>11:30 AM</div>
</div>
</div>
<div class='flex items-start space-x-3 justify-end'>
<div class='bg-indigo-600 text-white rounded-lg p-3 shadow-sm max-w-[80%]'>
<p>Thank you! Could you please ensure there are at least 10 sets?</p>
<div class='text-xs text-indigo-200 mt-1'>11:31 AM</div>
</div>
<div class='w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0'>
<i class='fa-solid fa-user text-white text-sm'></i>
</div>
</div>
</div>
</div>
<div class='flex space-x-3'>
<input type='text' placeholder='Type your message...' class='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'>
<button class='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap'>
<i class='fa-solid fa-paper-plane'></i>
</button>
</div>
</div>
\`;
document.body.appendChild(messageModal);
" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">Message Restaurant</button>
</div>
</div>
</div>
<div class="space-y-4 hidden" id="completedRequests">
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">#REQ12344 - Menu Modification</h3>
<p class="text-gray-600">Completed on Feb 15, 2025</p>
</div>
<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
</div>
<div class="space-y-4">
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Request Details</div>
<p class="font-medium">No onions in the Wagyu Burger please</p>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Restaurant Response</div>
<p class="font-medium">We've noted your preference and prepared the burger without onions</p>
</div>
</div>
</div>
</div>
<div class="space-y-4 hidden" id="cancelledRequests">
<div class="bg-white p-6 rounded-lg border border-gray-200">
<div class="flex justify-between items-start mb-4">
<div>
<h3 class="text-lg font-semibold">#REQ12343 - Special Ingredients</h3>
<p class="text-gray-600">Cancelled on Feb 12, 2025</p>
</div>
<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Cancelled</span>
</div>
<div class="space-y-4">
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Request Details</div>
<p class="font-medium">Gluten-free pasta option for Truffle Pasta</p>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<div class="text-sm text-gray-600 mb-1">Cancellation Reason</div>
<p class="font-medium">Restaurant unable to accommodate gluten-free pasta request</p>
</div>
</div>
</div>
</div>
</div>
</div>
`;
document.body.appendChild(requestManagementModal);
}} className="w-full flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50">
<div className="flex items-center">
<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
<i className="fa-solid fa-list-check text-red-600"></i>
</div>
<span>Request Management</span>
</div>
<i className="fa-solid fa-chevron-right text-gray-400"></i>
</button>
</div>
</div>
</div>
</div>
)}
{/* Cart Sidebar */}
{isCartOpen && (
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn">
<div className="absolute right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-lg shadow-2xl border-l border-purple-100 animate-slideInRight">
<div className="p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-xl font-bold">Your Cart</h2>
<button
onClick={() => setIsCartOpen(false)}
className="text-gray-500 hover:text-gray-700"
>
<i className="fa-solid fa-times"></i>
</button>
</div>
{cartItems.length === 0 ? (
<p className="text-gray-500 text-center">Your cart is empty</p>
) : (
<>
<div className="space-y-4 mb-6 animate-slideInRight">
{cartItems.map(item => (
<div key={item.id} className="border-b border-gray-200 pb-4 mb-4">
<div className="flex items-center justify-between mb-2">
<div>
<h3 className="font-semibold">{item.name}</h3>
<p className="text-gray-500">${item.price} x {item.quantity}</p>
</div>
<button
onClick={() => removeFromCart(item.id)}
className="text-red-500 hover:text-red-700"
>
<i className="fa-solid fa-trash"></i>
</button>
</div>
{(item.spicyLevel === 'spicy' || item.extraCheese) && (
<div className="flex gap-2 mb-2">
{item.spicyLevel === 'spicy' && (
<span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
<i className="fa-solid fa-pepper-hot mr-1"></i>
Spicy
</span>
)}
{item.extraCheese && (
<span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
<i className="fa-solid fa-cheese mr-1"></i>
Extra Cheese
</span>
)}
</div>
)}
{item.specialInstructions && (
<p className="text-sm text-gray-500 italic">
Note: {item.specialInstructions}
</p>
)}
</div>
))}
</div>
<div className="border-t pt-4">
<div className="space-y-4 mb-4">
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-semibold mb-3">Delivery Options</h3>
<div className="space-y-2">
<label className="flex items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-50">
<input type="radio" name="deliveryOption" className="mr-3" defaultChecked />
<div>
<div className="font-medium">Standard Delivery</div>
<div className="text-sm text-gray-500">25-35 mins • Free delivery</div>
</div>
</label>
<label className="flex items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-50">
<input type="radio" name="deliveryOption" className="mr-3" />
<div>
<div className="font-medium">Express Delivery</div>
<div className="text-sm text-gray-500">15-20 mins • $2.99</div>
</div>
</label>
</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-semibold mb-3">Payment Method</h3>
<div className="space-y-2">
<label className="flex items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-50">
<input type="radio" name="paymentMethod" className="mr-3" defaultChecked />
<div className="flex items-center">
<i className="fa-solid fa-credit-card mr-2 text-gray-600"></i>
<span>Credit Card</span>
</div>
</label>
<label className="flex items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-50">
<input type="radio" name="paymentMethod" className="mr-3" />
<div className="flex items-center">
<i className="fa-solid fa-wallet mr-2 text-gray-600"></i>
<span>Digital Wallet</span>
</div>
</label>
<label className="flex items-center p-2 bg-white rounded cursor-pointer hover:bg-gray-50">
<input type="radio" name="paymentMethod" className="mr-3" />
<div className="flex items-center">
<i className="fa-solid fa-money-bill mr-2 text-gray-600"></i>
<span>Cash on Delivery</span>
</div>
</label>
</div>
</div>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between text-sm text-gray-600">
<span>Subtotal</span>
<span>${cartTotal.toFixed(2)}</span>
</div>
<div className="flex items-center justify-between text-sm text-gray-600">
<span>Delivery Fee</span>
<span>Free</span>
</div>
<div className="flex items-center justify-between font-semibold">
<span>Total</span>
<span className="text-lg">${cartTotal.toFixed(2)}</span>
</div>
</div>
<button
onClick={() => {
// First show a processing animation
const processingModal = document.createElement('div');
processingModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
processingModal.innerHTML = `
<div class="bg-white rounded-lg p-8 text-center">
<div class="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
<h2 class="text-xl font-bold mb-2">Processing Your Order</h2>
<p class="text-gray-600">Please wait while we confirm your order...</p>
</div>
`;
document.body.appendChild(processingModal);
// After 2 seconds, show the confirmation
setTimeout(() => {
processingModal.remove();
const orderConfirmationModal = document.createElement('div');
orderConfirmationModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
orderConfirmationModal.innerHTML = `
<div class="bg-white rounded-lg w-[600px] p-8">
<div class="text-center mb-6">
<div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
<i class="fa-solid fa-check text-3xl text-green-600"></i>
</div>
<h2 class="text-2xl font-bold mb-2">Order Confirmed!</h2>
<p class="text-gray-600">Your delicious food is on its way</p>
</div>
<div class="bg-gray-50 p-6 rounded-lg mb-6">
<div class="flex items-center justify-between mb-4">
<div class="font-semibold">Estimated Delivery Time</div>
<div class="text-indigo-600 font-bold">30-35 minutes</div>
</div>
<div class="w-full bg-gray-200 rounded-full h-2 mb-4">
<div class="bg-indigo-600 h-2 rounded-full" style="width: 15%"></div>
</div>
<div class="grid grid-cols-4 gap-4 text-center">
<div>
<div class="mb-2">
<img src="https://public.readdy.ai/ai/img_res/d62128d8153f168f8bd2f78ed28a4a26.jpg" alt="Order Placed" class="w-full h-24 object-cover rounded-lg mb-2" />
</div>
<div class="text-indigo-600 font-semibold">Order Placed</div>
<div class="text-xs text-gray-500">11:30 AM</div>
</div>
<div>
<div class="mb-2">
<img src="https://public.readdy.ai/ai/img_res/17b46479b6d5f3fbc6ee6df9a8f2c263.jpg" alt="Preparing" class="w-full h-24 object-cover rounded-lg mb-2" />
</div>
<div class="text-gray-500">Preparing</div>
<div class="text-xs text-gray-500">11:35 AM</div>
</div>
<div>
<div class="mb-2">
<img src="https://public.readdy.ai/ai/img_res/93f95cb8156b51bf5992167e59992553.jpg" alt="On the Way" class="w-full h-24 object-cover rounded-lg mb-2" />
</div>
<div class="text-gray-500">On the Way</div>
<div class="text-xs text-gray-500">11:45 AM</div>
</div>
<div>
<div class="mb-2">
<img src="https://public.readdy.ai/ai/img_res/947313b626109d91c90e370fdbeb693b.jpg" alt="Delivered" class="w-full h-24 object-cover rounded-lg mb-2" />
</div>
<div class="text-gray-500">Delivered</div>
<div class="text-xs text-gray-500">12:05 PM</div>
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg mb-6">
<h3 class="font-semibold mb-4">Delivery Details</h3>
<div class="space-y-3">
<div class="flex items-center space-x-3">
<i class="fa-solid fa-clock text-indigo-600"></i>
<div>
<div class="font-medium">Expected Arrival</div>
<div class="text-gray-600">Today, ${new Date().getHours()}:${(new Date().getMinutes() + 35).toString().padStart(2, '0')}</div>
</div>
</div>
<div class="flex items-center space-x-3">
<i class="fa-solid fa-location-dot text-indigo-600"></i>
<div>
<div class="font-medium">Delivery Address</div>
<div class="text-gray-600">1234 Central Park West, New York, NY 10024</div>
</div>
</div>
</div>
</div>
<div class="flex space-x-4">
<button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap">
Close
</button>
<button onclick="this.closest('.fixed').remove(); window.location.href = '#track-order'" class="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap">
Track Order
</button>
</div>
</div>
`;
document.body.appendChild(orderConfirmationModal);
}, 2000);
const orderConfirmationModal = document.createElement('div');
orderConfirmationModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center';
orderConfirmationModal.innerHTML = `
<div class="bg-white rounded-lg w-[600px] p-8">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Order Confirmation</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="space-y-6">
<div class="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
<div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
<i class="fa-solid fa-check text-green-600"></i>
</div>
<div>
<div class="font-semibold text-green-800">Order Successfully Placed!</div>
<div class="text-green-600">Your order #${Math.floor(Math.random() * 10000)} has been confirmed</div>
</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<h3 class="font-semibold mb-3">Order Summary</h3>
<div class="space-y-2">
${cartItems.map(item => `
<div class="flex justify-between items-center py-2 border-b border-gray-200">
<div>
<div class="font-medium">${item.name}</div>
<div class="text-sm text-gray-600">Quantity: ${item.quantity}</div>
${(item.spicyLevel === 'spicy' || item.extraCheese) ? `
<div class="flex gap-2 mt-1">
${item.spicyLevel === 'spicy' ? `
<span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
<i class="fa-solid fa-pepper-hot mr-1"></i>Spicy
</span>` : ''}
${item.extraCheese ? `
<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
<i class="fa-solid fa-cheese mr-1"></i>Extra Cheese
</span>` : ''}
</div>` : ''}
</div>
<div class="font-medium">$${(item.price * item.quantity).toFixed(2)}</div>
</div>
`).join('')}
<div class="flex justify-between items-center pt-2 font-semibold">
<span>Total Amount</span>
<span>$${cartTotal.toFixed(2)}</span>
</div>
</div>
</div>
<div class="bg-gray-50 p-4 rounded-lg">
<h3 class="font-semibold mb-3">Delivery Details</h3>
<div class="space-y-2">
<div class="flex items-center space-x-3">
<i class="fa-solid fa-location-dot text-gray-600"></i>
<div>
<div class="font-medium">Delivery Address</div>
<div class="text-gray-600">1234 Central Park West, New York, NY 10024</div>
</div>
</div>
<div class="flex items-center space-x-3">
<i class="fa-solid fa-clock text-gray-600"></i>
<div>
<div class="font-medium">Estimated Delivery Time</div>
<div class="text-gray-600">25-35 minutes</div>
</div>
</div>
</div>
</div>
<div class="flex space-x-4">
<button onclick="this.closest('.fixed').remove(); const orderModal = document.createElement('div'); orderModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center'; orderModal.innerHTML = \`
<div class="bg-white rounded-lg w-[1000px] p-8 max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<h2 class="text-2xl font-bold">Order Details & Tracking</h2>
<button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
<i class="fa-solid fa-times"></i>
</button>
</div>
<div class="grid grid-cols-2 gap-8">
<div>
<div class="bg-gray-50 p-6 rounded-lg mb-6">
<h3 class="font-semibold text-lg mb-4">Delivery Partner</h3>
<div class="flex items-center space-x-4">
<div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
<i class="fa-solid fa-user text-2xl text-indigo-600"></i>
</div>
<div>
<div class="font-semibold text-lg">Michael Anderson</div>
<div class="text-gray-600">ID: #DR78392</div>
<div class="flex items-center mt-2">
<i class="fa-solid fa-star text-yellow-400 mr-1"></i>
<span>4.9 (2,389 deliveries)</span>
</div>
</div>
</div>
<div class="flex items-center space-x-4 mt-4">
<button class="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 !rounded-button whitespace-nowrap">
<i class="fa-solid fa-phone"></i>
<span>+1 (555) 123-4567</span>
</button>
<button class="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 !rounded-button whitespace-nowrap">
<i class="fa-solid fa-message"></i>
<span>Message</span>
</button>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="font-semibold text-lg mb-4">Delivery Address</h3>
<div class="space-y-3">
<div class="flex items-start space-x-3">
<i class="fa-solid fa-location-dot text-indigo-600 mt-1"></i>
<div>
<div class="font-semibold">Home</div>
<div class="text-gray-600">1234 Central Park West</div>
<div class="text-gray-600">New York, NY 10024</div>
</div>
</div>
<div class="flex items-start space-x-3">
<i class="fa-solid fa-phone text-indigo-600 mt-1"></i>
<div>
<div class="font-semibold">Contact</div>
<div class="text-gray-600">+1 (555) 987-6543</div>
</div>
</div>
<div class="flex items-start space-x-3">
<i class="fa-solid fa-note-sticky text-indigo-600 mt-1"></i>
<div>
<div class="font-semibold">Delivery Instructions</div>
<div class="text-gray-600">Please ring doorbell twice. Building has elevator access.</div>
</div>
</div>
</div>
</div>
</div>
<div>
<div class="space-y-4">
<div class="bg-gray-50 h-[400px] rounded-lg relative overflow-hidden">
<img src="https://public.readdy.ai/ai/img_res/316fd04ca2b269df422949908ff09051.jpg"
alt="Delivery Route"
class="w-full h-full object-cover" />
<div class="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
<div class="flex items-center justify-between mb-2">
<div class="font-semibold">Estimated Arrival</div>
<div class="text-indigo-600 font-semibold">25-30 mins</div>
</div>
<div class="flex items-center space-x-2 text-sm text-gray-600">
<i class="fa-solid fa-route"></i>
<span>Driver is 2.3 miles away</span>
</div>
</div>
</div>
<div class="grid grid-cols-3 gap-4">
<div class="bg-white p-4 rounded-lg shadow-md">
<img src="https://public.readdy.ai/ai/img_res/d8a2263913beffaa97d1f90925b4d18d.jpg" alt="Restaurant" class="w-full h-24 object-cover rounded-lg mb-2" />
<div class="font-semibold">Starting Point</div>
<div class="text-sm text-gray-600">The Gourmet Kitchen</div>
<div class="text-xs text-gray-500">11:35 AM</div>
</div>
<div class="bg-white p-4 rounded-lg shadow-md">
<img src="https://public.readdy.ai/ai/img_res/4243ead5ad3b79124c3b671cc7a0f578.jpg" alt="Current Location" class="w-full h-24 object-cover rounded-lg mb-2" />
<div class="font-semibold">Current Location</div>
<div class="text-sm text-gray-600">Madison Avenue</div>
<div class="text-xs text-gray-500">11:45 AM</div>
</div>
<div class="bg-white p-4 rounded-lg shadow-md">
<img src="https://public.readdy.ai/ai/img_res/68de50ee77023c6db0e934f81498ab03.jpg" alt="Destination" class="w-full h-24 object-cover rounded-lg mb-2" />
<div class="font-semibold">Destination</div>
<div class="text-sm text-gray-600">Central Park West</div>
<div class="text-xs text-gray-500">12:05 PM (Expected)</div>
</div>
</div>
</div>
<div class="bg-gray-50 p-6 rounded-lg">
<h3 class="font-semibold text-lg mb-4">Order Status</h3>
<div class="space-y-6">
<div class="flex items-center">
<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
<i class="fa-solid fa-check"></i>
</div>
<div class="h-1 flex-1 bg-green-500"></div>
<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
<i class="fa-solid fa-check"></i>
</div>
<div class="h-1 flex-1 bg-green-500"></div>
<div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
<i class="fa-solid fa-utensils"></i>
</div>
<div class="h-1 flex-1 bg-gray-300"></div>
<div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
<i class="fa-solid fa-truck"></i>
</div>
</div>
<div class="grid grid-cols-4 text-center text-sm">
<div class="text-green-500 font-semibold">Order Placed</div>
<div class="text-green-500 font-semibold">Confirmed</div>
<div class="text-indigo-600 font-semibold">Preparing</div>
<div class="text-gray-500">On the Way</div>
</div>
</div>
</div>
</div>
</div>
</div>
`;
document.body.appendChild(orderModal);
}}
className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors mt-4 !rounded-button whitespace-nowrap">
Place Order
</button>
</div>
</>
)}
</div>
</div>
</div>
)}
</div>
);
};
export default App;
// end
