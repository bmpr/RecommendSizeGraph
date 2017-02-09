var CircleGraph = (function () {

    var recommendedSizeData = {};
    var canvasId = {};
    var circleGraphProperty = {};
    var recommendSizeTable;
    var listLengthCompareValue;
    var graphEventValue;
    var pageCount = 0;
    var defaultSizeData;

    var CircleGraph = function (elIds, circleGraphProperties) {
        var circleGraphNormalProperties = {
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

        defaultSizeData = {
            recommendSize: '•',
            isCorrectGender: true,
            recommendRate: 0,
            status: true,
            sizes: ['•', '•', '•', '•', '•', '•']
        };

        recommendSizeTable = ['XS', 'S', 'M', "L", "XL"];

        listLengthCompareValue = {
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5
        };

        var normalPropertyKeys = Object.keys(circleGraphNormalProperties);
        var propertyCheckCount = 0;

        for (var value in circleGraphProperties) {

            if (circleGraphNormalProperties.hasOwnProperty(value)) {
                propertyCheckCount++;

            }
        }

        if (normalPropertyKeys.length == propertyCheckCount) {

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

        var defaultGraph = this.drawDefaultGraph();
    };


    CircleGraph.prototype = {

        drawDefaultGraph: function () {
            var canvasInfo = this.initCanvas(canvasId);
            canvasInfo.textContext.save();
            this.drawCircleGraph(canvasId, defaultSizeData, recommendSizeTable, circleGraphProperty, listLengthCompareValue);
            canvasInfo.textContext.restore();
        },

        //**그래프 효과 실행
        runGraphColorEffect: function (dataValues) {
            var dataValueCount = 0;
            for (var i = 0; i < dataValues.sizes.length; i++) {
                if (dataValues.sizes[i] == dataValues.recommendSize) {
                    dataValueCount++;
                    break;
                }
            }

            if (dataValueCount == 0) {
                throw new Error("Recommended size There is a problem with the server data value");
            }

            for (var value in dataValues) {

                if (typeof dataValues === "object" && dataValues[value] !== null && dataValues[value] !== undefined && dataValues[value] !== '') {
                    recommendedSizeData[value] = dataValues[value];

                } else {
                    throw new Error("elIds: Invalid property");

                }
            }        
            
            graphEventValue = this.drawCircleGraph(canvasId, recommendedSizeData, recommendSizeTable, circleGraphProperty, listLengthCompareValue);            
            
            var graphShadow = this.drawCircleGraphShadow(graphEventValue.canvasInfo, graphEventValue.rateValue, graphEventValue.circleGraphLocation, graphEventValue.graphProperties, graphEventValue.listCompareValue, graphEventValue.recommendedSizeLocationValue);

            
            var graphColorText = this.drawCircleGraphColorText(graphEventValue.canvasInfo, graphEventValue.sizesData, graphEventValue.recommendedSizeList, graphEventValue.recommendedSizeLocationValue, graphEventValue.graphProperties, graphEventValue.circleGraphLocation);
                        
        },

        //**그래프 효과 리셋
        clearGraphColorEffect: function () {
            var stopGraph = this.clearCircleGraph(graphEventValue.canvasInfo, graphEventValue.circleGraphLocation, graphEventValue.graphProperties, canvasId,
                recommendedSizeData, recommendSizeTable, circleGraphProperty, listLengthCompareValue);

        },

        //**그래프 컬러 효과 지우기
        clearCircleGraph: function (canvasInfo, circleGraphLocation, graphProperties, canvasId, recommendedSizeData, recommendSizeTable, circleGraphProperty, listLengthCompareValue) {

            canvasInfo.textContext.save();
            canvasInfo.textContext.clearRect(-circleGraphLocation.canvasHalfWidth, -circleGraphLocation.canvasHalfWidth, canvasInfo.textCanvas.width, canvasInfo.textCanvas.width);
            canvasInfo.textContext.restore();

            canvasInfo.shadowContext.save();
            canvasInfo.shadowContext.clearRect(0, 0, canvasInfo.shadowCanvas.width, canvasInfo.shadowCanvas.width);
            canvasInfo.shadowContext.restore();

            canvasInfo.textContext.save();            
            canvasInfo.textContext.translate(-circleGraphLocation.canvasHalfWidth, -circleGraphLocation.canvasHalfWidth);            
            canvasInfo.textContext.globalAlpha = 1;
            
            this.drawCircleGraph(canvasId, recommendedSizeData, recommendSizeTable, circleGraphProperty, listLengthCompareValue);
            canvasInfo.textContext.restore();
        },

        //**추천 사이즈 데이터 확인 후 그래프 실행
        // - 추천 사이즈 종류(S,M/80,90..) 및 리스트 개수 확인 후 조건에 맞는 그래프 함수 실행
        drawCircleGraph: function (canvasId, recommendedSizeData, sizeTable, graphProperties, listCompareValue) {
            var comparedSizeListCount = 0;

            var compareSizeList = (function () {
                for (var i = 0; i < recommendedSizeData.sizes.length; i++) {
                    for (var j = 0; j < sizeTable.length; j++) {
                        if (sizeTable[j] == recommendedSizeData.sizes[i]) {
                            comparedSizeListCount++;
                            break;
                        }
                    }
                }
            })();

            var self = this;
            var sizeListData;

            if (comparedSizeListCount == 5 && recommendedSizeData.sizes.length <= 5) {
                sizeListData = self.getTextSizeListData(recommendedSizeData, sizeTable, graphProperties);
            } else {
                sizeListData = self.getSizeListData(recommendedSizeData, graphProperties, listCompareValue);
            }

            var recommendedSizeList = self.getRecommendSizeList(sizeListData, listCompareValue);
            var sizesData = self.getSizeData(recommendedSizeList, recommendedSizeData);
            var rateValue = self.gerRateValue(sizesData, listCompareValue);
            var canvasInfo = self.initCanvas(canvasId);
            var circleGraphLocation = self.calCircleGraphLocation(sizesData, canvasInfo, graphProperties);
            var recommendedSizeLocationValue = self.recommendSizeLocationValue(sizesData, rateValue, listCompareValue);

            self.drawCircleGraphText(canvasInfo, recommendedSizeList, recommendedSizeLocationValue, circleGraphLocation, graphProperties);

            pageCount = 1;

            return {
                canvasInfo: canvasInfo,
                sizesData: sizesData,
                rateValue: rateValue,
                graphProperties: graphProperties,
                listCompareValue: listCompareValue,
                circleGraphLocation: circleGraphLocation,
                recommendedSizeList: recommendedSizeList,
                recommendedSizeLocationValue: recommendedSizeLocationValue
            }
        },

        //**추천 사이즈 리스트 정보 반환 - A
        // - recommendSizeTable 값과 같고 고정 리스트 5보다 이하 시 "."문자 삽입 후 리스트 정보 반환
        getSizeListData: function (sizeData, circleGraphProperty, compareValue) {
            var prop = circleGraphProperty;
            var sizesList = sizeData.sizes;

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
                    sizesIndex: sizesList.indexOf(sizeData.recommendSize),
                    sizesLength: sizesList.length
                };

                return recommendedSizeListData;

            } else {
                var recommendedSizeListData = {
                    sizesList: sizeData.sizes,
                    sizesIndex: sizeData.sizes.indexOf(sizeData.recommendSize),
                    sizesLength: sizeData.sizes.length
                };

                return recommendedSizeListData;
            }

        },

        //**추천 사이즈 리스트 정보 반환 - B
        // - 사이즈 데이터 개수 5보다 초과 이거나 recommendSizeTable 값과 다를 경우 리스트 정보 반환
        // - recommendSizeTable 값과 다르면서 리스트 5미만 시 "."문자 삽입 후 리스트 정보 반환
        getTextSizeListData: function (sizeData, sizeTable, circleGraphProperty) {
            var prop = circleGraphProperty;
            var recommendedSizeTable = [];

            var checkingSizeTable = sizeTable.forEach(function (item, index) {
                recommendedSizeTable.push(item);

                for (var i = 0; i < sizeData.sizes.length; i++) {
                    if (item == sizeData.sizes[i]) {
                        sizeTable.splice(index, 1, prop.pointerDotText);
                    }
                }
            });

            var filteredSizeTable = recommendedSizeTable.forEach(function (item, index) {
                for (var i = 0; i < sizeTable.length; i++) {

                    if (item == sizeTable[i]) {
                        recommendedSizeTable.splice(index, 1, prop.pointerDotText);
                    }

                }
            });

            var recommendedSizeListData = {
                sizesList: recommendedSizeTable,
                sizesIndex: sizeData.sizes.indexOf(sizeData.recommendSize),
                sizesLength: sizeData.sizes.length
            };

            return recommendedSizeListData;
        },

        //**화면에 출력 할 추천 사이즈 개수 5만큼 리스트 반환
        // - 추천 된 사이즈 리스트 내 추천사이즈 인덱스 값을 기준으로 리스트 정렬
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

        //**애니메이션 효과에 필요한 추천된 데이터 값 반환
        getSizeData: function (recommendedSizeList, sizeData) {
            var recommendedSizeData = {
                sizeRate: sizeData.recommendRate,
                sizeName: sizeData.recommendSize,
                sizeIndex: recommendedSizeList.indexOf(sizeData.recommendSize),
                totalSizes: recommendedSizeList,
                totalSizesLength: recommendedSizeList.length
            };

            return recommendedSizeData;
        },

        //**추천 사이즈 Rate(상세수치)에 따른 범위 변경을 위한 값 반환
        gerRateValue: function (sizeData, compareValue) {
            if (sizeData.sizeRate >= compareValue.three && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate <= -compareValue.three) {
                return compareValue.one;
            } else {
                return compareValue.zero;
            }
        },

        //**캔버스 초기화
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

        //**추천 사이즈 텍스트 정렬 및 애니매이션 효과를 위한 캔버스 내 위치값 계산
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

        //**텍스트 컬러효과 및 애니매이션 범위설정을 위한 값 필터링
        // - 그래프 내 모든 텍스트 위치값 & 사이즈 텍스트 & 추천사이즈 외(".") & 컬러 사이즈 텍스트 & 포인트 텍스트 _위치값 필터링 후 반환     
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

        //**background blur 이미지 효과 그리기
        drawCircleGraphShadow: function (canvasInfo, rateValue, circleGraphLocation, circleGraphProperty, compareValue, recommendedSizeLocationValue) {
            var prop = circleGraphProperty;
            var colorValue = 0;
            var rotateValue = 0.75 + (recommendedSizeLocationValue.recommendedSizePointerValue - 3) * 0.125;

            var BackgroundBlurImg = new Image();
            BackgroundBlurImg.src = "../img/Oval.png";

            //blur 이미지 애니매이션 실행
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

        //추천 사이즈 범위 내 모든 텍스트 그리기(noColor)
        drawCircleGraphText: function (canvasInfo, recommendedSizeList, recommendedSizeLocationValue, circleGraphLocation, circleGraphProperty) {

            var prop = circleGraphProperty;
            var location = circleGraphLocation;
            var angleValue = recommendedSizeLocationValue.listStrainAngleValue;
            var sizeListLength = recommendedSizeLocationValue.recommendedSizeTextList.length;
            var dotListLength = recommendedSizeLocationValue.recommendedSizeRangeList.length;
            var labelCount = 0;

            canvasInfo.textContext.translate(location.radius, location.radius);
            location.radius = location.radius * prop.radiusLengthValue;

            canvasInfo.textContext.save();
            canvasInfo.textContext.clearRect(0, 0, canvasInfo.textCanvas.width, canvasInfo.textCanvas.height);
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
            canvasInfo.textContext.restore();

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

        //추천 사이즈 범위 내 컬러 텍스트, 포인터 텍스트, 핏(loose, tight) 텍스트 그리기
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


            // 컬러,포인터 텍스트 애니매이션 실행
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

            //컬러 텍스트 그리기
            function drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle) {
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

            //포인터 텍스트 그리기
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

            //핏(loose, tight) 텍스트 그리기
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

    return CircleGraph;
})();