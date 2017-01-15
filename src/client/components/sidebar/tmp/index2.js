(function () {


    $(document).ready(function () {

        var link = $("#selectedMenuItem").val();

        if (link)
        {
            var currentLink = $("a[href='"+link+"']");
            currentLink.addClass("active");
            var linkTarget = currentLink.next();
            linkTarget.parents(".list-group.collapse").collapse("show");
        }

        setTimeout(function(){
            $('#sidebar .collapse').on('show.bs.collapse', function (event) {

                var id = $(event.currentTarget).attr("id");
                $(event.currentTarget).parent().children(".in").not("#" + id).collapse("hide");
            });

            $('#sidebar .collapse').on('hidden.bs.collapse', function (event) {
                $(event.currentTarget).find(".in").collapse("hide");
            });

            $("#sidebar-mini a[href]").click(function () {
                toggleSidebar("default")
            });
            $("#sidebar-toggle").click(function () {
                toggleSidebar("mini");
            });
        },500)



    });

    function toggleSidebar(which) {
        if (which) localStorage.setItem("sidebar", which);

        var sideBar = $("#sidebar").parent();
        var sideBarMini = $("#sidebar-mini").parent();

        if (localStorage.getItem("sidebar") === "default") {
            sideBar.attr("style", "");
            sideBarMini.attr("style", "");
        }
        else {
            sideBar.attr("style", "display: none !important");
            sideBarMini.attr("style", "display:inherit !important");
        }
    }

}());
