$(document).ready(function () {
    var socket = io.connect("http://localhost:5000");

    /* Current room name */
    var roomName = $("#roomID").val();

    $("#chat").hide();
    $("#name").focus();
    $("form").submit(function (event) {
        event.preventDefault();
    });

    /* Entering the user's name */
    $("#join").click(function () {
        var name = $("#name").val();
        if (name != "") {
            socket.emit("join", name);
            $("#login").detach();
            $("#chat").show();
            $("#msg").focus();
            ready = true;
            socket.emit("switchRoom", roomName);
        }
    });

    $("#name").keypress(function (e) {
        if (e.which == 13) {
            var name = $("#name").val();
            if (name != "") {
                socket.emit("join", name);
                ready = true;
                $("#login").detach();
                $("#chat").show();
                $("#msg").focus();
                socket.emit("switchRoom", roomName);
            }
        }
    });

    /* Messages from the server (UPDATE) */
    socket.on("update", function (message) {
        if (ready) $("#msgs").append("<strong>" + message + "</strong><br>");
    });

    /* Passing the array containing the current clients */
    socket.on("update-people", function (people) {
        if (ready) {
            $("#people").empty();
            $.each(people, function (clientid, name) {
                $("#people").append(name + '<br>');
            });
        }
    }); 

    /* Receiving and displaying chats */
    socket.on("chat", function (who, message) {
        if (ready) {
            $("#msgs").append(who + ": " + message + '<br>');
        }
    });

    /* Handles disconnect */
    socket.on("disconnect", function () {
        $("#msgs").append("Server is not available");
        $("#msg").attr("disabled", "disabled");
        $("#send").attr("disabled", "disabled");
    });

    /* Sending messages */
    $("#send").click(function () {
        var msg = $("#msg").val();
        socket.emit("send", msg);
        $("#msg").val("");
    });

    $("#msg").keypress(function (e) {
        if (e.which == 13) {
            var msg = $("#msg").val();
            socket.emit("send", msg);
            $("#msg").val("");
        }
    });
});