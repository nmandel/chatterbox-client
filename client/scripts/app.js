// YOUR CODE HERE:
//
var escaper = function(message) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(message));
  // console.log(document.createTextNode(message).val());
  console.log(div);
  return div.innerHTML;
};

var messageDisplayer = function(messages) {
  $('.messages').html('');
  for (var i = 0; i < messages.results.length; i++) {
    var name = messages.results[i].username;
    var msg = messages.results[i].text;
    // $('.messages').append(escaper(name));
    $('.messages').append('<p>' + escaper(name) + ': ' + escaper(msg) + '</p>');
  }
};

var getMessages = function() {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      messageDisplayer(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};


getMessages();
//setInterval(getMessages, 1000);



