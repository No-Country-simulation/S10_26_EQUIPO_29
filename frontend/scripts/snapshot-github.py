import json,subprocess
from pathlib import Path
from datetime import datetime,timezone
root=Path(__file__).resolve().parents[1]
records=json.loads((root/'src/mocks/catalog.fixtures.json').read_text())
fields='id databaseId nameWithOwner url stargazerCount isArchived isDisabled pushedAt updatedAt licenseInfo { spdxId name } primaryLanguage { name } issues(states:OPEN) { totalCount } pullRequests(states:OPEN) { totalCount } latestRelease { tagName publishedAt url } defaultBranchRef { name target { ... on Commit { committedDate oid } } }'
parts=[]
for i,r in enumerate(records):
 owner,name=r['full_name'].split('/',1)
 parts.append(f'r{i}: repository(owner:{json.dumps(owner)}, name:{json.dumps(name)}) {{ {fields} }}')
query='query { '+' '.join(parts)+' rateLimit { remaining resetAt } }'
result=subprocess.run(['gh','api','graphql','-f','query='+query],text=True,capture_output=True)
if result.returncode:
 print(result.stderr[:1500]);raise SystemExit(result.returncode)
raw=json.loads(result.stdout)
if raw.get('errors'):print(json.dumps(raw['errors']));raise SystemExit(1)
output={'captured_at':datetime.now(timezone.utc).isoformat().replace('+00:00','Z'),'source':'GitHub GraphQL API','query':query,'data':raw['data']}
(root/'src/mocks/github-snapshot.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
print('Captured',len(parts),'repositories at',output['captured_at'])
