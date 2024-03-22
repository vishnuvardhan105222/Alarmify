const currentTime = document.querySelector("h1"),
    content = document.querySelector(".content"),
    selectMenu = document.querySelectorAll("select"),
    setAlarmBtn = document.querySelector("button");

let alarmTime,
    isAlarmSet,
    ringtone = new Audio("https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3");

// Function to pad single digits with leading zeros
function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

// Populate select options for hours, minutes, and AM/PM
for (let i = 1; i <= 12; i++) {
    let hourOption = `<option value="${padZero(i)}">${padZero(i)}</option>`;
    selectMenu[0].insertAdjacentHTML("beforeend", hourOption);
}

for (let i = 0; i <= 59; i++) {
    let minuteSecondOption = `<option value="${padZero(i)}">${padZero(i)}</option>`;
    selectMenu[1].insertAdjacentHTML("beforeend", minuteSecondOption);
}

["AM", "PM"].forEach((ampm) => {
    let ampmOption = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].insertAdjacentHTML("beforeend", ampmOption);
});

// Update current time every second
setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12;
    h = padZero(h);
    m = padZero(m);
    s = padZero(s);

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (isAlarmSet && alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

// Function to set or clear alarm
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        isAlarmSet = false;
    } else {
        let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
        if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
            alert("Please, select a valid time to set Alarm!");
            return;
        }
        alarmTime = time;
        isAlarmSet = true;
        content.classList.add("disable");
        setAlarmBtn.innerText = "Clear Alarm";
    }
}

setAlarmBtn.addEventListener("click", setAlarm);