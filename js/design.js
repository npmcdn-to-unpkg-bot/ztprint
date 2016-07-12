/**
 * Created by Gavin.Fu on 16/7/10.
 */

//var dts = require('./js/shutcut');

(function ($) {
    $(document).ready(function () {

        // 美化滚动条
        $('.designer-container').niceScroll({
            autohidedom: false,
            cursorwidth: 9,
            railvalign: "top",
            horizrailenabled: true
        });

        // 拖拽插件
        registShutcut('.shotcut');

        // 注册设置页
        registerSetting();
    });

    /**
     * 注册插件的设置弹出页面
     */
    function registerSetting() {
        $('.page').on('click', '.designer', function () {
            $('.designer').popover('hide');
            $(this).popover('show');
        });
    }

    /**
     * 注册插件设置页面
     *
     * @param dt
     * @param designer
     * @param options
     */
    function popoverBind(dt, designer, options) {
        console.info('bind');
        designer.popover({
            animation: false,
            delay: {
                show: 200,
                hide: 0
            },
            container: dt[0],
            template: '<div class="popover setting" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            content: '<div>' +
            '<label>内容:</label><input type="text" name="text" style="width: 150px;">' +
            '<label>Name属性</label><input type="text" name="name" style="width: 150px;">' +
            '<label>CSS</label><textarea type="text" name="style" style="width: 150px;"></textarea>' +
            '<label>Json数据</label><textarea type="text" name="data" style="width: 150px;"></textarea>' +
            '</div> <div class=""><button class="j-update">应用</button><button class="j-delete">删除</button></div>',
            html: true,
            trigger: 'focus'
        })
            .on('inserted.bs.popover', function () {
                var params = getParams(dt, '.designer');

                dt.find('.popover [name]').each(function () {
                    var value = params[$(this).attr('name')];
                    $(this).val(value);
                });

                dt.find('.j-update').click(function () {
                    var updated = getParams(dt, '.setting');
                    console.info(updated);
                    designer
                        .find('[name= "text"]')
                        .text(updated['text'])
                        .attr('dt-name', updated['name'])
                        .attr('style', updated['style']);
                });
            });
    }

    /**
     *
     */
    function getParams(dt, which) {
        var params = {};
        dt.find(which).find('[name]').each(function () {
            params[$(this).attr('name')] = $(this).val() ? $(this).val() : $(this).text();
        });

        return params;
    }

    /**
     * 注册插件
     *
     * @param selected
     */
    function registShutcut(selected) {
        $(selected).draggabilly({
        });

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

            popoverBind(dt, dt.find('.designer'));

            registerDesignPlugin(dt);
        });
    }

    /**
     * 初始化编辑插件
     */
    function registerDesignPlugin(p) {
        p.draggabilly({
            containment: '.page',
            handle: '.designer'
        });
    }

    /**
     *
     * @param _self
     * @returns {offsetTop|Number|number}
     */
    function offsetTop(_self) {
        var ot = 0;
        while (_self.parentNode) {
            _self = _self.parentNode;
            ot += _self.offsetTop ? _self.offsetTop : 0;
        }
        return ot;
    }

    function offsetLeft(_self) {
        var ot = 0;
        while (_self.parentNode) {
            _self = _self.parentNode;
            ot += _self.offsetLeft ? _self.offsetLeft : 0;
        }
        return ot;
    }
})(jQuery);