const firebaseConfig = {
  apiKey: "AIzaSyBgBagqIcRnoyvKUlMnwL3rDg_CYh4ak6E",
  authDomain: "twitter-4f1ad.firebaseapp.com",
  databaseURL: "https://twitter-4f1ad-default-rtdb.firebaseio.com",
  projectId: "twitter-4f1ad",
  storageBucket: "twitter-4f1ad.appspot.com",
  messagingSenderId: "252846498717",
  appId: "1:252846498717:web:198483f8cf86d5bed64574"
};
firebase.initializeApp(firebaseConfig);
userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "u're welcome" + userName
function addRoom() {
  roomName = document.getElementById("roomName").value
  firebase.database().ref("/").child(roomName).update({
    purpose: "adicionar nome de sala"
  });
  localStorage.setItem("roomName", roomName);
  window.location = "kwitterPage.html";
}
function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData()
function redirectToRoomName(name) { 
  console.log(name); 
  localStorage.setItem("roomName", name); 
  window.location = "kwitterPage.html";
 }
function logout() { 
  localStorage.removeItem("userName"); 
  localStorage.removeItem("roomName"); 
  window.location = "index.html";
 }