import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editContact, fetchContactDetail } from "../store/action/actionCreator";
import { ToastContainer, toast } from "react-toastify";

function EditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const contactDetail = useSelector((state) => {
    console.log(state);
    return state.contactDetail;
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    photo: "",
  });

  useEffect(() => {
    dispatch(fetchContactDetail(id)).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setForm({
      firstName: contactDetail.firstName,
      lastName: contactDetail.lastName,
      age: contactDetail.age,
      photo: contactDetail.photo,
    });
  }, [contactDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editContact(id, form))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err, "<<di edit page");
        toast.error("Failed to edit", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ToastContainer />

          <div className="flex items-center justify-center h-screen">
            <div className="bg-white rounded shadow p-4 w-96 ">
              <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Age:
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Photo:
                  </label>
                  <input
                    type="text"
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    to={"/"}
                    type="button"
                    className="mr-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditPage;
