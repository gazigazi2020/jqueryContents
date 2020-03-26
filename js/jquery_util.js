drag_drop('.d', function (e) {
    $('.d').css('z-index', 0);
    $(e.data.target).css('z-index', 1);
    $(e.data.target).offset({
        top: e.pageY - 50,
        left: e.pageX - 50
    });
});


function drag_drop(selecter, move, down, up) {
    $(document).on('mousedown.drag_drop', selecter, function (e) {
        e.preventDefault();
        try {
            down(e);
        } catch (error) {
            //console.log(error);
        }
        $(document).on('mousemove.drag_drop', {
            target: e.target
        }, function (e) {
            try {
                move(e);
            } catch (error) {
                console.log(error);
            }
        });
        $(document).on('mouseup.drag_drop', {
            target: e.target
        }, function (e) {
            try {
                up(e);
            } catch (error) {
                //console.log(error);
            }
            $(document).off('mousemove.drag_drop');
            $(document).off('mouseup.drag_drop');
        });
    });
}