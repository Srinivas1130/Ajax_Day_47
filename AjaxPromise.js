const { resolve } = require("path");

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, callback, async=true, data=null){
   return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log("State Changed Called. Ready State: "+
                    xhr.readyState+" Status: "+xhr.status);
        if(xhr.readyState ===4 ){
            if(xhr.status === 200 || xhr.status === 201 ){
                resolve(xhr.resposeText);
            }else if (xhr.status>=400){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("Handle 400 Clint Error or 500 Server Error");
            }
        }
    }
    xhr.onerror = function (){
        reject({
            status: this.status,
            statusText: XMLHttpRequest.statusText
        });
    };

    xhr.open(methodType, url, async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType+" request sent to the server");

});
}

const getURL = "http://127.0.0.1:3000/employee/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get user data : "+responseText)
    })
    .catch(error => console.log("Get error status : "+JSON.stringify(error)));