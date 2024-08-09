document.addEventListener('DOMContentLoaded', function () {
  const updateForm = document.getElementById('updateform');

  // Handle form submission
  updateForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const photo = document.getElementById('photo').files[0];
    const type = document.querySelector('input[name="type"]:checked').value;

    if (photo) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const photoUrl = e.target.result;

        // Create ad object
        const ad = {
          description,
          quantity,
          price,
          location,
          photo: photoUrl,
          type
        };
        // Save ads to localStorage
        localStorage.setItem('ad', JSON.stringify(ad));

        //set alert after updating ads
        alert('Ad has been added successfully!');

        // Clear the form
        updateForm.reset();
      };

      reader.readAsDataURL(photo); // Convert image to base64 URL
    }
  });
});

