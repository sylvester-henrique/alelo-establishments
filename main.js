
const fs = require('fs/promises');
const os = require('os');

const SOURCE_DATA_FILE_NAME = 'source-data/alelo-establishments.json';
const RESULT_DATA_CSV_FILE_NAME = 'result-data/alelo-establishments-result.csv';
const REFEICAO_NETWORK_ID = 1;
const ALIMENTACAO_NETWORK_ID = 2;
const CULTURA_NETWORK_ID = 3;

async function loadFile(fileName) {
  try {
    const data = await fs.readFile(fileName, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function writeFile(data, fileName) {
  try {
    await fs.writeFile(fileName, data);
  } catch (err) {
    console.log(err);
  }
}

function getEstablishmentsByNetwork(establishments, networkId) {
  return establishments
    .filter((e) => e.networks.some(n => n.networkId == networkId))
    .map((e) => ({
      establishmentName: e.establishmentName,
      establishmentSocialReason: e.establishmentSocialReason,
      address: e.address,
      district: e.district,
      refeicao: hasNetworkText(e.networks, REFEICAO_NETWORK_ID),
      alimentacao: hasNetworkText(e.networks, ALIMENTACAO_NETWORK_ID),
      cultura: hasNetworkText(e.networks, CULTURA_NETWORK_ID),
    }));
}

function hasNetworkText(networks, networkId) {
  return networks.some(n => n.networkId == networkId) ? 'Sim' : '';
}

function createCsvData(data) {
  const columns = [ 'Estabelecimento', 'Razão social', 'Endereço', 'Bairro', 'Refeição', 'Alimentação', 'Cultura' ];
  const rows = data.map(d => Object.values(d));
  const csvData = [ columns, ...rows ];
  return csvData.map(d => d.join(",")).join(os.EOL);
}

async function run() {

  let dataString = await loadFile(SOURCE_DATA_FILE_NAME);
  let data = JSON.parse(dataString);
  let establishments = getEstablishmentsByNetwork(data.establishments, CULTURA_NETWORK_ID);
  let csvData = createCsvData(establishments)
  await writeFile(csvData, RESULT_DATA_CSV_FILE_NAME);
}

run();