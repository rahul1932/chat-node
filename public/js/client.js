
var username = '';

// initializing socket, connection to server
var socket = io.connect("http://192.168.1.66:7777/");
socket.on("connect", function (data) {
  socket.emit("join", username);
});

// listener for 'thread' event, which updates messages
socket.on("thread", function (data) {
  $("#thread").append("<div class='spanThreadMsg'>" + data.id + ': ' + data.msg + "</div>");
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
});

// sends message to server, resets & prevents default form action
$("form").submit(function () {
  if ($("#message").val() != '') {
    var message = $("#message").val();
    socket.emit("messages", { 'id': username, 'msg': message });
    $("#thread").append("<div class='spanMsg'>" + username + ': ' + message + "</div>");
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    this.reset();
    return false;
  }
  return false;
});

$(document).ready(function () {
  while (!person) {
    var person = prompt("Please enter your name", "");
  }
  username = person || socket.id;
  $("#lblUserName").text(username);
});