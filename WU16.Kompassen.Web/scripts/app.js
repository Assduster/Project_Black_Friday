var url = "http://localhost:45959/"; //satt som global för att fungera i alla GET/POST. Ändra efter behov.

var app = {

    init: function () {

        //Add a student
        $("#saveStudent").on("click", function (e) {
            e.preventDefault();

            var id = $('[name="id"]').val();
            var active = $('[name="active"]').val();
            var firstName = $('[name="firstName"]').val();
            var lastName = $('[name="lastName"]').val();
            var ssn = $('[name="ssn"]').val();

            var student = {
                Id: id,
                FirstName: firstName,
                LastName: lastName,
                SSN: ssn,
                Active: active
            }

            app.registerNewStudent(student)

        });

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
            app.searchForStudent(searchQuery);
        });
    },
    //Searchquery
    searchForStudent: function (searchQuery) {
        $.ajax({
            type: "GET",
            url: url + "api/searchStudents/" + searchQuery,
        }).done(function (data) {

            if (data.length < 1) {  //Om det inte retuneras en student
                $("#SearchQueryLabel").html("Ingen student hittades. Försök igen...");
            }

            for (var counter = 0; counter < data.length; counter++) {
                $("#studentListTable > tbody").append("<tr><td>" +
                                            data[counter].firstName + "</td><td>" +
                                            data[counter].lastName + "</td><td>" +
                                            data[counter].ssn + "</td><td>" +
                                            listOfCourses(data[counter]) + "</td></tr>"); //Kallar funktion för att plocka ut studentens kurser.

                function listOfCourses(data) {
                    var results = [];
                    for (var counter = 0; counter < data.courses.length; counter++) {
                        results.push(data.courses[counter].name);
                    }
                    return results;
                }
            }
        }).fail(function () {
            $("#SearchQueryLabel").html("Något gick snett. Försök igen..."); //TODO
        });
    },

    registerNewStudent: function (student) {

        $.ajax({
            url: url + "/api/students/",
            type: "POST",
            data: JSON.stringify(student),
            contentType: "application/json"

        }).done(function (data) {
            console.log("Student tillagd!"); //TODO Städa
        });
    }
}