var Notify=require('notifyjs').default
import Emitter from './Emitter';

class Notifications {
  construstor(){
    if (Notify.needsPermission && Notify.isSupported()) {
      Notify.requestPermission(onPermissionGranted, onPermissionDenied);
    }

    function onPermissionGranted() {
      console.log('Permission has been granted by the user');
    }

    function onPermissionDenied() {
      console.warn('Permission has been denied by the user');
    }
  }

  init() {
    Emitter.listen('new-notification', function(options){
      if (!options.timeout) {
        options.timeout = 5
      }
      let notification = new Notify(options.title, options);
      notification.show()
    })
  }
}


export default Notifications
