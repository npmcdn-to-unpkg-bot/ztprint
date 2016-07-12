/**
 * Created by Gavin.Fu on 16/7/10.
 */

var dts = {
    text: {
        render: function ($render) {
            var html = '<div class="dt text">' +
                    '<div class="designer">' +
                        '<span class="dt-text" name="text">文本框</span>' +
                    '</div>' +
                    '</div>' +
                '</div>';

            return $render(html);
        }
    },
    richText: {
        render: function ($render) {
            var html = '' +
                '<div class="dt richText">' +
                    '<div class="designer">' +
                        '<span class="dt-text">富文本框: ' +
                    ' 在这里可以输出一段文本</span>' +
                    '</div>'
                '</div>';

            return $render(html);
        }
    },
    list: {
        render: function ($render) {
            var html = '' +
                '<div class="dt list">' +
                    '<div class="designer">' +
                        '<ul class="dt-title">' +
                            '<dt>列表框</dt>' +
                            '<li>项目一</li>' +
                            '<li>项目二</li>' +
                            '<li>项目三</li>' +
                        '</ul>' +
                    '</div> ' +
                '</div>';

            return $render(html);
        }
    }
};

//module.exports = dts;