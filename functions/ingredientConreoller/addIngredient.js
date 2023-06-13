const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Ingredient = require("../../model/ingredient");

const addIngredient = async (event) => {
  const { ingredient } = event.body;
  const id = v4();

  const validProviders = ["LOCAL", "GOOGLE"];
  const provider = ingredient.provider && validProviders.includes(ingredient.provider) ? ingredient.provider : "LOCAL";

  const newIngredient = new Ingredient(
    id,
    ingredient.firstName,
    ingredient.lastName,
    ingredient.email,
    ingredient.username,
    provider,
    ingredient.orders ? ingredient.orders.map((order) => order.id) : []
  );

  const params = {
    TableName: "Ingredient",
    Item: newIngredient,
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
    body: JSON.stringify(newIngredient),
  };
};

module.exports = {
  handler: middy(addIngredient).use(httpJsonBodyParser()),
};
