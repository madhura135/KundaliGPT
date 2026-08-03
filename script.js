// 1. Grab all required HTML elements via the DOM
const astroForm = document.getElementById('astroForm');
const loadingContainer = document.getElementById('loadingContainer');
const resultCard = document.getElementById('resultCard');
const readingOutput = document.getElementById('readingOutput');
const resetBtn = document.getElementById('resetBtn');

// 2. Add an Event Listener to handle form submission
astroForm.addEventListener('submit', async function (event) {
    
    // Stop the browser from reloading the page automatically
    event.preventDefault();

    // 3. Extract the text values entered by the user
    const name = document.getElementById('userName').value;
    const dob = document.getElementById('birthDate').value;
    const time = document.getElementById('birthTime').value;
    const place = document.getElementById('birthPlace').value;

    // 4. Update UI State: Hide the form, reveal the loading spinner
    astroForm.classList.add('hidden');
    loadingContainer.classList.remove('hidden');

    // 5. Build a custom, highly detailed prompt for the AI model
    const cosmicPrompt = `You are an expert Vedic Astrologer. Generate a highly personalized Kundali reading and personality breakdown based on these exact details:
    Name: ${name}
    Date of Birth: ${dob}
    Time of Birth: ${time}
    Place of Birth: ${place}
    
    Please organize your reading into 3 clear sections:
    1. 🌌 Planetary Alignment Overview (Talk about their general energy)
    2. 💼 Career & 💖 Relationship Forecast (What does the future hold?)
    3. 🔮 Cosmic Tip of the Week (One actionable piece of advice)
    
    Keep the tone mysterious, encouraging, and deeply insightful. Use clear line breaks between sections.`;

    // 6. Trigger the Asynchronous API network call using Try/Catch/Finally
    try {
    const response = await fetch('https://kundaligpt.onrender.com/api/kundali', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            dob: dob,
            timeOfBirth: time,
            placeOfBirth: place
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to connect to the cosmos.");
    }

    const aiReading = data.kundali;

    readingOutput.textContent = aiReading;
    resultCard.classList.remove('hidden');

} catch (error) {
    console.error("Cosmic Error Logged:", error);
    readingOutput.innerHTML = `<span style="color: #ff4d4d; font-weight: bold;">⚠️ The stars are misaligned:</span> ${error.message}. Please try again!`;
    resultCard.classList.remove('hidden');
} finally {
    loadingContainer.classList.add('hidden');
}
});

// 7. Add an Event Listener to the Reset Button to allow re-testing
resetBtn.addEventListener('click', function() {
    resultCard.classList.add('hidden'); // Hide the result view
    astroForm.reset();                  // Completely clear all the form fields
    astroForm.classList.remove('hidden'); // Bring back the clean input form
});
