const AWS = require("aws-sdk");

const deleteMenuItemById = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let menuItem;
  try {
    const result = await dynamo.delete({
      TableName: "MenuItem",
      Key: { id },
    }).promise();
    menuItem = result.Item;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }

  if (!menuItem) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "MenuItem not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(menuItem),
  };
};

module.exports = {
  handler: deleteMenuItemById
};
