"""Refresh contract fields and separate local provenance; never infer health/maintainer."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
path=root/'src/mocks/catalog.fixtures.json'
meta_path=root/'src/mocks/catalog-presentation.json'
records=json.loads(path.read_text());metadata=json.loads(meta_path.read_text())
snapshot=json.loads((root/'src/mocks/github-snapshot.json').read_text())
# Match by repository identity, not array position (Default is not a real repository).
by_name={v['nameWithOwner']:v for v in snapshot['data'].values() if isinstance(v,dict) and 'nameWithOwner' in v}
for record in records:
 name=record['full_name'];repo=by_name[name];local=metadata[name]
 commit=(repo.get('defaultBranchRef') or {}).get('target') or {};release=repo.get('latestRelease')
 record.update(github_id=repo.get('databaseId',record['github_id']),stargazers_count=repo['stargazerCount'],open_issues_count=repo['issues']['totalCount']+repo['pullRequests']['totalCount'],language=(repo.get('primaryLanguage') or {}).get('name'),license_spdx_id=(repo.get('licenseInfo') or {}).get('spdxId'),pushed_at=repo['pushedAt'],archived=repo['isArchived'],health_score=None)
 local.update(version=release['tagName'] if release else None,maintained=None,disabled=repo['isDisabled'],dataSource='github_snapshot',syncedAt=snapshot['captured_at'],lastCommitAt=commit.get('committedDate'),releasePublishedAt=release['publishedAt'] if release else None,releaseUrl=release['url'] if release else None,openPullRequests=repo['pullRequests']['totalCount'])
for file,value in [(path,records),(meta_path,metadata)]:file.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
print('Updated',len(records),'contract records')
