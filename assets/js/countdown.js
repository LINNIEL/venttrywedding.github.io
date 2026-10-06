// Atur hitungan mundur ke 15 November 2024 pukul 18:00 WITA (UTC+8)
var target_date = new Date('October 23, 2026 17:00:00 GMT+8').getTime();
var days, hours, minutes, seconds; 

var countdown = document.getElementById("tiles"); 

getCountdown();

setInterval(function () { getCountdown(); }, 1000);

function getCountdown() {
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    days = pad(parseInt(seconds_left / 86400));
    seconds_left = seconds_left % 86400;

    hours = pad(parseInt(seconds_left / 3600));
    seconds_left = seconds_left % 3600;

    minutes = pad(parseInt(seconds_left / 60));
    seconds = pad(parseInt(seconds_left % 60));

    countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>"; 
}

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}
