# GitHub Repository Settings Guide

This guide walks you through the exact settings needed to enable branch protection and Dependabot auto-merge.

## 📋 Table of Contents

1. [Security & Analysis Settings](#security--analysis-settings)
2. [Branch Protection Rules](#branch-protection-rules)
3. [Actions Permissions](#actions-permissions)
4. [Dependabot Settings](#dependabot-settings)
5. [Test Suite](#test-suite)
6. [Verification Steps](#verification-steps)

---

## 🔒 Security & Analysis Settings

**Path:** Settings → Security & analysis

### Enable All Security Features

1. **Dependency graph**
    - ✅ Enable
    - Allows GitHub to understand your dependencies
    - **Required for Dependabot to work**

2. **Dependabot alerts**
    - ✅ Enable
    - Get notified of vulnerable dependencies
    - Automatic security updates

3. **Dependabot security updates**
    - ✅ Enable
    - Automatically creates PRs to fix vulnerabilities
    - Works with your auto-merge workflow

4. **Secret scanning**
    - ✅ Enable (if available)
    - Prevents committing secrets/tokens
    - Alerts you if secrets are found

5. **Code scanning** (GitHub Advanced Security - may require upgrade)
    - ✅ Enable (if available)
    - Additional static analysis
    - Optional but recommended

### Screenshot locations

```
Repository → Settings (top right)
→ Scroll down to "Security & analysis" section
→ Enable all available options
```

---

## 🛡️ Branch Protection Rules

**Path:** Settings → Branches → Add rule

### Rule Configuration for `main` branch

#### Step 1: Create Branch Protection Rule

```
Settings → Branches → Add rule (or Add branch protection rule)
```

#### Step 2: Branch Name Pattern

```
Branch name pattern: main
```

#### Step 3: Protection Settings

**✅ Require a pull request before merging**

- Check this box
- **Required pull request reviews:** 0 or 1
    - Set to 0 if you're solo developer (allows Dependabot auto-merge)
    - Set to 1 if you want human review
- ⚠️ **Important:** Uncheck "Dismiss stale pull request approvals when new commits are pushed"
    - This allows Dependabot to push fixes without re-approval

**✅ Require status checks to pass before merging**

- Check this box
- ✅ **Require branches to be up to date before merging**
- **Status checks that are required:**
  Click "Search for status checks" and add:

    ```
    quality-checks         # From nuxthub.yml (blocks deployment)
    test                   # From ci.yml (unit tests - 51 tests)
    lint-and-format       # From ci.yml
    build                 # From ci.yml
    audit                 # From security-audit.yml (optional)
    ```

    **Note:** These names appear after running workflows once. If not visible yet:
    1. Push any change to trigger workflows
    2. Return here after workflows complete
    3. Add the status checks

**✅ Require conversation resolution before merging** (Optional)

- Check if you want all PR comments resolved

**❌ Require signed commits** (Optional but recommended)

- Check if you want GPG signed commits
- Requires setup on developer machines
- Not required for Dependabot

**❌ Require linear history** (Optional)

- Check if you want to prevent merge commits
- Recommended for cleaner history

**✅ Require deployments to succeed before merging** (Optional)

- Uncheck for now (unless you have deployment environments set up)

**⚠️ Do not require status checks on creation** (Important!)

- Uncheck this box
- Allows Dependabot to create PRs even if checks haven't run yet

**✅ Require approval of the most recent reviewable push** (Optional)

- Check if using code reviews

**✅ Lock branch** (Optional)

- Uncheck (only check if you want main to be read-only)

**✅ Do not allow bypassing the above settings**

- Check this box
- ⚠️ **Critical:** Uncheck "Allow specified actors to bypass required pull requests"
    - Or add Dependabot to bypass list if needed

**✅ Restrict who can push to matching branches** (Optional)

- Leave unchecked for solo dev
- Check and add specific users/teams for team projects

**✅ Allow force pushes**

- ❌ Uncheck (protects against accidental force pushes)

**✅ Allow deletions**

- ❌ Uncheck (prevents accidental branch deletion)

#### Step 4: Save Changes

```
Click "Create" or "Save changes" at the bottom
```

### Minimal Configuration (Solo Developer)

```yaml
✅ Require pull request before merging
   - Required reviews: 0
   - Dismiss stale approvals: UNCHECKED

✅ Require status checks to pass
   - Require branches up to date: CHECKED
   - Required checks: quality-checks, lint-and-format, build

✅ Do not allow bypassing: CHECKED

❌ Allow force pushes: UNCHECKED
❌ Allow deletions: UNCHECKED
```

### Team Configuration

```yaml
✅ Require pull request before merging
   - Required reviews: 1 or more
   - Dismiss stale approvals: CHECKED

✅ Require status checks to pass
   - Require branches up to date: CHECKED
   - Required checks: test, quality-checks, lint-and-format, build, audit

✅ Require conversation resolution: CHECKED

✅ Do not allow bypassing: CHECKED
   - Include administrators: CHECKED

❌ Allow force pushes: UNCHECKED
❌ Allow deletions: UNCHECKED
```

---

## ⚙️ Actions Permissions

**Path:** Settings → Actions → General

### Required Settings for Auto-Merge

**✅ Actions permissions**

```
○ Allow all actions and reusable workflows
```

**✅ Workflow permissions**

```
⚙️ Read and write permissions  ← CRITICAL FOR AUTO-MERGE!
```

This allows workflows to:

- Approve PRs
- Merge PRs
- Comment on PRs
- Update status

**✅ Allow GitHub Actions to create and approve pull requests**

```
☑️ Check this box  ← REQUIRED FOR DEPENDABOT AUTO-MERGE!
```

Without this, Dependabot auto-merge workflow cannot approve/merge PRs.

### Screenshot locations

```
Repository → Settings
→ Actions → General (left sidebar)
→ Scroll to "Workflow permissions"
→ Select "Read and write permissions"
→ Check "Allow GitHub Actions to create and approve pull requests"
→ Save
```

---

## 🤖 Dependabot Settings

### Verify Dependabot Configuration

**Path:** Settings → Security & analysis → Dependabot

**✅ Dependabot alerts**

- Should show: "Enabled"
- If not, click "Enable"

**✅ Dependabot security updates**

- Should show: "Enabled"
- If not, click "Enable"

### Your Dependabot File

The file `.github/dependabot.yml` is already configured:

- Weekly scans every Monday 9 AM UTC
- Groups patch/minor updates
- Blocks major version updates (manual review required)
- Monitors npm packages and GitHub Actions

**No additional settings needed in GitHub UI!**

---

## 🧪 Test Suite

**Unit Testing with Vitest**

The project includes a comprehensive test suite that runs automatically in all CI/CD workflows:

- **51 unit tests** across 17 test files
- Tests components and pages
- Runs on every push, PR, and before deployment
- **Blocks merges and deployments if tests fail**

### Running Tests Locally

```bash
# Run all tests once
bun run test -- --run

# Run tests in watch mode (development)
bun run test

# Run specific test file
bun run test -- BackButton.test.ts

# Run tests with coverage (if configured)
bun run test -- --coverage
```

### What Gets Tested

- **Components**: All UI components (buttons, forms, navigation, etc.)
- **Pages**: All route pages and their rendering logic
- **Data Handling**: Mocked data scenarios
- **User Interactions**: Click events, form submissions, etc.

### Test Failures

If tests fail in CI/CD:

1. **PR/Push**: Merge blocked, build stopped
2. **Dependabot**: Auto-merge prevented, manual review required
3. **Deployment**: Production deployment blocked

Check the Actions tab for detailed error output and fix the failing tests before proceeding.

---

## 🧪 Verification Steps

### Step 1: Verify Security Features

```
Settings → Security & analysis
→ Confirm all are "Enabled":
   ✅ Dependency graph
   ✅ Dependabot alerts
   ✅ Dependabot security updates
   ✅ Secret scanning
```

### Step 2: Verify Actions Permissions

```
Settings → Actions → General
→ Workflow permissions
   ✅ "Read and write permissions" selected
   ✅ "Allow GitHub Actions to create and approve pull requests" checked
```

### Step 3: Push a Test Change

```bash
# Make a small change
echo "# Test" >> README.md
git add README.md
git commit -m "test: verify workflows"
git push
```

Then:

1. Go to "Actions" tab
2. Verify all workflows run:
    - ✅ Deploy to NuxtHub
    - ✅ Code Quality Checks
    - ✅ Security Audit (if triggered)

### Step 4: Check Status Checks

```
Settings → Branches → Edit rule for main
→ Scroll to "Require status checks to pass before merging"
→ Search for status checks
→ Verify you see:
   - test
   - quality-checks
   - lint-and-format
   - build
   - audit
```

If you don't see them:

- Wait for workflows to complete (Step 3)
- Refresh the page
- They should appear after first run

### Step 5: Add Status Checks to Branch Protection

```
Settings → Branches → Edit rule for main
→ "Require status checks to pass before merging"
→ Search and add each check:
   ☑️ test
   ☑️ quality-checks
   ☑️ lint-and-format
   ☑️ build
   ☑️ audit (optional)
→ Save changes
```

### Step 6: Test Branch Protection

```bash
# Create a test branch
git checkout -b test-branch-protection

# Make a change
echo "test" > test.txt
git add test.txt
git commit -m "test: branch protection"
git push -u origin test-branch-protection

# Create PR via GitHub UI
# Verify that:
# 1. Checks run automatically
# 2. Cannot merge until checks pass
# 3. "Merge" button is disabled until green
```

### Step 7: Wait for First Dependabot PR

```
# Dependabot runs weekly (Mondays 9 AM UTC)
# Or trigger manually:

Settings → Security & analysis
→ Dependabot alerts
→ Click "Check for updates"

# Wait for Dependabot PR to be created
# Verify auto-merge workflow runs
# Verify PR is auto-merged if patch/minor
```

---

## 📊 Expected Behavior After Setup

### When You Push Code

**❌ If code has errors:**

```
Push → Workflows run → Checks FAIL → ❌ Deployment BLOCKED
→ Clear error message in GitHub Actions
→ Fix locally → Push again
```

**✅ If code is clean:**

```
Push → Workflows run → Checks PASS → ✅ Deployment SUCCEEDS
→ Code goes live
```

### When Creating a PR

**❌ If checks fail:**

```
PR created → Checks run → ❌ Some checks fail
→ "Merge" button disabled
→ Warning: "Required status check(s) failing"
→ Fix issues → Push to PR branch → Checks re-run
```

**✅ If checks pass:**

```
PR created → Checks run → ✅ All checks pass
→ "Merge" button enabled (green)
→ Can merge when ready
```

### When Dependabot Creates PR

**✅ Patch/Minor update:**

```
Dependabot PR created
→ Auto-merge workflow runs
→ Lint ✅ → Format ✅ → Type ✅ → Build ✅
→ Auto-approved by workflow
→ Auto-merged by workflow
→ PR closed automatically
```

**❌ Major update or failing checks:**

```
Dependabot PR created
→ Auto-merge workflow runs
→ One check fails ❌
→ Workflow comments on PR with fix instructions
→ PR stays open (NOT auto-merged)
→ Requires manual review/fix
```

---

## 🎯 Quick Setup Checklist

Copy this checklist and mark items as you complete them:

### Security & Analysis

- [ ] Enable Dependency graph
- [ ] Enable Dependabot alerts
- [ ] Enable Dependabot security updates
- [ ] Enable Secret scanning

### Actions Permissions

- [ ] Set "Read and write permissions"
- [ ] Check "Allow GitHub Actions to create and approve pull requests"
- [ ] Save changes

### Branch Protection (main)

- [ ] Add branch protection rule for "main"
- [ ] Require pull request before merging (0 or 1 reviews)
- [ ] Require status checks to pass
- [ ] Add status checks: quality-checks, lint-and-format, build
- [ ] Require branches to be up to date
- [ ] Do not allow bypassing settings
- [ ] Disable force pushes
- [ ] Disable deletions
- [ ] Save changes

### Verification

- [ ] Push a test change
- [ ] Verify workflows run successfully
- [ ] Verify status checks appear in branch protection
- [ ] Test creating a PR
- [ ] Verify checks block merge until passing
- [ ] Wait for first Dependabot PR (or trigger manually)

---

## 🆘 Troubleshooting

### Auto-merge not working?

**Check:**

1. Actions permissions → "Read and write" selected?
2. "Allow GitHub Actions to create and approve pull requests" checked?
3. Branch protection → "Required reviews" set to 0?
4. Dependabot PR is patch/minor (not major)?

### Status checks not appearing?

**Solution:**

1. Push any change to trigger workflows
2. Wait for workflows to complete
3. Refresh branch protection settings page
4. Status checks appear after first workflow run

### "Merge" button disabled?

**This is correct behavior!**

- Wait for checks to pass (green checkmarks)
- Button enables automatically when all required checks pass
- If checks fail, fix the issues and push again

### Dependabot PR auto-merged but shouldn't be?

**Check workflow:**

- Review `dependabot-auto-merge.yml`
- Should only auto-merge patch/minor updates
- Major updates should NOT auto-merge
- Check workflow run logs for details

### Can't push to main?

**This is correct behavior!**

- Branch protection prevents direct pushes
- Create a branch, make changes, create PR
- Or temporarily disable branch protection (not recommended)

---

## 📚 Additional Resources

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [GitHub Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [Status Checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)

---

## ✅ Summary

**Critical Settings for Auto-Merge:**

1. ✅ Actions → Read and write permissions
2. ✅ Actions → Allow create and approve PRs
3. ✅ Branch protection → 0 required reviews (for auto-merge)
4. ✅ Branch protection → Required status checks
5. ✅ Security → Dependabot enabled

**Critical Settings for Branch Protection:**

1. ✅ Require status checks: quality-checks, lint-and-format, build
2. ✅ Require branches up to date
3. ✅ Do not allow bypassing
4. ❌ No force pushes
5. ❌ No deletions

After completing these settings, your repository will:

- ✅ Block deployments if code quality checks fail
- ✅ Block PRs from merging if checks fail
- ✅ Auto-merge safe Dependabot updates
- ✅ Require manual review for breaking changes
- ✅ Protect production from bad code

**Your repository is now production-ready with enterprise-level protection!** 🎉
