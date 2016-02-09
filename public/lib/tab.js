
var CategoryTab = {
  tabBox: $('ul.category-tab'),
  tabs: null,
  currentOffset: 0,
  deviceWidth: 0,
  tabWidth: 0,
  activeTab: null,
  onTabSwitch: null,
  
  init: function() {
    this.tabBox.css('transition-timing-function', 'cubic-bezier(0.1, 0.57, 0.1, 1)');
    this.tabBox.css('transition-duration', '0ms');
    this.tabBox.css('transform', 'translate(0px, 0px) translateZ(0px)');
    this.tabBox.css('position', 'relative');
    this.deviceWidth = $(window).width();
    var tabs = this.tabs = this.tabBox.find("li a");
    if (tabs.length < 4) {
        this.tabBox.css("width", this.deviceWidth);
        tabs.css("width", this.deviceWidth / tabs.length);
    } else {
        var tab = Math.ceil(this.deviceWidth / 4);
        this.tabBox.css("width", tab * tabs.length),
        tabs.css("width", tab),
        this.stepWidth = tab,
        this.maxIndex = tabs.length - 4;
    }

    this.tabSelection();
    this.touchMove();
    this.activeTab = $(tabs[0]);
  },
  
  tabSelection: function() {
    var that = this;
    this.tabs.on('click', function(evt) {
      evt.preventDefault();
      console.trace('click on tab', $(evt.target).attr('data-index'));
      that.tabs.removeClass('selected');
      $(this).addClass('selected');
      that.activeTab = $(this);
      if (that.onTabSwitch instanceof Function) {
        that.onTabSwitch();
      }
    });
  },
  
  touchMove: function() {
    var previous, that = this;
    this.tabBox.on("touchstart", function(evt) {
      previous = evt.originalEvent.touches[0].pageX;
    }).on("touchmove", function(evt) {
      evt.preventDefault();
      var touches = evt.originalEvent.touches;
      for (var i = 0; i < touches.length; i++) {
        that.currentOffset += touches[i].pageX - previous;
        previous = touches[i].pageX;
        console.trace('moving to offset ' + that.currentOffset);  
        that.cssTranslate();
      }
    });
  },
  
  cssTranslate: function() {
    var min = this.deviceWidth - this.tabBox.width();
    if (this.currentOffset > 0) this.currentOffset = 0;
    else if (this.currentOffset < min) this.currentOffset = min;
    
    var value = this.currentOffset + "px,0,0";
    this.tabBox.css({
        "-webkit-transform": "translate3d(" + value + ")",
        transform: "translate3d(" + value + ")"
    });
  },
};
CategoryTab.init();