const AWS = require("aws-sdk");

const deleteCustomerById = async (event) => {
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let customer;
  try {
    const result = await dynamo.delete({
      TableName: "Customer",
      Key: { id },
    }).promise();
    customer = result.Item;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }

  if (!customer) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Customer not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(customer),
  };
};

module.exports = {
  handler: deleteCustomerById
};
