import { useDispatch } from "react-redux";
import { deleteContact } from "../store/action/actionCreator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Cards({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function deleteById(id) {
    console.log(id, "idnya yg mo di delete");
    dispatch(deleteContact(id))
      .then(() => {
        toast.success("Success delete contact", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error(`${err.message}`, {
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
  function onEdit(id) {
    console.log(id);
    navigate(`/edit/${id}`);
  }
  return (
    <>
      <div
        className="card card-compact w-100 shadow-xl mb-4"
        style={{ borderRadius: 5 }}
      >
        <figure>
          <img
            src={data.photo}
            alt="Photo"
            style={{
              width: "100%",
              height: 200,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          />
        </figure>
        <div
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 className="card-title">
              {data.firstName} {data.lastName}
            </h2>
            <p>Age : {data.age}</p>
          </div>
          <div>
            <button
              onClick={() => {
                onEdit(data.id);
              }}
              type="button"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteById(data.id);
              }}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
