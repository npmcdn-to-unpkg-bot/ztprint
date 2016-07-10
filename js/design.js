/**
 * Created by Gavin.Fu on 16/7/10.
 */

//var dts = require('./js/shutcut');

(function ($) {
    $(document).ready(function () {

        // 美化滚动条
        $('.content').niceScroll({
            autohidedom: false,
            cursorwidth: 9,
            railvalign: "top",
            horizrailenabled: true
        });

        // 拖拽插件
        registShutcut('.shotcut');
    });

    /**
     * 注册插件
     *
     * @param selected
     */
    function registShutcut(selected) {
        $(selected).draggabilly({});

        $(selected).on('dragStart', function (e) {
            var $this = $(this).clone(false);

            $(this).css({
                'position': 'fixed',
                'z-index': 9999,
                'top': e.originalEvent.pageY - 15,
                'left': e.originalEvent.pageX - 15
            });

            $(this).after($this);

            registShutcut($this);
        });

        $(selected).on('dragEnd', function (e) {
            var $this = $(this);
            var dtName = $this.data('dt');
            var page = $('.page')[0];
            var dt = dts[dtName];

            console.info(getSize(page));
            console.info(e.originalEvent.clientX);
            console.info(offsetLeft(page));
            dt = dt.render(function (html) {
                return $(html).css({
                    'top': e.originalEvent.clientY - offsetTop(page) + 80,
                    'left': e.originalEvent.clientX - offsetLeft(page)
                }).appendTo('.page');
            })
            registerDesignPlugin(dt);

            $(this).remove();
        });
    }

    /**
     * 初始化编辑插件
     */
    function registerDesignPlugin(p) {
        p.draggabilly({
            containment: '.page'
        });
    }

    /**
     *
     * @param _self
     * @returns {offsetTop|Number|number}
     */
    function offsetTop(_self) {
        var ot = _self.offsetTop;
         while(_self.parentNode) {
            _self = _self.parentNode;
            ot += _self.offsetTop ? _self.offsetTop : 0;
        }

        return ot;
    }

    function offsetLeft(_self) {
        var ot = _self.offsetLeft;
        while(_self.parentNode) {
            _self = _self.parentNode;
            ot += _self.offsetLeft ? _self.offsetLeft : 0;
        }

        return ot;
    }
})(jQuery);