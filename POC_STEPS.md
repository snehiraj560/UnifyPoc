# CI/CD Pipeline POC — Implementation Steps

React Native + Expo CNG project with custom dev client, EAS, fingerprint-based OTA vs Build logic, and APM automation integration.

---

## Phase 1: Project Setup

| # | Task | Notes |
|---|------|-------|
| 1 | Create new Expo project using CNG | React Native + Expo, SDK 52+ |
| 2 | Install and configure `expo-dev-client` | Custom dev client (not Expo Go) |
| 3 | Install and configure `expo-updates` | For OTA updates |
| 4 | Configure `runtimeVersion` with fingerprint policy | In `app.json` or `app.config.js`: `"runtimeVersion": { "policy": "fingerprint" }` |
| 5 | Configure EAS | Run `eas init`, set up `eas.json` with build profiles (e.g. `development`, `preview`), run a build manually to set up credentials |
| 6 | Add test suite | Jest for unit tests, or Detox/Maestro for E2E; run tests locally and ensure they pass |
| 7 | Create GitHub repo and push code | |
| 8 | Add `EXPO_TOKEN` (and other secrets) to GitHub repo secrets | Required for EAS CLI in workflows |

---

## Phase 2: Push Workflow (Fingerprint → OTA or Build)

| # | Task | Notes |
|---|------|-------|
| 9 | Create GitHub Actions workflow triggered on push | |
| 10 | Workflow steps: checkout → install deps → run tests → set up EAS → fingerprint check | If fingerprint matches existing build → OTA; if changed → dev build first, then update |
| 11 | Implement fingerprint logic | Use Expo's `continuous-deploy-fingerprint` action or custom logic with `@expo/fingerprint` / `eas project:info` |

---

## Phase 3: Dev Build + APM Workflow

| # | Task | Notes |
|---|------|-------|
| 12 | Create second workflow for dev builds | `workflow_dispatch` (manual) + optional schedule (e.g. nightly) |
| 13 | Workflow runs `eas build` with dev profile | Wait for build, get artifact |
| 14 | Integrate APM to run automation tests | After build completes: install app on device/emulator, run APM test suite |
| 15 | (Optional) Add notifications or result reporting | Slack, email, APM dashboard |

---

## Phase 4: Verification

| # | Task | Notes |
|---|------|-------|
| 16 | Test push workflow: JS-only change | Verify OTA is published |
| 17 | Test push workflow: native change | Add native module or change config, verify new dev build triggers |
| 18 | Test dev build workflow | Manual trigger, verify build + APM tests run |
| 19 | Document the setup | README, runbooks for team |

---

## Quick Reference: Fingerprint Logic

- **Fingerprint** = hash of native layer (dependencies, config, native code).
- **Same fingerprint** → native unchanged → safe to publish OTA.
- **Different fingerprint** → native changed → create new build first, then publish update.

---

## Prerequisites

- Expo SDK 52+
- EAS Account
- GitHub repository
- `EXPO_TOKEN` for EAS CLI
- APM tool identified and configured for automation tests
