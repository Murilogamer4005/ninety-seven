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
roomName = localStorage.getItem("roomName");
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
function getData() {
  firebase.database().ref("/"+roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val()
      if (childKey != "purpose") {
        firebaseMessageId = childKey;
         messageData = childData;
name=messageData["name"]
message=messageData["message"]
like=messageData["like"]
nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
row = nameWithTag + messageWithTag + like_button + spanWithTag;
document.getElementById("output").innerHTML += row;

      }
    });
  });
}
getData()
function send() {
  msg = document.getElementById("msg").value
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0
  })
  document.getElementById("msg").value = ""
}
function updateLike(messageId) {
buttonId = messageId
likes=document.getElementById(buttonId).value
updateLikes = Number(likes) +1
firebase.database().ref(roomName).child(messageId).update({
  like:updateLikes
})
}