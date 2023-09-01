const net = require("net");

const serverHost = "challenge01.root-me.org";
const serverPort = 52021;

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
  let decodedString = "";
  for (let i = 0; i < splitedData[1].length; i++) {
    if (!isNaN(splitedData[1][i])) {
      decodedString += splitedData[1][i];
    } else {
      let asciiValue = splitedData[1][i].charCodeAt(0);
      let c = "A";
      if (asciiValue > 90) {
        c = "a";
      }
      asciiValue -= c.charCodeAt(0);
      asciiValue += 13;
      asciiValue = asciiValue % 26;
      asciiValue += c.charCodeAt(0);
      decodedString += String.fromCharCode(asciiValue);
    }
  }
  console.log(`Le string: ${splitedData[1]} correspond a ${decodedString}`);
  client.write(decodedString + "\n");
}
