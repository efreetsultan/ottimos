const AWS = require("aws-sdk");

const deleteIngredientById = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let ingredient;
  try {
    const result = await dynamo.delete({
      TableName: "Ingredient",
      Key: { id },
    }).promise();
    ingredient = result.Item;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }

  if (!ingredient) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Ingredient not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(ingredient),
  };
};

module.exports = {
  handler: deleteIngredientById
};
