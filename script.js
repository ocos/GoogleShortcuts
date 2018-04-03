// note: key library was modified to enable capture in addEventListener

(function() {

    var shortcuts = {
        openInNewTab : '⌘+return, ctrl+return',
        open : 'return',
        up : 'k, up',
        down : 'j, down',
        focusInSearchInput : '/, backspace',
        previousPage : 'left',
        nextPage : 'right',
    };

    var googleHtmlIdentifiers = {
        searchInput : '#lst-ib',
        nextButton : '#pnnext',
        prevButton : '#pnprev'
    };

    var idx = 0;
    var select = function(focus) {
        $('h3.r a').css('background-color', 'inherit');
        var link = $('h3.r:nth('+idx+') a');
        link.css('background-color', '#fcc');
        if (focus) {link.focus(); }
        return link;
    };
    var gotoURLFromLink = function(button, ev){
        if(button != null) {
            var url = button.attr('href');
            if(typeof url != 'undefined') {
                location.href = url;
            }
        }
        ev.stopPropagation();
        ev.preventDefault();
    };
    key(shortcuts.openInNewTab, function(ev) {
        var link = select();
        window.open(link.attr('href'));
        ev.stopPropagation();
        ev.preventDefault();
    });
    key(shortcuts.open, function(ev) {
        var link = select();
        location.href = link.attr('href');
        ev.stopPropagation();
        ev.preventDefault();
    });

    var node = null;

    $(function() {
        document.getElementById('main').addEventListener("DOMSubtreeModified", function () {
            var newNode = $('h3.r:nth(0) a');
            if (!node || (node.attr('href') != newNode.attr('href'))) {
                idx = 0;
                select();
                node = newNode;
            }
        });
    });

    key(shortcuts.down, function(ev) {
        if (idx < $('h3.r a').length-1) {
            idx++;
            select(true);
        }
        ev.stopPropagation();
    });
    key(shortcuts.up, function(ev) {
        if (idx > 0) {
            idx--;
            select(true);
        }
        ev.stopPropagation();
    });
    key(shortcuts.focusInSearchInput, function (ev) {
        var searchInput = $(googleHtmlIdentifiers.searchInput);
        var textInitial = searchInput.val();

        searchInput
            .val('')
            .val(textInitial)
            .focus();

        ev.stopPropagation();
        ev.preventDefault();
    });
    key(shortcuts.nextPage, function (ev) {
        var button = $(googleHtmlIdentifiers.nextButton);
        gotoURLFromLink(button, ev);
    });

    key(shortcuts.previousPage, function (ev) {
        var button = $(googleHtmlIdentifiers.prevButton);
        gotoURLFromLink(button, ev);
    });
})();
