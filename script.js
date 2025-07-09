window.onload = function () {
  let clickCounter = 0;
  const whatsappBtn = document.getElementById("whatsappBtn");
  const clickCountText = document.getElementById("clickCount");
  const submitBtn = document.getElementById("submitBtn");
  const confirmationMsg = document.getElementById("confirmationMsg");
  const form = document.getElementById("registrationForm");

  // ✅ Reset click counter and enable WhatsApp button on page load
  clickCounter = 0;
  clickCountText.textContent = "Click count: 0/5";
  whatsappBtn.disabled = false;

  // WhatsApp share logic
  whatsappBtn.addEventListener("click", () => {
    if (clickCounter < 5) {
      const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
      window.open(`https://wa.me/?text=${message}`, "_blank");

      clickCounter++;
      clickCountText.textContent = `Click count: ${clickCounter}/5`;

      if (clickCounter === 5) {
        whatsappBtn.disabled = true;
        clickCountText.textContent += " ✅ Sharing complete. Please continue.";
      }
    }
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (clickCounter < 5) {
      alert("Please complete 5 WhatsApp shares before submitting.");
      return;
    }

    // Collect form data
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const college = document.getElementById("college").value;
    const screenshot = document.getElementById("screenshot").files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("screenshot", screenshot);

    const scriptURL = "https://script.google.com/macros/s/AKfycbwCCo8RorKlOoGJ6w6Gv8nosgqaW7xF4D1zY0yakuG72arJGDTgsHFviCkzsZ5LK2DZgA/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        confirmationMsg.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
        
        // ✅ Reset form and WhatsApp share status for next submission
        form.reset();
        clickCounter = 0;
        clickCountText.textContent = "Click count: 0/5";
        whatsappBtn.disabled = false;
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
};
