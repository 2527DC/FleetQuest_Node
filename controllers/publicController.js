 export const publicMessage = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is a public endpoint accessible to everyone." }));
};


