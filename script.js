const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const emotionState = document.getElementById("emotionState");
const emotionDetectedText = document.getElementById("emotionDetectedText");
const ctx = document.getElementById("emotionGraph").getContext("2d");

// Emotion data for pie chart
const emotionData = {
  labels: ['Happy', 'Sad', 'Anger', 'Fear'],
  datasets: [{
    data: [0.3, 0.2, 0.15, 0.15],
    backgroundColor: []
  }]
};

const lightColors = ['#ffeb3b', '#ff9800', '#f44336', '#8bc34a'];
const darkColors = ['#ffee58', '#ffb74d', '#ef5350', '#aed581'];

let emotionChart;
let emotionTimelineChart;

// Update chart colors
function updateChartColors(mode) {
  emotionChart.data.datasets[0].backgroundColor = mode === 'dark' ? darkColors : lightColors;
  emotionChart.options.plugins.legend.labels.color = mode === 'dark' ? 'white' : 'black'; // Change text color
  emotionChart.update();
}

// Initialize Pie Chart
function initChart(mode = 'light') {
  emotionData.datasets[0].backgroundColor = mode === 'dark' ? darkColors : lightColors;
  emotionChart = new Chart(ctx, {
    type: 'pie',
    data: emotionData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: mode === 'dark' ? 'white' : 'black' // Set text color for legend
          }
        },
        tooltip: { enabled: true }
      }
    }
  });
}

// Timeline Chart Initialization
function initEmotionTimelineChart(mode = 'light') {
  const timelineCtx = document.getElementById("emotionTimelineChart").getContext("2d");

  // Destroy the existing chart instance if it exists
  if (emotionTimelineChart) {
    emotionTimelineChart.destroy();
  }

  // Create a new chart instance
  emotionTimelineChart = new Chart(timelineCtx, {
    type: 'line',
    data: {
      labels: ["10 AM", "12 PM", "2 PM", "4 PM", "6 PM"],
      datasets: [
        {
          label: "Happy",
          data: [30, 40, 35, 50, 60],
          borderColor: "#4caf50",
          fill: false
        },
        {
          label: "Sad",
          data: [10, 15, 20, 18, 12],
          borderColor: "#2196f3",
          fill: false
        },
        {
          label: "Anger",
          data: [5, 8, 6, 10, 8],
          borderColor: "#f44336",
          fill: false
        },
        {
          label: "Fear",
          data: [7, 9, 11, 13, 10],
          borderColor: "#9c27b0",
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: mode === 'dark' ? 'white' : 'black' // Dynamically set legend text color
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: mode === 'dark' ? 'white' : 'black' // Dynamically set x-axis text color
          }
        },
        y: {
          ticks: {
            color: mode === 'dark' ? 'white' : 'black' // Dynamically set y-axis text color
          },
          beginAtZero: true
        }
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

  // Update chart colors and reinitialize the timeline chart
  updateChartColors(mode);
  initEmotionTimelineChart(mode);
});

// Load saved palette on page load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || 'light';
  const savedPalette = localStorage.getItem("palette");

  // Apply saved theme
  if (savedTheme === 'dark') {
    body.classList.add("dark-mode");
    themeToggle.textContent = "🌞 Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }

  // Apply saved palette
  if (savedPalette) {
    clearPalettes();
    body.classList.add(`${savedPalette}-theme`);
  }

  // Initialize charts with the saved theme
  initChart(savedTheme);
  initEmotionTimelineChart(savedTheme);
  updateEmotionBasedOnPrompt();
};
// Function to remove all palette classes
function clearPalettes() {
  body.classList.remove(
    "calm-theme",
    "bright-theme",
    "serene-theme",
    "sunset-theme",
    "mystic-theme",
    "nature-theme",
    "ocean-theme",
    "earthy-theme",
    "starry-theme",
    "moonlit-theme",
    "rainbow-theme",
    "winter-theme",
    "summer-theme",
    "autumn-theme",
    "spring-theme",
    "fall-theme",
    "snowy-theme",
    "rainy-theme",
    "cloudy-theme"
  );
}

// Palette Selectors
document.getElementById("calmPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("calm-theme");
  localStorage.setItem("palette", "calm");
});

document.getElementById("brightPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("bright-theme");
  localStorage.setItem("palette", "bright");
});

document.getElementById("serenePalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("serene-theme");
  localStorage.setItem("palette", "serene");
});

document.getElementById("sunsetPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("sunset-theme");
  localStorage.setItem("palette", "sunset");
});

document.getElementById("mysticPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("mystic-theme");
  localStorage.setItem("palette", "mystic");
});

document.getElementById("naturePalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("nature-theme");
  localStorage.setItem("palette", "nature");
});

document.getElementById("oceanPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("ocean-theme");
  localStorage.setItem("palette", "ocean");
});

document.getElementById("earthyPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("earthy-theme");
  localStorage.setItem("palette", "earthy");
});

document.getElementById("starryPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("starry-theme");
  localStorage.setItem("palette", "starry");
});

document.getElementById("moonlitPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("moonlit-theme");
  localStorage.setItem("palette", "moonlit");
});

document.getElementById("rainbowPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("rainbow-theme");
  localStorage.setItem("palette", "rainbow");
});

document.getElementById("winterPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("winter-theme");
  localStorage.setItem("palette", "winter");
});

document.getElementById("summerPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("summer-theme");
  localStorage.setItem("palette", "summer");
});

document.getElementById("autumnPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("autumn-theme");
  localStorage.setItem("palette", "autumn");
});

document.getElementById("springPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("spring-theme");
  localStorage.setItem("palette", "spring");
});

document.getElementById("fallPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("fall-theme");
  localStorage.setItem("palette", "fall");
});

document.getElementById("snowyPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("snowy-theme");
  localStorage.setItem("palette", "snowy");
});

document.getElementById("rainyPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("rainy-theme");
  localStorage.setItem("palette", "rainy");
});

document.getElementById("cloudyPalette").addEventListener("click", () => {
  clearPalettes();
  body.classList.add("cloudy-theme");
  localStorage.setItem("palette", "cloudy");
});

// Load saved palette on page load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || 'light';
  const savedPalette = localStorage.getItem("palette");

  // Apply saved theme
  if (savedTheme === 'dark') {
    body.classList.add("dark-mode");
    themeToggle.textContent = "🌞 Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }

  // Apply saved palette
  if (savedPalette) {
    clearPalettes();
    body.classList.add(`${savedPalette}-theme`);
  }

  initChart(savedTheme);
  initEmotionTimelineChart();
  updateEmotionBasedOnPrompt();
};
