# 내 홈페이지 배포 안내

둥지메이커로 만든 사이트예요. 이 폴더의 파일을 그대로 올리면 돼요.

## 1. 사이트 올리기 — 호스팅 고르기 (모두 무료로 시작)

이 폴더는 서버 프로그램이 필요 없는 일반 파일이라, 파일을 올릴 수 있는 곳이면 어디든 돼요. 아래 중 하나만 고르세요.

### A. Netlify (가장 쉬움)

1. [netlify.com](https://www.netlify.com)에 가입해요.
2. **Add new site → Deploy manually**를 누르고, 이 폴더를 통째로 끌어다 놓아요. (zip은 먼저 풀어 주세요)
3. 잠시 뒤 `https://무작위이름.netlify.app` 주소가 생겨요. **Site configuration → Change site name**에서 이름을 바꿀 수 있어요.
4. 사이트를 고치면 다시 내보내서 같은 방법으로 덮어 올려요.

### B. Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com)에 가입하고 **Workers & Pages → Create → Pages → Upload assets**를 골라요.
2. 프로젝트 이름을 정하고 이 폴더를 올리면 `https://이름.pages.dev` 주소가 생겨요.

### C. GitHub Pages

1. GitHub에서 **New repository**로 저장소를 만들어요 (Public).
2. 이 폴더 안의 파일을 모두 저장소에 업로드해요. (`index.html`이 맨 위에 보여야 해요)
   - `.github` 폴더는 이름이 점(.)으로 시작해서 숨김 폴더예요. 드래그가 안 되면 GitHub에서 **Add file → Create new file**을 누르고 파일 이름칸에 `.github/workflows/notion-sync.yml`을 입력한 뒤 내용을 붙여 넣으세요. (Git이나 GitHub Desktop으로 올리면 그대로 올라가요.)
3. 저장소 **Settings → Pages**에서 Branch를 `main`, 폴더를 `/ (root)`로 정하고 Save.
4. 잠시 뒤 `https://내아이디.github.io/저장소이름/` 에서 열려요.

### Notion 게시판을 쓴다면

노션 글을 자동으로 가져오는 기능(약 10분마다)은 GitHub의 자동 실행 기능(Actions)이 해요. 그래서 A·B에 폴더를 끌어다 놓는 방식으로는 자동 동기화가 안 돼요. 노션을 쓰려면 C처럼 GitHub 저장소에 올린 뒤, Netlify는 **Add new site → Import an existing project**, Cloudflare는 **Pages → Connect to Git**으로 그 저장소를 연결하세요. 글이 바뀔 때마다 호스팅이 자동으로 다시 올려 줘요. (Supabase·Firebase 게시판은 어느 호스팅이든 그대로 돼요.)

### 검색에 안 나오게 하기

둥지메이커 내보내기 창의 "검색엔진 노출 허용"을 꺼 두면(기본값) 모든 페이지에 검색 제외 표시가 들어가요. 주소를 아는 사람은 열 수 있어요.

## 2. 노션 연결하기 (무료)

게시판: `diary`, `profile`, `timeline`

노션에 글을 쓰면, GitHub가 약 10분마다 노션에서 글을 가져와 사이트에 반영해요. 글쓰기는 노션에서만 하고(관리자 전용), 방문자는 읽기만 해요.

1. 노션에서 **전체 페이지 데이터베이스**를 만들어요. 기본 `이름`이 글 제목이고, 글 내용은 각 행(페이지)을 열어 본문에 써요.
   - 선택 속성: `날짜`(날짜) · `이미지`(파일 또는 URL) · `공개`(체크박스, 게시판 설정에서 "공개 기준"을 "공개 체크박스"로 골랐을 때만 써요)
   - **공개 기준(기본)**: 노션의 **공유 → 웹에 게시**가 켜진 글(또는 데이터베이스·상위 페이지)만 사이트에 보여요. 노션에서 게시를 끄면 다음 동기화 때 사이트에서도 사라져요.
2. [notion.so/my-integrations](https://www.notion.so/my-integrations)에서 새 **내부 통합**을 만들고 토큰을 복사해요. (보통 `ntn_`로 시작해요)
3. 데이터베이스 페이지 오른쪽 위 **… → 연결(Connections)**에서 방금 만든 통합을 추가해요.
4. 데이터베이스 주소를 둥지메이커 게시판 설정에 붙여 넣고 다시 내보내요. (이미 넣었다면 `scripts/notion-boards.json`에 들어 있어요.)
5. GitHub 저장소 **Settings → Secrets and variables → Actions → New repository secret**에서 이름 `NOTION_TOKEN`, 값에 토큰을 넣어요. 토큰은 여기에만 넣고 사이트 파일에는 절대 넣지 마세요.
6. 저장소 **Actions** 탭 → **Notion 동기화** → **Run workflow**를 눌러 처음 한 번 실행해요. 성공하면 `data/게시판이름.json`이 채워지고 1~2분 뒤 사이트에 보여요. 이후에는 자동으로 돌아요.

**알아둘 점**
- 반영까지 보통 10~15분 걸려요(GitHub 사정에 따라 더 늦을 수 있어요). 비공개 저장소는 GitHub 무료 실행 시간(월 2,000분)이 모자랄 수 있으니, 그럴 땐 `.github/workflows/notion-sync.yml`의 `cron` 줄을 `17,47 * * * *`(30분마다)로 바꾸세요. 급하면 Actions에서 다시 Run workflow를 누르세요.
- 공개 저장소는 오랫동안 활동이 없으면 GitHub가 예약 실행을 멈출 수 있어요. 멈추면 Actions 탭에서 다시 켜거나 수동으로 실행하세요.
- 게시판 설정에서 "하위 페이지 이름을 카테고리로"를 켜면, 연결한 페이지 바로 아래 페이지는 카테고리, 그 안의 하위 페이지는 글이 돼요.
- 본문은 문단·제목·목록·체크리스트·인용·콜아웃·토글·열 나누기·표·코드·이미지·링크를 가져와요(블록 안쪽 내용 포함).
- **비밀번호 글**: 노션 글 맨 첫 줄에 `비밀번호: 1234`처럼 쓰면(데이터베이스는 `비밀번호` 텍스트 속성도 돼요) 사이트에서는 제목만 보이고, 본문은 비밀번호를 입력해야 열려요. 본문은 암호화돼서 올라가고, 비밀번호는 사이트 파일에 들어가지 않아요. 비밀번호는 길수록 안전해요. 잠긴 글의 이미지는 개당 2MB 이하만 함께 들어가요. ⚠ 노션의 **웹에 게시**를 켜 두면 노션 공개 주소에서 본문과 비밀번호가 그대로 보여요. 비밀번호 글은 "공개 체크박스" 기준(게시판 설정)이나 통합에 연결한 비공개 페이지로 쓰고 노션 웹 게시는 켜지 마세요.
- **캘린더**: 노션에 `날짜` 속성이 있는 데이터베이스를 만들고 일정을 적으면 캘린더 위젯에 점이 찍혀요. `공개` 체크박스 속성을 만들면 체크한 일정만 올라가요(없으면 전부). 이 데이터베이스도 통합에 연결해야 하고, 위의 2~6번과 같은 순서예요.
- 노션에 올린 이미지는 주소가 1시간 뒤 만료돼서, 동기화할 때 `data/img/`로 저장해 써요.

## 3. 내 도메인 연결하기 (선택)

도메인을 사는 건 유료예요(보통 1년에 1~2만 원대). 산 뒤에는 쓰는 호스팅에서 도메인을 추가해요.

- **Netlify:** Domain management → Add a domain
- **Cloudflare Pages:** 프로젝트 → Custom domains → Set up a domain
- **GitHub Pages:** 저장소 Settings → Pages → Custom domain

그러면 호스팅이 DNS에 넣을 값(레코드)을 알려줘요. 도메인을 산 업체의 DNS 설정 화면에 그대로 입력하면 돼요. 잠시 뒤 HTTPS가 자동으로 켜져요(GitHub는 **Enforce HTTPS**를 직접 켜요).

링크를 다른 곳(프로필 등)에 등록할 때는 이렇게 연결한 최종 주소를 쓰세요. 사이트 주소를 바꾸면 Supabase·Firebase의 허용 주소 설정이 필요한지 확인하세요.

## 파일 구성

- `index.html`, `*.html` — 페이지
- `css/site.css` — 공통 스타일
- `js/site.js` — 효과·탭·게시판 동작
- `.github/workflows/notion-sync.yml`, `scripts/` — 노션 자동 동기화
- `data/` — 노션에서 가져온 글·일정
- `images/` — 줄여 놓은 이미지
