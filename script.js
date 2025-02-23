function login() {
    window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const courses = document.querySelectorAll(".course");
    const addCourseButton = document.querySelector(".addCourse");
    const removeCourseButton = document.querySelector(".removeCourse");
    const courseInfoContainer = document.querySelector(".bottom-item");
    let selectedCourse = null;

    // Predefined colors for courses
    const courseColors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#a2d2ff", "#f08080", "#f4978e", "#fbc4ab"];
    let colorIndex = 0; // To cycle through colors

    // Define course span data (startRow, endRow, startCol, endCol)
    const courseData = {
        "CS-125 (11:00-12:00 MWF)": { days: ["Monday", "Wednesday", "Friday"], startCol: 7, endCol: 9, info: "Introduction to Computer Science." },
        "MATH-101 (9:00-10:00 MWF)": { days: ["Monday", "Wednesday", "Friday"], startCol: 3, endCol: 5, info: "Basic calculus and algebra." },
        "PHYS-110 (10:30-11:30 TTh)": { days: ["Tuesday", "Thursday"], startCol: 6, endCol: 8, info: "Fundamentals of Physics." },
        "ENG-200 (1:00-2:00 TTh)": { days: ["Tuesday", "Thursday"], startCol: 11, endCol: 13, info: "Advanced English Literature." },
        "HIST-150 (11:30-2:00 MWF)": { days: ["Monday", "Wednesday", "Friday"], startCol: 8, endCol: 13, info: "World History Overview." },
        "BIO-120 (8:00-9:00 MWF)": { days: ["Monday", "Wednesday", "Friday"], startCol: 1, endCol: 3, info: "Introduction to Biology." },
        "CHEM-130 (12:00-1:00 TTh)": { days: ["Tuesday", "Thursday"], startCol: 9, endCol: 11, info: "General Chemistry Principles." },
        "PSYCH-101 (10:00-11:00 TTh)": { days: ["Tuesday", "Thursday"], startCol: 5, endCol: 7, info: "Introduction to Psychology." },
        "ECON-210 (11:00-12:00 MWF)": { days: ["Monday", "Wednesday", "Friday"], startCol: 7, endCol: 9, info: "Principles of Economics." },
        "ART-105 (10:00-11:00 MWF)": { days: ["Monday", "Wednesday", "Friday"], startCol: 5, endCol: 7, info: "Art Appreciation." }
    };
    const dayToRow = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5 };

    // Selecting only one course at a time
    courses.forEach(course => {
        course.addEventListener("click", function () {
            courses.forEach(c => c.classList.remove("selected")); // Remove "selected" from all
            this.classList.add("selected"); // Highlight the clicked course
            selectedCourse = this;
            
            // Display course information in the bottom-item container
            const courseName = selectedCourse.querySelector("h2").textContent;
            const courseInfo = courseData[courseName]?.info || "No additional information available.";
            courseInfoContainer.textContent = `Course information: ${courseName} - ${courseInfo} 
            Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis senectus imperdiet praesent erat sociosqu fusce dictum. Condimentum senectus curabitur montes curabitur per praesent non euismod. Penatibus orci rhoncus montes, integer dapibus dolor auctor fringilla. Vehicula risus eget suspendisse senectus egestas cursus aliquet. Vestibulum sapien eu efficitur amet lobortis tempor sodales consectetur. Posuere vestibulum pretium ex augue consectetur fringilla rutrum suscipit. Aptent massa blandit diam sem nostra curae mus ac aptent. Est elit commodo viverra ex mollis blandit tempor curae varius.
            Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis senectus imperdiet praesent erat sociosqu fusce dictum. Condimentum senectus curabitur montes curabitur per praesent non euismod. Penatibus orci rhoncus montes, integer dapibus dolor auctor fringilla. Vehicula risus eget suspendisse senectus egestas cursus aliquet. Vestibulum sapien eu efficitur amet lobortis tempor sodales consectetur. Posuere vestibulum pretium ex augue consectetur fringilla rutrum suscipit. Aptent massa blandit diam sem nostra curae mus ac aptent. Est elit commodo viverra ex mollis blandit tempor curae varius.
            Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis senectus imperdiet praesent erat sociosqu fusce dictum. Condimentum senectus curabitur montes curabitur per praesent non euismod. Penatibus orci rhoncus montes, integer dapibus dolor auctor fringilla. Vehicula risus eget suspendisse senectus egestas cursus aliquet. Vestibulum sapien eu efficitur amet lobortis tempor sodales consectetur. Posuere vestibulum pretium ex augue consectetur fringilla rutrum suscipit. Aptent massa blandit diam sem nostra curae mus ac aptent. Est elit commodo viverra ex mollis blandit tempor curae varius.
            Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis senectus imperdiet praesent erat sociosqu fusce dictum. Condimentum senectus curabitur montes curabitur per praesent non euismod. Penatibus orci rhoncus montes, integer dapibus dolor auctor fringilla. Vehicula risus eget suspendisse senectus egestas cursus aliquet. Vestibulum sapien eu efficitur amet lobortis tempor sodales consectetur. Posuere vestibulum pretium ex augue consectetur fringilla rutrum suscipit. Aptent massa blandit diam sem nostra curae mus ac aptent. Est elit commodo viverra ex mollis blandit tempor curae varius.
            Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis senectus imperdiet praesent erat sociosqu fusce dictum. Condimentum senectus curabitur montes curabitur per praesent non euismod. Penatibus orci rhoncus montes, integer dapibus dolor auctor fringilla. Vehicula risus eget suspendisse senectus egestas cursus aliquet. Vestibulum sapien eu efficitur amet lobortis tempor sodales consectetur. Posuere vestibulum pretium ex augue consectetur fringilla rutrum suscipit. Aptent massa blandit diam sem nostra curae mus ac aptent. Est elit commodo viverra ex mollis blandit tempor curae varius.`;
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
            const startRow = dayToRow[day];
            const startCol = courseInfo.startCol;
            const endCol = courseInfo.endCol;

            for (let col = startCol; col < endCol; col++) {
                const targetCell = rows[startRow].cells[col];
                if (targetCell.textContent.trim()) {
                    alert("This slot is already occupied!");
                    return;
                }
            }

            const courseColor = courseColors[colorIndex % courseColors.length];

            const mainCell = rows[startRow].cells[startCol];
            mainCell.textContent = courseName;
            mainCell.style.background = courseColor;
            mainCell.style.color = "white";
            mainCell.style.textAlign = "center";
            mainCell.classList.add("filled");
            mainCell.dataset.courseName = courseName;
            mainCell.colSpan = endCol - startCol;

            for (let col = startCol + 1; col < endCol; col++) {
                rows[startRow].deleteCell(startCol + 1);
            }
        });
        colorIndex++;
    });

    // Remove Selected Course from timetable (all instances at once)
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
                    cell.textContent = "";
                    cell.style.background = "";
                    cell.style.color = "";
                    cell.style.textAlign = "";
                    cell.classList.remove("filled");
                    delete cell.dataset.courseName;
                    cell.removeAttribute("colSpan");
                }
            }
        }

        if (!found) {
            alert("Selected course is not in the timetable!");
        }
    });
});
