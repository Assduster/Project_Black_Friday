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
                    students.submitSearchQuery();
                    students.submitNewStudent();
                    students.listOfStudents();
                    students.studentVisibility();
                    break;
                case "#courses":
                    courses.createNewCourse();
                    courses.courseVisibility();
                    courses.listAllCourses();
                    break;
                case "#addCourse":
                    courses.createNewCourse();
                    courses.createCourseVisibility();
            }


        })
    }
}