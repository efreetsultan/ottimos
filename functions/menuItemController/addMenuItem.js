const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const MenuItem = require("../../model/menuItem");

const addMenuItem = async (event) => {
  const { menuItem } = event.body;
  const id = v4();

  const validProviders = ["LOCAL", "GOOGLE"];
  const provider = menuItem.provider && validProviders.includes(menuItem.provider) ? menuItem.provider : "LOCAL";

  const newMenuItem = new MenuItem(
    id,
    menuItem.firstName,
    menuItem.lastName,
    menuItem.email,
    menuItem.username,
    provider,
    menuItem.orders ? menuItem.orders.map((order) => order.id) : []
  );

  const params = {
    TableName: "MenuItem",
    Item: newMenuItem,
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
    body: JSON.stringify(newMenuItem),
  };
};

module.exports = {
  handler: middy(addMenuItem).use(httpJsonBodyParser()),
};
