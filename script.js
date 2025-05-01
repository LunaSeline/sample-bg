const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const emotionState = document.getElementById("emotionState");
const emotionDetectedText = document.getElementById("emotionDetectedText");
const emotionIcon = document.getElementById("emotionIcon");
const ctx = document.getElementById("emotionGraph").getContext("2d");

// Emotion data structure
const emotionData = {
  labels: ['Happy', 'Sad', 'Anger', 'Fear'],
  datasets: [{
    data: [0.3, 0.2, 0.15, 0.15],
    backgroundColor: []  // Filled dynamically
  }]
};

// Color sets for light and dark mode
const lightColors = ['#ffeb3b', '#ff9800', '#f44336', '#8bc34a', '#2196f3'];
const darkColors = ['#ffee58', '#ffb74d', '#ef5350', '#aed581', '#64b5f6'];

// Chart instance
let emotionChart;

// Apply appropriate colors
function updateChartColors(mode) {
  emotionChart.data.datasets[0].backgroundColor =
    mode === 'dark' ? darkColors : lightColors;
  emotionChart.update();
}

// Initialize chart
function initChart(mode = 'light') {
  emotionData.datasets[0].backgroundColor =
    mode === 'dark' ? darkColors : lightColors;

  emotionChart = new Chart(ctx, {
    type: 'pie',
    data: emotionData,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: { enabled: true }
      }
    }
  });
}

// Theme toggle logic
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const mode = body.classList.contains("dark-mode") ? 'dark' : 'light';
  themeToggle.textContent = mode === 'dark' ? "🌞 Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", mode);
  updateChartColors(mode);
});

// Palette selectors (unchanged)
document.getElementById("calmPalette").addEventListener("click", () => {
  body.classList.remove("bright-theme", "serene-theme", "sunset-theme");
  body.classList.add("calm-theme");
  localStorage.setItem("palette", "calm");
});
document.getElementById("brightPalette").addEventListener("click", () => {
  body.classList.remove("calm-theme", "serene-theme", "sunset-theme");
  body.classList.add("bright-theme");
  localStorage.setItem("palette", "bright");
});
document.getElementById("serenePalette").addEventListener("click", () => {
  body.classList.remove("calm-theme", "bright-theme", "sunset-theme");
  body.classList.add("serene-theme");
  localStorage.setItem("palette", "serene");
});
document.getElementById("sunsetPalette").addEventListener("click", () => {
  body.classList.remove("calm-theme", "bright-theme", "serene-theme");
  body.classList.add("sunset-theme");
  localStorage.setItem("palette", "sunset");
});

// Placeholder for emotion detection
function updateEmotionBasedOnPrompt() {
  emotionState.textContent = "Not Detected";
  emotionDetectedText.textContent = "We're here to help.";
}

// Load saved theme on start
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || 'light';
  if (savedTheme === 'dark') {
    body.classList.add("dark-mode");
    themeToggle.textContent = "🌞 Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
  initChart(savedTheme);
  updateEmotionBasedOnPrompt();
};
