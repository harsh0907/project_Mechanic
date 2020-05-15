import PushNotification from 'react-native-push-notification';

export const notification = props => {
  const {title, message, bigText} = props;
  PushNotification.localNotification({
    /* Android Only Properties */
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: `${bigText}`, // (optional) default: "message" prop
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    priority: 'high', // (optional) set notification priority, default: high
    importance: 'high', // (optional) set notification importance, default: high

    /* iOS and Android properties */
    title: `${title}`, // (optional)
    message: `${message}`, // (required)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  });
};

//notification({bigText: 'harsh', message: 'paap', title: 'Okk'});
