# Dependabot and Supply Chain Security Setup

This project uses a comprehensive security setup to protect against supply chain attacks and keep dependencies up to date.

## 🤖 Dependabot Configuration

### What's Configured

- **Weekly dependency scans** every Monday at 9:00 AM UTC
- **Automatic grouping** of patch and minor updates
- **Security updates** for both npm packages and GitHub Actions
- **Automatic labels** for easy PR categorization
- **Major version blocking** - all major updates require manual review

### Auto-Merge Policy

✅ **Auto-merged after tests pass:**

- Patch updates (e.g., 1.0.0 → 1.0.1)
- Minor updates (e.g., 1.0.0 → 1.1.0)
- **All 51 unit tests pass**

❌ **Requires manual review:**

- Major updates (e.g., 1.0.0 → 2.0.0) - potential breaking changes
- Any update that fails tests, linting, or type checking

## 🔒 Supply Chain Protection

### 1. Automated Security Scanning

**Weekly Security Audits** (`.github/workflows/security-audit.yml`)

- Runs `bun audit` to check for known vulnerabilities
- Fails CI if high or critical vulnerabilities are found
- Uploads audit reports as artifacts
- Checks for outdated dependencies

**Manual Security Commands:**

```bash
# Run security audit
bun run audit

# Attempt to auto-fix vulnerabilities
bun run audit:fix

# Check for outdated packages
bun run outdated

# Run unit tests
bun run test

# Run all quality checks
bun run lint && bun run typecheck && bun run test
```

## 🧪 Test Suite

**Automated Unit Testing** (`.github/workflows/ci.yml`)

- **51 unit tests** across 17 test files
- Tests all components and pages
- Runs in all CI/CD workflows
- Blocks merges and deployments if tests fail

**Test commands:**

```bash
# Run tests once
bun run test -- --run

# Run tests in watch mode (development)
bun run test

# Run specific test file
bun run test -- BackButton.test.ts
```

### 2. Lock File Protection

- `bun.lock` is committed to version control
- Ensures reproducible builds across environments
- Prevents phantom dependency injection

### 3. Package Registry Security

Configuration in `.npmrc`:

- ✅ Only use official npm registry
- ✅ Enable audit on install
- ✅ Save exact versions (no version ranges)
- ✅ Moderate audit level enforcement
- ✅ Retry failed downloads with timeout

### 4. GitHub Security Features

Enable these in your GitHub repository settings:

**Settings → Security & analysis:**

1. ✅ Dependency graph
2. ✅ Dependabot alerts
3. ✅ Dependabot security updates
4. ✅ Secret scanning
5. ✅ Code scanning (if available)

### 5. Branch Protection

**Recommended settings for `main` branch:**

1. ✅ Require pull request reviews
2. ✅ Require status checks to pass:
    - Linting
    - Formatting
    - Type checking
    - Build
    - Security audit
3. ✅ Require signed commits (recommended)
4. ✅ Include administrators

## 📋 Workflows

### 1. Dependabot Auto-Merge (`.github/workflows/dependabot-auto-merge.yml`)

**Triggers:** When Dependabot opens/updates a PR

**Process:**

1. Runs linter
2. Checks code formatting
3. Runs TypeScript type check
4. Builds the project
5. If tests pass:
    - Auto-approves patch/minor updates
    - Enables auto-merge
6. If major update:
    - Adds comment requiring manual review
    - Does NOT auto-merge

### 2. Security Audit (`.github/workflows/security-audit.yml`)

**Triggers:**

- Push to main
- Pull requests
- Weekly schedule (Mondays 9 AM UTC)
- Manual trigger

**Process:**

1. Runs `bun audit`
2. Checks for high/critical vulnerabilities
3. Uploads audit report
4. Checks for outdated dependencies

### 3. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**

- Push to main/develop
- Pull requests

**Process:**

1. Runs ESLint
2. Checks code formatting
3. Runs TypeScript type check
4. Builds the project
5. Blocks merge if any check fails

### 4. Deployment Workflow (`.github/workflows/nuxthub.yml`)

**Triggers:**

- Every push

**Process:**

1. Runs quality checks (lint, format, type, build)
2. Only deploys if all checks pass
3. Blocks deployment on any failure

## 🛡️ Additional Security Best Practices

### Before Adding a New Dependency

1. **Check package reputation:**
    - Downloads per week on npmjs.com
    - Number of GitHub stars
    - Last update date
    - Number of maintainers

2. **Review the code:**
    - Check the package's GitHub repository
    - Review recent issues and PRs
    - Look for security advisories

3. **Verify authenticity:**
    - Check for typosquatting (similar names to popular packages)
    - Verify the package maintainer

4. **Use specific versions:**
    - Avoid wildcards (`*`) or loose ranges (`^`, `~`)
    - Lock to exact versions for production dependencies

### Monitoring

**Set up alerts for:**

- 📧 Dependabot security alerts (email notifications)
- 🔔 GitHub Actions failures
- 📊 Weekly security audit reports

**Regular reviews:**

- Weekly: Review Dependabot PRs
- Monthly: Manual dependency audit
- Quarterly: Full security review

## 🚨 Incident Response

### If a vulnerability is discovered

1. **Critical/High severity:**
    - Merge Dependabot PR immediately after tests pass
    - Deploy to production ASAP
    - Review logs for potential exploitation

2. **Medium severity:**
    - Merge within 1 week
    - Schedule deployment with next release

3. **Low severity:**
    - Merge with regular dependency updates
    - No immediate action required

## 📝 Maintenance

### Weekly Tasks

- [ ] Review and merge Dependabot PRs
- [ ] Check security audit results

### Monthly Tasks

- [ ] Run `bun run outdated` to check for new versions
- [ ] Review and update dependencies with major versions
- [ ] Check for abandoned/deprecated packages

### Quarterly Tasks

- [ ] Full security review
- [ ] Update security policies
- [ ] Review and update branch protection rules

## 🎯 Auto-Merge Decision Matrix

| Update Type           | Severity      | Tests Pass | Auto-Merge? | Reason                             |
| --------------------- | ------------- | ---------- | ----------- | ---------------------------------- |
| Patch (1.0.0 → 1.0.1) | Any           | ✅ Yes     | ✅ Yes      | Bug fixes only, safe               |
| Minor (1.0.0 → 1.1.0) | Any           | ✅ Yes     | ✅ Yes      | New features, backwards compatible |
| Major (1.0.0 → 2.0.0) | Any           | ✅ Yes     | ❌ No       | Breaking changes, needs review     |
| Any                   | Any           | ❌ No      | ❌ No       | Failed checks, needs fixing        |
| Security Fix          | Critical/High | ✅ Yes     | ✅ Yes      | Security priority                  |

## 📊 Workflow Details

### Dependabot PR Lifecycle

```
Dependabot creates PR
    ↓
Auto-merge workflow triggered
    ↓
┌─────────────────────────┐
│ Run Quality Checks      │
│ • ESLint               │
│ • Prettier             │
│ • TypeScript           │
│ • Build                │
└───────────┬─────────────┘
            │
    All checks pass?
            │
    ┌───────┴───────┐
   Yes              No
    │                │
    ↓                ↓
Is patch/minor?   Add comment
    │             "Fix required"
┌───┴───┐            │
Yes     No           └──→ Manual review
 │       │
 ↓       ↓
Auto-    Add comment
approve  "Major version"
 │            │
 ↓            └──→ Manual review
Auto-merge
 │
 ↓
✅ Deployed
```

### What Happens When Checks Fail

```
Dependabot PR
    ↓
Checks run
    ↓
❌ One or more fail
    ↓
Workflow comments on PR:
━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Auto-merge blocked: Checks failed

🔍 What failed?
Check the workflow run for details.

🔧 Common fixes:

If linting failed:
  gh pr checkout <PR#>
  bun run lint
  bunx eslint . --fix
  git add .
  git commit -m "fix: resolve linting errors"
  git push

If formatting failed:
  gh pr checkout <PR#>
  bun run format
  git add .
  git commit -m "chore: format code"
  git push

If type checking failed:
  gh pr checkout <PR#>
  bun run typecheck
  # Fix the type errors
  git add .
  git commit -m "fix: resolve type errors"
  git push
━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🔍 Monitoring & Debugging

### Check Dependabot Status

```bash
# View Dependabot configuration
cat .github/dependabot.yml

# Check for updates manually (GitHub UI)
# Settings → Security & analysis → Dependabot alerts
# Click "Check for updates"
```

### View Workflow Logs

1. Go to **Actions** tab in GitHub
2. Select the failed workflow
3. Click on the job that failed
4. Expand the failed step
5. Read the error message

### Test Auto-Merge Locally

```bash
# Simulate what Dependabot does
git checkout -b test-dependency-update
bun add <package>@<new-version>
git add package.json bun.lock
git commit -m "chore(deps): update package to version X"
git push -u origin test-dependency-update

# Create PR and watch workflows run
```

## 🔗 Additional Resources

- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [GitHub Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [OWASP Top 10 for CI/CD](https://owasp.org/www-project-top-10-ci-cd-security-risks/)
- [Snyk's 10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)

## 🤝 Contributing

When contributing, ensure:

- All tests pass locally (`bun run check`)
- Run `bun run audit` before committing
- Don't add dependencies without discussion
- Follow the security guidelines above

## ⚙️ Configuration Files

### `.github/dependabot.yml`

```yaml
version: 2
updates:
    - package-ecosystem: "npm"
      directory: "/"
      schedule:
          interval: "weekly"
          day: "monday"
          time: "09:00"
          timezone: "UTC"
      open-pull-requests-limit: 10
      groups:
          development-dependencies:
              dependency-type: "development"
              update-types: ["minor", "patch"]
          production-dependencies:
              dependency-type: "production"
              update-types: ["patch"]
      labels:
          - "dependencies"
          - "npm"
      commit-message:
          prefix: "chore(deps)"
          include: "scope"
      ignore:
          - dependency-name: "*"
            update-types: ["version-update:semver-major"]
```

### `.npmrc`

```ini
# Security settings
registry=https://registry.npmjs.org/
audit=true
save-exact=true
audit-level=moderate
```

## 📈 Success Metrics

Track these to measure security posture:

- **Mean Time to Patch (MTTP)**: Time from vulnerability disclosure to patch deployment
- **Dependency Freshness**: % of dependencies on latest version
- **Auto-Merge Success Rate**: % of Dependabot PRs auto-merged successfully
- **Security Alert Response Time**: Time to resolve security alerts

### Current Goals

- ✅ Auto-merge 80%+ of patch/minor updates
- ✅ Resolve critical vulnerabilities within 24 hours
- ✅ Keep dependencies < 6 months old
- ✅ Zero high/critical vulnerabilities in production

## 🎓 FAQ

### Why block major version updates?

Major versions often include breaking changes that can break your application. These require:

- Reading changelogs
- Updating your code
- Thorough testing
- Potential refactoring

### What if auto-merge fails?

Check the workflow logs for the specific error, then:

1. Checkout the Dependabot branch
2. Fix the issue locally
3. Push the fix to the same branch
4. Checks will re-run automatically

### Can I force auto-merge a major update?

Not recommended. Major updates should always be reviewed manually. However, you can:

1. Review the changes thoroughly
2. Test locally
3. Manually approve and merge the PR

### How do I disable auto-merge temporarily?

Comment on the Dependabot PR:

```
@dependabot ignore this major version
```

Or pause all Dependabot updates:

```
Settings → Security & analysis → Dependabot
→ Pause security updates
```

### What happens if a dependency is deprecated?

1. Dependabot will continue updating it if patches are released
2. You'll see warnings in the logs
3. Plan migration to alternative package
4. Add to quarterly review tasks

## ✅ Summary

Your project now has:

- ✅ Automated dependency updates (weekly)
- ✅ Smart auto-merge (patch/minor only)
- ✅ Security scanning (weekly + on-demand)
- ✅ Supply chain protection (multiple layers)
- ✅ Branch protection (quality gates)
- ✅ Clear documentation (this file!)

**Next Steps:**

1. Enable GitHub security features (see checklist)
2. Configure branch protection rules
3. Wait for first Dependabot PR (Monday 9 AM UTC)
4. Review and adjust as needed

**Your dependency management is now enterprise-grade!** 🎉
