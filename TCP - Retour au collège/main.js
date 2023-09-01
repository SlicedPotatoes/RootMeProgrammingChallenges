const net = require("net");

const serverHost = "challenge01.root-me.org";
const serverPort = 52002;

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
  let splitedData = data.toString().split(" ");
  let numbers = [];
  splitedData.forEach((element) => {
    if (!isNaN(element)) {
      numbers.push(element);
    }
  });
  let result = Math.round(Math.sqrt(numbers[1]) * numbers[2] * 100) / 100;
  console.log("Envoyez ay serveur:", result);
  client.write(result.toString() + "\n");
}
