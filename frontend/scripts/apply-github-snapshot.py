"""Apply captured GitHub fields only; do not infer a maintainer or health score."""
import json
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo
root=Path(__file__).resolve().parents[1]
path=root/'src/mocks/catalog.fixtures.json'
records=json.loads(path.read_text())
snapshot=json.loads((root/'src/mocks/github-snapshot.json').read_text())
months=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
for i,record in enumerate(records):
 if not record['repo']:continue
 repo=snapshot['data']['r'+str(i)]
 if not repo:raise ValueError('No repository data for '+record['repo'])
 commit=(repo.get('defaultBranchRef') or {}).get('target') or {}
 last_commit=commit.get('committedDate')
 license=(repo.get('licenseInfo') or {}).get('spdxId')
 release=repo.get('latestRelease')
 record.update(stars=repo['stargazerCount'],openIssues=repo['issues']['totalCount'],openPullRequests=repo['pullRequests']['totalCount'],language=(repo.get('primaryLanguage') or {}).get('name') or 'Sin datos',license=license if license and license!='NOASSERTION' else 'Revisar licencia',version=release['tagName'] if release else None,healthScore=None,healthScoreSource=None,maintained=None,archived=repo['isArchived'],disabled=repo['isDisabled'],dataSource='github_snapshot',syncedAt=snapshot['captured_at'],lastCommitAt=last_commit,pushedAt=repo['pushedAt'],githubUpdatedAt=repo['updatedAt'],releasePublishedAt=release['publishedAt'] if release else None,releaseUrl=release['url'] if release else None,githubId=repo['id'],githubUrl=repo['url'],githubFullName=repo['nameWithOwner'],defaultBranch=(repo.get('defaultBranchRef') or {}).get('name'),commitOid=commit.get('oid'),licenseSpdx=license)
 if last_commit:
  date=datetime.fromisoformat(last_commit.replace('Z','+00:00')).astimezone(ZoneInfo('America/Punta_Arenas'))
  record['activity']=f'{date.day} {months[date.month-1]} {date.year}'
 else:record['activity']='Sin datos'
path.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Updated GitHub snapshot fields in',sum(bool(r['repo']) for r in records),'catalog entries')
