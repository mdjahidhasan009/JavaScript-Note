This note is based on the workshop from stack learners - [Efficient Monorepos for Enterprise Projects](https://www.stacklearner.com/my/workshops/efficient-monorepos-for-enterprise-projects)

# Efficient Monorepos for Enterprise Projects

We can have many application like
- Authentication app for all the applications
- Multiple microservices for different functionalities and each one is a separate repository
  - User service
  - Admin service
  - Product service
  - Vendor service
  - Document service
  - Support service
  - Marketing service
  - Or classic backend/frontend separation

## Single Monolithic Codebase
A single large monolithic codebase (repository) containing all source codes inside a single application.

In single repository, we can have multiple applications and libraries. For example, we can have a single repository for
all the applications and libraries. We can run this application with single command.

```shell
                                                   Org 1
                                                   
                                                    
                                         /     /    |    \        \
                                        /     /     |     \        \
                                       /     /      |      \        \
                                      /     /       |       \        \        
                                  App 1  Lib 1   App 2    Lib 3     Lib 2
                                   / \            |                  |   
```

## Multiple Repositories / Micro Repositories
Maintaining all applications and packages in a separate repository.

```shell

                    App 4 Repo                        App 2 Repo
                                \                   /
                                 \                 /
                                  ↘              ↙ 
                                    Library Repo
                                 ↗     ↑          ↖
                               /       |           \
                   App 1 Repo          |           App 3 Repo
                                       |
                                       |
                                    App 2 Repo
```

# The Everyday Struggles of Development Teams

Imagine you're on a team managing a large, rapidly growing application. The project started small—just a few 
repositories and a handful of developers—but now it's evolved into a sprawling system with dozens of services, 
libraries, and applications. On the surface, everything seems fine, but day-to-day development tells a different story.




## Scenario 1: The Domino Effect of Breaking Changes
* Team A updates a core API in their service to improve performance.
  * Like before, `/users` api was returning all the users in an array. Now, it returns a paginated response. Data inside
    `data` key and metadata inside `meta` key.
* Team B, relying on the old API, finds their service crashing in production because no one coordinated the update.
* The fix? Multiple emergency patches across repos, late-night calls, and a blown deadline.

### What’s Really Happening?
Without a unified codebase, interdependencies become fragile, and changes in one area can ripple unpredictably across 
others.




## Scenario 2: Diverging Standards and Configurations
* The frontend team uses Prettier and ESLint, while the backend team prefers a completely different set of linting rules.
* Code reviews become heated debates over style differences, slowing down approvals and causing unnecessary friction. 
  * Like frontend team does not allow `any` type in TypeScript, but backend team uses it.
* When someone switches teams, they waste days relearning the "rules of the repo."

### What’s Really Happening?
Without centralized configuration, teams develop conflicting standards, leading to inefficiency and friction.




## Scenario 3: Cross-Repo Dependency Loops
* A new feature requires updates in a shared library and two services.
* Team X can’t start testing until Team Y releases their changes, but Team Y is waiting on updates from Team X’s
  service.

### What’s Really Happening?
Multi-repos often create complex dependency loops that make even small changes hard to coordinate.




## Scenario 4: CI/CD Systems That Can’t Keep Up
* Your CI pipeline frequently fails for reasons unrelated to your changes:
  * Outdated package in Service B.
  * Failed API test in Service C.
* Developers spend more time debugging pipelines than building features, and no one feels confident pushing to 
  production.

### What’s Really Happening?
Siloed CI/CD setups for each repo result in brittle pipelines that create bottlenecks for the entire team.




## Scenario 5: Environment Drift and Configuration Hell
* A new developer joins the team and needs to work on a feature spanning five repos.
* After spending a week just cloning repos, setting up environments, and understanding how the pieces fit together, 
  they’re still unsure where to start coding.

### What’s Really Happening?
Fragmented repositories and scattered documentation create a steep learning curve for new team members, wasting valuable
time.




## Scenario 6: Missed Opportunities for Code Reuse
* Team A needs a utility function to parse dates in a specific format.
* Instead of reusing an existing function buried in another repo, they write a new one.
* Three months later, bugs appear in multiple places, each requiring a separate fix.

### What’s Really Happening?
Lack of visibility into shared resources leads to duplicate work, inconsistent behavior, and higher maintenance costs.




## Scenario 7: The Deployment Maze
* A critical bug is identified during a deployment.
* Teams need to roll back changes across multiple services, but the rollbacks must happen in a specific order due to 
  interdependencies.
* By the time everything is resolved, production has been down for hours, and the team is exhausted.

### What’s Really Happening?
Coordinating deployments across multiple repos is error-prone, time-consuming, and risky without centralized control.




## Scenario 8: Scaling Challenges for Growing Teams
* As the project scales, new teams are added to handle different features.
* With no shared repository, these teams unknowingly reinvent the wheel or create solutions incompatible with the rest 
  of the system.
* The organization begins to fragment into silos, each working on their “own” projects.

### What’s Really Happening?
Without a shared framework for collaboration, scaling teams leads to misalignment and inefficiencies.




## Scenario 9: Context-Switching Fatigue
* A developer needs to work on a feature spanning three repos.
* They spend hours switching between different repositories, setting up environments, and trying to keep mental track of
  how everything fits together.
* By the end of the day, they’ve barely written any meaningful code.

### What’s Really Happening?
Disjointed repos and workflows create unnecessary cognitive overhead, reducing developer productivity




## Scenario 10: Fragmented Communication
* One team creates a workaround for a known issue in a shared library but doesn’t notify others.
* Another team stumbles upon the same issue weeks later, wasting time rediscovering the problem and creating their own 
  workaround.

### What’s Really Happening?
Without a central codebase, teams struggle to share knowledge effectively, leading to duplicated effort and siloed 
information.




## Challenges of Large Single Monolithic Applications
### Slow Build and Test Times
As the codebase grows, build and test processes take significantly longer, impacting developer productivity.
### Code Coupling and Lack of Modularity
Tightly coupled code makes it harder to isolate changes or refactor without unintended side effects.
### Scaling Challenges
The entire application must be scaled together, even if only one part of it requires additional resources.
### Deployment Complexities
A single monolithic deployment means any failure or bug affects the entire application, increasing downtime risks.
### Code Ownership Issues
Multiple teams working in the same repository can lead to conflicts over shared components and unclear ownership.
### Technical Debt Accumulation
It’s difficult to maintain a clean architecture as the application grows, leading to more technical debt over time.
### Lack of Flexibility in Technology Choices
Adopting new technologies for specific modules is challenging without affecting the entire system.
### Onboarding New Developers
A massive codebase with no clear separation of concerns makes onboarding new developers time-consuming and overwhelming.
### Version Control Bottlenecks
Frequent merge conflicts and dependency on large commits slow down the development process.
### Increased Testing Complexity
Small changes require extensive regression testing across the entire application, leading to inefficiencies.


## Challenges of Multi-Repository Approach
### Dependency Management
Managing shared dependencies across multiple repositories becomes complex and error-prone.
### Code Duplication
Lack of visibility across repos often leads to redundant code and duplicated logic.
### Coordination Overhead
Cross-team collaboration requires frequent communication to sync changes, increasing overhead and delays.
### Inconsistent Standards
Different teams may adopt varying coding styles, build tools, and testing strategies, leading to fragmented workflows.
### Integration Challenges
Ensuring smooth integration between services across repositories is challenging, often requiring extra effort and tools.
### Deployment Orchestration
Coordinating deployments across multiple repositories is error-prone and difficult, especially with interdependent 
services.
### Testing Across Repos
Testing end-to-end functionality spanning multiple repositories requires setting up complex test environments.
### Onboarding Complexity
New developers need to familiarize themselves with multiple repositories, environments, and workflows, slowing their
productivity.
### Version Mismatches
Teams using different versions of shared libraries face runtime issues, requiring frequent updates and compatibility
checks.
### Tooling Fragmentation
Different repositories may use varying tools for CI/CD, linting, and testing, leading to inefficiencies in setup and 
maintenance.
### Limited Visibility into Changes
Changes in one repository that impact others may go unnoticed, causing runtime failures or integration issues.
### Longer Debugging Cycles
Tracking bugs across multiple repositories requires significant time and effort, as the root cause might span multiple 
codebases.




# Monorepo
A Monorepo is a single repository used to manage the source code for multiple projects, applications, or modules.

It allows teams to work on interrelated projects within one unified codebase, promoting collaboration and streamlined 
workflows.

## Monorepo Vs Monolithic Application
### Monorepo
A Monorepo, in contrast, can house multiple independent applications, services, or libraries. These components can be
modular, individually deployable, and follow different release cycles.

### Monolithic Application
A Monolithic Application is a single-tier, tightly integrated software solution where all components are combined into 
one deployable unit.

**Think of the monorepo as an organizational strategy, not a runtime architecture.**

**Companies like Google, Meta, Uber, Vercel, Airbnb, Microsoft etc., use monorepos to manage their vast codebases.**


## Monorepos are Important?
Monorepos have gained immense popularity in modern software development because they provide solutions to many 
challenges faced by teams working in large-scale applications or distributed environments.

### Unified Dependency Management
* Dependencies are managed centrally, ensuring all projects use consistent versions of libraries and tools.
* Updates to shared dependencies are immediate and ripple across all parts of the repository, reducing time spent on
  dependency syncing.
* Example: Updating a shared utility library used by multiple applications in a monorepo is seamless and ensures 
  compatibility.

### Seamless Code Sharing
* Code sharing is effortless as all projects reside in the same repository.
* Teams can import and use shared libraries or utilities without needing additional tooling or dependency management 
 systems.
* Example: A design system used across multiple applications can live in the monorepo, ensuring consistent UI and
  faster updates.

```shell
                                    Shared Packages

                       |-------------------------------------------|
                       |   Datetime       Authorization      UI    |
                       |-------------------------------------------|
                                ↓
                           -----------------------------------   
                           ↓            ↓                    ↓               
                     |-----------|  |------------|   |-----------| 
                     |    Docs      |    App     |   |   Admin   |
                     |-----------|  |------------|   |-----------|    
                                         Apps 
```

### Simplified Versioning
* Versioning becomes straightforward as all code is in one place.
* Some monorepos use unified versioning (a single version for the entire repository), making release management 
  predictable.
* Example: Tools like Turborepo and Nx support version control strategies tailored for monorepos.

### Easier Collaboration and CI/CD Pipelines
* **Collaboration**: Developers from different teams can work on related projects without the friction of cross-repo 
  PRs.
* **CI/CD Pipelines**: Unified pipelines can be set up to test and deploy only the affected parts of the repository, 
  saving build times and resources.

Example: A change in a library triggers builds only for projects that depend on it, rather than rebuilding everything.

### Remote Caching for Faster Builds
* With tools like **Turborepo**, remote caching ensures that builds and tests are reused if no changes have been made.
* This drastically reduces build times, especially in CI pipelines, boosting overall productivity.

Example: A team working on a frontend app doesn’t need to rebuild the backend if only UI components were updated.

### Code Consistency and Quality Control
* Enforce consistent linting, formatting, and testing standards across all projects with a single configuration.
* Ensure high code quality and adherence to organizational standards.

Example: A single ESLint configuration file applies to every project in the monorepo.


### Single Source of Truth
* All projects, libraries, and tools are in one place, ensuring there’s no ambiguity.
* Reduces risks of outdated or incorrect code being used across teams.


### Better Scalability for Growing Applications
* Scaling is simpler because new modules or projects can be added to the existing structure without additional 
  repository setup.

Example: Adding a new microservice in a monorepo is as simple as creating a new directory and updating the 
configuration.

### Simplified Onboarding for New Developers
* Developers only need to clone a single repository to access all projects.
* Consistent tooling and architecture make understanding and contributing to the codebase much easier.





## How to Design a Scalable Monorepo Architecture?
### Define Boundaries Between Modules
* Group related features into logical modules (e.g., frontend, backend, shared libraries).
* Apply the **Separation of Concerns** principle to minimize cross-module interference.
* Examples:
  * A "shared" module for utility functions, constants, or design tokens.
  * Feature-specific modules like `UserManagement`, `Analytics`, or `Payments`.

### Identify Shared vs. Independent Dependencies
* Shared Dependencies: Frameworks, UI libraries, or configuration files used across multiple modules.
* Independent Dependencies: Feature-specific packages that don’t need to be shared.
* Tools like `pnpm` or `yarn workspaces` help manage shared dependencies while maintaining isolation where needed.

### Optimize CI/CD Workflows
* Use affected-based builds to run builds/tests only for modules impacted by changes.
* Implement caching (e.g., remote caching with Turborepo) to avoid redundant builds.
* Separate integration pipelines (e.g., API testing) from **unit tests** to save time.



## Best Practices
### Avoid Circular Dependencies
* Use dependency analysis tools like `madge` to detect and fix cycles.
* Enforce architectural rules to ensure clean module separations.

### Clear Documentation for Team Onboarding
* Provide an overview of the monorepo structure and purpose of each module.
* Include setup instructions, workflows, and best practices for adding new features.
* Examples: A README file in each module detailing its purpose and dependencies.

### Modular and Scalable Folder Structure
* Use structure like
  * `/apps`
  * `/packages`
  * `/configs`
* Keep modules encapsulated to avoid accidental dependencies.

### Establish Linting and Formatting Standards
* Use a single linting tool (e.g., `eslint`) and formatter (e.g., `prettier`) for all modules.
* Add pre-commit hooks with tools like `Husky` to enforce standards before code is pushed.

### Enable Code Ownership and Permissions
* Assign owners to specific modules or folders using codeowners files (`.github/CODEOWNERS`).
* Set up permissions in CI/CD pipelines to restrict who can approve or deploy changes.

```shell

|----------------|     |-------------------------------------|
|                |     |                                     |
| Packages       |     | Datetime    Authorization      UI   |
|                |     |                                     |
|----------------|     |-------------------------------------|

|----------------|     |-------------------------------------|
|                |     |                                     |
| Configuration  |     | ESLint    TypeScript      Prettier  |
|                |     |                                     |
|----------------|     |-------------------------------------|

|----------------|     |-------------------------------------|
|                |     |                                     |
| Apps           |     | Web      API             Mobile     |
|                |     |                                     |
|----------------|     |-------------------------------------|
```

### Additional Notes 
* https://www.cal.com - Calendly uses monorepo to manage their codebase https://github.com/calcom/cal.com
* https://www.monorepo.tools - List of tools for monorepo management
* https://www.bazel.build - Bazel is a powerful build tool that supports monorepo workflows

# Resources
- [Efficient Monorepos for Enterprise Projects](https://www.stacklearner.com/my/workshops/efficient-monorepos-for-enterprise-projects)
