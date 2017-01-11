var recommendSizeData = {
    recommendSize: 'S',
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
        pointerSize: 13,
        pointerTextColor: '#00FFB0',
        circleColor: '#ffffff',
        shadowReversalIn: false,
        shadowReversalOut: true,
        textSizeRatio: 2.5
    };
    
    var listLengthCompareValue = {
        zero : 0,
        one : 1,
        two : 2,
        three : 3,
        four : 4,
        five : 5,
    };

    try {
        
        for (var value in elIds) {
            if (typeof elIds === "object" && elIds[value] !== null && elIds[value] !== undefined  && elIds[value] !== '') {
                canvasId[value] = elIds[value];
            }else{
                throw value;
            }
        }
        
        for (var value in circleGraphProperties) {
            if (typeof circleGraphProperties === "object" && circleGraphProperties[value] !== null && circleGraphProperties[value] !== undefined && circleGraphProperties[value] !== '') {
                circleGraphProperty[value] = circleGraphProperties[value];
            } else{
                throw value;
            }
        }

    } catch (error) {
         console.log( error + ": Invalid property");
    }
    
    
    var self = this;

    return (function () {
        var sizeListData = self.getSizeListData();
        var recommendedSizeList = self.getRecommendSizeList(sizeListData, listLengthCompareValue);
        var sizeData = self.getSizeData(recommendedSizeList);
        var rateValue = self.gerRateValue(sizeData, listLengthCompareValue);
        var canvasInfo = self.initCanvas(canvasId);
        var circleGraphLocation = self.calCircleGraphLocation(sizeData, canvasInfo, circleGraphProperty, listLengthCompareValue);
        var recommendedSizeLocationValue = self.recommendSizeLocationValue(sizeData, rateValue, listLengthCompareValue);

        self.drawCircleGraphShadow(canvasInfo, sizeData, rateValue, circleGraphLocation, circleGraphProperty, listLengthCompareValue);
        self.drawCircleGraphText(canvasInfo, recommendedSizeList, recommendedSizeLocationValue, circleGraphLocation, circleGraphProperty);
        self.drawCircleGraphColorText(canvasInfo, sizeData, recommendedSizeList, recommendedSizeLocationValue, circleGraphProperty, circleGraphLocation, listLengthCompareValue);
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


    gerRateValue: function (sizeData, compareValue) {
        if (sizeData.totalSizesLength >= compareValue.five) {

            if (sizeData.sizeRate >= compareValue.three && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate <= -compareValue.three) {
                return 1;
            } else {
                return 0;
            }

        } else if (sizeData.totalSizesLength == compareValue.four) {

            if (sizeData.sizeRate <= compareValue.three && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate >= -compareValue.three) {
                return 1;
            } else if (sizeData.sizeRate >= compareValue.four && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate <= -compareValue.four) {
                return 2;
            } else {
                return 0;
            }

        } else if (sizeData.totalSizesLength == compareValue.three) {

            if (sizeData.sizeRate <= compareValue.two && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate >= -compareValue.two) {
                return 1;
            } else if (sizeData.sizeRate == compareValue.three && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate == -compareValue.three) {
                return 2;
            } else if (sizeData.sizeRate >= compareValue.four && sizeData.sizeRate > compareValue.zero || sizeData.sizeRate < compareValue.zero && sizeData.sizeRate <= -compareValue.four) {
                return 3;
            } else {
                return 0;
            }

        } else if (sizeData.totalSizesLength == compareValue.two) {

            if (sizeData.sizeRate > compareValue.zero) {
                return sizeData.sizeRate;
            } else if (sizeData.sizeRate < compareValue.zero) {
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


    calCircleGraphLocation: function (sizeData, canvasInfo, circleGraphProperty, compareValue) {
        var piePieceAllMotion = 18 * circleGraphProperty.shadowMotionValue;
        var piePieceCount = 5;

        if (sizeData.totalSizesLength == compareValue.three) {
            piePieceCount += 2;
        } else if (sizeData.totalSizesLength == compareValue.two) {
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


    recommendSizeLocationValue: function (sizeData, rateValue, compareValue) {
        var recommendedSizePointerValue;
        var recommendedSizePointerText;
        var textLocationValueList = [];
        var rangeCount = 3;
        var avgCount = 3;

        for (var i = 0; i < 13; i++) {
            textLocationValueList[i] = i + 3;
        }

        if (sizeData.totalSizesLength == compareValue.four) {
            avgCount = 4;
        } else if (sizeData.totalSizesLength == compareValue.three) {
            rangeCount = 4;
            avgCount = 6;
        } else if (sizeData.totalSizesLength == compareValue.two) {
            rangeCount = 6;
            avgCount = 12;
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
            recommendedSizeTextList: recommendedSizeTextList,
            recommendedSizeRangeList: recommendedSizeRangeList,
            recommendedSizePointerText: recommendedSizePointerText,
            recommendedSizePointerValue: recommendedSizePointerValue
        }

    },


    drawCircleGraphShadow: function (canvasInfo, sizeData, rateValue, circleGraphLocation, circleGraphProperty, compareValue) {
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

        if (sizeData.sizeRate > compareValue.zero) {
            startLocationValue += increaseCount;
        } else if (sizeData.sizeRate < compareValue.zero) {
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

        var drawTextGraph = function (angle, text, sizeAvg) {
            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, -circleGraphLocation.radius * 0.8);
            canvasInfo.textContext.rotate(-angle);

            canvasInfo.textContext.textAlign = "center";
            canvasInfo.textContext.font = "" + circleGraphProperty.textSize * circleGraphProperty.textSizeRatio / sizeAvg + "px 'Flexo-Medium'";
            canvasInfo.textContext.fillStyle = circleGraphProperty.textColor;
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
            drawTextGraph(dotTextAngle, "●", 3);
        }

    },


    drawCircleGraphColorText: function (canvasInfo, sizeData, recommendedSizeList, recommendedSizeLocationValue, circleGraphProperty, circleGraphLocation, compareValue) {
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

            if (circleLocationValue !== undefined) {
                var textIndex = recommendedSizeLocationValue.recommendedSizeTextList.indexOf(circleLocationValue);

                if (sizeData.totalSizesLength == compareValue.two && intervalCount < 13) {
                    drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                } else if (sizeData.totalSizesLength == compareValue.three && intervalCount < 7) {
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
                intervalStopCount++;

            } else if (pointerTextCount == 2) {
                drawPointTextGraph(recommendedSizeList[colorTextIndex], pointerAngle, 1.28, circleGraphProperty.textSize, 0);
                clearInterval(colorTextInterval);

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
                    canvasInfo.textContext.font = "" + circleGraphProperty.textSize * circleGraphProperty.textSizeRatio + "px 'Flexo-Medium'";
                    canvasInfo.textContext.fillStyle = "rgba(32,96,122," + colorValue + ")";
                    canvasInfo.textContext.fillText(recommendedSizeList[textIndex], 0, 0);

                } else {
                    //                    canvasInfo.textContext.clearRect(-colorTextAngle - 5, -colorTextAngle - 10, 20, 20);
                    canvasInfo.textContext.font = "" + circleGraphProperty.textSize * circleGraphProperty.textSizeRatio / 3 + "px 'Flexo-Medium'";
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
            var motionValue = 100;
            var colorValue = 0;

            canvasInfo.textContext.translate(0, circleGraphLocation.radius / 1.25);

            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, -circleGraphLocation.pointerRadius * radius);
            canvasInfo.textContext.rotate(-angle);

            canvasInfo.textContext.clearRect(-25, -32, 50, 35);
            canvasInfo.textContext.font = "" + textSize * circleGraphProperty.textSizeRatio + "px 'Flexo-Medium'";
            canvasInfo.textContext.fillStyle = circleGraphProperty.pointerTextColor;
            canvasInfo.textContext.fillText(text, 0, filltextLocationY);

            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, circleGraphLocation.pointerRadius * radius);
            canvasInfo.textContext.rotate(-angle);

        };

    },


};