// Display functions, selects which elements that will be displayed at their corresponding page.
var layout = {
    startVisibility: function () {
        $('#studentListPlaceholder, #courseDetailsForm, #courseListPlaceholder').hide()
        $('#defaultPlaceholder').fadeIn(300);
        $("#defaultPlaceholder").empty();
    },
    courseVisibility: function () {
        $('#studentListPlaceholder, #defaultPlaceholder').hide();
        $('#courseDetailsForm, #courseListPlaceholder').fadeIn(300);
        $('#courseListTable tbody, #courseDetailsStudentSelectList, .registeredStudents').empty();
        courses.emptyEditForm();
        $('html, body').animate({
            scrollTop: $("#courseListPlaceholder").offset().top
        }, 1000);


    },
    studentVisibility: function () {
        $('#start, #courseDetailsForm, #courseListPlaceholder, #defaultPlaceholder').hide();
        $('#studentListPlaceholder').fadeIn(300);
        $('#studentListTable tbody').empty();
    },

    navigation: function () {

            $('.navigation a').on("click", function () {
                var hrefVal = $(this).attr('href');
                $('#navbar li').removeClass('active');
                $(this).parent().addClass('active');
                switch (hrefVal) {
                    case "#start":
                        layout.startVisibility();
                        courses.defaultPlaceholder();
                        
                        break;
                    case "#students":
                        layout.studentVisibility();
                        students.listStudentsToView();
                        break;
                    case "#courses":
                        layout.courseVisibility();
                        courses.listAllCourses();
                        break;
                    
                }
            });
        }
    

    
}

    