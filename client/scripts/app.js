// YOUR CODE HERE:

var getMessages = function() {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      messageDisplayer(data)
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

var messageDisplayer = function(messages) {
  $('.messages').html('');

  for (var i = 0; i < messages.results.length; i++) {
    $('.messages').append('<p>' +messages.results[i].username + ": " + messages.results[i].text + '</p>');
  }
};

getMessages();
setInterval(getMessages, 1000);



