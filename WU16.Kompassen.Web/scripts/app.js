var url = "http://localhost:45959/"; //satt som global för att fungera i alla GET/POST. Ändra efter behov.

var app = {

    //Searchquery
    searchForStudent: function (searchQuery) {
        $.ajax({
            type: "GET",
            url: url + "api/searchStudents/" + searchQuery,
        }).done(function (data) {
            console.log(data);
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
            console.log("Error!"); //TODO 
        });
    }
}