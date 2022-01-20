## 목적

jQuery를 사용하지 않고 sortable 구현하기.

## sortable이란?

메모장에서 메모 하나를 꾹 눌러서 위치를 바꿀 수 있는 기능을 생각하면 된다.
(영상 첨부)

## 순서대로 만들어봅시다.

## 참고 자료

1. [index.html](./index.html)에서 [draggable](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/draggable) 속성이 필요하다.
   말 그대로 드래그가 가능해진다. 1번과 2번의 차이를 보자. 1번에서는 마우스로 꾹 누르고 옮겨도 아무 변화가 없지만, 2번에서는 끌고 가는 듯한 모습이 보인다.

   <img src="https://user-images.githubusercontent.com/64337152/150275515-38a56fb2-70ea-4490-9ec6-c4dc8c885a80.gif" width=400>

2. [ts](./src/sortable.ts)에서 선택한 dragabble은 반투명하게 수정한다.
   addEventListener()의 [type](https://developer.mozilla.org/ko/docs/Web/Events)에는 'click'만 있는 것이 아니다. 'dragstart'와 'dragend'도 있다. 드래그가 시작되었을 때 반투명하게 만들고, 끝났을 때는 원래대로 투명하게 바꿔준다.

   <img src="https://user-images.githubusercontent.com/64337152/150277221-e290eaed-25cd-4385-98be-d5c9538b24ba.gif" width=400>

3. 선택한 요소를 마우스 아래에 있는 container에 넣는다.
   parent.[appendChild](https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild)(child)는 child를 parent의 맨 마지막 요소에 넣는다.

   <img src="https://user-images.githubusercontent.com/64337152/150278648-bae0e0d0-2b47-4f01-a419-222ba164fc73.gif" width=400>

4. 현재는 요소를 선택만 해도 위치가 바뀐다는 것이다. 가장 가깝게 위치한 요소 바로 위에 위치해야 한다.

   `const offset = clientY - box.top - box.height / 2;`를 쓰면 클릭한 요소으 기존 위치
   <img width="440" alt="image" src="https://user-images.githubusercontent.com/64337152/150301679-3026ca5c-45ac-42c6-8a04-5dc901769bc4.png">


- [Youtube](https://www.youtube.com/watch?v=jfYWwQrtzzY)
- [Codepen 1](https://codepen.io/WebDevSimplified/pen/JjdveeV?ref=morioh.com&utm_source=morioh.com)
- [Codepen 2](https://codepen.io/vtno/pen/MXmpoy?editors=1111)
