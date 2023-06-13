const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Allergen = require("../../model/allergen");

const addAllergen = async (event) => {
  const { allergen } = event.body;
  const id = v4();

  const newAllergen = new Allergen(
    id,
    allergen.name
  );

  const params = {
    TableName: "Allergen",
    Item: newAllergen,
  };

  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(newAllergen),
  };
};

module.exports = {
  handler: middy(addAllergen).use(httpJsonBodyParser()),
};
