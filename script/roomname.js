exports.makeRoomName = function (len) {
    var name = "";
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i=0; i<len; i++)
        name += alpha.charAt(Math.floor(Math.random() * alpha.length))

    return name;
}
