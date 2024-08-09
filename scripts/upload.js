document.addEventListener('DOMContentLoaded', function () {
  function loadAds() {
    const physicalGoodsContainer = document.getElementById('physicalGoods');
    const servicesContainer = document.getElementById('services');

    // Clear existing ads
    //physicalGoodsContainer.innerHTML = '';
    //servicesContainer.innerHTML = '';

    // Retrieve the ad from localStorage
    const ad = JSON.parse(localStorage.getItem('ad'));

    if (ad) {
      const adElement = document.createElement('div');
      adElement.className = 'ad';
      adElement.innerHTML = `
        <p>Description: ${ad.description}</p>
        <p>Quantity: ${ad.quantity}</p>
        <p>Price: ${ad.price} UGX</p>
        <p>Location: ${ad.location}</p>
        <img src="${ad.photo}" alt="Product Photo">
        <button id="buy">GET NOW</button>
      `;

      if (ad.type === 'good') {
        physicalGoodsContainer.appendChild(adElement);
      } else if (ad.type === 'service') {
        servicesContainer.appendChild(adElement);
      }
    }
  }

  // Load ads on page load
  loadAds();
});
