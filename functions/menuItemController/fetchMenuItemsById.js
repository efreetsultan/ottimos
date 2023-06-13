const AWS = require("aws-sdk");

const fetchMenuItemById = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    
    let menuItem;
    try {
        const result = await dynamo.get({
            TableName: "MenuItem",
            Key: { id }
        }).promise()
        menuItem = result.Item
    } catch (error) {
        console.log(error)
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
  handler: fetchMenuItemById
}
