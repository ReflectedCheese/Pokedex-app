import axios from 'axios';

function doGet(url: string) {
  return axios
    .get(url)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error: string) {
      console.log(error);
    });
}

export { doGet };
