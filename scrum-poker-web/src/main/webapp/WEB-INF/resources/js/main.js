$(document).ready(function(){
    connect();

    $("#disconnect").on("click", function() {
        disconnect();
    });

    $("#connect").on("click", function() {
        connect();
    });
});

var stomp = null;

function addUser(user) {
    $("#response").append("<p id='" + user.name +"'>" + user.name + "</p>");
}

function removeUser(user) {
    $("#" + user.name).remove();
}

function updateVotes(vote) {
    $("#votes")
}

/*
    Stomp functions
*/
function connect() {
    var socket = new SockJS(context + "/stomp")
    stomp = Stomp.over(socket);
    stomp.connect({}, function(frame) {
        console.log("Connected: " + frame);

        stomp.subscribe("/topic/userConnect", function(message) {
            var user = JSON.parse(message.body);
            addUser(user);
        });

        stomp.subscribe("/topic/userDisconnect", function(message) {
            var user = JSON.parse(message.body);
            removeUser(user);
        })

        stomp.subscribe("/topic/vote", function(message) {
            var vote = JSON.parse(message.body);
            updateVotes(vote);
        })
    });

    // TODO: Get a list of all currently connected users.
}

function submitName() {
    var name = $("#name").val();
    stomp.send(context + "/addUser", {}, JSON.stringify({'name':name}));
}

function disconnect() {
    var name = $("#name").val();
    stomp.send(context + "/removeUser", {}, JSON.stringify({'name':name}));

    if(stomp != null) {
        stomp.disconnect();
    }

    $("#response").html("");
}

function submitVote() {

}