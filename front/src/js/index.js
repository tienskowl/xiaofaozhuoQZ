// 面向对象
// ********uglifyjs不支持ES6语法，只支持方法**********
// 1.添加属性
// 通过this关键字，绑定属性，并指定值

// function Banner() {
//     // 这里写的代码相当于python中的__init__方法
//     console.log('init');
// }

// 原型链
// 可以通过这种方式给Banner绑定方法，实现面向对象
// Banner.prototype.greet = function () {
//     console.log('hello tse');
// };

// var banner = new Banner();

function Banner() {
    this.bannerWidth = 798;
    this.index = 0; // 记录轮播图位置
    this.bannerGroup = $('#banner-group');
    this.bannerUl = $('#banner-ul');
    this.leftArrow = $('#left-arrow');
    this.rightArrow = $('#right-arrow');
    this.liList = this.bannerUl.children('li');
    this.bannerCount = this.liList.length;
    this.pageControl = $('.page-control')
}

// 动态设置banner轮播图总宽度
Banner.prototype.initBanner = function () {
    var self = this;
    self.bannerUl.css({'width': 798 * self.bannerCount});
}

// 监听圆点
Banner.prototype.listenPageControl = function () {
    var self = this;
    // console.log(self.pageControl.children('li'));
    self.pageControl.children('li').each(function (index, obj) {
        // 将 obj 包装成 jquery 对象
        $(obj).click(function () {
            self.index = index;
            self.animate();
        })
        // console.log(index);
        // console.log(value);
        // console.log('=============')
    });
}

// 圆点控制
Banner.prototype.initPageControl = function () {
    var self = this;
    for (var i = 0; i < self.bannerCount; i++) {
        var circle = $('<li></li>');
        self.pageControl.append(circle);
        if (i === 0) {
            circle.addClass('active');
        }
    }
    self.pageControl.css({'width': 8 * 2 + self.bannerCount * 15 + 16 * (self.bannerCount - 1)})
}

// 箭头显示控制
Banner.prototype.toggleArrow = function (isShow) {
    var self = this;
    if (isShow) {
        self.leftArrow.show();
        self.rightArrow.show();
    } else {
        self.leftArrow.hide();
        self.rightArrow.hide();
    }
};

// 动画效果
Banner.prototype.animate = function () {
    var self = this;
    self.bannerUl.animate({'left': -798 * self.index}, 500); // 平滑滚动
    // 先找到当前在的 index 激活，然后将其他兄弟标签取消激活
    self.pageControl.children('li').eq(self.index).addClass('active').siblings().removeClass('active');
};

// 监听鼠标
Banner.prototype.listenBannerHover = function () {
    var self = this;
    self.bannerGroup.hover(function () {
        // 第一个函数--鼠标在banner上的函数
        // console.log('fuck');
        clearInterval(self.timer);
        self.toggleArrow(true);
    }, function () {
        // 第二个函数--鼠标移开时的函数
        self.loop();
        self.toggleArrow(false);
    })
};

// 轮播图主循环
Banner.prototype.loop = function () {
    var self = this;
    // var index = 0;
    // 将计时器绑定到对象上
    this.timer = setInterval(function () {
        if (self.index === self.bannerCount) {
            self.index = 0;
            // console.log(self.index);
            // console.log('fuck')
        }
        self.animate();
        self.index++;
    }, 2000) // 定时器
};


// 监听箭头点击
Banner.prototype.listenArrowClick = function () {
    var self = this;
    self.rightArrow.click(function () {
        if (self.index === 0) {
            self.index = self.bannerCount - 1;
        } else {
            self.index--;
        }
        self.animate();
    });
    self.leftArrow.click(function () {
        if (self.index === self.bannerCount - 1) {
            self.index = 0;
        } else {
            self.index++;
        }
        self.animate();
    })

};


// 入口
Banner.prototype.run = function () {
    this.loop();
    this.initBanner();
    this.listenBannerHover();
    this.initPageControl();
    this.listenArrowClick();
    this.listenPageControl();
};


// $ 是jquery提供的方法，可以保证函数在网页全部加载完成后运行
$(function () {
    var banner = new Banner();
    banner.run();
});