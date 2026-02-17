import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { categories } from "../assets/assets";
// const categories = [
//   {
//     text: "Dairy Products",
//     image: "/dairy_product_image.png",
//     bgColor: "#FEE6CD",
//   },
//   {
//     text: "Fresh Fruits",
//     image: "/fresh_fruits_image.png",
//     bgColor: "#FEE0E0",
//   },
//   {
//     text: "Organic Vegetables",
//     image: "/organic_vegitable_image.png",
//     bgColor: "#FEF6DA",
//   },
//   {
//         text: "Cold Drinks",
//         image: "/bottles_image.png",
//         bgColor: "#F0F5DE",
//   },
// {
//         text: "Instant Food",
//        image: "/maggi_image.png",
//         bgColor: "#E1F5EC",
// },
// {
//         text: "Bakery & Breads",
//         image: "/bakery_image.png",
//         bgColor: "#E0F6FE",
// },
// {
//         text: "Grains & Cereals",
//         image: "/grain_image.png",
//          bgColor: "#F1E3F9",
// },
// ];


const Category = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">
        Categories
      </p>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:grid-cols-7 gap-4 items-center justify-center">
        {categories.map((category, index) => (
          <div
          onClick={() => {
            navigate(`/products/${category.path.toLowerCase()}`);
            scrollTo(0, 0);
          }}
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center"
            style={{ backgroundColor: category.bgColor }}
          >
            <img
              src={category.image}
              alt=""
              className="max-w-28 transition group-hover:scale-110"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
