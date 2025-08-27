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
    div.innerHTML = `<p style="display: inline;">${stickies}</p><button style="display: inline;
        position:absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        background-color: white;
        font-size: 15px;
        font-weight: bold;" class="sticky-cancel-btn">x</button>`
    stickywidget.prepend(div);

    var stickycancelbtn = document.querySelector(".sticky-cancel-btn");
    stickycancelbtn.addEventListener("click", function (event) {
        div.remove();

        let savedstickies = JSON.parse(localStorage.getItem("stickies")) || [];
        savedstickies = savedstickies.filter(s => s !== stickies);
        localStorage.setItem("stickies", JSON.stringify(savedstickies));

    })

}
let deletebutton = document.querySelector(".delete");
deletebtn.addEventListener("click", function () {
    document.querySelectorAll(".sticky-div").forEach(sticky => sticky.remove());
    localStorage.removeItem("stickies");
})

stickyadd.addEventListener("click", function (event) {
    event.preventDefault();
    let stickies = stickytext.value;
    if (stickytext.value.trim() === "") return;

    createsticky(stickies);

    let savedstickies = JSON.parse(localStorage.getItem("stickies")) || [];
    savedstickies.push(stickies);
    localStorage.setItem("stickies", JSON.stringify(savedstickies));

    stickytext.value = "";

})

window.addEventListener("load", function () {
    let savedstickies = JSON.parse(this.localStorage.getItem("stickies")) || [];
    savedstickies.forEach(sticky => createsticky(sticky));
})

var todotextarea = document.getElementById("todo-textarea");
var todoaddbtn = document.getElementById("todo-add-button");
var todocontainer = document.querySelector(".todo-container");


function createTodo(task) {
    var tododiv = document.createElement("div");
    tododiv.setAttribute("class", "tododiv");
    tododiv.style.position = "relative";
    tododiv.innerHTML = `<input type="checkbox" style="display: inline">   ${task}<button style="display: inline;
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

    var todocancel = document.querySelector(".todo-cancel-btn")
    todocancel.addEventListener("click", function (event) {
        tododiv.remove();

        let updatedTodos = JSON.parse(localStorage.getItem("tasks")) || [];
        updatedTodos = updatedTodos.filter(t => t !== task);
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
    createTodo(task);

    let savedtodos = JSON.parse(localStorage.getItem("tasks")) || [];
    savedtodos.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedtodos));

    todotextarea.value = "";

});

window.addEventListener("load", function () {
    let savedtodos = JSON.parse(this.localStorage.getItem("tasks")) || [];
    savedtodos.forEach(task => createTodo(task));
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
    localStorage.removeItem("bookmark");
});


bookmarkbtn.addEventListener("click", function (event) {
    event.preventDefault();

    let bookmark = bookmarktext.value;
    let link = bookmarklink.value;

    if (bookmarktext.value.trim() === "") return;
    if (bookmarklink.value.trim() === "") {
        alert("Add url!");
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
const calendarButn = document.getElementById("calendarBtn");
const calendarPopup = document.getElementById("calendarPopup");
const closeBtn = document.getElementById("closeBtn");

calendarButn.addEventListener("click", () => {
    calendarPopup.style.display = "flex"; 
});

closeBtn.addEventListener("click", () => {
    calendarPopup.style.display = "none"; 
});


window.addEventListener("click", (event) => {
    if (event.target === calendarPopup) {
        calendarPopup.style.display = "none";
    }
});

