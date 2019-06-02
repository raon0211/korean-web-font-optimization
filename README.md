# korean-web-font-optimization

한글 웹 폰트를 만들 때 성능을 최적화하기 위해 여러 개의 폰트 파일로 쪼개는 작업을 쉽게 수행할 수 있도록 도와 주는 스크립트입니다.

자세한 최적화 방법론은 ["한글 웹 폰트의 최적화" 블로그 게시글](https://sojin.io/article/한글_웹_폰트의_최적화)을 참조해 주세요.

## 의존성

NPM 모듈 [font-ranger](https://www.npmjs.com/package/font-ranger)가 의존하고 있는 fonttools, brotli의 설치가 필요합니다.

```
pip install fonttools brotli
```

npm으로 node 의존성을 설치해 주세요.

```
npm install
```

## 사용 방법

```
FONT_FILE=<폰트 파일의 위치, 예: test.ttf> \
FONT_FAMILY=<사용할 웹 폰트의 이름, 기본값 font> \
FONT_WEIGHT=<폰트 굵기, 기본값 400> \
FONT_DISPLAY=<웹 폰트 로드 전 대체 폰트를 보여줄지 여부, 기본값 swap> \
SKIP_CSS=<CSS 파일도 함께 출력할지 여부, 기본값 true> \
ADD_WOFF=<WOFF 파일도 fallback으로 사용할지 여부, 기본값 true> \
URL_PREFIX=<웹 폰트 파일이 호스팅되는 URL Prefix, 기본값 /fonts/> \
OUTPUT_FOLDER=<웹 폰트 파일을 내보낼 폴더, 기본값 ./fonts/> \
LOCALS=<웹 폰트 파일이 로컬 환경에 설치되었을 때의 이름, 기본값 [$FONT_FAMILY]> \
node ./index.js
```

## 사용 예시

```
FONT_FILE=test.ttf \
node ./index.js
```

실행하면 `fonts/font.css`에 웹 폰트의 CSS 파일이, 그리고 `fonts`의 각 woff 파일들에 쪼개진 웹 폰트 파일들이 만들어졌을 것입니다.

## License

MIT
