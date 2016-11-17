var url = "http://localhost:45959/";

var courses = {
    //events to load on ready.
    addEventHandlers: function () {
        courses.createNewCourse();
        courses.selectCourseToEdit();
        courses.deleteCourse();
        students.submitSearchQuery();
        students.submitNewStudent();
        courses.saveChangesToCourse();
        courses.registerStudentToCourse();
        courses.unRegisterStudentToCourse();
        courses.cancelEditCourse();
        courses.defaultPlaceholder();
    },



    //Register student to course
    addStudentToDropList: function (data, i) {
        $('#courseDetailsStudentSelectList').append("<option data-id='" +
            data[i].id +
            "' data-first-name='" +
            data[i].firstName +
            "' data-last-name='" +
            data[i].lastName +
            "' data-ssn='" +
            data[i].ssn +
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

            };
            console.log(course);
            courses.registerNewCourse(course);
        });
    },

    // List all courses under "kurser"
    listAllCourses: function () {
        $.ajax({
            type: "GET",
            url: url + "/api/courses/",
        }).done(function (data) {
            console.log(data) //remove this
            for (var i = 0; i < data.length; i++) {
                $("#courseListTable > tbody").append("<tr><td>" +

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
            $('#courseListTable tbody').empty();

            courses.listAllCourses();

            $('#defaultPlaceholder').hide();
            $('#courseDetailsForm, #courseListPlaceholder').fadeIn(300);
        });
    },

    //get course from it's id and put it in edit form
    fetchCourseById: function (id) {
        $("#courseDetailsStudentSelectList").empty();
        $("#registeredStudents").empty();
        $.ajax({
            url: url + "/api/courses/" + id,
            type: "GET"
        }).done(function (data) {
            console.log(data) //remove
            $("[name='id'").val(data.id);
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

        $("#registeredStudents").append(
                        "<div class='list-group-item listed-student' data-id=' " +
                        data[i].id +
                        "' data-first-name='" +
                        data[i].firstName +
                        "' data-last-name='" +
                        data[i].lastName +
                        "' data-ssn='" +
                        data[i].ssn +
                        "'>" +
                        data[i].firstName +
                        " " +
                        data[i].lastName +
                        " | " +
                        data[i].ssn +
                        "<span class=' pull-right remove-icon glyphicon glyphicon-remove'></span>" +
                        "</div>")
    },

//populates dropdown and registered student list depending on if the students is registered to course or not.
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
    //empties the editform.
    emptyEditForm: function () {
        $("[name='name']").val("");
        $("[name='credits'").val("");
        $("[name='year'").val("");
        $("[name='term'").val("");
        $("[name='name']").attr("placeholder", "Namn");
        $("[name='credits'").attr("placeholder", "Poäng");
        $("[name='year'").attr("placeholder", "2015");
        $("[name='term'").attr("placeholder", "Termin");
        $("#registeredStudents").empty();
        $("#courseDetailsStudentSelectList").empty();
    },

    deleteCourse: function () {
        $("tbody").on("click", ".remove-button", function () {
            var id = $(this).data("id");
            var remove = confirm("Bekräfta borttagning av kurs!");
            if (remove) {
                $.ajax({
                    url: url + "/api/courses/" + id,
                    type: "DELETE",
                }).done(function () {
                    $("tbody").empty();
                    courses.listAllCourses();
                });
            }
        });
    },
    //saves the changes made to the course the the db.
    saveChangesToCourse: function () {
        $("#sendChange").on("click", function (e) {
            e.preventDefault();
            var isActive = $('#checkboxActive').is(':checked');
            var students = [];
            var div = document.getElementById('registeredStudents');
            var divs = div.getElementsByTagName('div');
            for (var i = 0; i < divs.length; i++) {
                var studentId = $(divs[i]).attr("data-id");
                var firstName = $(divs[i]).attr("data-first-name");
                var lastName = $(divs[i]).attr("data-last-name");
                var ssn = $(divs[i]).attr("data-ssn");

                var student = {
                    id: studentId,
                    firsName: firstName,
                    lastName: lastName,
                    ssn: ssn,
                }
                students.push(student);
            }
            var course = {
                id: $("[name='id'").val(),
                name: $("[name='name']").val(),
                credits: $("[name='credits'").val(),
                year: $("[name='year'").val(),
                term: $("[name='term'").val(),
                students: students,
                active: isActive
            }

            $.ajax({
                url: url + "/api/courses",
                type: "POST",
                data: JSON.stringify(course),
                contentType: "application/json"
            }).done(function () {
                console.log("sparad");
                $("tbody").empty();
                courses.emptyEditForm();
                courses.listAllCourses();
                $('html, body').animate({
                    scrollTop: $("#courseListPlaceholder").offset().top
                }, 1000);
            });
        });
    },

    //adds students to registered list of students and removes from dropdown.
    registerStudentToCourse: function () {
        $("#registerButton").on("click", function (e) {
            e.preventDefault();

            var studentId = $("#courseDetailsStudentSelectList option:selected").attr("data-id");
            var firstName = $("#courseDetailsStudentSelectList option:selected").attr("data-first-name");
            var lastName = $("#courseDetailsStudentSelectList option:selected").attr("data-last-name");
            var ssn = $("#courseDetailsStudentSelectList option:selected").attr("data-ssn");

            $("#registeredStudents").append(
                        "<div class='list-group-item listed-student' data-id=' " +
                        studentId +
                        "' data-first-name='" +
                        firstName +
                        "' data-last-name='" +
                        lastName +
                        "' data-ssn='" +
                        ssn +
                        "'>" +
                        firstName +
                        " " +
                        lastName +
                        " | " +
                        ssn +
                        "<span class=' pull-right remove-icon glyphicon glyphicon-remove'></span>" +
                        "</div>"
                )
            $("#courseDetailsStudentSelectList option:selected").remove()
        })
    },
//remove student from registered list and moves it to dropdown list.
    unRegisterStudentToCourse: function () {
        $(document).on("click", ".remove-icon", function () {

            var studentId = $(this).parent().attr("data-id");
            var firstName = $(this).parent().attr("data-first-name");
            var lastName = $(this).parent().attr("data-last-name");
            var ssn = $(this).parent().attr("data-ssn");

            $('#courseDetailsStudentSelectList').append("<option data-id='" +
              studentId +
              "' data-first-name='" +
              firstName +
              "' data-last-name='" +
              lastName +
              "' data-ssn='" +
              ssn +
              "'>" +
              firstName + " " +
              lastName + "(" +
              ssn + ")</option");
            $(this).parent(".listed-student").remove();
        });
    },

    cancelEditCourse: function () {
        $("#cancelButton").on("click", function (e) {
            e.preventDefault();
            courses.emptyEditForm();
            $('html, body').animate({
                scrollTop: $("#courseListPlaceholder").offset().top
            }, 1000);
        });
    },
    defaultPlaceholder: function () {
        $.ajax({
            type: "GET",
            url: url + "api/courses/",
        }).done(function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#defaultPlaceholder").append("<div id='" + data[i].id + "'class='grid'><h1>" +
                                data[i].name + "<span style='float: right' data-id='" +
                                data[i].id + "'class='edit-button glyphicon glyphicon-edit'></h1><div>Kursstart: " +
                                data[i].term + " " +
                                data[i].year + "</div><div>Antal poäng: " +
                                data[i].credits + "</div><div>Kursen har " +
                                data[i].students.length + " registrerade studenter</div></div>")

                if (data[i].active) {
                    $("#" + data[i].id).append('<span class="courseActive glyphicon glyphicon-thumbs-up"></span>')

                } else {
                    $("#" + data[i].id).append('<span class="courseNotActive glyphicon glyphicon-thumbs-down"></span>')
                }
            }

        });
    },
}