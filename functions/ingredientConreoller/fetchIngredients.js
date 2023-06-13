const AWS = require("aws-sdk");
require("aws-sdk/clients/dynamodb");

const fetchIngredients = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    
    let ingredients;
    try {
        const result = await dynamo.scan({TableName: "Ingredient"}).promise()
        ingredients = result.Items
    } catch (error) {
        console.log(error)
    }

  return {
    statusCode: 200,
    body: JSON.stringify(ingredients),
  };
};

module.exports = {
  handler: fetchIngredients
}
