﻿// Display functions, selects which elements that will be displayed at their corresponding page.
var layout = {
    startVisibility: function () {
        $('#studentListPlaceholder, #courseDetailsForm, #courseListPlaceholder').hide()
        $('#start').fadeIn(300);
    },
    courseVisibility: function () {
        $('#start, #studentListPlaceholder').hide();
        $('#courseDetailsForm, #courseListPlaceholder').fadeIn(300);
        $('#courseListTable tbody, #courseDetailsStudentSelectList, .registeredStudents').empty();
        courses.emptyEditForm();

    },
    studentVisibility: function () {
        $('#start, #courseDetailsForm, #courseListPlaceholder').hide();
        $('#studentListPlaceholder').fadeIn(300);
        $('#studentListTable tbody').empty();
    }
}