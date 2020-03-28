const { Client } = require('pg');
const convertUnit = require('convert-units');
const unitMap = require('../_utilities/unitMap');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Shop Database',
  password: 'bolod2347',
  port: 5432
});

client
  .connect()
  .then(() => console.log('Connected to database for unit'))
  .catch(e => console.log(e));

module.exports.getUnitName = async callback => {
  const text = 'select unit_name from unit;';
  let unitNameList;
  try {
    unitNameList = await client.query(text);
  } catch (err) {
    console.log(err.stack);
  }
  callback(unitNameList.rows);
};

module.exports.getProbableName = async (id, callback) => {
  const probableUnitList = convertUnit()
    .from(unitMap.PC2EA[id])
    .possibilities();

  const unitList = [];

  for (let i = 0; i < probableUnitList.length; i += 1) {
    if (unitMap.EA2PC[probableUnitList[i]] !== undefined) {
      unitList.push(unitMap.EA2PC[probableUnitList[i]]);
    }
  }

  callback(unitList);
};
