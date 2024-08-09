document.addEventListener('DOMContentLoaded', function () {
  // Get the form element
  const form = document.getElementById('registerForm');

  // Add an event listener for the form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect form data
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const countryCode = document.getElementById('phone').value;
    const phoneNumber = document.querySelector('input[name="phone"]').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;

    // Create an object to hold the form data
    const userData = {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      password, // Note: Storing passwords in plain text is insecure!
      email,
      gender,
      address
    };

    // Save the user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Optionally, display a message or redirect the user
    alert('Registration successful!');
    form.reset(); // Reset the form fields
  });
});

