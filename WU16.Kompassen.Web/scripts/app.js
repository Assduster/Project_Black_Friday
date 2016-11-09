var url = "http://localhost:45959/";

var app = {
    searchForStudent: function (searchQuery) {
        //Searchquery
        $.ajax({
            type: "GET",
            url: url + "api/searchStudents/" + searchQuery,
        }).done(function (data) {
            console.log(data);
            for (var counter = 0; counter < data.length; counter++) {
                $("#studentListTable > tbody").append("<tr><td>" + data[counter].firstName + "</td><td>" + data[counter].lastName + "</td><td>" + data[counter].ssn + "</td><td>" + listOfCourses(data[counter]) + "</td></tr>");
                function listOfCourses(data) {
                    var results = [];
                    for (var i = 0; i < data.courses.length; i++) {
                        results.push(data.courses[i].name);
                    }
                    return results;
                }
            }
        });
    }
}