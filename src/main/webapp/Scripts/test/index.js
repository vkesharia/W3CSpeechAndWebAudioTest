var ttsBrowserType = 'webspeech';
var webAudioBrowserType = 'webaudio';
if (Util.Browser.isWebAudioApiSupported()) {
  var audioCtx = new (window.AudioContext || webkitAudioContext)();
}

var ttsImpl = new TTSService_WebSpeech();
ttsImpl.load();
var recorderImpl = new Recorder_WebAudioService();

function beginW3CAPITest() {

  Object.keys(W3CTest.AUTOMATED_TEST_SECTION).forEach(
      function(element) {

        /**
         * JSON Key from irtspec.js for API Section Automation Test
         */
        var apiJSONKey = apiSpecConstant + specSeparator + element;

        /**
         * JSON object from irtspec.js
         */
        var apiJSONObj = eval(apiJSONKey);

        var sectionJSONObj = eval('W3CTest.AUTOMATED_TEST_SECTION.' + element);

        var apiSupportType = eval(sectionJSONObj.browserType);
        var apiSection = sectionJSONObj.section;

        /**
         * running configured test in irtspec.js based on apiJSONKey and
         * apisection
         */

        runAutomateTest(apiJSONObj, apiJSONKey, apiSupportType, apiSection,
            sectionJSONObj, populateSectionCount);

      });

  populateResults($("#jsTTSGrid"), Util.Validation.getTTSResult(), false);
  populateResults($("#jsAudioRecorderGrid"), Util.Validation
      .getAudioTestArray(), false);

}

function runAutomateTest(irtSpecApiObj, irtSpecApiJsonKey, testBrowserType,
    section, sectionObj, callback) {

  // Required test passed initial count/
  var rTestPass = 0;

  // Required test fail initial count/
  var rTestFail = 0;

  // Optional test passed initial count
  var oTestPass = 0;

  // Optional test fail initial count
  var oTestFail = 0;

  // Total # of Test performed and displayed on Grid results
  var totalTest = 0;

  Object.keys(irtSpecApiObj).forEach(
      function(element) {

        var isDeprecated = false;
        try {
          /*
           * key to get for element under irtSpecApiObj for e.g
           * IRT.ApiSpecs.browserapi.checkGlobalObject
           */
          var elementKey = irtSpecApiJsonKey + specSeparator + element
              + specSeparator;

          /**
           * Load test key to get api signature using elementKey and test
           * testBrowserType for e.g.
           * IRT.ApiSpecs.browserapi.checkGlobalObject.testApi_certified
           */
          var testApiJsonKey = elementKey + 'testApi_' + testBrowserType;
          var result = false;
          var details = "";

          /**
           * get Deprecated jsonKey value it will return either true/false
           */
          isDeprecated = eval(elementKey + "isDeprecated");

          /**
           * apiType to test for Object, function or boolean
           */
          var irtSpecApiArray = eval(elementKey + "apiType");

          /**
           * Object to identify whether this API check is required in all
           * platform
           */
          var isRequiredAll = eval(elementKey + "required.all");
          var testForOS = true;
          var isRequiredForOS = false;
          if (isRequiredAll == null || isRequiredAll == undefined) {
            testForOS = false;
            Object.keys(eval(elementKey + "required")).forEach(
                function(osKey) {

                  if (osKey == 'macOS'
                      && eval(elementKey + "required." + osKey) == true
                      && Util.Browser.isMac()) {
                    testForOS = true;
                    isRequiredForOS = true;
                  }

                  if (osKey == 'windows'
                      && eval(elementKey + "required." + osKey) == true
                      && Util.Browser.isWindows()) {
                    testForOS = true;
                    isRequiredForOS = true;
                  }

                });
          }

          /**
           * manualData key to populate other info in details column
           */
          var irtSpecManualData = eval(elementKey + "manualData");

          /**
           * Load actual api method value from testApiJsonKey for e.g.
           * "window.browser"
           */
          var actualTestApiMethod = eval(testApiJsonKey);

          if (irtSpecApiArray != null && Array.isArray(irtSpecApiArray)) {
            irtSpecApiArray.forEach(function(irtSpecApiType) {
              details = '';
              if (irtSpecApiType == "object") {
                if (typeof eval(actualTestApiMethod) === 'object') {
                  result = true;
                } else {
                  details = actualTestApiMethod + ' is not defined';
                }
              } else if (irtSpecApiType == "boolean") {
                if (typeof eval(actualTestApiMethod) === 'boolean') {
                  result = true;
                }
              } else {
                if (!!eval(actualTestApiMethod)) {
                  result = true;
                }
              }

            });
          }

          if (irtSpecApiArray == null
              || (irtSpecApiArray != null && !Array.isArray(irtSpecApiArray))) {
            if (!!eval(actualTestApiMethod)) {
              result = true;
            }
          }

          if (irtSpecManualData !== undefined && irtSpecManualData) {
          }

          if (isDeprecated && result) {
            result = false;
            details = 'testApi_exists';
          }

          if (isDeprecated && !result) {
            result = true;
            details = 'testApi_removed';
          }

        } catch (ex) {
          if (isDeprecated) {
            result = true;
            details = 'testApi_removed';
          } else {
            result = false;
            details = ex.message;
          }
        }

        if (testForOS == true) {
          if (isRequiredAll === true || isRequiredForOS === true) {
            if (result) {
              rTestPass++;
            } else {
              rTestFail++;
            }
          } else {
            if (result) {
              oTestPass++;
            } else {
              oTestFail++;
            }
          }

          totalTest++;

          Util.Validation.setIRTTestResults(element, testBrowserType, result,
              details, section);
        }

      });

  sectionObj.totalTest = totalTest;
  sectionObj.rTestPass = rTestPass;
  sectionObj.rTestFail = rTestFail;
  sectionObj.oTestPass = oTestPass;
  sectionObj.oTestFail = oTestFail;
  sectionObj.rTotalTest = rTestPass + rTestFail;
  sectionObj.oTotalTest = oTestPass + oTestFail;

  var percent = 0;

  if ((sectionObj.rTotalTest + sectionObj.oTotalTest) > 0) {
    var optionalScoringFlag = $.cookie("optionalScoring");

    var totalPassedTest = 0;
    var totalTest = 0;
    if (optionalScoringFlag === 'Yes') {
      totalPassedTest = sectionObj.rTestPass + sectionObj.oTestPass;
      totalTest = sectionObj.rTotalTest + sectionObj.oTotalTest;
    } else {
      totalPassedTest = sectionObj.rTestPass;
      totalTest = sectionObj.rTotalTest;
    }

    if (totalTest > 0) {
      percent = Math.round(100 * totalPassedTest / totalTest);
    }
  }

  $('#' + sectionObj.headerId + ' #sectionScore').html(
      '[Score: <strong>' + percent + '%</strong>]')

  callback($('#' + sectionObj.headerId), rTestPass, rTestFail, oTestPass,
      oTestFail, totalTest);
}

function populateSectionCount(currHeaderId, rTestPass, rTestFail, oTestPass,
    oTestFail, totalTest) {

  var countStaticHtml = $('#apiSectionCountInfo').html();
  var cntxPathRegex = /contextPath/g;
  // countStaticHtml = countStaticHtml.replace(cntxPathRegex, getContextPath());
  countStaticHtml = countStaticHtml.replace('requiredPassCount', rTestPass
      + "/" + (rTestPass + rTestFail));
  countStaticHtml = countStaticHtml.replace('requiredFailCount', rTestFail
      + "/" + (rTestPass + rTestFail));
  countStaticHtml = countStaticHtml.replace('optionalPassCount', oTestPass
      + "/" + (oTestPass + oTestFail));
  countStaticHtml = countStaticHtml.replace('optionalFailCount', oTestFail
      + "/" + (oTestPass + oTestFail));

  countStaticHtml = countStaticHtml.replace('notperformedCount', 0 + "/"
      + (rTestPass + rTestFail));

  $('#' + currHeaderId[0].id + ' #scoreHTML').append(countStaticHtml);

}

function populateResults(id, gridData, extTest) {
  var extCss = '';
  var showCSS = 'irt-grid-column-wrap';
  var detailTitle = 'Details';
  var detailWidth = 150;
  var testNameWidth = 150;
  var detailAlign = "left";

  if (extTest === true) {
    extCss = 'irt-grid-column-hide';
    detailTitle = 'Score';
    detailWidth = 50;
    testNameWidth = 100;
    detailAlign = "center";
  }
  id
      .jsGrid({
        width : "100%",
        data : gridData,
        selecting : false,
        fields : [
            {
              title : "Test Name",
              name : "testName",
              type : "text",
              width : testNameWidth,
              css : showCSS
            },
            {
              title : "Test API",
              name : "testApi",
              type : "text",
              width : 150,
              css : showCSS + ' ' + extCss
            },
            {
              title : "Result",
              name : "testResult",
              type : "text",
              width : 45,
              align : "center",
              css : showCSS,

              itemTemplate : function(value, item) {

                // alert(item);
                var isRequired = true;
                if (item != null && item != undefined && item.required != null
                    && item.required != undefined && item.required.all != null
                    && item.required.all != undefined && !item.required.all) {
                  isRequired = false;
                }

                if (value == null) {
                  return '<img alt="Test not performed by user" title="Test not performed by user" src="Shared/images/question_blue.png" id="result-icon">';
                } else if (isRequired === true && value === true) {
                  return '<img alt="Required test passed" title="Required test passed" src="Shared/images/button-check_green.png" id="result-icon">';
                } else if (isRequired === true && value === false) {
                  return '<img alt="Required test failed" title="Required test failed" src="Shared/images/button-cross_red.png" id="result-icon">';
                } else if (isRequired === false && value === true) {
                  return '<img alt="Optional test passed" title="Optional test passed" src="Shared/images/button-check_yellow.png" id="result-icon">';
                } else if (isRequired === false && value === false) {
                  return '<img alt="Optional test failed" title="Optional test failed" src="Shared/images/button-cross_yellow.png" id="result-icon">';
                } else {
                  return value;
                }

              }

            }, {
              title : detailTitle,
              name : "details",
              type : "text",
              align : detailAlign,
              width : detailWidth,
              css : showCSS,
              itemTemplate : function(value) {
                if (value == null) {
                  return "Not Available";
                } else {
                  return value;
                }

              }
            }, {
              title : 'Points',
              name : "testPoints",
              type : 'number',
              width : 15,
              css : 'irt-grid-column-hide'
            } ]
      });

}
