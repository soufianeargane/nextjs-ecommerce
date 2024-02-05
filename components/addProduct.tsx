"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { API_URL } from "../config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AddProductProps {
  inserted: boolean;
  setInserted: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddProduct({ inserted, setInserted }: AddProductProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null); // Store file object
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data);
    };
    getCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(image);
      console.log(name);

      const formData = new FormData(); // Create FormData object
      formData.append("name", name);
      formData.append("image", image as File); // Append image file to FormData
      formData.append("price", price);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("categoryId", category);
      console.log(formData);
      const obj = {
        name: name,
        price: price,
        description: description,
        quantity: quantity,
        category: category,
        image: image,
      };

      await axios.post(`${API_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });
      setInserted(!inserted);
      handleClose();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="px-2 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-slate-600 border border-transparent rounded active:bg-slate-600 hover:bg-slate-700 focus:outline-none focus:shadow-outline-slate"
      >
        add
      </button>
      {/* <Button >Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            add a product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              className="block w-full px-4 mb-1 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="block w-full px-4 py-2 mb-1 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="number"
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="block w-full px-4 py-2 mb-1 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="block w-full px-4 py-2 mb-1 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="number"
              placeholder="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
            {/* select for category */}
            <select
              className="block w-full px-4 py-2 mb-1 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected disabled value="">
                Select a category
              </option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="file"
              name="image"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </Typography>
          <button onClick={handleSubmit}>submit</button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProduct;
