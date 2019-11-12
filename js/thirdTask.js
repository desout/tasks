function sendRequest(data){
  return new Promise((resolve,reject) => {
    setTimeout(()=>{resolve(data)}, Math.random()*1000);
  })
}

const firstRequest = sendRequest('first request');
const secondRequest = sendRequest('second request');

Promise.all([firstRequest,secondRequest]).then((values)=> console.log('both requests done',values));
