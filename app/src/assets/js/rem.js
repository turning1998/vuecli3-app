;//防止js合并时,前面得文件没有写;
//通过监听window的resize事件，去设置html的font-size
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;//html
    var tid;

    function refreshRem() {
        // 获取屏幕宽度
        var width = docEl.getBoundingClientRect().width;
        var rem = width / 6.4; // 将屏幕宽度分成6.4份， 1份为1rem
        //320/6.4=50px=1rem iPone 5
        //375/7.5=50px=1rem
      //html.
        docEl.style.fontSize = rem + 'px';
        console.log(0.14*rem);
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 10);
    }, false);
    win.addEventListener('pageshow', function(e) {//
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 10);
        }
    }, false);

    refreshRem();

})(window);