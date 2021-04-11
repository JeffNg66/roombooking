class Notify {
  constructor() {
    /** Delay */
    this.DELAY = 1000;
    /** Width of notification box */
    this.WIDTH = 300;
    Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
      iconSource: 'fontAwesome'
    });
    Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
      iconSource: 'fontAwesome'
    });
  }
  notification(style, msg) {
    if (style.toLowerCase() === 'info') {
      Lobibox.notify(style, {
        icon: true,
        progress: false,
        rounded: true,
        sound: false,
        delay: this.DELAY,
        width: this.WIDTH,
        position: 'top center',
        title: 'Info',
        msg: msg
      });
    }
    if (style.toLowerCase() === 'warning') {
      Lobibox.notify(style, {
        icon: true,
        sound: false,
        delay: 3000,
        width: this.WIDTH,
        position: 'top center',
        title: 'Warning',
        rounded: true,
        msg: msg
      });
    }
    if (style.toLowerCase() === 'error') {
      Lobibox.notify(style, {
        icon: true,
        sound: false,
        delay: 3000,
        width: this.WIDTH,
        position: 'top center',
        title: 'Error',
        rounded: true,
        msg: msg
      });
    }
    if (style.toLowerCase() === 'success') {
      Lobibox.notify(style, {
        icon: true,
        sound: false,
        delay: this.DELAY,
        width: this.WIDTH,
        position: 'top center',
        title: 'Success',
        msg: msg
      });
    }
  }
}
export default Notify;
