/*FVアニメーション */
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
/*ここまでFVアニメーション*/
/*スライダー */
$(".product .list").slick({
  autoplay: true,
  slidesToShow: 4,
  arrows: false,
  centerMode: true,
  lazyload: "ondemand",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

/*ここまでスライダー */

/*上へ戻るボタン */

$(function () {
  var pagetop = $("#page_top");
  // ボタン非表示
  pagetop.hide();

  // 100px スクロールしたらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $("body, html").animate({ scrollTop: 0 }, 500);
    return false;
  });
});
/*ここまで上へもどるボタン */

/*ローディングアニメーション */
//SVGアニメーションの描画
var stroke;
stroke = new Vivus(
  "mask",
  {
    //アニメーションをするIDの指定
    start: "manual", //自動再生をせずスタートをマニュアルに
    type: "scenario-sync", // アニメーションのタイプを設定
    duration: 50, //アニメーションの時間設定。数字が小さくなるほど速い
    forceRender: false, //パスが更新された場合に再レンダリングさせない
    animTimingFunction: Vivus.EASE, //動きの加速減速設定
  },
  function () {
    $("#mask").attr("class", "done"); //描画が終わったらdoneというクラスを追加
  }
);

$(window).on("load", function () {
  $("#splash").delay(100).fadeOut("slow"); //ローディング画面を2.5秒（2500ms）待機してからフェイドアウト1900
  $("#splash_logo").delay(1900).fadeOut("slow"); //ロゴを2.5秒（2500ms）待機してからフェイドアウト
  stroke.play(); //SVGアニメーションの実行
});
/*ここまでローディングアニメーション */
// smoothTriggerにsmoothTextAppearというクラス名を付ける定義
function SmoothTextAnime() {
  $(".smoothTextTrigger").each(function () {
    //smoothTextTriggerというクラス名が
    var elemPos = $(this).offset().top - 50; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("smoothTextAppear"); // 画面内に入ったらsmoothTextAppearというクラス名を追記
    } else {
      $(this).removeClass("smoothTextAppear"); // 画面外に出たらsmoothTextAppearというクラス名を外す
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  SmoothTextAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  SmoothTextAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述
