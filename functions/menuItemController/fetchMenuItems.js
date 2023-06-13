const AWS = require("aws-sdk");
require("aws-sdk/clients/dynamodb");

const fetchMenuItems = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    
    let menuItems;
    try {
        const result = await dynamo.scan({TableName: "MenuItem"}).promise()
        menuItems = result.Items
    } catch (error) {
        console.log(error)
    }

  return {
    statusCode: 200,
    body: JSON.stringify(menuItems),
  };
};

module.exports = {
  handler: fetchMenuItems
}
