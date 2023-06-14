const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  
    const params = {
      AccessToken: token,
    };
  
    try {
      const { Username } = await cognitoIdentityServiceProvider.getUser(params).promise();
      return { sub: Username };
    } catch (error) {
      throw new Error('Invalid token');
    }
  };

const authorizer = async (event) => {
  try {
    const token = event.authorizationToken;

    // Verify the token
    const decodedToken = await verifyToken(token);

    // Return an IAM policy for the user
    const policy = generatePolicy(decodedToken.sub, 'Allow', event.methodArn);
    return policy;
  } catch (error) {
    // Return an unauthorized response
    return {
      statusCode: 401,
      body: 'Unauthorized',
    };
  }
};

const generatePolicy = (principalId, effect, resource) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

module.exports = {
    handler: authorizer
  };
