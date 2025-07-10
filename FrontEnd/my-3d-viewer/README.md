# Three.js로 제품 3D로 나타내는 연습

## Three.js

`Three.js`는 WebGL 위에서 3D 장면을 렌더링하는 자바스크립트 라이브러리   

기본적인 요소   

- Scene (장면)
  - Camera (카메라)
  - Light (조명)
  - Mesh (3D 오브젝트)
  - Renderer (렌더러: 최종 출력)

그리고 이 구조를 React 환경에서 React 방식으로 다루도록 래핑한 것이 `@react-three/fiber`이다.

## 전체 흐름

```
<Canvas>
  ├─ Lighting (ambientLight, directionalLight)
  ├─ <Suspense>
  │   ├─ <Model /> ← glb 모델 로딩 및 렌더링
  │   └─ <Environment />
  └─ <OrbitControls />
```

## 주요 컴포넌트 흐름

1. Canvas — Three.js의 뷰포트 (렌더러 생성)

```
<Canvas camera={{ position: [0, 0, 3] }}>
```

내부적으로 `THREE.WebGLRenderer`, `THREE.Scene`, `THREE.Camera` 등을 생성한다. 그리고 `Camera` 속성은 초기 카메라의 위치를 설정한다. (z = 3 거리에서 모델 확인) 그리고 이 `<canvas>` 안에서만 `Three.js` 요소들이 작동한다.

2. Light - 조명

```
<ambientLight intensity={0.5} />
<directionalLight position={[2, 2, 2]} intensity={1.5} />
```

* ambientLight: 장면 전체에 고르게 퍼지는 부드러운 빛
* directionalLight: 태양처럼 특정 방향에서 오는 직선 광원

빛이 없다면, 3D 객체가 검게 보이게 되어, 조명을 적절히 사용해야 한다.

3. Model 컴포넌트 — GLTF 모델 로딩 (→ Scene에 넣음)

```
useGLTF
const { scene, animations } = useGLTF(modelPath);
```

`Three.js`이ㅡ `GLTFLoader`로 모델 파일을 불러와 `THREE.Group` 또는 `THREE.Scene` 객체를 반환한다. 모델 내 애니메이션 데이터가 있다면 함께 포함이 된다.

```
<primitive object={scene} />
```

`Three.js 객체(scene, mesh, group)`를 React 요소로 렌더하고 이는 결국 `Three.js`의 `scene.add(object)`로 반영된다.

4. useAnimations — 애니메이션 제어기

```
const { actions } = useAnimations(animations, group);
actions["Run"]?.play();
```

모델 내 포함된 `THREE.AnimationClip[]`을 `THREE.AnimationMixer`로 연결하고, `action[animationName]`을 통해 재생 또는 멈춤이 가능하다.

5. useTexture + material.map = 텍스처 맵핑

```
scene.traverse((child) => {
  if (child.isMesh) {
    (child.material as MeshStandardMaterial).map = texture;
    child.material.needsUpdate = true;
  }
});
```

`traverse()`로 모든 child를 순회하며 메시에 텍스처를 적용할 수 있다. 그리고 `map` 속성은 표면 텍스처 (Diffuse map)를 의미하며, `needsUpdate = true`는 재렌더링을 트리거한다.

6. Environment — 사실적인 조명/배경

```
<Environment preset="sunset" />
```

HDRI 기반의 라이트 환경을 추가할 수 있고, 실제 조명과 반사효과를 자연스럽게 재현할 수 있다. `reset: "sunset", "city", "warehouse"` 등 선택이 가능하다. 내부적으로는 `scene.environment`에 HDR 텍스처를 설정한다.

7. OrbitControls — 마우스 조작

```
<OrbitControls />
```

이는, 사용자 마우스로 회전/확대/이동을 가능하게 해준다. 내부적으로 `THREE.OrbitControls`를 사용한다.

## 전체 렌더링 순서 (브라우저)

1. Canvas 생성 → Three.js의 렌더러, 카메라, 씬 설정됨
2. GLTF 모델 로딩 → useGLTF로 모델을 scene에 삽입
3. 텍스처 적용 (옵션) → material.map으로 텍스처 적용
4. 애니메이션 재생 (옵션) → useAnimations로 동작
5. 조명 및 환경 반영 → 빛과 배경이 추가되어 사실감 향상
6. OrbitControls → 마우스로 시점 조작
7. 렌더러가 루프 실행 → WebGL canvas에 프레임별로 계속 그려짐

## 사용자 인터랙션 흐름

```
<select onChange={e => setModelPath(...)} />
↓
<App 상태 변경됨 → ProductViewer에 props 전달됨
↓
ProductViewer 내부에서 모델 다시 로딩
↓
Canvas에 새 Scene 삽입 → 텍스처/애니메이션 적용
↓
Three.js가 그려줌

```

## 렌더링 최적화
* 모델이 크면 <Suspense fallback={<Html>로딩중...</Html>}> 필요
* drei의 BakeShadows, Bounds, ContactShadows 등으로 리얼하게 개선 가능
* DRACO 압축된 모델은 useGLTF.preload() + useGLTF(..., dracoPath)로 최적화 가능

## 간단 요약
| 요소              | 설명                                                   |
| --------------- | ---------------------------------------------------- |
| `Canvas`        | Three.js 렌더링 캔버스, 내부적으로 Scene + Camera + Renderer 구성 |
| `useGLTF`       | glTF 모델 로딩 (Mesh, Material, Animation 포함)            |
| `useAnimations` | 모델의 내장 애니메이션 컨트롤러                                    |
| `useTexture`    | 외부 이미지로 텍스처 매핑                                       |
| `primitive`     | Three.js 객체를 React에서 렌더링 가능하게 함                      |
| `Environment`   | HDR 조명 배경 설정                                         |
| `OrbitControls` | 마우스로 시점 회전/줌/패닝 가능하게 함                               |
