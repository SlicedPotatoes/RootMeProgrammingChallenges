const net = require("net");

const serverHost = "challenge01.root-me.org";
const serverPort = 52023;

const client = new net.Socket(); // Création d'une instance du client TCP

let countResponse = 0;

// Connexion au serveur
client.connect(serverPort, serverHost, () => {
  console.log("Connecté au serveur");
});

// Écoute des données reçues du serveur
client.on("data", (data) => {
  console.log("Reçu du serveur:", data.toString());
  if (countResponse == 0) {
    processData(client, data);
    countResponse++;
  }
});

// Gestion de la fermeture de la connexion
client.on("close", () => {
  console.log("Connexion au serveur fermée");
});

function processData(client, data) {
  let splitedData = data.toString().split("'");
  let decodedString = atob(splitedData[1]);
  console.log(`Le string: ${splitedData[1]} correspond a ${decodedString}`);
  client.write(decodedString + "\n");
}
