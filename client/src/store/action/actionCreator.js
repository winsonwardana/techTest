import axios from "axios";

export function fetchContact() {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://contact.herokuapp.com/contact",
      });
      //   console.log(data, "<<<<");
      dispatch({
        type: "contact/fetchSuccess",
        payload: data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function postContact(form) {
  return async function (dispatch) {
    try {
      console.log(form, "<<di creator");
      const { data } = await axios({
        method: "POST",
        url: "https://contact.herokuapp.com/contact",
        data: form,
      });
      console.log(data);
      dispatch(fetchContact());
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchContactDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        url: `https://contact.herokuapp.com/contact/${id}`,
        method: "GET",
      });
      console.log(data);
      dispatch({
        type: "contact/fetchContactSuccess",
        payload: data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function editContact(id, form) {
  return async function (dispatch) {
    try {
      //   console.log(id, "di edit creator");

      const { data: edit } = await axios({
        url: `https://contact.herokuapp.com/contact/${id}`,
        method: "PUT",
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          age: +form.age,
          photo: form.photo,
        },
      });
      dispatch(fetchContact());
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function deleteContact(id) {
  return async function (dispatch) {
    try {
      console.log(id, "<<<di creator");
      const { data } = await axios({
        url: `https://contact.herokuapp.com/contact/${id}`,
        method: "DELETE",
      });
      console.log(data, "<<deleted");
      dispatch(fetchContact());
    } catch (err) {
      console.log(err);
    }
  };
}
