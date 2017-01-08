var recommendSizeData = {
    recommendSize: 'M',
    isCorrectGender: true,
    recommendRate: 0,
    status: true,
    //    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    sizes: ['XS', 'S', 'M', 'L', 'XL']
//            sizes: ['XS', 'S', 'M', 'L']
        //    sizes: ['XS', 'S', 'M']
        //    sizes: ['XS', 'S']    
};


function CircleGraph(elIds, circleGraphProperties) {
    this.elIds = elIds || {};
    this.circleGraphProperty = circleGraphProperties || {};
    this.textSizeRatio = 2.5;
    
    this.circleGraphNomalProperties = {
        textMotionValue: 1000,
        shadowMotionValue: 1000,
        shadowBlurGene: 40,
        textSize: 16,
        textColor: '#F6F5F3',
        brightTextColor: '#20607A',
        pointerText: 'ME!',
        pointerSize: 14,
        pointerTextColor: '#00FFB0',
        circleColor: '#ffffff',
        shadowReversalIn: false,
        shadowReversalOut: true
    };

    for (var value in circleGraphProperties) {

        if (typeof circleGraphProperties === "object" && circleGraphProperties[value] !== null && circleGraphProperties[value] !== undefined) {
            this.circleGraphProperty[value] = circleGraphProperties[value];
        } else if (typeof circleGraphProperties !== "object" || circleGraphProperties[value] == null || circleGraphProperties[value] == undefined) {
            this.circleGraphProperty[value] = circleGraphNomalProperties[value];
        }

    }

};


CircleGraph.prototype = {


    recommendedSizeListData: function () {
        var recommendedSizeListData = {
            sizesList: recommendSizeData.sizes,
            sizesIndex: recommendSizeData.sizes.indexOf(recommendSizeData.recommendSize),
            sizesLength: recommendSizeData.sizes.length
        };
        return recommendedSizeListData;
    },


    filteredSizeList: function () { //3
        var sizeListData = this.recommendedSizeListData();

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


    recommendedSizeData: function () { 
        var filteredSizeList = this.filteredSizeList();

        var recommendedSizeData = {
            sizeRate: recommendSizeData.recommendRate,
            sizeName: recommendSizeData.recommendSize,
            sizeIndex: filteredSizeList.indexOf(recommendSizeData.recommendSize),
            totalSizes: filteredSizeList,
            totalSizesLength: filteredSizeList.length
        };
        return recommendedSizeData;
    },


    recommendedRateValue: function () { 
        var sizeData = this.recommendedSizeData();

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


    canvasContext: function () {
        var shadowCanvas = document.getElementById(this.elIds.canvasShadow);
        var textCanvas = document.getElementById(this.elIds.canvasText);
        var shadowContext = shadowCanvas.getContext("2d");
        var textContext = textCanvas.getContext("2d");

        return {
            textCanvas: textCanvas,
            textContext: textContext,
            shadowCanvas: shadowCanvas,
            shadowContext: shadowContext,
        };
    },


    calCircleGraphLocation: function () {
        var canvasInfo = this.canvasContext();
        var sizeData = this.recommendedSizeData();

        var piePieceAllMotion = 18 * this.circleGraphProperty.shadowMotionValue;
        var piePieceCount = 5;

        if (sizeData.totalSizesLength == 3) {
            piePieceCount += 2;
        } else if (sizeData.totalSizesLength == 2) {
            piePieceCount += 5;
        }

        var piePieceMotion = piePieceCount * this.circleGraphProperty.shadowMotionValue;
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


    filteredLocationValue: function () { //2
        var sizeData = this.recommendedSizeData();
        var recommendedRateCount = this.recommendedRateValue();

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

        var recommendedSizeList = textLocationValueList.filter(function (item, index) {
            if (index % avgCount === 0) {
                return item;
            }
        });

        var recommendedSizeRangeList = textLocationValueList.filter(function (item, index) {
            if (index % avgCount !== 0) {
                return item;
            }
        });

        var pointerIndexValue = recommendedSizeList.filter(function (item, index) {
            if (index == sizeData.sizeIndex) {
                recommendedSizePointerText = item;

                if (sizeData.sizeRate >= 0) {
                    recommendedSizePointerValue = item + recommendedRateCount;
                } else if (sizeData.sizeRate < 0) {
                    recommendedSizePointerValue = item - recommendedRateCount;
                }
            }
        });

        var rangeValue = textLocationValueList.filter(function (item) {
            if (recommendedSizePointerValue - rangeCount < item && item < recommendedSizePointerValue + rangeCount) {
                return item;
            }
        });

        return {
            rangeValue: rangeValue,
            recommendedSizeList: recommendedSizeList,
            recommendedSizeRangeList: recommendedSizeRangeList,
            recommendedSizePointerText: recommendedSizePointerText,
            recommendedSizePointerValue: recommendedSizePointerValue
        }

    },


    drawCircleGraphShadow: function () {

        var sizeData = this.recommendedSizeData();
        var graphInfo = this.calCircleGraphLocation();
        var recommendedRateCount = this.recommendedRateValue();
        var canvasInfo = this.canvasContext();
        var graphController = this.circleGraphProperty || {};

        var startPoint;
        var startValue = 0.39;
        var blurIncrease = 0;
        var increaseCount = recommendedRateCount / 10;

        if (sizeData.totalSizesLength == 4) {
            startValue += 0.02 + (0.1 * sizeData.sizeIndex);
        } else if (sizeData.totalSizesLength == 3) {
            startValue -= 0.11;
            startValue += (0.33 * sizeData.sizeIndex);
        } else if (sizeData.totalSizesLength == 2) {
            startValue -= 0.21;
            startValue += (0.87 * sizeData.sizeIndex);
        }

        if (sizeData.sizeRate > 0) {
            startValue += increaseCount;
        } else if (sizeData.sizeRate < 0) {
            startValue -= increaseCount;
        }

        startPoint = (startValue * Math.PI) + graphInfo.calculatedsizeIndex;

        var pieGraphInterval = setInterval(function () {
            canvasInfo.shadowContext.clearRect(0, 0, canvasInfo.shadowCanvas.width, canvasInfo.shadowCanvas.height);

            canvasInfo.shadowContext.beginPath();
            canvasInfo.shadowContext.moveTo(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth);
            canvasInfo.shadowContext.arc(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth / 1.27, startPoint, startPoint + graphInfo.radian, graphController.shadowReversalIn);
            canvasInfo.shadowContext.shadowColor = "rgba(32,96,122," + blurIncrease + ")";
            canvasInfo.shadowContext.shadowBlur = graphController.shadowBlurGene;
            canvasInfo.shadowContext.closePath();
            canvasInfo.shadowContext.fillStyle = graphController.circleColor;
            canvasInfo.shadowContext.fill();

            canvasInfo.shadowContext.beginPath();
            canvasInfo.shadowContext.moveTo(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth);
            canvasInfo.shadowContext.arc(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth / 1.27, startPoint, startPoint + graphInfo.radian, graphController.shadowReversalOut);
            canvasInfo.shadowContext.shadowColor = "rgba(227,237,168," + blurIncrease + ")";
            canvasInfo.shadowContext.shadowBlur = graphController.shadowBlurGene;
            canvasInfo.shadowContext.fillStyle = graphController.circleColor;
            canvasInfo.shadowContext.fill();

            canvasInfo.shadowContext.beginPath();
            canvasInfo.shadowContext.arc(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth / 1.28, 0, 2 * Math.PI);
            canvasInfo.shadowContext.shadowBlur = 0;
            canvasInfo.shadowContext.fillStyle = graphController.circleColor;
            canvasInfo.shadowContext.fill();
            
            blurIncrease += 0.01;

            if (blurIncrease > 1) {
                clearInterval(pieGraphInterval);
            }
        }, graphController.shadowMotionValue / 30);

    },


    drawCircleGraphText: function () {

        var filteredSizeList = this.filteredSizeList();
        var graphInfo = this.calCircleGraphLocation();
        var canvasInfo = this.canvasContext();
        var graphController = this.circleGraphProperty || {};
        var locationValue = this.filteredLocationValue();

        var sizeTextAngle, dotTextAngle;
        var sizeListLength = locationValue.recommendedSizeList.length;
        var dotListLength = locationValue.recommendedSizeRangeList.length;
        var labelCount = 0;

        canvasInfo.textContext.translate(graphInfo.radius, graphInfo.radius);
        graphInfo.radius = graphInfo.radius * 0.79;

        canvasInfo.textContext.beginPath();
        canvasInfo.textContext.arc(0, 0, graphInfo.radius, 0, 2 * Math.PI);
        canvasInfo.textContext.fillStyle = graphController.circleColor;
        canvasInfo.textContext.fill();

        canvasInfo.textContext.textAlign = "center";
        canvasInfo.textContext.fillStyle = graphController.textColor;

        for (var i = 0; i < sizeListLength; i++) {
            sizeTextAngle = (locationValue.recommendedSizeList[i] + 9) * Math.PI / 9;
            
            this.drawCanvasContext(sizeTextAngle, graphInfo.radius, filteredSizeList[labelCount], graphController.textSize * this.textSizeRatio);
            
            labelCount++;
        }

        for (var i = 0; i < dotListLength; i++) {
            dotTextAngle = (locationValue.recommendedSizeRangeList[i] + 9) * Math.PI / 9;
            
            this.drawCanvasContext(dotTextAngle, graphInfo.radius, "●", graphController.textSize * this.textSizeRatio / 2);
        }

    },

    
    drawCanvasContext : function(angle, radius, text, textSize){
        var canvasInfo = this.canvasContext();
        
            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, - radius * 0.82);
            canvasInfo.textContext.rotate(-angle);
        
            canvasInfo.textContext.font = "" + textSize + "px arial";
            canvasInfo.textContext.fillText(text, 0, 0);

            canvasInfo.textContext.rotate(angle);
            canvasInfo.textContext.translate(0, radius * 0.82);
            canvasInfo.textContext.rotate(-angle);
    },
    

    drawCircleGraphColorText: function () {
        var canvasInfo = this.canvasContext();
        var sizeData = this.recommendedSizeData();
        var graphInfo = this.calCircleGraphLocation();
        var filteredSizeList = this.filteredSizeList();
        var locationValue = this.filteredLocationValue();
        var graphController = this.circleGraphProperty || {};
        var textSizeRatio = this.textSizeRatio;
        
        var intervalCount = 0;
        var pointerTextCount = 0;
        var intervalStopCount = 0;

        var colorTextInterval = setInterval(function () {

            var circleLocationValue = locationValue.rangeValue[intervalCount];
            var textIndex = locationValue.recommendedSizeList.indexOf(circleLocationValue);
            var pointerAngle = (locationValue.recommendedSizePointerText + 9) * Math.PI / 9;
            var pointerMeAngle = (locationValue.recommendedSizePointerValue + 9) * Math.PI / 9;
            var colorTextAngle = (circleLocationValue + 9) * Math.PI / 9;
            var colorTextIndex = locationValue.recommendedSizeList.indexOf(locationValue.recommendedSizePointerText);

            var sizeTextLocation = locationValue.recommendedSizeList.filter(function (item) {
                if (circleLocationValue == item) {
                    return item;
                }
            });

            canvasInfo.textContext.rotate(colorTextAngle);
            canvasInfo.textContext.translate(0, -graphInfo.radius * 0.65);
            canvasInfo.textContext.rotate(-colorTextAngle);
            
            canvasInfo.textContext.fillStyle = graphController.brightTextColor;

            if (typeof circleLocationValue !== 'undefined') {

                if (sizeData.totalSizesLength == 2) {

                    if (intervalCount < 13) {
                        if (circleLocationValue == sizeTextLocation) {
                            canvasInfo.textContext.clearRect(-20, -25, 40, 30);
                            canvasInfo.textContext.font = "" + graphController.textSize * textSizeRatio + "px arial";
                            canvasInfo.textContext.fillText(filteredSizeList[textIndex], 0, 0);
                        } else {
                            canvasInfo.textContext.clearRect(-colorTextAngle, -colorTextAngle, 20, 20);
                            canvasInfo.textContext.font = "" + graphController.textSize * textSizeRatio / 2 + "px arial";
                            canvasInfo.textContext.fillText("●", 0, 0);
                        }
                    }

                } else if (sizeData.totalSizesLength == 3) {

                    if (intervalCount < 7) {
                        if (circleLocationValue == sizeTextLocation) {
                            canvasInfo.textContext.clearRect(-20, -25, 40, 30);
                            canvasInfo.textContext.font = "" + graphController.textSize * textSizeRatio + "px arial";            
                            canvasInfo.textContext.fillText(filteredSizeList[textIndex], 0, 0);
                        } else {
                            canvasInfo.textContext.clearRect(-colorTextAngle, -colorTextAngle, 20, 20);
                            canvasInfo.textContext.font = "" + graphController.textSize * textSizeRatio / 2 + "px arial";
                            canvasInfo.textContext.fillText("●", 0, 0);
                        }
                    }

                } else {
                    if (intervalCount < 5) {
                        if (circleLocationValue == sizeTextLocation) {
                            canvasInfo.textContext.clearRect(-20, -25, 40, 30);
                            canvasInfo.textContext.font = "" + graphController.textSize * textSizeRatio + "px arial";     
                            canvasInfo.textContext.fillText(filteredSizeList[textIndex], 0, 0);
                        } else {
                            canvasInfo.textContext.clearRect(-colorTextAngle, -colorTextAngle, 20, 20);
                            canvasInfo.textContext.font = "" + graphController.textSize * textSizeRatio / 2 + "px arial";
                            canvasInfo.textContext.fillText("●", 0, 0);
                        }
                    }

                }

                canvasInfo.textContext.rotate(colorTextAngle);
                canvasInfo.textContext.translate(0, graphInfo.radius * 0.65);
                canvasInfo.textContext.rotate(-colorTextAngle);

                intervalCount++;
            } else {
                pointerTextCount++;
            }

            if (pointerTextCount == 1) {
                canvasInfo.textContext.translate(0, graphInfo.radius / 1.54);
                                
                canvasInfo.textContext.rotate(pointerAngle);
                canvasInfo.textContext.translate(0, -graphInfo.radius * 0.65);
                canvasInfo.textContext.rotate(-pointerAngle);

                canvasInfo.textContext.clearRect(-20, -25, 40, 30);
                canvasInfo.textContext.fillStyle = graphController.pointerTextColor;
                canvasInfo.textContext.font = "" + graphController.textSize * textSizeRatio + "px arial";                
                canvasInfo.textContext.fillText(filteredSizeList[colorTextIndex], 0, 0);

                canvasInfo.textContext.rotate(pointerAngle);
                canvasInfo.textContext.translate(0, graphInfo.radius * 0.65);
                canvasInfo.textContext.rotate(-pointerAngle);

                intervalStopCount++;
            } else if (intervalStopCount == 1) {
                canvasInfo.textContext.translate(0, graphInfo.radius / 1.54);
                
                canvasInfo.textContext.rotate(pointerMeAngle);
                canvasInfo.textContext.translate(0, -graphInfo.pointerRadius * 1.85);
                canvasInfo.textContext.rotate(-pointerMeAngle);

                canvasInfo.textContext.font = "" + graphController.pointerSize * textSizeRatio + "px arial";
                canvasInfo.textContext.fillStyle = graphController.pointerTextColor;
                canvasInfo.textContext.fillText(graphController.pointerText, 0, 5);

                canvasInfo.textContext.rotate(pointerMeAngle);
                canvasInfo.textContext.translate(0, graphInfo.pointerRadius * 1.85);
                canvasInfo.textContext.rotate(-pointerMeAngle);

                clearInterval(colorTextInterval);
            }

        }, graphController.textMotionValue);

    },


    drawCircleGraph: function () {
        this.drawCircleGraphShadow();
        this.drawCircleGraphText();
        this.drawCircleGraphColorText();
    }

};

