# Overview regovAssessment
This project features a dummy login interface as well as a theoritical backend implementation featuring login/logout and registration
functionality. The backend leverages mysql2 for data storage and manipulation.

# Database structure 
My local mysql database has a user_registration database. Inside, there are three tuples: id(primary key), username and password.

# File Guide
Dummy Interface: Frontend (Experimentation Only)
Backend: regovBackend.js


# Open issues 
1. Login response override LogOut response after simulated API-call timeout. Check isLogoutButtonClicked flag during fix.
2. (ON PURPOSE) Logout throws an exception when invoked. This is because I wanted to try to implement an end-to-end app.
   Due to lack of time, I chose to not do so. 
