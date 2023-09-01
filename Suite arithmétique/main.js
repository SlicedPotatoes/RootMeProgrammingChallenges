const http = require("http");
const PHPSESSID = "PHPSESSID=x";

request("/programmation/ch1/", (error, data) => {
  if (error) {
    console.error("Erreur de requête:", error);
  } else {
    console.log("Données de réponse:", data);
    let Un = calculateTerm(parseElement(data));
    request("/programmation/ch1/ep1_v.php?result=" + Un, (error, data) => {
      if (error) {
        console.error("Erreur de requête:", error);
      } else {
        console.log("Données de réponse:", data);
      }
    });
  }
});

function request(path, callback) {
  const options = {
    hostname: "challenge01.root-me.org",
    port: 80,
    path: path,
    method: "GET",
    headers: {
      Cookie: PHPSESSID,
    },
  };
  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      callback(null, data);
    });
  });

  req.on("error", (error) => {
    callback(error);
  });

  req.end();
}
function calculateTerm(a) {
  let Un = a.U0;
  for (let i = 1; i <= a.elementToFind; i++) {
    let firstPart = a.Un_1.element1 + (a.Un_1.operation1 == "+" ? Un : -Un);
    let secondPart = (i - 1) * a.Un_1.element2;
    Un = firstPart + (a.Un_1.operation2 == "+" ? secondPart : -secondPart);
  }
  console.log("Un:", Un);
  return Un;
}
function parseElement(data) {
  let a = {
    Un_1: {
      element1: null,
      operation1: null,
      operation2: null,
      element2: null,
    },
    U0: null,
    elementToFind: null,
  };
  let index = data.indexOf("[ ");
  let index2 = data.indexOf(" ]");
  let arr = data.substring(index + 2, index2).split(" ");
  a.Un_1.element1 = parseInt(arr[0]);
  a.Un_1.operation1 = arr[1];

  index = index2 + 3;
  index2 = data.indexOf("[ ", index) - 1;
  a.Un_1.operation2 = data.substring(index, index2);

  index = data.indexOf("*") + 2;
  index2 = data.indexOf(" ]", index);
  a.Un_1.element2 = parseInt(data.substring(index, index2));

  index = data.indexOf("U<sub>0</sub> =") + 16;
  index2 = data.indexOf("\n", index);
  a.U0 = parseInt(data.substring(index, index2));

  index = data.indexOf("<sub>", index2) + 5;
  index2 = data.indexOf("</sub>", index);
  a.elementToFind = data.substring(index, index2);
  console.log(a);
  return a;
}
