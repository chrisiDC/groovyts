(function () {


    $(document).ready(function () {

        $('#sidebar .collapse').on('show.bs.collapse', function (event) {
            console.log($("#sidebar a[href][aria-expanded='true']"));
            $("#sidebar a[href][aria-expanded='true']").collapse("hide");
            $("#item1").collapse("hide");
        });



    });
}());
