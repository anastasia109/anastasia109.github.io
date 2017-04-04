function on_width_change() {
    if ($(window).width() < 750) {
        $("#menu").attr("id", "menu_disabled");
        $("#sidebar_disabled").attr("id", "sidebar");
        $("li.menu_item").toggleClass("sidebar_item").toggleClass("menu").toggleClass("menu_item");
        $("#block1_width").text("100%");
        $("#block2_width").text("100%");
        $("#block3_width").text("100%");
    } else {
		$($("[data-toggle]").data("toggle")).removeClass("open-sidebar");
		$("[data-toggle]").removeClass("toggled");
        $("#menu_disabled").attr("id", "menu");
        $("#sidebar").attr("id", "sidebar_disabled");
        $("li.sidebar_item").toggleClass("sidebar_item").toggleClass("menu").toggleClass("menu_item");
        $("#block1_width").text("250px");
        $("#block2_width").text("");
        $("#block3_width").text("200px");
    }
}


$(function () {
    $(".comment").click(function() {
        $(this).addClass("clicked");
    });
    $("[data-toggle]").click(function() {
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
        $(this).toggleClass("toggled");
    });
    on_width_change();
    $(window).resize(function() {
        on_width_change();
    });
});



