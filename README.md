# Tardy Spector - Attendance Tracking Application

## Description

Tardy Spector is a Single Page web-application designed to compliment the process of monitoring student attendance in educational institutions. It provides a user-friendly interface for students to check in and track their attendance records.

## About

- Inspiration for the Tardy Spector struck during my time as a student assistant. Often, feeling frustrated by queuing to manually check in for various classes and sessions, I envisioned a digital solution that could streamline this process.

- The app's name, ‘Tardy Spector’, is derived from the English word 'Tardy,' which means late;behind time;not in time, signifying its core function of tracking tardiness. Additionally, 'Spector' serves as an acronym for 'Inspector,' reflecting its role in inspecting and managing attendance records."

- This digital tool aims to streamline/compliment the burden of manual tracking.

## Live Site

## Features

- **Student Check-In**: Students can securely log in and check-in to record their attendance for the day.

- **Authentication**: Students can log in using their email and password to access the attendance system.

- **Attendance Tracking**: The system records attendance for each student, including date, arrival time, and status (Present, Late, Absent).

- **Attendance Records**: Students can view their attendance history, including dates, arrival times, and attendance status.

- **Responsive Design**: The application is designed to be responsive and accessible across various devices, including desktops, tablets, and mobile phones.

## Technologies Used

- **Front-end**: HTML, CSS, JavaScript
- **Back-end**: JSON Server (for local development and testing)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/student-attendance-app.git
```

2. Navigate to the project directory:

`cd `

3. Install dependencies:

- JSON Server globally:

```bash
 npm install -g json-server
```

3. Run the server:

```bash
json-server --watch db.json
```

5. Open and run the `index.html` file in your preferred web browser.

- Note: For production deployment, you would need to set up a proper backend server or use a serverless solution to handle the data storage and retrieval securely.

## Usage

1. Visit the application's homepage.
2. Click the "Check In" button in the navigation menu.
3. Enter one of the student IDs and password to log in located in the db.json file in "endpoint": "/api/authenticate",

4. After successful authentication, you will be redirected to the student dashboard.
5. The dashboard will display the attendance records, including dates, arrival times, and attendance status.
6. You can refer to the "Attendance Policies and Rules" section for detailed information about the institution's attendance guidelines.

## Contributing

- Contributions are welcome! The project is in its infancy, and I have plans to add more features such as the administrator management dashboard to manage and oversee the attendance data, GPS tracking to deter off-campus check-ins, etc.

- If you encounter any issues or have suggestions for features or improvements, please feel free to open an issue or submit a pull request. Your feedback and contributions will help make the project better for everyone. Thank you for your support!

## License & Copy

- This project is licensed under the [MIT License].
  © 2024. All rights reserved.
