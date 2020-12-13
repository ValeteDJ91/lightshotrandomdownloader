const fs = require('fs');
const axios = require('axios');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');

// sleep function
function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  }
  function sleep(n) {
    msleep(n*1000);
  }

function makeid(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  
var imgsliced
var imgindex1
var imgindex2
const imgsearch1 = "no-click screenshot-image";
const imgsearch2 = "crossorigin=";

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', e => reject(e));
      }),
  );


lengthrand = Math.floor((Math.random() * 2) + 5);
targetid = makeid(lengthrand)
let target = "https://prnt.sc/"+targetid
var current = target.slice(16)

axios.get(target, {
  timeout: 10000,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
}).then(function (response) {
    imgindex1 = response.data.indexOf(imgsearch1)
    imgindex2 = response.data.indexOf(imgsearch2)
    imgsliced = response.data.slice(imgindex1+32, imgindex2-2)
    if (imgsliced.slice(0,5) !== "https") {
        console.log(`failed`);
        return; }
    console.log(`sucess: ${current}`)
    console.log(imgsliced)
    let currentlydownloading = download_image(`${imgsliced}`, `img/${current}.png`);
  });