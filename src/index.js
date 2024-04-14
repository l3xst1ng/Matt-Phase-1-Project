const apiUrl = "http://localhost:3000"; // Replace with your API URL

const homeSection = document.getElementById("home-page");

const otherSections = document.querySelectorAll(".hidden-section");

const navLinks = document.querySelectorAll("nav ul li a");

// Function to show a selected nav section and hide the others
function showSection(sectionId) {
  homeSection.style.display = "none"; // Hides the home section
  otherSections.forEach((section) => {
    if (section.id === sectionId) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Displaying the home section by default
homeSection.style.display = "block";

//  click event listeners to the navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent reloading - the default link behavior

    // Get the target section ID from the link's href
    const targetSectionId = event.target.getAttribute("href").slice(1);

    if (targetSectionId === "home-page") {
      // If the target section is the home page, show the home section
      homeSection.style.display = "block";
      otherSections.forEach((section) => (section.style.display = "none"));
    } else {
      // Otherwise, show the target section and hide the other sections
      showSection(targetSectionId);
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  });
});

//  event listener for the form submission
const form = document.querySelector("#check-in form");
form.addEventListener("submit", handleCheckIn);

// function handleCheckIn to process the check-in form submission:

function handleCheckIn(event) {
  event.preventDefault();

  // Get the form input values
  const studentId = document.getElementById("studentId").value;
  const password = document.getElementById("password").value;

  // Authenticates the student and fetch attendance records
  const isAuthenticated = authenticateStudent(studentId, password);

  if (isAuthenticated) {
    // Hides the check-in form section
    document.getElementById("check-in").style.display = "none";

    // Displays the student dashboard section
    document.getElementById("student-dashboard").style.display = "block";

    // Fetching and displaying the attendance records
    displayAttendanceRecords();
  } else {
    // Displaying an error message or handle authentication failure
    alert("Invalid student ID or password");
  }
}

//function displayAttendanceRecords function to fetch the attendance records for the authenticated student
function displayAttendanceRecords() {
  const attendanceRecords = fetchAttendanceRecords();
  const recordsContainer = document.getElementById("attendance-records");
  recordsContainer.innerHTML = "";

  attendanceRecords.forEach((record) => {
    const recordElement = document.createElement("div");
    recordElement.innerHTML = `
      <p>Date: ${record.date}</p>
      <p>Time: ${record.time || "N/A"}</p>
      <p>Status: ${record.status}</p>
      <hr>
    `;
    recordsContainer.appendChild(recordElement);
  });
}

// Function to fetch attendance records from the JSON server
async function fetchAttendanceRecords(studentId) {
  try {
    const response = await fetch(`${apiUrl}/api/attendance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const studentRecords = data.attendanceRecord.filter(
        (record) => record.studentId === studentId
      );
      return studentRecords;
    } else {
      const error = await response.json();
      throw new Error(error.responseError.error);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to display attendance records in the student dashboard
function displayAttendanceRecords(studentId) {
  fetchAttendanceRecords(studentId)
    .then((attendanceRecords) => {
      const recordsContainer = document.getElementById("attendance-records");
      recordsContainer.innerHTML = "";

      attendanceRecords.forEach((record) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${record.date}</td>
          <td>${record.arrivalTime || "N/A"}</td>
          <td>${getAttendanceStatus(record.arrivalTime)}</td>
        `;
        recordsContainer.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}
// Function to get the attendance status based on the arrival time
function getAttendanceStatus(arrivalTime) {
  if (!arrivalTime) {
    return "Absent";
  }

  const [hours, minutes] = arrivalTime.split(":").map(Number);
  const arrivalHour = hours + minutes / 60;

  if (arrivalHour < 9 + 5 / 60) {
    return "Present";
  } else if (arrivalHour < 9 + 40 / 60) {
    return "Late";
  } else {
    return "Absent";
  }
}

//  handleCheckIn function to handle check ins
function handleCheckIn(event) {
  event.preventDefault();

  // Get the form input values
  const studentId = document.getElementById("studentId").value;
  const password = document.getElementById("password").value;

  // Authenticate the student and handle the UI based on the response
  authenticateStudent(studentId, password)
    .then((data) => {
      if (data.isAuthenticated) {
        // Hiding the check-in form section
        document.getElementById("check-in").style.display = "none";

        // Showing the student dashboard section
        document.getElementById("student-dashboard").style.display = "block";

        // Fetching and displaying the attendance records
        displayAttendanceRecords(studentId);
      } else {
        // Displaying an error message or handle authentication failure
        alert("Invalid student ID or password");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred during authentication");
    });
}

// Function to authenticate the student

async function authenticateStudent(studentId, password) {
  try {
    const response = await fetch(`${apiUrl}/api/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, password }),
    });

    if (response.ok) {
      const data = await response.text();
      if (data.trim() === "") {
        console.error("Authentication failed: Empty response from server");
        alert("Authentication failed: Empty response from server");
        return { isAuthenticated: false };
      } else {
        try {
          const jsonData = JSON.parse(data);
          localStorage.setItem("token", jsonData.responseSuccess.token);
          return {
            isAuthenticated: true,
            token: jsonData.responseSuccess.token,
          };
        } catch (parseError) {
          console.error(
            `Authentication failed: Invalid JSON response from server: ${parseError}`
          );
          alert(
            `Authentication failed: Invalid JSON response from server: ${parseError}`
          );
          return { isAuthenticated: false };
        }
      }
    } else {
      const errorData = await response.text();
      if (errorData.trim() === "") {
        console.error(
          "Authentication failed: Empty error response from server"
        );
        alert("Authentication failed: Empty error response from server");
      } else {
        console.error(`Authentication failed: ${errorData}`);
        alert(`Authentication failed: ${errorData}`);
      }
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error(`Network or other error during authentication:`, error);
    alert(`Error during authentication: ${error.message}`);
    return { isAuthenticated: false };
  }
}
