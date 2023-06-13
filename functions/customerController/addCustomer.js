const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Customer = require("../../model/customer");

const addCustomer = async (event) => {
  const { customer } = event.body;
  const id = v4();

  const validProviders = ["LOCAL", "GOOGLE"];
  const provider = customer.provider && validProviders.includes(customer.provider) ? customer.provider : "LOCAL";

  const newCustomer = new Customer(
    id,
    customer.firstName,
    customer.lastName,
    customer.email,
    customer.username,
    provider,
    customer.orders ? customer.orders.map((order) => order.id) : []
  );

  const params = {
    TableName: "Customer",
    Item: newCustomer,
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
    body: JSON.stringify(newCustomer),
  };
};

module.exports = {
  handler: middy(addCustomer).use(httpJsonBodyParser()),
};
