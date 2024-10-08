import { useState } from "react";
import { addProduct, deleteLastRow, searchProduct } from "../utils/script";
import logo from "../assets/logo.png/";

export default function MainContent() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productFreshness, setProductFreshness] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [rowCount, setRowCount] = useState(1000);

  const resetForm = () => {
    setProductName("");
    setProductCategory("");
    setProductImage("");
    setProductFreshness("");
    setProductDescription("");
    setProductPrice("");
  };

  const handleAddProduct = () => {
    const productData = {
      productName,
      productCategory,
      productImage,
      productFreshness,
      productDescription,
      productPrice,
    };

    const updatedProducts = addProduct(
      products,
      productData,
      rowCount,
      resetForm
    );

    if (updatedProducts !== products) {
      setProducts(updatedProducts);
      setRowCount(rowCount + 1);
    }
  };

  const handleDeleteLastRow = () => {
    const updatedProducts = deleteLastRow(products, setRowCount);
    if (updatedProducts !== products) {
      setProducts(updatedProducts);
    }
  };

  const handleSearchProduct = (searchValue) => {
    searchProduct(products, searchValue);
  };

  return (
    <>
      <div className="container mx-auto mt-10 max-w-3xl p-8">
        <div className="flex justify-center items-center mb-6">
          <img className="h-12" src={logo} alt="logo tailwind" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Create Product
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4">
            <label htmlFor="productName" className="block text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg"
            />
            <div>
              <label htmlFor="product-category" className="block text-gray-700">
                Product Category:
              </label>
              <select
                id="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              >
                <option value="">Choose...</option>
                <option value="ipsum">ipsum</option>
              </select>
            </div>
            <div>
              <label htmlFor="product-image" className="block text-gray-700">
                Image of Product:
              </label>
              <input
                type="text"
                id="productImage"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700">Product Freshness:</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="productFreshness"
                    value="Brand New"
                    onChange={(e) => setProductFreshness(e.target.value)}
                    className="text-blue-500"
                    required
                  />
                  <span className="ml-2">Brand New</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="productFreshness"
                    value="Second Hand"
                    onChange={(e) => setProductFreshness(e.target.value)}
                    className="text-blue-500"
                    required
                  />
                  <span className="ml-2">Second Hand</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="productFreshness"
                    value="Refurbished"
                    onChange={(e) => setProductFreshness(e.target.value)}
                    className="text-blue-500"
                    required
                  />
                  <span className="ml-2">Refurbished</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">
                Additional Description:
              </label>
              <textarea
                id="productDescription"
                rows={5}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-gray-700">
                Product Price:
              </label>
              <input
                type="number"
                id="productPrice"
                placeholder="$1"
                value={productPrice} 
                onChange={(e) => setProductPrice(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-blue-600 w-full text-white px-4 py-2 rounded-md mt-4"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mb-6 mt-8">
        <h1 className="text-2xl font-semibold text-gray-800">List Product</h1>
      </div>
      <div className="p-4">
        <table
          id="dataTable"
          className="table-auto shadow-lg rounded-lg w-auto"
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-2 text-left">No</th>
              <th className="px-2 py-2 text-left">Product Name</th>
              <th className="px-2 py-2 text-left">Product Category</th>
              <th className="px-2 py-2 text-left">Image of Product</th>
              <th className="px-2 py-2 text-left">Product Freshness</th>
              <th className="px-2 py-2 text-left">Additional Description</th>
              <th className="px-2 py-2 text-left">Product Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.rowNumber} className="border-b">
                <td className="px-2 py-2">{index + 1}</td>
                <td className="px-2 py-2">{product.name}</td>
                <td className="px-2 py-2">{product.category}</td>
                <td className="px-2 py-2">{product.image}</td>
                <td className="px-2 py-2">{product.freshness}</td>
                <td className="px-2 py-2">{product.description}</td>
                <td className="px-2 py-2">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4">
        <input
          type="text"
          id="searchInput"
          placeholder="Search by Product Name"
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="p-4">
        <input
          type="button"
          value="Deletion"
          onClick={handleDeleteLastRow}
          className="bg-blue-600 text-white px-4 py-2 rounded-l-md"
        />
        <input
          type="button"
          value="Search"
          onClick={() =>
            handleSearchProduct(document.getElementById("searchInput").value)
          }
          className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-r-md"
        />
      </div>
    </>
  );
}
