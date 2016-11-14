var url = "http://localhost:45959/"; //satt som global för att fungera i alla GET/POST.

var students = {



    submitSearchQuery: function () {
        //Search for a student
        $("#searchStudentForm > div button").on("click", function (e) {

            $("#studentListTable > tbody").empty();
            e.preventDefault();

            var searchQuery = $('#searchQuery').val();

            if (searchQuery == "") {
                $("#SearchQueryLabel").html("Ange sökfras i fältet...");
                return;
            }

            $("#SearchQueryLabel").empty();
            students.searchForStudent(searchQuery);
        });
    },

    //Searchquery
    searchForStudent: function (searchQuery) {
        //$('#studentListTable tbody tr').remove();
        $.ajax({
            type: "GET",
            url: url + "api/searchStudents/" + searchQuery,
        }).done(function (data) {

            //var data = students.listOfStudents;

            if (data.length < 1) {  //Om det inte retuneras en student
                $("#SearchQueryLabel").html("Ingen student hittades. Försök igen...");
            }

            for (var counter = 0; counter < data.length; counter++) {
                $("#studentListTable > tbody").append("<tr><td>" +
                                            data[counter].id + "</td><td>" +
                                            data[counter].firstName + "</td><td>" +
                                            data[counter].lastName + "</td><td>" +
                                            data[counter].ssn + "</td><td><ul>" +
                                            listOfCourses(data[counter]) + "</ul></td></tr>"); //Kallar funktion för att plocka ut studentens kurser.

                function listOfCourses(data) {
                    var results = [];
                    for (var counter = 0; counter < data.courses.length; counter++) {
                        results.push("<li>" + data.courses[counter].name + "</li>");
                    }
                    return results.join("");
                }
                $("#searchQuery").val("");
            }
        }).fail(function () {
            $("#SearchQueryLabel").html("Något gick snett. Försök igen..."); //TODO
        });
    },
    //Add a student
    registerNewStudent: function (student) {

        $.ajax({
            url: url + "/api/students/",
            type: "POST",
            data: JSON.stringify(student),
            contentType: "application/json"

        }).done(function (data) {
            console.log("Student tillagd!"); //TODO Städa
        });
    },

    listOfStudents: function () {  //TODO
        $.ajax({
            url: url + "/api/students/",
            type: "GET"
        }).done(function (data) {
            console.log(data);
            for (var counter = 0; counter < data.length; counter++) {
                $("#studentListTable > tbody").append("<tr><td>" +
                                            data[counter].id + "</td><td>" +
                                            data[counter].firstName + "</td><td>" +
                                            data[counter].lastName + "</td><td>" +
                                            data[counter].ssn + "</td><td><ul>" +
                                            listOfCourses(data[counter]) + "</ul></td></tr>"); //Kallar funktion för att plocka ut studentens kurser.

                function listOfCourses(data) {
                    var results = [];
                    for (var counter = 0; counter < data.courses.length; counter++) {
                        results.push("<li>" + data.courses[counter].name + "</li>");
                    }
                    return results.join("");
                }
            }
        }).fail(function () {
            console.log("Error getting list of students");
        })
    },

    submitNewStudent: function () {

        $("#saveStudent").on("click", function (e) {
            e.preventDefault();

            var id = $('[name="id"]').val();
            var active = $('[name="active"]').val();
            var firstName = $('[name="firstName"]').val();
            var lastName = $('[name="lastName"]').val();
            var ssn = $('[name="ssn"]').val();

            var student = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                ssn: ssn,
                active: active
            }

            students.registerNewStudent(student)

        });
    },
    studentVisibility: function () {
        $('#start, #courseDetailsForm, #courseListPlaceholder').hide();
        $('#studentListPlaceholder').fadeIn(300);
        $('#studentListTable tbody').empty();


    }
}