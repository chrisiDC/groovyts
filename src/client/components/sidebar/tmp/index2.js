(function () {


    $(document).ready(function () {

        $('#sidebar .collapse').on('show.bs.collapse', function (event) {

            var id = $(event.currentTarget).attr("id");
            $(event.currentTarget).parent().children(".in").not("#"+id).collapse("hide");
        });

        $('#sidebar .collapse').on('hidden.bs.collapse', function (event) {
            $(event.currentTarget).find(".in").collapse("hide");
        });


    });
}());
