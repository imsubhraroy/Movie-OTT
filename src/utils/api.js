import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_APP_SUBHRA;

const headers = {
  Authorization: "bearer " + TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const BASE_URL = "https://api.themoviedb.org/3";
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
