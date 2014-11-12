// YOUR CODE HERE:
var rooms = [];
var friends = [];
var users = [];
var currentRoom;
var escaper = function(message) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(message));
  return div.innerHTML;
};

var roomBuilder = function(room) {
  if (rooms.indexOf(room) === -1) {
    //removes spaces in room name
    // var squishedRoom = escaper(room).split(' ').join('');
    rooms.push(room);
    $('.rooms').append('<p class=' + 'room' + rooms.indexOf(room)+ '>' + escaper(room) + '</p>');
    $('.room' + rooms.indexOf(room)).click(function() {
      currentRoom = room;
      $('.roomTracker').text(escaper(room));
    });
  }
};

//not working yet
var friendsSetter = function(username) {
  if (friends.indexOf(username) === -1) {
    $('.users' + users.indexOf(username)).click(function() {
        console.log('.users' + users.indexOf(username));
        friends.push(username);
        $('.friends').append('<p>' + username + '</p>');
    });
  }
};

var messageDisplayer = function(messages, room) {
  $('.messages').html('');
  for (var i = 0; i < messages.results.length; i++) {
    var name = messages.results[i].username;
    var msg = messages.results[i].text;
    //call roomBuilder with new room
    roomBuilder(messages.results[i].roomname);
    if (users.indexOf(name) === -1) {
      users.push(name);
    }

    if ((messages.results[i].roomname === room || room === undefined)) {
      $('.messages').append('<p class=user' + users.indexOf(name) + '>' + escaper(name) + ': ' + escaper(msg) + '</p>');
    }
    //friendsSetter not working yet
    friendsSetter(name);
  }
};

var getMessages = function() {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    data: {
      order: "-createdAt"
    },
    success: function (data) {
      messageDisplayer(data, currentRoom);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

var sendMessage = function(message) {
  var msgObj = {
    'username': window.location.search.split("=")[1],
    'text': message,
    'roomname': currentRoom
  };
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(msgObj),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

$(document).ready(function() {
  $('#sendMsg').click(function() {
    sendMessage($('input').val());
  });
  $('#makeRoom').click(function() {
    roomBuilder($('#createRoom').val());
    currentRoom = $('#createRoom').val();
    $('.roomTracker').text($('#createRoom').val());
  });
  $('.allRooms').click(function() {
    currentRoom = undefined;
    $('.roomTracker').text("Showing all rooms");
  });
});

getMessages();
setInterval(getMessages, 1000);



