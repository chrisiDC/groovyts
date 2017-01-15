(function () {

    var self = this;
    self.expandedItems = JSON.parse(localStorage.getItem("sidebar_expanded_items"));


    $(document).ready(function () {

        self.link = $("#selectedMenuItem").val();
        localStorage.setItem("sidebar", "default");

        $("#sidebar-mini a[href]").click(function () {
            toggleSidebar("default")
        });
        $("#sidebar-toggle").click(function () {
            toggleSidebar("mini")
        });

        /*    $(".sidebar-link").click(function(event)
         {
         localStorage.setItem("link",$(event.currentTarget).attr("href"));
         });*/


        $('#sidebar .root-link').on('show.bs.collapse', function (event) {


            $("#sidebar .root-link").not("#" + event.currentTarget.id).collapse("hide");

        });

        $('.collapse').on('shown.bs.collapse', function (event) {
            if (self.expandedItems.indexOf(event.currentTarget.id) === -1) self.expandedItems.push(event.currentTarget.id);
            saveState();
            setGlyphicons();

        });
        $('.collapse').on('hidden.bs.collapse', function (event) {
            self.expandedItems.splice(self.expandedItems.indexOf(event.currentTarget.id), 1);
            saveState();
            setGlyphicons();
        })

        if (!self.expandedItems) {
            self.expandedItems = [];
            saveState();
        }
        else {
            //restore state

            $("a[href='" + self.link + "']").addClass("active");
            toggleRootLinkColor();
            for (var i = 0; i < self.expandedItems.length; i++) {
                $("#" + self.expandedItems[i]).collapse("show");
            }
        }

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

    function toggleRootLinkColor() {

        $('#sidebar .colored').removeClass('colored');
        $("#sidebar .active").each(function (i, element) {

            // console.log($(element).parent());
            $(element).closest(".root-link").prev().addClass("colored");
            // $(item).find(".active").length>0?alert("wow"):a
        })
    }

    function saveState() {
        localStorage.setItem("sidebar_expanded_items", JSON.stringify(self.expandedItems));
    }

    function setGlyphicons() {

        $("#sidebar").find("a[aria-expanded='true'] i.glyphicon-chevron-right").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
        $("#sidebar").find("a[aria-expanded='false'] i.glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");

    }


}());
