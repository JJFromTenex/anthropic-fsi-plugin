# Tech Runner — Repo Setup (do this T–1 day)

## 1. Initialize the workshop origin

```bash
cd meridian-catalyst-repo
git init
git add CLAUDE.md README.md data/ docs/ templates/ .claude/
git commit -m "Starter state"
git branch -M main
git remote add origin <your-workshop-git-host>/meridian-catalyst.git
git push -u origin main
```

> Do NOT commit anything under `curveballs/` to `main` yet.

## 2. Stage Curveball 1 branch

```bash
git checkout -b curveball-1
cp curveballs/_staged/developer_census_v2.csv data/developer_census.csv
git add curveballs/SR-26-11_regulatory_bulletin.md data/developer_census.csv
git commit -m "C1: SR 26-11 regulatory bulletin + critical_function census"
git push -u origin curveball-1
git checkout main
```

## 3. Stage Curveball 2 branch (branched from curveball-1)

```bash
git checkout -b curveball-2 curveball-1
cp curveballs/_staged/adjacent_roles.csv data/adjacent_roles.csv
cp curveballs/_staged/budget_FY_v2.csv data/budget_FY.csv
git add curveballs/cfo_memo_budget_revision.md data/adjacent_roles.csv data/budget_FY.csv
git commit -m "C2: CFO budget revision + adjacent roles"
git push -u origin curveball-2
git checkout main
```

## 4. Team laptops

```bash
git clone <origin>/meridian-catalyst.git ~/meridian-catalyst
cd ~/meridian-catalyst
claude   # verify auth + CLAUDE.md loads
```

## 5. During the workshop

| Cue | Command (on YOUR machine) | Teams run |
|---|---|---|
| 0:30 | `git checkout main && git merge curveball-1 --no-edit && git push` | `git pull` |
| 1:00 | `git merge curveball-2 --no-edit && git push` | `git pull` |

## 6. Low-tech fallback

Put `curveballs/` + `curveballs/_staged/` on a USB per table. On cue, teams copy files into place manually per the paths above. Keep printed copies of both memos.

## 7. After the workshop

Collect each team's `rollout_plan_FINAL.md` (they can `git push` to a team branch, or copy to USB).
