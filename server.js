import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Curso Node JS");
});

server.listen(3000, () => {
  console.log("Server is Working...");
});
