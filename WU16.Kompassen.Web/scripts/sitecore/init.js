var init = {

    navigation: function () {

        $('.navigation a').on("click", function () {
            var hrefVal = $(this).attr('href');
            $('#navbar li').removeClass('active');
            $(this).parent().addClass('active');
            switch (hrefVal) {
                case "#start":
                    layout.startVisibility();
                    console.log(hrefVal);
                    break;
                case "#students":    
                    layout.studentVisibility();
                    students.listOfStudents();
                    break;
                case "#courses":
                    layout.courseVisibility();
                    courses.listAllCourses();
                    break;
                case "#addCourse":
                    courses.createCourseVisibility();
            }


        })
    }
}