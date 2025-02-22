function login() {
    window.location.href = "dashboard.html";
}

function addCourse(course) {

}

class Course {
    constructor(name, startRow, startCol, endRow, endCol) {
        this.name = name;
        this.startRow = startRow;
        this.startCol = startCol;
        this.endRow = endRow;
        this.endCol = endCol;
    }
}

document.querySelectorAll(".course").forEach(course => {
    course.addEventListener("click", function() {
        // Remove previous selection
        document.querySelectorAll(".course").forEach(c => c.classList.remove("selected"));
        // Highlight clicked course
        this.classList.add("selected");
    });
});