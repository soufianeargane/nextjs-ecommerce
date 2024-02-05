"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import axios from "axios";
import "../../../styles/app.css";
import AddCategory from "../../../components/addCategory";

// async function getCategories() {
//     try {
//         const response = await axios.get(API_URL + '/categories')
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }
function Page() {
  //   const [categories, setCategories] = useState([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [inserted, setInserted] = useState(false);
  useEffect(() => {
    async function getCategories() {
      await axios.get(API_URL + "/categories").then((response) => {
        setCategories(response.data);
        console.log(response.data);
      });
    }
    getCategories();
  }, [inserted]);
  // const categories = await getCategories() || []
  const handleDelete = async (id: number) => {
    try {
      let result = await axios.delete(API_URL + "/categories/" + id);
      console.log(result.data);
      setInserted(!inserted);
      alert(result.data.message);
    } catch (error) {}
  };

  return (
    <div>
      <h1>Categories</h1>
      <div className="flex justify-end pr-5">
        <AddCategory inserted={inserted} setInserted={setInserted} />
      </div>
      <div className="card mt-3 px-4">
        <div className="is-scrollbar-hidden min-w-full overflow-x-auto">
          <table className="is-hoverable w-full text-left">
            <thead>
              <tr>
                <th className="whitespace-nowrap rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                  Category Id
                </th>
                <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                  Name
                </th>
                {/* action of edit or delete */}
                <th className="whitespace-nowrap rounded-tr-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                >
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <p className="font-medium text-primary dark:text-accent-light">
                      {category.id}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-slate-700 dark:text-navy-100">
                        {category.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <div className="flex items-center space-x-4">
                      <button className="px-2 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-slate-600 border border-transparent rounded active:bg-slate-600 hover:bg-slate-700 focus:outline-none focus:shadow-outline-slate">
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
