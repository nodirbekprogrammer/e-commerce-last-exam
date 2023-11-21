import Products from "@/components/sections/public/products/Products";

const ProductsPage = () => {
  return (
    <Products/>
  );
};

export default ProductsPage;





































// import ProductsRow from "@/components/shares/ProductsRow";
// import request from "@/server";
// import CategoryType from "@/types/category";
// import ProductType from "@/types/product";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const Products = () => {
//   const router = useRouter();
//   const search = useSearchParams();
//   const [products, setProducts] = useState([] as ProductType[]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([] as CategoryType[]);
//   const [category, setCategory] = useState(search.get("category") || "");
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState(search.get("search") || "");

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         setLoading(true);
//         const {
//           data: { total, products },
//         } = await request.get<{ total: number; products: ProductType[] }>(
//           `product?page=${page}&search=${searchQuery}`,
//           { params: { category: category || undefined } }
//         );
//         const { data } = await request.get("category");
//         setCategories(data);

//         setProducts(products);
//         setTotal(total);
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };
//     getProducts();
//   }, [category, searchQuery, page]);

//   const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setCategory(value);
//     setPage(1);
//     if (value === "") {
//       router.push(`products`);
//     } else {
//       router.push(`products?category=${value}`);
//     }
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setPage(1);
//     if (value === "") {
//       router.push(`products`);
//     } else {
//       router.push(`products?search=${value}`);
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     router.push(
//       `products?page=${newPage}${searchQuery ? `&search=${searchQuery}` : ""}${
//         category ? `&category=${category}` : ""
//       }`
//     );
//   };

//   return (
//     <section style={{ marginTop: "100px" }}>
//       <h1 className="py-3 my-3 border border-sky-600 text-center rounded-full text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
//         Products {total}
//       </h1>
//       <div className="flex justify-between p-6">
//         <form>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg
//                 className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearch}
//               className="block w-full p-4 pl-10 text-sm text-white border border-skt-500 rounded-lg bg-sky-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search..."
//             />
//           </div>
//         </form>

//         <select
//           className="block p-4 text-sm text-black border border-sky-500 rounded-lg bg-sky-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           value={category}
//           onChange={handleCategory}
//         >
//           <option value="">All</option>
//           {categories.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ProductsRow loading={loading} products={products} />
//       <div className="pagination text-white flex items-center justify-center gap-3 my-10">
//         {Array.from({ length: Math.ceil(total / 10) }, (_, index) => (
//           <button
//             className="border border-sky-700 rounded-lg p-3 hover:bg-sky-600 transition duration-300 ease-in-out active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 "
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Products;
