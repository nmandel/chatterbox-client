// YOUR CODE HERE:
var rooms = [];
var currentRoom;
var escaper = function(message) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(message));
  return div.innerHTML;
};

var roomBuilder = function(room) {
  if (rooms.indexOf(room) === -1) {
    rooms.push(room);
    $('.rooms').append('<p class=' + escaper(room)+ '>' + escaper(room) + '</p>');
    $('.' + escaper(room)).click(function() { currentRoom = $(this).attr('class'); });
  }

};

var messageDisplayer = function(messages, room) {
  $('.messages').html('');
  for (var i = 0; i < messages.results.length; i++) {
    //call roomBuilder with new room
    roomBuilder(messages.results[i].roomname);
    if (messages.results[i].roomname === room || room === undefined) {
      // console.log(messages.results[i]);
      var name = messages.results[i].username;
      var msg = messages.results[i].text;
      $('.messages').append('<p>' + escaper(name) + ': ' + escaper(msg) + '</p>');
    }
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
      // console.log(data);
      messageDisplayer(data);
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
    'text': message
  };
  // console.log(JSON.stringify(msgObj));
  $.ajax({
    // always use this url
    //'order="-createdAt"
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
  $('button').click(function() {
    sendMessage($('input').val());
    // console.log($('input').val());
  })
});

getMessages();
setInterval(getMessages, 1000);



