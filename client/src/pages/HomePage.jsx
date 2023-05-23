import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact, postContact } from "../store/action/actionCreator";
import Cards from "../components/Cards";
import { ToastContainer, toast } from "react-toastify";

function HomePage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    photo: "",
  });
  const contact = useSelector((state) => {
    return state.contact;
  });

  function handleOnChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.age || !form.photo) {
      toast.warn("Please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(postContact(form)).then(() => {
        setForm({ firstName: "", lastName: "", age: "", photo: "" });
        toast.success("Success add Contact", {
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
    }
  }
  useEffect(() => {
    dispatch(fetchContact()).then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Contact App</h1>

        <form action="#" onSubmit={handleSubmit}>
          <div
            className="mb-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <input
              onChange={handleOnChange}
              type="text"
              placeholder="firstName"
              className="w-64 px-4 py-2 border border-gray-300 rounded"
              value={form.firstName}
              name="firstName"
            />
            <input
              onChange={handleOnChange}
              type="text"
              placeholder="lastName"
              name="lastName"
              value={form.lastName}
              className="w-64 px-4 py-2 border border-gray-300 rounded"
            />
            <input
              onChange={handleOnChange}
              type="number"
              placeholder="age"
              name="age"
              value={form.age}
              className="w-64 px-4 py-2 border border-gray-300 rounded"
            />
            <input
              onChange={handleOnChange}
              type="text"
              placeholder="photo"
              name="photo"
              value={form.photo}
              className="w-64 px-4 py-2 border border-gray-300 rounded"
            />
            <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Add new Contact
            </button>
          </div>
        </form>
        <h2 className="mb-2">{contact.length} contacts</h2>

        <div className="grid-cols-3 grid gap-2">
          {loading ? (
            <>Loading...</>
          ) : (
            contact.map((el) => {
              return <Cards key={el.id} data={el} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
