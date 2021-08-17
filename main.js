const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const countdown = () => {
    let countDate = new Date("August 18, 2021 00:00:00").getTime()
    let now = new Date().getTime();
    let difference = countDate - now;

    let tDay = Math.floor( difference / day);
    let tHour = Math.floor((difference % day) / hour);
    let tMinute = Math.floor((difference % hour) / minute);
    let tSecond = Math.floor((difference % minute) / second);

    document.querySelector('.day').innerHTML = tDay;
    document.querySelector(".hour").innerText = tHour;
    document.querySelector(".minute").innerText = tMinute;
    document.querySelector(".second").innerText = tSecond;
};

setInterval(countdown, 1000);