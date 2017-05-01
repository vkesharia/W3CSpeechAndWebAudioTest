var W3CTest = {};

var certified = "certified";
var securebrowser = "SB";
var mobile = "mobile";
var webspeech = "webspeech";
var webaudio = "webaudio";

/**
 * Below variables serve as constants to access the JSON Object for automated
 * and manual testing
 * 
 * @irtApiSpecConstant : Global level object created under IRT to get all API
 *                     specification JSON
 * @specMessage : Message object to access global messages to display on UI
 * @specDisableUI : Object to access UI component id to disable on manual test
 *                completion
 * @specTTSApi : TTS API section for automated testing
 * @specTTSManualApi : TTS manual API instruction and other info for TTS manual
 *                   testing
 * @specBrowserapi : Browser API section for automated testing
 * @specCapabilityManualApi : Get/Set Capability manual API instructions and
 *                          other info for Get/Set Capability manual testing
 * @specProcessManualApi : Examine Process list manual API instructions and
 *                       other info for Examine Process List manual testing
 * @specSeparator : JSON object separator which is always "." to access insider
 *                variables and keys
 * @tts_section : Section variable to define TTS automated testing
 * @ttsmanual_section : Section variable to define TTS manual testing
 * @capability_section : Section variable to define Get/Set Capability manual
 *                     testing
 * @process_section : Section variable to define Examine Process List manual
 *                  testing
 */
var apiSpecConstant = 'W3CTest.ApiSpecs';
var specMessage = "message";
var specDisableUI = "disableUI";
var specTTSApi = "ttsapi";
var specTTSManualApi = "ttsmanualapi";
var specBrowserapi = "browserapi";
var specAudioRecorderApi = "audiorecordapi";
var specCapabilityManualApi = "capabilityManualAPI";
var specProcessManualApi = "processManualAPI";
var specExternalTest = "externalTest";
var specSeparator = ".";

var specRecorderManualApi = "recordermanualapi";

var tts_section = 'TTS';
var ttsmanual_section = 'TTS_MANUAL';
var capability_section = 'CAPABILITY_MANUAL';
var process_section = 'PROCESS_MANUAL';
var recorder_section = 'RECORDER';
var recordermanual_section = 'RECORDER_MANUAL';

W3CTest.MAX_RECORDER_SECONDS = 120;

/**
 * Manual test's to run for get/set capability
 */
W3CTest.RecorderTest = {
  INITIATE : 'INITIATE',
  STATUS : 'STATUS',
  CAPABILITY : 'CAPABILITY',
  START_RECORD : 'START_RECORD',
  STOP_RECORD : 'STOP_RECORD',
  PLAY : 'PLAY',
  PAUSE : 'PAUSE',
  RESUME : 'RESUME',
  STOP : 'STOP',
  UNKNOWN : 'UNKNOWN' // unknown status
};

/**
 * UI Section for automate testing, also it matches with api definition section
 * under IRT.ApiSpecs
 */
W3CTest.AUTOMATED_TEST_SECTION = {

  "ttsapi" : {
    /**
     * ttsBrowserType is the variable defined in index.js which will provide
     * browserType value based on text-to-speech support for browser *
     */
    "text" : "Text-to-speech (TTS)",
    "headerId" : "textToSpeechAPI",
    "browserType" : "ttsBrowserType",
    "section" : tts_section,
    "totalTest" : 0,
    "rTestPass" : 0,
    "rTestFail" : 0,
    "oTestPass" : 0,
    "oTestFail" : 0,
    "notperformed" : 0,
    "rTotalTest" : 0,
    "oTotalTest" : 0

  },
  "audiorecordapi" : {

    /**
     * webAudioBrowserType is the variable defined in index.js which will
     * provide browserType value based on WebAudioAPI support for browser *
     */
    "text" : "Audio Recorder",
    "headerId" : "audioAPI",
    "browserType" : "webAudioBrowserType",
    "section" : recorder_section,
    "totalTest" : 0,
    "rTestPass" : 0,
    "rTestFail" : 0,
    "oTestPass" : 0,
    "oTestFail" : 0,
    "notperformed" : 0,
    "rTotalTest" : 0,
    "oTotalTest" : 0
  }
};

/**
 * Comments
 * 
 * @F : F# indicates functional requirement number
 * @R : R# indicates Requirement # from SecureBrowserAPIspecification.md
 * @SEC : SEC-# indicates internal JIRA number
 * 
 */
W3CTest.ApiSpecs = {
  "message" : {
    "testApi_removed" : "As per specification, this API has been removed",
    "testApi_exists" : "This deprecated API still exists",
    "errorDialog_TTS" : "Your browser does not support TTS, so manual testing will be skipped.",
    "errorDialog_CAPABILITY" : "Your browser does not support GET/SET Capability, so manual testing will be skipped.",
    "errorDialog_PROCESS" : "Your browser does not support Examine Process List, so manual testing will be skipped.",
    "errorDialog_saveSuccess" : "Your test results have been saved successfully. Please record your report ID shown below, for future access:",
    "errorDialog_saveFailure" : "System was unable to save test results.",
    "errorDialog_report_not_found" : "No report found for the requested report ID:",
    "errorDialog_RECORDER" : "Your browser does not support Audio Recorder, so manual testing will be skipped"
  },
  "disableUI" : {
    "TTS_disable_all" : [ "PLAY", "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
        "RATE", "VOICE" ],
    "RECORDER_disable_all" : [ "initiateRecording", "getRecordingStatus",
        "getRecordingCapabilities", "startRecording", "stopRecording",
        "startPlaybackRecording", "pausePlaybackRecording",
        "resumePlaybackRecording", "stopPlaybackRecording",
        "concludeCapability", "audioOutput", "audioSource" ]
  },
  "ttsapi" : {
    "checkTTSSpeakAPI" : {

      "id" : "1",
      "testName" : "Speak text (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",

      "testApi_webspeech" : "window.speechSynthesis.speak",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSPauseAPI" : {

      "id" : "2",
      "testName" : "Pause speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",

      "testApi_webspeech" : "window.speechSynthesis.pause",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSResumeAPI" : {
      "id" : "3",
      "testName" : "Resume speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",

      "testApi_webspeech" : "window.speechSynthesis.resume",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSStopAPI" : {

      "id" : "4",
      "testName" : "Stop speech (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",

      "testApi_webspeech" : "window.speechSynthesis.cancel",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkTTSStatusAPI" : {
      "id" : "8",
      "testName" : "Get speech status (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",

      "testApi_webspeech" : "(window.speechSynthesis.paused || window.speechSynthesis.pending || window.speechSynthesis.speaking)",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "boolean", "function" ],
      "isDeprecated" : false
    },
    "checkTTSVoicesAPI" : {

      "id" : "9",
      "testName" : "Get available voices (text-to-speech synthesis)",
      "testApi" : "",
      "testResult" : true,
      "details" : "",

      "testApi_webspeech" : "window.speechSynthesis.getVoices",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    }
  },
  "ttsmanualapi" : {
    "PLAY" : {

      "id" : "11",
      "testName" : "Manual test: TTS Speak",
      "instruction" : "Click <b>Play</b> to test TTS Speech.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Play Test",
      "buttonSliderId" : "play",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "RATE", "VOICE" ],
      "enableSection" : [ "PLAY" ]
    },
    "PAUSE" : {

      "id" : "12",
      "testName" : "Manual test: TTS Pause",
      "instruction" : "Click <b>Play</b> and then <b>Pause</b> to test TTS Pause.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech pause?</p>",
      "dialogTitle" : "TTS Pause Test",
      "buttonSliderId" : "pause",
      "disableSection" : [ "RESUME", "STOP", "VOLUME", "PITCH", "RATE", "VOICE" ],
      "enableSection" : [ "PLAY", "PAUSE" ]
    },
    "RESUME" : {

      "id" : "13",
      "testName" : "Manual test: TTS Resume",
      "instruction" : "Click <b>Play</b>, <b>Pause</b>, and then <b>Resume</b> to test TTS Resume.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech resume?</p>",
      "dialogTitle" : "TTS Resume Test",
      "buttonSliderId" : "resume",
      "disableSection" : [ "STOP", "VOLUME", "PITCH", "RATE", "VOICE" ],
      "enableSection" : [ "PLAY", "PAUSE", "RESUME" ]
    },
    "STOP" : {
      // Stop R09 SEC-37
      "id" : "14",
      "testName" : "Manual test: TTS Stop",
      "instruction" : "Click <b>Play</b> and then <b>Stop</b> to test TTS Stop.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did text-to-speech stop?</p>",
      "dialogTitle" : "TTS Stop Test",
      "buttonSliderId" : "stop",
      "disableSection" : [ "PAUSE", "RESUME", "VOLUME", "PITCH", "RATE",
          "VOICE" ],
      "enableSection" : [ "PLAY", "STOP" ]
    },
    "VOLUME" : {
      // Volume R11, R12 SEC-11, SEC-39
      "id" : "15",
      "testName" : "Manual test: TTS Volume",
      "instruction" : "Change Volume and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Volume Test",
      "buttonSliderId" : "ttsVolume",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "PITCH", "RATE", "VOICE" ],
      "enableSection" : [ "PLAY", "VOLUME" ]
    },
    "PITCH" : {
      // Pitch R11, R12 SEC-11, SEC-39
      "id" : "16",
      "testName" : "Manual test: TTS Pitch",
      "instruction" : "Change Pitch and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Pitch Test",
      "buttonSliderId" : "ttsPitch",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "RATE", "VOICE" ],
      "enableSection" : [ "PLAY", "PITCH" ]
    },
    "RATE" : {
      // Rate R11, R12 SEC-11, SEC-39
      "id" : "17",
      "testName" : "Manual test: TTS Rate",
      "instruction" : "Change Rate and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings?</p>",
      "dialogTitle" : "TTS Rate Test",
      "buttonSliderId" : "ttsRate",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH",
          "VOICE" ],
      "enableSection" : [ "PLAY", "RATE" ]
    },
    "VOICE" : {
      // Voice Selection R11, R12 SEC-11, SEC-39
      "id" : "21",
      "testName" : "Manual test: TTS Voice Selection",
      "instruction" : "Change Voice Selection and Click <b>Play</b> to test.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the voice clearly with applied settings</p>",
      "dialogTitle" : "TTS Voice Selection Test",
      "buttonSliderId" : "voices",
      "disableSection" : [ "PAUSE", "RESUME", "STOP", "VOLUME", "PITCH", "RATE" ],
      "enableSection" : [ "PLAY", "VOICE" ]
    },
    "FAILED" : {
      "id" : "22",
      "testName" : "Manual Test: Text-to-speech (TTS) ",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : "",
      "enableSection" : ""
    }
  },
  "audiorecordapi" : {
    // Initialize audio recorder: SEC-19, R25, F40
    "checkAudioRecorderInitialize" : {
      "id" : "1",
      "testName" : "Initialize audio recorder",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "(window.AudioContext || window.webkitAudioContext)",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkAudioRecorderStatus" : {
      "id" : "2",
      "testName" : "Get audio recorder status",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "audioCtx.state",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkAudioRecorderCapabilities" : {
      "id" : "3",
      "testName" : "Get audio recorder capabilities",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.enumerateDevices)",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkAudioCapture" : {
      "id" : "4",
      "testName" : " Initiate audio capture",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "new MediaRecorder(new MediaStream()).start",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkAudioStopRecording" : {
      "id" : "5",
      "testName" : "Stop recording",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "new MediaRecorder(new MediaStream()).stop",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkAudioRetrieveRecording" : {
      "id" : "6",
      "testName" : "Retrieve recording",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "new MediaRecorder(new MediaStream()).requestData",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkStartPlayback" : {
      "id" : "7",
      "testName" : "Playback recording",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "audioCtx.createBufferSource().start",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkStopPlayback" : {
      "id" : "8",
      "testName" : "Stop playback",
      "testApi" : "",
      "testResult" : null,
      "details" : "",

      "testApi_webaudio" : "audioCtx.createBufferSource().stop",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkPausePlayback" : {
      "id" : "9",
      "testName" : "Pause playback",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.pausePlay",
      "testApi_webaudio" : "audioCtx.createBufferSource().stop",
      "testApi_mobile" : "runtime.recorder.pausePlay",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    },
    "checkResumePlayback" : {
      "id" : "10",
      "testName" : "Resume playback",
      "testApi" : "",
      "testResult" : null,
      "details" : "",
      "testApi_certified" : "SecureBrowser.recorder.resumePlay",
      "testApi_webaudio" : "audioCtx.createBufferSource().start",
      "testApi_mobile" : "runtime.recorder.resumePlay",
      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "apiType" : [ "function" ],
      "isDeprecated" : false
    }
  },
  "recordermanualapi" : {
    "INITIATE" : {
      // Initialize audio recorder: SEC-19, R25, F40
      "id" : "13",
      "testName" : "Manual Test: Initialization",
      "instruction" : "Click <b>Initiate</b> to initialize audio recorder.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did this complete without an error?</p>",
      "dialogTitle" : "Audio Recorder Initialization",
      "buttonSliderId" : "initiateRecording",
      "disableSection" : [ "getRecordingStatus", "getRecordingCapabilities",
          "startRecording", "stopRecording", "startPlaybackRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording" ],
      "enableSection" : [ "initiateRecording" ]
    },
    "STATUS" : {
      // Get audio recorder status: SEC-20, R26, F41
      "id" : "13",
      "testName" : "Manual Test: Status",
      "instruction" : "Click <b>Status</b> to get audio recorder status.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the Recoder Status change to <i>IDLE</i>?</p>",
      "dialogTitle" : "Audio Recorder Status Test",
      "buttonSliderId" : "getRecordingStatus",
      "disableSection" : [ "initiateRecording", "getRecordingCapabilities",
          "startRecording", "stopRecording", "startPlaybackRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording" ],
      "enableSection" : [ 'getRecordingStatus' ]
    },
    "CAPABILITY" : {
      // Get audio recorder capabilities: SEC-21, R27, F41
      "id" : "12",
      "testName" : "Manual Test: Input Device selection",
      "instruction" : "<ol><li>Click <b>Capabilities</b> to get input source options for recording audio.</li><li>Select an Input Source to use as the recording device.</li><li>Click <b>Use</b> to conclude this test.</li></ol>",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Was the audio input select box populated?</p>",
      "dialogTitle" : "Audio Recorder Device Capabilities Test",
      "buttonSliderId" : "getRecordingCapabilities",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "startRecording", "stopRecording", "startPlaybackRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording" ],
      "enableSection" : [ 'getRecordingCapabilities' ]
    },
    "START_RECORD" : {
      // Initiate audio capture: SEC-22, R28, F25
      "id" : "13",
      "testName" : "Manual Test: Start Recording",
      "instruction" : "Click <b>Start Recording</b> to start audio recording.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the Recording Status change to <i>recording</i>?</p>",
      "dialogTitle" : "Audio Recorder Start Recording Test",
      "buttonSliderId" : "startRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "stopRecording",
          "startPlaybackRecording", "pausePlaybackRecording",
          "resumePlaybackRecording", "stopPlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ "startRecording" ]
    },
    "STOP_RECORD" : {
      // Stop recording: SEC-23, R29, F26
      "id" : "14",
      "testName" : "Manual Test: Stop Recording",
      "instruction" : "Click <b>Stop Recording</b> to stop audio recording.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did the Recording Status change to <i>IDLE</i>?</p>",
      "dialogTitle" : "Audio Recorder Stop Recording Test",
      "buttonSliderId" : "stopRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording",
          "startPlaybackRecording", "pausePlaybackRecording",
          "resumePlaybackRecording", "stopPlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ 'stopRecording' ]
    },
    "PLAY" : {
      // Playback a recording: SEC-67, R31, F27
      "id" : "15",
      "testName" : "Manual Test: Play recording",
      "instruction" : "Click <b>Play</b> to hear recording.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the recording?</p>",
      "dialogTitle" : "Audio Recorder Start Playback",
      "buttonSliderId" : "startPlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "stopPlaybackRecording", "concludeCapability", "audioOutput",
          "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording' ]
    },
    "PAUSE" : {
      // Pause playback: SEC-69, R33, F44
      "id" : "16",
      "testName" : "Manual Test: Pause Playback",
      "instruction" : "Click <b>Play</b> and then <b>Pause</b> to test pausing the playback.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did playback of the audio recording pause?</p>",
      "dialogTitle" : "Audio Recorder Pause Playback",
      "buttonSliderId" : "pausePlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "resumePlaybackRecording", "stopPlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording', 'pausePlaybackRecording' ]
    },
    "RESUME" : {
      // Resume playback: SEC-70, R34, F45
      "id" : "17",
      "testName" : "Manual Test: Resume Playback",
      "instruction" : "Click <b>Play</b>, <b>Pause</b>, and then <b>Resume</b> to test resuming the playback.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did you hear the recording resume?</p>",
      "dialogTitle" : "Audio Recorder Resume Playback",
      "buttonSliderId" : "resumePlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "stopPlaybackRecording", "concludeCapability", "audioOutput",
          "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording', 'pausePlaybackRecording',
          'resumePlaybackRecording' ]
    },
    "STOP" : {
      // Stop playback: SEC-68, R32, F43
      "id" : "18",
      "testName" : "Manual Test:Stop Playback",
      "instruction" : "Click <b>Play</b> and then <b>Stop</b> to test Stop Playback.",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "<p>Did audio recording playback stop?</p>",
      "dialogTitle" : "Audio Recorder Resume Playback",
      "buttonSliderId" : "stopPlaybackRecording",
      "disableSection" : [ "initiateRecording", "getRecordingStatus",
          "getRecordingCapabilities", "startRecording", "stopRecording",
          "pausePlaybackRecording", "resumePlaybackRecording",
          "concludeCapability", "audioOutput", "audioSource" ],
      "enableSection" : [ 'startPlaybackRecording', 'stopPlaybackRecording' ]
    },
    "FAILED" : {
      "id" : "22",
      "testName" : "Audio Recorder API Manual Test",
      "instruction" : "",
      "testApi" : "",
      "testResult" : false,
      "details" : "",

      "testApi_webspeech" : "",

      "points" : "1",
      "required" : {
        "all" : true
      },
      "testPoints" : "0",
      "dialogHtml" : "",
      "dialogTitle" : "",
      "buttonSliderId" : "",
      "disableSection" : "",
      "enableSection" : ""
    }

  }
};