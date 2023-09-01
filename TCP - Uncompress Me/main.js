const net = require("net");
const { unzip } = require("node:zlib");

const serverHost = "challenge01.root-me.org";
const serverPort = 52022;

const client = new net.Socket(); // Création d'une instance du client TCP

// Connexion au serveur
client.connect(serverPort, serverHost, () => {
  console.log("Connecté au serveur");
});

// Écoute des données reçues du serveur
client.on("data", (data) => {
  console.log("Reçu du serveur:", data.toString());
  let splitedData = data.toString().split("'");
  if (splitedData[0].indexOf("my string is") != -1) {
    processData(client, data);
  }
});

// Gestion de la fermeture de la connexion
client.on("close", () => {
  console.log("Connexion au serveur fermée");
});

function processData(client, data) {
  let splitedData = data.toString().split("'");
  console.log(splitedData[1]);
  const buffer = Buffer.from(splitedData[1], "base64");
  unzip(buffer, (err, buffer) => {
    if (err) {
      console.error("An error occurred:", err);
    }
    client.write(buffer.toString() + "\n");
  });
}
