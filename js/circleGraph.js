var recommendSizeData = {
    recommendSize: 'L',
    isCorrectGender: true,
    recommendRate: 0,
    status: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL']
};


var CircleGraph = function(elIds, circleGraphProperties) {
    
    if(!(this instanceof CircleGraph)){
      return new CircleGraph(elIds, circleGraphProperties);
    } 
    
    this.elIds = elIds;
    this.circleGraphProperty = circleGraphProperties;
    this.textSizeRatio = 2.5;

    this.sizeListData = this.getSizeListData();
    this.recommendedSizeList = this.recommendSizeList();
    this.sizeData = this.getSizeData();
    this.rateValue = this.gerRateValue();
    this.canvasInfo = this.initCanvas();
    this.circleGraphLocation = this.calCircleGraphLocation();
    this.recommendedSizeLocationValue = this.recommendSizeLocationValue();

    this.circleGraphNomalProperties = {
        textMotionValue: 300,
        shadowMotionValue: 1000,
        shadowBlurGene: 50,
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
    
    this.drawCircleGraph();
    
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


    recommendSizeList: function () {
        var listData = this.sizeListData;

        var filteredSizeList = listData.sizesList.filter(function (item, index) {

            if (listData.sizesIndex === 0) {
                if (index < listData.sizesIndex + 5) {
                    return item;
                }
            } else if (listData.sizesIndex == 1) {
                if (index < listData.sizesIndex + 4) {
                    return item;
                }
            } else if (listData.sizesIndex == listData.sizesLength - 1) {
                if (index > listData.sizesIndex - 5) {
                    return item;
                }
            } else if (listData.sizesIndex == listData.sizesLength - 2) {
                if (index > listData.sizesIndex - 4) {
                    return item;
                }
            } else {
                if (index > listData.sizesIndex - 3 && index < listData.sizesIndex + 3) {
                    return item;
                }
            }
        });
        return filteredSizeList;
    },


    getSizeData: function () {
        var recommendedSizeData = {
            sizeRate: recommendSizeData.recommendRate,
            sizeName: recommendSizeData.recommendSize,
            sizeIndex: this.recommendedSizeList.indexOf(recommendSizeData.recommendSize),
            totalSizes: this.recommendedSizeList,
            totalSizesLength: this.recommendedSizeList.length
        };
        return recommendedSizeData;
    },


    gerRateValue: function () {
        if (this.sizeData.totalSizesLength >= 5) {

            if (this.sizeData.sizeRate >= 3 && this.sizeData.sizeRate > 0 || this.sizeData.sizeRate < 0 && this.sizeData.sizeRate <= -3) {
                return 1;
            } else {
                return 0;
            }

        } else if (this.sizeData.totalSizesLength == 4) {

            if (this.sizeData.sizeRate <= 3 && this.sizeData.sizeRate > 0 || this.sizeData.sizeRate < 0 && this.sizeData.sizeRate >= -3) {
                return 1;
            } else if (this.sizeData.sizeRate >= 4 && this.sizeData.sizeRate > 0 || this.sizeData.sizeRate < 0 && this.sizeData.sizeRate <= -4) {
                return 2;
            } else {
                return 0;
            }

        } else if (this.sizeData.totalSizesLength == 3) {

            if (this.sizeData.sizeRate <= 2 && this.sizeData.sizeRate > 0 || this.sizeData.sizeRate < 0 && this.sizeData.sizeRate >= -2) {
                return 1;
            } else if (this.sizeData.sizeRate == 3 && this.sizeData.sizeRate > 0 || this.sizeData.sizeRate < 0 && this.sizeData.sizeRate == -3) {
                return 2;
            } else if (this.sizeData.sizeRate >= 4 && this.sizeData.sizeRate > 0 || this.sizeData.sizeRate < 0 && this.sizeData.sizeRate <= -4) {
                return 3;
            } else {
                return 0;
            }

        } else if (this.sizeData.totalSizesLength == 2) {

            if (this.sizeData.sizeRate > 0) {
                return this.sizeData.sizeRate;
            } else if (this.sizeData.sizeRate < 0) {
                return -this.sizeData.sizeRate;
            } else {
                return this.sizeData.sizeRate;
            }

        }
    },


    initCanvas: function () {
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
        var piePieceAllMotion = 18 * this.circleGraphProperty.shadowMotionValue;
        var piePieceCount = 5;

        if (this.sizeData.totalSizesLength == 3) {
            piePieceCount += 2;
        } else if (this.sizeData.totalSizesLength == 2) {
            piePieceCount += 5;
        }

        var piePieceMotion = piePieceCount * this.circleGraphProperty.shadowMotionValue;
        var radian = ((2 * Math.PI) / piePieceAllMotion) * piePieceMotion;
        var calculatedsizeIndex = (Math.PI / 18) * (this.sizeData.sizeIndex * 6 + 3);

        var canvasHalfWidth = this.canvasInfo.shadowCanvas.width / 2;
        var radius = this.canvasInfo.textCanvas.height / 2;
        var pointerRadius = this.canvasInfo.textCanvas.height / 4;

        return {
            canvasHalfWidth: canvasHalfWidth,
            radian: radian,
            radius: radius,
            pointerRadius: pointerRadius,
            calculatedsizeIndex: calculatedsizeIndex,
        };
    },


    recommendSizeLocationValue: function () { //2
        var self = this;

        var recommendedSizePointerValue;
        var recommendedSizePointerText;
        var textLocationValueList = [];
        var rangeCount = 3;
        var avgCount = 3;

        for (var i = 0; i < 13; i++) {
            textLocationValueList[i] = i + 3;
        }

        if (self.sizeData.totalSizesLength == 4) {
            avgCount = 4;
        } else if (self.sizeData.totalSizesLength == 3) {
            rangeCount = 4;
            avgCount = 6;
        } else if (self.sizeData.totalSizesLength == 2) {
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

        var pointerIndexValue = recommendedSizeList.forEach(function (item, index) {
            if (index == self.sizeData.sizeIndex) {
                recommendedSizePointerText = item;

                if (self.sizeData.sizeRate >= 0) {
                    recommendedSizePointerValue = item + self.rateValue;
                } else if (self.sizeData.sizeRate < 0) {
                    recommendedSizePointerValue = item - self.rateValue;
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
            recommendedSizeList: recommendedSizeList,
            recommendedSizeRangeList: recommendedSizeRangeList,
            recommendedSizePointerText: recommendedSizePointerText,
            recommendedSizePointerValue: recommendedSizePointerValue
        }

    },


    drawCircleGraphShadow: function () {
        var self = this;
        var startPoint;
        var startLocationValue = 0.39;
        var blurValue = 0;
        var increaseCount = this.rateValue / 10;

        if (this.sizeData.totalSizesLength == 4) {
            startLocationValue += 0.02 + (0.1 * this.sizeData.sizeIndex);
        } else if (this.sizeData.totalSizesLength == 3) {
            startLocationValue -= 0.11;
            startLocationValue += (0.33 * this.sizeData.sizeIndex);
        } else if (this.sizeData.totalSizesLength == 2) {
            startLocationValue -= 0.21;
            startLocationValue += (0.87 * this.sizeData.sizeIndex);
        }

        if (this.sizeData.sizeRate > 0) {
            startLocationValue += increaseCount;
        } else if (this.sizeData.sizeRate < 0) {
            startLocationValue -= increaseCount;
        }

        startPoint = (startLocationValue * Math.PI) + self.circleGraphLocation.calculatedsizeIndex;

        var pieGraphInterval = setInterval(function () {
            self.canvasInfo.shadowContext.clearRect(0, 0, self.canvasInfo.shadowCanvas.width, self.canvasInfo.shadowCanvas.height);

            self.drawShadowGraph(startPoint, self.circleGraphProperty.shadowReversalIn, "rgba(32,96,122," + blurValue + ")");
            self.drawShadowGraph(startPoint, self.circleGraphProperty.shadowReversalOut, "rgba(227,237,168," + blurValue + ")");

            self.canvasInfo.shadowContext.beginPath();
            self.canvasInfo.shadowContext.arc(self.circleGraphLocation.canvasHalfWidth, self.circleGraphLocation.canvasHalfWidth, self.circleGraphLocation.canvasHalfWidth / 1.32, 0, 2 * Math.PI);
            self.canvasInfo.shadowContext.shadowBlur = 0;
            self.canvasInfo.shadowContext.fillStyle = self.circleGraphProperty.circleColor;
            self.canvasInfo.shadowContext.fill();

            blurValue += 0.01;

            if (blurValue > 1) {
                clearInterval(pieGraphInterval);
            }
        }, self.circleGraphProperty.shadowMotionValue / 30);

        this.drawShadowGraph = function (startLine, reversal, shadowColor) {
            self.canvasInfo.shadowContext.beginPath();
            self.canvasInfo.shadowContext.moveTo(self.circleGraphLocation.canvasHalfWidth, self.circleGraphLocation.canvasHalfWidth);
            self.canvasInfo.shadowContext.arc(self.circleGraphLocation.canvasHalfWidth, self.circleGraphLocation.canvasHalfWidth, self.circleGraphLocation.canvasHalfWidth / 1.32, startLine, startLine + self.circleGraphLocation.radian, reversal);
            self.canvasInfo.shadowContext.shadowColor = shadowColor;
            self.canvasInfo.shadowContext.shadowBlur = self.circleGraphProperty.shadowBlurGene;
            self.canvasInfo.shadowContext.closePath();
            self.canvasInfo.shadowContext.fillStyle = self.circleGraphProperty.circleColor;
            self.canvasInfo.shadowContext.fill();
        };

    },


    drawCircleGraphText: function () {
        var self = this;
        var sizeListLength = this.recommendedSizeLocationValue.recommendedSizeList.length;
        var dotListLength = this.recommendedSizeLocationValue.recommendedSizeRangeList.length;
        var labelCount = 0;

        this.canvasInfo.textContext.translate(this.circleGraphLocation.radius, this.circleGraphLocation.radius);
        this.circleGraphLocation.radius = this.circleGraphLocation.radius * 0.8;

        this.canvasInfo.textContext.beginPath();
        this.canvasInfo.textContext.arc(0, 0, this.circleGraphLocation.radius / 1.05, 0, 2 * Math.PI);
        this.canvasInfo.textContext.fillStyle = this.circleGraphProperty.circleColor;
        this.canvasInfo.textContext.fill();

        this.canvasInfo.textContext.textAlign = "center";
        this.canvasInfo.textContext.fillStyle = this.circleGraphProperty.textColor;

        this.drawTextGraph = function (angle, text, sizeAvg) {
            self.canvasInfo.textContext.rotate(angle);
            self.canvasInfo.textContext.translate(0, -self.circleGraphLocation.radius * 0.8);
            self.canvasInfo.textContext.rotate(-angle);

            self.canvasInfo.textContext.font = "" + self.circleGraphProperty.textSize * self.textSizeRatio / sizeAvg + "px arial";
            self.canvasInfo.textContext.fillText(text, 0, 0);

            self.canvasInfo.textContext.rotate(angle);
            self.canvasInfo.textContext.translate(0, self.circleGraphLocation.radius * 0.8);
            self.canvasInfo.textContext.rotate(-angle);
        }

        for (var i = 0; i < sizeListLength; i++) {
            var sizeTextAngle = (this.recommendedSizeLocationValue.recommendedSizeList[i] + 9) * Math.PI / 9;
            
            this.drawTextGraph(sizeTextAngle, this.recommendedSizeList[labelCount], 1);
            labelCount++;
        }

        for (var i = 0; i < dotListLength; i++) {
            var dotTextAngle = (this.recommendedSizeLocationValue.recommendedSizeRangeList[i] + 9) * Math.PI / 9;
            
            this.drawTextGraph(dotTextAngle, "●", 2);
        }

    },


    drawCircleGraphColorText: function () {
        var self = this;
        var intervalCount = 0;
        var pointerTextCount = 0;
        var intervalStopCount = 0;

        var colorTextInterval = setInterval(function () {

            var circleLocationValue = self.recommendedSizeLocationValue.sizeListRange[intervalCount];
            var pointerAngle = (self.recommendedSizeLocationValue.recommendedSizePointerText + 9) * Math.PI / 9;
            var pointerMeAngle = (self.recommendedSizeLocationValue.recommendedSizePointerValue + 9) * Math.PI / 9;
            var colorTextAngle = (circleLocationValue + 9) * Math.PI / 9;
            var colorTextIndex = self.recommendedSizeLocationValue.recommendedSizeList.indexOf(self.recommendedSizeLocationValue.recommendedSizePointerText);

            var sizeTextLocation = self.recommendedSizeLocationValue.recommendedSizeList.filter(function (item) {
                if (circleLocationValue == item) {
                    return item;
                }
            });

            self.canvasInfo.textContext.rotate(colorTextAngle);
            self.canvasInfo.textContext.translate(0, -self.circleGraphLocation.radius * 0.8);
            self.canvasInfo.textContext.rotate(-colorTextAngle);

            if (circleLocationValue) {
                var textIndex = self.recommendedSizeLocationValue.recommendedSizeList.indexOf(circleLocationValue);

                if (self.sizeData.totalSizesLength == 2 && intervalCount < 13) {
                    self.drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                } else if (self.sizeData.totalSizesLength == 3 && intervalCount < 7) {
                    self.drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                } else if (intervalCount < 5) {
                    self.drawColorTextGraph(circleLocationValue, sizeTextLocation, textIndex, colorTextAngle);

                }

                self.canvasInfo.textContext.rotate(colorTextAngle);
                self.canvasInfo.textContext.translate(0, self.circleGraphLocation.radius * 0.8);
                self.canvasInfo.textContext.rotate(-colorTextAngle);

                intervalCount++;
                
            } else {
                pointerTextCount++;
                
            }

            if (pointerTextCount == 1) {
                self.drawPointTextGraph(self.recommendedSizeList[colorTextIndex], pointerAngle, 1.28, self.circleGraphProperty.textSize, 0);
                intervalStopCount++;

            } else if (intervalStopCount == 1) {
                self.drawPointTextGraph(self.circleGraphProperty.pointerText, pointerMeAngle, 1.85, self.circleGraphProperty.pointerSize, 10);
                clearInterval(colorTextInterval);

            }
        }, self.circleGraphProperty.textMotionValue);

        this.drawColorTextGraph = function (circleLocationValue, sizeTextLocation, textIndex, colorTextAngle) {
            self.canvasInfo.textContext.fillStyle = self.circleGraphProperty.brightTextColor;

            if (circleLocationValue == sizeTextLocation) {
                self.canvasInfo.textContext.clearRect(-25, -32, 50, 35);
                self.canvasInfo.textContext.font = "" + self.circleGraphProperty.textSize * self.textSizeRatio + "px arial";
                self.canvasInfo.textContext.fillText(self.recommendedSizeList[textIndex], 0, 0);
            } else {
                self.canvasInfo.textContext.clearRect(-colorTextAngle - 5, -colorTextAngle - 10, 20, 20);
                self.canvasInfo.textContext.font = "" + self.circleGraphProperty.textSize * self.textSizeRatio / 2 + "px arial";
                self.canvasInfo.textContext.fillText("●", 0, 0);
            }
        };

        this.drawPointTextGraph = function (text, angle, radius, textSize, filltextLocationY) {
                self.canvasInfo.textContext.translate(0, self.circleGraphLocation.radius / 1.25);

                self.canvasInfo.textContext.rotate(angle);
                self.canvasInfo.textContext.translate(0, -self.circleGraphLocation.pointerRadius * radius);
                self.canvasInfo.textContext.rotate(-angle);

                self.canvasInfo.textContext.clearRect(-25, -32, 50, 35);
                self.canvasInfo.textContext.font = "" + textSize * self.textSizeRatio + "px arial";
                self.canvasInfo.textContext.fillStyle = self.circleGraphProperty.pointerTextColor;
                self.canvasInfo.textContext.fillText(text, 0, filltextLocationY);

                self.canvasInfo.textContext.rotate(angle);
                self.canvasInfo.textContext.translate(0, self.circleGraphLocation.pointerRadius * radius);
                self.canvasInfo.textContext.rotate(-angle);
            };

    },


    drawCircleGraph: function () {
        this.drawCircleGraphShadow();
        this.drawCircleGraphText();
        this.drawCircleGraphColorText();
    }

    
};

