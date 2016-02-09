(function(a, b) {
    function c(a) {
        var c = {
            slider: null ,
            index: 0,
            auto: !1,
            node: "ul",
            rank: 1,
            point: !1,
            loop: !1
        };
        this.EVENTS = {
            MOUSE_START: "touchstart",
            MOUSE_MOVE: "touchmove",
            MOUSE_END: "touchend",
            MOVE_STOP: "movestop"
        },
            this.START_POSITION = {
                X: 0,
                Y: 0
            },
            this.END_POSITION = {
                X: 0,
                Y: 0
            },
            this.duration = 3e3,
            this.DELTA = {
                X: 0,
                Y: 0
            },
            this.current = 0,
            this.deltaValue = 20,
            this.$win = b(window),
            this.$body = b(document.body),
            this.sliderNode = null ,
            this.MOVE_STEP = 320,
            this.total = 0,
            this.timeId = null ,
            this.direction = "left",
            this.MAX_WIDTH = 0,
            this.WIN_WIDTH = 0,
            this.options = b.extend(c, a),
            this.init()
    }
    c.prototype.init = function() {
        this.sliderWrap = b(this.options.slider),
        this.options.point && (this.pointWrap = this.sliderWrap.find(".banner_point")),
            this.sliderNode = this.sliderWrap.find(this.options.node),
            this.WIN_WIDTH = this.$win.width(),
            this.MOVE_STEP = this.WIN_WIDTH / this.options.rank,
            this.total = this.sliderNode.find("li").size() || 0,
            this.updateSlideCSS(),
            this.addEvent(),
            this.setPoint(),
        this.options.auto && this.autoMatic()
    }
        ,
        c.prototype.restart = function() {
            this.options.auto && this.autoMatic()
        }
        ,
        c.prototype.setPoint = function() {
            if (null  != this.pointWrap) {
                var a = "";
                if (!(this.total <= 1)) {
                    for (var b = 0; b < this.total; b++)
                        a += "<span></span>";
                    this.pointWrap.html(a),
                        this.updatePointStatus(this.options.index)
                }
            }
        }
        ,
        c.prototype.updatePointStatus = function(a) {
            if (this.pointWrap) {
                var b = this.pointWrap.find("span");
                b.removeClass("active"),
                    b.eq(a).addClass("active"),
                    b.parent().css({
                        width: this.total + "rem",
                        "margin-left": -this.total / 2 + "rem"
                    })
            }
        }
        ,
        c.prototype.autoMatic = function() {
            var a = this;
            a.timeId || (a.timeId = window.setInterval(function() {
                    switch (a.index = a.current,
                        a.direction.toLocaleUpperCase()) {
                        case "LEFT":
                            a.current++,
                            a.current > a.total - 1 && (a.current = a.total - 1,
                                a.direction = "RIGHT");
                            break;
                        case "RIGHT":
                            a.current--,
                            a.current < 0 && (a.current = 0,
                                a.direction = "LEFT")
                    }
                    a.move(a.current)
                }
                , a.duration))
        }
        ,
        c.prototype.updateSlideCSS = function() {
            this.MAX_WIDTH = this.MOVE_STEP * this.total,
                this.sliderNode.css({
                    width: this.MAX_WIDTH,
                    "-webkit-transform": "translate3d(-0px, 0px, 0px)",
                    transform: "translate3d(-0px, 0px, 0px)",
                    "-webkit-transition": "all 0.5s",
                    transition: "all 0.5s",
                    position: "relative"
                }),
                this.sliderNode.find("li").css({
                    width: this.MOVE_STEP
                })
        }
        ,
        c.prototype.addEvent = function() {
            var a = this;
            this.sliderWrap.bind(this.EVENTS.MOUSE_START, function(b) {
                    a.startHandler(b),
                        a.stop()
                }
            ),
                this.sliderWrap.bind(this.EVENTS.MOUSE_MOVE, function(b) {
                        a.moveHandler(b),
                        Math.abs(b.originalEvent.touches[0].pageX - a.START_POSITION.X) / Math.abs(b.originalEvent.touches[0].pageY - a.START_POSITION.Y) > 1 && b.preventDefault()
                    }
                ),
                this.sliderWrap.bind(this.EVENTS.MOUSE_END, function(b) {
                        a.endHandler(b),
                            a.restart()
                    }
                ),
                this.$win.bind("scroll", function() {
                        a.options.auto && (a.inviewport(a.sliderWrap) ? a.restart() : a.stop())
                    }
                )
        }
        ,
        c.prototype.inviewport = function(a) {
            var b = a;
            return b.offset().top + b.height() < this.$body.scrollTop() ? !1 : !0
        }
        ,
        c.prototype.startHandler = function(a) {
            this.START_POSITION.X = a.originalEvent.touches[0].pageX,
                this.START_POSITION.Y = a.originalEvent.touches[0].pageY
        }
        ,
        c.prototype.moveHandler = function(a) {
            this.DELTA.X = a.originalEvent.touches[0].pageX - this.START_POSITION.X,
                this.DELTA.Y = a.originalEvent.touches[0].pageY - this.START_POSITION.Y,
            Math.abs(this.DELTA.Y) < Math.abs(this.DELTA.X) && this.sliderNode.css({
                left: this.DELTA.X - this.current * this.MOVE_STEP,
                transition: "left 0ms ease;"
            })
        }
        ,
        c.prototype.endHandler = function() {
            Math.abs(this.DELTA.X) >= this.deltaValue && (this.DELTA.X > 0 ? this.current-- : this.current++,
                this.current < 0 ? this.current = 0 : this.current >= this.total && (this.current = this.total - 1),
                this.move(this.current)),
                this.DELTA.X = 0
        }
        ,
        c.prototype.move = function(a) {
            var c = this
                , d = -(a * this.MOVE_STEP);
            Math.abs(d) > this.MAX_WIDTH - this.WIN_WIDTH && (d = this.MAX_WIDTH < this.WIN_WIDTH ? 0 : this.WIN_WIDTH - this.MAX_WIDTH),
                this.sliderNode.css({
                    left: d,
                    transition: "left 500ms ease;"
                }),
                window.setTimeout(function() {
                        c.updatePointStatus(a)
                    }
                    , 300),
                b(this).trigger(this.EVENTS.MOVE_STOP, a)
        }
        ,
        c.prototype.effect = function() {}
        ,
        c.prototype.stop = function() {
            clearInterval(this.timeId),
                this.timeId = null
        }
        ,
        c.prototype.next = function() {}
        ,
        c.prototype.prev = function() {}
        ,
    this.Slider instanceof c || (this.Slider = c),
    this.slider || (this.slider = function(a) {
            b(".jsSlider").each(function() {
                    if (!b(this).attr("slider-init-status")) {
                        var d = {
                            slider: this,
                            auto: !0,
                            point: !0,
                            loop: !0
                        };
                        new c(b.extend(d, a)),
                            b(this).attr("slider-init-status", !0)
                    }
                }
            ),
                b(".J_brand_slider").each(function() {
                        if (!b(this).attr("slider-init-status")) {
                            var d = {
                                slider: this,
                                auto: !1,
                                rank: 2.5
                            };
                            new c(b.extend(d, a)),
                                b(this).attr("slider-init-status", !0)
                        }
                    }
                )
        }
    ),
        b(function() {
                window.slider()
            }
        )
})(this, jQuery);