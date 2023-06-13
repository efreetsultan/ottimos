const { default: jsonBodyParser } = require("@middy/http-json-body-parser");
const AWS = require("aws-sdk");

const updateAllergenById = async (event) => {
  
const dynamo = new AWS.DynamoDB.DocumentClient();
const {id} = event.pathParameters

const { completed } = event.body;


await dynamo.update({
  TableName: "Allergen",
    Key: { id },
    UpdateExpression: 'set completed = :completed',
    ExpressionAttributeValues: {
        ':completed': completed
    },
    ReturnValues: "ALL_NEW"
}).promise()

    return {
    statusCode: 200,
        body: JSON.stringify({
            msg: "Allergen Updated"
        }),
    };
};

module.exports = {
  handler: middy(updateAllergenById).use(jsonBodyParser())
}
