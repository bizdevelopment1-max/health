# 일일 자동 업데이트 파이프라인 아키텍처

매일 **08:00 KST 전**에 뉴스·트렌드·정량 데이터가 자동 갱신되도록, 새벽 3시부터 에이전트들이 정보를 수집·검증·구성하는 구조입니다.

```
03:00 KST  ┌─────────────────────────────────────────────┐
 (cron)    │            GitHub Actions 트리거              │
           └──────────────────┬──────────────────────────┘
                              │
           ┌──────── 1단계: 수집 (병렬) ────────┐
           │                                   │
  ┌────────▼───────┐ ┌────────▼───────┐ ┌─────▼──────────┐
  │ news-collector │ │ quant-collector│ │report-collector│
  │  뉴스 기사 수집  │ │  정량 데이터 변동 │ │  신규 리포트     │
  │ (발표일 기준)    │ │  (펀딩·매출·DL) │ │ (증권사·시장조사) │
  └────────┬───────┘ └────────┬───────┘ └─────┬──────────┘
           │                  │               │
           └────────┬─────────┴───────────────┘
                    │  pipeline/collected-*.json
           ┌────────▼────────┐
           │  fact-verifier  │  2단계: 검증
           │  원문 대조 교차검증 │  PASS / FIX / REJECT
           └────────┬────────┘
                    │  pipeline/verified.json
           ┌────────▼────────┐
           │    composer     │  3단계: 구성
           │ data.js 통합 반영 │
           └────────┬────────┘
                    │
           ┌────────▼────────┐
           │  final-auditor  │  4단계: 최종 감사
           │ 전체 정합성 게이트 │  FAIL → composer 재작업 (최대 2회)
           └────────┬────────┘
                    │  PASS
           ┌────────▼────────┐
           │  commit + push  │  5단계: 배포
~07:00 KST │  → GitHub Pages │  08:00 KST 전 반영 완료
           └─────────────────┘
```

## 에이전트 정의 위치
| 에이전트 | 파일 | 역할 |
|---|---|---|
| news-collector | `.claude/agents/news-collector.md` | 카테고리별 기사 수집 (발표일 기준) |
| quant-collector | `.claude/agents/quant-collector.md` | KPI·밸류·매출·다운로드 변동 확인 |
| report-collector | `.claude/agents/report-collector.md` | 증권사·시장조사·규제 리포트 |
| fact-verifier | `.claude/agents/fact-verifier.md` | 원문 대조 검증 (품질 게이트 1) |
| composer | `.claude/agents/composer.md` | data.js 통합 |
| final-auditor | `.claude/agents/final-auditor.md` | 전체 정합성 감사 (품질 게이트 2) |

## 오케스트레이션
`.github/workflows/daily-update.yml` — cron `0 18 * * *` (03:00 KST), `workflow_dispatch`로 수동 실행도 가능.

## 영구 정책
1. **삼성(Samsung/갤럭시) 관련 내용 수집·반영 금지** — 모든 에이전트 + 최종 감사에서 이중 차단
2. 기사 date는 **실제 발표일** (수집일 금지) — UI는 발표일 최신순 정렬
3. 모든 수치에 출처 기관·게시일 명시, 추정치는 `* 추정` 표기
4. 감사 FAIL 시 배포하지 않음 — 어제 데이터 유지가 잘못된 데이터보다 낫다

## 설정 방법
1. GitHub 저장소 Settings → Secrets → `ANTHROPIC_API_KEY` 등록
2. Actions 탭에서 `Daily Dashboard Update` 워크플로 활성화
3. 수동 테스트: Actions → Daily Dashboard Update → Run workflow
