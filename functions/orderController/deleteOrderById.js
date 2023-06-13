const AWS = require("aws-sdk");

const deleteOrderById = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let order;
  try {
    const result = await dynamo.delete({
      TableName: "Order",
      Key: { id },
    }).promise();
    order = result.Item;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
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
  handler: deleteOrderById
};
