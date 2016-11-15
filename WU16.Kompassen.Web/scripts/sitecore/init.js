var init = {

    navigation: function () {

        $('.navigation a').on("click", function () {
            var hrefVal = $(this).attr('href');
            $('#navbar li').removeClass('active');
            $(this).parent().addClass('active');
            switch (hrefVal) {
                case "#start":
                    courses.startVisibility();
                    console.log(hrefVal);
                    break;
                case "#students":    
                    students.studentVisibility();
                    students.listOfStudents();
                    students.sortStudents();
                    break;
                case "#courses":
                    courses.courseVisibility();
                    courses.listAllCourses();
                    courses.sortCourses();
                    break;
                case "#addCourse":
                    courses.createCourseVisibility();
            }


        })
    }
}