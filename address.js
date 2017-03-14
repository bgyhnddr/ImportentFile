$.ajax({
    url: "http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201703/t20170310_1471429.html",
    success(o) {
        var values = $(o).find(".xilan_con").text().match(/\b\d{6}\b/g)
        var labels = $(o).find(".xilan_con").text().match(/[\u4e00-\u9fa5]+/g)
        var tree = {}
        var list = {}
        values.forEach((o, index) => {
            list[o] = labels[index]
        })
        for (var value in list) {
            if (/\d{2}0000/.test(value)) {
                tree[value] = {
                    label: list[value]
                }
            } else if (/\d{4}00/.test(value)) {
                if (!tree[value.match(/\d{2}/) + "0000"].children) {
                    tree[value.match(/\d{2}/) + "0000"].children = {}
                }
                tree[value.match(/\d{2}/) + "0000"].children[value] = {
                    label: list[value]
                }
            } else {
                if (!tree[value.match(/\d{2}/) + "0000"].children[value.match(/\d{4}/) + "00"].children) {
                    tree[value.match(/\d{2}/) + "0000"].children[value.match(/\d{4}/) + "00"].children = {}
                }
                tree[value.match(/\d{2}/) + "0000"].children[value.match(/\d{4}/) + "00"].children[value] = {
                    label: list[value]
                }
            }
        }
        console.log(tree)
        var elmList = []

        for (var item in tree) {
            var node = {
                value: item,
                label: tree[item].label
            }
            if (tree[item].children) {
                node.children = []
                for (var item2 in tree[item].children) {
                    var node2 = {
                        value: item2,
                        label: list[item2]
                    }
                    if (tree[item].children[item2].children) {
                        node2.children = []
                        for (var item3 in tree[item].children[item2].children) {
                            node2.children.push({
                                value: item3,
                                label: list[item3]
                            })
                        }
                    }
                    node.children.push(node2)
                }
            }
            elmList.push(node)
        }
        console.log(elmList)
    }
})
