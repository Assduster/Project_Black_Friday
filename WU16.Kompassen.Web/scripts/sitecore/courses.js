﻿var url = "http://localhost:45959/";

var courses = {

    addEventHandlers: function () {
        courses.createNewCourse();
        courses.selectCourseToEdit();
        courses.startCourseToEdit();
        courses.deleteCourse();
        students.submitSearchQuery();
        students.submitNewStudent();
        courses.defaultPlaceholder();
    },

    //Register student to course
    addStudentToDropList: function (data, i) {
        $('#courseDetailsStudentSelectList').append("<option data-id='" +
            data[i].id +
            "'>" +
            data[i].firstName + " " +
            data[i].lastName + "(" +
            data[i].ssn + ")</option");
    },

    //Add course to db
    registerNewCourse: function (course) {
        $.ajax({
            url: url + "/api/courses/",
            type: "POST",
            data: JSON.stringify(course),
            contentType: "application/json"

        }).done(function (data) {
            $('#courseListAddCourseForm input').val("");
            $('#courseListTable tbody').empty();
            courses.listAllCourses();
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

    // List all courses under "kurser"
    listAllCourses: function () {
        $.ajax({
            type: "GET",
            url: url + "api/courses/",
        }).done(function (data) {
            console.log(data) //remove this
            for (var i = 0; i < data.length; i++) {
                $("#courseListTable").append('<tr><td>' +

                                data[i].name + "</td><td>" +
                                data[i].credits + "</td><td>" +
                                data[i].students.length + "</td><td><span data-id='" +
                                data[i].id +
                                "'class='edit-button glyphicon glyphicon-edit'></span><span data-id='" +
                                data[i].id +
                                "'class='remove-button glyphicon glyphicon-trash'></span></td></tr>")
            }
        });
    },

    //select course to edit and move it to edit form
    selectCourseToEdit: function () {
        $(document).on("click", ".edit-button", function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            var id = $(this).attr("data-id");
            console.log(id); //remove this
            courses.fetchCourseById(id);
        });
    },

    //get course from it's id and put it in edit form
    fetchCourseById: function (id) {
        $("#courseDetailsStudentSelectList").empty();
        $(".registeredStudents").empty();
        $.ajax({
            url: url + "api/courses/" + id,
            type: "GET"
        }).done(function (data) {
            console.log(data) //remove
            $("[name='name']").val(data.name);
            $("[name='credits'").val(data.credits);
            $("[name='year'").val(data.year);
            $("[name='term'").val(data.term);

            if (data.active == 1) {
                $("[name='active'").prop("checked", true);
            }
            else {
                $("[name='active'").prop("checked", false);
            }
            var courseId = data.id;
            courses.isStudentInCourse(courseId);
        });
    },

    // Puts student listed in Course in the list of active students.
    addStudentToRegisteredList: function (data, i) {
        $("#studentListLabel").text("");
        console.log("xD") //remove

        $(".registeredStudents").append(
                        "<div class='list-group-item listed-student' data-id=' " +
                        data[i].id +
                        "'>" +
                        data[i].firstName +
                        " " +
                        data[i].lastName +
                        " | " +
                        data[i].ssn +
                        "<span class=' pull-right remove-icon glyphicon glyphicon-remove'></span>" +
                        "</div>"
                )
    },

    isStudentInCourse: function (courseId) {
        console.log(courseId)

        $.ajax({
            type: "GET",
            url: url + "/api/students/",

        }).done(function (data) {
            for (var i = 0; i < data.length; i++) {

                for (var x = 0; x < data[i].courses.length; x++) {
                    if (courseId == data[i].courses[x].id) {
                        courses.addStudentToRegisteredList(data, i); //add studented in list of registered students
                        break;
                    }
                }

                if (data[i].courses[x] == undefined || !(courseId == data[i].courses[x].id)) {
                    courses.addStudentToDropList(data, i); //add student in dropdown list of unregistered students
                }
            }
        })
    },

    emptyEditForm: function () {
        $("[name='name']").val("");
        $("[name='credits'").val("");
        $("[name='term'").val("");
    },

    deleteCourse: function () {
        $("tbody").on("click", ".remove-button", function () {
            var id = $(this).data("id");
            var remove = confirm("Bekräfta borttagning av kurs!");
            if (remove) {
                $.ajax({
                    url: url + 'api/courses'
                }).done(function () {
                    courses.listAllCourses();
                });
            }
        });
    },





    defaultPlaceholder: function () {
        $.ajax({
            type: "GET",
            url: url + "api/courses/",
        }).done(function (data) {
            console.log(data) //remove this
            for (var i = 0; i < data.length; i++) {
                $("#defaultPlaceholder").append("<div id='" + data[i].id + "'class='grid'><h1>" +
                                data[i].name + "<span style='float: right' data-id='" +
                                data[i].id + "'class='edit-startbutton glyphicon glyphicon-edit'></h1><div>Kursstart: " +
                                data[i].term + " " +
                                data[i].year + "</div><div>Antal poäng: " +
                                data[i].credits + "</div><div>Kursen har " +
                                data[i].students.length + " registrerade studenter</div></div>")

                if (data[i].active === true) {
                    $("#" + data[i].id).append("<div>AKTIV</div>")
                } else {
                    $("#" + data[i].id).append("<div>EJ AKTIV</div>")
                }
            }
            
        });
    },
    startCourseToEdit: function () {
        $(document).on("click", ".edit-startbutton", function () {
            var id = $(this).attr("data-id");
            console.log(id); //remove this
            layout.courseVisibility();
            courses.startCourseById(id);
        });
    },

    startCourseById: function (id) {
        $.ajax({
            url: url + "api/courses/" + id,
            type: "GET"
        }).done(function (data) {
            $("[name='name']").val(data.name);
            $("[name='credits'").val(data.credits);
            $("[name='year'").val(data.year);
            $("[name='term'").val(data.term);

            if (data.active == 1) {
                $("[name='active'").prop("checked", true);
            }
            else {
                $("[name='active'").prop("checked", false);
            }
            var courseId = data.id;
            courses.isStudentInCourse(courseId);
        });
    }
}