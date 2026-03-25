import axios from "axios";

export const fetchStatesRequest = async () => {
  return await axios.get<string[]>("https://nga-states-lga.onrender.com/fetch");
};

export const fetchLgasByStateRequest = async (state?: string) => {
  return await axios.get<string[]>(
    `https://nga-states-lga.onrender.com/?state=${state}`,
  );
};
