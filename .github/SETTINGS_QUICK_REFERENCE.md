# GitHub Settings Quick Reference

## 🚀 Critical Settings for Auto-Merge to Work

### 1️⃣ Actions Permissions (REQUIRED!)

```
Settings → Actions → General → Workflow permissions
```

- ✅ **Read and write permissions** (not Read-only!)
- ✅ **Allow GitHub Actions to create and approve pull requests**
- Click **Save**

**Why:** Without this, workflows cannot approve or merge Dependabot PRs.

---

### 2️⃣ Security Features (REQUIRED!)

```
Settings → Security & analysis
```

Enable all:

- ✅ **Dependency graph**
- ✅ **Dependabot alerts**
- ✅ **Dependabot security updates**
- ✅ **Secret scanning** (if available)

**Why:** Dependabot needs these to create PRs.

---

### 3️⃣ Branch Protection (REQUIRED!)

```
Settings → Branches → Add rule
```

**Branch name pattern:** `main`

**Settings:**

```
✅ Require a pull request before merging
   └─ Required reviews: 0 (for auto-merge) or 1+ (for manual review)

✅ Require status checks to pass before merging
   └─ ✅ Require branches to be up to date
   └─ Add these checks:
      • test (unit tests)
      • quality-checks
      • lint-and-format
      • build
      • audit (optional)

✅ Do not allow bypassing the above settings

❌ Allow force pushes: OFF
❌ Allow deletions: OFF
```

**Why:** Blocks bad code from being merged/deployed.

---

## 📋 Step-by-Step Setup

### Step 1: Enable Actions Permissions

1. Go to **Settings** tab
2. Click **Actions** → **General** (left sidebar)
3. Scroll to **Workflow permissions**
4. Select: **Read and write permissions** ⚠️ CRITICAL
5. Check: **Allow GitHub Actions to create and approve pull requests** ⚠️ CRITICAL
6. Click **Save**

### Step 2: Enable Security Features

1. Go to **Settings** tab
2. Scroll to **Security & analysis** section
3. Click **Enable** for each:
    - Dependency graph
    - Dependabot alerts
    - Dependabot security updates
    - Secret scanning

### Step 3: Push Test Change (to generate status checks)

```bash
git commit --allow-empty -m "test: trigger workflows"
git push
```

Wait for workflows to complete in **Actions** tab.

### Step 4: Add Branch Protection

1. Go to **Settings** tab
2. Click **Branches** (left sidebar)
3. Click **Add rule** (or **Add branch protection rule**)
4. **Branch name pattern:** `main`
5. Check: **Require a pull request before merging**
    - Set reviews to 0 (solo) or 1+ (team)
6. Check: **Require status checks to pass before merging**
    - Check: **Require branches to be up to date**
    - Click **Search for status checks**
    - Add: `test`, `quality-checks`, `lint-and-format`, `build`
7. Check: **Do not allow bypassing the above settings**
8. Uncheck: **Allow force pushes**
9. Uncheck: **Allow deletions**
10. Click **Create** (or **Save changes**)

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Push code → Workflows run automatically
- [ ] Actions tab shows: test, quality-checks, lint-and-format, build
- [ ] Try creating PR → Checks run → "Merge" button disabled until green
- [ ] Settings → Actions → "Read and write" selected
- [ ] Settings → Actions → "Allow create and approve" checked
- [ ] Settings → Branches → Rule exists for "main"
- [ ] Settings → Branches → Required checks listed
- [ ] Run `bun run test` locally → All 51 tests pass

---

## 🎯 What Auto-Merge Means

### ✅ Auto-Merged (Safe Updates)

- Patch: `1.0.0` → `1.0.1` ✅
- Minor: `1.0.0` → `1.1.0` ✅
- Security fixes ✅
- If ALL checks pass ✅

### ❌ NOT Auto-Merged (Requires Review)

- Major: `1.0.0` → `2.0.0` ❌ (breaking changes)
- If ANY check fails ❌
- Workflow comments on PR with instructions

---

## 🔧 Common Issues & Fixes

### "Auto-merge not working"

**Fix:**

1. Check: Settings → Actions → "Read and write permissions"
2. Check: "Allow GitHub Actions to create and approve pull requests"
3. Check: Branch protection → Required reviews = 0
4. Verify: Dependabot PR is patch/minor (not major)

### "Status checks not appearing"

**Fix:**

1. Push any change to trigger workflows
2. Wait for workflows to complete
3. Refresh Settings → Branches page
4. Status checks appear after first run

### "Can't merge PR"

**This is correct!**

- Wait for checks to pass (green checkmarks)
- "Merge" button enables when checks pass
- If checks fail → fix code → push → checks re-run

### "Can't push directly to main"

**This is correct!**

- Branch protection blocks direct pushes
- Create branch → make changes → create PR
- Or temporarily disable protection (not recommended)

---

## 🎓 Different Setups

### Solo Developer (Auto-Merge Enabled)

```yaml
Required reviews: 0
Auto-merge: Works for patch/minor updates
Manual review: Only for major updates or failures
```

### Small Team (Hybrid)

```yaml
Required reviews: 1
Auto-merge: Works if 1 team member approves
Manual review: Always required, but auto-merge helps
```

### Enterprise (Strict)

```yaml
Required reviews: 2+
Auto-merge: Disabled (requires human review)
Manual review: Always required for everything
```

**Recommendation:** Start with solo setup, adjust as team grows.

---

## 📊 Expected Behavior

### When You Push

```
✅ Clean code → Lint → Tests → Build → Checks pass → Deploys automatically
❌ Bad code → Checks fail → Deployment blocked → Fix → Push again
```

### When Creating PR

```
✅ Checks pass → "Merge" button enabled (green)
❌ Checks fail → "Merge" button disabled → Fix → Re-run checks
```

### When Dependabot Creates PR

```
✅ Patch/Minor + All checks pass (lint, tests, build) → Auto-merged → Deployed
❌ Major version → Comment added → NOT merged → Manual review required
❌ Any check fails (tests, lint, types) → NOT merged → Fix required
```

---

## 🆘 Need Help?

See full guide: `.github/GITHUB_SETTINGS.md`

Quick test:

```bash
# Create test PR to verify settings
git checkout -b test-settings
echo "# Test" >> README.md
git add README.md
git commit -m "test: verify settings"
git push -u origin test-settings

# Go to GitHub → Create PR
# Verify:
# 1. Checks run automatically
# 2. "Merge" button disabled until checks pass
# 3. Status checks are required
```

---

## 📞 Support

- [GitHub Docs - Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub Docs - Dependabot](https://docs.github.com/en/code-security/dependabot)
- [GitHub Docs - Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)

---
