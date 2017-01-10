var recommendSizeData = {
    recommendSize: 'M',
    isCorrectGender: true,
    recommendRate: 0,
    status: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
};


var CircleGraph = function (elIds, circleGraphProperties) {
    var canvasId = {};
    var circleGraphProperty = {};

    var circleGraphNomalProperties = {
        textMotionValue: 300,
        shadowMotionValue: 100,
        shadowBlurGene: 60,
        textSize: 16,
        textColor: '#F6F5F3',
        brightTextColor: '#20607A',
        pointerText: 'ME!',
        pointerSize: 14,
        pointerTextColor: '#00FFB0',
        circleColor: '#ffffff',
        shadowReversalIn: false,
        shadowReversalOut: true,
        textSizeRatio: 2.5
    };

    for (var value in elIds) {
        if (typeof elIds === "object" && elIds[value] !== null && elIds[value] !== undefined) {
            canvasId[value] = elIds[value];
        }
    }

    for (var value in circleGraphProperties) {
        if (typeof circleGraphProperties === "object" && circleGraphProperties[value] !== null && circleGraphProperties[value] !== undefined) {
            circleGraphProperty[value] = circleGraphProperties[value];
        } else if (typeof circleGraphProperties !== "object" || circleGraphProperties[value] == null || circleGraphProperties[value] == undefined) {
            circleGraphProperty[value] = circleGraphNomalProperties[value];
        }
    }

    var self = this;

    return (function () {
        var sizeListData = self.getSizeListData();
        var recommendedSizeList = self.getRecommendSizeList(sizeListData);
        var sizeData = self.getSizeData(recommendedSizeList);
        var rateValue = self.gerRateValue(sizeData);
        var canvasInfo = self.initCanvas(canvasId);
        var circleGraphLocation = self.calCircleGraphLocation(sizeData, canvasInfo, circleGraphProperty);
        var recommendedSizeLocationValue = self.recommendSizeLocationValue(sizeData, rateValue);

        self.drawCircleGraphShadow(canvasInfo, sizeData, rateValue, circleGraphLocation, circleGraphProperty);
        self.drawCircleGraphText(canvasInfo, recommendedSizeList, recommendedSizeLocationValue, circleGraphLocation, circleGraphProperty);
        self.drawCircleGraphColorText(canvasInfo, sizeData, recommendedSizeList, recommendedSizeLocationValue, circleGraphProperty, circleGraphLocation);
    })();

};


CircleGraph.prototype = {


    getSizeListData: function () {
        var recommendedSizeListData = {
            sizesList: recommendSizeData.sizes,
            sizesIndex: recommendSizeData.sizes.indexOf(recommendSizeData.recommendSize),
            sizesLength: recommendSizeData.sizes.length
        };
        return recommendedSizeListData;
    },


    getRecommendSizeList: function (sizeListData) {
        var filteredSizeList = sizeListData.sizesList.filter(function (item, index) {

            if (sizeListData.sizesIndex === 0) {
                if (index < sizeListData.sizesIndex + 5) {
                    return item;
                }
            } else if (sizeListData.sizesIndex == 1) {
                if (index < sizeListData.sizesIndex + 4) {
                    return item;
                }
            } else if (sizeListData.sizesIndex == sizeListData.sizesLength - 1) {
                if (index > sizeListData.sizesIndex - 5) {
                    return item;
                }
            } else if (sizeListData.sizesIndex == sizeListData.sizesLength - 2) {
                if (index > sizeListData.sizesIndex - 4) {
                    return item;
                }
            } else {
                if (index > sizeListData.sizesIndex - 3 && index < sizeListData.sizesIndex + 3) {
                    return item;
                }
            }
        });
        return filteredSizeList;
    },


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


    gerRateValue: function (sizeData) {
        if (sizeData.totalSizesLength >= 5) {

            if (sizeData.sizeRate >= 3 && sizeData.sizeRate > 0 || sizeData.sizeRate < 0 && sizeData.sizeRate <= -3) {
                return 1;
            } else {
                return 0;
            }

        } else if (sizeData.totalSizesLength == 4) {

            if (sizeData.sizeRate <= 3 && sizeData.sizeRate > 0 || sizeData.sizeRate < 0 && sizeData.sizeRate >= -3) {
                return 1;
            } else if (sizeData.sizeRate >= 4 && sizeData.sizeRate > 0 || sizeData.sizeRate < 0 && sizeData.sizeRate <= -4) {
                return 2;
            } else {
                return 0;
            }

        } else if (sizeData.totalSizesLength == 3) {

            if (sizeData.sizeRate <= 2 && sizeData.sizeRate > 0 || sizeData.sizeRate < 0 && sizeData.sizeRate >= -2) {
                return 1;
            } else if (sizeData.sizeRate == 3 && sizeData.sizeRate > 0 || sizeData.sizeRate < 0 && sizeData.sizeRate == -3) {
                return 2;
            } else if (sizeData.sizeRate >= 4 && sizeData.sizeRate > 0 || sizeData.sizeRate < 0 && sizeData.sizeRate <= -4) {
                return 3;
            } else {
                return 0;
            }

        } else if (sizeData.totalSizesLength == 2) {

            if (sizeData.sizeRate > 0) {
                return sizeData.sizeRate;
            } else if (sizeData.sizeRate < 0) {
                return -sizeData.sizeRate;
            } else {
                return sizeData.sizeRate;
            }

        }
    },


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


    calCircleGraphLocation: function (sizeData, canvasInfo, circleGraphProperty) {
        var piePieceAllMotion = 18 * circleGraphProperty.shadowMotionValue;
        var piePieceCount = 5;

        if (sizeData.totalSizesLength == 3) {
            piePieceCount += 2;
        } else if (sizeData.totalSizesLength == 2) {
            piePieceCount += 5;
        }

        var piePieceMotion = piePieceCount * circleGraphProperty.shadowMotionValue;
        var radian = ((2 * Math.PI) / piePieceAllMotion) * piePieceMotion;
        var calculatedsizeIndex = (Math.PI / 18) * (sizeData.sizeIndex * 6 + 3);

        var canvasHalfWidth = canvasInfo.shadowCanvas.width / 2;
        var radius = canvasInfo.textCanvas.height / 2;
        var pointerRadius = canvasInfo.textCanvas.height / 4;

        return {
            canvasHalfWidth: canvasHalfWidth,
            radian: radian,
            radius: radius,
            pointerRadius: pointerRadius,
            calculatedsizeIndex: calculatedsizeIndex,
        };
    },


    recommendSizeLocationValue: function (sizeData, rateValue) {
        var recommendedSizePointerValue;
        var recommendedSizePointerText;
        var textLocationValueList = [];
        var rangeCount = 3;
        var avgCount = 3;

        for (var i = 0; i < 13; i++) {
            textLocationValueList[i] = i + 3;
        }

        if (sizeData.totalSizesLength == 4) {
            avgCount = 4;
        } else if (sizeData.totalSizesLength == 3) {
            rangeCount = 4;
            avgCount = 6;
        } else if (sizeData.totalSizesLength == 2) {
            rangeCount = 6;
            avgCount = 12;
        }

        var recommendedSizeTextList = textLocationValueList.filter(function (item, index) {
            if (index % avgCount === 0) {
                return item;
            }
        });

        var recommendedSizeRangeList = textLocationValueList.filter(function (item, index) {
            if (index % avgCount !== 0) {
                return item;
            }
        });

        var pointerIndexValue = recommendedSizeTextList.forEach(function (item, index) {
            if (index == sizeData.sizeIndex) {
                recommendedSizePointerText = item;

                if (sizeData.sizeRate >= 0) {
                    recommendedSizePointerValue = item + rateValue;
                } else if (sizeData.sizeRate < 0) {
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
            recommendedSizeTextList: recommendedSizeTextList,
            recommendedSizeRangeList: recommendedSizeRangeList,
            recommendedSizePointerText: recommendedSizePointerText,
            recommendedSizePointerValue: recommendedSizePointerValue
        }

    },


    drawCircleGraphShadow: function (canvasInfo, sizeData, rateValue, circleGraphLocation, circleGraphProperty) {
        var startPoint;
        var startLocationValue = 0.39;
        var blurValue = 0;
        var increaseCount = rateValue / 10;

        if (sizeData.totalSizesLength == 4) {
            startLocationValue += 0.02 + (0.1 * sizeData.sizeIndex);
        } else if (sizeData.totalSizesLength == 3) {
            startLocationValue -= 0.11;
            startLocationValue += (0.33 * sizeData.sizeIndex);
        } else if (sizeData.totalSizesLength == 2) {
            startLocationValue -= 0.21;
            startLocationValue += (0.87 * sizeData.sizeIndex);
        }

        if (sizeData.sizeRate > 0) {
            startLocationValue += increaseCount;
        } else if (sizeData.sizeRate < 0) {
            startLocationValue -= increaseCount;
        }

        startPoint = (startLocationValue * Math.PI) + circleGraphLocation.calculatedsizeIndex;

        var pieGraphInterval = setInterval(function () {
            canvasInfo.shadowContext.clearRect(0, 0, canvasInfo.shadowCanvas.width, canvasInfo.shadowCanvas.height);

            drawShadowGraph(startPoint, circleGraphProperty.shadowReversalIn, "rgba(32,96,122," + blurValue + ")");
            drawShadowGraph(startPoint, circleGraphProperty.shadowReversalOut, "rgba(227,237,168," + blurValue + ")");

            canvasInfo.shadowContext.beginPath();
            canvasInfo.shadowContext.arc(circleGraphLocation.canvasHalfWidth, circleGraphLocation.canvasHalfWidth, circleGraphLocation.canvasHalfWidth / 1.32, 0, 2 * Math.PI);
            canvasInfo.shadowContext.shadowBlur = 0;
            canvasInfo.shadowContext.fillStyle = circleGraphProperty.circleColor;
            canvasInfo.shadowContext.fill();

            blurValue += 0.01 + (blurValue / circleGraphProperty.shadowMotionValue * 2);

            if (blurValue > 1) {
                clearInterval(pieGraphInterval);
            }
        }, circleGraphProperty.shadowMotionValue);

        var drawShadowGraph = function (startLine, reversal, shadowColor) {
            canvasInfo.shadowContext.beginPath();
            canvasInfo.shadowContext.moveTo(circleGraphLocation.canvasHalfWidth, circleGraphLocation.canvasHalfWidth);
            canvasInfo.shadowContext.arc(circleGraphLocation.canvasHalfWidth, circleGraphLocation.canvasHalfWidth, circleGraphLocation.canvasHalfWidth / 1.32, startLine, startLine + circleGraphLocation.radian, reversal);
            canvasInfo.shadowContext.shadowColor = shadowColor;
            canvasInfo.shadowContext.shadowBlur = circleGraphProperty.shadowBlurGene;
            canvasInfo.shadowContext.closePath();
            canvasInfo.shadowContext.fillStyle = circleGraphProperty.circleColor;
            canvasInfo.shadowContext.fill();
        };

    },


    drawCircleGraphText: function (canvasInfo, recommendedSizeList, recommendedSizeLocationValue, circleGraphLocation, circleGraphProperty) { //
        var sizeListLength = recommendedSizeLocationValue.recommendedSizeTextList.length;
        var dotListLength = recommendedSizeLocationValue.recommendedSizeRangeList.length;
        var labelCount = 0;

        canvasInfo.textContext.translate(circleGraphLocation.radius, circleGraphLocation.radius);
        circleGraphLocation.radius = circleGraphLocation.radius * 0.8;

        canvasInfo.textContext.beginPath();
        canvasInfo.textContext.arc(0, 0, circleGraphLocation.radius / 1.05, 0, 2 * Math.PI);
        canvasInfo.textContext.fillStyle = circleGraphProperty.circleColor;
        canvasInfo.textContext.fill();

        canvasInfo.textContext.textAlign = "center";
        canvasInfo.textContext.fillStyle = circleGraphProperty.textColor;

        var drawTextGraph = function (angle, text, sizeAvg) {
            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, -circleGraphLocation.radius * 0.8);
            canvasInfo.textContext.rotate(-angle);

            canvasInfo.textContext.font = "" + circleGraphProperty.textSize * circleGraphProperty.textSizeRatio / sizeAvg + "px arial";
            canvasInfo.textContext.fillText(text, 0, 0);

            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, circleGraphLocation.radius * 0.8);
            canvasInfo.textContext.rotate(-angle);
        }

        for (var i = 0; i < sizeListLength; i++) {
            var sizeTextAngle = (recommendedSizeLocationValue.recommendedSizeTextList[i] + 9) * Math.PI / 9;

            drawTextGraph(sizeTextAngle, recommendedSizeList[labelCount], 1);
            labelCount++;
        }

        for (var i = 0; i < dotListLength; i++) {
            var dotTextAngle = (recommendedSizeLocationValue.recommendedSizeRangeList[i] + 9) * Math.PI / 9;

            drawTextGraph(dotTextAngle, "●", 2);
        }

    },


    drawCircleGraphColorText: function (canvasInfo, sizeData, recommendedSizeList, recommendedSizeLocationValue, circleGraphProperty, circleGraphLocation) {
        var intervalCount = 0;
        var pointerTextCount = 0;
        var intervalStopCount = 0;

        var colorTextInterval = setInterval(function () {

            var circleLocationValue = recommendedSizeLocationValue.sizeListRange[intervalCount];
            var pointerAngle = (recommendedSizeLocationValue.recommendedSizePointerText + 9) * Math.PI / 9;
            var pointerMeAngle = (recommendedSizeLocationValue.recommendedSizePointerValue + 9) * Math.PI / 9;
            var colorTextAngle = (circleLocationValue + 9) * Math.PI / 9;
            var colorTextIndex = recommendedSizeLocationValue.recommendedSizeTextList.indexOf(recommendedSizeLocationValue.recommendedSizePointerText);

            var sizeTextLocation = recommendedSizeLocationValue.recommendedSizeTextList.filter(function (item) {
                if (circleLocationValue == item) {
                    return item;
                }
            });

            canvasInfo.textContext.rotate(colorTextAngle);
            canvasInfo.textContext.translate(0, -circleGraphLocation.radius * 0.8);
            canvasInfo.textContext.rotate(-colorTextAngle);


            if (circleLocationValue) {
                var textIndex = recommendedSizeLocationValue.recommendedSizeTextList.indexOf(circleLocationValue);

                if (sizeData.totalSizesLength == 2 && intervalCount < 13) {
                    drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                } else if (sizeData.totalSizesLength == 3 && intervalCount < 7) {
                    drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                } else if (intervalCount < 5) {
                    drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                }

                canvasInfo.textContext.rotate(colorTextAngle);
                canvasInfo.textContext.translate(0, circleGraphLocation.radius * 0.8);
                canvasInfo.textContext.rotate(-colorTextAngle);

                intervalCount++;

            } else {
                pointerTextCount++;

            }

            if (pointerTextCount == 1) {
                drawPointTextGraph(circleGraphProperty.pointerText, pointerMeAngle, 1.85, circleGraphProperty.pointerSize, 10);
                console.log(pointerMeAngle)
                intervalStopCount++;

            } else if (intervalStopCount == 1) { 
                drawPointTextGraph(recommendedSizeList[colorTextIndex], pointerAngle, 1.28, circleGraphProperty.textSize, 0);
                clearInterval(colorTextInterval);
                console.log(pointerAngle)

            }


        }, circleGraphProperty.textMotionValue);


        var drawColorTextGraph = function (circleLocationValue, sizeTextLocation, textIndex, colorTextAngle) {       
            var motionValue = 15;
            var colorValue = 0;
            var textInterval = setInterval(function () {

                canvasInfo.textContext.rotate(colorTextAngle);
                canvasInfo.textContext.translate(0, -circleGraphLocation.radius * 0.8);
                canvasInfo.textContext.rotate(-colorTextAngle);

                if (circleLocationValue == sizeTextLocation) {
//                    canvasInfo.textContext.clearRect(-25, -32, 50, 35);
                    canvasInfo.textContext.font = "" + circleGraphProperty.textSize * circleGraphProperty.textSizeRatio + "px arial";
                    canvasInfo.textContext.fillStyle = "rgba(32,96,122," + colorValue + ")";
                    canvasInfo.textContext.fillText(recommendedSizeList[textIndex], 0, 0);

                } else {
//                    canvasInfo.textContext.clearRect(-colorTextAngle - 5, -colorTextAngle - 10, 20, 20);
                    canvasInfo.textContext.font = "" + circleGraphProperty.textSize * circleGraphProperty.textSizeRatio / 2 + "px arial";
                    canvasInfo.textContext.fillStyle = "rgba(32,96,122," + colorValue + ")";
                    canvasInfo.textContext.fillText("●", 0, 0);

                }

                canvasInfo.textContext.rotate(colorTextAngle);
                canvasInfo.textContext.translate(0, circleGraphLocation.radius * 0.8);
                canvasInfo.textContext.rotate(-colorTextAngle);

                colorValue += 0.01 + colorValue / motionValue / 3;

                if (colorValue > 1) {
                    clearInterval(textInterval);
                }
            }, motionValue);
        };

        
        var drawPointTextGraph = function (text, angle, radius, textSize, filltextLocationY) {
//            
//            var motionValue = 100;
//            var colorValue = 0;
//            var textInterval = setInterval(function () {
            
            canvasInfo.textContext.translate(0, circleGraphLocation.radius / 1.25);

            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, -circleGraphLocation.pointerRadius * radius);
            canvasInfo.textContext.rotate(-angle);

            canvasInfo.textContext.clearRect(-25, -32, 50, 35);
            canvasInfo.textContext.font = "" + textSize * circleGraphProperty.textSizeRatio + "px arial";
            canvasInfo.textContext.fillStyle = circleGraphProperty.pointerTextColor;
            canvasInfo.textContext.fillText(text, 0, filltextLocationY);

            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, circleGraphLocation.pointerRadius * radius);
            canvasInfo.textContext.rotate(-angle);
//            
//            colorValue += 0.01 + colorValue / motionValue / 3;
//
//                if (colorValue > 1) {
//                    clearInterval(textInterval);
//                }
//            }, motionValue);
        };


    }


};