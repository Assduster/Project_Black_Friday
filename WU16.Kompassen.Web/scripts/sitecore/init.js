var init = {

    navigation: function () {

        $('#navbar li a').on("click", function () {
            var hrefVal = $(this).attr('href');
            switch (hrefVal) {
                case "#start":
                    console.log(hrefVal);
                    break;
                case "#students":
                    students.submitSearchQuery();
                    students.submitNewStudent();
                    students.listOfStudents();
                    break;
                case "#courses":
                    courses.createNewCourse();
                    break;

            }


        })
    }
}