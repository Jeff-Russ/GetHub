window.endpoints_json = {
  "endpoints": [
    {
      "endpoint": "/repositories",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-public-repositories",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/orgs/{org}/repos",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-organization-repositories",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/users/{username}/repos",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/hooks",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/webhooks/repos#list-repository-webhooks",
      "category": "Repositories",
      "api": "webhooks",
      "api_doc_link": "https://docs.github.com/en/rest/webhooks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#get-a-repository",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/autolinks",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/autolinks#list-all-autolinks-of-a-repository",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/codeowners/errors",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-codeowners-errors",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/contributors",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-repository-contributors",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/forks",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/forks#list-forks",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/languages",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-repository-languages",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/readme",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/contents#get-a-repository-readme",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/tags",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-repository-tags",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/tags/protection",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/tags#list-tag-protection-states-for-a-repository",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/teams",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#list-repository-teams",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/topics",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/repos#get-all-repository-topics",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/releases",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/releases/releases#list-releases",
      "category": "Repositories",
      "api": "releases",
      "api_doc_link": "https://docs.github.com/en/rest/releases"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/releases/latest",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/releases/releases#get-the-latest-release",
      "category": "Repositories",
      "api": "releases",
      "api_doc_link": "https://docs.github.com/en/rest/releases"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/pulls#list-pull-requests",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/comments",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/comments#list-review-comments-in-a-repository",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/projects",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/projects#list-repository-projects",
      "category": "Repositories",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pages",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pages#get-a-github-pages-site",
      "category": "Repositories",
      "api": "pages",
      "api_doc_link": "https://docs.github.com/en/rest/pages"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pages/builds",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pages#list-github-pages-builds",
      "category": "Repositories",
      "api": "pages",
      "api_doc_link": "https://docs.github.com/en/rest/pages"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pages/builds/latest",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pages#get-latest-pages-build",
      "category": "Repositories",
      "api": "pages",
      "api_doc_link": "https://docs.github.com/en/rest/pages"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pages/health",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pages#get-a-dns-health-check-for-github-pages",
      "category": "Repositories",
      "api": "pages",
      "api_doc_link": "https://docs.github.com/en/rest/pages"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/import",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/migrations/source-imports#get-an-import-status",
      "category": "Repositories",
      "api": "migrations",
      "api_doc_link": "https://docs.github.com/en/rest/migrations"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/import/authors",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/migrations/source-imports#get-commit-authors",
      "category": "Repositories",
      "api": "migrations",
      "api_doc_link": "https://docs.github.com/en/rest/migrations"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/import/large_files",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/migrations/source-imports#get-large-files",
      "category": "Repositories",
      "api": "migrations",
      "api_doc_link": "https://docs.github.com/en/rest/migrations"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/community/profile",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/community#get-community-profile-metrics",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/stats/code_frequency",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/statistics#get-the-weekly-commit-activity",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/stats/commit_activity",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/statistics#get-the-last-year-of-commit-activity",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/stats/contributors",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/statistics#get-all-contributor-commit-activity",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/stats/participation",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/statistics#get-the-weekly-commit-count",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/stats/punch_card",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/statistics#get-the-hourly-commit-count-for-each-day",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/traffic/clones",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/traffic#get-repository-clones",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/traffic/popular/paths",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/traffic#get-top-referral-paths",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/traffic/popular/referrers",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/traffic#get-top-referral-sources",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/traffic/views",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/metrics/traffic#get-page-views",
      "category": "Repositories",
      "api": "metrics",
      "api_doc_link": "https://docs.github.com/en/rest/metrics"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/license",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/licenses#get-the-license-for-a-repository",
      "category": "Repositories",
      "api": "licenses",
      "api_doc_link": "https://docs.github.com/en/rest/licenses"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/assignees",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/assignees#list-assignees",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/issues#list-repository-issues",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/comments",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/comments#list-issue-comments-for-a-repository",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/events",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/events#list-issue-events-for-a-repository",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/labels",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/labels#list-labels-for-a-repository",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/milestones",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/milestones#list-milestones",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/interaction-limits",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/interactions/repos#get-interaction-restrictions-for-a-repository",
      "category": "Repositories",
      "api": "interactions",
      "api_doc_link": "https://docs.github.com/en/rest/interactions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/deployments",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/deployments#list-deployments",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/environments",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/environments#list-environments",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/keys",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deploy-keys#list-deploy-keys",
      "category": "Repositories",
      "api": "deploy-keys",
      "api_doc_link": "https://docs.github.com/en/rest/deploy-keys"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/dependabot/alerts",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/alerts#list-dependabot-alerts-for-a-repository",
      "category": "Repositories",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/dependabot/secrets",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/secrets#list-repository-secrets",
      "category": "Repositories",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/dependabot/secrets/public-key",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/secrets#get-a-repository-public-key",
      "category": "Repositories",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/comments",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/comments#list-commit-comments-for-a-repository",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/commits#list-commits",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/collaborators",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/collaborators/collaborators#list-repository-collaborators",
      "category": "Repositories",
      "api": "collaborators",
      "api_doc_link": "https://docs.github.com/en/rest/collaborators"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/invitations",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/collaborators/invitations#list-repository-invitations",
      "category": "Repositories",
      "api": "collaborators",
      "api_doc_link": "https://docs.github.com/en/rest/collaborators"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/codespaces/devcontainers",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/codespaces/codespaces#list-devcontainer-configurations-in-a-repository-for-the-authenticated-user",
      "category": "Repositories",
      "api": "codespaces",
      "api_doc_link": "https://docs.github.com/en/rest/codespaces"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/codespaces/machines",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/codespaces/machines#list-available-machine-types-for-a-repository",
      "category": "Repositories",
      "api": "codespaces",
      "api_doc_link": "https://docs.github.com/en/rest/codespaces"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/codespaces/new",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/codespaces/codespaces#get-default-attributes-for-a-codespace",
      "category": "Repositories",
      "api": "codespaces",
      "api_doc_link": "https://docs.github.com/en/rest/codespaces"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/codespaces/secrets",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/codespaces/repository-secrets#list-repository-secrets",
      "category": "Repositories",
      "api": "codespaces",
      "api_doc_link": "https://docs.github.com/en/rest/codespaces"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/alerts",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#list-code-scanning-alerts-for-a-repository",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/analyses",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#list-code-scanning-analyses-for-a-repository",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/codeql/databases",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#list-codeql-databases-for-a-repository",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branches#list-branches",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/networks/{owner}/{repo}/events",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-public-events-for-a-network-of-repositories",
      "category": "Repositories",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/events",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-repository-events",
      "category": "Repositories",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/stargazers",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/starring#list-stargazers",
      "category": "Repositories",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/subscribers",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/watching#list-watchers",
      "category": "Repositories",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/artifacts",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/artifacts#list-artifacts-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/cache/usage",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/cache#get-github-actions-cache-usage-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/caches",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/cache#list-github-actions-caches-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/permissions",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-github-actions-permissions-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/permissions/access",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-the-level-of-access-for-workflows-outside-of-the-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/permissions/selected-actions",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-allowed-actions-and-reusable-workflows-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/permissions/workflow",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-default-workflow-permissions-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runners",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#list-self-hosted-runners-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runners/downloads",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#list-runner-applications-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#list-workflow-runs-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/secrets",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#list-repository-secrets",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/secrets/public-key",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#get-a-repository-public-key",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/workflows",
      "parameters": [
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflows#list-repository-workflows",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repositories/{repository_id}/environments/{environment_name}/secrets",
      "parameters": [
        "repository_id",
        "environment_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#list-environment-secrets",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repositories/{repository_id}/environments/{environment_name}/secrets/public-key",
      "parameters": [
        "repository_id",
        "environment_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#get-an-environment-public-key",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/hooks/{hook_id}",
      "parameters": [
        "owner",
        "repo",
        "hook_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/webhooks/repos#get-a-repository-webhook",
      "category": "Repositories",
      "api": "webhooks",
      "api_doc_link": "https://docs.github.com/en/rest/webhooks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/hooks/{hook_id}/config",
      "parameters": [
        "owner",
        "repo",
        "hook_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/webhooks/repo-config#get-a-webhook-configuration-for-a-repository",
      "category": "Repositories",
      "api": "webhooks",
      "api_doc_link": "https://docs.github.com/en/rest/webhooks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/hooks/{hook_id}/deliveries",
      "parameters": [
        "owner",
        "repo",
        "hook_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/webhooks/repo-deliveries#list-deliveries-for-a-repository-webhook",
      "category": "Repositories",
      "api": "webhooks",
      "api_doc_link": "https://docs.github.com/en/rest/webhooks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/autolinks/{autolink_id}",
      "parameters": [
        "owner",
        "repo",
        "autolink_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/autolinks#get-an-autolink-reference-of-a-repository",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/contents/{path}",
      "parameters": [
        "owner",
        "repo",
        "path"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/contents#get-repository-content",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/readme/{dir}",
      "parameters": [
        "owner",
        "repo",
        "dir"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/contents#get-a-repository-readme-for-a-directory",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/tarball/{ref}",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/contents#download-a-repository-archive-tar",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/zipball/{ref}",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/repos/contents#download-a-repository-archive-zip",
      "category": "Repositories",
      "api": "repos",
      "api_doc_link": "https://docs.github.com/en/rest/repos"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/releases/assets/{asset_id}",
      "parameters": [
        "owner",
        "repo",
        "asset_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/releases/assets#get-a-release-asset",
      "category": "Repositories",
      "api": "releases",
      "api_doc_link": "https://docs.github.com/en/rest/releases"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/releases/tags/{tag}",
      "parameters": [
        "owner",
        "repo",
        "tag"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/releases/releases#get-a-release-by-tag-name",
      "category": "Repositories",
      "api": "releases",
      "api_doc_link": "https://docs.github.com/en/rest/releases"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/releases/{release_id}",
      "parameters": [
        "owner",
        "repo",
        "release_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/releases/releases#get-a-release",
      "category": "Repositories",
      "api": "releases",
      "api_doc_link": "https://docs.github.com/en/rest/releases"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/releases/{release_id}/assets",
      "parameters": [
        "owner",
        "repo",
        "release_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/releases/assets#list-release-assets",
      "category": "Repositories",
      "api": "releases",
      "api_doc_link": "https://docs.github.com/en/rest/releases"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/comments/{comment_id}/reactions",
      "parameters": [
        "owner",
        "repo",
        "comment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-a-commit-comment",
      "category": "Repositories",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
      "parameters": [
        "owner",
        "repo",
        "comment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-an-issue-comment",
      "category": "Repositories",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/{issue_number}/reactions",
      "parameters": [
        "owner",
        "repo",
        "issue_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-an-issue",
      "category": "Repositories",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
      "parameters": [
        "owner",
        "repo",
        "comment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-a-pull-request-review-comment",
      "category": "Repositories",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/releases/{release_id}/reactions",
      "parameters": [
        "owner",
        "repo",
        "release_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-a-release",
      "category": "Repositories",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/comments/{comment_id}",
      "parameters": [
        "owner",
        "repo",
        "comment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/comments#get-a-review-comment-for-a-pull-request",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}",
      "parameters": [
        "owner",
        "repo",
        "pull_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/pulls#get-a-pull-request",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/comments",
      "parameters": [
        "owner",
        "repo",
        "pull_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/comments#list-review-comments-on-a-pull-request",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/commits",
      "parameters": [
        "owner",
        "repo",
        "pull_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/pulls#list-commits-on-a-pull-request",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/files",
      "parameters": [
        "owner",
        "repo",
        "pull_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/pulls#list-pull-requests-files",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/merge",
      "parameters": [
        "owner",
        "repo",
        "pull_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/pulls#check-if-a-pull-request-has-been-merged",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
      "parameters": [
        "owner",
        "repo",
        "pull_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/review-requests#get-all-requested-reviewers-for-a-pull-request",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/reviews",
      "parameters": [
        "owner",
        "repo",
        "pull_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/reviews#list-reviews-for-a-pull-request",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pages/builds/{build_id}",
      "parameters": [
        "owner",
        "repo",
        "build_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pages#get-github-pages-build",
      "category": "Repositories",
      "api": "pages",
      "api_doc_link": "https://docs.github.com/en/rest/pages"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/assignees/{assignee}",
      "parameters": [
        "owner",
        "repo",
        "assignee"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/assignees#check-if-a-user-can-be-assigned",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/comments/{comment_id}",
      "parameters": [
        "owner",
        "repo",
        "comment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/comments#get-an-issue-comment",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/events/{event_id}",
      "parameters": [
        "owner",
        "repo",
        "event_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/events#get-an-issue-event",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/{issue_number}",
      "parameters": [
        "owner",
        "repo",
        "issue_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/issues#get-an-issue",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/{issue_number}/comments",
      "parameters": [
        "owner",
        "repo",
        "issue_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/comments#list-issue-comments",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/{issue_number}/events",
      "parameters": [
        "owner",
        "repo",
        "issue_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/events#list-issue-events",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/{issue_number}/labels",
      "parameters": [
        "owner",
        "repo",
        "issue_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/labels#list-labels-for-an-issue",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/issues/{issue_number}/timeline",
      "parameters": [
        "owner",
        "repo",
        "issue_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/timeline#list-timeline-events-for-an-issue",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/labels/{name}",
      "parameters": [
        "owner",
        "repo",
        "name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/labels#get-a-label",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/milestones/{milestone_number}",
      "parameters": [
        "owner",
        "repo",
        "milestone_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/milestones#get-a-milestone",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/milestones/{milestone_number}/labels",
      "parameters": [
        "owner",
        "repo",
        "milestone_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/issues/labels#list-labels-for-issues-in-a-milestone",
      "category": "Repositories",
      "api": "issues",
      "api_doc_link": "https://docs.github.com/en/rest/issues"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/git/blobs/{file_sha}",
      "parameters": [
        "owner",
        "repo",
        "file_sha"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/git/blobs#get-a-blob",
      "category": "Repositories",
      "api": "git",
      "api_doc_link": "https://docs.github.com/en/rest/git"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/git/commits/{commit_sha}",
      "parameters": [
        "owner",
        "repo",
        "commit_sha"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/git/commits#get-a-commit",
      "category": "Repositories",
      "api": "git",
      "api_doc_link": "https://docs.github.com/en/rest/git"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/git/matching-refs/{ref}",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/git/refs#list-matching-references",
      "category": "Repositories",
      "api": "git",
      "api_doc_link": "https://docs.github.com/en/rest/git"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/git/ref/{ref}",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/git/refs#get-a-reference",
      "category": "Repositories",
      "api": "git",
      "api_doc_link": "https://docs.github.com/en/rest/git"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/git/tags/{tag_sha}",
      "parameters": [
        "owner",
        "repo",
        "tag_sha"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/git/tags#get-a-tag",
      "category": "Repositories",
      "api": "git",
      "api_doc_link": "https://docs.github.com/en/rest/git"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/git/trees/{tree_sha}",
      "parameters": [
        "owner",
        "repo",
        "tree_sha"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/git/trees#get-a-tree",
      "category": "Repositories",
      "api": "git",
      "api_doc_link": "https://docs.github.com/en/rest/git"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/deployments/{deployment_id}",
      "parameters": [
        "owner",
        "repo",
        "deployment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/deployments#get-a-deployment",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
      "parameters": [
        "owner",
        "repo",
        "deployment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/statuses#list-deployment-statuses",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/environments/{environment_name}",
      "parameters": [
        "owner",
        "repo",
        "environment_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/environments#get-an-environment",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
      "parameters": [
        "owner",
        "repo",
        "environment_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/branch-policies#list-deployment-branch-policies",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/keys/{key_id}",
      "parameters": [
        "owner",
        "repo",
        "key_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deploy-keys#get-a-deploy-key",
      "category": "Repositories",
      "api": "deploy-keys",
      "api_doc_link": "https://docs.github.com/en/rest/deploy-keys"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/dependabot/alerts/{alert_number}",
      "parameters": [
        "owner",
        "repo",
        "alert_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/alerts#get-a-dependabot-alert",
      "category": "Repositories",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/dependabot/secrets/{secret_name}",
      "parameters": [
        "owner",
        "repo",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/secrets#get-a-repository-secret",
      "category": "Repositories",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/comments/{comment_id}",
      "parameters": [
        "owner",
        "repo",
        "comment_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/comments#get-a-commit-comment",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head",
      "parameters": [
        "owner",
        "repo",
        "commit_sha"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/commits#list-branches-for-head-commit",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{commit_sha}/comments",
      "parameters": [
        "owner",
        "repo",
        "commit_sha"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/comments#list-commit-comments",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{commit_sha}/pulls",
      "parameters": [
        "owner",
        "repo",
        "commit_sha"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/commits#list-pull-requests-associated-with-a-commit",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{ref}",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/commits#get-a-commit",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{ref}/status",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/statuses#get-the-combined-status-for-a-specific-reference",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{ref}/statuses",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/statuses#list-commit-statuses-for-a-reference",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/compare/{basehead}",
      "parameters": [
        "owner",
        "repo",
        "basehead"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/commits/commits#compare-two-commits",
      "category": "Repositories",
      "api": "commits",
      "api_doc_link": "https://docs.github.com/en/rest/commits"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/collaborators/{username}",
      "parameters": [
        "owner",
        "repo",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/collaborators/collaborators#check-if-a-user-is-a-repository-collaborator",
      "category": "Repositories",
      "api": "collaborators",
      "api_doc_link": "https://docs.github.com/en/rest/collaborators"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/collaborators/{username}/permission",
      "parameters": [
        "owner",
        "repo",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/collaborators/collaborators#get-repository-permissions-for-a-user",
      "category": "Repositories",
      "api": "collaborators",
      "api_doc_link": "https://docs.github.com/en/rest/collaborators"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/codespaces/secrets/{secret_name}",
      "parameters": [
        "owner",
        "repo",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/codespaces/repository-secrets#get-a-repository-secret",
      "category": "Repositories",
      "api": "codespaces",
      "api_doc_link": "https://docs.github.com/en/rest/codespaces"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
      "parameters": [
        "owner",
        "repo",
        "alert_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#get-a-code-scanning-alert",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
      "parameters": [
        "owner",
        "repo",
        "alert_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#list-instances-of-a-code-scanning-alert",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}",
      "parameters": [
        "owner",
        "repo",
        "analysis_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#get-a-code-scanning-analysis-for-a-repository",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/codeql/databases/{language}",
      "parameters": [
        "owner",
        "repo",
        "language"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#get-a-codeql-database-for-a-repository",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}",
      "parameters": [
        "owner",
        "repo",
        "sarif_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#get-information-about-a-sarif-upload",
      "category": "Repositories",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/check-runs/{check_run_id}",
      "parameters": [
        "owner",
        "repo",
        "check_run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/checks/runs#get-a-check-run",
      "category": "Repositories",
      "api": "checks",
      "api_doc_link": "https://docs.github.com/en/rest/checks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations",
      "parameters": [
        "owner",
        "repo",
        "check_run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/checks/runs#list-check-run-annotations",
      "category": "Repositories",
      "api": "checks",
      "api_doc_link": "https://docs.github.com/en/rest/checks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/check-suites/{check_suite_id}",
      "parameters": [
        "owner",
        "repo",
        "check_suite_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/checks/suites#get-a-check-suite",
      "category": "Repositories",
      "api": "checks",
      "api_doc_link": "https://docs.github.com/en/rest/checks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs",
      "parameters": [
        "owner",
        "repo",
        "check_suite_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/checks/runs#list-check-runs-in-a-check-suite",
      "category": "Repositories",
      "api": "checks",
      "api_doc_link": "https://docs.github.com/en/rest/checks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{ref}/check-runs",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/checks/runs#list-check-runs-for-a-git-reference",
      "category": "Repositories",
      "api": "checks",
      "api_doc_link": "https://docs.github.com/en/rest/checks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/commits/{ref}/check-suites",
      "parameters": [
        "owner",
        "repo",
        "ref"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/checks/suites#list-check-suites-for-a-git-reference",
      "category": "Repositories",
      "api": "checks",
      "api_doc_link": "https://docs.github.com/en/rest/checks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branches#get-a-branch",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-branch-protection",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-admin-branch-protection",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-pull-request-review-protection",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-commit-signature-protection",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-status-checks-protection",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-all-status-check-contexts",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-access-restrictions",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-apps-with-access-to-the-protected-branch",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-teams-with-access-to-the-protected-branch",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      "parameters": [
        "owner",
        "repo",
        "branch"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/branches/branch-protection#get-users-with-access-to-the-protected-branch",
      "category": "Repositories",
      "api": "branches",
      "api_doc_link": "https://docs.github.com/en/rest/branches"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
      "parameters": [
        "owner",
        "repo",
        "artifact_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/artifacts#get-an-artifact",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/jobs/{job_id}",
      "parameters": [
        "owner",
        "repo",
        "job_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-jobs#get-a-job-for-a-workflow-run",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/jobs/{job_id}/logs",
      "parameters": [
        "owner",
        "repo",
        "job_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-jobs#download-job-logs-for-a-workflow-run",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runners/{runner_id}",
      "parameters": [
        "owner",
        "repo",
        "runner_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#get-a-self-hosted-runner-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runners/{runner_id}/labels",
      "parameters": [
        "owner",
        "repo",
        "runner_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#list-labels-for-a-self-hosted-runner-for-a-repository",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}",
      "parameters": [
        "owner",
        "repo",
        "run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#get-a-workflow-run",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/approvals",
      "parameters": [
        "owner",
        "repo",
        "run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#get-the-review-history-for-a-workflow-run",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
      "parameters": [
        "owner",
        "repo",
        "run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/artifacts#list-workflow-run-artifacts",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/jobs",
      "parameters": [
        "owner",
        "repo",
        "run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/logs",
      "parameters": [
        "owner",
        "repo",
        "run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#download-workflow-run-logs",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments",
      "parameters": [
        "owner",
        "repo",
        "run_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#get-pending-deployments-for-a-workflow-run",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/secrets/{secret_name}",
      "parameters": [
        "owner",
        "repo",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#get-a-repository-secret",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/workflows/{workflow_id}",
      "parameters": [
        "owner",
        "repo",
        "workflow_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflows#get-a-workflow",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
      "parameters": [
        "owner",
        "repo",
        "workflow_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#list-workflow-runs-for-a-workflow",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}",
      "parameters": [
        "repository_id",
        "environment_name",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#get-an-environment-secret",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}",
      "parameters": [
        "owner",
        "repo",
        "hook_id",
        "delivery_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/webhooks/repo-deliveries#get-a-delivery-for-a-repository-webhook",
      "category": "Repositories",
      "api": "webhooks",
      "api_doc_link": "https://docs.github.com/en/rest/webhooks"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}",
      "parameters": [
        "owner",
        "repo",
        "pull_number",
        "review_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/reviews#get-a-review-for-a-pull-request",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments",
      "parameters": [
        "owner",
        "repo",
        "pull_number",
        "review_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/pulls/reviews#list-comments-for-a-pull-request-review",
      "category": "Repositories",
      "api": "pulls",
      "api_doc_link": "https://docs.github.com/en/rest/pulls"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}",
      "parameters": [
        "owner",
        "repo",
        "deployment_id",
        "status_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/statuses#get-a-deployment-status",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}",
      "parameters": [
        "owner",
        "repo",
        "environment_name",
        "branch_policy_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/deployments/branch-policies#get-a-deployment-branch-policy",
      "category": "Repositories",
      "api": "deployments",
      "api_doc_link": "https://docs.github.com/en/rest/deployments"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}",
      "parameters": [
        "owner",
        "repo",
        "artifact_id",
        "archive_format"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/artifacts#download-an-artifact",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}",
      "parameters": [
        "owner",
        "repo",
        "run_id",
        "attempt_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#get-a-workflow-run-attempt",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs",
      "parameters": [
        "owner",
        "repo",
        "run_id",
        "attempt_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run-attempt",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs",
      "parameters": [
        "owner",
        "repo",
        "run_id",
        "attempt_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/workflow-runs#download-workflow-run-attempt-logs",
      "category": "Repositories",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/users",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/users#list-users",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/organizations",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/orgs#list-organizations",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/users/{username}",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/users#get-a-user",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/users/{username}/followers",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/followers#list-followers-of-a-user",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/users/{username}/following",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/followers#list-the-people-a-user-follows",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/users/{username}/gpg_keys",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/gpg-keys#list-gpg-keys-for-a-user",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/users/{username}/keys",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/keys#list-public-keys-for-a-user",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/users/{username}/ssh_signing_keys",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/ssh-signing-keys#list-ssh-signing-keys-for-a-user",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/orgs/{org}/teams",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#list-teams",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}",
      "parameters": [
        "team_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#get-a-team-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/discussions",
      "parameters": [
        "team_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussions#list-discussions-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/invitations",
      "parameters": [
        "team_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/members#list-pending-team-invitations-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/members",
      "parameters": [
        "team_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/members#list-team-members-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/projects",
      "parameters": [
        "team_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#list-team-projects-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/repos",
      "parameters": [
        "team_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#list-team-repositories-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/teams",
      "parameters": [
        "team_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#list-child-teams-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/organizations/{organization_id}/custom_roles",
      "parameters": [
        "organization_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/custom-roles#list-custom-repository-roles-in-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/orgs#get-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/blocks",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/blocking#list-users-blocked-by-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/failed_invitations",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#list-failed-organization-invitations",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/fine_grained_permissions",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/custom-roles#list-fine-grained-permissions-for-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/hooks",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/webhooks#list-organization-webhooks",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/installations",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/orgs#list-app-installations-for-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/invitations",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#list-pending-organization-invitations",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/members",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#list-organization-members",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/outside_collaborators",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/outside-collaborators#list-outside-collaborators-for-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/public_members",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#list-public-organization-members",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/security-managers",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/security-managers#list-security-manager-teams",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/users/{username}/orgs",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/orgs#list-organizations-for-a-user",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/interaction-limits",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/interactions/orgs#get-interaction-restrictions-for-an-organization",
      "category": "Accounts",
      "api": "interactions",
      "api_doc_link": "https://docs.github.com/en/rest/interactions"
    },
    {
      "endpoint": "/orgs/{org}/dependabot/secrets",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/secrets#list-organization-secrets",
      "category": "Accounts",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/orgs/{org}/dependabot/secrets/public-key",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/secrets#get-an-organization-public-key",
      "category": "Accounts",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/orgs/{org}/code-scanning/alerts",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/code-scanning#list-code-scanning-alerts-for-an-organization",
      "category": "Accounts",
      "api": "code-scanning",
      "api_doc_link": "https://docs.github.com/en/rest/code-scanning"
    },
    {
      "endpoint": "/orgs/{org}/settings/billing/advanced-security",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/billing#get-github-advanced-security-active-committers-for-an-organization",
      "category": "Accounts",
      "api": "billing",
      "api_doc_link": "https://docs.github.com/en/rest/billing"
    },
    {
      "endpoint": "/orgs/{org}/events",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-public-organization-events",
      "category": "Accounts",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/users/{username}/events",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-events-for-the-authenticated-user",
      "category": "Accounts",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/users/{username}/events/public",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-public-events-for-a-user",
      "category": "Accounts",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/users/{username}/received_events",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-events-received-by-the-authenticated-user",
      "category": "Accounts",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/users/{username}/received_events/public",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-public-events-received-by-a-user",
      "category": "Accounts",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/users/{username}/starred",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/starring#list-repositories-starred-by-a-user",
      "category": "Accounts",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/users/{username}/subscriptions",
      "parameters": [
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/watching#list-repositories-watched-by-a-user",
      "category": "Accounts",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/enterprises/{enterprise}/actions/cache/usage",
      "parameters": [
        "enterprise"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/cache#get-github-actions-cache-usage-for-an-enterprise",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/enterprises/{enterprise}/actions/permissions/workflow",
      "parameters": [
        "enterprise"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-default-workflow-permissions-for-an-enterprise",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/cache/usage",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/cache#get-github-actions-cache-usage-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/cache/usage-by-repository",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/cache#list-repositories-with-github-actions-cache-usage-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/permissions",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-github-actions-permissions-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/permissions/repositories",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#list-selected-repositories-enabled-for-github-actions-in-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/permissions/selected-actions",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-allowed-actions-and-reusable-workflows-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/permissions/workflow",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/permissions#get-default-workflow-permissions-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/runner-groups",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runner-groups#list-self-hosted-runner-groups-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/runners",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#list-self-hosted-runners-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/runners/downloads",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#list-runner-applications-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/secrets",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#list-organization-secrets",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/secrets/public-key",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#get-an-organization-public-key",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/users/{username}/following/{target_user}",
      "parameters": [
        "username",
        "target_user"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/users/followers#check-if-a-user-follows-another-user",
      "category": "Accounts",
      "api": "users",
      "api_doc_link": "https://docs.github.com/en/rest/users"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}",
      "parameters": [
        "org",
        "team_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#get-a-team-by-name",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/discussions",
      "parameters": [
        "org",
        "team_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussions#list-discussions",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/invitations",
      "parameters": [
        "org",
        "team_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/members#list-pending-team-invitations",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/members",
      "parameters": [
        "org",
        "team_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/members#list-team-members",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/projects",
      "parameters": [
        "org",
        "team_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#list-team-projects",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/repos",
      "parameters": [
        "org",
        "team_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#list-team-repositories",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/teams",
      "parameters": [
        "org",
        "team_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#list-child-teams",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/discussions/{discussion_number}",
      "parameters": [
        "team_id",
        "discussion_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussions#get-a-discussion-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/discussions/{discussion_number}/comments",
      "parameters": [
        "team_id",
        "discussion_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussion-comments#list-discussion-comments-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/members/{username}",
      "parameters": [
        "team_id",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/members#get-team-member-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/memberships/{username}",
      "parameters": [
        "team_id",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/members#get-team-membership-for-a-user-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/projects/{project_id}",
      "parameters": [
        "team_id",
        "project_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#check-team-permissions-for-a-project-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/discussions/{discussion_number}/reactions",
      "parameters": [
        "team_id",
        "discussion_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-a-team-discussion-legacy",
      "category": "Accounts",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/orgs/{org}/blocks/{username}",
      "parameters": [
        "org",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/blocking#check-if-a-user-is-blocked-by-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/hooks/{hook_id}",
      "parameters": [
        "org",
        "hook_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/webhooks#get-an-organization-webhook",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/hooks/{hook_id}/config",
      "parameters": [
        "org",
        "hook_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/webhooks#get-a-webhook-configuration-for-an-organization",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/hooks/{hook_id}/deliveries",
      "parameters": [
        "org",
        "hook_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/webhooks#list-deliveries-for-an-organization-webhook",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/invitations/{invitation_id}/teams",
      "parameters": [
        "org",
        "invitation_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#list-organization-invitation-teams",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/members/{username}",
      "parameters": [
        "org",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#check-organization-membership-for-a-user",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/memberships/{username}",
      "parameters": [
        "org",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#get-organization-membership-for-a-user",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/public_members/{username}",
      "parameters": [
        "org",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/members#check-public-organization-membership-for-a-user",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/dependabot/secrets/{secret_name}",
      "parameters": [
        "org",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/secrets#get-an-organization-secret",
      "category": "Accounts",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/orgs/{org}/dependabot/secrets/{secret_name}/repositories",
      "parameters": [
        "org",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/dependabot/secrets#list-selected-repositories-for-an-organization-secret",
      "category": "Accounts",
      "api": "dependabot",
      "api_doc_link": "https://docs.github.com/en/rest/dependabot"
    },
    {
      "endpoint": "/orgs/{org}/actions/runner-groups/{runner_group_id}",
      "parameters": [
        "org",
        "runner_group_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runner-groups#get-a-self-hosted-runner-group-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories",
      "parameters": [
        "org",
        "runner_group_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runner-groups#list-repository-access-to-a-self-hosted-runner-group-in-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/runner-groups/{runner_group_id}/runners",
      "parameters": [
        "org",
        "runner_group_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runner-groups#list-self-hosted-runners-in-a-group-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/runners/{runner_id}",
      "parameters": [
        "org",
        "runner_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#get-a-self-hosted-runner-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/runners/{runner_id}/labels",
      "parameters": [
        "org",
        "runner_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/self-hosted-runners#list-labels-for-a-self-hosted-runner-for-an-organization",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/secrets/{secret_name}",
      "parameters": [
        "org",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#get-an-organization-secret",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/actions/secrets/{secret_name}/repositories",
      "parameters": [
        "org",
        "secret_name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/actions/secrets#list-selected-repositories-for-an-organization-secret",
      "category": "Accounts",
      "api": "actions",
      "api_doc_link": "https://docs.github.com/en/rest/actions"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}",
      "parameters": [
        "org",
        "team_slug",
        "discussion_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussions#get-a-discussion",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
      "parameters": [
        "org",
        "team_slug",
        "discussion_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussion-comments#list-discussion-comments",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/memberships/{username}",
      "parameters": [
        "org",
        "team_slug",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/members#get-team-membership-for-a-user",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/projects/{project_id}",
      "parameters": [
        "org",
        "team_slug",
        "project_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#check-team-permissions-for-a-project",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}",
      "parameters": [
        "team_id",
        "discussion_number",
        "comment_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussion-comments#get-a-discussion-comment-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/teams/{team_id}/repos/{owner}/{repo}",
      "parameters": [
        "team_id",
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#check-team-permissions-for-a-repository-legacy",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
      "parameters": [
        "org",
        "team_slug",
        "discussion_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-a-team-discussion",
      "category": "Accounts",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions",
      "parameters": [
        "team_id",
        "discussion_number",
        "comment_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-a-team-discussion-comment-legacy",
      "category": "Accounts",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}",
      "parameters": [
        "org",
        "hook_id",
        "delivery_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/orgs/webhooks#get-a-webhook-delivery-for-an-organization-webhook",
      "category": "Accounts",
      "api": "orgs",
      "api_doc_link": "https://docs.github.com/en/rest/orgs"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}",
      "parameters": [
        "org",
        "team_slug",
        "discussion_number",
        "comment_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/discussion-comments#get-a-discussion-comment",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}",
      "parameters": [
        "org",
        "team_slug",
        "owner",
        "repo"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/teams/teams#check-team-permissions-for-a-repository",
      "category": "Accounts",
      "api": "teams",
      "api_doc_link": "https://docs.github.com/en/rest/teams"
    },
    {
      "endpoint": "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
      "parameters": [
        "org",
        "team_slug",
        "discussion_number",
        "comment_number"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/reactions#list-reactions-for-a-team-discussion-comment",
      "category": "Accounts",
      "api": "reactions",
      "api_doc_link": "https://docs.github.com/en/rest/reactions"
    },
    {
      "endpoint": "/search/code",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/search#search-code",
      "category": "Misc.",
      "api": "search",
      "api_doc_link": "https://docs.github.com/en/rest/search"
    },
    {
      "endpoint": "/search/commits",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/search#search-commits",
      "category": "Misc.",
      "api": "search",
      "api_doc_link": "https://docs.github.com/en/rest/search"
    },
    {
      "endpoint": "/search/issues",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/search#search-issues-and-pull-requests",
      "category": "Misc.",
      "api": "search",
      "api_doc_link": "https://docs.github.com/en/rest/search"
    },
    {
      "endpoint": "/search/labels",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/search#search-labels",
      "category": "Misc.",
      "api": "search",
      "api_doc_link": "https://docs.github.com/en/rest/search"
    },
    {
      "endpoint": "/search/repositories",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/search#search-repositories",
      "category": "Misc.",
      "api": "search",
      "api_doc_link": "https://docs.github.com/en/rest/search"
    },
    {
      "endpoint": "/search/topics",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/search#search-topics",
      "category": "Misc.",
      "api": "search",
      "api_doc_link": "https://docs.github.com/en/rest/search"
    },
    {
      "endpoint": "/search/users",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/search#search-users",
      "category": "Misc.",
      "api": "search",
      "api_doc_link": "https://docs.github.com/en/rest/search"
    },
    {
      "endpoint": "/rate_limit",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/rate-limit#get-rate-limit-status-for-the-authenticated-user",
      "category": "Misc.",
      "api": "rate-limit",
      "api_doc_link": "https://docs.github.com/en/rest/rate-limit"
    },
    {
      "endpoint": "/",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/meta#github-api-root",
      "category": "Misc.",
      "api": "meta",
      "api_doc_link": "https://docs.github.com/en/rest/meta"
    },
    {
      "endpoint": "/meta",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/meta#get-github-meta-information",
      "category": "Misc.",
      "api": "meta",
      "api_doc_link": "https://docs.github.com/en/rest/meta"
    },
    {
      "endpoint": "/octocat",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/meta#get-octocat",
      "category": "Misc.",
      "api": "meta",
      "api_doc_link": "https://docs.github.com/en/rest/meta"
    },
    {
      "endpoint": "/zen",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/meta#get-the-zen-of-github",
      "category": "Misc.",
      "api": "meta",
      "api_doc_link": "https://docs.github.com/en/rest/meta"
    },
    {
      "endpoint": "/licenses",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/licenses#get-all-commonly-used-licenses",
      "category": "Misc.",
      "api": "licenses",
      "api_doc_link": "https://docs.github.com/en/rest/licenses"
    },
    {
      "endpoint": "/gitignore/templates",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/gitignore#get-all-gitignore-templates",
      "category": "Misc.",
      "api": "gitignore",
      "api_doc_link": "https://docs.github.com/en/rest/gitignore"
    },
    {
      "endpoint": "/emojis",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/emojis#get-emojis",
      "category": "Misc.",
      "api": "emojis",
      "api_doc_link": "https://docs.github.com/en/rest/emojis"
    },
    {
      "endpoint": "/codes_of_conduct",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/codes-of-conduct#get-all-codes-of-conduct",
      "category": "Misc.",
      "api": "codes-of-conduct",
      "api_doc_link": "https://docs.github.com/en/rest/codes-of-conduct"
    },
    {
      "endpoint": "/app",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/apps/apps#get-the-authenticated-app",
      "category": "Misc.",
      "api": "apps",
      "api_doc_link": "https://docs.github.com/en/rest/apps"
    },
    {
      "endpoint": "/app/installations",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/apps/apps#list-installations-for-the-authenticated-app",
      "category": "Misc.",
      "api": "apps",
      "api_doc_link": "https://docs.github.com/en/rest/apps"
    },
    {
      "endpoint": "/installation/repositories",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/apps/installations#list-repositories-accessible-to-the-app-installation",
      "category": "Misc.",
      "api": "apps",
      "api_doc_link": "https://docs.github.com/en/rest/apps"
    },
    {
      "endpoint": "/events",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/events#list-public-events",
      "category": "Misc.",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/feeds",
      "parameters": [],
      "endpoint_doc_link": "https://docs.github.com/en/rest/activity/feeds#get-feeds",
      "category": "Misc.",
      "api": "activity",
      "api_doc_link": "https://docs.github.com/en/rest/activity"
    },
    {
      "endpoint": "/orgs/{org}/projects",
      "parameters": [
        "org"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/projects#list-organization-projects",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/projects/columns/cards/{card_id}",
      "parameters": [
        "card_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/cards#get-a-project-card",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/projects/columns/{column_id}",
      "parameters": [
        "column_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/columns#get-a-project-column",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/projects/columns/{column_id}/cards",
      "parameters": [
        "column_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/cards#list-project-cards",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/projects/{project_id}",
      "parameters": [
        "project_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/projects#get-a-project",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/projects/{project_id}/collaborators",
      "parameters": [
        "project_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/collaborators#list-project-collaborators",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/projects/{project_id}/columns",
      "parameters": [
        "project_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/columns#list-project-columns",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    },
    {
      "endpoint": "/licenses/{license}",
      "parameters": [
        "license"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/licenses#get-a-license",
      "category": "Misc.",
      "api": "licenses",
      "api_doc_link": "https://docs.github.com/en/rest/licenses"
    },
    {
      "endpoint": "/gitignore/templates/{name}",
      "parameters": [
        "name"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/gitignore#get-a-gitignore-template",
      "category": "Misc.",
      "api": "gitignore",
      "api_doc_link": "https://docs.github.com/en/rest/gitignore"
    },
    {
      "endpoint": "/codes_of_conduct/{key}",
      "parameters": [
        "key"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/codes-of-conduct#get-a-code-of-conduct",
      "category": "Misc.",
      "api": "codes-of-conduct",
      "api_doc_link": "https://docs.github.com/en/rest/codes-of-conduct"
    },
    {
      "endpoint": "/app/installations/{installation_id}",
      "parameters": [
        "installation_id"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/apps/apps#get-an-installation-for-the-authenticated-app",
      "category": "Misc.",
      "api": "apps",
      "api_doc_link": "https://docs.github.com/en/rest/apps"
    },
    {
      "endpoint": "/apps/{app_slug}",
      "parameters": [
        "app_slug"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/apps/apps#get-an-app",
      "category": "Misc.",
      "api": "apps",
      "api_doc_link": "https://docs.github.com/en/rest/apps"
    },
    {
      "endpoint": "/projects/{project_id}/collaborators/{username}/permission",
      "parameters": [
        "project_id",
        "username"
      ],
      "endpoint_doc_link": "https://docs.github.com/en/rest/projects/collaborators#get-project-permission-for-a-user",
      "category": "Misc.",
      "api": "projects",
      "api_doc_link": "https://docs.github.com/en/rest/projects"
    }
  ],
  "categories": [
    "Repositories",
    "Accounts",
    "Misc."
  ],
  "apis": {
    "actions": "https://docs.github.com/en/rest/actions",
    "activity": "https://docs.github.com/en/rest/activity",
    "branches": "https://docs.github.com/en/rest/branches",
    "checks": "https://docs.github.com/en/rest/checks",
    "code-scanning": "https://docs.github.com/en/rest/code-scanning",
    "codespaces": "https://docs.github.com/en/rest/codespaces",
    "collaborators": "https://docs.github.com/en/rest/collaborators",
    "commits": "https://docs.github.com/en/rest/commits",
    "dependabot": "https://docs.github.com/en/rest/dependabot",
    "deploy-keys": "https://docs.github.com/en/rest/deploy-keys",
    "deployments": "https://docs.github.com/en/rest/deployments",
    "git": "https://docs.github.com/en/rest/git",
    "interactions": "https://docs.github.com/en/rest/interactions",
    "issues": "https://docs.github.com/en/rest/issues",
    "licenses": "https://docs.github.com/en/rest/licenses",
    "metrics": "https://docs.github.com/en/rest/metrics",
    "migrations": "https://docs.github.com/en/rest/migrations",
    "pages": "https://docs.github.com/en/rest/pages",
    "projects": "https://docs.github.com/en/rest/projects",
    "pulls": "https://docs.github.com/en/rest/pulls",
    "releases": "https://docs.github.com/en/rest/releases",
    "reactions": "https://docs.github.com/en/rest/reactions",
    "repos": "https://docs.github.com/en/rest/repos",
    "webhooks": "https://docs.github.com/en/rest/webhooks",
    "billing": "https://docs.github.com/en/rest/billing",
    "orgs": "https://docs.github.com/en/rest/orgs",
    "teams": "https://docs.github.com/en/rest/teams",
    "users": "https://docs.github.com/en/rest/users",
    "apps": "https://docs.github.com/en/rest/apps",
    "codes-of-conduct": "https://docs.github.com/en/rest/codes-of-conduct",
    "emojis": "https://docs.github.com/en/rest/emojis",
    "gitignore": "https://docs.github.com/en/rest/gitignore",
    "meta": "https://docs.github.com/en/rest/meta",
    "rate-limit": "https://docs.github.com/en/rest/rate-limit",
    "search": "https://docs.github.com/en/rest/search"
  },
  "parameters": [
    "alert_number",
    "analysis_id",
    "app_slug",
    "archive_format",
    "artifact_id",
    "asset_id",
    "assignee",
    "attempt_number",
    "autolink_id",
    "basehead",
    "branch",
    "branch_policy_id",
    "build_id",
    "card_id",
    "check_run_id",
    "check_suite_id",
    "column_id",
    "comment_id",
    "comment_number",
    "commit_sha",
    "delivery_id",
    "deployment_id",
    "dir",
    "discussion_number",
    "enterprise",
    "environment_name",
    "event_id",
    "file_sha",
    "hook_id",
    "installation_id",
    "invitation_id",
    "issue_number",
    "job_id",
    "key",
    "key_id",
    "language",
    "license",
    "milestone_number",
    "name",
    "org",
    "organization_id",
    "owner",
    "path",
    "project_id",
    "pull_number",
    "ref",
    "release_id",
    "repo",
    "repository_id",
    "review_id",
    "run_id",
    "runner_group_id",
    "runner_id",
    "sarif_id",
    "secret_name",
    "status_id",
    "tag",
    "tag_sha",
    "target_user",
    "team_id",
    "team_slug",
    "tree_sha",
    "username",
    "workflow_id"
  ]
}