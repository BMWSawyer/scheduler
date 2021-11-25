# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Final Product

These are five screenshots of the single-page application (SPA) in use. They are as follows:
1. The main page of Scheduler app
2. Create appointment element
3. Appointment edit view 
4. Appointment deletion confirmation
5. Error status message

!["The main page of Scheduler app"] (https://github.com/BMWSawyer/scheduler/blob/master/docs/scheduler_main-page.png?raw=true)
!["Create appointment element"] (https://github.com/BMWSawyer/scheduler/blob/master/docs/scheduler_create-appointment.png?raw=true)
!["Appointment edit view"] (https://github.com/BMWSawyer/scheduler/blob/master/docs/scheduler_edit.png?raw=true)
!["Appointment deletion confirmation"] (https://github.com/BMWSawyer/scheduler/blob/master/docs/scheduler_delete-confirmation.png?raw=true)
!["Error status message"] (https://github.com/BMWSawyer/scheduler/blob/master/docs/scheduler_error-message.png?raw=true)

## Dependencies

- Node v10.16.1
- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts

## Setup/Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Fork and clone the scheduler-api <https://github.com/lighthouse-labs/scheduler-api> into a new directory (NOT within the same directory that you cloned this repository into) on your host machine.
4. Follow the README.md instructions to setup the scheduler-api.
5. Start the Webpack Development Server for this repository using the `npm run start` command. The app will be served at <http://localhost:8000>.
6. Open a new terminal tab/window and start the scheduler-api server. The scheduler-api server will be served at <http://localhost:8001>.
6. Go to <http://localhost:8000/> in your browser.
7. Explore the app, add/edit/delete appointments, have fun with it!

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
