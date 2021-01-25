export const getCarouselConfig = () => {
  var request = require("sync-request");
  var res = request("GET", `http://localhost:9000/carousel`);
  return JSON.parse(res.getBody());
};
