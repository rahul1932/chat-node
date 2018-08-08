
var username = '';

// initializing socket, connection to server
var socket = io.connect("http://192.168.1.66:7777/");
socket.on("connect", function (data) {
  debugger
  socket.emit("join", username);
});

// listener for 'thread' event, which updates messages
socket.on("thread", function (data) {
  $("#thread").append("<li>" + data.id + ': ' + data.msg + "</li>");
});

// sends message to server, resets & prevents default form action
$("form").submit(function () {
  var message = $("#message").val();
  socket.emit("messages", { 'id': username, 'msg': message });
  this.reset();
  return false;
});

$(document).ready(function () {
  var person = prompt("Please enter your name", "");
  username = person || socket.id;
  $("#lblUserName").text(username);
});