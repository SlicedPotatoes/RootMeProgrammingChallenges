const net = require("net");

const serverHost = "challenge01.root-me.org";
const serverPort = 52018;

const client = new net.Socket(); // Création d'une instance du client TCP

// Connexion au serveur
client.connect(serverPort, serverHost, () => {
  console.log("Connecté au serveur");
});

// Écoute des données reçues du serveur
client.on("data", (data) => {
  console.log("Reçu du serveur:", data.toString());
  if (data.toString().indexOf("Solve this equation please") != -1) {
    processData(client, data.toString());
  }
});

// Gestion de la fermeture de la connexion
client.on("close", () => {
  console.log("Connexion au serveur fermée");
});

function processData(client, data) {
  let index = data.indexOf(":", data.indexOf("Solve this equation please")) + 2;
  let equation = data.substring(index, data.indexOf("\n", index));
  let splitedData = equation.split(" ");
  //console.log(equation);
  //console.log(splitedData);
  let a = parseInt(splitedData[0].split(".")[0]);
  let b = parseInt(splitedData[2].split(".")[0]);
  if (splitedData[1] == "-") {
    b = -b;
  }
  let c = parseInt(splitedData[4]);
  if (splitedData[3] == "-") {
    c = -c;
  }
  c -= parseInt(splitedData[6]); //On enleve le résultat pour avoir une formule sous cette forme ax² + bx + c = 0
  //Trouvez le discriminant
  let delta = Math.pow(b, 2) - 4 * a * c;
  //Si le discriminant > 0 il y a 2 racines
  let answer = "";
  if (delta > 0) {
    let x1 = round((-b - Math.sqrt(delta)) / (2 * a));
    let x2 = round((-b + Math.sqrt(delta)) / (2 * a));
    answer = `x1: ${x1} ; x2: ${x2}\n`;
  }
  //Si le discriminant == 0 il y a 1 racine
  else if (delta == 0) {
    let x1 = round(-b / (2 * a));
    answer = `x: ${x1}\n`;
  }
  //Sinon il n'y a pas de racine
  else {
    answer = "Not possible\n";
  }
  client.write(answer);
  console.log(answer);
}
function round(n) {
  return Math.round(n * 1000) / 1000;
}
