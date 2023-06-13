const { default: jsonBodyParser } = require("@middy/http-json-body-parser");
const AWS = require("aws-sdk");

const updateIngredientById = async (event) => {
  
const dynamo = new AWS.DynamoDB.DocumentClient();
const {id} = event.pathParameters

const { completed } = event.body;


await dynamo.update({
  TableName: "Ingredient",
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
            msg: "Ingredient Updated"
        }),
    };
};

module.exports = {
  handler: middy(updateIngredientById).use(jsonBodyParser())
}
