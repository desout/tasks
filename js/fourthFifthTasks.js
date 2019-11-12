const helper = function(currentWindow, iframe, onMessage) {
  const childWindow = iframe.contentWindow;

  currentWindow.onmessage = event => {
    return onMessage(JSON.parse(event.data), event);
  };

  this.getData = (key,callback) => {
    const messageData = {
      key: key,
      method: "get",
      callback: callback.toString()
    };
    this.postMessage(messageData);
  };

  this.setData = (key, data, callback) => {
    const messageData = {
      key: key,
      method: "set",
      data: data,
      callback: callback.toString()
    };
    this.postMessage(messageData);
  };

  this.removeData = (key,callback) => {
    const messageData = {
      key: key,
      method: "remove",
      callback: callback.toString()
    };
    this.postMessage(messageData);
  };

  this.postMessage = messageData => {
    childWindow.postMessage(JSON.stringify(messageData), "*");
  };
};

const testOperations = frame => {
  const operations = new helper(window, frame, onMessage);
  operations.setData("name", "buren", function(){console.log('setted callback')});
  operations.getData("name", function(){console.log('getted callback')});
  operations.removeData("name", function(){console.log('removed callback')});
  operations.getData("name", function(){console.log('getted callback')});
};

const onMessage = (payload, event) => {
  const data = payload.data;
  switch (payload.method) {
    case "storage#get":
      console.log("message data", data);
      break;
    case "storage#set":
      console.log("setted");
      break;
    case "storage#remove":
      console.log("removed");
      break;
    default:
      console.error('Unknown method "' + payload.method + '"', payload);
  }

};


const iframe = document.getElementsByTagName('iframe')[0];
iframe.onload = ()=>testOperations(iframe);
