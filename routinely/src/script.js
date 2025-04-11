// **Login Modal Toggle**
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");

loginBtn.onclick = function() {
    loginModal.style.display = "block";
};

closeBtn.onclick = function() {
    loginModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
};

// **Login and Register Form**
document.getElementById("registerLink").onclick = function() {
    document.getElementById("loginFormContainer").style.display = "none";
    document.getElementById("registerFormContainer").style.display = "block";
};

document.getElementById("loginLink").onclick = function() {
    document.getElementById("registerFormContainer").style.display = "none";
    document.getElementById("loginFormContainer").style.display = "block";
};

// **Login Validation**
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = localStorage.getItem("user");

    if (storedUser) {
        let [storedUsername, storedPassword] = storedUser.split(":");

        // Validate credentials
        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem("loggedIn", "true");
            updateLoginStatus();  // Update login button text to 'Logout'
            window.location.href = "index.html";  // Return to index.html after successful login
        } else {
            alert("Invalid login! Please try again.");
        }
    } else {
        alert("No user found. Please register.");
    }
});


// Function to update login status in the navbar
function updateLoginStatus() {
    let loginBtn = document.getElementById("loginBtn");
    
    // When logged in, replace the login button with logout
    if (loginBtn) {
        loginBtn.style.display = "none";  // Hide the login button
        
        // logout button and add it after the login button
        let logoutBtn = document.createElement("li");
        logoutBtn.innerHTML = '<a href="#" id="logoutBtn">Logout</a>';
        loginBtn.parentElement.appendChild(logoutBtn);  // Add logout button after the login button
        
        // Logout functionality
        logoutBtn.onclick = function() {
            localStorage.setItem("loggedIn", "false");  // Set logged-in status to false
            window.location.href = "index.html";  // Return to home page after logout
        };
    }
}

// Check login status when the page loads
window.onload = function() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        updateLoginStatus();  // Update UI to show logged-in state in navbar
    }
};

// **Check Login Status on Page Load**
window.onload = function() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        updateLoginStatus();  // Update UI to show logged-in state when the page loads
    }
};

// **Login Form Handling**
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = localStorage.getItem("user");

    if (storedUser) {
        let [storedUsername, storedPassword] = storedUser.split(":");

        // Validate credentials
        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem("loggedIn", "true");
            updateLoginStatus();  // Call update-Login-Status after successful login
            window.location.href = "index.html";  // Return to index.html after successful login
        } else {
            alert("Invalid login! Please try again.");
        }
    } else {
        alert("No user found. Please register.");
    }
});

// **Register Validation**
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let storedUser = localStorage.getItem("user");

    // If user is already registered, show a message
    if (storedUser) {
        alert("User already registered. Please login.");
    } else {
        // Store user credentials in localStorage
        localStorage.setItem("user", `${username}:${password}`);
        alert("Registration successful! You can now login.");
        window.location.href = "index.html";  // Redirect to login page after registration
    }
});

// **Restrict Page Access if Not Logged In**
document.querySelectorAll(".protected").forEach(link => {
    link.addEventListener("click", function(event) {
        if (localStorage.getItem("loggedIn") !== "true") {
            event.preventDefault();
            alert("You must log in first!");
        }
    });
});

// **Live Date and Time**
function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").innerText = now.toLocaleString();
}
setInterval(updateDateTime, 1000);

/*Motivational Quotes*/
const quotes = [ 
    "Success is the product of daily habits - James Clear (Atomic Habits)",
    "Own your morning, elevate your life - Robin Sharma (5 AM Club)",
    "You are one decision away from a completely different life - Mel Robbins",
    "Small daily improvements over time lead to stunning results - Robin Sharma (5 AM Club)",
    "Habits are the compound interest of self-improvement - James Clear (Atomic Habits)"
];

function displayQuote() {
    let quoteText = document.getElementById("quoteText");
    let index = Math.floor(Math.random() * quotes.length);
    quoteText.innerText = quotes[index];
}

/* Display the first quote */
displayQuote();

//  interval to change the quote every 2 minutes 
setInterval(displayQuote, 120000);

/* ROUTINE JAVASCRIPT */

// **Task Timer**
// JavaScript part
let timerInterval;
const alertSound = new Audio("https://github.com/NosiphoHlongwane1/routinely/blob/main/routinely/media/beep-05.mp3"); // or your own file

function startTimer() {
    let taskName = document.getElementById("taskName").value;
    let taskTime = parseInt(document.getElementById("taskTime").value);
    
    if (!taskName || !taskTime) {
        alert("Please enter a task and time!");
        return;
    }

    let seconds = taskTime * 60;
    document.getElementById("countdown").innerText = `Time Left: ${taskTime}:00`;
    document.getElementById("taskMessage").innerText = "";

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;
        document.getElementById("countdown").innerText = `Time Left: ${minutes}:${secs < 10 ? '0' : ''}${secs}`;

        if (seconds === 0) {
            clearInterval(timerInterval);
            document.getElementById("taskMessage").innerText = `Well done for completing ${taskName}!`;
            alertSound.play();
        }

        seconds--;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("countdown").innerText = "Time Left: 0:00";
    document.getElementById("taskMessage").innerText = "";
}

function updateMood() {
    const moodSelector = document.getElementById('moodSelector');
    const moodDisplay = document.getElementById('moodDisplay');
    const selectedMood = moodSelector.value;

    const moodEmojis = {
        happy: '😊',
        sad: '😢',
        excited: '😃',
        tired: '😴'
        // Add more moods and corresponding emojis as needed
    };

    moodDisplay.textContent = moodEmojis[selectedMood] || '😊';
}

// **To-Do List**

function addTask() {
    let taskInput = document.getElementById("newTask").value;
    if (taskInput === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let listItem = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function () {
        if (checkbox.checked) {
            listItem.style.textDecoration = "line-through";
        } else {
            listItem.style.textDecoration = "none";
        }
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px"; // Adding space between the task text and delete button
    deleteButton.onclick = function () {
        taskList.removeChild(listItem); // Removes the task from the list
    };

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(taskInput));
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    document.getElementById("newTask").value = "";
}

/* NOTES JAVASCRIPT */

// **Save Long Note**
function saveLongNote() {
    let topic = document.getElementById("noteTopic").value;
    let note = document.getElementById("longNote").value;

    if (!topic || !note) {
        alert("Please add a topic and note!");
        return;
    }

    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedNotes.push({ topic, note });
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    displaySavedNotes();
    alert("Note Saved!");
}

// **Save Priorities**
function savePriority(num) {
    let topic = document.getElementById("priorityTopic" + num).value;
    let note = document.getElementById("priorityNote" + num).value;

    if (!topic || !note) {
        alert("Please add a topic and priority!");
        return;
    }

    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedNotes.push({ topic, note });
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));

    displaySavedNotes();
    alert("Priority Saved!");
}

// **Load Notes on Page Load**
window.onload = function () {
    displaySavedNotes();
};

// **Display Saved Notes**
function displaySavedNotes() {
    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    let savedNotesContainer = document.getElementById("savedNotes");
    savedNotesContainer.innerHTML = "";

    savedNotes.forEach((item, index) => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("saved-note");
        noteDiv.innerHTML = `<h4>${item.topic}</h4><p>${item.note}</p> 
                             <button onclick="deleteNote(${index})">Delete</button>`;
        savedNotesContainer.appendChild(noteDiv);
    });
}

// **Delete a Note**
function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    savedNotes.splice(index, 1);
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    displaySavedNotes();
}

// **Set Reminder**
function setReminder() {
    let reminderTime = document.getElementById("reminderTime").value;
    if (!reminderTime) {
        alert("Please select a time!");
        return;
    }

    setTimeout(() => {
        alert("Reminder Alert!");
    }, 5000);
}

// **Set Reminder with Date & Time**
function setReminder() {
    let text = document.getElementById("reminderText").value;
    let date = document.getElementById("reminderDate").value;
    let time = document.getElementById("reminderTime").value;

    if (!text || !date || !time) {
        alert("Please enter all reminder details!");
        return;
    }

    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push({ text, date, time });
    localStorage.setItem("reminders", JSON.stringify(reminders));

    displayReminders();
    alert("Reminder Set!");
}

// **Display Saved Reminders**
function displayReminders() {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    let reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = "";

    reminders.forEach((reminder, index) => {
        let reminderDiv = document.createElement("div");
        reminderDiv.classList.add("saved-note");
        reminderDiv.innerHTML = `
            <p><strong>${reminder.text}</strong> on <em>${reminder.date}</em> at <em>${reminder.time}</em></p>
            <button onclick="deleteReminder(${index})">Delete</button>
        `;
        reminderList.appendChild(reminderDiv);

        // **Schedule Reminder Alert**
        let reminderDateTime = new Date(`${reminder.date}T${reminder.time}`).getTime();
        let currentTime = new Date().getTime();

        let timeUntilReminder = reminderDateTime - currentTime;
        if (timeUntilReminder > 0) {
            setTimeout(() => {
                alert(`Reminder: ${reminder.text}`);
                document.getElementById("media/lofi-alarm-clock-243766.mp3").play();
            }, timeUntilReminder);
        }
    });
}

// **Delete a Reminder**
function deleteReminder(index) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
}

// **Load Reminders on Page Load**
window.onload = function () {
    displayReminders();
    displaySavedNotes();
};
