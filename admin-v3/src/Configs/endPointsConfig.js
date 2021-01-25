export const getEndPointsConfig = (productID, partnerID) => {
    var request = require('sync-request');
    var res = request('GET', `http://localhost:9000/endPoints/${productID}/${partnerID}`);
    console.log(res.getBody());
    return res.getBody();
    //return JSON.parse(JSON.stringify(res.getBody()));
}