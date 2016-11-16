// Display functions, selects which elements that will be displayed at their corresponding page.
var layout = {
    startVisibility: function () {
        $('#studentListPlaceholder, #courseDetailsForm, #courseListPlaceholder').hide()
        $('#defaultPlaceholder').fadeIn(300);
    },
    courseVisibility: function () {
        $('#studentListPlaceholder, #defaultPlaceholder').hide();
        $('#courseDetailsForm, #courseListPlaceholder').fadeIn(300);
        $('#courseListTable tbody, #courseDetailsStudentSelectList, .registeredStudents').empty();
        courses.emptyEditForm();

    },
    studentVisibility: function () {
        $('#start, #courseDetailsForm, #courseListPlaceholder, #defaultPlaceholder').hide();
        $('#studentListPlaceholder').fadeIn(300);
        $('#studentListTable tbody').empty();
    }
}
