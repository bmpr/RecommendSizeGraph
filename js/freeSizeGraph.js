        var data = {
            graphType: 1,
            direction: 'left',
            percent: 50
        };

        var FreeSizeGraph = (function () {

            var FreeSizeGraph = function (elIds, graphProperties) {
                var graphDefaultProperties = {
                    lineCount: 12,
                    centerLineValue: 6,
                    canvasRatio: 2.5,
                    motionValue: 10,
                    fontStyle: 'Flexo-Bold',
                    recommendLineColor: '#ffffff',
                    circleColor: '#F3F3F0',
                    imgLineColor: '#EBEBE8',
                    percentTextColor: '#FBFBFB',
                    recommendTextColor: '#00FFB0',
                    recommendTextSize: 14,
                    recommendText: 'Me!',
                    percentTextSize: 25,
                    textAlign: 'center',
                    imgLineWidth: 2,
                    recommendLineWidth: 4,
                    imgLineGeneValue: 0.3,
                    recommendLineGeneValue: 1,
                    circleRadius: 100,
                    easyInLineRange: 8,
                    easyOutLineRange: 3,
                    easyInOutSpeed: 3,
                    easyCenterSpeed: 7
                }

                var defaultPropertyKeys = Object.keys(graphDefaultProperties);
                var propertyCheckCount = 0;

                for (var value in graphProperties) {
                    if (graphDefaultProperties.hasOwnProperty(value)) {
                        propertyCheckCount++;

                    }
                }

                if (defaultPropertyKeys.length == propertyCheckCount) {

                    checkPropertiesInfomation(elIds);
                    checkPropertiesInfomation(graphProperties);

                    function checkPropertiesInfomation(propertyValues) {

                        for (var value in propertyValues) {

                            if (typeof propertyValues !== "object") {
                                throw new Error(propertyValues + ": not an object");

                            } else if (propertyValues[value] === null) {
                                throw new Error(propertyValues + ": object is null");

                            } else if (propertyValues[value] === undefined) {
                                throw new Error(propertyValues + ": object is undefined");

                            } else if (propertyValues[value] === '') {
                                throw new Error(propertyValues + ": object is empty");

                            }
                        }
                    }

                } else {
                    throw new Error("poralGraph() : count of properties is different");
                }

                var runGraph = this.drawFreeSizeGraph(elIds, graphProperties);
            };

            FreeSizeGraph.prototype = {

                //**그래프 그리기
                drawFreeSizeGraph: function (elId, graphProperties) {
                    var canvasInfo = this.initCanvas(elId),
                        canvasLocationValues = this.calCanvasLocationValue(canvasInfo, graphProperties),
                        graphBackground = this.drawGraphBackground(canvasInfo, canvasLocationValues, graphProperties, 0),
                        lineAnimation = this.drawRecommendLineUp(canvasInfo, canvasLocationValues, graphProperties);
                },

                //**캔버스 초기화 후 캔버스 정보 반환
                initCanvas: function (elId) {
                    var canvasFreeSize = document.getElementById(elId.canvas_graph_free),
                        canvasMeText = document.getElementById(elId.canvas_text),
                        freeSizeContext = canvasFreeSize.getContext("2d"),
                        meTextContext = canvasMeText.getContext("2d");

                    return {
                        canvasFreeSize: canvasFreeSize,
                        canvasMeText: canvasMeText,
                        freeSizeContext: freeSizeContext,
                        meTextContext: meTextContext
                    }
                },

                //**그래프 위치값 계산 후 값 반환
                calCanvasLocationValue: function (canvasInfo, graphProperties) {
                    var canvasHalfWidth = canvasInfo.canvasFreeSize.width / 2,
                        circleAreaDivesion = canvasInfo.canvasFreeSize.width / graphProperties.lineCount,
                        lineLocationValue = (5 / 100) * data.percent,
                        leftLine = 1 + lineLocationValue,
                        rightLine = (graphProperties.lineCount - 1) - lineLocationValue,
                        lineHeightDivision = canvasInfo.canvasFreeSize.height / 10,
                        leftStopLine = circleAreaDivesion * leftLine,
                        rightStopLine = circleAreaDivesion * rightLine,
                        movingLineValue = circleAreaDivesion * (graphProperties.centerLineValue);

                    return {
                        canvasHalfWidth: canvasHalfWidth,
                        circleAreaDivesion: circleAreaDivesion,
                        lineLocationValue: lineLocationValue,
                        leftLine: leftLine,
                        rightLine: rightLine,
                        lineHeightDivision: lineHeightDivision,
                        leftStopLine: leftStopLine,
                        rightStopLine: rightStopLine,
                        movingLineValue: movingLineValue
                    }
                },

                //**그래프 내 이미지 그리기
                drawRecommendImg: function (canvasInfo, graphProperties) {
                    var imgWidth = 200 * graphProperties.canvasRatio,
                        imgHeight = 160 * graphProperties.canvasRatio; // 데이터 값 확정 후 사이즈 변경예정.

                    freeSizeGraphImg = document.getElementById("img_Graph");
                    canvasInfo.freeSizeContext.drawImage(freeSizeGraphImg, (canvasInfo.canvasFreeSize.width - imgWidth) / 2, (canvasInfo.canvasFreeSize.height - imgHeight) / 1.2, imgWidth, imgHeight);
                },

                //**그래프 영역만 클립 하여 그리기(바탕, 추천 범위 선, %텍스트)
                drawGraphBackground: function (canvasInfo, canvasLocationValues, graphProperties, lineChangeValue) {
                    canvasInfo.freeSizeContext.beginPath();
                    canvasInfo.freeSizeContext.arc(canvasLocationValues.canvasHalfWidth, canvasLocationValues.canvasHalfWidth, graphProperties.circleRadius * graphProperties.canvasRatio, 0, 2 * Math.PI);
                    canvasInfo.freeSizeContext.strokeStyle = graphProperties.recommendLineColor;
                    canvasInfo.freeSizeContext.stroke();
                    canvasInfo.freeSizeContext.clip();

                    canvasInfo.freeSizeContext.beginPath();
                    canvasInfo.freeSizeContext.fillStyle = graphProperties.circleColor;
                    canvasInfo.freeSizeContext.fillRect(0, canvasLocationValues.lineHeightDivision, canvasInfo.canvasFreeSize.width, canvasInfo.canvasFreeSize.height);
                    canvasInfo.freeSizeContext.fill();

                    this.drawRecommendImg(canvasInfo, graphProperties);

                    canvasInfo.freeSizeContext.save();
                    canvasInfo.freeSizeContext.beginPath();
                    canvasInfo.freeSizeContext.globalAlpha = graphProperties.imgLineGeneValue;

                    for (var i = 0; i < 12; i++) {
                        canvasInfo.freeSizeContext.moveTo(canvasLocationValues.circleAreaDivesion * i, canvasLocationValues.lineHeightDivision);
                        canvasInfo.freeSizeContext.lineTo(canvasLocationValues.circleAreaDivesion * i, canvasInfo.canvasFreeSize.height);
                    }

                    canvasInfo.freeSizeContext.lineWidth = graphProperties.imgLineWidth;
                    canvasInfo.freeSizeContext.strokeStyle = graphProperties.imgLineColor;
                    canvasInfo.freeSizeContext.stroke();
                    canvasInfo.freeSizeContext.restore();

                    canvasInfo.freeSizeContext.beginPath();
                    canvasInfo.freeSizeContext.fillStyle = graphProperties.percentTextColor;
                    canvasInfo.freeSizeContext.font = (graphProperties.percentTextSize * graphProperties.canvasRatio) + "px " + graphProperties.fontStyle + "";
                    canvasInfo.freeSizeContext.textAlign = graphProperties.textAlign;
                    canvasInfo.freeSizeContext.fillText(data.percent + '%', canvasLocationValues.canvasHalfWidth, canvasLocationValues.canvasHalfWidth * 1.2);
                    canvasInfo.freeSizeContext.fill();
                },

                //**추천 라인 그리기(상하이동)
                drawRecommendLineUp: function (canvasInfo, canvasLocationValues, graphProperties) {
                    var lineUpCount = 0;
                    var self = this;
                    var lineInterval = setInterval(function () {
                        var bothEndLine = canvasInfo.canvasFreeSize.height - canvasLocationValues.lineHeightDivision;
                        self.drawGraphBackground(canvasInfo, canvasLocationValues, graphProperties, 0);

                        canvasInfo.freeSizeContext.beginPath();
                        canvasInfo.freeSizeContext.globalAlpha = graphProperties.recommendLineGeneValue;
                        canvasInfo.freeSizeContext.moveTo(canvasLocationValues.movingLineValue, bothEndLine);
                        canvasInfo.freeSizeContext.lineTo(canvasLocationValues.movingLineValue, bothEndLine - lineUpCount);
                        canvasInfo.freeSizeContext.lineWidth = graphProperties.recommendLineWidth;
                        canvasInfo.freeSizeContext.strokeStyle = graphProperties.recommendLineColor;
                        canvasInfo.freeSizeContext.stroke();

                        if (canvasLocationValues.lineHeightDivision * graphProperties.easyInLineRange < bothEndLine - lineUpCount || canvasLocationValues.lineHeightDivision * graphProperties.easyOutLineRange > bothEndLine - lineUpCount) {
                            lineUpCount += graphProperties.canvasRatio / graphProperties.motionValue + graphProperties.easyInOutSpeed;

                        } else {
                            lineUpCount += graphProperties.canvasRatio / graphProperties.motionValue + graphProperties.easyCenterSpeed;

                        }

                        if (bothEndLine - lineUpCount <= canvasLocationValues.lineHeightDivision) {
                            clearInterval(lineInterval);
                            self.drawRecommendLineTurn(canvasInfo, canvasLocationValues, graphProperties);
                        }
                    }, graphProperties.motionValue);
                },

                //**추천 라인 그리기(좌우이동)
                drawRecommendLineTurn: function (canvasInfo, canvasLocationValues, graphProperties) {
                    var lineChangeValue = 0;
                    var num = 0;
                    var self = this;
                    var bothLineInterval = setInterval(function () {
                        self.drawGraphBackground(canvasInfo, canvasLocationValues, graphProperties, lineChangeValue);

                        canvasInfo.freeSizeContext.save();
                        canvasInfo.freeSizeContext.beginPath();

                        if (data.direction == 'left') {
                            canvasInfo.freeSizeContext.moveTo(canvasLocationValues.movingLineValue - lineChangeValue, canvasLocationValues.lineHeightDivision);
                            canvasInfo.freeSizeContext.lineTo(canvasLocationValues.movingLineValue - lineChangeValue, canvasInfo.canvasFreeSize.height);

                        } else {
                            canvasInfo.freeSizeContext.moveTo(canvasLocationValues.movingLineValue + lineChangeValue, canvasLocationValues.lineHeightDivision);
                            canvasInfo.freeSizeContext.lineTo(canvasLocationValues.movingLineValue + lineChangeValue, canvasInfo.canvasFreeSize.height);
                        }

                        canvasInfo.freeSizeContext.lineWidth = graphProperties.recommendLineWidth;
                        canvasInfo.freeSizeContext.strokeStyle = graphProperties.recommendLineColor;
                        canvasInfo.freeSizeContext.stroke();
                        canvasInfo.freeSizeContext.restore();

                        lineChangeValue += 0.1 + (lineChangeValue / graphProperties.motionValue);

                        if (data.direction == 'left' && canvasLocationValues.movingLineValue - lineChangeValue <= canvasLocationValues.leftStopLine) {
                            clearInterval(bothLineInterval);
                            self.drawMeColorText(canvasInfo, canvasLocationValues, graphProperties);

                        } else if (data.direction !== 'left' && canvasLocationValues.movingLineValue + lineChangeValue >= rightStopLine.rightStopLine) {
                            clearInterval(bothLineInterval);
                            self.drawMeColorText(canvasInfo, canvasLocationValues, graphProperties);

                        }
                    }, graphProperties.motionValue);
                },

                //** 추천 텍스트(ME) 그리기 
                drawMeColorText: function (canvasInfo, canvasLocationValues, graphProperties) {
                    canvasInfo.meTextContext.save();
                    canvasInfo.meTextContext.beginPath();
                    canvasInfo.meTextContext.fillStyle = graphProperties.recommendTextColor;
                    canvasInfo.meTextContext.textAlign = graphProperties.textAlign;
                    canvasInfo.meTextContext.font = (graphProperties.recommendTextSize * graphProperties.canvasRatio) + "px " + graphProperties.fontStyle + "";

                    var textClearSize = graphProperties.recommendTextSize * canvasLocationValues.canvasRatio * 2;

                    if (data.direction == 'left') {
                        canvasInfo.meTextContext.clearRect(canvasLocationValues.leftStopLine - textClearSize, 0, textClearSize, textClearSize);
                        canvasInfo.meTextContext.fillText(graphProperties.recommendText, canvasLocationValues.leftStopLine, canvasLocationValues.circleAreaDivesion);

                    } else {
                        canvasInfo.meTextContext.clearRect(rightStopLine.rightStopLine - textClearSize, 0, textClearSize, textClearSize);
                        canvasInfo.meTextContext.fillText(graphProperties.recommendText, rightStopLine.rightStopLine, canvasLocationValues.circleAreaDivesion);

                    }
                    canvasInfo.meTextContext.fill();
                    canvasInfo.meTextContext.restore();
                }

            };

            return FreeSizeGraph;
        })();