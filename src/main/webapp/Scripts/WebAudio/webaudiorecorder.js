function Recorder_WebAudioService() {

  var audioContext = null;

  var constraints = {
    audio : true
  };

  var soundTrack = null;

  var mediaRecorder;

  var chunks = [];

  var reader = new FileReader();

  var audioURL = '';

  var source = null;

  var startedAt = 0;

  var pausedAt = 0;

  var playing = false;
  var offset;

  var recordedData;

  this.isSupported = function() {
    return ('AudioContext' in window || 'webkitAudioContext' in window);
  };

  this.getAudioContextObject = function() {

    try {
      if (!this.isSupported()) {
        return null;
      } else {
        if (this.audioContext == null) {
          audioContext = new (window.AudioContext || webkitAudioContext)();
        }
        return audioContext;
      }
    } catch (error) {
      throw error;      
    }
  };

  this.audioRecorderInitialize = function() {
    try {
      audioContext = this.getAudioContextObject();
     
      navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia
          || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      
      return true;
    } catch (error) {
      throw error;
    }

  };

  this.getAudioRecorderStatus = function() {
    try {
      if (audioContext != null && audioContext!=undefined) {
        return audioContext.state == "running" ? "IDLE" : audioContext.state;
      } else {
        throw 'Unable to get Web Audio Recorder Status';
      }
    } catch (error) {
      throw error;
    }
  };

  this.getDeviceRecorderCapabilities = function() {
    try {
    if(audioContext!=null){
      navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError);
    }
    else{
      throw 'Unable to get Web Audio Capabilities';
    }
    } catch (error) {
      throw error;
    }
  };

  this.initializeMediaRecorder = function(value) {

    try{
    this.constraints = {
      audio : {
        deviceId : value ? {
          exact : value
        } : undefined
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
      if(mediaRecorder!=null){
        mediaRecorder = null;
      }
      mediaRecorder = new MediaRecorder(stream); 
      window.stream = stream;
     }).catch(function(error){
       throw error;
     });
    }
   catch (exception) {
    throw exception;
   }
    
  };

  this.setRecorderInputDevice = function(label, value, index) {

    this.initializeMediaRecorder(value);

  };

  this.startAudioRecording = function() {

    try {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      return mediaRecorder.state;
    } catch (error) {
      throw error;
    }
  };

  this.stopAudioRecording = function() {

    try {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);

      mediaRecorder.onstop = function(e) {
        console.log("data available after MediaRecorder.stop() called.");

        var blob = new Blob(chunks, {
          'type' : 'audio/ogg; codecs=opus'
        });

        chunks = [];
        audioURL = window.URL.createObjectURL(blob);

        reader.readAsBinaryString(blob);

      };

      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      return mediaRecorder.state == "inactive" ? "IDLE": mediaRecorder.state;
    } catch (error) {
      throw error;
    }
  };
  
  this.startAudioPlayback = function(){
    
    try{
    var request = new XMLHttpRequest();
    request.open('GET', audioURL, true);
    request.responseType = 'arraybuffer'; // This asks the browser to populate
                                          // the retrieved binary data in a
                                          // array buffer
    request.onload = function(){
     
      audioContext.decodeAudioData( request.response ).then(function(decodedData){
        if (source != null) {
          source.disconnect(audioContext.destination);
          source = null; 
        }
        
        if(decodedData !=null){
          console.log("File read properly");
          console.log("Channels: " + decodedData.numberOfChannels);
          console.log("Length: " + decodedData.length);
          console.log("Sample Rate: " + decodedData.sampleRate);
          console.log("Duration: " + decodedData.duration);
          recordedData = decodedData;
        }
          
        
       source = audioContext.createBufferSource();
       source.buffer = recordedData; 
       source.connect(audioContext.destination); 
       offset = pausedAt;
       source.start(0); 
       startedAt = audioContext.currentTime - offset;
       playing = true;
      }).catch(function(){
        soundTrack = new Audio(audioURL);
        soundTrack.play();
      });
    }
    request.send();
    } catch (error) {
      throw error;
    }

  };

  this.stopAudioPlayback = function() {
    try {

      if (soundTrack != null) {
        soundTrack.pause();
      } else {

        if (source) {
          source.disconnect();
          source.stop(0);
          source = null;
        }
        pausedAt = 0;
        startedAt = 0;
        playing = false;

      }
    } catch (error) {
      throw error;
    }

  };

  this.pauseAudioPlayback = function() {
    try {
      if (soundTrack != null) {
        soundTrack.pause();
      } else {
        var elapsed = audioContext.currentTime - startedAt;
        this.stopAudioPlayback();
        pausedAt = elapsed;
      }
    } catch (error) {
      throw error;
    }
  };

  this.resumeAudioPlayback = function() {
    try {
      if (soundTrack != null) {
        soundTrack.play();
      } else {
        source = audioCtx.createBufferSource();
        source.buffer = recordedData;
        source.connect(audioCtx.destination);
        offset = pausedAt;
        source.start(0, offset);
        startedAt = audioCtx.currentTime - offset;
        pausedAt = 0;
        playing = true;
      }
    } catch (error) {
      throw error;
    }
  };

  this.handleError = function(error) {
    throw error;
  };

  this.gotDevices = function(deviceInfos) {
    var audioInputSelect = $('#audioSource');

    audioInputSelect.empty();
    
    var audioComboCount = 1;

    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label || 'Microphone '
            + (audioComboCount++);
        audioInputSelect.append(option);
      }  else {
        console.log('Some other kind of source/device: ', deviceInfo);
      }
    }

  };

  this.audioRecorderClosed = function() {

    try {
      audioContext.close();
    } catch (error) {
     throw error;
    }

  };
  
  this.setRecordedData = function(){
    
    var getReaderObjectInterval = setInterval(function() {
      
      if(reader.readyState==2){
        $('#audio_data_output_textfield').show();
        $('#recordedData').val(btoa(reader.result));
        clearInterval(getReaderObjectInterval);
      }
      
    },1000);
    
  };

}