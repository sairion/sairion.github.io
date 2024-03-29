---
layout: post
title: "원자로를 탐구하는 힙스터를 위한 가이드: React 알아가기"
date: 2015-09-09 00:00:00
description: 페이스북의 React 라이브러리에 대해 알아보고, 컴포넌트와 데이터 흐름을 어떻게 표현하는지 설명합니다.
publish: true
---

<p style="font-size:12px;font-style:italic;">이 글은 <a href="http://webframeworks.kr">웹프레임웍스</a>에 연재중인 글들을 편집한 것으로, 제가 스포카에 재직 중일 때 <a href="https://spoqa.github.io/2015/09/09/react-guide-01.html">Spoqa Tech Blog에 올렸던 글</a>입니다.</p>

<img src="/react-guide-for-hipsters/homer.png" style="margin: 0 auto;" alt="0-Days Without New JavaScript Framework...is there any hope?">

## 1부: React 시작하기

여기서 React가 어떤 동기에 의하여 만들어졌고, 어떤 것을 해 주는 라이브러리인지, 그리고 React에 대해 일반적으로 오해하는 부분들에 대해 짚어보겠습니다.

### 페이스북은 왜 React를 만들었는가

페이스북은 왜 React를 만들었을까요? [공식](http://facebook.github.io/react/docs/why-react-ko-KR.html) [문서](http://facebook.github.io/react/blog/2013/06/05/why-react.html)의 내용을 조금 인용하자면, 페이스북은 "지속해서 데이터가 변화하는 대규모 애플리케이션을 구축하기" 위하여 React를 만들어졌다고 밝히고 있습니다.

"지속해서 데이터가 변화"한다는 것은 뭘까요? 예로, React를 사용하고 있는 페이스북 웹앱을 생각하면 될 것 같습니다. 페이스북의 글로벌 Notification, 페이스북 그룹 리스트, 댓글 창, 채팅 창 같은 인터페이스들은 시간이 지날수록 다른 사람들이 댓글을 달거나 말을 걸면 신호에 따라 서버에서 데이터를 요청해 업데이트하고, 이에 맞춰 뷰를 변경해줘야 합니다. 예를 들어, 이 컴포넌트들을 jQuery로 작성했다고 생각해 봅시다. 보통은 `jQuery#append`와 `jQuery#remove`와 같은 imperative(명령형) API를 이용해 XHR 이벤트의 발생에 따라 뷰 데이터를 갱신해줘야 할 것입니다.

#### 관심사의 분리

이런 컴포넌트들이 늘어날 때마다 개별적으로 뷰 로직을 짜야 하는 것은 끔찍한 일입니다. 또한, 뷰와 모델의 로직이 잘 분리되지 않고, 뒤섞이기 쉽습니다. 유지보수를 신경 쓰는 개발자들은 모델 데이터를 변경하는 로직과 뷰 로직을 분리하기 위해 나만의 '뷰 데이터 관리 도구'를 만들어, Separation of Concern (관심사의 분리)을 달성하게 되어 있습니다. 그러므로 Backbone.js이나 Angular.js와 같은 라이브러리들이 자연히 등장한 것이기도 합니다.

MV* 라이브러리의 선조이자, 가장 많이 사용하고 있는 라이브러리 중 하나인 Backbone.js은 보통 모델과 뷰를 분리해 앱을 작성합니다. 모델이 업데이트되면, 모델을 지켜보고 있는 뷰에서 템플릿을 새로 렌더링합니다. Backbone은 꽤 단순한 라이브러리이고 위의 jQuery를 이용해 뷰와 모델이 뒤섞여 있는 경우보다는 낫지만, 모델마다 적지 않은 줄의 절차적 코드로 이 업데이트 과정을 표현해야 합니다. 이런 과정을 덜 불편하게 하려고 Marionette 등의 라이브러리가 나와 있긴 하지만, 줄의 양이 줄어드는 정도일 뿐 큰 차이는 없습니다. 우리가 로직에 집중하기 위해서는 좀 더 많은 부분, 특히 뷰의 업데이트가 자동으로 이뤄져야 할 필요가 있습니다. React는 뷰 업데이트 과정을 단순화할 수 있게 도와줍니다.

#### 선언적인 API

React를 살펴보면, 생각보다 public 하게 사용할 수 있는 API는 몇 개 되지 않습니다. 왜냐하면, React에서 사용하는 치환형 언어인 [JSX](http://facebook.github.io/react/docs/jsx-in-depth-ko-KR.html)를 통해 어떤 형태로 뷰 데이터가 보여져야 하는지에 대해 *선언적으로 기술*하기 때문입니다. (복잡한 로직을 가진 뷰라면 현실적으로는 완전히 선언적인 코드를 짜기는 어렵지만, 어쨌든 '우리가 보고 싶은 결과물을 써 놓는다.' 라는 점은 같습니다) 명령형 API에 익숙한 입문자들이 React를 처음 접할 때 가장 많이 하는 실수 중 하나는, React의 라이프사이클 메서드 안에서 jQuery로 DOM을 조작하려고 하는 것입니다. React는 중간 과정이 아닌 결과물을 기술하는 것이기 때문에 그럴 필요가 (거의) 없습니다.

관심사의 분리와 선언적인 API가 주는 장점을 생각하면, React의 등장은 웹 프론트엔드 개발의 자연스러운 진화의 결과라고 볼 수 있습니다.

### React는 무엇인가: 뷰 레이어

이미 익숙한 jQuery, Backbone.js이나 Angular.js 등의 라이브러리들을  놔두고 React를 써야 할 이유가 있을까요? 개념을 분명히 해두자면, React를 쓴다고 Backbone.js이나 Angular.js를 사용하지 못하는 것은 아닙니다. 오히려 기존 라이브러리들과 React를 조합해 사용하는 사람들이 많습니다. 사례로는, 2013년에 칸 아카데미가 기존의 Backbone 앱의 뷰 레이어를 React로 교체해 사용한 것이 [알려져 있습니다](http://joelburget.com/backbone-to-react/).

React는 일반적으로 MV* 패턴에서 뷰 레이어만을 담당한다고 생각하면 됩니다. Backbone.js를 생각하면 `Backbone.View` 만이 있는 샘입니다. 하지만 React는 어떤 형태의 모델이 사용될 것인지에 대한 가정을 하지 않으므로 아무 라이브러리나 사용해도 무방하며, 작은 앱이라면 굳이 사용하지 않아도 상관없습니다. Ajax 요청, 데이터 조작이나 라우터 같은 기능들은 상황에 맞게 부가적인 라이브러리를 사용해야 합니다.

페이스북에서는 [Flux 아키텍쳐](http://facebook.github.io/flux/)를 이용하는데, 이를 React와 함께 사용할 수 있는 [자바스크립트 리퍼런스 구현](https://github.com/facebook/flux)이 공개되어 있습니다. 최근에는 [Redux](https://github.com/rackt/redux) 등의 다른 선진적인 Flux 아키텍쳐 구현체들의 영향을 받은 [Flux-utils](https://github.com/facebook/flux/pull/254)를 포함시키기도 했습니다. (페이스북 메인 웹앱에서 사용하는 것은 아니고, [페이스북 광고 도구에서 사용한다고](https://www.youtube.com/watch?v=9qcBlN6-qwY) 알려져 있습니다)

React를 이용한 뷰의 작성은 컴포넌트 API를 통해서 하게 되어 있습니다.

### React는 무엇인가: 컴포넌트를 통한 뷰 작성

React는 Reactive 한 단방향의 데이터 흐름을 가지고 있습니다. **Reactive**하다는 것은 상태(state)가 바뀌면 상태에 의존하는 뷰도 함께 업데이트된다는 것이며, **단방향 데이터 흐름**이라는 것은 한 방향으로 데이터가 흐른다는 것입니다. 데이터는 상위 컴포넌트(Parent)에서 하위 컴포넌트(Children)로 흐르게 되어 있는데, 이 데이터는 React에서 *prop*이라고 지칭되며, JSX에서는 HTML의 attribute처럼 작성됩니다.

#### 컴포넌트의 설계

예를 들어, 쇼핑몰의 쇼핑 카트를 React로 만든다고 생각해 봅시다. ([jsfiddle](http://jsfiddle.net/3zquhfeb/))

```javascript
var ShoppingCart = React.createClass({
    render () {
        return <div>
            <ShoppingItem name="kimchi" available={true} />
            <ShoppingItem name="rice" available={true} />
            <ShoppingItem name="curry" available={false} />
        </div>
    }
});

// 참고: 기존 html 엘리먼트가 아닌 한, 모든 커스텀 컴포넌트들의 이름은 대문자로
// 시작해야 하며 지켜지지 않으면 invariant 에러가 발생합니다.
var ShoppingItem = React.createClass({
    render () {
        return <div>
            <div>
                상품명: {this.props.name},
                구입가능: {this.props.available ? '가능' : '불가능'}
            </div>
        </div>
    }
});
```

컴포넌트 위계와 데이터 흐름을 설명하기 위해, 정말로 기본적인 React 컴포넌트들을 두가지 만들었습니다. 컴포넌트는 `<ShoppingCart />` -> `<ShoppingItem />` 형태의 부모-자식 형태의 관계를 맺게 되며, 더 많은 데이터를 표현해야 할 경우 더 다양하고 작은 컴포넌트들로 쪼개야 할 수도 있을 것입니다.

일반적인 쇼핑몰의 쇼핑 카트들에는 구매하고 싶은 수량을 써 줄 수도 있고, 삭제 버튼을 가지고 있기도 합니다. HTML에서 그러듯, `<ItemQuantity />` `<ItemDeleteButton />`와 같은 컴포넌트들은 당연히 ShoppingItem보다 낮은 위계에 작성해주면 됩니다. (번외: React는 단방향 데이터 플로우를 가지고 있다고 했는데, 그러면 수량과 삭제 버튼은 어디에 어떻게 값을 전달해야 할까요? 이는 글의 뒤에 가서 다룹니다)

컴포넌트들이 재사용을 위해 만들어졌다는 점을 생각해 볼 필요도 있습니다. 가령, `<ItemDeleteButton />` 에 모든 뷰를 표현하는 것보다는, 베이스 버튼 컴포넌트 `<Button />`를 만들어 전체 페이지들에 나오는 버튼들의 표현 로직, 인터랙션 로직을 추상화할 수도 있습니다. 하지만 전체 페이지에 버튼이 몇 개 없고, 서로 생긴 것도 많이 다르고, 앞으로 버튼을 추가할 일이 없다면 과도한 일반화는 무의미할 것입니다. 이런 점들을 고려하여 컴포넌트들을 설계할 필요가 있습니다. (팁: 추상화할 수 없는 버튼들이 페이지에 널려 있다면, 디자이너와 대화의 시간을 가져봅시다)

코드를 보면, 데이터는 `<ShoppingCart />`에서 `<ShoppingItem />`으로 흐르는 것이 명백합니다. `"kimchi"`, `"rice"`, `"curry"` 같은 스트링은 `<ShoppingCart />` 상위 컴포넌트의 `render()` 메서드에서 나타나는데, `<ShoppingItem />` 에서는 표현되지 않고 있습니다. `<ShoppingItem name="kimchi" available={true} />` 에서 HTML attribute처럼 써준 것이 하위 컴포넌트로 데이터를 주입하는 것입니다. 이 약간 익숙한 듯하지만 생소한 느낌의 문법은 React에서 사용하는 ***JSX***라는 치환 문법이며, 자세한 것은 나중에 다룰 예정입니다만 공식 문서를 읽어보면 사용법을 금방 이해할 수 있을 것입니다.

또한, React는 컴포넌트 라이프사이클 훅을 제공합니다. 컴포넌트가 마운트(Parent에서 `React.CreateElement` 함수 호출로 새 `ReactElement`를 만들거나, `React.render`로 DOM 컨테이너 위에 Render되는 순간)되는 순간과 언마운트되는 시점, 업데이트되는 시점 등을 표현하는 함수를 컴포넌트 스펙 오브젝트에서 메서드 형태로 구현해 주면 됩니다. 모든 React 컴포넌트들은 HTML의 DOM Event Level 0 이벤트 핸들러 같은 `onClick` 등의 prop에 함수를 넘김으로써 인터랙션을 표현할 수 있습니다. 이에 대해서는 나중에 더 자세히 다룹니다.

### React는 무엇인가: Virtual DOM과 Reconciliation

React는 HTML Element들을 Virtual DOM을 이용해 표현한다고 했습니다. Virtual DOM은 가상의 HTML Element들을 가지고 있다가, (재)렌더링하면 필요한 부분만 업데이트(DOM 조작)하는 방식입니다. Virtual DOM은 사실 그 개념을 알고 나면 React의 구현 디테일에 불과합니다만, `key` prop 등 차후 여러 API와 연관이 있으므로 개념을 제대로 알고 있을 필요가 있습니다.

React가 Virtual DOM을 만든 이유는 *Always re-render on update* 정책을 가지고 있기 때문입니다. jQuery 등을 이용하여 애플리케이션을 작성하면 모델이 업데이트되었을 때, 셀렉터 API를 이용해 필요한 컴포넌트들만 업데이트를 해주는 코드를 작성할 때가 많습니다. 하지만 React에서는 작성자가 원하는 결과물을 선언적으로 작성하므로, 그런 코드를 짤 필요가 없다고 위에서 언급했습니다. 이것이 가능해지려면, 일부보다는 해당 영역을 모두 새로 그리는 것이 바람직합니다.

하지만 jQuery로 모든 영역을 새로 그리게 구현하면 단점이 있기 마련입니다. 위의 쇼핑 카트 예제에서 '가능/불가능'을 보여주는 컴포넌트만 jQuery 셀렉터 API로 업데이트하다가, 쇼핑카트 전체를 지우고 새로 그리게 구현을 변경했다고 생각해봅시다.

작은 크기의 HTML 엘리먼트 트리라면 아무것도 아니겠지만, 카트 컴포넌트의 내용이 많아질수록 문제가 커집니다. 일단 속도가 늘어나는 엘리먼트의 양에 비례하여 더 많은 동기 DOM 조작 오퍼레이션을 수행해야 하므로 느려질 수밖에 없습니다. 그리고 사용성 문제들이 발생합니다. 가령 '수량' 을 보여주는 인풋 박스가 있고 거기에 키보드 커서가 올려져 있었다면 업데이트 후 엘리먼트가 지워지고 새로 쓰여졌을 시, 커서가 사라져 있게 되는 문제가 있습니다. 비슷하게, 사용자가 명시적으로 업데이트하지 않고 가지고 있던 (DOM state에만 존재하던) 정보들은 날아가버리게 됩니다.

React를 사용하면 이런 문제들은 많은 부분 해소됩니다. 가지고 있는 Virtual DOM 트리를 비교하면서 필요한 부분만 업데이트하기 때문입니다. 이것을 Reconciliation (비교조정)이라고 하며, 이 개념은 [React 공식 문서](http://facebook.github.io/react/docs/reconciliation-ko-KR.html)에 잘 설명되어 있습니다. (React 팀의 Christopher Chedeau가 [기고한 React의 diffing 알고리즘에 대한 글](http://calendar.perfplanet.com/2013/diff/)도 이를 잘 설명하고 있습니다) 비록 동기 DOM 배치 오퍼레이션을 매 업데이트 사이클마다 수행하는 것보다는 낫겠지만 위의 글을 보면 업데이트 전, 업데이트 후의 가상 엘리먼트 트리를 비교해야 하는 문제가 있습니다. 이 문제는 가장 최신의 알고리즘도 `O(n^3)`의 시간 복잡도를 가지고 있는 수준이므로, 여러 가지 휴리스틱을 통해 알고리즘의 복잡도를 `O(n)`까지 낮췄다고 설명하고 있습니다.

이런 React 렌더러의 최적화와 가상화 덕에, 우리는 뷰 업데이트 로직은 거의 신경 쓰지 않고 모델 데이터 관리와 결과물의 모양만 기술하면 됩니다. React의 Virtual DOM은 획기적인 아이디어이다 보니 다른 라이브러리들도 영향을 많이 받고 있는데, Ember.js에서도 [이를 도입](http://blog.nparashuram.com/2015/05/performance-boost-in-emberjs-from.html)하였으며 [virtual-dom](https://github.com/Matt-Esch/virtual-dom)이라는 별도의 구현체도 존재합니다. 또한, Virtual DOM을 넘어서 incremental update(증분 업데이트)를 표방한 구글의 [Incremental DOM](https://github.com/google/incremental-dom)도 등장했습니다.

하지만 DOM 가상화에 따른 혜택들은 위에서 말한 것에 그치지 않습니다. 가상화라는 것은 기본적으로 브라우저 구현에 코드가 의존하는 것을 넘어선다는 것을 의미하며, 브라우저의 구현 디테일 차이들을 덜 신경 써도 된다는 장점이 있습니다. 이 덕분에 [React Native](https://facebook.github.io/react-native/) 같은 프로젝트나, [React Canvas](https://github.com/Flipboard/react-canvas) 같이 최종 결과물이 DOM의 형태로만 쓰여지지 않는 프로젝트들이 등장할 수 있었습니다. React 팀에서는 이런 멀티 플랫폼 접근을 권장하기 위하여 최근 렌더러를 React에서 `react-dom` 패키지로 분리하고, React는 뷰 상태를 관리하는 상태 기계로 발전시켜 나가고 있습니다.

이제부터는 React에 대해 흔히 사람들이 가지는 오해들을 짚어보겠습니다.

### React에 대한 오해: React는 빠르다

위에서 말한 비교조정 알고리즘은 `O(n^3)`에서 `O(n)`까지 시간 복잡도를 끌어올리긴 했지만, 어쨌든 여전히 비교하는 것 외에도 많은 관리 작업을 수행하기 때문에, React는 기본적으로 빠르지 않습니다. 가끔가다 'React는 빠르다'라는 주장이 나오면, '해주는 것에 비해서는 빠르다.', '최적화를 잘 해주면 빨라진다.' 또는 '자바스크립트는 빠르다.' 정도로 받아들이면 되겠습니다. (만약 그런 것도 아니면, 저도 어떻게 해야 할지 모르겠네요)

최적화의 예시를 들자면, React는 기본적으로 런타임에서 invariant 등의 개발 편의 기능들이 있는데, 이런 부분을 프로덕션 빌드를 통해 제거해야만 합니다. 특히 애니메이션이 많은 SPA(단일 페이지 앱)를 만들다 보면 최적화의 필요성은 절실하게 느끼게 되는 부분이며, React의 최적화 방법에 대해서는 다음 글에 더 자세히 쓰도록 하겠습니다.

### React에 대한 오해: JSX는 템플릿 언어다

쉽게 오해하는 부분입니다만, JSX는 일반적인 템플릿 언어들과는 다릅니다. JSX는 ECMAScript로 치환되는 간단한 치환/확장 언어로서, 지금은 사라진 언어 명세인 [E4X에 영향을 받아](http://blog.vjeux.com/2013/javascript/jsx-e4x-the-good-parts.html) 만들어졌습니다. React 컴포넌트와 React.DOM 가상 엘리먼트 생성자들은 Babel과 같은 트랜스파일러를 통해 `React.createElement`함수 호출식으로 치환됩니다. 예를 들자면 다음과 같습니다.

```javascript
<div foo={0} bar={'baz'} />
// 치환 후
React.createElement('div', { foo: 0, bar: 'baz' });
```

JSX는 [Handlebars](http://guides.emberjs.com/v1.10.0/templates/displaying-a-list-of-items/)나 [Jinja2](http://jinja.pocoo.org/docs/dev/)와 같이 자체적인 if-else, 반복문, 조건적 표현 블럭 등의 제어구조를 가지고 있지 않고, ECMAScript 표현식들을 `{}` 안에 써준다는 정도에 그치기 때문에 제대로 된 템플릿 언어라고 보기에는 무리가 있습니다.

JSX는 ECMAScript로 치환되는 언어일 뿐이므로, ReactElement의 표현은 `React.createElement`함수 호출 식으로 직접 써도 됩니다. 하지만 JSX의 트랜스파일 결과물이 오브젝트 리터럴로 표현되어야 한다는 의견이 있어 차후 버전에서는 함수 호출 형태에서 벗어날 가능성이 있으며, 가독성이 많이 떨어지므로 그냥 JSX를 쓰기를 권장합니다.

### React의 현실 세계 사용은?

현실적으로 이야기하자면, React나 React 생태계는 아직 성숙한 단계라고 보기에는 무리가 있습니다. 이미 웬만한 수준의 애플리케이션들을 만들 수 있을 정도로 많은 모듈이 나와 있습니다만 (react-router, react-motion, redux, reflux, 등등..) 성숙도나 안정성은 React보다는 약간 떨어지는 수준입니다. 페이스북에서 개발자 도구를 열어 `require('React').version`을 쳐 보면 React의 최신 베타 릴리즈, 이 글을 쓰는 시점에서는 `0.14.0-beta3`를 프로덕션에서 사용하고 있다는 것을 [알 수 있습니다](https://twitter.com/sebmarkbage/status/632257978003951616). 이 정도로 React는 굉장히 안정적인 라이브러리지만, 주변의 모듈들은 굉장히 빠른 속도로 개발되는 중이므로 API가 너무 자주 바뀌거나 문서가 없는 경우가 허다합니다. (React 이슈의 논의를 이해하기 위해서는, 소스 안의 주석을 잘 읽어야...)

이런 상황이다 보니, 블로그로 잘 정리된 글을 찾는 것보다 Github나 Gist를 찾아보는 노력이 많이 필요합니다. 또한, 질문들은 IRC보다는 [Reactiflux](https://reactiflux.slack.com)라는 Slack 챗에서 많이 이뤄집니다. Github 계정을 가지고 있다면, [React Korea Gitter 채팅방](https://gitter.im/reactkr/discuss)에서도 한국어로 도움을 받을 수 있습니다.

아직 성숙하지 않은 생태계라는 점을 고려하면 자료(영문)는 굉장히 많은 편이지만, 재사용 가능한 컴포넌트 모듈의 수는 많지 않습니다. 당장 무언가를 검색하면 4-5개 넘는 플러그인들이 쏟아져 나오는 jQuery나 Angular.js 등 다른 라이브러리 생태계와는 비교되는 수준이며, 뭔가 새로 만들어야 할 때가 적지 않습니다. 하지만 React를 jQuery나 jQuery 플러그인과 함께 사용해도 거의 무방하다는 점을 생각해보면, 안 써야 할 이유도 적다고 볼 수 있습니다. (NPM의 적지 않은 React 컴포넌트 패키지들이 jQuery 플러그인들을 재-포장한 것들입니다) 또한, 공식적으로는 IE8까지의 사용을 지원하고 있으므로, 한국의 웹 현실을 생각해 볼 때 상당히 끌리는 점도 있습니다.

### React 입문자들에게 도움이 될만한 읽을거리

[http://www.slideshare.net/floydophone/react-preso-v2](http://www.slideshare.net/floydophone/react-preso-v2)

위의 슬라이드는 전 React 팀 소속이었던 Pete Hunt가 2013년에 발표했던 'Rethinking Best Practices' 키노트의 슬라이드이며, 글을 쓰는 지금의 시점에서도 대부분 유효한 내용입니다. React의 철학에 대해서 전체적으로 잘 설명하고 있습니다.

[https://speakerdeck.com/vjeux/react-css-in-js](https://speakerdeck.com/vjeux/react-css-in-js)

React에서는 CSS를 오브젝트로 인라인 스타일처럼 작성할 수 있는데, 그를 소개하고 미래에 대해 관측해보는 슬라이드입니다.

## 2부: React 컴포넌트와 컴포넌트 라이프사이클

<img src="/react-guide-for-hipsters/rail.jpg" style="margin: 0 auto;" alt="Rail control diagram">

<p style="font-size:14px;font-style:italic;text-align:center;">React를 안 쓰는 앱의 뷰와 모델의 대화록을 입수했습니다. (믿거나 말거나)</p>

위에서 React 앱은 컴포넌트를 통해 작성한다고 설명했습니다. 이제 본격적으로 컴포넌트를 어떻게 작성하고, React에서 제공하는 컴포넌트 관련 API들은 무엇들이 있는지 알아보도록 하겠습니다.

### React 컴포넌트 클래스를 작성하는 법: 클래식과 새로운 API

사용자가 작성하는 React 컴포넌트 클래스는 대문자로만 작성해야 하며, 소문자로 시작하는 컴포넌트 이름은 모두 HTML 엘리먼트로 간주됩니다 (따라서 Web Components 스펙과 같은 custom element를 사용하는 것은 현재 시점에서는 어렵습니다).

React 컴포넌트는 여러 가지 방법으로 작성할 수 있습니다. 대표적으로는 두가지 방법이 있습니다.

1. ES5 스펙 API를 이용하는 'Classic' 컴포넌트 클래스: `React.createClass(spec)` 생성자
2. 새로운 컴포넌트 클래스: `React.Component`의 상속

`React.Component`를 이용한 새로운 컴포넌트 클래스는 `React 0.13.0-beta-1`에서 처음 등장했습니다. ([자세한 소개 글](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html)) 전체적으로 봤을 때 기능상의 큰 차이가 있는 것은 아니며, 클래식 API도 deprecate되는 것이 아니라 계속 유지될 예정이므로 현재로써는 어떤 쪽을 사용해도 무방합니다. 하지만 알아둬야 할 차이점들이 존재합니다.

`React.createClass()` 함수에 스펙 오브젝트를 넣었을 때, 구현한 컴포넌트 스펙 메서드들의 `this`는 자동으로 인스턴스에 bind됩니다. (이것을 autobind라고 하며, 원래는 별도의 바인딩 함수가 존재하다가 차후 기본적으로 bind하게 변경되었습니다) 이렇게 bind가 되면 일일히 `Function#bind` 또는 `Function#apply`를 쓸 필요가 없어집니다.

하지만 autobind는 `React.createClass`를 통해 생겨난 객체가 많아질 때 그만큼 [초기 기동 시간을 저하](https://twitter.com/cpojer/status/632282293793484801)할 수 밖에 없고, React는 클래스 라이브러리가 아니라 뷰 라이브러리이니, 본연의 기능을 더 잘할 수 있는 네이티브 API로 기능을 이관하는 것이 `React.Component` 클래스의 디자인 의도라고 볼 수 있습니다.

#### 컴포넌트 클래스 API의 차이점 1: Autobind의 여부

클래식 API를 사용한 컴포넌트 클래스의 형태는 다음과 같습니다.

```javascript
var React = require('react');

var Hello = React.createClass({
    render: function() {
        return <div>Hello</div>;
    }
});
```

그리고 `React.Component`를 상속하는 컴포넌트 클래스의 형태는 다음과 같습니다.

```javascript
// ECMAScript 모듈 임포트: JSX가 차후 React.createElement(...)
// 으로 변환되므로 이렇게 `React`또한 임포트해야 함
import React, {Component} from 'react';

class Hello extends Component {
    render () {
        return <div>Hello</div>;
    }
}
```

약간의 형태 외에는 별로 다른 게 없어 보입니다.

약간 작위적인 예제지만, 'Hello'를 눌렀을 때 'World'로, 'World'를 눌렀을 때 'Hello'로 변하는 인터랙션을 추가해 봅시다. [jsfiddle](https://jsfiddle.net/sairion/e2v1rgkj/)

```javascript
class Hello extends React.Component {
    helloClicker (e) {
        var targ = e.target;
        targ.textContent = this.helloText(targ.textContent);
    }
    helloText (text) {
        return text === 'Hello' ? 'World' : 'Hello';
    }
    render () {
        return <div onClick={this.helloClicker}>Hello</div>;
    }
}

React.render(<Hello />, document.getElementById('container'));
```

Hello를 눌렀을 때, `Uncaught TypeError: Cannot read property 'helloText' of undefined` 같은 에러가 콘솔에서 뜨는 것을 볼 수 있습니다. 이벤트 핸들러의 `this`가 객체에 bind되지 않았을 때 생기는 문제입니다. 클래식 API로 선언한 컴포넌트 클래스에서는 `this`가 자동으로 바인딩되므로, 이런 문제가 생기지 않습니다.

```javascript
class Hello extends React.Component {
    helloClicker (e) {
        var targ = e.target;
        targ.textContent = this.helloText(targ.textContent);
    }
    helloText (text) {
        return text === 'Hello' ? 'World' : 'Hello';
    }
    render () {
        return <div onClick={this.helloClicker.bind(this)}>Hello</div>;
    }
}

React.render(<Hello />, document.getElementById('container'));
```

그러므로, 다음과 같이 `this.helloClicker.bind(this)`를 클릭 핸들러로 고쳐주면 됩니다. 이제 잘 작동하는 것을 볼 수 있습니다. [jsfiddle](https://jsfiddle.net/sairion/e2v1rgkj/1/)

#### 컴포넌트 클래스 API의 차이점 2: 믹스인의 사용

그 외의 중요한 차이점으로는 `React.Component` API는 mixin을 사용하지 못한다는 점이 있습니다.

한 때 mixin의 단점(불분명한 인풋과 아웃풋 등)을 들어 [React에서 mixin을 제거하자는 움직임](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)이 일기도 했지만, 현재는 mixin도 여전히 유용하다는 관점이 일반적인 상황입니다. React `0.12.x`부터 작성된 앱들은 mixin 인터페이스를 가진 경우가 많습니다. `React.Component` API를 사용하는 경우 HOC(Higher Order Component) 또는 ES7 데코레이터를 사용하는 인터페이스를 통해 앱을 외부 라이브러리와 연결할 수 있습니다. ([redux의 예](https://github.com/rackt/react-redux/blob/301730aed92260ab45b979d8faabc51987603f3c/README.md#support-for-decorators)) 만약 mixin이 중요한 업데이트 로직을 지배하는 라이브러리(i.e. [Reflux](https://github.com/reflux/refluxjs))를 사용한다면, 클래식 API를 이용합시다.

이 글에서는 일반적으로 많이 사용되고 있는 클래식 API를 기준으로 설명합니다.

### 컴포넌트 스펙

컴포넌트 클래스는 스펙 오브젝트 또는 클래스를 작성함으로써 작성할 수 있다는 것을 위에서 설명했습니다. 그렇다면 스펙에 들어갈 수 있는 것은 무엇이 있을까요?

#### `render()`

위에서 사용한 `render ()` 함수는 최소한으로 구현해야 하는 인터페이스이며, 컴포넌트가 어떤 `ReactElement`를 반환해야 하는지를 기술합니다. 처음에 실수하기 좋은 부분은, 하나의 root element만을 반환해야 한다는 점입니다. 즉 두 개의 엘리먼트 `<div></div><div></div>`를 반환할 수는 없고, `<div></div>`를 반환하는 것만 가능합니다. 여러 개의 엘리먼트를 반환해야 한다면, `<div />` 등의 Wrapper 엘리먼트로 한번 싸 줘야 합니다.

#### `statics`

`statics`는 클래식 API에서 사용하는 스펙 프로퍼티로, 정적으로 사용해야 하는 API를 표현할 때 사용합니다. (`React.Component` 를 서브클래싱하는 경우에는 ES2015의 [`static` 키워드](https://github.com/lukehoban/es6features/blob/d1db5467d5540cb05ff08871b0d68a670c2c337f/README.md#classes)를 이용해 표현하면 됩니다) 일반적인 OOP의 정적 멤버/함수처럼 인스턴스를 `this`로 참조할 수 없어 제한적이며 직접 사용할 일이 많지는 않은 것 같습니다. 외부 라이브러리 인터페이스로 사용하는 경우가 종종 있습니다.

#### `getInitialState()` 와 `getDefaultProps()`

이 스펙 프로퍼티들은 컴포넌트가 마운트하기 전 기본 `state`와 `props` 값을 지정하며, 오브젝트 또는 `null`을 반환하면 됩니다 (기본값은 `null`) [신경 써야 할 점](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern-ko-KR.html)은, `getInitialState()`에 Parent에서 받은 props를 주입하는 것에 대해서는 언제나 고려해 볼 필요가 있다는 것입니다.

#### `propTypes`

React에서는 `propTypes` 와 같은 스펙 프로퍼티도 존재하는데, 이는 컴포넌트의 prop의 type를 런타임에서 체크해주는 것입니다. 이를 통해 안전한 컴포넌트 작성에 도움을 받을 수 있습니다. (자세한 API는 [공식 문서](https://facebook.github.io/react/docs/reusable-components-ko-KR.html#prop-validation)를 참조하시길 바랍니다)

라이프사이클 API 메서드들은 아래에서 설명하겠습니다.

#### `mixins`

([공식 문서](https://facebook.github.io/react/docs/reusable-components-ko-KR.html)) `mixins`은 스펙 오브젝트에 배열로 기술하며, 요소들은 오브젝트가 들어가 있으면 됩니다. `mixins`의 요소들은 순서대로 불린다는 점, mixin 안의 스펙 메서드들과 라이프사이클 메서드들이 체이닝되어 불린다는 점은 문서에 써 있지만, 그 라이프사이클 메서드들이 어떤 식으로 체이닝되어 불리는지에 대해서는 써 있지 않습니다. mixin은 라이브러리에서도 인터페이스로 많이 이용하지만 직접 작성하게 될 때도 자주 있으므로, 이런 문제에 대해 잘 알고 있어야 합니다.

`getInitialState()`는 여러 개의 구현 메서드가 있을 경우, 최종 결괏값은 메서드들이 반환한 오브젝트의 머지된 값입니다. 즉 스펙에서 (편의상 약어 사용) `gIS() => { a: 1 }`를 쓰고 믹스인에서 `gIS() => { b: 1 }`를 썼다고 합시다. 그러면 최종적으로 사용자가 기대하게 되는 값은 `gIS() => { a: 1, b: 1}`이 됩니다. 하지만 유의할 점은, 프로퍼티 키가 중복되는 경우 invariant error를 던진다는 점입니다. 반면, `shouldComponentUpdate`와 같은 메서드는 여러 mixin에서 구현하면 'Uncaught Error: Invariant Violation: ReactClassInterface: You are attempting to define `shouldComponentUpdate` on your component more than once. This conflict may be due to a mixin.'와 같은 invariant 에러 메시지를 볼 수 있습니다.

### 컴포넌트 라이프사이클 API

라이프사이클 API는 위의 스펙 오브젝트에 메서드를 구현함으로서 작동합니다. 약간 이름이 길다고 느낄 수도 있는데, 네이밍에 비교적 일관성이 있어서 익숙해지면 쉽게 외울 수 있을 것 같습니다. 컴포넌트 라이프사이클은 언제나 단순히 기대하는 것처럼 작동하지는 않으므로, 스펙 문서를 잘 읽어둘 필요가 있습니다. 의문 사항이 있으면 공식 문서를 작업할 때마다 참고합시다.

라이프사이클 API들은 그 이름의 시제(will, did)가 암시하듯 다른 인자 값들을 받게 됩니다. 가령, `componentWillMount` 안에서의 인자로 주어지는 `state`는 미래의 `state` (nextState)이게 됩니다.

모든 라이프사이클 메서드들이 인자 값을 주지는 않으므로, [공식 문서](https://facebook.github.io/react/docs/component-specs-ko-KR.html)의 인자 시그니쳐를 참고합시다.

(라이프사이클 API들은 세 번째 인자 값으로 context라는 값을 주기도 합니다. Context는 문서화되어 있지 않지만 암시적으로 속성을 받는 편리한 특성 때문에 라이브러리 제작자들이 많이 사용하고 있는 속성입니다. 언제 사라지거나 API가 바뀔지 모르므로 사용에서는 신중을 가해야 합니다.)

#### `componentWillMount()`: 마운트 직전 한번

마운트 직전에 불리는 메서드이며, 마운트 직전에 하고 싶은 것들 (i.e. 방문자가 어떤 페이지를 방문했는지 구글 애널리틱스에 신호)을 할 수 있습니다. 이 시점에서 DOM 엘리먼트의 리퍼런스를 획득할 수는 없습니다.

#### `componentDidMount()`: 마운트 직후 한번

`componentDidMount()`는 하위 컴포넌트들에서 상위 컴포넌트의 순서로 불리며, 이 시점부터는 DOM 엘리먼트의 리퍼런스를 획득할 수 있습니다.

#### `componentWillReceiveProps(nextProps)`: 업데이트 직전

`componentWillReceiveProps ()`의 특징은 마운트 시에는 작동하지 않는다는 점입니다. '컴포넌트는 props를 받을 것이다'라는 이름 때문에 마운트 시에도 작동할 것이라고 착각하기 쉽습니다.

#### `componentWillUpdate(nextProps, nextState)`: 업데이트 직전

새로운 `props` 또는 `state`가 반영되기 직전 새 값들을 받습니다. 이 메서드 안에서 `this.setState()`를 사용하면 무한 루프가 일어나게 되므로, 사용할 수 없습니다.

#### `componentDidUpdate(prevProps, prevState)`: 업데이트 직후

DOM에 update가 반영된 직후 불립니다.

#### `componentWillUnmount()`: 언마운트 직전 한번

상위 컴포넌트가 언마운트를 했을 때, 또는 상위 API를 통해 언마운트가 되었을 때 불리며, 컴포넌트 안의 로직을 클린업해야 할 때 필요합니다. 슬라이드와 같이 컴포넌트 내부에서 인터벌 타이머를 작동시키고 있거나 기타 비동기 API를 호출한다면 이 함수 안에서 `clearInterval()` 등의 함수로 클린업을 하는 것이 좋습니다.

#### `shouldComponentUpdate(nextProps, nextState) => boolean`: 업데이트 직전의 직전 (`props`, `state` 모두 해당)

라이프사이클 메서드 중 유일하게 값을 반환해야만 하는 함수이며, `Boolean {true | false}` 값을 반환하면 됩니다. 최적화 또는 update의 side-effect로 인한 재 렌더를 방지하기 위해 사용하며, React는 상위 컴포넌트가 re-render를 할 경우 하위 컴포넌트들도 모두 새로 render를 하므로 (중)상위 컴포넌트에서 최적화를 실행하게 될 때가 많습니다. 만약 `shouldComponentUpdate()`의 로직이 너무 복잡해진다면, 컴포넌트의 위치나 `props`와 `state`에 대한 리팩터링을 해야 할 때인지 의심해 봐야 할 필요가 있습니다.

### 라이프사이클 API의 순서와 사이클

이에 대해 간단히 정리된 [gist](https://gist.github.com/fisherwebdev/8f6cb895348c587c8f1e)가 있습니다.

그리고 제가 어떤 순서로 메서드가 불리는지 라이브로 확인할 수 있는 [jsfiddle](https://jsfiddle.net/sairion/jejt34by/3/)을 만들었으니 확인하세요.

[Shallow render](http://facebook.github.io/react/docs/test-utils-ko-KR.html#shallow-rendering)(얕은 렌더링)을 할 경우는 메서드의 호출이 약간 차이가 있습니다. Shallow render를 간단하게 설명하자면, 컴포넌트를 테스트 용도로 한 레벨 깊이에서만 Render하는 것이며, 이는 브라우저 DOM 호스트 오브젝트 또는 JSDOM과 같은 가상환경이 없어도 작동하는 이점이 있습니다. Shallow render에 대해서는 잘 설명되어 있는 [gist](https://gist.github.com/jondlm/514405bea50fad6fd905)가 있으니 참고하세요.

### 컴포넌트 API

([공식 문서](https://facebook.github.io/react/docs/component-api-ko-KR.html))
그 외 중요한 API로서 알아야 할 것은, 컴포넌트 스펙 프로퍼티 또는 컴포넌트 라이프사이클 메서드 안에서 `this`로 접근하는 인스턴스의 메서드들입니다. 사실상 `this.setState()`만 쓴다고 생각하면 되며 나머지는 나중에 '이런 건 없나...?' 하고 찾아 보면 됩니다. `setState()` 외에는 대부분 없어질 예정이고, bad practice로 간주하여 사용이 권장되지 않습니다.

#### `setState(nextState, callback)`

비동기 배치 업데이트 함수로, `state`의 업데이트는 `this.state`에 바로 값을 assign하는 것이 아니라 `setState()`를 통해서만 해야 합니다. 비동기 함수이므로, 당연히 콜백이 있습니다. 첫 번째 인자로 `function (previousState, currentProps) { ... }` 시그니쳐의 함수를 넣어 업데이트 로직을 넣는 것도 가능합니다. `setState` 후에는 업데이트가 진행되지만, `componentWillReceiveState()` 같은 라이프사이클 메서드는 없다는 것을 복기할 필요가 있습니다. `setState` 직후의 로직은 콜백 함수로, 라이프사이클 메서드로는 `componentWillUpdate()`에 작성하면 됩니다.

#### `forceUpdate(callback)`

만약 state나 prop 오브젝트 안쪽의 깊은 값이 비 명시적인 방법으로 갱신되었다면 (다른 함수에서의 사이드 이펙트 등...) React에서 이를 감지할 방법은 없습니다. Backbone 등의 외부 라이브러리를 이용해 state를 bind했을 경우 등이 이에 해당되며, 이럴 때는 `forceUpdate()` 메서드를 사용하여 필요할 때마다 직접 업데이트를 요청해야 합니다. React를 직접 지원하는 Flux 라이브러리들을 이용하면, 이런 메서드를 쓸 일은 잘 없습니다.

#### `getDOMNode()`

마운트되어 있는 컴포넌트의 DOM 엘리먼트 리퍼런스를 받기 위해 사용하며, Top Level API인 `React.findDOMNode(component)`로 대체되었으니 가능하면 사용하지 않는 것이 좋습니다.

## 3부: React 컴포넌트의 데이터 흐름

<img src="/react-guide-for-hipsters/Flux-Schematic.jpg" style="margin: 0 auto;" alt="Flux">

<p style="font-size:14px;font-style:italic;text-align:center;">"마티, 네가 작성해야 할 React 앱의 모양을 냅킨에 그려봤다! 어서 서둘러!"</p>

### One-way Data Flow

다시 복습해보자면, React의 데이터 흐름은 "one-way reactive data flow" 한 문장으로 설명할 수 있습니다. React의 데이터 흐름은 단방향이고, Reactive 하다는 특징을 가지고 있습니다. 데이터는 Parent로부터 Child로 흐르며, 데이터의 갱신에 반응하여 뷰 또한 갱신됩니다.

### Components Relationship

#### Parent/Children
DOM의 parent-children 관계와 거의 비슷하며, React 컴포넌트들은 상위 컴포넌트, 하위 컴포넌트가 존재합니다. 다만 DOM의 `node.parentNode`와 같은 API는 없으므로, 하위 컴포넌트는 상위 컴포넌트에 대해 거의 알 수 없습니다.

#### Owner / Ownee
`ReactOwner`는 ownee들의 `ref`를 획득할 수 있는 상위 컴포넌트입니다. 내부를 깊게 공부하다보면 나오는 토픽이긴 하나, 일반적인 애플리케이션 개발자가 알아야 할 정도는 아닙니다.

### Props

`props`는 parent로부터 받는 데이터이며 (자식 컴포넌트의 입장에서는) 불변성 데이터, 즉 값을 바꿀 수 없는 데이터라고 생각해도 됩니다. (`setProps()`와 같은 메서드가 있긴 하나, deprecated method이며 사용이 권장되지 않습니다) 아래의 *패턴: Smart and Dumb Components*에서 간략히 설명하겠지만, 많은 mutable state(변경 가능한 값)들은 prop으로 대체 표현되거나 한 곳으로 몰아넣을 수 있습니다.

props는 대부분의 데이터를 표현하는 중요한 방법으로, React 라이브러리의 사용자는 `state`보다는 `props`의 사용에 더 익숙해져야 할 것입니다. `props`로 표현된 데이터는 이전에서 설명했듯이, 마운트와 업데이트 시 `React.Proptypes` API로 런타임 타입 체크가 가능해 잘못된 상황을 빨리 감지할 수 있는 이점도 있습니다.

#### Controlled Components / Uncontrolled Components

폼을 구성하는 HTML 엘리먼트들(i.e. `<input>`, `<textarea>` `<option>`)은 React의 Reactive data flow의 관점에서, 사용자의 입력을 통한 뷰 변경과 데이터의 변경이 동시에 일어나는 특수한 엘리먼트입니다. React에서는 Control이라는 개념으로 이를 제어합니다. 굉장히 단순(러프)하게 설명하자면, `value` prop이 주어진 엘리먼트들은 React에서 값의 변경을 제어하며, Controlled Component라고 칭해집니다. 자세한 정보는 역시 [공식 문서](https://facebook.github.io/react/docs/forms-ko-KR.html)를 참고합시다.

#### Special property: `props.children`

`props` 중의 특수 프로퍼티로, 이 프로퍼티를 이용하여 자식 `ReactElement`를 다루거나 자식 프로퍼티의 DOM 엘리먼트의 마운트 위치를 특정할 수 있습니다. Wrapper 컴포넌트 등에서 많이 사용하게 됩니다.

#### Special non-DOM attributes

([공식 문서](https://facebook.github.io/react/docs/special-non-dom-attributes.html))
`key`, `ref`, `dangerouslySetInnerHTML`는 다른 Props와 같이 HTML 어트리뷰트처럼 기술하지만, prop은 아닙니다. 즉, 자식 컴포넌트에서 `this.props.key` `this.props.ref` 등으로 접근할 수 없는, 휘발되어 버리는 특수 값이라는 것입니다. (`key`는 튜토리얼의 초반부에서 비교조정 알고리즘을 설명하면서 다뤘으므로 생략합니다)

##### `ref`

`ref`는 자식 엘리먼트를 상위 컴포넌트에서 `this.refs` 오브젝트를 통해 named property로 접근할 수 있게 해주는 키 값입니다.

##### `dangerouslySetInnerHTML`

`dangerouslySetInnerHTML`는 그 이름이 암시하듯, 임의의 html 스트링을 통해 자식 html을 표현할 수 있으며 어쩔 수 없는 특수한 상황에서 사용합니다. (`svg` 스트링의 표현, html 태그가 포함된 국제화 스트링의 표현, 서버사이드 렌더링 시 인라인 `<script>` 엘리먼트의 텍스트 표현 등)

### State

State는 컴포넌트 안에서 변경이 가능한 데이터입니다. 일반적으로 컴포넌트 안의 state는 최소한으로 유지하고, 가능한 한 상위 컴포넌트로 이동해야 할 필요가 있습니다. 이는 변경 가능한 데이터의 관리가 무척 어렵기 때문입니다. (데이터를 불변 값으로 표현하는 것의 이점은 [이 글](http://gamecodingschool.org/2015/06/25/%EC%99%9C-%EB%B3%80%EC%88%98%EA%B0%80-%EB%82%98%EC%81%9C%EA%B0%80/)을 참고하시기 바랍니다)

`state`가 비록 변경이 가능한 값이긴 하나, 엄밀히 말하자면 `this.state` 자체가 mutable한 값은 아닙니다. 데이터의 갱신은 반드시 `setState(nextState)` 비동기 함수를 통해서 해야 합니다.

#### State 사용의 예

State는 render를 통한 지속적인 동기화가 필요한 경우 데이터를 표현하기 좋습니다. 가령 1초마다 뷰가 업데이트가 되는 아날로그 시계를 만들어야 한다면, `setInterval()`과 같은 Timer API로 1초마다 변경된 각도를 `setState()`에 반영함으로써 구현이 가능할 것입니다.

하지만 우리가 시침과 분침과 초침을 만들어야 한다면, 그렇게 하면 안 된다는 것을 자연히 깨닫게 됩니다. (세 개의 타이머를 동시에 돌리는 것에 대해 아무런 거부감이 없는 특이한 사람이 아니라면 말이죠) `setState()` 함수는 는 상위 시계 컴포넌트 `<Clock />`으로 자연히 이동하게 되고, 시침, 분침, 초침은 props로 `<Minute now={this.state.now} />` 와 같이 상위 컴포넌트의 시간 `state`를 받게 설계를 하면 됩니다.

### 이게 끝입니다!

`props`와 `state`의 설명은 이 정도면 된 것 같습니다.

하지만 처음 React를 접하시는 분들은 앱을 만들다 보면 궁금한 점들이 많이 생길 수 있습니다. 예를 들면,

- 데이터의 변화 여부에 따라 Parent 컴포넌트에 신호를 전달하는 방법은 무엇이 있을까요?
- 수많은 단계를 거쳐야 하는 컴포넌트들도 계속 props를 주입해 내려야 할까요?

위와 같은 의문점들이 생기기 마련입니다. 개발 편의성과 실질적인 데이터 흐름의 요구사항을 만족하게 하기 위해서는 조금 더 공부해야 합니다. (공부에는 끝이 없죠) 그래서 일반적으로 React 앱을 작성하면 많이 구성하게 되는 데이터 흐름 방식을 정리해 보았습니다.

### 패턴: Smart and Dumb Components

[Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 라는 에세이에서 [Dan Abramov](https://twitter.com/dan_abramov)는 React 컴포넌트들을 크게 두 가지로 나눌 수 있다고 정의했습니다. 그것은 **Smart Component**와 **Dumb Component**입니다. 개념을 처음 접하는 분들은 조금 의아할 수 있겠지만, 일정 이상 규모의 React 앱을 작성해 보신 분들은 공감하실 분류입니다.

#### Dumb Components

Dumb Components들은 Parent 컴포넌트에 의해 주어진 `props`만을 보여주고, 자신의 `state`를 거의 가지고 있지 않습니다. 아마 State를 줄이기 위해 충분히 노력했다면, 대부분의 컴포넌트가 이런 형태를 가지게 될 것입니다.

사용자 정보를 수정하는 Form을 예시로 들어봅시다. Form 안의 input들은 모두 Dumb Component들로 구성해야 할 것입니다. 어떤 사용자들은 때에 따라 일정 `<input />` 엘리먼트들을 보여주지 않거나, `disabled` 어트리뷰트를 줘야 할 수도 있습니다. 사용자의 정보에 대해 모든 input 컴포넌트가 알고 있어야 하는 것은 비효율적이므로, 자연히 상위 Form 컴포넌트가 하위 컴포넌트들으로 `props`를 주입해 컨트롤하는 형태로 구성될 것입니다. 그리고 하위 컴포넌트들을 컨트롤하는 것이 Smart Component입니다.

#### Smart Components

위의 Form 예시를 계속 확장시켜 봅시다. 그렇다면 사용자 정보는 어디서 올까요? 물론 최상위 DOM 엘리먼트로부터 전달해 받을 수도 있습니다. 하지만 그것은 비효율적일 뿐더러, 수많은 상관없는 `props`들의 전달 행위로 인해 코드의 가독성을 떨어뜨릴 수 있습니다. 그래서 보통 `Flux` 아키텍쳐 구현 라이브러리를 이용합니다. (Flux를 잘 모르겠다면, [공식 튜토리얼](http://facebook.github.io/flux/docs/todo-list-ko-KR.html#content)을 참조하세요)

```javascript
var TextField = React.createClass({
    render() {
        return (
            <div className="text-field">
                <label>
                    <span>{this.props.label}</span>
                    <input {...this.props} />
                </label>
            </div>
        );
    }
});

var UserForm = React.createClass({
    mixins: [
        FluxStoreMixin(...) // Flux Store에서 `this.state.user`에 데이터 연결
    ],
    // 값이 변할 때마다 state에 저장해 놓았다가 나중에 사용
    // i.e. localStorage에 임시 값을 저장, GA에 값을 전송, ...
    handleChange (e) {
        var nextState = {};
        var key = e.target.dataset['sync-id'];

        nextState[key] = e.target.value;
        this.setState(nextState);
    },
    render() {

        return (
            <form action="/some/where">
                <TextField label="이름" onChange={this.handleChange}
                           defaultValue={this.state.user.name}
                           data-sync-id="name" />
                <TextField label="Github ID" onChange={this.handleChange}
                           defaultValue={this.state.user.connections.github.id}
                           data-sync-id="gh-id" />
            </form>
        );
    }
});
...
```

굉장히 간단한 예제를 작성해 보았습니다만, 위 같은 경우 UserForm은 Flux Store로부터 유저의 데이터를 받고, `<TextField />` 컴포넌트들에 prop으로 값들을 내리는 Smart Component이며, TextField 컴포넌트는 그것이 무엇인지 모르는 상태에서 단순히 값을 받아 연결하고, 표시하기만 하는 Dumb Component 입니다.

### 패턴: 상위 컴포넌트와 대화하기

하위 컴포넌트의 데이터 갱신에 따라 상위 컴포넌트를 업데이트해야한다면 어떻게 해야 할까요? 위와 같이 Flux 라이브러리를 사용하는 법도 있지만, 대부분의 경우는 함수를 prop으로 내리는 것이 정답에 가깝습니다.

```javascript
var Keypad = React.createClass({
    getInitialState() {
        return {
            input: ''
        };
    },
    handleInput(e) {
        this.setState({ input: this.state.input + e.target.dataset.value });
    },
    render() {
        return (
            <input value={this.state.input} disabled />
            <KeyInput onInput={this.handleInput} />
        )
    }
});

var KeyInput = React.createClass({
    render() {
        <div>
            <button data-value="1" onClick={this.props.handleInput}>1</button>
            <button data-value="2" onClick={this.props.handleInput}>2</button>
            ...
        </div>
    }
});
```

위의 예제는 간단한 입력을 위한 키패드를 구현한 것입니다. `KeyInput` 하위 컴포넌트에 클릭 핸들러를 전달하여, 상위 컴포넌트에서 `setState()`를 하면 상위 컴포넌트에서 값을 업데이트할 수 있습니다.

### Tips: class 어트리뷰트의 컨트롤

```javascript
classnames('a', 'b', 'c'); // => 'a b c'
classnames({ a: true, b: false, c: null }); // => 'a'
classnames('some-css-class', this.props.className); // => 'some-css-class' 와 추후 `className` prop 값을 합친다`
```

CSS 클래스를 계층적으로 적용하고 싶을 때 사용하는 모듈로 [`classnames`](https://www.npmjs.com/package/classnames)가 있습니다. 공식 패키지는 아니나, 공식문서에서 추천하는 패키지입니다. 위와 같이 사용할 수 있습니다.

### Tips: props로 주어주는 객체의 컨트롤

```javascript
...
render () {
    // this.props => { first: 1, second: 'second' }
    return <SomeChild {...this.props} second={2} /> // => props: { first: 1, second: 2 }
}
...

```

주로 오브젝트를 조작하거나 합칠 때 많이 사용하는 방법은 `React.addons.update` 함수 또는 Underscore/Lodash의 `_.extend` 함수를 사용하는 것입니다. 그 외에 `...` [JSX Spread Attribute](https://facebook.github.io/react/docs/jsx-spread.html)를 이용하는 법도 있습니다. Spread 어트리뷰트는 좀 더 마법 같은 prop으로, 표준은 아니지만 Babel등의 JSX를 지원하는 트랜스파일러를 이용하면 사용할 수 있습니다. (문서에 언급하고 있긴 하나, 표준화를 시도하고 있는 [Object Spread Property](https://github.com/sebmarkbage/ecmascript-rest-spread)도 있습니다)


###### Image Credit

1. https://twitter.com/idiot/status/582546013119848448
2. http://nzetc.victoria.ac.nz/tm/scholarly/Gov06_07Rail-fig-Gov06_07Rail046a.html
3. http://backtothefuture.wikia.com/wiki/Flux_capacitor
