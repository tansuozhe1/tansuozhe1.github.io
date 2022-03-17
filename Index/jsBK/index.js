$(function() {
    var tips = ["抱枕一个", "谢谢参与", "抱枕一个", "谢谢参与", "抱枕一个", "谢谢参与"],
    $ring = $(".ring").eq(0),
    $prize = $(".prize").eq(0),
    $btn = $("#btn"),
    $change = $("#change"),
    $li = $(".scroll li"),
    $sNum = $(".start-num"),
    $eNum = $(".end-num"),
    $info = $(".info"),
    data = {
        count: 1
    },
    bool = false,
    timer;
    init();
    function init() {
        timer = setInterval(function() {
            $ring.toggleClass("light");
        },
        1000);
    }
    $btn.click(function() {
        if (bool) return;
        bool = true;
        if (data.count <= 0) {
            $change.html(0);
            bool = false;
            alert("没有次数了");
        } else {
            data.count--;
            data.count <= 0 && (data.count = 0);
            $change.html(data.count);
            $prize.removeClass("running");
            clickFn();
        }
    });
    function clickFn() {
		// 触发抽奖  某角度+angle == 360即是停止的位置
        var data = [1, 2, 3, 4, 5, 6];
        data = data[Math.floor(Math.random() * data.length)];
        $.ajax({
            type:"post",
            url:"http://t.shundecity.com/sdzy2019.php/home/index/subUserInfo",
            timeout:8000,
            success:function(res){
                console.log(res)
                var zjNum = 6;
                if(res.status == 1){
                    var arr1 = [1,3,5];
                    zjNum = arr1[Math.floor(Math.random() * arr1.length)];
                }else{
                    var arr2 = [2,4,6];
                    zjNum = arr2[Math.floor(Math.random() * arr2.length)];
                }
                switch (zjNum) {
                    case 1:
                        rotateFn(1, 0, tips[0]);
                        break;
                    case 2:
                        rotateFn(2, 300, tips[1]);
                        break;
                    case 3:
                        rotateFn(3, 240, tips[2]);
                        break;
                    case 4:
                        rotateFn(4, 180, tips[3]);
                        break;
                    case 5:
                        rotateFn(5, 120, tips[4]);
                        break;
                    case 6:
                        rotateFn(6, 60, tips[5]);
                        break;
                }
            },
            error:function(err){
                alert("网络错误");
                console.error(err);
            }
        })
        console.log(data);   // 1 3 5
        
    }
    function rotateFn(awards, angle, text) {
        bool = true;
        $prize.stopRotate();
        $prize.rotate({
            angle: 0,
            duration: 5000,
            animateTo: angle + 1800,
            callback: function() {
                bool = false;
                alert(text)
            }
        });
    }
    function show(sNum, eNum, text) {
        $sNum.eq(2).html(sNum);
        $eNum.eq(2).html(eNum);
        $info.eq(2).html(text);
        $li.css("top", "-" + 40 / 75 + "rem");
        setTimeout(function() {
            $li.css({
                "top": "0",
                "transition": "all 0s ease-in-out"
            });
            $sNum.eq(0).html($sNum.eq(1).html());
            $eNum.eq(0).html($eNum.eq(1).html());
            $info.eq(0).html($info.eq(1).html());
            $info.eq(1).html($info.eq(2).html());
            $sNum.eq(1).html($sNum.eq(2).html());
            $eNum.eq(1).html($eNum.eq(2).html());
        },
        500);
        $li.css("transition", "all 0.5s ease-in-out");
    }
    $("#close,.win,.btn").click(function() {
        $prize.addClass("running");
        init();
    });
});