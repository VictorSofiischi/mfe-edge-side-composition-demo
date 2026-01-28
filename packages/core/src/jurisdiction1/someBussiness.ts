import axios from "axios";

type DataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const fetchSomeBussiness = async () => {
  const response = await axios.get<DataType>(
    "https://jsonplaceholder.typicode.com/todos/1",
  );

  if (response?.data) {
    return response?.data;
  }
};
