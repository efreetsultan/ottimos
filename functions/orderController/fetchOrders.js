const AWS = require("aws-sdk");
require("aws-sdk/clients/dynamodb");

const fetchOrders = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    
    let orders;
    try {
        const result = await dynamo.scan({TableName: "Order"}).promise()
        orders = result.Items
    } catch (error) {
        console.log(error)
    }

  return {
    statusCode: 200,
    body: JSON.stringify(orders),
  };
};

module.exports = {
  handler: fetchOrders
}
