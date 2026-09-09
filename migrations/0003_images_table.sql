-- R2가 아직 활성화되지 않았을 때를 대비한 이미지 보관용 폴백 테이블.
-- R2 버킷이 연결되면 새 업로드는 R2로 가고, 이 테이블은 더 이상 쓰이지 않는다.
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY,
  mime TEXT NOT NULL,
  data TEXT NOT NULL, -- base64
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
