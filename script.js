function login() {
    window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const courses = document.querySelectorAll(".course");
    const addCourseButton = document.querySelector(".addCourse");
    const removeCourseButton = document.querySelector(".removeCourse");
    let selectedCourse = null;

    // Predefined colors for courses
    const courseColors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#a2d2ff", "#f08080", "#f4978e", "#fbc4ab",];
    let colorIndex = 0; // To cycle through colors

    // Define course span data (startRow, endRow, startCol, endCol)
    const courseData = {
        "CS-125 (11:00-12:00)": { days: ["Monday", "Wednesday", "Friday"], startCol: 7, endCol: 8 },
        "MATH-101 (9:00-10:00)": { days: ["Monday", "Wednesday", "Friday"], startCol: 3, endCol: 4 },
        "PHYS-110 (10:30-11:30)": { days: ["Tuesday", "Thursday"], startCol: 6, endCol: 7 },
        "ENG-200 (1:00-2:00)": { days: ["Tuesday", "Thursday"], startCol: 11, endCol: 12 },
        "HIST-150 (11:30-2:00)": { days: ["Monday", "Wednesday", "Friday"], startCol: 8, endCol: 12 },
        "BIO-120 (8:00-9:00)": { days: ["Monday", "Wednesday", "Friday"], startCol: 1, endCol: 2 },
        "CHEM-130 (12:00-1:00)": { days: ["Tuesday", "Thursday"], startCol: 9, endCol: 10 },
        "PSYCH-101 (10:00-11:00)": { days: ["Tuesday", "Thursday"], startCol: 5, endCol: 6 },
        "ECON-210 (11:00-12:00)": { days: ["Monday", "Wednesday", "Friday"], startCol: 7, endCol: 8 },
        "ART-105 (10:00-11:00)": { days: ["Monday", "Wednesday", "Friday"], startCol: 5, endCol: 6 }
    };
    const dayToRow = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5 };

    // Selecting only one course at a time
    courses.forEach(course => {
        course.addEventListener("click", function () {
            courses.forEach(c => c.classList.remove("selected")); // Remove "selected" from all
            this.classList.add("selected"); // Highlight the clicked course
            selectedCourse = this;
        });
    });

    // Add Course to the timetable
    addCourseButton.addEventListener("click", function () {
        if (!selectedCourse) {
            alert("Please select a course first!");
            return;
        }

        const courseName = selectedCourse.querySelector("h2").textContent;
        const courseInfo = courseData[courseName];

        if (!courseInfo) {
            alert("This course does not have assigned timetable positions!");
            return;
        }

        const table = document.querySelector("table");
        const rows = table.rows;

        const days = courseInfo.days;
        days.forEach(day => {
            const startRow = endRow = dayToRow[day];
            const startCol = courseInfo.startCol;
            const endCol = courseInfo.endCol;

            const targetCell = rows[startRow].cells[startCol];

            // Check if the slot is already occupied
            if (targetCell.textContent.trim()) {
                alert("This slot is already occupied!");
                return;
            }

            // Assign a color to the course
            const courseColor = courseColors[colorIndex % courseColors.length];

            // Set course in timetable and merge cells
            targetCell.textContent = courseName;
            targetCell.setAttribute("rowspan", endRow - startRow + 1);
            targetCell.setAttribute("colspan", endCol - startCol + 1);
            targetCell.style.background = courseColor;
            targetCell.style.color = "white";
            targetCell.style.textAlign = "center";
            targetCell.classList.add("filled");

            // Store course name, occupied cells, and color
            targetCell.dataset.courseName = courseName;
            targetCell.dataset.occupiedCells = JSON.stringify({ startRow, endRow, startCol, endCol });
            targetCell.dataset.courseColor = courseColor;

            // Remove extra cells covered by rowspan/colspan
            for (let r = startRow; r <= endRow; r++) {
                for (let c = startCol; c <= endCol; c++) {
                    if (r === startRow && c === startCol) continue; // Skip the main cell
                    rows[r].cells[c].remove();
                }
            }
        });
        colorIndex++; // Move to the next color in the cycle
    });

    // Remove Selected Course from timetable
    removeCourseButton.addEventListener("click", function () {
        if (!selectedCourse) {
            alert("Please select a course to remove!");
            return;
        }

        const courseName = selectedCourse.querySelector("h2").textContent;
        const table = document.querySelector("table");
        const rows = table.rows;
        let found = false;

        for (let r = 1; r < rows.length; r++) {
            for (let c = 1; c < rows[r].cells.length; c++) {
                let cell = rows[r].cells[c];
                if (cell.classList.contains("filled") && cell.dataset.courseName === courseName) {
                    found = true;

                    const occupiedCells = JSON.parse(cell.dataset.occupiedCells);
                    const { startRow, endRow, startCol, endCol } = occupiedCells;

                    // Clear main cell
                    cell.textContent = "";
                    cell.removeAttribute("rowspan");
                    cell.removeAttribute("colspan");
                    cell.style.background = "";
                    cell.style.color = "";
                    cell.style.textAlign = "";
                    cell.classList.remove("filled");
                    delete cell.dataset.courseName;
                    delete cell.dataset.occupiedCells;
                    delete cell.dataset.courseColor;

                    // Restore removed cells
                    for (let rIndex = startRow; rIndex <= endRow; rIndex++) {
                        for (let cIndex = startCol; cIndex <= endCol; cIndex++) {
                            if (rIndex === startRow && cIndex === startCol) continue; // Skip main cell
                            rows[rIndex].insertCell(cIndex);
                        }
                    }

                    return; // Stop after removing one course
                }
            }
        }

        if (!found) {
            alert("Selected course is not in the timetable!");
        }
    });
});
