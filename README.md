## 목적

jQuery를 사용하지 않고 sortable 구현하기.

## sortable이란?

메모장에서 메모 하나를 꾹 눌러서 위치를 바꿀 수 있는 기능을 생각하면 된다.
   <img width="440" alt="image" src="https://user-images.githubusercontent.com/64337152/150306550-c8ffcacd-f1b6-434a-9f87-68595a3100a9.gif">

## 순서대로 만들어봅시다.

1. [index.html](./index.html)에서 [draggable](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/draggable) 속성이 필요하다.
   말 그대로 드래그가 가능해진다. 1번과 2번의 차이를 보자. 1번에서는 마우스로 꾹 누르고 옮겨도 아무 변화가 없지만, 2번에서는 끌고 가는 듯한 모습이 보인다.

   <img src="https://user-images.githubusercontent.com/64337152/150275515-38a56fb2-70ea-4490-9ec6-c4dc8c885a80.gif" width=400>

2. [ts](./src/sortable.ts)에서 선택한 요소(draggable)는 반투명하게 수정한다.
   addEventListener()의 [type](https://developer.mozilla.org/ko/docs/Web/Events)에는 'click'만 있는 것이 아니다. 'dragstart'와 'dragend'도 있다. 드래그가 시작되었을 때 반투명하게 만들고, 끝났을 때는 원래대로 투명하게 바꿔준다.

   <img src="https://user-images.githubusercontent.com/64337152/150277221-e290eaed-25cd-4385-98be-d5c9538b24ba.gif" width=400>

3. 선택한 요소를 마우스 위치에 속한 container의 맨 아래에 넣는다.
   parent.[appendChild](https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild)(child)는 child를 parent의 맨 마지막 요소에 넣는다.

   <img src="https://user-images.githubusercontent.com/64337152/150278648-bae0e0d0-2b47-4f01-a419-222ba164fc73.gif" width=400>

4. 현재는 요소를 선택만 해도 위치가 바뀐다는 것이다. 가장 가깝게 위치한 요소 바로 위에 위치해야 한다. 이걸 어떻게 알 수 있을까?

   `const offset = clientY - box.top - box.height / 2;`를 쓰면 클릭한 요소의 가운데에 마우스가 위치했을 때 0, 더 위에 있을 때 음수, 더 아래에 있을 때 양수가 나온다. 이 값을 container 안에서 dragging이 아닌(선택한 요소가 아닌) 것들을 기준으로 현재 마우스 위치와 가장 가까운 것을 찾으면 된다.
   
   <img width="440" alt="image" src="https://user-images.githubusercontent.com/64337152/150301679-3026ca5c-45ac-42c6-8a04-5dc901769bc4.png">

5. 찾았으니 넣어보자. 위의 컨테이너에서 4의 위치에서 아래로 당기면 offset이 음수가 되지 않아 `closestOffset`이 갱신되지 않는다. 이때는 `appendChild()`로 컨테이너의 맨 끝에 넣어준다. 이게 아니면 `insertBefore()`로 가장 가까운 요소의 바로 위에 넣어주면 된다.

   <img width="440" alt="image" src="https://user-images.githubusercontent.com/64337152/150306511-7a55d27a-a074-4bb7-a5d0-a1e9fdf6211d.gif">

## javascript와 typescript의 차이

- js에서 reduce()의 return값은 any이지만, typescript는 array에 들어간 요소의 타입과 같아야 한다.
  - `draggableElements`는 `Element[]`이므로 `draggableElements.reduce`에서 리턴값은 `Element`여야 한다.
- 그래서 reduce()로 새로 만든 object([origin_sortable](./src/origin_sortable.js)의 `{ offset: offset, element: child }`)를 리턴할 수 없다.
- js에서는 closest.offset을 object 안에서 갱신했지만, ts에서는 이게 불가능하기 때문에 `closestOffset` 변수를 새로 선언하였다.

## 주의사항

- reduce()에서 초깃값을 설정하지 않으면 `closest`가 `draggableElements[0]`의 값으로 자동 저장이 되고, 이 값으로 **콜백 함수의 코드가 실행되지 않는다**. 따라서 초깃값을 설정해서 `draggableElements[0]`의 값도 offset 계산이 되도록 해야 한다.

## 참고 자료

- [Youtube](https://www.youtube.com/watch?v=jfYWwQrtzzY)
- [Codepen 1](https://codepen.io/WebDevSimplified/pen/JjdveeV?ref=morioh.com&utm_source=morioh.com)
- [Codepen 2](https://codepen.io/vtno/pen/MXmpoy?editors=1111)
