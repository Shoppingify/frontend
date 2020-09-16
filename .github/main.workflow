workflow "Build and Test" {
  on = "pull_request"
  resolves = ["Run integration tests"]
}

action "Install dependencies" {
  uses = "borales/actions-yarn@v2.0.0"
  runs = "yarn install"
}

action "Build app" {
  uses = "borales/actions-yarn@v2.0.0"
  needs = "Install dependencies"
  runs = "yarn build-prod"
}

action "Run integration tests" {
  uses = "borales/actions-yarn@v2.0.0"
  needs = "Build app"
  runs = "yarn test"
}