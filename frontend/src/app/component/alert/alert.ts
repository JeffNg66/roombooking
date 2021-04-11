import AlertMsg from '../../../assets/js/alert.js';

class Alert {
  private msg = new AlertMsg();

  warning(msg) {
    this.msg.notify('warning', msg);
  }
  error(msg) {
    this.msg.notify('error', msg);
  }
  success(msg) {
    this.msg.notify('success', msg);
  }
}
export default Alert;
