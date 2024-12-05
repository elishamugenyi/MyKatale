document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('votingForm');
    const loadMemberDataButton = document.getElementById('loadMemberData');

    // Load saved data from local storage
    loadMemberDataButton.addEventListener('click', loadMemberData);

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

        const teamData = JSON.parse(localStorage.getItem('teamData')) || {};
        teamData[memberName] = { rankings, reasons };

        localStorage.setItem('teamData', JSON.stringify(teamData));
    }

    function loadMemberData() {
        const memberName = document.getElementById('memberName').value;
        const teamData = JSON.parse(localStorage.getItem('teamData')) || {};

        if (teamData[memberName]) {
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
    }

    /*function loadSavedData() {
        const teamData = JSON.parse(localStorage.getItem('teamData')) || {};

        // Load the data for the first team member (if any)
        const firstMember = Object.keys(teamData)[0];
        if (firstMember) {
            const { rankings, reasons } = teamData[firstMember];
            document.getElementById('memberName').value = firstMember;
            for (let i = 1; i <= 14; i++) {
                document.getElementById(`item${i}`).value = rankings[`item${i}`];
            }
            document.getElementById('reasons').value = reasons;
        }
    }*/

    function aggregateRankings() {
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