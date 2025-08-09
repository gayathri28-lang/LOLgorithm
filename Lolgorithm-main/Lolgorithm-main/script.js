const projectButtons = document.querySelectorAll(".project-btn");
const projectView = document.querySelector(".project-view");
const projectFrame = document.getElementById("projectFrame");
const backBtn = document.getElementById("backBtn");

projectButtons.forEach(button => {
  button.addEventListener("click", () => {
    const projectName = button.getAttribute("data-project");
    projectFrame.src = `projects/${projectName}/index.html`;
    document.querySelector(".project-grid").classList.add("hidden");
    projectView.classList.remove("hidden");
  });
});

backBtn.addEventListener("click", () => {
  projectFrame.src = "";
  document.querySelector(".project-grid").classList.remove("hidden");
  projectView.classList.add("hidden");
});
