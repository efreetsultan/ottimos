const AWS = require("aws-sdk");

const fetchAllergenById = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    
    let allergen;
    try {
        const result = await dynamo.get({
            TableName: "Allergen",
            Key: { id }
        }).promise()
        allergen = result.Item
    } catch (error) {
        console.log(error)
    }
  
    if (!allergen) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Allergen not found" }),
      };
    }

  return {
    statusCode: 200,
    body: JSON.stringify(allergen),
  };
};

module.exports = {
  handler: fetchAllergenById
}
