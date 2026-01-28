import axios from "axios";

type DataType1 = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const fetchOtherBussiness = async () => {
  const response = await axios.get<DataType1>(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  if (response?.data) {
    return response?.data;
  }
};

type DataType2 = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const fetchSomeBussiness = async () => {
  const response = await axios.get<DataType2>(
    "https://jsonplaceholder.typicode.com/todos/1",
  );

  if (response?.data) {
    return response?.data;
  }
};

export const fetchSharedBussiness = async () => {
  const response1 = await fetchSomeBussiness();
  const response2 = await fetchOtherBussiness();

  return (
    JSON.stringify(response1, null, 2) +
    "\n" +
    JSON.stringify(response2, null, 2)
  );
};
