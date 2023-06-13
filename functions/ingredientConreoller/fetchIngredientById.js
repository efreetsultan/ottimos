const AWS = require("aws-sdk");

const fetchIngredientById = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    
    let ingredient;
    try {
        const result = await dynamo.get({
            TableName: "Ingredient",
            Key: { id }
        }).promise()
        ingredient = result.Item
    } catch (error) {
        console.log(error)
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
  handler: fetchIngredientById
}
