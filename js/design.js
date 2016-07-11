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
                'top': e.originalEvent.clientY - 20,
                'left': e.originalEvent.clientX - 20
            });

            $(this).after($this);

            registShutcut($this);
        });

        $(selected).on('dragEnd', function (e) {
            var $this = $(this),
                dtName = $this.data('dt'),
                page = $('.page')[0],
                dt = dts[dtName],
                offsetY = offsetTop(page),
                offsetX = offsetLeft(page),
                topY = e.originalEvent.clientY - offsetY + 80,
                leftX = e.originalEvent.clientX - offsetX + 15;

            $(this).remove();

            if (offsetY > e.originalEvent.clientY || offsetX > e.originalEvent.clientX) {
                return;
            }

            dt = dt.render(function (html) {
                return $(html).css({
                    top: topY,
                    left: leftX
                }).appendTo('.page');
            });
            registerDesignPlugin(dt);
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
        var ot = 0;
         while(_self.parentNode) {
            _self = _self.parentNode;
            ot += _self.offsetTop ? _self.offsetTop : 0;
        }
        return ot;
    }

    function offsetLeft(_self) {
        var ot = 0;
        while(_self.parentNode) {
            _self = _self.parentNode;
            ot += _self.offsetLeft ? _self.offsetLeft : 0;
        }
        return ot;
    }
})(jQuery);