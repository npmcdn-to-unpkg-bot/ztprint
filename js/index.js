/**
 * Created by z07 on 2016/7/6.
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

        $('.j-enter').click(function () {
            NWWIN.minimize();

            NWWIN.print({
                //printer: $('[name="printer"]').val(),
                headerFooterEnabled: false,
                shouldPrintBackgrounds: true,
                // 横向， 纵向
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
        });
    });
})(jQuery);

var gui = require('nw.gui');

// Reference to window and tray
var win = gui.Window.get();
var tray;

// Get the minimize event
win.on('minimize', function () {
    // Hide window
    this.hide();

    // Show tray
    tray = new gui.Tray({icon: 'icon.png'});

    // Show window and remove tray when clicked
    tray.on('click', function () {
        win.show();
        this.remove();
        tray = null;
    });
});