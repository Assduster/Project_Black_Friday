var init = {

    navigation: function () {

        $('#navbar li a').click(function () {
            var hrefVal = $(this).attr('href');
            switch (hrefVal) {
                case "#start":
                    console.log(hrefVal);
                    break;
                case "#students":
                    //students.submitSearchQuery();
                    //students.submitNewStudent();
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";

            }


        })
    }
}