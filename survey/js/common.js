/*
 * Validate email address string
 */
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}


/*
 * Update bottom navigation buttons
 */
function update_buttons(current_page) {
    if (current_page == 3) {
        $("#next").text("Завершить");
        $("#next").css({
            "background": "#ff9800"
        });
        $("#next").css({
            "color": "#fff"
        });
    } else {
        $("#next").html("Следующий&nbsp;>");
        $("#next").css({
            "background": "#ffffff"
        });
        $("#next").css({
            "color": "#ff9800"
        });
    }
}


/*
 * Validate page contents
 */
function validate_page(current_page) {
    var okay = true; //- щоб продовжити валідацію після першого фолс
    if (current_page == 0) { // Step 1
        var name = $("#name_input").val();
        var email = $("#email_input").val();
        if (name == "") {
            $("#name_input").css({
                "border-color": "red"
            });
            okay = false;
        } else {
            $("#name_input").css({
                "border-color": "green"
            });
        }
        if (email != 0) {
            if (isValidEmailAddress(email)) {
                $("#email_input").css({
                    "border-color": "green"
                });
                $(".error").hide();
            } else {
                $("#email_input").css({
                    "border-color": "red"
                });
                 $(".error").show();
                okay = false;
            }
        } else {
            $("#email_input").css({
                "border-color": "red"
            });
             $(".error").show();
            okay = false;
        }
    } else if (current_page == 1) { // Step 2
        var countries = $("#countries").val();
        if (countries == null) {
            $("#countries").css({
                "border-color": "red"
            });
            okay = false;
        } else {
            $("#countries").css({
                "border-color": "green"
            });
        }
        var cities = $("#cities").val();
        if (cities == null) {
            $("#cities").css({
                "border-color": "red"
            });
            okay = false;
        } else {
            $("#cities").css({
                "border-color": "green"
            });
        }
    } else if (current_page == 2) { // Step 3
        var checked1 = $("#checkbox1").prop("checked");
        if (checked1) {
            var val1 = $("#Facebook_input").val();
            if (val1 == "") {
                $("#Facebook_input").css({
                    "border-color": "red"
                });
                okay = false;
            } else {
                $("#Facebook_input").css({
                    "border-color": "green"
                });
            }
        }
        var checked2 = $("#checkbox2").prop("checked");
        if (checked2) {
            var val2 = $("#Vk_input").val();
            if (val2 == "") {
                $("#Vk_input").css({
                    "border-color": "red"
                });
                okay = false;
            } else {
                $("#Vk_input").css({
                    "border-color": "green"
                });
            }
        }
        var checked3 = $("#checkbox3").prop("checked");
        if (checked3) {
            var val3 = $("#Twitter_input").val();
            if (val3 == "") {
                $("#Twitter_input").css({
                    "border-color": "red"
                });
                okay = false;
            } else {
                $("#Twitter_input").css({
                    "border-color": "green"
                });
            }
        }
        var checked4 = $("#checkbox4").prop("checked");
        if (checked4) {
            var val4 = $("#ok_input").val();
            if (val4 == "") {
                $("#ok_input").css({
                    "border-color": "red"
                });
                okay = false;
            } else {
                $("#ok_input").css({
                    "border-color": "green"
                });
            }
        }
    } else if (current_page == 3) { // Step 4
        var pet = $("input[name='pet']:checked").val();
        if (pet == undefined) {
            $("#dog_error").hide();
            $("#none_error").show();
            okay = false;
        } else if (pet == "dog4") {
            $("#none_error").hide();
            $("#dog_error").show();
            okay = false;
        } else {
            $("#none_error").hide();
            $("#dog_error").hide();
        }
    }
    return okay;
}


/*
 * Fill result box with user information
 */
function prepare_result() {
    // Clear
    $("#facebook_result").hide();
    $("#vk_result").hide();
    $("#twitter_result").hide();
    $("#ok_result").hide();
    $("#cat_result").html("");
    // Account information
    $("#name_result").text($("#name_input").val());
    $("#email_result").text($("#email_input").val());
    // Location
    $("#location_result").text($("#cities").find("option:selected").text() + ", " + $("#countries").find("option:selected").text());
    // Social networks
    var checked1 = $("#checkbox1").prop("checked");
    if (checked1) {
        $("#facebook_result_val").text($("#Facebook_input").val());
        $("#facebook_result").show();
    }
    var checked2 = $("#checkbox2").prop("checked");
    if (checked2) {
        $("#vk_result_val").text($("#Vk_input").val());
        $("#vk_result").show();
    }
    var checked3 = $("#checkbox3").prop("checked");
    if (checked3) {
        $("#twitter_result_val").text($("#Twitter_input").val());
        $("#twitter_result").show();
    }
    var checked4 = $("#checkbox4").prop("checked");
    if (checked4) {
        $("#ok_result_val").text($("#ok_input").val());
        $("#ok_result").show();
    }
    // Selected cat
    var img = $(document.createElement("img"));
    img.prop("src", $("#" + $("input[name='pet']:checked").val() + "_img").prop("src"));
    img.appendTo("#cat_result");
}


/*
 * Update container height according to window size
 */
function update_height() {
    if ($(window).height() > $(".container").height()) {
        $(".flex-container").css({
            "height": $(window).height()
        });
    } else {
        $(".flex-container").css({
            "height": $(".container").height()
        });
    }
}


/*
 * Main
 */
$(function () {
    // Initialize tabs widget
    $("#wrapper").tabs({
        beforeActivate: function (event, ui) { // Validate previous pages
            for (i = 0; i < ui.newTab.index(); i++) {
                if (!validate_page(i)) {
                    event.preventDefault(); // - відміна переходу на наступну сторінку
                }
            }
        },
        activate: function (event, ui) { // Change top buttons styles
            for (i = 0; i < ui.newTab.index(); i++) {
                $("#ui-id-" + (i + 1)).addClass("ui-tabs-previous");
            }
            for (i = ui.newTab.index(); i < 4; i++) {
                $("#ui-id-" + (i + 1)).removeClass("ui-tabs-previous");
            }
            update_buttons(ui.newTab.index()); //- оновлюємо кнопочки вверху. щоб на останній було завершити
        }
    });
    // Update container size
    $(".container").show();
    update_height();
    $(window).resize(function() { //- викликається при зміні елементу. в нашому випадку вікна
        update_height()
    });
    // Navigation buttons
    $("#prev").click(function () {
        var current = $("#wrapper").tabs("option", "active"); //- метод джейквері уі
        if (current > 0) {
            $("#wrapper").tabs("option", "active", current - 1);
        }
    });
    $("#next").click(function () {
        var current = $("#wrapper").tabs("option", "active");
        if (validate_page(current) && current < 3) {
            $("#wrapper").tabs("option", "active", current + 1);
        } else if (validate_page(current) && current == 3) {
            $("#wrapper").hide();
            $("#main_button").hide();
            prepare_result();
            $("#result").show();
            $("#again_button").show().css("display", "flex"); //-бо шой дає дісплай блок а нам потрібно по центру кнопочку
        }
    });
    $("#again").click(function () {
        $("#name_input").val("");
        $("#name_input").css({
            "border-color": "#fff"
        });
        $("#email_input").val("");
        $("#email_input").css({
            "border-color": "#fff"
        });
        $("#countries").prop("selectedIndex", 0);
        $("#countries").css({
            "border-color": "#fff"
        });
        $("#cities").prop("selectedIndex", 0);
        $("#cities").css({
            "border-color": "#fff"
        });
        $("#checkbox1").prop("checked", false);
        $("#Facebook_input").val("");
        $("#Facebook_input").hide();
        $("#Facebook_input").css({
            "border-color": "#fff"
        });
        $("#checkbox2").prop("checked", false);
        $("#Vk_input").val("");
        $("#Vk_input").hide();
        $("#Vk_input").css({
            "border-color": "#fff"
        });
        $("#checkbox3").prop("checked", false);
        $("#Twitter_input").val("");
        $("#Twitter_input").hide();
        $("#Twitter_input").css({
            "border-color": "#fff"
        });
        $("#checkbox4").prop("checked", false);
        $("#ok_input").val("");
        $("#ok_input").hide();
        $("#ok_input").css({
            "border-color": "#fff"
        });
        $("input[name='pet']:checked").prop("checked", false);
        $("#dog_error").hide();
        $("#result").hide();
        $("#again_button").hide();
        $("#wrapper").show();
        $("#main_button").show();
        $("#wrapper").tabs("option", "active", 0);
    });
    // Fill countries list
    $.getJSON("countries.json", function (data) {
        $.each(data, function (key, val) {
            $("#countries").append('<option value="' + key + '">' + val + '</option>');
        });
        $("#countries").prop("selectedIndex", 0); //- для того щоб спочатку не було нічого вибрано
        $("#cities").prop("selectedIndex", 0);
    });
    // Fill cities list
    $("#countries").change(function () {
        var selected = $(this).val();
        $("#cities").find("option").remove(); //- видаляємо всі міста які були
        $("#cities").append("<option disabled>Город</option>");
        $.getJSON("cities.json", function (data) {
            var arr = $.grep(Object.keys(data), function (key) {
                return data[key].country == selected;
            });
            $.each(arr, function (key) {
                $("#cities").append('<option value="' + arr[key] + '">' + data[arr[key]].name + '</option>');
            });
            $("#cities").prop("selectedIndex", 0);
        });
    });
    // Social networks
    $("#checkbox1").change(function () {
        var checked = $("#checkbox1").prop("checked");
        if (checked) {
            $("#Facebook_input").show();
        } else {
            $("#Facebook_input").hide();
        }
    });
    $("#checkbox2").change(function () {
        var checked = $("#checkbox2").prop("checked");
        if (checked) {
            $("#Vk_input").show();
        } else {
            $("#Vk_input").hide();
        }
    });
    $("#checkbox3").change(function () {
        var checked = $("#checkbox3").prop("checked");
        if (checked) {
            $("#Twitter_input").show();
        } else {
            $("#Twitter_input").hide();
        }
    });
    $("#checkbox4").change(function () {
        var checked = $("#checkbox4").prop("checked");
        if (checked) {
            $("#ok_input").show();
        } else {
            $("#ok_input").hide();
        }
    });
});
