var Util = {};

var Browser = {};

Browser.isWindows = function() {
  return (navigator.platform.indexOf("Windows") != -1
      || navigator.platform.indexOf("Win32") != -1 || navigator.platform
      .indexOf("Win64") != -1);
};

Browser.isLinux = function() {
  return (navigator.platform.indexOf("X11") != -1
      || navigator.platform.indexOf("Linux") != -1 || navigator.platform
      .indexOf("BSD") != -1);
};

Browser.isMac = function() {
  return (navigator.platform.indexOf("Macintosh") != -1
      || navigator.platform.indexOf("MacPPC") != -1 || navigator.platform
      .indexOf("MacIntel") != -1);
};

Browser.isWebAudioApiSupported = function() {
  try {
    return ('AudioContext' in window || 'webkitAudioContext' in window);

  } catch (e) {
    console.log('Web Audio API is not supported in this browser');
    return false;
  }
};

Browser.isChromeOS = function() {
  return window.navigator.userAgent.indexOf('CrOS') > -1;
};

var ttsTestArray = [];

var ttsManualTestArray = [];

var audioTestArray = [];

var audioTestManualArray = [];

var MACREGEX = new RegExp(
    "^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$");

var Validation = {};

Validation.isMacAddressValid = function(macAddress) {
  return macAddress != null && MACREGEX.test(macAddress);
};

Validation.isIPAddressValid = function(ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0 -9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      .test(ipaddress)) {
    return (true)
  }
  return (false)
};

/**
 * This method will set individual test details in a final JSON array
 * 
 * 
 * @testName : testName key to be read from irpSpect.js
 * @testBrowserType : Browser Type to identified whether it is
 *                  certified/securebrowser or mobile securebrowser
 * @result : true/false based on API specification test
 * @details : Details about test
 * @section : Result Grid Section like TTS / TTS_MANUAL or null
 */

Validation.setIRTTestResults = function(testName, testBrowserType, result,
    details, section) {
  var apiSpec = "";
  if (section == recordermanual_section) {
    apiSpec = apiSpecConstant + specSeparator + specRecorderManualApi
        + specSeparator + testName;
  } else if (section == recorder_section) {
    apiSpec = apiSpecConstant + specSeparator + specAudioRecorderApi
        + specSeparator + testName;
  } else if (section == tts_section) {
    apiSpec = apiSpecConstant + specSeparator + specTTSApi + specSeparator
        + testName;
  } else if (section == ttsmanual_section) {
    apiSpec = apiSpecConstant + specSeparator + specTTSManualApi
        + specSeparator + testName;
  }

  var apiSpecObject = eval(apiSpec);

  var testApi = "";
  if (testBrowserType == null) {
    testApi = apiSpecObject.testApi;
  } else {
    testApi = eval(apiSpec + '.testApi_' + testBrowserType);
  }

  if (result === true) {
    apiSpecObject.testPoints = apiSpecObject.points;
  }

  if (details == 'testApi_removed' || details == 'testApi_exists') {

    details = eval(apiSpecConstant + specSeparator + specMessage
        + specSeparator + details);
  }

  apiSpecObject.testResult = result;
  apiSpecObject.details = details;
  apiSpecObject.testApi = testApi;
  if (section == recordermanual_section) {
    audioTestManualArray.push(apiSpecObject);
  } else if (section == recorder_section) {
    audioTestArray.push(apiSpecObject);
  } else if (section == tts_section) {
    ttsTestArray.push(apiSpecObject);
  } else if (section == ttsmanual_section) {
    ttsManualTestArray.push(apiSpecObject);
  }

};

Validation.setTTSItemDetail = function(currentTTSTest, currentManualApi, result) {

  var itemDetail = {};

  var specObj = eval(apiSpecConstant + specSeparator + currentManualApi
      + specSeparator + currentTTSTest);
  specObj.testResult = result;

  $.extend(itemDetail, specObj);

  return itemDetail;

};

Validation.mergeTTSResultIntoResult = function() {

  var rTestPass = 0, rTestFail = 0, notperformed = 0;
  ttsManualTestArray.forEach(function(element) {
    ttsTestArray.push(element);
    if (element.testResult != null || element.testResult != undefined) {
      if (element.testResult === true) {
        rTestPass++;
      } else {
        rTestFail++;
      }
    } else {
      notperformed++;
    }
  });

  var itemDetail = {};
  $.extend(itemDetail, {
    "rTestPass" : rTestPass,
    "rTestFail" : rTestFail,
    "notperformed" : notperformed
  });

  return itemDetail;

};

Validation.mergeAudioRecorderManualTestIntoResult = function() {

  var rTestPass = 0, rTestFail = 0, notperformed = 0;
  audioTestManualArray.forEach(function(element) {
    audioTestArray.push(element);

    if (element.testResult != null || element.testResult != undefined) {
      if (element.testResult === true) {
        rTestPass++;
      } else {
        rTestFail++;
      }
    } else {
      notperformed++;
    }

  });

  var itemDetail = {};
  $.extend(itemDetail, {
    "rTestPass" : rTestPass,
    "rTestFail" : rTestFail,
    "notperformed" : notperformed
  });

  return itemDetail;

};

Validation.formulateJsonForReport = function() {

  if (ttsManualTestArray.length == 0) {
    populateReportGrid(Object.keys(TTS.Test), ttsmanual_section);
    var manualApiDetails = Validation.mergeTTSResultIntoResult();
    Validation.updateManualResultHeaderCount(manualApiDetails,
        IRT.AUTOMATED_TEST_SECTION.ttsapi);
  }

  if (audioTestManualArray.length == 0) {
    populateReportGrid(Object.keys(IRT.RecorderTest), recordermanual_section);
    var manualApiDetails = Validation.mergeAudioRecorderManualTestIntoResult();
    Validation.updateManualResultHeaderCount(manualApiDetails,
        IRT.AUTOMATED_TEST_SECTION.audiorecordapi);
  }

  var itemDetail = {};
  $.extend(itemDetail, {
    "externalReportConfig" : {

      "jsTTSGrid" : false,

      "jsAudioRecorderGrid" : false
    },
    "reportGridData" : {

      "jsTTSGrid" : ttsTestArray,

      "jsAudioRecorderGrid" : audioTestArray
    },
    "headerHTML" : {

      "textToSpeechAPI" : $('#textToSpeechAPI').html(),

      "audioAPI" : $('#audioAPI').html()
    },
    "reportInfo" : {
      "name" : $.cookie("name"),
      "organization" : $.cookie("organization"),
      "email" : $.cookie("emailId"),
      "browserInfo" : $.cookie("browserDetails"),
      "optionalScoring" : $.cookie("optionalScoring"),
      "specInfo" : $.cookie("browserspec")
    },
    "version" : $.cookie("version"),
    "captchaInfo" : $.cookie("captchaInfo"),
    "captchaInfoHash" : $.cookie("captchaInfoHash")
  });

  return itemDetail;
};

Validation.updateManualResultHeaderCount = function(manualApiDetails,
    irtTestSectionObj) {

  irtTestSectionObj.notperformed = irtTestSectionObj.notperformed
      + manualApiDetails.notperformed;

  if (manualApiDetails.rTestPass != undefined
      && manualApiDetails.rTestFail != undefined) {
    irtTestSectionObj.rTotalTest = irtTestSectionObj.rTotalTest
        + manualApiDetails.rTestPass + manualApiDetails.rTestFail
        + manualApiDetails.notperformed;

    irtTestSectionObj.rTestPass = irtTestSectionObj.rTestPass
        + manualApiDetails.rTestPass;

    irtTestSectionObj.rTestFail = irtTestSectionObj.rTestFail
        + manualApiDetails.rTestFail;
    $('#' + irtTestSectionObj.headerId + ' #rPassCount').html(
        irtTestSectionObj.rTestPass + '/' + irtTestSectionObj.rTotalTest);
    $('#' + irtTestSectionObj.headerId + ' #rFailCount').html(
        irtTestSectionObj.rTestFail + '/' + irtTestSectionObj.rTotalTest);
    $('#' + irtTestSectionObj.headerId + ' #tNotPerformed').html(
        irtTestSectionObj.notperformed + '/' + irtTestSectionObj.rTotalTest);

  } else if (manualApiDetails.oTestPass != undefined
      && manualApiDetails.oTestFail != undefined) {
    irtTestSectionObj.oTotalTest = irtTestSectionObj.oTotalTest
        + manualApiDetails.oTestPass + manualApiDetails.oTestFail
        + manualApiDetails.notperformed;

    irtTestSectionObj.oTestPass = irtTestSectionObj.oTestPass
        + manualApiDetails.oTestPass;

    irtTestSectionObj.oTestFail = irtTestSectionObj.oTestFail
        + manualApiDetails.oTestFail;

    $('#' + irtTestSectionObj.headerId + ' #oPassCount').html(
        irtTestSectionObj.oTestPass + '/' + irtTestSectionObj.oTotalTest);
    $('#' + irtTestSectionObj.headerId + ' #oFailCount').html(
        irtTestSectionObj.oTestFail + '/' + irtTestSectionObj.oTotalTest);
    $('#' + irtTestSectionObj.headerId + ' #tNotPerformed').html(
        irtTestSectionObj.notperformed + '/' + irtTestSectionObj.oTotalTest);

  }

  var percent = 0;
  if ((irtTestSectionObj.rTotalTest + irtTestSectionObj.oTotalTest) > 0) {

    var optionalScoringFlag = $.cookie("optionalScoring");

    var totalPassedTest = 0;
    var totalTest = 0;
    if (optionalScoringFlag === 'Yes') {
      totalPassedTest = irtTestSectionObj.rTestPass
          + irtTestSectionObj.oTestPass;
      totalTest = irtTestSectionObj.rTotalTest + irtTestSectionObj.oTotalTest;
    } else {
      totalPassedTest = irtTestSectionObj.rTestPass;
      totalTest = irtTestSectionObj.rTotalTest;
    }

    if (totalTest > 0) {
      percent = Math.round(100 * totalPassedTest / totalTest);
    }
  }

  $('#' + irtTestSectionObj.headerId + ' #sectionScore').html(
      '[Score: <strong>' + percent + '%</strong>]');

};

Validation.getTTSManualResult = function() {
  return ttsManualTestArray;
};

Validation.getTTSResult = function() {
  return ttsTestArray;
};

Validation.getAudioTestArray = function() {
  return audioTestArray;
};

Validation.getAudioTestManualArray = function() {
  return audioTestManualArray;
};

Util.Validation = Validation;
Util.Browser = Browser;