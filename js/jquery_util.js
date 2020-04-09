function trashBox(elm, trash_box) {
    if (overlapJudge(elm, trash_box)) {
        $(elm).remove();
        return true;
    }
    return false;
}

function overlapJudge(elm1, elm2) {
    //要素の重なりを判定します。
    var elm1Loc = {
        left: $(elm1).offset().left,
        right: $(elm1).offset().left + $('.d').outerWidth(),
        top: $(elm1).offset().top,
        bottom: $(elm1).offset().top + $('.d').outerHeight(),
    }
    var elm2Loc = {
        left: $(elm2).offset().left,
        right: $(elm2).offset().left + $('.d').outerWidth(),
        top: $(elm2).offset().top,
        bottom: $(elm2).offset().top + $('.d').outerHeight(),
    }

    if (elm1Loc.right >= elm2Loc.left && elm1Loc.left <= elm2Loc.right && elm1Loc.bottom >= elm2Loc.top && elm1Loc.top <= elm2Loc.bottom) {
        return true;
    }
    return false;
}

function drag_drop(json) {
    //デフォルト
    $(document).on('mousedown.drag_drop', json.selector, function (e) {
        e.preventDefault();
        try {
            json.down(e);
        } catch (error) {
            //console.log(error);
        }
        $(document).on('mousemove.drag_drop', {
            target: e.target
        }, function (e) {
            try {
                json.move(e);
            } catch (error) {
                $(e.data.target).offset({
                    top: e.pageY - $(e.data.target).outerHeight() / 2,
                    left: e.pageX - $(e.data.target).outerWidth() / 2
                });
            }
        });
        $(document).on('mouseup.drag_drop', {
            target: e.target
        }, function (e) {
            try {
                json.up(e);
            } catch (error) {
                //console.log(error);
            }
            $(document).off('mousemove.drag_drop');
            $(document).off('mouseup.drag_drop');
        });
    });
}

function drag_drop_off() {
    $(document).off('mousedown.drag_drop');
}

function equallySpaced(json) {
    if (json.x_num == undefined) {
        json.x_num = 1;
    }
    if (json.y_num == undefined) {
        json.y_num = 1;
    }
    if (json.x_space == undefined) {
        json.x_space = 0;
    }
    if (json.y_space == undefined) {
        json.y_space = 0;
    }

    var array = [json.x_num];
    for (var i = 0; i < json.x_num; i++) {
        array[i] = [json.y_num]
    }

    for (var i = 0; i < json.x_num; i++) {
        for (var j = 0; j < json.y_num; j++) {
            array[i][j] = {
                left: (i * json.x_space),
                top: (j * json.y_space)
            }
        }
    }

    return array;
}