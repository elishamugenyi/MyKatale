document.addEventListener('DOMContentLoaded', (event) => {

    // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyCkOhP0r21SF_BsaCYdEohphxHWl1okJuE",
            authDomain: "consensus-activity.firebaseapp.com",
            projectId: "consensus-activity",
            storageBucket: "consensus-activity.firebasestorage.app",
            messagingSenderId: "247343994715",
            appId: "1:247343994715:web:bf11b8a317a7b3744d6c7e",
            measurementId: "G-BMQMR9TJ43"
          };
        
          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);

    const form = document.getElementById('votingForm');
    const loadMemberDataButton = document.getElementById('loadMemberData');
    const resetDataButton = document.getElementById('resetData');

    // Load saved data from local storage
    loadMemberDataButton.addEventListener('click', loadMemberData);
    resetDataButton.addEventListener('click', resetData);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveData();
        alert('Your rankings and reasons have been saved!');
        displayFinalRankings();
    });

    function saveData() {
        const memberName = document.getElementById('memberName').value;
        const rankings = {};
        for (let i = 1; i <= 14; i++) {
            rankings[`item${i}`] = document.getElementById(`item${i}`).value;
        }
        const reasons = document.getElementById('reasons').value;

        db.collection('teamData').doc(memberName).set({
            rankings: rankings,
            reasons: reasons
        }).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
        //const teamData = JSON.parse(localStorage.getItem('teamData')) || {};
        //teamData[memberName] = { rankings, reasons };

        //localStorage.setItem('teamData', JSON.stringify(teamData));
    }

    function loadMemberData() {
        const memberName = document.getElementById('memberName').value;
        //const teamData = JSON.parse(localStorage.getItem('teamData')) || {};
        db.collection('teamData').doc(memberName).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const { rankings, reasons } = data;
                for (let i = 1; i <= 14; i++) {
                    document.getElementById(`item${i}`).value = rankings[`item${i}`];
                }
                document.getElementById('reasons').value = reasons;
            } else {
                // Clear the form if no data is found for the selected member name
                for (let i = 1; i <= 14; i++) {
                    document.getElementById(`item${i}`).value = '';
                }
                document.getElementById('reasons').value = '';
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
       /* if (teamData[memberName]) {
            const { rankings, reasons } = teamData[memberName];
            for (let i = 1; i <= 14; i++) {
                document.getElementById(`item${i}`).value = rankings[`item${i}`];
            }
            document.getElementById('reasons').value = reasons;
        } else {
            // Clear the form if no data is found for the entered member name
            for (let i = 1; i <= 14; i++) {
                document.getElementById(`item${i}`).value = '';
            }
            document.getElementById('reasons').value = '';
        }
    }*/

    function resetData() {
        if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
            db.collection('teamData').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            }).then(() => {
                alert('All data has been reset.');
                // Clear the form
                document.getElementById('memberName').value = '';
                for (let i = 1; i <= 14; i++) {
                    document.getElementById(`item${i}`).value = '';
                }
                document.getElementById('reasons').value = '';
                // Clear the final rankings
                document.getElementById('finalRankings').innerHTML = '';
            }).catch((error) => {
                console.error("Error removing documents: ", error);
            });
        }
    }

    /*function resetData() {
        if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
            localStorage.removeItem('teamData');
            alert('All data has been reset.');
            // Clear the form
            document.getElementById('memberName').value = '';
            for (let i = 1; i <= 14; i++) {
                document.getElementById(`item${i}`).value = '';
            }
            document.getElementById('reasons').value = '';
            // Clear the final rankings
            document.getElementById('finalRankings').innerHTML = '';
        }
    }*/

    function aggregateRankings() {
        db.collection('teamData').get().then((querySnapshot) => {
            const aggregatedRankings = {};
            querySnapshot.forEach((doc) => {
                const { rankings } = doc.data();
                for (const item in rankings) {
                    if (!aggregatedRankings[item]) {
                        aggregatedRankings[item] = 0;
                    }
                    aggregatedRankings[item] += parseInt(rankings[item]);
                }
            });

            const sortedItems = Object.keys(aggregatedRankings).sort((a, b) => aggregatedRankings[a] - aggregatedRankings[b]);
            displayFinalRankings(sortedItems);
        });
    }

    /*function aggregateRankings() {
        const teamData = JSON.parse(localStorage.getItem('teamData')) || {};
        const aggregatedRankings = {};

        for (const member in teamData) {
            const { rankings } = teamData[member];
            for (const item in rankings) {
                if (!aggregatedRankings[item]) {
                    aggregatedRankings[item] = 0;
                }
                aggregatedRankings[item] += parseInt(rankings[item]);
            }
        }

        const sortedItems = Object.keys(aggregatedRankings).sort((a, b) => aggregatedRankings[a] - aggregatedRankings[b]);
        return sortedItems;
    }*/

    function displayFinalRankings() {
        const sortedItems = aggregateRankings();
        const finalRankingsList = document.getElementById('finalRankings');
        finalRankingsList.innerHTML = '';

        sortedItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.replace('item', '').concat('. ', getItemName(item));
            finalRankingsList.appendChild(listItem);
        });
    }

    function getItemName(itemId) {
        const itemNames = [
            "Fanny pack of food (cheese, salami, etc.)",
            "Plastic-covered map of the region",
            "Six personal flotation devices",
            "Two fishing poles (broken)",
            "Set of clothes for three (wet)",
            "One yellow Frisbee",
            "Water purification tablets",
            "Duct tape (one 30’ roll)",
            "Whiskey (one pint, 180 proof)",
            "Insect repellant (one bottle)",
            "Matches (30, dry)",
            "Parachute cord (35’)",
            "Compass",
            "Six sleeping bags (synthetic)"
        ];
        return itemNames[parseInt(itemId.replace('item', '')) - 1];
    }

    // Display final rankings on page load
    displayFinalRankings();

    /*function aggregateRankings() {
        const teamData = JSON.parse(localStorage.getItem('teamData')) || {};
        const aggregatedRankings = {};
    
        for (const member in teamData) {
            const { rankings } = teamData[member];
            for (const item in rankings) {
                if (!aggregatedRankings[item]) {
                    aggregatedRankings[item] = 0;
                }
                aggregatedRankings[item] += parseInt(rankings[item]);
            }
        }
    
        const sortedItems = Object.keys(aggregatedRankings).sort((a, b) => aggregatedRankings[a] - aggregatedRankings[b]);
        return sortedItems;
    }
    
    // Example usage:
    const sortedItems = aggregateRankings();
    console.log('Items ranked from most to least important:', sortedItems); */
});