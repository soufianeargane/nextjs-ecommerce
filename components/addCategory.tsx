"use client";
import React from "react";
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

interface AddCategoryProps {
  inserted: boolean;
  setInserted: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddCategory({ inserted, setInserted }: AddCategoryProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState("");

  const handleSubmit = () => {
    console.log(name);
    axios
      .post(`${API_URL}/categories`, { name })
      .then((res) => {
        console.log(res);
        setInserted(!inserted);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
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
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Typography>
          <button onClick={handleSubmit}>submit</button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddCategory;
