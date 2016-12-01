var students = {


    //Search for a student
    submitSearchQuery: function () {

        $("#searchStudentForm > div button").on("click", function (e) {

            e.preventDefault();
            $("#studentListTable > tbody").empty();

            var searchQuery = $('#searchQuery').val();

            if (searchQuery === "") {
                $("#SearchQueryLabel").text("Ange sökfras i fältet...");
                return;
            }

            $("#SearchQueryLabel").empty();
            students.searchForStudent(searchQuery);
        });
    },

    //Searchquery
    searchForStudent: function (searchQuery) {

        $.ajax({
            type: "GET",
            url: "api/searchStudents/" + searchQuery
        }).done(function (data) {

            if (data.length < 1) {  //Om det inte retuneras en student
                $("#SearchQueryLabel").text("Ingen student hittades. Försök igen...");
                var refreshStudentList = setTimeout(function () {
                    students.listOfStudents();
                }, 1500);
            }

            for (var counter = 0; counter < data.length; counter++) {
                $("#studentListTable > tbody").append("<tr><td>" +
                                            data[counter].id + "</td><td>" +
                                            data[counter].firstName + "</td><td>" +
                                            data[counter].lastName + "</td><td>" +
                                            data[counter].ssn + "</td><td>" +
                                            students.isStudentActive(data[counter].active) +
                                            "</td><td><span class='expandCoursesListButton glyphicon glyphicon-expand'></span><ul data-toggle='collapse' class='collapse'>" +
                                            listOfCourses(data[counter]) + "</ul></td></tr>"); //Kallar funktion för att plocka ut studentens kurser.
            }

            function listOfCourses(data) {
                var results = [];
                for (var counter = 0; counter < data.courses.length; counter++) {
                    results.push("<li>" + data.courses[counter].name + "</li>");
                }
                return results.join("");
            }


        }).fail(function () {
            $("#SearchQueryLabel").text("Något gick snett. Försök igen...");
        });
    },

    //Kollar om studenten är aktiv
    isStudentActive: function (data) {
        if (data) {
            return '<span class="glyphicon glyphicon-thumbs-up"><span class="hidden">True</span></span>';

        } else {
            return '<span class="glyphicon glyphicon-thumbs-down"><span class="hidden">False</span></span>';
        }
    },

    //Add a student
    registerNewStudent: function (student) {

        $.ajax({
            url: "/api/students/",
            type: "POST",
            data: JSON.stringify(student),
            contentType: "application/json"

        }).done(function (data) {
            students.emptyAddStudentForm();
            students.listOfStudents();
        });
    },

    //layout collapse the list of courses
    expandCoursesList: function () {
        $(document).on("click", ".expandCoursesListButton", function () {
            $(this).parent().find('ul').collapse('toggle');
        });
    },

    //Listar alla studenter i vyn
    listOfStudents: function () {
        $.ajax({
            url: "/api/students/",
            type: "GET"
        }).done(function (data) {
            for (var counter = 0; counter < data.length; counter++) {
                $("#studentListTable > tbody").fadeIn().append("<tr><td>" +
                                            data[counter].id + "</td><td>" +
                                            data[counter].firstName + "</td><td>" +
                                            data[counter].lastName + "</td><td>" +
                                            data[counter].ssn + "</td><td>" +
                                            students.isStudentActive(data[counter].active) +
                                            "</td><td><span class='expandCoursesListButton glyphicon glyphicon-expand'></span><ul data-toggle='collapse' class='collapse'>" +
                                            listOfCourses(data[counter]) + "</ul></td></tr>"); //Kallar funktion för att plocka ut studentens kurser. 

            }
            function listOfCourses(data) {
                var results = [];
                for (var counter = 0; counter < data.courses.length; counter++) {
                    results.push("<li>" + data.courses[counter].name + "</li>");
                }
                return results.join("");
            }
        }).fail(function () {
            alert("Error getting list of students");
        });
    },
    //Tömmer formuläret
    emptyAddStudentForm: function () {
        $('[name="firstName"]').val("");
        $('[name="lastName"]').val("");
        $('[name="ssn"]').val("");
        $("tbody").empty();
    },
    //Click event för att klicka på tumme ner och sätta student som inaktiv
    clickThumbsDown: function (){
        $("#studentListTable").on("click", ".glyphicon-thumbs-down", function () {
            students.editStudentActivity(this);
        })
    },
    //Click event för att klicka på tumme upp och sätta student som aktiv
    clickThumbsUp: function () {
        $("#studentListTable").on("click", ".glyphicon-thumbs-up", function () {
            students.editStudentActivity(this);
        })
    },


    //Ändrar student till aktiv/inaktiv
    editStudentActivity: function (data) {
           
            var currentRow = $(data).parents('tr').children();
            var active;

            if (currentRow.eq(4).children().text() == "False") {
                active = "True";
            } else {
                active = "False";
            }

            var id = currentRow.eq(0).text();
            var firstName = currentRow.eq(1).text();
            var lastName = currentRow.eq(2).text();
            var ssn = currentRow.eq(3).text();

            var student = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                ssn: ssn,
                active: active
            };
            
           students.registerNewStudent(student);    
    },


    //Samlar fomulärdata till ett objekt
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
            };

            //Kallar POST funktion
            students.registerNewStudent(student);
            $("#addStudentMessage").append("Studenten är tillagd");
        });
    }
};