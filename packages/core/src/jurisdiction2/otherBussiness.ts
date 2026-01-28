import axios from "axios";

type DataType = {
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

export const fetchOtherBussiness = async () => {
  const response = await axios.get<DataType>(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  if (response?.data) {
    return response?.data;
  }
};
