let mySocketID;
const socket = io();

// Get the path of the current URL
const path = window.location.pathname;
const parts = path.split("/");
const room_id = parts[parts.length - 1];
console.log(`roomid=${room_id}`);

let username = localStorage.getItem("username");
console.log(`username=${username}`);
document.getElementById("username").innerText = username;

socket.emit("join room", room_id, username);

socket.on("socketid", (socketid) => {
  console.log(`My socketid is ${socketid}`);
  mySocketID = socketid;
});
localStorage.setItem("roomsocketid", mySocketID); // Store the username in local storage

function createTag(tagname, message, parentDiv, id = null) {
  const tag = document.createElement(tagname);
  tag.textContent = message;
  if (id) {
    tag.id = id;
  }
  parentDiv.appendChild(tag);
}

no_room = document.getElementById("no_room");

socket.on("no room", () => {
  createTag("p", "Room Does not exists", no_room);
  createTag("button", "Go Back", no_room, "go_back_btn");
  document.getElementById("go_back_btn").addEventListener("click", () => {
    window.location.href = "/"; //go back to index page
  });
});

function scanLocalNetwork() {
  console.log(`Scaning local networks`);
  // Example: Scan IP addresses in the range 192.168.1.1 to 192.168.1.255
  for (let i = 1; i <= 255; i++) {
    const ipAddress = `192.168.1.${i}`;
    fetch(`http://${ipAddress}:8000/ping`) // Assuming peers are running a server on port 8000
      .then((response) => {
        if (response.ok) {
          console.log(`Found peer at ${ipAddress}`);
          // Perform further actions to establish a connection with the peer
        }
      })
      .catch((error) => {
        console.log(error);
        // Ignore errors (e.g., if no server is running at the IP address)
      });
  }
}
