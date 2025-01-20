export const database = (req, res) => { 
  const url = req.hostname; // Extract the hostname from the request
  const subDomain = url.split('.')[0]; // Get the subdomain by splitting the hostname

  console.log("Subdomain:", subDomain); // Log the subdomain to the console

  // Properly send the response
  res.send(`This is the subdomain: ${subDomain}`);
};
