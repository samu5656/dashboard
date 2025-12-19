const toggle_btn = document.getElementById("light");
const navbar = document.querySelector(".navbar");
const settings = document.getElementById("settings");
const container = document.querySelector(".container");
const widget = document.querySelector(".widget");
const headers = document.querySelectorAll(".header");
const widgetcontrols = document.querySelector(".widget-controls");
const addbtn = document.querySelector(".add");
const deletebtn = document.querySelector(".delete");
const body = document.body;
const quoteText=document.getElementById("quote");

fetch("https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json")
  .then(res => res.json())
  .then(data => {
    const random = data[Math.floor(Math.random() * data.length)];
    quoteText.textContent = `"${random.quoteText}" — ${random.quoteAuthor || "Unknown"}`;
  })
  .catch(err => {
    console.error("Error fetching quote:", err);
    quoteText.textContent = "Could not load quote!";
  });

let isDark = false;
function toggle() {
    if (!isDark) {
        toggle_btn.textContent = "🌜";
        body.style.backgroundColor = "black";
        body.style.color = "white";
    }
    else {
        toggle_btn.textContent = "🌞";
        body.style.backgroundColor = "white";
        body.style.color = "black";

    }
    headers.forEach(header => {
        header.style.backgroundColor = isDark ? "black" : "white";
        header.style.color = isDark ? "white" : "black";
    });
    isDark = !isDark;

}

function Time() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let sess = "AM";
    if (hour >= 12) {
        sess = "PM";
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour === 12) {
        hour = 12;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    document.getElementById("time").textContent = `${hour}:${min}:${sec} ${sess}`;
    var weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    var finaldate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"

    })
        .replace(/, /g, "-")
        .replace(/ /g, "-");
    document.getElementById("date").textContent = `${weekday}     ${finaldate}`;
    setTimeout(Time, 1000);

}
Time();

var stickyadd = document.getElementById("sticky-add-button");
var stickytext = document.getElementById("sticky-textarea");
var stickydiv = document.getElementById("sticky-div");
var stickywidget = document.getElementById("sticky-widget");
var stickycancel = document.getElementById("sticky-cancel");

stickycancel.addEventListener("click", function (event) {
    event.target.parentElement.remove();
})

function createsticky(stickies) {
    var div = document.createElement("div");
    div.setAttribute("class", "sticky-div");
    div.style.position = "relative";
    div.innerHTML = `<p style="display: inline; margin: 0;
    padding: 0;" class="sticky-text" contenteditable="true">${stickies}</p><button style="display: inline;
        position:absolute;
        right: 5px;
        top: 50%;
        transform:translateY(-50%);
        border: none;
        background-color: white;
        font-size: 15px;
        font-weight: bold;" class="sticky-cancel-btn">x</button>`
    stickywidget.append(div);

    var stickycancelbtn = div.querySelector(".sticky-cancel-btn");
    stickycancelbtn.addEventListener("click", function (event) {
        div.remove();
        saveAllStickies();

    });

    var stickytexts = div.querySelector(".sticky-text");
    stickytexts.addEventListener("input",function() {

        saveAllStickies();

    });
}

function saveAllStickies(){
    let allText =[];
    document.querySelectorAll(".sticky-text").forEach(s=>{
        let txt=s.innerText.trim();
        if(txt!==""&& txt.toLowerCase()!=="add"){
            allText.push(txt);
        }
    });

    localStorage.setItem("stickies",JSON.stringify(allText));
}

let deletebutton = document.querySelector(".delete");
deletebtn.addEventListener("click", function () {
    document.querySelectorAll(".sticky-div").forEach(sticky => sticky.remove());
    localStorage.removeItem("stickies");
})

stickyadd.addEventListener("click", function (event) {
    event.preventDefault();
    let stickies = stickytext.value;
    if (stickies === "") return;

    createsticky(stickies);
    saveAllStickies();


    stickytext.value = "";

})

window.addEventListener("load", function () {
    let savedstickies = JSON.parse(this.localStorage.getItem("stickies")) || [];
    savedstickies.forEach(sticky => createsticky(sticky));
});

var todotextarea = document.getElementById("todo-textarea");
var todoaddbtn = document.getElementById("todo-add-button");
var todocontainer = document.querySelector(".todo-container");


function createTodo(taskObj) {
    var tododiv = document.createElement("div");
    tododiv.setAttribute("class", "tododiv");
    tododiv.style.position = "relative";
    tododiv.innerHTML = `<input type="checkbox" class="todo-checkbox" style="display: inline">   ${taskObj.text}<button style="display: inline;
        position:absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        background-color: white;
        font-size: 15px;
        font-weight: bold;" class="todo-cancel-btn">x</button>
        `;
    tododiv.style.display = "block";
    todocontainer.prepend(tododiv);

    var checkbox = tododiv.querySelector(".todo-checkbox");
    checkbox.checked=taskObj.completed;

    checkbox.addEventListener("change",function(){
        let todos = JSON.parse(localStorage.getItem("tasks")) ||[];
        todos=todos.map(t=>{
            if (t.text === taskObj.text){
                return {...t, completed: checkbox.checked};
            }
            return t;
        });
        localStorage.setItem("tasks",JSON.stringify(todos));
    })

    var todocancel = tododiv.querySelector(".todo-cancel-btn")
    todocancel.addEventListener("click", function (event) {
        tododiv.remove();

        let updatedTodos = JSON.parse(localStorage.getItem("tasks")) || [];
        updatedTodos = updatedTodos.filter(t => t.text !== taskObj.text);
        localStorage.setItem("tasks", JSON.stringify(updatedTodos));
    });


}
let deletebutton_todo = document.querySelector(".delete-todo");
deletebutton_todo.addEventListener("click", function () {
    document.querySelectorAll(".tododiv").forEach(tasks => tasks.remove());
    localStorage.removeItem("tasks");
});

todoaddbtn.addEventListener("click", function (event) {
    event.preventDefault();
    let task = todotextarea.value;
    if (todotextarea.value.trim() === "") return;

    let taskObj={text: task , completed: false};
    createTodo(taskObj);

    let savedtodos = JSON.parse(localStorage.getItem("tasks")) || [];
    savedtodos.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(savedtodos));

    todotextarea.value = "";

});

window.addEventListener("load", function () {
    let savedtodos = JSON.parse(this.localStorage.getItem("tasks")) || [];
    savedtodos.forEach(taskObj => createTodo(taskObj));
})


var bookmarktext = document.getElementById("bookmark-textarea");
var bookmarklink = document.getElementById("bookmark-link");
var bookmarkbtn = document.getElementById("bookmark-add-button");
var bookmarkcontainer = document.querySelector(".bookmarkcontainer");

function createbookmark(bookmark, link) {
    var bookmarkdiv = document.createElement("div");
    bookmarkdiv.setAttribute("class", "bookmarkdiv");
    bookmarkdiv.innerHTML = `<p style="display: inline;"><a href="${link}" target="_blank" rel="noopener noreferrer">${bookmark}</a></p><button style="display: inline;
        position:absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        background-color: white;
        font-size: 15px;
        font-weight: bold;" class="bookmark-cancel-btn">x</button>`;

    bookmarkcontainer.append(bookmarkdiv);

    var bookmarkcancel = bookmarkdiv.querySelector(".bookmark-cancel-btn")
    bookmarkcancel.addEventListener("click", function (event) {
        bookmarkdiv.remove();

        let updatedbookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        updatedbookmarks = updatedbookmarks.filter(b => b !== bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(updatedbookmarks));
        let updatedbookmarklinks = JSON.parse(localStorage.getItem("links")) || [];
        updatedbookmarklinks = updatedbookmarklinks.filter(b => b !== link);
        localStorage.setItem("links", JSON.stringify(updatedbookmarklinks));


    })
}

let deletebutton_bookmark = document.querySelector(".delete-bookmark");
deletebutton_bookmark.addEventListener("click", function () {
    document.querySelectorAll(".bookmarkdiv").forEach(bookmark => bookmark.remove());
    localStorage.removeItem("bookmarks");
    localStorage.removeItem("links");
});


bookmarkbtn.addEventListener("click", function (event) {
    event.preventDefault();

    let bookmark = bookmarktext.value;
    let link = bookmarklink.value;

    if (bookmarktext.value.trim() === "") return;
    if (bookmarklink.value.trim() === "") {
        alert("Add url!");
        return;
    }

    createbookmark(bookmark, link);

    var savedbookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    var savedbookmarkslinks = JSON.parse(localStorage.getItem("links")) || [];
    savedbookmarks.push(bookmark);
    savedbookmarkslinks.push(link);
    localStorage.setItem("bookmarks", JSON.stringify(savedbookmarks));
    localStorage.setItem("links", JSON.stringify(savedbookmarkslinks));


    bookmarktext.value = "";
    bookmarklink.value = "";


})

window.addEventListener("load", function () {
    let savedbookmarks = JSON.parse(this.localStorage.getItem("bookmarks")) || [];
    let savedbookmarklinks = JSON.parse(this.localStorage.getItem("links")) || [];
    savedbookmarks.forEach((bookmarks, index) => {
        let link = savedbookmarklinks[index];
        createbookmark(bookmarks, link);
    });
})


var setting = document.getElementById("settings");
var settingdiv = document.querySelector(".settingsdiv");
var cleardata = document.getElementById("cleardata");
setting.addEventListener("click", function () {
    if (settingdiv.style.display === "block") {
        settingdiv.style.display = "none";
    } else {
        settingdiv.style.display = "block";
    }
})
cleardata.addEventListener("click", function () {
    let confirmClear = confirm("This clears all saved data and restores defaults. Continue?");

    if (confirmClear) {
        localStorage.clear();
        location.reload();
    }
})
window.addEventListener("click", (event) => {
    if (settingdiv.style.display === "block" && !settingdiv.contains(event.target) && event.target !== setting) {
        settingdiv.style.display = "none";
    }
});


const calendarBtn = document.getElementById("calendarBtn");
const calendarPopup = document.getElementById("calendarPopup");
const closeBtn = document.getElementById("closeBtn");
const monthYear = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarGrid");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    monthYear.textContent = `${months[month]} ${year}`;
    calendarGrid.innerHTML = "";

    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    weekdays.forEach(day => {
        let div = document.createElement("div");
        div.textContent = day;
        div.style.fontWeight = "bold";
        div.style.background = "#f0f0f0";
        calendarGrid.appendChild(div);
    });

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let today = new Date();
        let isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        calendarGrid.innerHTML += `<div class="${isToday ? "today" : ""}">${day}</div>`;
    }
}


calendarBtn.addEventListener("click", () => {
    calendarPopup.style.display = "flex";
});


closeBtn.addEventListener("click", () => {
    calendarPopup.style.display = "none";
});


prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

generateCalendar(currentMonth, currentYear);

