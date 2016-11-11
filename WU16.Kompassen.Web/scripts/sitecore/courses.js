var url = "http://localhost:45959/";

var courses = {

    //Add course to db
    registerNewCourse: function (course) {

        $.ajax({
            url: url + "/api/courses/",
            type: "POST",
            data: JSON.stringify(course),
            contentType: "application/json"

        }).done(function (data) {
            console.log("xD"); //TODO 
        });
    },
    //Create a new course
    createNewCourse: function () {
    $("#createCourse").on("click", function (e) {
        e.preventDefault();

        var id = $('[name="course-id"]').val();
        var name = $('[name="course-name"]').val();
        var points = $('[name="course-credits"]').val();
        var year = $('[name="course-year"]').val();
        var term = $('[name="course-term"]').val();

        var course = {
            id: id,
            name: name,
            term: term,
            year: year,
            credits: points,
               
        }
        console.log(course)
        courses.registerNewCourse(course)
    });
},
    courseVisibility: function () {
        $('#courseDetailsForm, #courseListPlaceholder').show();
        $('#studentListPlaceholder').hide();
    },
    createCourseVisibility: function () {
        $('#courseListPlaceholder').show();
        $('#studentListPlaceholder, #courseDetailsForm').hide();
    },
    startVisibility: function () {
        $('#studentListPlaceholder, #courseDetailsForm, #courseListPlaceholder').hide();
    }

}