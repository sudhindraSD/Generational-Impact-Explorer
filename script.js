// document.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll("nav a");
//   const sections = document.querySelectorAll("section");
//   const selectFrom = document.querySelector("#selectFrom");
//   const selectTo = document.querySelector("#selectTo");
//   const compareValues = document.querySelector("#compareValues");
//   const compareBtn = document.querySelector("#compare");
//   console.log(compareBtn);
//   // Function to show the selected section and hide others
//   const showSection = (sectionId) => {
//     sections.forEach((section) => {
//       if (section.id === sectionId) {
//         section.classList.add("active");
//       } else {
//         section.classList.remove("active");
//       }
//     });
//   };

//   // Add click event listeners to navigation links
//   links.forEach((link) => {
//     link.addEventListener("click", (event) => {
//       event.preventDefault(); // Prevent default anchor behavior
//       const sectionId = link.getAttribute("data-section");
//       showSection(sectionId);
//     });
//   });
//   const compareGenerations = async (from, to, field) => {
//     const resultDiv = document.getElementById("comparison-result");
//     resultDiv.innerHTML = "<p class='loading'>Loading comparison...</p>";

//     try {
//       console.log(`Comparing ${from} vs ${to} on ${field}`);
//       const response = await fetch(
//         `http://localhost:3000/api/compare?from=${from}&to=${to}&field=${field}`
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Comparison failed");
//       }

//       const data = await response.json();

//       resultDiv.innerHTML = `
//         <h3>Comparison Result</h3>
//         <p><strong>${from}</strong>: ${formatValue(data[from], field)}</p>
//         <p><strong>${to}</strong>: ${formatValue(data[to], field)}</p>
//       `;
//     } catch (err) {
//       console.error("Comparison error:", err);
//       resultDiv.innerHTML = `
//         <p class="error">Error: ${err.message}</p>
//         <p>Please check the console for details.</p>
//       `;
//     }
//   };

//   // Helper function to format values based on field type
//   function formatValue(value, field) {
//     if (value === null || value === undefined) return "No data";

//     switch (field) {
//       case "income":
//         return `$${value.toLocaleString()}`;
//       case "tech":
//       case "environmentalawareness":
//         return `${value}%`;
//       case "socialmedia":
//         return `${value} hrs/week`;
//       default:
//         return value;
//     }
//   }

//   compareBtn.addEventListener("click", () => {
//     compareGenerations(selectFrom.value, selectTo.value, compareValues.value);
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // Navigation
//   const navLinks = document.querySelectorAll("nav a");
//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const sectionId = link.dataset.section;
//       document
//         .querySelectorAll("section")
//         .forEach((s) => s.classList.remove("active"));
//       document.getElementById(sectionId).classList.add("active");
//     });
//   });

//   // Fetch and display generations data
//   fetch("http://localhost:3000/generations")
//     .then((res) => res.json())
//     .then((data) => {
//       const container = document.getElementById("generations-list");
//       container.innerHTML = data
//         .map(
//           (gen) => `
//           <div style="border:1px solid #ccc; margin:8px; padding:10px;">
//             <h3>${gen.name}</h3>
//             <p><strong>Born:</strong> ${gen.birth_range}</p>
//             <p><strong>Income:</strong> $${gen.avg_income}</p>
//             <p><strong>Education:</strong> ${gen.education_level}</p>
//             <p><strong>Tech Adoption:</strong> ${gen.tech_adoption_score}</p>
//             <p><strong>Social Media Usage:</strong> ${gen.social_media_usage}</p>
//             <p><strong>Environmental Awareness:</strong> ${gen.environmental_awareness}</p>
//           </div>`
//         )
//         .join("");
//     });

//   // Compare generations
//   document.getElementById("compare").addEventListener("click", () => {
//     const groupMap = {
//       babyBoomers: [
//         "Baby Boomers - Early",
//         "Baby Boomers - Late",
//         "Baby Boomers - Very Early",
//         "Baby Boomers - Mid",
//       ],
//       genX: [
//         "Gen X - Early",
//         "Gen X - Late",
//         "Gen X - Mid",
//         "Gen X - Very Late",
//       ],
//       millenials: [
//         "Millennials - Early",
//         "Millennials - Mid",
//         "Millennials - Late",
//         "Millennials - Very Early",
//         "Millennials - Very Late",
//       ],
//       genZ: [
//         "Gen Z - Early",
//         "Gen Z - Mid",
//         "Gen Z - Late",
//         "Gen Z - College Students",
//         "Gen Z - Young Teens",
//         "Gen Z - Kids",
//       ],
//     };

//     const from = document.getElementById("selectFrom").value;
//     const to = document.getElementById("selectTo").value;
//     const field = document.getElementById("compareValues").value;

//     fetch("http://localhost:3000/generations")
//       .then((res) => res.json())
//       .then((data) => {
//         const avg = (list, key) =>
//           list.reduce((sum, g) => sum + parseFloat(g[key] || 0), 0) /
//           list.length;

//         const fromData = data.filter((g) => groupMap[from].includes(g.name));
//         const toData = data.filter((g) => groupMap[to].includes(g.name));

//         let label = field;
//         let key = field;

//         switch (field) {
//           case "income":
//             key = "avg_income";
//             label = "Average Income";
//             break;
//           case "education":
//             key = "education_level";
//             label = "Education (average not measurable)";
//             break;
//           case "tech":
//             key = "tech_adoption_score";
//             label = "Tech Adoption Score";
//             break;
//           case "socialmedia":
//             key = "social_media_usage";
//             label = "Social Media Usage (hrs/day)";
//             break;
//           case "environmentalawareness":
//             key = "environmental_awareness";
//             label = "Environmental Awareness";
//             break;
//         }

//         const fromVal = avg(fromData, key).toFixed(2);
//         const toVal = avg(toData, key).toFixed(2);

//         const resultDiv = document.getElementById("comparison-result");

//         resultDiv.innerHTML = `
//           <h3>${label} Comparison</h3>
//           <p><strong>${from}:</strong> ${fromVal}</p>
//           <p><strong>${to}:</strong> ${toVal}</p>
//         `;
//       })

//       .catch((err) => {
//         document.getElementById("comparison-result").textContent =
//           "Error: Generations not found";
//         console.error("Fetch error:", err);
//       });
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      document
        .querySelectorAll("section")
        .forEach((s) => s.classList.remove("active"));
      document.getElementById(sectionId).classList.add("active");
    });
  });

  // Fetch and display generations data
  fetch("http://localhost:3000/generations")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("generations-list");
      container.innerHTML = data
        .map(
          (gen) => `
          <div style="border:1px solid #ccc; margin:8px; padding:10px;">
            <h3>${gen.name}</h3>
            <p><strong>Born:</strong> ${gen.birth_range}</p>
            <p><strong>Income:</strong> $${gen.avg_income}</p>
            <p><strong>Education:</strong> ${gen.education_level}</p>
            <p><strong>Tech Adoption:</strong> ${gen.tech_adoption_score}</p>
            <p><strong>Social Media Usage:</strong> ${gen.social_media_usage}</p>
            <p><strong>Environmental Awareness:</strong> ${gen.environmental_awareness}</p>
          </div>`
        )
        .join("");
    });

  // Compare generations
  document.getElementById("compare").addEventListener("click", () => {
    const groupMap = {
      babyBoomers: ["Baby Boomers - Early", "Baby Boomers - Late"],
      genX: ["Gen X - Early", "Gen X - Late"],
      millenials: ["Millennials - Early", "Millennials - Late"],
      genZ: ["Gen Z - Early", "Gen Z - Late"],
    };

    const from = document.getElementById("selectFrom").value;
    const to = document.getElementById("selectTo").value;
    const field = document.getElementById("compareValues").value;

    fetch("http://localhost:3000/generations")
      .then((res) => res.json())
      .then((data) => {
        const avg = (list, key) =>
          list.reduce((sum, g) => sum + parseFloat(g[key] || 0), 0) /
          list.length;

        const fromData = data.filter((g) => groupMap[from].includes(g.name));
        const toData = data.filter((g) => groupMap[to].includes(g.name));

        let label = field;
        let key = field;

        switch (field) {
          case "income":
            key = "avg_income";
            label = "Average Income";
            break;
          case "education":
            key = "education_level";
            label = "Education (average not measurable)";
            break;
          case "tech":
            key = "tech_adoption_score";
            label = "Tech Adoption Score";
            break;
          case "socialmedia":
            key = "social_media_usage";
            label = "Social Media Usage (hrs/day)";
            break;
          case "environmentalawareness":
            key = "environmental_awareness";
            label = "Environmental Awareness";
            break;
        }

        let fromVal, toVal;
        if (field === "education") {
          fromVal = [...new Set(fromData.map((g) => g.education_level))].join(
            ","
          );
          toVal = [...new Set(toData.map((g) => g.education_level))].join(", ");
        } else {
          fromVal = avg(fromData, key).toFixed(2);
          toVal = avg(toData, key).toFixed(2);
        }

        const resultDiv = document.getElementById("comparison-result");

        resultDiv.innerHTML = `
          <h3>${label} Comparison</h3>
          <p><strong>${from}:</strong> ${fromVal}</p>
          <p><strong>${to}:</strong> ${toVal}</p>
          <canvas id="comparisonChart" width="400" height="200"></canvas>
        `;

        // Render the chart
        const ctx = document.getElementById("comparisonChart").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: [from, to],
            datasets: [
              {
                label: label,
                data: [fromVal, toVal],
                backgroundColor: ["#4CAF50", "#2196F3"],
                borderColor: ["#388E3C", "#1976D2"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })

      .catch((err) => {
        document.getElementById("comparison-result").textContent =
          "Error: Generations not found";
        console.error("Fetch error:", err);
      });
  });
});
