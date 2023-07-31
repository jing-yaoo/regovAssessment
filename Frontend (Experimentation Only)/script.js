document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const responseDiv = document.getElementById('response');
  
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const data = {
        username: formData.get('username'),
        password: formData.get('password'),
      };
  
      // Simulate the registration process
      responseDiv.innerText = 'Registering user...';
      await simulateAPI('/register', data);
      responseDiv.innerText = 'User registered successfully.';
      registerForm.reset();
    });
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const data = {
        username: formData.get('username'),
        password: formData.get('password'),
      };
  
      // Simulate the login process
      responseDiv.innerText = 'Logging in...';
      await simulateAPI('/login', data);

     // Check if the logout button was clicked before displaying "Login successful" message
     if (!isLogoutButtonClicked) {
      responseDiv.innerText = 'Login successful.';
    } else {
      // If logout button was clicked, reset the flag and do not show "Login successful" message
      isLogoutButtonClicked = false;
    }

    loginForm.reset();
  });

    let isLogOutButtonClicked = false;

    // Logout function
    const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', async () => {
    isLogoutButtonClicked = true; // Set the flag to true when logout button is clicked
    responseDiv.innerText = 'Logging out...';
    try {
      const response = await fetch('/logout', {
        method: 'POST',
      });
      // Logic for post response outcome
      if (response.ok) {
        responseDiv.innerText = 'Logged out successfully.';
      } else {
        responseDiv.innerText = 'Failed to log out.';
      }
    } catch (error) {
      responseDiv.innerText = 'An error occurred while logging out.';
    }
  });
  
    // Simulate API call (fake delay for demonstration purposes)
    function simulateAPI(endpoint, data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500); // Simulating a 1.5-second delay
      });
    }
  });
  