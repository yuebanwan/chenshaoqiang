
var desW=360;//设置设计稿宽
var winW=document.documentElement.clientWidth;  //设备的实际宽度
var scale=desW/100;
document.documentElement.style.fontSize=winW/scale+"px";

var bigPic = $(".scroll-img-td img");  // 图片img
var marquePic1=document.getElementById("marquePic1");
var marquePic2=document.getElementById("marquePic2");
var protionId = $("#protionId").val();
var bodyOfferHei=document.body.offsetHeight;

var isPlay = true;//是否滚动状态设置，默认滚动
//初次加载判断横竖屏
var isOrientation=false;
isOrientation=!!(window.orientation == 90 || window.orientation == -90);
// 实现图片循环滚动的方法
function Marquee(n) {
    if (marquePic1.offsetWidth - scrollImgBox.scrollLeft <= 0) {

        scrollImgBox.scrollLeft = 0;
    } else {

        scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + n;
    }


    /*if ((window.orientation == 90 || window.orientation == -90) && !isOrientation) {
     //安卓横屏的情况一(竖屏转横屏)

     if (marquePic1.offsetWidth - scrollImgBox.scrollLeft <= 0) {

     scrollImgBox.scrollLeft = 0;
     } else {

     scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + n;
     }
     }else if((window.orientation == 90 || window.orientation == -90) && isOrientation){
     //安卓横屏的情况二（横屏刷新）
     if (marquePic1.offsetWidth - scrollImgBox.scrollLeft <= 0) {

     scrollImgBox.scrollLeft = 0;
     } else {

     scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + n;
     }

     }else {
     if(isOrientation){
     //安卓竖屏的情况一（横屏刷新后转竖屏）
     if (marquePic1.offsetWidth*2 - scrollImgBox.scrollLeft <= 0) {

     scrollImgBox.scrollLeft = 0;
     } else {

     scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + n;
     }

     }else{
     //安卓竖屏的情况二（竖屏）
     if (marquePic1.offsetWidth - scrollImgBox.scrollLeft <= 0) {

     scrollImgBox.scrollLeft = 0;
     } else {

     scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + n;
     }
     }

     }*/


}

function getImgSize(){
    $("#main_img_work").each(function (i) {
        //这里做下说明，$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！
        $("<img/>").attr("src", $(bigPic).attr("src")).load(function () {
            /*
             如果要获取图片的真实的宽度和高度有三点必须注意
             1、需要创建一个image对象：如这里的$("<img/>")
             2、指定图片的src路径
             3、一定要在图片加载完成后执行如.load()函数里执行
             */
            var realWidth = this.width;
            var realHeight = this.height;
            var prop=(realWidth/realHeight);//通过真实图片获得宽高比
            var navHeight=screen.height-bodyOfferHei;//浏览器地址栏高度
            var setImgHeight=parseFloat(screen.height)-navHeight;//图片高度

            $(".scroll-img-td").css("width",setImgHeight*prop);
            $("#marquePic2").css("left",setImgHeight*prop);
            marquePic2.innerHTML = marquePic1.innerHTML;

            var imgBox=document.getElementById("imgBox");
            var scrollImg=document.getElementById("scroll-img");
            var scrollImgBox=document.getElementById("scrollImgBox");

            var userNameSpan = $("div.user_name span"); // 用户姓名
            var userHeadImg = $("div.user_head img"); // 用户头像
            var howLongSpan = $("div.date_play_num span.howLong");  // 日期

            var startX = 0;
            var startY = 0;

            var speed = 50;
            var timer;        // 用于定时器

            judgeTheOrientation();

            $("#switch_div").on("click",function(){
                //播放按钮点击事件
                pic_scroll();
            });
            //停止滚动
            function stopRolling() {
                isPlay = true;
                //stopMusic();
                clearInterval(timer);
            }
            //继续滚动
            function startRolling() {
                isPlay = false;
                //startMusic();
                timer = setInterval("Marquee(5)", speed);
            }

            //开关按钮点击处理函数
            function pic_scroll() {
                if (isPlay) {
                    // 继续滚动
                    startRolling();
                } else {
                    stopRolling();
                }
            }

            // 滑动开始事件处理
            var startHandler = function (event) {
                // 停止自动播放
                stopRolling();
                startX = event.touches[0].pageX;
                startY = event.touches[0].pageY;

            };

            // 滑动过程中事件处理
            var moveHandler = function (event) {
                event.preventDefault();

                var touch = event.touches[0];
                var moveX = touch.pageX;
                var moveY = touch.pageY;
                var dY = moveY - startY;
                var len = moveX - startX;

                len = len * -1;   // 为了矫正方向
                len = len / 10;   // 为了减速

                if (marquePic1.offsetWidth - scrollImgBox.scrollLeft <= 0) {

                    scrollImgBox.scrollLeft = 0;

                } else {

                    scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + len;

                    // 如果最近一次的向右滑动，图片滑动到了左边的边缘，重置一下
                    if (scrollImgBox.scrollLeft <= 0) {
                        scrollImgBox.scrollLeft = marquePic1.offsetWidth - 2; // 目的是为了能继续向右滑动
                    }

                    // 如果最近一次的向左滑动，图片滑动到了右边的边缘，重置一下
                    if (scrollImgBox.scrollLeft >= marquePic1.offsetWidth) {
                        scrollImgBox.scrollLeft = 0; // 目的是为了能继续向左滑动
                    }
                }

                /*if ((window.orientation == 90 || window.orientation == -90) && !isOrientation) {
                    //安卓横屏的情况一
                    if (marquePic1.offsetWidth/2 - scrollImgBox.scrollLeft <= 0) {

                        scrollImgBox.scrollLeft = 0;

                    } else {

                        scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + len;

                        // 如果最近一次的向右滑动，图片滑动到了左边的边缘，重置一下
                        if (scrollImgBox.scrollLeft <= 0) {
                            scrollImgBox.scrollLeft = marquePic1.offsetWidth/2 - 2; // 目的是为了能继续向右滑动
                        }

                        // 如果最近一次的向左滑动，图片滑动到了右边的边缘，重置一下
                        if (scrollImgBox.scrollLeft >= marquePic1.offsetWidth/2) {
                            scrollImgBox.scrollLeft = 0; // 目的是为了能继续向左滑动
                        }
                    }

                }else if((window.orientation == 90 || window.orientation == -90) && isOrientation){
                    if (marquePic1.offsetWidth - scrollImgBox.scrollLeft <= 0) {

                        scrollImgBox.scrollLeft = 0;

                    } else {

                        scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + len;

                        // 如果最近一次的向右滑动，图片滑动到了左边的边缘，重置一下
                        if (scrollImgBox.scrollLeft <= 0) {
                            scrollImgBox.scrollLeft = marquePic1.offsetWidth - 2; // 目的是为了能继续向右滑动
                        }

                        // 如果最近一次的向左滑动，图片滑动到了右边的边缘，重置一下
                        if (scrollImgBox.scrollLeft >= marquePic1.offsetWidth) {
                            scrollImgBox.scrollLeft = 0; // 目的是为了能继续向左滑动
                        }
                    }

                }else{
                    if(isOrientation){
                        if (marquePic1.offsetWidth*2 - scrollImgBox.scrollLeft <= 0) {

                            scrollImgBox.scrollLeft = 0;

                        } else {

                            scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + len;

                            // 如果最近一次的向右滑动，图片滑动到了左边的边缘，重置一下
                            if (scrollImgBox.scrollLeft <= 0) {
                                scrollImgBox.scrollLeft = marquePic1.offsetWidth*2 - 2; // 目的是为了能继续向右滑动
                            }

                            // 如果最近一次的向左滑动，图片滑动到了右边的边缘，重置一下
                            if (scrollImgBox.scrollLeft >= marquePic1.offsetWidth*2) {
                                scrollImgBox.scrollLeft = 0; // 目的是为了能继续向左滑动
                            }
                        }
                    }else{
                        if (marquePic1.offsetWidth - scrollImgBox.scrollLeft <= 0) {

                            scrollImgBox.scrollLeft = 0;

                        } else {

                            scrollImgBox.scrollLeft = scrollImgBox.scrollLeft + len;

                            // 如果最近一次的向右滑动，图片滑动到了左边的边缘，重置一下
                            if (scrollImgBox.scrollLeft <= 0) {
                                scrollImgBox.scrollLeft = marquePic1.offsetWidth - 2; // 目的是为了能继续向右滑动
                            }

                            // 如果最近一次的向左滑动，图片滑动到了右边的边缘，重置一下
                            if (scrollImgBox.scrollLeft >= marquePic1.offsetWidth) {
                                scrollImgBox.scrollLeft = 0; // 目的是为了能继续向左滑动
                            }
                        }
                    }

                }*/

            };

            // 滑动结束事件处理
            var endHandler = function (event) {};

            scrollImg.addEventListener("touchstart", startHandler, false);
            scrollImg.addEventListener("touchmove", moveHandler, false);
            scrollImg.addEventListener("touchend", endHandler, false);

            // 判断手机屏幕方向
            function judgeTheOrientation() {
                switch (window.orientation) {
                    case 0://ipad、iphone横屏；Andriod竖屏

                        $("body").attr("class", "portrait");
                        orientation = 'portrait';
                        break;
                    case 180://ipad、iphone横屏；Andriod竖屏

                        $("body").attr("class", "portrait");
                        orientation = 'portrait';
                        break;
                    case -90://ipad、iphone竖屏；Andriod横屏

                        $("#bottom_div").css("display", "none");
                        $("body").attr("class", "landscape");
                        orientation = 'landscape';
                        break;
                    case 90://ipad、iphone竖屏；Andriod横屏

                        $("body").attr("class", "landscape");
                        orientation = 'landscape';
                        break;
                    default:
                        break;
                }
                return false;
            }

            $(window).bind("orientationchange", function (event) {

                var otherTimer = setInterval(function(){
                    if(bodyOfferHei!=document.body.offsetHeight){
                        if(window.orientation == 90 || window.orientation == -90){
                            if(parseInt(document.body.offsetHeight)<parseInt(bodyOfferHei)){

                                bodyOfferHei=document.body.offsetHeight;
                                clearInterval(otherTimer);

                                getImgSize();
                                judgeTheOrientation();
                            }
                        }else{

                            bodyOfferHei=document.body.offsetHeight;
                            clearInterval(otherTimer);

                            getImgSize();
                            judgeTheOrientation();
                        }
                    }
                }, 50);
            });
            // 请求接口刷新数据
            $.ajax({
                url: "http://www.paipai360.cn:80/paipai360//production/sharegetProductionDetails.action?id=" + protionId,
                method: 'post',
                data: {"id": protionId, "type": 1},
                dataType: "jsonp", // 数据类型为jsonp
                jsonp: "jsonpCallback", // 服务端用于接收callback调用的function名的参数
                success: function (data) {
                    if (data.code == 'success') {
                        var username = data.data.username;
                        var userHeadUrl = data.data.headimgurl;
                        var priseNum = data.data.praiseNum;
                        var commentNum = data.data.commentNum;
                        var howLong = data.data.howLong;

                        var content = data.data.title;
                        var songName = data.data.songName;

                        /*userNameSpan.text(username);
                         userHeadImg.attr("src", userHeadUrl);
                         howLongSpan.text(howLong);
                         playNumSpan.text(data.data.playNum);
                         commentNumSpan.text(commentNum);
                         priseNumSpan.text(priseNum);

                         bigPic.attr("src", data.data.url);
                         if (content !== null && content.length > 14) {
                         contentLineStr = content.substring(0, 14);
                         contentAllStr = content;
                         } else if (content !== null) {
                         contentLineStr = content;
                         contentAllStr = content;
                         }
                         workContent.text(contentLineStr);*/
                    }
                }
            });

        });
    });
}
getImgSize();




