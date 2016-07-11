/**
 * Created by Gavin.Fu on 16/7/10.
 */

var dts = {
    text: {
        render: function ($render) {
            var html = '<div class="dt text">' +
                    '<span class="dt-text">文本框</span>' +
                    '<div class="setting">' +
                        
                    '</div> ' +
                '</div>';

            return $render(html);
        }
    },
    richText: {
        render: function ($render) {
            var html = '' +
                '<div class="dt richText">' +
                    '<span class="dt-text">富文本框: ' +
                ' 在这里可以输出一段文本</span>' +
                '</div>';

            return $render(html);
        }
    },
    list: {
        render: function ($render) {
            var html = '' +
                '<div class="dt list">' +
                    '<ul class="dt-title">' +
                        '<dt>列表框</dt>' +
                        '<li>项目一</li>' +
                        '<li>项目二</li>' +
                        '<li>项目三</li>' +
                    '</ul>' +
                '</div>';

            return $render(html);
        }
    }
};

//module.exports = dts;