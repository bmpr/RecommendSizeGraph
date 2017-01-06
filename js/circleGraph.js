var recommendSizeData = {
    recommendSize: 'M',
    isCorrectGender: true,
    recommendRate: 0,
    status: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL','XXL','XXXL']
        //    sizes: ['XS', 'S', 'M', 'L', 'XL']
        //    sizes: ['XS', 'S', 'M', 'L']
        //    sizes: ['XS', 'S', 'M']
        //    sizes: ['XS', 'S']    
};


(function () {


    var recommendedSizeListData = {
        sizesList: recommendSizeData.sizes,
        sizesIndex: recommendSizeData.sizes.indexOf(recommendSizeData.recommendSize),
        sizesLength: recommendSizeData.sizes.length
    };


    var filteredSizeList = recommendedSizeListData.sizesList.filter(function (item, index) {
        var sizeListData = recommendedSizeListData || {};
        
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


    var recommendedSizeData = {
        sizeRate: recommendSizeData.recommendRate,
        sizeName: recommendSizeData.recommendSize,
        sizeIndex: filteredSizeList.indexOf(recommendSizeData.recommendSize),
        totalSizes: filteredSizeList,
        totalSizesLength: filteredSizeList.length
    };


    var textLocationCountList = function () {
        var locationCount = [];
        for (var i = 0; i < 13; i++) {
            locationCount[i] = i + 3;
        }
        return locationCount;
    };


    var recommendedRateValue = function () {
        var sizeData = recommendedSizeData || {};

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

    };


    function InitCircleGraph(canvas, circleGraphProperties) {
        var shadowCanvas = document.getElementById(canvas.canvasShadow);
        var textCanvas = document.getElementById(canvas.canvasText);
        var shadowContext = shadowCanvas.getContext("2d");
        var textContext = textCanvas.getContext("2d");
        var circleGraphProperty = circleGraphProperties;

        var circleGraphNomalProperties = {
            motionValue: 200,
            shadowBlurGene: 50,
            textSize: 32,
            textColor: '#F6F5F3',
            BrightTextColor: '#20607A',
            pointerText: 'ME!',
            pointerSize: 28,
            pointerTextColor: '#00FFB0',
            circleColor: '#ffffff',
            shadowReversalIn: false,
            shadowReversalOut: true
        };

        for (var value in circleGraphProperties) {
            
            if (typeof circleGraphProperties === "object" && circleGraphProperties[value] !== null && circleGraphProperties[value] !== undefined) {
                circleGraphProperty[value] = circleGraphProperties[value];
            } else if (typeof circleGraphProperties !== "object" || circleGraphProperties[value] == null || circleGraphProperties[value] == undefined) {
                circleGraphProperty[value] = circleGraphNomalProperties[value];
            }
            
        }

        return {
            textCanvas: textCanvas,
            textContext: textContext,
            shadowCanvas: shadowCanvas,
            shadowContext: shadowContext,
            circleGraphController: circleGraphProperty
        };
    };
    

    function calCircleGraphLocation(canvasInfo, sizeList) {
        var sizeData = recommendedSizeData || {};
        
        var piePieceAllMotion = 18 * canvasInfo.circleGraphController.motionValue;
        var piePieceCount = 5;

        if (sizeData.totalSizesLength == 3) {
            piePieceCount += 2;
        } else if (sizeData.totalSizesLength == 2) {
            piePieceCount += 5;
        }

        var piePieceMotion = piePieceCount * canvasInfo.circleGraphController.motionValue;
        var radian = ((2 * Math.PI) / piePieceAllMotion) * piePieceMotion;
        var calculatedsizeIndex = (Math.PI / 18) * (sizeData.sizeIndex * 6 + 3);

        var canvasHalfWidth = canvasInfo.shadowCanvas.width / 2;
        var radius = canvasInfo.textCanvas.height / 2;
        var pointerRadius = canvasInfo.textCanvas.height / 4;

        return {
            canvas: canvasInfo.shadowCanvas,
            textContext: canvasInfo.textContext,
            shadowContext: canvasInfo.shadowContext,
            canvasHalfWidth: canvasHalfWidth,
            radian: radian,
            radius: radius,
            sizeList: sizeList,
            pointerRadius: pointerRadius,
            calculatedsizeIndex: calculatedsizeIndex,
        };
    }


    function drawCircleGraphShadow(canvasInfo, rateIncreaseCount, graphlocationValueInfo) {
        var graphInfo  = graphlocationValueInfo || {};
        var graphController = canvasInfo.circleGraphController || {};
        var sizeData = recommendedSizeData || {};
        var startPoint;
        var startValue = 0.39;
        var blurIncrease = 0;
        var increaseCount = rateIncreaseCount / 10;

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
            graphInfo.shadowContext.clearRect(0, 0, graphInfo.canvas.width, graphInfo.canvas.height);

            graphInfo.shadowContext.beginPath();
            graphInfo.shadowContext.moveTo(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth);
            graphInfo.shadowContext.arc(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth / 1.35, startPoint, startPoint + graphInfo.radian, graphController.shadowReversalIn);
            graphInfo.shadowContext.shadowColor = "rgba(32,96,122," + blurIncrease + ")";
            graphInfo.shadowContext.shadowBlur = graphController.shadowBlurGene;
            graphInfo.shadowContext.closePath();
            graphInfo.shadowContext.fillStyle = 'blue';
            graphInfo.shadowContext.fill();

            graphInfo.shadowContext.beginPath();
            graphInfo.shadowContext.moveTo(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth);
            graphInfo.shadowContext.arc(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth / 1.35, startPoint, startPoint + graphInfo.radian, graphController.shadowReversalOut);
            graphInfo.shadowContext.shadowColor = "rgba(227,237,168," + blurIncrease + ")";
            graphInfo.shadowContext.shadowBlur = graphController.shadowBlurGene;
            graphInfo.shadowContext.fillStyle = graphController.circleColor;
            graphInfo.shadowContext.fill();

            graphInfo.shadowContext.beginPath();
            graphInfo.shadowContext.arc(graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth, graphInfo.canvasHalfWidth - 70, 0, 2 * Math.PI);
            graphInfo.shadowContext.shadowBlur = 0;
            graphInfo.shadowContext.fillStyle = graphController.circleColor;
            graphInfo.shadowContext.fill();

            blurIncrease += 0.05;

            if (blurIncrease > 1) {
                clearInterval(pieGraphInterval);
            }
        }, graphController.motionValue);
    }


    function drawRecommendSizeText(canvasInfo, rateIncreaseCount, textLocationValueList, graphlocationValueInfo) {
        var graphInfo  = graphlocationValueInfo || {};
        var sizeData = recommendedSizeData || {};
        var graphController = canvasInfo.circleGraphController || {};

        var recommendedSizePointerValue;
        var recommendedSizePointerText;
        var rateIncrease = rateIncreaseCount;
        var rateDecrease = -rateIncreaseCount;

        var rangeCount = 3;
        var avgCount = 3;

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
                    recommendedSizePointerValue = item + rateIncrease;
                } else if (sizeData.sizeRate < 0) {
                    recommendedSizePointerValue = item + rateDecrease;
                }
            }
        });

        var rangeValue = textLocationValueList.filter(function (item) {
            if (recommendedSizePointerValue - rangeCount < item && item < recommendedSizePointerValue + rangeCount) {
                return item;
            }
        });


        this.drawCircleGraphText = function () {
            var sizeTextAngle, dotTextAngle;
            var sizeListLength = recommendedSizeList.length;
            var dotListLength = recommendedSizeRangeList.length;
            var labelCount = 0;

            graphInfo.textContext.translate(graphInfo.radius, graphInfo.radius);
            graphInfo.radius = graphInfo.radius * 0.79;

            graphInfo.textContext.beginPath();
            graphInfo.textContext.arc(0, 0, graphInfo.radius / 1.06, 0, 2 * Math.PI);
            graphInfo.textContext.fillStyle = graphController.circleColor;
            graphInfo.textContext.fill();

            graphInfo.textContext.font = "" + graphController.textSize + "px arial";
            graphInfo.textContext.textAlign = "center";
            graphInfo.textContext.fillStyle = graphController.textColor;

            for (var i = 0; i < sizeListLength; i++) {
                sizeTextAngle = (recommendedSizeList[i] + 9) * Math.PI / 9;

                graphInfo.textContext.rotate(sizeTextAngle);
                graphInfo.textContext.translate(0, -graphInfo.radius * 0.78);
                graphInfo.textContext.rotate(-sizeTextAngle);

                graphInfo.textContext.fillText(graphInfo.sizeList[labelCount], 0, 0);

                graphInfo.textContext.rotate(sizeTextAngle);
                graphInfo.textContext.translate(0, graphInfo.radius * 0.78);
                graphInfo.textContext.rotate(-sizeTextAngle);

                labelCount++;
            }

            for (var i = 0; i < dotListLength; i++) {
                dotTextAngle = (recommendedSizeRangeList[i] + 9) * Math.PI / 9;

                graphInfo.textContext.rotate(dotTextAngle);
                graphInfo.textContext.translate(0, -graphInfo.radius * 0.78);
                graphInfo.textContext.rotate(-dotTextAngle);

                graphInfo.textContext.fillText(".", 0, 0);

                graphInfo.textContext.rotate(dotTextAngle);
                graphInfo.textContext.translate(0, graphInfo.radius * 0.78);
                graphInfo.textContext.rotate(-dotTextAngle);
            }
        };


        this.drawCircleGraphColorText = function () {
            var intervalCount = 0;
            var pointerTextCount = 0;
            var intervalStopCount = 0;

            var colorTextInterval = setInterval(function () {

                var circleLocationValue = rangeValue[intervalCount];
                var textIndex = recommendedSizeList.indexOf(circleLocationValue);
                var lightTextAngle = (circleLocationValue + 9) * Math.PI / 9;

                var sizeTextLocation = recommendedSizeList.filter(function (item) {
                    if (circleLocationValue == item) {
                        return item;
                    }
                });

                graphInfo.textContext.rotate(lightTextAngle);
                graphInfo.textContext.translate(0, -graphInfo.radius * 0.78);
                graphInfo.textContext.rotate(-lightTextAngle);

                graphInfo.textContext.fillStyle = graphController.BrightTextColor;

                if (typeof circleLocationValue !== 'undefined') {

                    if (sizeData.totalSizesLength == 2) {

                        if (intervalCount < 13) {
                            if (circleLocationValue == sizeTextLocation) {
                                graphInfo.textContext.clearRect(-20, -25, 40, 30);
                                graphInfo.textContext.fillText(graphInfo.sizeList[textIndex], 0, 0);
                            } else {
                                graphInfo.textContext.clearRect(-lightTextAngle, -lightTextAngle, 20, 20);
                                graphInfo.textContext.fillText(".", 0, 0);
                            }
                        }

                    } else if (sizeData.totalSizesLength == 3) {

                        if (intervalCount < 7) {
                            if (circleLocationValue == sizeTextLocation) {
                                graphInfo.textContext.clearRect(-20, -25, 40, 30);
                                graphInfo.textContext.fillText(graphInfo.sizeList[textIndex], 0, 0);
                            } else {
                                graphInfo.textContext.clearRect(-lightTextAngle, -lightTextAngle, 20, 20);
                                graphInfo.textContext.fillText(".", 0, 0);
                            }
                        }

                    } else {
                        if (intervalCount < 5) {
                            if (circleLocationValue == sizeTextLocation) {
                                graphInfo.textContext.clearRect(-20, -25, 40, 30);
                                graphInfo.textContext.fillText(graphInfo.sizeList[textIndex], 0, 0);
                            } else {
                                graphInfo.textContext.clearRect(-lightTextAngle, -lightTextAngle, 20, 20);
                                graphInfo.textContext.fillText(".", 0, 0);
                            }
                        }

                    }

                    graphInfo.textContext.rotate(lightTextAngle);
                    graphInfo.textContext.translate(0, graphInfo.radius * 0.78);
                    graphInfo.textContext.rotate(-lightTextAngle);

                    intervalCount++;

                } else {
                    pointerTextCount++;
                }

                if (pointerTextCount == 1) {
                    this.drawPointerSizeText();
                    intervalStopCount++;
                } else if (intervalStopCount == 1) {
                    this.drawPointerDotText();
                    clearInterval(colorTextInterval);
                }

            }, graphController.motionValue);
        };


        this.drawPointerSizeText = function () {
            var colorTextIndex = recommendedSizeList.indexOf(recommendedSizePointerText);
            var pointerAngle = (recommendedSizePointerText + 9) * Math.PI / 9;

            graphInfo.textContext.translate(0, graphInfo.radius / 1.28);

            graphInfo.textContext.rotate(pointerAngle);
            graphInfo.textContext.translate(0, -graphInfo.radius * 0.78);
            graphInfo.textContext.rotate(-pointerAngle);

            graphInfo.textContext.clearRect(-20, -25, 40, 30);
            graphInfo.textContext.fillStyle = graphController.pointerTextColor;
            graphInfo.textContext.fillText(graphInfo.sizeList[colorTextIndex], 0, 0);

            graphInfo.textContext.rotate(pointerAngle);
            graphInfo.textContext.translate(0, graphInfo.radius * 0.78);
            graphInfo.textContext.rotate(-pointerAngle);
        };


        this.drawPointerDotText = function () {
            var pointerAngle = (recommendedSizePointerValue + 9) * Math.PI / 9;

            graphInfo.textContext.translate(0, graphInfo.radius / 1.28);

            graphInfo.textContext.rotate(pointerAngle);
            graphInfo.textContext.translate(0, -graphInfo.pointerRadius * 1.8);
            graphInfo.textContext.rotate(-pointerAngle);

            graphInfo.textContext.font = "" + graphController.pointerSize + "px arial";
            graphInfo.textContext.fillStyle = graphController.pointerTextColor;
            graphInfo.textContext.fillText(graphController.pointerText, 0, 5);

            graphInfo.textContext.rotate(pointerAngle);
            graphInfo.textContext.translate(0, graphInfo.pointerRadius * 1.8);
            graphInfo.textContext.rotate(-pointerAngle);
        };

        this.drawCircleGraphText();
        this.drawCircleGraphColorText();

    }


    function drawCircleGraph() {
        var canvasInfo = new InitCircleGraph({
            canvasShadow: 'canvasShadow',
            canvasText: 'canvasText'
        }, {
            motionValue: 200,
            shadowBlurGene: 50,
            textSize: 32,
            textColor: '#F6F5F3',
            BrightTextColor: '#20607A',
            pointerText: 'ME!',
            pointerSize: 28,
            pointerTextColor: '#00FFB0',
            circleColor: '#ffffff',
            shadowReversalIn: false,
            shadowReversalOut: true
        });

        var textLocationValueList = textLocationCountList();
        var rateIncreaseValue = recommendedRateValue();
        var circleGraphLocationValue = calCircleGraphLocation(canvasInfo, filteredSizeList, recommendedSizeData.sizeName);

        drawCircleGraphShadow(canvasInfo, rateIncreaseValue, circleGraphLocationValue);
        drawRecommendSizeText(canvasInfo, rateIncreaseValue, textLocationValueList, circleGraphLocationValue);
    }

    drawCircleGraph();


})();