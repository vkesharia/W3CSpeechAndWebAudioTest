TTS = window.TTS || {};

TTS.Status = {
  NotSupported : 'NotSupported', // tts initialization failed.
  Uninitialized : 'Uninitialized', // tts is not initialized
  Initializing : 'Initializing', // tts initialization in progress
  Stopped : 'Stopped', // tts is initialized and there is nothing playing
  Playing : 'Playing', // playing is in progress
  Paused : 'Paused', // playing was paused
  Unknown : 'Unknown' // unknown status
};

TTS.Test = {
  PLAY : 'PLAY',
  PAUSE : 'PAUSE',
  RESUME : 'RESUME',
  STOP : 'STOP',
  VOLUME : 'VOLUME', // TTS Volume Change
  PITCH : 'PITCH', // TTS Pitch Change
  RATE : 'RATE', // TTS Rate Change
  VOICE : 'VOICE', // System Voice Change
  UNKNOWN : 'UNKNOWN' // unknown status
};