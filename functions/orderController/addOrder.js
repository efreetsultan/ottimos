const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Order = require("../../model/order");

const addOrder = async (event) => {
  const { order } = event.body;
  const id = v4();

  const validProviders = ["LOCAL", "GOOGLE"];
  const provider = order.provider && validProviders.includes(order.provider) ? order.provider : "LOCAL";

  const newOrder = new Order(
    id,
    order.firstName,
    order.lastName,
    order.email,
    order.username,
    provider,
    order.orders ? order.orders.map((order) => order.id) : []
  );

  const params = {
    TableName: "Order",
    Item: newOrder,
  };

  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(newOrder),
  };
};

module.exports = {
  handler: middy(addOrder).use(httpJsonBodyParser()),
};
