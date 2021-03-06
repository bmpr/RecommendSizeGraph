##circleGraph(page3)

원 도형 그리고 도형 위 사이즈 텍스트 넣기.
   - `canvas acr()` 원을 그리고 `rotate()`와 `translate()`로 사이즈 텍스트 배치
   - 사이즈 텍스트를 좌표값으로 원하는 위치에 넣기 위해 **W3C drawClock** 예제 참고함
   
   
원 도형 뒤 그림자 효과 주기.
   - 원 도형 뒤로 원하는 그림자 효과를 주기위해 `arc()`로 부채꼴을 그리고 `shadow()`로 그림자 효과 추가
   - 데이터 값에 따른 도형을 이동시키기위해 **naverRadian**을 참고하였고, 애니메이션을 효과를 위해 `setInterval()` 사용
   - 데이터 값에 따른 그림자 효과를 정확한 위치로 이동시킴에 어려움이 있어, 사이즈 텍스트를 가리키는 라인을 그리고 위치를 잡아 그리면 도움이 된다


그림자 효과 및 **This!** 텍스트 포인터 이동
   - 추천 사이즈 값과 세부 수치에 따른 그림자 효과 및 **This!** 포인터 이동
   - 2번 그림자 위치를 기준으로 좌표 값 계산


추천 사이즈 값에 따른 텍스트 색상변경
   - 추천 사이즈 텍스트 그리는 부분에 색상 변경 조건 추가
   - 추천 사이즈 범위의 **`.`** 텍스트에 위와 같은 조건을 주어 색상 변경


###디자인 애니메이션 효과 변경 및 추가 요청사항
   - 좌에서 우로 그려지는 효과 -> 숨어있다가 점점 나타나며 보이는 효과
   - 추천 사이즈 애니메이션 효과 범위 변경
   - 추천 사이즈 범위 내 텍스트 순차적으로 색상이 변경되는 효과 구현
   - 캔버스 파트 색상 변경(레드계열->블루계열)


원 도형 뒤 점점 나타나는 그림자 효과 주기 (변경 요청된 부분)
   - 이전 그림자 효과와 비슷하게 구현되나, 좌에서 우로 그려지는 애니매이션을 제거하고 `fillstyle()=rgba()`에 점차 증가하는 조건을 주어 구현


추천 사이즈 및 **`.`** 텍스트 순차적으로 나타나는 효과
   - 추천 받은 텍스트 좌표값을 기준으로 하여 `setInterval()`활용해서 구현
   - 추천 사이즈 포인트 색상주기 - `clearInterval()`실행 후 위치값 임의 변경후 속성 추가


**canvas** 해상도 높이기
   - `canvas 태그` 속성에 `width, height` 값을 디자인 규격대비 2배정도 높이고, `css style` 속성에 `width, heigh` 사이즈를 디자인 규격에 맞춤


###디자인 애니메이션 효과 변경 및 추가 요청사항
   - 사이즈 추천 텍스트 **This!** -> **ME!** 로 변경
   - **ME!** 텍스트 기준으로 그림자 효과 배분하기.
   - **ME!** 텍스트 위치는 `canvas`내 그려진 **'.'** 위에 고정
   - `canvas` 도형 그림자 `blur` 효과로 나타내기


**"ME!"**텍스트 기준으로 그림자 효과 배분 및 **'.'** 위 고정
   - 기존 그래프에서 조건 및 좌표값 변경
   

추천 사이즈, 리스트 값에 따른 사이즈 텍스트 개수 및 위치 변경
   - `_.filter()`메서드를 사용하여 추천 사이즈 텍스트 위치, 범위, 리스트 추출


추천 사이즈, 세부 수치에 따른 **Blur** 효과
   - 텍스트 위치를 기준으로 데이터 값에 따라 좌표값 계산 후 효과적용


**Canvas.Context.font**에서 웹폰트 적용 이슈! (페이지 실행 후 **refresh**시 웹폰트가 적용안되는 현상 발생)
  - 웹 url로 불러오지 않고 폰트 다운로드 후 직접 경로로 적용


생성자 함수 실행시 사용자 입력값 오류에 따른 예외처리
   - `try..catch`문 사용
   - **해당 속성 : 에러 메시지** 형태로 출력


생성자 함수에서 **this.** 변수로 인한 외부접근 문제
   - this -> var 사용
   - 함수에 필요 값들은 매개변수로 받아 적용
   - **클로저**를 사용해 함수 실행


###디자인 변경 및 추가 요청사항
   - 추천 사이즈 목록 개수에 관계없이 사이즈간 사이에 **'.'** 텍스트 개수는 2개로 통일
   - 추천 사이즈 5개 기준으로 사이즈 위치 고정
   - `shadowBlur` 효과는 이미지로 대체될수 있음


###디자인 변경 및 추가 요청사항
   - `shadowBlur` 효과는 이미지로 대체
   - 추천 사이즈 목록 개수 5개 고정. 사이즈 사이 **'.'** 텍스트 개수는 2개씩
   - 추천 번위 양 끝에 **TIGHT**, **LOOSE** 넣기
   - S, M.. 알파벳 사이즈 경우 **M**사이즈가 중심 기준으로 배치하고 외 사이즈는 왼쪽부터 순차 배치
 
 
추천 조건에 따른 **Background Blur** 효과 주기
   - Blur 이미지 생성 후 데이터 값에 따라 `rotate(), translate()` 사용하여 회전
   - `globalAlpha()` 활용하여 서서히 나타나는 효과를 줌
 

추천 사이즈 개수 5개 고정 출력
   - 사이즈 개수 5개 미만 일 경우 `forEach()`사용하여 나머지 부분 **.** 텍스트로 대체   


생성자 함수 실행시 필요한 매개변수가 그래프 속성값을 충족 시키는지 확인하는 예외처리
   - 객체 개수 확인 후 **object, '' , null, undefind** 여부 확인 후 문제 있을시 에러 출력
   
   
추천 사이즈 종류 및 리스트 개수에 따라 그래프내 사이즈 위치 값 변경
  - 사이즈 종류 및 리스트 개수를 확인 하고 조건에 따라 변경된 사이즈 리스트를 반환하는 함수 추가
