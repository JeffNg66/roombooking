class Alert {
  notify(type, msg) {
    if (type === 'warning') {
      Lobibox.alert('warning', {
        msg: msg,
        rounded: true,
        cancelbutton: true
      });
    }
    if (type === 'error') {
      Lobibox.alert('error', {
        msg: msg
      });
    }
    if (type === 'success') {
      Lobibox.alert('success', {
        cancelbutton: true,
        msg: msg
      });
    }
    if (type === 'info') {
      Lobibox.alert('info', {
        msg: msg
      });
    }
  }
}
export default Alert;
