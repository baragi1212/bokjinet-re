# 복지 & 문화나눔 정보 통합 플랫폼 
> **사용자 중심의 구인·구직 정보와 복지 소식을 제공하는 사이트**

---

## Link
-리뉴얼 전 페이지 (web-site) https://www.bokji.net/ <br><br>
-바로가기 (web-site) https://baragi1212.github.io/bokjinet-re/ <br>
-기획서 (figma) https://www.figma.com/design/dpyMRV8t9UDlRsmap3Prr7/%EB%B3%B5%EC%A7%80%EB%84%B7%EB%A6%AC%EB%89%B4%EC%96%BC-%EB%B0%95%EC%83%81%EA%B1%B4?node-id=1209-773&t=JAfrumycc44ZeTHk-1 <br>
-디자인 시안 (figma) https://www.figma.com/design/dpyMRV8t9UDlRsmap3Prr7/%EB%B3%B5%EC%A7%80%EB%84%B7%EB%A6%AC%EB%89%B4%EC%96%BC-%EB%B0%95%EC%83%81%EA%B1%B4?node-id=130-2379&t=JAfrumycc44ZeTHk-1 <br>

## 프로젝트 미리보기
| 리뉴얼 전 페이지 |
| :---: |
| ![main](./images/screencapture-bokji-net-2026-02-06-11_53_53.png)

| 메인 페이지 | 반응형 |
| :---: | :---: |
| ![Main](./images/bokjinet-re-pc.png) | ![Main](./images/bokjinet-re-mo.png) |


---

## 주요 개선 및 기능

### 구인 · 구직 파트 이원화
* **선택적 노출:** 한 화면에 섞여 있던 구인/구직 정보를 상단 탭으로 분리하여 사용자가 원하는 정보만 골라볼 수 있습니다.
* **슬라이드 인터랙션:** 수직 나열 방식에서 벗어나 넘겨가며 볼 수 있는 슬라이드 형식을 도입해 정보 밀도를 최적화했습니다.

### 콘텐츠 집중도 및 완성도 향상
* **불필요 요소 제거:** 제작 중이거나 미사용 중인 빈 영역을 보이지 않게 처리하여 사이트의 마감 상태를 높였습니다.
* **맥락 중심 재배치:** 복지 뉴스 및 문화나눔 페이지 하단에 있던 관련 없는 콘텐츠를 삭제하여 정보 탐색의 흐름을 개선했습니다.

### 시각적 정보 결합
* **포스터 큐레이션:** 단순 텍스트가 아닌 메인 페이지의 포스터와 상세 정보를 결합하여 시각적 전달력을 극대화했습니다.

### 푸터(Footer) 최적화
* **관련 사이트 정리:** 기존의 어지러웠던 3줄 구성을 1줄로 정렬하였습니다

---

## 파일 구조 (Project Structure)
각 페이지의 독립성을 유지하면서도 공통 스타일을 효율적으로 관리하도록 설계되었습니다.

```text

├─ index.html                # 메인 페이지 (포스터 및 핵심 정보)
├─ subPage1.html             # 복지 뉴스 페이지
├─ subPage2.html             # 문화 나눔 페이지 (구인/구직 슬라이드 적용)
├─ subPage3.html             # 상세 정보 안내 페이지
│
├─ js.js                 
├─ subPage1.js            
├─ subPage2.js            
├─ subPage3.js            
│
├─ reset.css              # 브라우저 기본 스타일 초기화
├─ root.css               # 공통 컬러 및 변수 관리
├─ style.css              # 공통 및 메인 페이지 스타일
├─ subPage1~3.css         # 서브페이지별 전용 스타일
├─ *-responsive.css       # 각 페이지별 반응형 레이아웃 처리
│
└─ images/                   # 포스터, 로고, 아이콘 등 에셋 관리
