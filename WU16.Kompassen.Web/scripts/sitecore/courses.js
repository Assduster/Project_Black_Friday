var url = "http://localhost:45959/";

var courses = {
    
    //Register student to course
    registerStudentToCourse: function () {
        $.ajax({
            url: url + "/api/students/",
            type: "GET"
        }).done(function (data) {
            for (var counter = 0; counter < data.length; counter++) {
                $('#courseDetailsStudentSelectList').append("<option>" + 
                    data[counter].firstName + " " +
                    data[counter].lastName + "(" +
                    data[counter].ssn + ")</option");
            }
        })
    },
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
        $('#courseDetailsForm, #courseListPlaceholder').fadeIn();
        $('#studentListPlaceholder').fadeOut();
        $('#courseListTable tbody, #courseDetailsStudentSelectList').empty();
    },
    createCourseVisibility: function () {
        $('#courseListPlaceholder').fadeIn();
        $('#studentListPlaceholder, #courseDetailsForm').fadeOut();
    },
    startVisibility: function () {
        $('#studentListPlaceholder, #courseDetailsForm, #courseListPlaceholder').fadeOut();
    },
    // List all courses under "kurser"
    listAllCourses: function () {
        $.ajax({
            type: "GET",
            url: url + "/api/courses/",
        }).done(function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                $("#courseListTable").append("<tr><td>" +
                                
                                data[i].name + "</td><td>" +
                                data[i].credits + "</td><td>" +
                                data[i].students.length + "</td><td><span data-id='" +
                                data[i].id +
                                "'class='glyphicon glyphicon-edit'></span></td></tr>")
            }
        });
    }

}