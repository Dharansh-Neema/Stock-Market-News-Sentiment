const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Get the Docker Hub hosted backend URL from environment variable
    const backendUrl = process.env.BACKEND_API_URL;
    
    if (!backendUrl) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Backend API URL not configured' })
      };
    }

    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);
    
    // Forward the request to the backend API
    const response = await axios.post(`${backendUrl}/api/run-graph`, requestBody);
    
    // Return the response from the backend
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('API Proxy Error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
};
