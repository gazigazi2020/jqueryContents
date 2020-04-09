var array = equallySpaced({
    x_num: 5,
    y_num: 5,
    x_space: 171.5,
    y_space: 171.5,
});

const base_x = 51;
const base_y = 51;
const imgUrlG = "./img/1x/green.png"
const imgUrlY = "./img/1x/yellow.png"
const imgUrlR = "./img/1x/red.png"
const imgUrlBlue = "./img/1x/blue.png"
const imgUrlBlack = "./img/1x/black.png"
const appendElmG = '<img src="./img/1x/green.png" class="d">';
const appendElmY = '<img src="./img/1x/yellow.png" class="d">';
const appendElmR = '<img src="./img/1x/red.png" class="d">';
const appendElmBlue = '<img src="./img/1x/blue.png" class="d">';
const appendElmBlack = '<img src="./img/1x/black.png" class="d">';

(() => {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            var random = Math.floor(Math.random() * 5);
            switch (random) {
                case 0:
                    var elm = $(appendElmG).appendTo($('.container'));
                    break;
                case 1:
                    var elm = $(appendElmY).appendTo($('.container'));
                    break;
                case 2:
                    var elm = $(appendElmR).appendTo($('.container'));
                    break;
                case 3:
                    var elm = $(appendElmBlue).appendTo($('.container'));
                    break;
                case 4:
                    var elm = $(appendElmBlack).appendTo($('.container'));
                    break;
            }
            elm.offset({
                left: array[i][j].left + base_x,
                top: array[i][j].top + base_y
            });
            elm.attr({
                x: i,
                y: j
            });
            array[i][j].elm = elm;
        }
    }

})();

var arrayAlign = () => {
    for (var i = 0; i < $('.d').length; i++) {
        var elm = $('.d').eq(i);
        array[elm.attr('x')][elm.attr('y')].elm = elm;
    }
}


(() => {
    var drag_dropSet = () => {
        drag_drop({
            selector: '.d',
            move: function (e) {
                $(e.data.target).offset({
                    top: e.pageY - $(e.data.target).outerHeight() / 2,
                    left: e.pageX - $(e.data.target).outerWidth() / 2
                });
                if (exchange($(e.data.target), positionCheck($(e.data.target).offset()))) {
                    positionReset($(e.data.target));
                }
            },
            up: function (e) {
                drag_drop_off();
                positionReset();
                remove();
                if (!removeEnd()) {
                    clearInterval(intervalId);
                    drag_dropSet();
                    return;
                }
                positionReset('body', true);
                var check = true;
                var intervalId = setInterval(() => {
                    remove();
                    if (!removeEnd()) {
                        clearInterval(intervalId);
                        drag_dropSet();
                    }
                    positionReset('body', true);
                }, 700);
            }
        });
    }
    drag_dropSet();

    var positionReset = (target = 'body', anime = false) => {
        for (var i = 0; i < $('.d').length; i++) {
            if ($(target).offset().top == $('.d').eq(i).offset().top && $(target).offset().left == $('.d').eq(i).offset().left) {
                continue;
            }
            var loc = {
                x: $('.d').eq(i).attr('x'),
                y: $('.d').eq(i).attr('y')
            }
            if (anime) {
                if (array[loc.x][loc.y].left + base_x != $('.d').eq(i).offset().left || array[loc.x][loc.y].top + base_y != $('.d').eq(i).offset().top) {
                    $('.d').eq(i).animate({
                        left: array[loc.x][loc.y].left + base_x,
                        top: array[loc.x][loc.y].top + base_y
                    }, 200);
                }
            } else {
                $('.d').eq(i).offset({
                    left: array[loc.x][loc.y].left + base_x,
                    top: array[loc.x][loc.y].top + base_y
                })
            }
        }
    }

    var positionCheck = (positionData) => {
        var kaeri = {
            x: 0,
            y: 0
        }
        if (positionData.left <= array[0][0].left + 110) {
            kaeri.x = 0;
        } else if (positionData.left <= array[1][0].left + 110) {
            kaeri.x = 1;
        } else if (positionData.left <= array[2][0].left + 110) {
            kaeri.x = 2;
        } else if (positionData.left <= array[3][0].left + 110) {
            kaeri.x = 3;
        } else {
            kaeri.x = 4;
        }

        if (positionData.top <= array[0][0].top + 110) {
            kaeri.y = 0;
        } else if (positionData.top <= array[0][1].top + 110) {
            kaeri.y = 1;
        } else if (positionData.top <= array[0][2].top + 110) {
            kaeri.y = 2;
        } else if (positionData.top <= array[0][3].top + 110) {
            kaeri.y = 3;
        } else {
            kaeri.y = 4;
        }
        return kaeri;
    }

    var exchange = (elm, positionData) => {
        if (elm.attr('x') != positionData.x || elm.attr('y') != positionData.y) {
            var exchangeElm = elmCheck(positionData);
            exchangeElm.attr({
                x: elm.attr('x'),
                y: elm.attr('y')
            });
            elm.attr({
                x: positionData.x,
                y: positionData.y
            })
            return true;
        }
    }

    var elmCheck = (data) => {
        var kaeri = null;
        for (var i = 0; i < $('.d').length; i++) {
            if ($('.d').eq(i).attr('x') == data.x && $('.d').eq(i).attr('y') == data.y) {
                kaeri = $('.d').eq(i);
                break;
            }
        }
        return kaeri;
    }

    var remove = () => {
        arrayAlign();
        var color = null;
        var count = 1;
        var removelist = [];
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                if (color == colorCheck(array[i][j].elm)) {
                    count++;
                } else {
                    color = colorCheck(array[i][j].elm);
                    count = 1;
                }
                if (count >= 3) {
                    removelist.push({
                        x: i,
                        y: j
                    });
                    removelist.push({
                        x: i,
                        y: j - 1
                    });
                    removelist.push({
                        x: i,
                        y: j - 2
                    });
                }
                if (j == array[i].length - 1) {
                    color = null;
                    count = 1;
                }
            }
        }
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                if (color == colorCheck(array[j][i].elm)) {
                    count++;
                } else {
                    color = colorCheck(array[j][i].elm);
                    count = 1;
                }
                if (count >= 3) {
                    removelist.push({
                        x: j,
                        y: i
                    });
                    removelist.push({
                        x: j - 1,
                        y: i
                    });
                    removelist.push({
                        x: j - 2,
                        y: i
                    });
                }
                if (j == array[i].length - 1) {
                    color = null;
                    count = 1;
                }
            }
        }
        removelist = removelist.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
        console.log(removelist);
        for (var i of removelist) {
            if (array[i.x][i.y].elm == null) {
                continue;
            }
            array[i.x][i.y].elm.remove();
            array[i.x][i.y].elm = null;
        }
    }

    var colorCheck = (elm) => {
        switch (elm.attr('src')) {
            case imgUrlG:
                return 'green'
            case imgUrlY:
                return 'yellow'
            case imgUrlR:
                return 'red'
            case imgUrlBlue:
                return 'blue'
            case imgUrlBlack:
                return 'black'
        }
    }

    function removeEnd() {
        var kaeri = false;

        function func(json) {
            if (array[json.i][json.j].elm == null) {
                kaeri = true;
                this[json.i]++
            }
            if (array[json.i][json.j].elm == null && json.j != 0) {
                for (var k = json.j; k >= 0; k--) {
                    if (array[json.i][k].elm != null) {
                        array[json.i][k].elm.attr('y', Number(array[json.i][k].elm.attr('y')) + 1);
                    }
                }
            }
        }
        var arrayFor = new Array_for([0, 0, 0, 0, 0]);
        var null_array = arrayFor.run(func);
        new Array_for().run((json) => {
            if (json.j < null_array[json.i]) {
                var random = Math.floor(Math.random() * 5);
                switch (random) {
                    case 0:
                        var elm = $(appendElmG).appendTo($('.container'));
                        break;
                    case 1:
                        var elm = $(appendElmY).appendTo($('.container'));
                        break;
                    case 2:
                        var elm = $(appendElmR).appendTo($('.container'));
                        break;
                    case 3:
                        var elm = $(appendElmBlue).appendTo($('.container'));
                        break;
                    case 4:
                        var elm = $(appendElmBlack).appendTo($('.container'));
                        break;
                }
                elm.offset({
                    left: array[json.i][json.j].left + base_x,
                    top: array[json.i][0].top + base_y - 129
                });
                elm.attr({
                    x: json.i,
                    y: json.j
                });
                array[json.i][json.j].elm = elm;
            }
        });
        return kaeri;
    }

    function Array_for(kaeriset = null) {
        this.kaeri = kaeriset;
        this.run = function (runFunc) {
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < array[i].length; j++) {
                    this.runFunc = runFunc.bind(this.kaeri, {
                        i: i,
                        j: j
                    })();
                    //this.runFunc();
                }
            }
            return this.kaeri;
        }
    }
})();


$('.appendBtn').on('click', function () {
    loop: for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if (array[i][j].elm == undefined) {
                var elm = $(appendElm).appendTo($('.container'));
                elm.offset({
                    left: array[i][j].left + base_x,
                    top: array[i][j].top + base_y
                });
                elm.attr({
                    x: i,
                    y: j
                });
                array[i][j].elm = elm;
                break loop;
            }
        }
    }
});