 var mySize = {
     pelvisRound: 92,
     hipRound: 105,
     thighRound: 60,
     shoulderRound: 120,
     chestRound: 100,
     waistRound: 91
 };

 var recommendSize = {
     XL: {
         pelvisRound: 100,
         hipRound: 115,
         thighRound: 67,
         shoulderRound: 130,
         chestRound: 105,
         waistRound: 95
     },
     L: {
         pelvisRound: 94,
         hipRound: 110,
         thighRound: 63,
         shoulderRound: 124,
         chestRound: 100,
         waistRound: 92
     },
     M: {
         pelvisRound: 90,
         hipRound: 105,
         thighRound: 57,
         shoulderRound: 115,
         chestRound: 95,
         waistRound: 93
     },
     S: {
         pelvisRound: 87,
         hipRound: 100,
         thighRound: 54,
         shoulderRound: 110,
         chestRound: 90,
         waistRound: 85
     },
     XS: {
         pelvisRound: 80,
         hipRound: 95,
         thighRound: 48,
         shoulderRound: 100,
         chestRound: 80,
         waistRound: 80
     }
 };

 var bodyPartName = ['허리', '골반', '엉덩이', '허벅지', '어깨', '가슴'];

 var recommendMessage = {
     XL: '사용자님 어깨와 허리가 얇지만 XL를 루즈하게 입어요.',
     L: '사용자님 보다 어깨가 넓고 허리가얇아 L를 넉넉하게 입어요.',
     M: '사용자님 허벅지와 전체 길이가 맞아서 M을 입을 수 있어요.',
     S: '사용자님 골반이 좁아서 S는 조금 타이트하게 입을 수 있어요.',
     XS: '사용자님 어깨가 좁아서 XS는 작을수 있어요.'
 };

 var userBodyInfomation = {
     height: 164,
     weight: 62
 };


 var PolarGraph = (function () {

     var userSize = mySize;
     var userBodyInfo = userBodyInfomation;
     var recommendedMessage = recommendMessage;
     var bodyPartText = bodyPartName;

     var mySizeValues = Object.values(mySize);
     var bodyPartNameValues = Object.values(bodyPartName);
     var recommendMessageValues = Object.values(recommendMessage);
     var userBodyInfomationValues = Object.values(userBodyInfomation);

     checkDataInfomation(mySizeValues);
     checkDataInfomation(userBodyInfomationValues);
     checkDataInfomation(recommendMessageValues);
     checkDataInfomation(bodyPartNameValues);

     function checkDataInfomation(dataObject) {

         for (var value in dataObject) {

             if (typeof dataObject !== "object") {
                 throw new Error(dataObject + ": not an object");

             } else if (dataObject[value] == null) {
                 throw new Error(dataObject + ": object is null");

             } else if (dataObject[value] === undefined) {
                 throw new Error(dataObject + ": object is undefined");

             } else if (dataObject[value] == '') {
                 throw new Error(dataObject + ": object is empty");

             } 
         }

     };

     var recommendedSize = recommendSize;
     var recommendSizeValues = Object.values(recommendSize);

     checkSizeDataInfomation(recommendSizeValues);

     function checkSizeDataInfomation(sizeDataObject) {
         for (var count in sizeDataObject) {
             var sizeData = Object.values(sizeDataObject[count]);

             for (var value in sizeDataObject) {

                 if (typeof sizeData !== "object") {
                     throw new Error(sizeData + ": not an object");

                 } else if (sizeData[value] == null) {
                     throw new Error(sizeData + ": object is null");

                 } else if (sizeData[value] === undefined) {
                     throw new Error(sizeData + ": object is undefined");

                 } else if (sizeData[value] == '') {
                     throw new Error(sizeData + ": object is empty");

                 } else if (!(isFinite(sizeData[value]))) {
                     throw new Error(sizeData + ": property is not a number");

                 }
             }
         }

     };


     var drawPolarGraph = function (elIds, graphProperties, buttonCount) {

         var graphDefaultProperties = {
             graphFontStyle: 'Flexo-Bold',
             userGraphColor: '#95D0CC',
             recommendGraphColor: '#20607A',
             circleFillColor: '#E7EAEA',
             circleShadowColor: '#EEEDE9',
             circleShadowBlur: 50,
             graphRangeValue: 1.7,
             dotText: '●',
             dotFontSize: 8,
             dotFontColor: '#20607A',
             dotFontLocationValue: 0.8,
             bodyPartFontSize: 10,
             bodyPartFontColor: '#333333',
             bodyPartLineColor: '#95D0CC',
             bodyPartLineWidth: 2,
             bodyPartLocationValue: 0.9,
             sizeGapFontSize: 12,
             sizeGapFontColor: '#20607A',
             sizeGapFontLocationValue: 0.62,
             recommendSizeFontSize: 24,
             userInfoFontSize: 11,
             userInfoFontColor: '#FBFBFB',
             buttonOpacity: 0.3,
             buttonCursorIn: 'pointer',
             buttonCursorOut: 'default',
             fontRatio: 2.5,
             userSizeGraphColor: '#95D0CC',
             userSizeGraphGlobalAlpha: 0.8,
             recommendSizeGraphColor: '#20607A',
             recommendSizeGraphLineWidth: 6,
             graphFaceCount: 6,
             userInfoTextAlign: "center"
         };

         var propertyCheck = this.checkGraphProperties(elIds, graphProperties, graphDefaultProperties);
     };


     drawPolarGraph.prototype = {

         //**생성자 함수에서 매개변수로 받은 객체값 오류 확인
         // - 생성자 함수 매개변수로 받은 객체 개수 확인 / 객체 속성 값 확인 후 에러 출력
         checkGraphProperties: function (elIds, graphProperties, graphDefaultProperties) {

             var defaultPropertyKeys = Object.keys(graphDefaultProperties);
             var propertyCheckCount = 0;

             for (var value in graphProperties) {
                 if (graphDefaultProperties.hasOwnProperty(value)) {
                     propertyCheckCount++;

                 }
             }

             var graphElIds = elIds;
             var polarGraphProperties = graphProperties;

             if (defaultPropertyKeys.length == propertyCheckCount) {

                 checkPropertiesInfomation(elIds)
                 checkPropertiesInfomation(graphProperties)

                 function checkPropertiesInfomation(property) {

                     for (var value in property) {

                         if (typeof property !== "object") {
                             throw new Error(property + ": not an object");

                         } else if (property[value] == null) {
                             throw new Error(property + ": object is null");

                         } else if (property[value] === undefined) {
                             throw new Error(property + ": object is undefined");

                         } else if (property[value] == '') {
                             throw new Error(property + ": object is empty");

                         }
                     }
                 };

             } else {
                 throw new Error("poralGraph() : count of properties is different");
             }

             var runGraph = this.drawGraph(graphElIds, polarGraphProperties);
         },

         //**그래프 실행
         drawGraph: function (graphElIds, graphDefaultProperties) {
             var self = this;

             var canvasInfo = self.initCanvas(graphElIds);
             var canvasLocstionValue = self.calCanvasLocationValue(canvasInfo);
             var graphRange = self.getGraphLengthRange(buttonCount);
             var sizeGap = self.calSizeGap(buttonCount);

             self.drawCircleAndLine(canvasInfo, canvasLocstionValue, graphDefaultProperties);
             self.drawTextAndSizeGap(canvasInfo, canvasLocstionValue, sizeGap, graphDefaultProperties);
             self.drawSizeCompareGraph(canvasInfo, canvasLocstionValue, graphRange, graphDefaultProperties);
             self.drawUserInfoText(canvasInfo, graphDefaultProperties);
             self.setRecommendMessage(graphElIds);
             self.chageButtonColor(graphElIds, graphDefaultProperties);
         },

         //** 육각 그래프 변형에 필요한 수치 반환
         // - 신체 부위별 최대/최소 사이즈 값을 구하고, 사용자와 추천사이즈 그래프 그려질 위치값을 계산
         getGraphLengthRange: function () {
             var recommendSizeValue = Object.values(recommendedSize);
             var mySizeLength = Object.keys(userSize).length;
             var recommendSizeValueLength = recommendSizeValue.length;
             var userGraphLocationVlaue = [];
             var recommendedGraphLocationVlaue = [];

             for (var i = 0; i < mySizeLength; i++) {
                 var recommendSizeKey = [];
                 var oneBodyPartList = [];

                 for (var j = 0; j < recommendSizeValueLength; j++) {
                     recommendSizeKey = Object.values(recommendSizeValue[j]);
                     oneBodyPartList.push(recommendSizeKey[i]);
                 }

                 oneBodyPartList.sort(function (a, b) {
                     return a - b;
                 });

                 var minSizeValue = oneBodyPartList[0];
                 var maxSizeValue = oneBodyPartList[oneBodyPartList.length - 1];
                 var mySizeList = Object.values(userSize);
                 var recommendedSizeList = Object.values(recommendSizeValue[buttonCount]);

                 userGraphLocationVlaue.push((mySizeList[i] - minSizeValue) / (maxSizeValue - minSizeValue) * 100);

                 if (buttonCount == recommendSizeValueLength - 1) {
                     recommendedGraphLocationVlaue.push(3);
                 } else {
                     recommendedGraphLocationVlaue.push((recommendedSizeList[i] - minSizeValue) / (maxSizeValue - minSizeValue) * 100);
                 }

             }

             return {
                 userGraphLocationVlaue: userGraphLocationVlaue,
                 recommendedGraphLocationVlaue: recommendedGraphLocationVlaue
             };
         },

         //**그래프에 나타낼 사용자 사이즈와 추천 사이즈의 차이값 계산후 반환
         calSizeGap: function () {
             var recommendSizeValue = Object.values(recommendedSize);
             var recommendSizeList = recommendSizeValue[buttonCount];
             var recommededMessage = recommendedMessage[buttonCount];
             var calculatedSizeList = [];

             for (var value in userSize) {
                 calculatedSizeList[value] = userSize[value] - recommendSizeList[value];
             }

             var calculatedSizeValue = Object.values(calculatedSizeList);

             return calculatedSizeValue;
         },

         //**캔버스 초기화
         initCanvas: function (elId) {
             var canvasPolar = document.getElementById(elId.canvasPolar);
             var polarContext = canvasPolar.getContext("2d");

             return {
                 canvasPolar: canvasPolar,
                 polarContext: polarContext
             };
         },

         //**캔버스 위치값 계산
         calCanvasLocationValue: function (canvasInfo) {
             var canvasHalfWidth = canvasInfo.canvasPolar.width / 2;
             var canvasCircleWidth = canvasInfo.canvasPolar.width / 2.7;

             return {
                 canvasHalfWidth: canvasHalfWidth,
                 canvasCircleWidth: canvasCircleWidth
             };
         },

         //**그래프 바탕 원과 신체부위를 나누는 선 그리기
         drawCircleAndLine: function (canvasInfo, locstionValue, prop) {
             canvasInfo.polarContext.save();
             canvasInfo.polarContext.beginPath();
             canvasInfo.polarContext.clearRect(0, 0, canvasInfo.canvasPolar.width, canvasInfo.canvasPolar.height);
             canvasInfo.polarContext.arc(locstionValue.canvasHalfWidth, locstionValue.canvasHalfWidth, locstionValue.canvasCircleWidth, 0, 2 * Math.PI);
             canvasInfo.polarContext.shadowColor = prop.circleShadowColor;
             canvasInfo.polarContext.shadowBlur = prop.circleShadowBlur;
             canvasInfo.polarContext.fillStyle = prop.circleFillColor;
             canvasInfo.polarContext.fill();

             var linePointCount = 0;

             canvasInfo.polarContext.beginPath();
             canvasInfo.polarContext.strokeStyle = prop.bodyPartLineColor;
             canvasInfo.polarContext.lineWidth = prop.bodyPartLineWidth;

             for (var i = 0; i < 6; i++) {
                 canvasInfo.polarContext.moveTo(locstionValue.canvasHalfWidth, locstionValue.canvasHalfWidth);
                 canvasInfo.polarContext.arc(locstionValue.canvasHalfWidth, locstionValue.canvasHalfWidth, locstionValue.canvasCircleWidth, linePointCount * Math.PI, linePointCount * Math.PI, false);

                 linePointCount += 0.333;
             }

             canvasInfo.polarContext.stroke();
             canvasInfo.polarContext.restore();
         },

         //** 그래프 내 신체 부위 텍스트와 계산된 사이즈 차이값 그리기
         drawTextAndSizeGap: function (canvasInfo, locationValue, sizeGap, prop) {
             canvasInfo.polarContext.save();
             canvasInfo.polarContext.translate(locationValue.canvasHalfWidth - 10, locationValue.canvasHalfWidth + 10);

             drawBodypartInfo(prop.dotFontLocationValue, prop.dotFontSize, prop.dotFontColor, prop.dotText, 0);
             drawBodypartInfo(prop.bodyPartLocationValue, prop.bodyPartFontSize, prop.bodyPartFontColor, bodyPartText, -15);
             drawBodypartInfo(prop.sizeGapFontLocationValue, prop.sizeGapFontSize, prop.sizeGapFontColor, sizeGap, -10);

             function drawBodypartInfo(radiusValue, fontSize, fontColor, text, textLocation) {
                 var radius, angle;
                 var pointCount = 1;

                 for (var i = 0; i < 6; i++) {
                     angle = pointCount * Math.PI / 6;
                     radius = locationValue.canvasHalfWidth * radiusValue;

                     canvasInfo.polarContext.save();
                     canvasInfo.polarContext.rotate(angle);
                     canvasInfo.polarContext.translate(0, -radius);
                     canvasInfo.polarContext.rotate(-angle);

                     canvasInfo.polarContext.font = (fontSize * prop.fontRatio) + "px " + prop.graphFontStyle + "";
                     canvasInfo.polarContext.fillStyle = fontColor;

                     if (text[i] >= 0 && isFinite(text[i])) {
                         canvasInfo.polarContext.fillText("+" + text[i], textLocation, 0); //
                     } else if (Array.isArray(text)) {
                         canvasInfo.polarContext.fillText(text[i], textLocation, 0);
                     } else {
                         canvasInfo.polarContext.fillText(text, textLocation, 0);
                     }

                     canvasInfo.polarContext.rotate(angle);
                     canvasInfo.polarContext.translate(0, radius);
                     canvasInfo.polarContext.rotate(-angle);
                     canvasInfo.polarContext.restore();

                     pointCount += 2;
                 }
             }

             canvasInfo.polarContext.restore();
         },

         //**원 내부 육각 그래프 라인 추천 부분 그리기
         drawSizeCompareGraph: function (canvasInfo, locationValue, graphRange, prop) {
             var startAngle = 0 * Math.PI / prop.graphFaceCount;
             var degree = (Math.PI * 2) / prop.graphFaceCount;
             var userGraphStartPointValue = prop.graphRangeValue * graphRange.userGraphLocationVlaue[0];
             var graphStartPointValue = prop.graphRangeValue * graphRange.recommendedGraphLocationVlaue[0];

             canvasInfo.polarContext.save();
             canvasInfo.polarContext.translate(locationValue.canvasHalfWidth - 10, locationValue.canvasHalfWidth + 10);

             drawGraphShape(prop.userGraphColor, userGraphStartPointValue, graphRange.userGraphLocationVlaue, 0);
             drawGraphShape(prop.recommendGraphColor, graphStartPointValue, graphRange.recommendedGraphLocationVlaue, 1);

             function drawGraphShape(textColor, graphPointerValue, locationValue, shapeCount) {
                 canvasInfo.polarContext.save();
                 canvasInfo.polarContext.beginPath();

                 if (shapeCount === 0) {
                     canvasInfo.polarContext.globalAlpha = prop.userSizeGraphGlobalAlpha;
                     canvasInfo.polarContext.fillStyle = textColor;
                 } else if (shapeCount == 1) {
                     canvasInfo.polarContext.strokeStyle = textColor;
                     canvasInfo.polarContext.lineWidth = prop.recommendSizeGraphLineWidth;
                 }

                 canvasInfo.polarContext.translate(10, -10);
                 canvasInfo.polarContext.rotate(startAngle);
                 canvasInfo.polarContext.moveTo(graphPointerValue, 0);

                 for (var i = 1; i < prop.graphFaceCount; i++) {
                     var graphLocationValue = prop.graphRangeValue * locationValue[i];
                     canvasInfo.polarContext.lineTo(graphLocationValue * Math.cos(degree * i), graphLocationValue * Math.sin(degree * i));
                 }
                 canvasInfo.polarContext.closePath();

                 if (shapeCount === 0) {
                     canvasInfo.polarContext.fill();
                 } else if (shapeCount == 1) {
                     canvasInfo.polarContext.stroke();
                 }

                 canvasInfo.polarContext.restore();
             }
         },

         //**사이즈 추천 그래프 내부 사용자 정보 텍스트 (사용자 사이즈 / 키,몸무게)
         drawUserInfoText: function (canvasInfo, prop) {
             var sizeText = Object.keys(recommendedSize);

             canvasInfo.polarContext.save();
             canvasInfo.polarContext.beginPath();
             canvasInfo.polarContext.fillStyle = prop.userInfoFontColor;
             canvasInfo.polarContext.textAlign = prop.userInfoTextAlign;

             canvasInfo.polarContext.translate(10, -30);
             canvasInfo.polarContext.font = (prop.recommendSizeFontSize * prop.fontRatio) + "px " + prop.graphFontStyle + "";
             canvasInfo.polarContext.fillText(sizeText[buttonCount], 0, 0);

             canvasInfo.polarContext.translate(0, 60);
             canvasInfo.polarContext.font = (prop.userInfoFontSize * prop.fontRatio) + "px " + prop.graphFontStyle + "";
             canvasInfo.polarContext.fillText(userBodyInfo.height + "cm / " + userBodyInfo.weight + "kg", 0, 0);
             canvasInfo.polarContext.stroke();
             canvasInfo.polarContext.restore();

             canvasInfo.polarContext.restore();
         },

         //**사이즈 추천 메시지 출력
         setRecommendMessage: function (elId) {
             var message = Object.values(recommendedMessage);
             document.getElementById(elId.recommedMessage).innerHTML = message[buttonCount];
         },

         //**사이즈 추천 변튼 효과 변경
         chageButtonColor: function (elId, prop) {
             var recommendSizeLength = Object.keys(recommendedSize).length;

             if (buttonCount == recommendSizeLength - 1) {
                 document.getElementById(elId.rightButton).style.opacity = prop.buttonOpacity;
                 document.getElementById(elId.rightButtonEvent).style.cursor = prop.buttonCursorOut;
             } else if (buttonCount == -1) {
                 document.getElementById(elId.leftButton).style.opacity = prop.buttonOpacity;
                 document.getElementById(elId.leftButtonEvent).style.cursor = prop.buttonCursorOut;
             } else if (buttonCount === 0) {
                 document.getElementById(elId.leftButton).style.opacity = prop.buttonOpacity;
                 document.getElementById(elId.leftButtonEvent).style.cursor = prop.buttonCursorOut;
             } else {
                 document.getElementById(elId.rightButton).style.opacity = 1;
                 document.getElementById(elId.leftButton).style.opacity = 1;
                 document.getElementById(elId.rightButtonEvent).style.cursor = prop.buttonCursorIn;
                 document.getElementById(elId.leftButtonEvent).style.cursor = prop.buttonCursorIn;
             }
         }

     };

     return drawPolarGraph;

 })();