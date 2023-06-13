const AWS = require("aws-sdk");
require("aws-sdk/clients/dynamodb");

const fetchAllergens = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    
    let allergens;
    try {
        const result = await dynamo.scan({TableName: "Allergen"}).promise()
        allergens = result.Items
    } catch (error) {
        console.log(error)
    }

  return {
    statusCode: 200,
    body: JSON.stringify(allergens),
  };
};

module.exports = {
  handler: fetchAllergens
}
