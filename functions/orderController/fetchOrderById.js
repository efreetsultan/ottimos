const AWS = require("aws-sdk");

const fetchOrderById = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    
    let order;
    try {
        const result = await dynamo.get({
            TableName: "Order",
            Key: { id }
        }).promise()
        order = result.Item
    } catch (error) {
        console.log(error)
    }
  
    if (!order) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Order not found" }),
      };
    }

  return {
    statusCode: 200,
    body: JSON.stringify(order),
  };
};

module.exports = {
  handler: fetchOrderById
}
