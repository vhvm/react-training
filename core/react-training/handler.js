const { v4 } = require('uuid');
const AWS = require('aws-sdk');



// POST
module.exports.createTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { title, description } = JSON.parse(event.body);
  const id = v4();
  const createdAt = new Date();
  const newTask = { id, title, description, createdAt, done: false}

  await dynamodb
    .put(
      {
        TableName: "TaskTable",
        Item: newTask,
      }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        body: JSON.stringify(newTask),
      },
      null,
      2
    ),
  };
};

// GET ALL
module.exports.getTasks = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

 const response = await dynamodb
    .scan(
      {
        TableName: "TaskTable"
      }).promise();
      
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        response,
      },
      null,
      2
    ),
  };
};


// GET ONE
module.exports.getTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

 const response = await dynamodb
    .get(
      {
        TableName: "TaskTable",
        Key: {
          id
        }
      }).promise();
      
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        response,
      },
      null,
      2
    ),
  };
};


// UPDATE

module.exports.updateTask = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { done } = JSON.parse(event.body);

    await dynamodb.update({
      TableName: 'TaskTable',
      Key: { id },
      UpdateExpression: 'set done = :done',
      ExpressionAttributeValues: { ':done': done },
      ReturnValues: 'ALL_NEW',
    }).promise();


      
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Go Serverless v3.0! Your function executed successfully!",
          },
        ),
      };
};


module.exports.deleteTask = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamodb.delete({
    TableName: 'TaskTable',
    Key: { id },
  }).promise();


    
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless v3.0! Your function executed successfully!",
        },
      ),
    };
};

