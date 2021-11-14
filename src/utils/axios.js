import axios from "axios";

const fetch = async (option) => {
  return new Promise(async (resolve, reject) => {
    try {
      const httpReq = await axios(option);
      resolve(httpReq);
    } catch (err) {
      reject(err);
    }
  });
};

export default fetch;
