document.addEventListener('DOMContentLoaded', function () {
  // Get the login form element
  const loginForm = document.getElementById('vendor');

  // Add an event listener for the form submission
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect form data
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Retrieve the stored user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData) {
      // Compare entered credentials with stored credentials
      if (storedUserData.email === emailInput && storedUserData.password === passwordInput) {
        // Successful login
        alert('Login successful!');
        // Redirect to another page or perform another action
        window.location.href = 'updateform.html';
      } else {
        // Invalid credentials
        alert('Invalid email or password. Please try again.');
      }
    } else {
      // No user data found in localStorage
      alert('No user data found. Please register first.');
    }
  });
});

