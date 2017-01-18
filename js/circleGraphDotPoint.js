 var recommendSizeData = {
     recommendSize: 'L',
     isCorrectGender: true,
     recommendRate: 0,
     status: true,
     sizes: ['XS', 'S', 'M', "L", "XL"]
 };


 var CircleGraph = function (elIds, circleGraphProperties) {

     var circleGraphNomalProperties = {
         graphFontStyle: 'Flexo-Medium',
         pointerMeText: 'ME!',
         pointerDotText: '•',
         pointerFitTightText: 'TIGHT',
         pointerFitLooseText: 'LOOSE',
         textMotionValue: 500,
         shadowMotionValue: 100,
         textMotionFrameValue: 15,
         textSize: 16,
         pointerTextSize: 13,
         pointerFitTextSize: 11,
         textColorOut: '#F6F5F3',
         circleColor: '#ffffff',
         pointerColor: '#00FFB0',
         pointerFitColor: '#95D0CC',
         textColorIn: '#20607A',
         shadowColorIn: '#20607A',
         shadowColorOut: '#EDF5DC',
         shadowBlurGene: 10,
         shadowReversalIn: false,
         shadowReversalOut: true,
         textSizeRatio: 2.5,
         ShadowBlurRatio: 2.5,
         radiusLengthValue: 0.8,
         circleColorTextLocationX: 0,
         circleColorTextLocationY: 10,
         motionColorStratValue: 0,
         motionColorIncreaseValue: 0.02
     };

     var recommendSizeTalbe = ['XS', 'S', 'M', "L", "XL"];

     var listLengthCompareValue = {
         zero: 0,
         one: 1,
         two: 2,
         three: 3,
         four: 4,
         five: 5
     };

     var propertyCheck = this.checkGraphProperties(elIds, circleGraphProperties, circleGraphNomalProperties, recommendSizeTalbe, listLengthCompareValue);

 };



 CircleGraph.prototype = {

     //생성자 함수에서 매개변수로 받은 객체값 오류 확인
     checkGraphProperties: function (elIds, circleGraphProperties, circleGraphNomalProperties, recommendSizeTalbe, listLengthCompareValue) {

         var propertyKeys = Object.keys(circleGraphProperties);
         var nomalPropertyKeys = Object.keys(circleGraphNomalProperties);
         var propertyCheckCount = 0;

         for (var i = 0; i < propertyKeys.length; i++) {
             for (var j = 0; j < nomalPropertyKeys.length; j++) {
                 if (propertyKeys[i] == nomalPropertyKeys[j]) {
                     propertyCheckCount++;
                     break;
                 }
             }
         }

         var canvasId = {};
         var circleGraphProperty = {};

         if (nomalPropertyKeys.length == propertyCheckCount) {

             for (var idValue in elIds) {

                 if (typeof elIds === "object" && elIds[idValue] !== null && elIds[idValue] !== undefined && elIds[idValue] !== '') {
                     canvasId[idValue] = elIds[idValue];

                 } else {
                     throw new Error("elIds: Invalid property");

                 }
             }

             for (var propertyValue in circleGraphProperties) {

                 if (typeof circleGraphProperties === "object" && circleGraphProperties[propertyValue] !== null && circleGraphProperties[propertyValue] !== undefined && circleGraphProperties[propertyValue] !== '') {
                     circleGraphProperty[propertyValue] = circleGraphProperties[propertyValue];

                 } else {
                     throw new Error("circleGraphProperties: Invalid property");

                 }
             }

         } else {
             throw new Error("circleGraph() : count of properties is different");

         }

         this.drawCircleGraph(canvasId, recommendSizeData, recommendSizeTalbe, circleGraphProperty, listLengthCompareValue);
     },

     //추천 사이즈 데이터 확인 후 그래프 실행
     drawCircleGraph: function (canvasId, sizeData, sizeTalbe, graphProperties, listCompareValue) {
         var comparedSizeListCount = 0;

         var compareSizeList = (function () {
             for (var i = 0; i < sizeData.sizes.length; i++) {
                 for (var j = 0; j < sizeTalbe.length; j++) {
                     if (sizeTalbe[j] == sizeData.sizes[i]) {
                         comparedSizeListCount++;
                         break;
                     }
                 }
             }
         })();

         var self = this;
         var sizeListData;

         if (comparedSizeListCount == 5 && sizeData.sizes.length <= 5) {
             sizeListData = self.getTextSizeListData(sizeTalbe, graphProperties);
         } else {
             sizeListData = self.getSizeListData(sizeTalbe, graphProperties, listCompareValue);
         }

         var recommendedSizeList = self.getRecommendSizeList(sizeListData, listCompareValue);
         var sizesData = self.getSizeData(recommendedSizeList);
         var rateValue = self.gerRateValue(sizesData, listCompareValue);
         var canvasInfo = self.initCanvas(canvasId);
         var circleGraphLocation = self.calCircleGraphLocation(sizesData, canvasInfo, graphProperties);
         var recommendedSizeLocationValue = self.recommendSizeLocationValue(sizesData, rateValue, listCompareValue);

         self.drawCircleGraphShadow(canvasInfo, sizesData, rateValue, circleGraphLocation, graphProperties, listCompareValue, recommendedSizeLocationValue);
         self.drawCircleGraphText(canvasInfo, sizesData, recommendedSizeList, recommendedSizeLocationValue, circleGraphLocation, graphProperties);
         self.drawCircleGraphColorText(canvasInfo, sizesData, recommendedSizeList, recommendedSizeLocationValue, graphProperties, circleGraphLocation);

     },

     //추천 사이즈 리스트 정보 반환
     getSizeListData: function (sizeTalbe, circleGraphProperty, compareValue) {
         var prop = circleGraphProperty;
         var sizesList = recommendSizeData.sizes;

         if (sizesList.length < compareValue.five) {

             if (sizesList.length == compareValue.four) {
                 sizesList.push(prop.pointerDotText);

             } else if (sizesList.length == compareValue.three) {
                 sizesList.unshift(prop.pointerDotText);
                 sizesList.push(prop.pointerDotText);

             } else if (sizesList.length == compareValue.two) {
                 for (var i = 0; i < 2; i++) {
                     sizesList.unshift(prop.pointerDotText);
                 }
                 sizesList.push(prop.pointerDotText);

             } else if (sizesList.length == compareValue.one) {
                 for (var i = 0; i < 2; i++) {
                     sizesList.unshift(prop.pointerDotText);
                     sizesList.push(prop.pointerDotText);
                 }

             }

             var recommendedSizeListData = {
                 sizesList: sizesList,
                 sizesIndex: sizesList.indexOf(recommendSizeData.recommendSize),
                 sizesLength: sizesList.length
             };

             return recommendedSizeListData;

         } else {
             var recommendedSizeListData = {
                 sizesList: recommendSizeData.sizes,
                 sizesIndex: recommendSizeData.sizes.indexOf(recommendSizeData.recommendSize),
                 sizesLength: recommendSizeData.sizes.length
             };

             return recommendedSizeListData;
         }

     },

     // 사이즈 데이터가 "S, M, L"와 같은 문자일 경우 - 추천 사이즈 리스트와 사이즈 테이블과 비교후 존재하지 않는 사이즈는 "." 텍스트로 변환 후 리스트 반환
     getTextSizeListData: function (sizeTalbe, circleGraphProperty) {
         var prop = circleGraphProperty;
         var recommendedSizeTable = [];

         var checkingSizeTable = sizeTalbe.forEach(function (item, index) {
             recommendedSizeTable.push(item);

             for (var i = 0; i < recommendSizeData.sizes.length; i++) {
                 if (item == recommendSizeData.sizes[i]) {
                     sizeTalbe.splice(index, 1, prop.pointerDotText);
                 }
             }
         });

         var filteredSizeTable = recommendedSizeTable.forEach(function (item, index) {
             for (var i = 0; i < sizeTalbe.length; i++) {

                 if (item == sizeTalbe[i]) {
                     recommendedSizeTable.splice(index, 1, prop.pointerDotText);
                 }

             }
         });

         var recommendedSizeListData = {
             sizesList: recommendedSizeTable,
             sizesIndex: recommendSizeData.sizes.indexOf(recommendSizeData.recommendSize),
             sizesLength: recommendSizeData.sizes.length
         };

         return recommendedSizeListData;
     },

     //화면에 출력 할 추천 사이즈 5개 필터링
     getRecommendSizeList: function (sizeListData, compareValue) {

         var filteredSizeList = sizeListData.sizesList.filter(function (item, index) {

             if (sizeListData.sizesIndex === compareValue.zero) {
                 if (index < sizeListData.sizesIndex + compareValue.five) {
                     return item;
                 }
             } else if (sizeListData.sizesIndex == compareValue.one) {
                 if (index < sizeListData.sizesIndex + compareValue.four) {
                     return item;
                 }
             } else if (sizeListData.sizesIndex == sizeListData.sizesLength - compareValue.one) {
                 if (index > sizeListData.sizesIndex - compareValue.five) {
                     return item;
                 }
             } else if (sizeListData.sizesIndex == sizeListData.sizesLength - compareValue.two) {
                 if (index > sizeListData.sizesIndex - compareValue.four) {
                     return item;
                 }
             } else {
                 if (index > sizeListData.sizesIndex - compareValue.three && index < sizeListData.sizesIndex + compareValue.three) {
                     return item;
                 }
             }
         });

         return filteredSizeList;
     },

     // 애니메이션 효과에 필요한 추천 데이터 반환
     getSizeData: function (recommendedSizeList) {
         var recommendedSizeData = {
             sizeRate: recommendSizeData.recommendRate,
             sizeName: recommendSizeData.recommendSize,
             sizeIndex: recommendedSizeList.indexOf(recommendSizeData.recommendSize),
             totalSizes: recommendedSizeList,
             totalSizesLength: recommendedSizeList.length
         };

         return recommendedSizeData;
     },

     // 추천 사이즈 Rate에 따른 범위 변경을 위한 값 반환
     gerRateValue: function (sizeData, compareValue) {
         if (sizeData.sizeRate >= compareValue.three && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate <= -compareValue.three) {
             return compareValue.one;
         } else {
             return compareValue.zero;
         }
     },

     // 캔버스 초기화
     initCanvas: function (canvasId) {
         var shadowCanvas = document.getElementById(canvasId.canvasShadow);
         var textCanvas = document.getElementById(canvasId.canvasText);
         var shadowContext = shadowCanvas.getContext("2d");
         var textContext = textCanvas.getContext("2d");

         return {
             textCanvas: textCanvas,
             textContext: textContext,
             shadowCanvas: shadowCanvas,
             shadowContext: shadowContext,
         };
     },

     //추천 사이즈 텍스트 정렬 및 애니매이션 효과를 위한 캔버스 내 위치값 계산
     calCircleGraphLocation: function (sizeData, canvasInfo, circleGraphProperty) {
         var calculatedsizeIndex = (Math.PI / 18) * (sizeData.sizeIndex * 6 + 3);
         var canvasHalfWidth = canvasInfo.shadowCanvas.width / 2;
         var radius = canvasInfo.textCanvas.height / 2;
         var pointerRadius = canvasInfo.textCanvas.height / 4;

         return {
             radius: radius,
             pointerRadius: pointerRadius,
             canvasHalfWidth: canvasHalfWidth,
             calculatedsizeIndex: calculatedsizeIndex,
         };
     },

     // 텍스트 컬러효과 및 애니매이션 범위설정을 위한 값 필터링
     recommendSizeLocationValue: function (sizeData, rateValue, compareValue) {
         var recommendedSizePointerValue;
         var recommendedSizePointerText;
         var textLocationValueList = [];
         var listStrainAngleValue = 9;
         var rangeCount = 3;
         var avgCount = 3;

         for (var i = 0; i < 13; i++) {
             textLocationValueList[i] = i + 3;
         }

         var recommendedSizeTextList = textLocationValueList.filter(function (item, index) {
             if (index % avgCount === compareValue.zero) {
                 return item;
             }
         });

         var recommendedSizeRangeList = textLocationValueList.filter(function (item, index) {
             if (index % avgCount !== compareValue.zero) {
                 return item;
             }
         });

         var pointerIndexValue = recommendedSizeTextList.forEach(function (item, index) {
             if (index == sizeData.sizeIndex) {
                 recommendedSizePointerText = item;

                 if (sizeData.sizeRate >= compareValue.zero) {
                     recommendedSizePointerValue = item + rateValue;
                 } else if (sizeData.sizeRate < compareValue.zero) {
                     recommendedSizePointerValue = item - rateValue;
                 }
             }
         });

         var sizeListRange = textLocationValueList.filter(function (item) {
             if (recommendedSizePointerValue - rangeCount < item && item < recommendedSizePointerValue + rangeCount) {
                 return item;
             }

         });

         return {
             sizeListRange: sizeListRange,
             listStrainAngleValue: listStrainAngleValue,
             recommendedSizeTextList: recommendedSizeTextList,
             recommendedSizeRangeList: recommendedSizeRangeList,
             recommendedSizePointerText: recommendedSizePointerText,
             recommendedSizePointerValue: recommendedSizePointerValue
         };
     },

     //background blur 효과 그리기
     drawCircleGraphShadow: function (canvasInfo, sizeData, rateValue, circleGraphLocation, circleGraphProperty, compareValue, recommendedSizeLocationValue) {
         var prop = circleGraphProperty;
         var colorValue = 0;
         var rotateValue = 0.75 + (recommendedSizeLocationValue.recommendedSizePointerValue - 3) * 0.125;

         var BackgroundBlurImg = new Image();
         BackgroundBlurImg.src = "../img/Oval.png";

         var BackgroundBlurInterval = setInterval(function () {
             canvasInfo.shadowContext.save();
             canvasInfo.shadowContext.translate(135 * prop.ShadowBlurRatio, 135 * prop.ShadowBlurRatio);
             canvasInfo.shadowContext.rotate(Math.PI * rotateValue);
             canvasInfo.shadowContext.translate(-135 * prop.ShadowBlurRatio, -135 * prop.ShadowBlurRatio);

             canvasInfo.shadowContext.clearRect(0, 0, canvasInfo.shadowCanvas.width, canvasInfo.shadowCanvas.height);
             canvasInfo.shadowContext.globalAlpha = colorValue;
             canvasInfo.shadowContext.drawImage(BackgroundBlurImg, 20, 20, 250 * prop.ShadowBlurRatio, 250 * prop.ShadowBlurRatio);

             canvasInfo.shadowContext.beginPath();
             canvasInfo.shadowContext.translate(circleGraphLocation.radius + 65, circleGraphLocation.radius + 65);
             canvasInfo.shadowContext.arc(0, 0, circleGraphLocation.radius / 1.05, 0, 2 * Math.PI);
             canvasInfo.shadowContext.globalAlpha = 1;
             canvasInfo.shadowContext.fillStyle = prop.circleColor;
             canvasInfo.shadowContext.fill();
             canvasInfo.shadowContext.restore();

             colorValue += prop.motionColorIncreaseValue + (colorValue / prop.shadowMotionValue * 2);

             if (colorValue > compareValue.one) {
                 clearInterval(BackgroundBlurInterval);
             }

         }, prop.shadowMotionValue);
     },

     //추천 사이즈 범위 내 기본 텍스트 그리기
     drawCircleGraphText: function (canvasInfo, sizeData, recommendedSizeList, recommendedSizeLocationValue, circleGraphLocation, circleGraphProperty) {
         var prop = circleGraphProperty;
         var location = circleGraphLocation;
         var angleValue = recommendedSizeLocationValue.listStrainAngleValue;
         var sizeListLength = recommendedSizeLocationValue.recommendedSizeTextList.length;
         var dotListLength = recommendedSizeLocationValue.recommendedSizeRangeList.length;
         var labelCount = 0;

         canvasInfo.textContext.translate(location.radius, location.radius);
         location.radius = location.radius * prop.radiusLengthValue;

         canvasInfo.textContext.beginPath();
         canvasInfo.textContext.arc(0, 0, location.radius / 1.05, 0, 2 * Math.PI);
         canvasInfo.textContext.fillStyle = prop.circleColor;
         canvasInfo.textContext.fill();

         var drawTextGraph = function (angle, text, sizeAvg) {
             canvasInfo.textContext.rotate(angle);
             canvasInfo.textContext.translate(0, -location.radius * prop.radiusLengthValue);
             canvasInfo.textContext.rotate(-angle);

             canvasInfo.textContext.textAlign = "center";
             canvasInfo.textContext.font = prop.textSize * prop.textSizeRatio / sizeAvg + "px " + circleGraphProperty.graphFontStyle + "";
             canvasInfo.textContext.fillStyle = prop.textColorOut;
             canvasInfo.textContext.fillText(text, prop.circleColorTextLocationX, prop.circleColorTextLocationY);

             canvasInfo.textContext.rotate(angle);
             canvasInfo.textContext.translate(0, location.radius * prop.radiusLengthValue);
             canvasInfo.textContext.rotate(-angle);
         };

         for (var i = 0; i < sizeListLength; i++) {
             var sizeTextAngle = (recommendedSizeLocationValue.recommendedSizeTextList[i] + angleValue) * Math.PI / angleValue;
             drawTextGraph(sizeTextAngle, recommendedSizeList[labelCount], 1);
             labelCount++;
         }

         for (var j = 0; j < dotListLength; j++) {
             var dotTextAngle = (recommendedSizeLocationValue.recommendedSizeRangeList[j] + angleValue) * Math.PI / angleValue;
             drawTextGraph(dotTextAngle, "●", 3);
         }
     },

     //추천 사이즈 범위 내 컬러 텍스트, 포인터 텍스트 그리기
     drawCircleGraphColorText: function (canvasInfo, sizeData, recommendedSizeList, recommendedSizeLocationValue, circleGraphProperty, circleGraphLocation) {
         var prop = circleGraphProperty;
         var locationValue = recommendedSizeLocationValue;
         var angleValue = recommendedSizeLocationValue.listStrainAngleValue;
         var pointerText = recommendedSizeLocationValue.recommendedSizePointerText;
         var pointerLocationValueY = 15;
         var rotateLength = 1.83;
         var intervalStopCount = 0;
         var pointerTextCount = 0;
         var intervalCount = 0;

         var colorTextInterval = setInterval(function () {
             var circleLocationValue = locationValue.sizeListRange[intervalCount];
             var colorTextAngle = (circleLocationValue + angleValue) * Math.PI / angleValue;
             var colorTextIndex = locationValue.recommendedSizeTextList.indexOf(pointerText);
             var pointerAngle = (pointerText + angleValue) * Math.PI / angleValue;
             var pointerMeAngle = (locationValue.recommendedSizePointerValue + angleValue) * Math.PI / angleValue;

             var sizeTextLocation = locationValue.recommendedSizeTextList.filter(function (item) {
                 if (circleLocationValue == item) {
                     return item;
                 }
             });

             if (circleLocationValue && intervalCount < 5) {
                 var textIndex = locationValue.recommendedSizeTextList.indexOf(circleLocationValue);
                 drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                 if (sizeData.sizeIndex < 4) {
                     drawFitTextGraph(prop.pointerFitLooseText, 2, angleValue, rotateLength, prop.pointerFitTextSize, pointerLocationValueY);
                 }
                 if (sizeData.sizeIndex > 0) {
                     drawFitTextGraph(prop.pointerFitTightText, -2, angleValue, rotateLength, prop.pointerFitTextSize, pointerLocationValueY);
                 }
                 intervalCount++;

             } else {
                 pointerTextCount++;

             }

             if (pointerTextCount == 1) {
                 drawPointTextGraph(prop.pointerMeText, pointerMeAngle, rotateLength, prop.pointerTextSize, pointerLocationValueY);
                 intervalStopCount++;

             } else if (pointerTextCount == 2) {
                 drawPointTextGraph(recommendedSizeList[colorTextIndex], pointerAngle, 1.28, prop.textSize, 0);
                 clearInterval(colorTextInterval);

             }
         }, prop.textMotionValue);

         function drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle, intervalCount) {
             var colorValue = prop.motionColorStratValue;
             var textInterval = setInterval(function () {

                 canvasInfo.textContext.rotate(colorTextAngle);
                 canvasInfo.textContext.translate(0, -circleGraphLocation.radius * prop.radiusLengthValue);
                 canvasInfo.textContext.rotate(-colorTextAngle);
                 canvasInfo.textContext.fillStyle = prop.textColorIn;

                 if (circleLocationValue == sizeTextLocation) {
                     canvasInfo.textContext.globalAlpha = colorValue;
                     canvasInfo.textContext.clearRect(-25, -25, 50, 45);
                     canvasInfo.textContext.font = prop.textSize * prop.textSizeRatio + "px " + prop.graphFontStyle + "";
                     canvasInfo.textContext.fillText(recommendedSizeList[textIndex], prop.circleColorTextLocationX, prop.circleColorTextLocationY);

                 } else {
                     canvasInfo.textContext.globalAlpha = colorValue;
                     canvasInfo.textContext.clearRect(-colorTextAngle - 5, -colorTextAngle, 20, 20);
                     canvasInfo.textContext.font = prop.textSize * prop.textSizeRatio / 3 + "px " + prop.graphFontStyle + "";
                     canvasInfo.textContext.fillText("●", prop.circleColorTextLocationX, prop.circleColorTextLocationY);

                 }
                 canvasInfo.textContext.rotate(colorTextAngle);
                 canvasInfo.textContext.translate(0, circleGraphLocation.radius * prop.radiusLengthValue);
                 canvasInfo.textContext.rotate(-colorTextAngle);

                 colorValue += prop.motionColorIncreaseValue + colorValue / prop.textMotionFrameValue / 3;

                 if (colorValue > 1) {
                     clearInterval(textInterval);
                 }

             }, prop.textMotionFrameValue);
         };

         function drawPointTextGraph(text, angle, radius, textSize, increasValue) {
             var colorValue = prop.motionColorStratValue;

             var textInterval = setInterval(function () {
                 canvasInfo.textContext.rotate(angle);
                 canvasInfo.textContext.translate(0, -circleGraphLocation.pointerRadius * radius);
                 canvasInfo.textContext.rotate(-angle);

                 canvasInfo.textContext.clearRect(-25, -25, 50, 45);
                 canvasInfo.textContext.font = textSize * prop.textSizeRatio + "px " + prop.graphFontStyle + "";
                 canvasInfo.textContext.globalAlpha = colorValue;
                 canvasInfo.textContext.fillStyle = prop.pointerColor;
                 canvasInfo.textContext.fillText(text, prop.circleColorTextLocationX, prop.circleColorTextLocationY + increasValue);

                 canvasInfo.textContext.rotate(angle);
                 canvasInfo.textContext.translate(0, circleGraphLocation.pointerRadius * radius);
                 canvasInfo.textContext.rotate(-angle);

                 colorValue += prop.motionColorIncreaseValue + colorValue / prop.textMotionFrameValue / 3;

                 if (colorValue > 1) {
                     clearInterval(textInterval);
                 }

             }, prop.textMotionFrameValue);
         };

         function drawFitTextGraph(text, angleRangeValue, angleValue, radius, textSize, increasValue) {
             var pointerFitAngle = (locationValue.recommendedSizePointerValue + angleRangeValue + angleValue) * Math.PI / angleValue;

             canvasInfo.textContext.rotate(pointerFitAngle);
             canvasInfo.textContext.translate(0, -circleGraphLocation.pointerRadius * radius);
             canvasInfo.textContext.rotate(-pointerFitAngle);

             canvasInfo.textContext.clearRect(-35, 0, 70, 30);
             canvasInfo.textContext.font = textSize * prop.textSizeRatio + "px " + prop.graphFontStyle + "";
             canvasInfo.textContext.fillStyle = prop.pointerFitColor;
             canvasInfo.textContext.fillText(text, prop.circleColorTextLocationX, prop.circleColorTextLocationY + increasValue);

             canvasInfo.textContext.rotate(pointerFitAngle);
             canvasInfo.textContext.translate(0, circleGraphLocation.pointerRadius * radius);
             canvasInfo.textContext.rotate(-pointerFitAngle);
         };

     },

 };