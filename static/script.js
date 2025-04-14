document.getElementById("predictForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const submitButton = this.querySelector(".btn");
    submitButton.disabled = true;
    submitButton.textContent = "Predicting...";

    const formData = new FormData(this);

    fetch("/", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text(); // Get the HTML response
    })
    .then(html => {
        // Replace the current page content with the new HTML
        document.documentElement.innerHTML = html;
        submitButton.disabled = false;
        submitButton.textContent = "Predict";
        window.scrollTo({ top: document.querySelector(".result-section").offsetTop, behavior: "smooth" });
    })
    .catch(error => {
        console.error("Error:", error);
        submitButton.disabled = false;
        submitButton.textContent = "Predict";
        alert("An error occurred. Please try again.");
    });
});

// Smooth scroll for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});