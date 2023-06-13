const { default: jsonBodyParser } = require("@middy/http-json-body-parser");
const AWS = require("aws-sdk");

const updateOrderById = async (event) => {
  
const dynamo = new AWS.DynamoDB.DocumentClient();
const {id} = event.pathParameters

const { completed } = event.body;


await dynamo.update({
  TableName: "Order",
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
            msg: "Order Updated"
        }),
    };
};

module.exports = {
  handler: middy(updateOrderById).use(jsonBodyParser())
}
