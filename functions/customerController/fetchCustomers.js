const AWS = require("aws-sdk");
require("aws-sdk/clients/dynamodb");

const fetchCustomers = async (event) => {
  
    const dynamo = new AWS.DynamoDB.DocumentClient();
    
    let customers;
    try {
        const result = await dynamo.scan({TableName: "Customer"}).promise()
        customers = result.Items
    } catch (error) {
        console.log(error)
    }

  return {
    statusCode: 200,
    body: JSON.stringify(customers),
  };
};

module.exports = {
  handler: fetchCustomers
}
