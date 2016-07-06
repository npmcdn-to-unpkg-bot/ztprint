/**
 * Created by z07 on 2016/7/4.
 */
var NWWIN = nw.Window.get(),
    PRINTERS;

(function ($) {
    $(document).ready(function () {
        NWWIN.getPrinters(function (printers) {
            PRINTERS = printers;
            for (var i = 0; i < PRINTERS.length; i++) {
                $('#printer').append('<option>' + PRINTERS[i].deviceName + '</option>');
            }
        });

        $('.content').niceScroll({
            autohidedom: false,
            cursorwidth: 9
        });

        $('#print').click(function () {
            //NWWIN.eval($('#content')[0], "preview");
            //window.print();
            doPrint('#content');
        });
        
        $('#print-settting').click(function () {
            $('#setting').modal('show');
        });
    });

    /**
     * 打印
     */
    function doPrint(witch) {
        nw.Window.get().print({
            printer: $('[name="printer"]').val(),
            headerFooterEnabled: false,
            shouldPrintBackgrounds: true,
            // true横向， false纵向
            landscape: true,
            mediaSize: {
                custom_display_name: 'A4'
            },
            marginsCustom: {
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }
        });
    }
})(jQuery);



function setLocal(settings, key) {

}