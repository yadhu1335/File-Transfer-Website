const joinbtn = document.getElementById("join_Room");
const createbtn = document.getElementById("create_Room");
let room_id;
const Socket = io();

const username = generateUniqueName(); // Call the function to get the username
localStorage.setItem("username", username); // Store the username in local storage

console.log(`username=${username}`);
document.getElementById("username").innerText = username; // Set the username directly

joinbtn.addEventListener("click", function () {
  document.getElementById("join_room").style.display = "block";
  const join_room_btn = document.getElementById("join_room_btn");
  join_room_btn.addEventListener("click", function () {
    room_id = document.getElementById("room_id").value;
    console.log(`room id is ${room_id}`);
    location.href = `/room/${room_id}`;
  });
});

createbtn.addEventListener("click", function () {
  room_id = uuidv4();
  console.log(`room id is ${room_id}`);
  location.href = `/room/${room_id}`;
  Socket.emit("create room", room_id);
});

Socket.emit("working");

function uuidv4() {
  return "xxyxyxxyx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateUniqueName() {
  const adjectives = [
    "Fat",
    "Lying",
    "Hungry",
    "Sly",
    "Gentle",
    "Wise",
    "Swift",
    "Clever",
  ];
  const animals = [
    "Hippo",
    "Fox",
    "Lion",
    "Tiger",
    "Bear",
    "Elephant",
    "Panda",
    "Kangaroo",
  ];
  // Randomly select an adjective and an animal
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  // Generate two random numbers
  const randomNumber = Math.floor(Math.random() * 100);
  // Combine the adjective, animal, and random numbers to form the unique name
  return `${randomAdjective}${randomAnimal}${randomNumber}`;
}
