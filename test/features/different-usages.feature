Feature: Different Usages

Scenario: Simple one everything included
  Given a fixture app "different-usages"
  When I run "gulp --gulpfile=simple.js --tasks-simple"
  Then it outputs:
  ---
  fuji:build:public
  fuji:build:pages
  fuji:build:stylesheets
  fuji:build:javascripts
  fuji:build:images
  fuji:build:helpers
  fuji:build:partials
  fuji:build:layouts
  fuji:build
  fuji
  default

  ---

@smoke
Scenario: Use different prefix
  Given a fixture app "different-usages"
  When I run "gulp --gulpfile=with-prefix.js --tasks-simple"
  Then it outputs:
  ---
  bravo:build:public
  bravo:build:pages
  bravo:build:stylesheets
  bravo:build:javascripts
  bravo:build:images
  bravo:build:helpers
  bravo:build:partials
  bravo:build:layouts
  bravo:build
  bravo
  default

  ---

# Scenario: Use streams
#   Given a fixture app "different-usages"
#   When I run "gulp --gulpfile=just-streams.js"
#   Then the following file should exist:
#   ---
#   build/index.html
#   ---
#   And the contents of it should be:
#   ---
#   <html><body><h1>Hello World</h1></body></html>
#   ---
