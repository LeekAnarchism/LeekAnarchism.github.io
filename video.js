  'use strict';

  var video = document.querySelector('video');
  video.height = window.innerHeight; // todo: make this less terrible

  // Put variables in global scope to make them available to the browser console.
  var constraints = window.constraints = {
    audio: false,
    video: { facingMode: { exact: "environment" } }
  };

  function handleSuccess(stream) {
    var videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log('Using video device: ' + videoTracks[0].label);
    stream.oninactive = function() {
      console.log('Stream inactive');
    };
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
  }

  function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      console.error('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
    } else if (error.name === 'PermissionDeniedError') {
      console.error('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg('getUserMedia error: ' + error.name, error);
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);