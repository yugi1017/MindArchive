---
name: "tech-doc-generator"
description: "Generate high-quality technical learning documentation. Invoke when user wants to learn new technology, create technical notes, or write tutorial documentation."
---

# Technical Learning Documentation Generator

This skill helps you create comprehensive, well-structured technical learning documentation for any technology or framework.

## When to Invoke

- User wants to learn a new technology or framework
- User requests creation of technical notes or study materials
- User asks for tutorial or guide documentation
- User mentions "学习文档", "技术文档", "教程", "学习笔记"

---

## Knowledge Base Structure Design

### Core Principles

1. **Learning Path First**: Structure content around a clear learning progression
2. **Progressive Complexity**: From basics to advanced to practical application
3. **Auxiliary Tools Separation**: Quick reference materials belong in appendix, not main content
4. **Knowledge Validation**: Include thought-provoking questions after each section

### Recommended Structure

```
Knowledge Base/
├── Learning Guide (README.md)     # Entry point with learning roadmap
├── Beginner Section (入门篇)       # Foundation concepts
├── Intermediate Section (进阶篇)   # Core technology deep-dive
├── Advanced Section (实战篇)       # Real-world application
└── Appendix (附录)                # Quick reference tools
```

### Section Definitions

| Section | Purpose | Content Focus |
|---------|---------|---------------|
| **入门篇** | Build foundation | Core concepts, quick start, basic configuration |
| **进阶篇** | Deep understanding | Internal mechanisms, best practices, architecture |
| **实战篇** | Apply knowledge | Real projects, production scenarios, advanced patterns |
| **附录** | Quick reference | Cheatsheets, common issues, API references |

---

## Documentation Structure Framework

### 1. Overview Section (概述篇)

**Purpose**: Help readers quickly understand what the technology is and why it matters.

**Required Elements**:
- **Technology Introduction**: What is it? Core definition and positioning
- **Core Value**: Why learn it? Key benefits and advantages
- **Application Scenarios**: Where to use it? Real-world use cases
- **Learning Roadmap**: Suggested learning path and prerequisites

**Template**:
```markdown
# [Technology Name] Learning Guide

## Overview

### What is [Technology Name]?
[Brief definition and core purpose]

### Why Learn [Technology Name]?
- Benefit 1: [Description]
- Benefit 2: [Description]
- Benefit 3: [Description]

### Application Scenarios
- Scenario 1: [Description]
- Scenario 2: [Description]

### Prerequisites
- [Required knowledge/skills]
```

### 2. Fundamentals Section (基础篇)

**Purpose**: Enable readers to get started quickly with solid foundations.

**Required Elements**:
- **Environment Setup**: Installation, configuration, verification
- **Core Concepts**: Key terminology and mental models
- **Quick Start**: Minimal working example
- **Basic Operations**: Common tasks and commands

**Template**:
```markdown
## Fundamentals

### Environment Setup

#### Installation
[Step-by-step installation instructions]

#### Configuration
[Essential configuration steps]

#### Verification
[How to verify successful installation]

### Core Concepts

#### Concept 1: [Name]
[Explanation with diagram if applicable]

#### Concept 2: [Name]
[Explanation with diagram if applicable]

### Quick Start

[Minimal working example with code]

### Basic Operations

#### Operation 1: [Name]
[Description and code example]

#### Operation 2: [Name]
[Description and code example]
```

### 3. Advanced Section (进阶篇)

**Purpose**: Deep dive into advanced topics and best practices.

**Required Elements**:
- **Core Principles**: Internal mechanisms and architecture
- **Best Practices**: Industry-standard approaches
- **Performance Optimization**: Tips and techniques
- **Common Issues**: Troubleshooting guide

**Template**:
```markdown
## Advanced Topics

### Core Principles

#### Architecture Overview
[Architecture diagram and explanation]

#### Internal Mechanisms
[How it works under the hood]

### Best Practices

#### Practice 1: [Name]
[Description with code example]

#### Practice 2: [Name]
[Description with code example]

### Performance Optimization

#### Optimization Technique 1
[Description and implementation]

#### Optimization Technique 2
[Description and implementation]

### Common Issues & Solutions

#### Issue 1: [Problem Description]
**Symptoms**: [What you observe]
**Cause**: [Root cause]
**Solution**: [Step-by-step fix]

#### Issue 2: [Problem Description]
**Symptoms**: [What you observe]
**Cause**: [Root cause]
**Solution**: [Step-by-step fix]
```

### 4. Practical Projects Section (实战篇)

**Purpose**: Apply knowledge through real-world projects.

**Required Elements**:
- **Project Overview**: Goals and requirements
- **Implementation Steps**: Detailed walkthrough
- **Code Repository**: Complete source code reference
- **Extensions**: Ideas for further learning

**Template**:
```markdown
## Practical Projects

### Project: [Project Name]

#### Project Overview
**Goal**: [What you'll build]
**Skills Applied**: [What you'll learn]
**Difficulty**: [Beginner/Intermediate/Advanced]

#### Requirements
- Requirement 1: [Description]
- Requirement 2: [Description]

#### Implementation Steps

**Step 1: [Setup]**
[Instructions and code]

**Step 2: [Core Feature]**
[Instructions and code]

**Step 3: [Enhancement]**
[Instructions and code]

#### Complete Code
[Link to repository or full code]

#### Extensions
- Extension 1: [Description]
- Extension 2: [Description]
```

### 5. Resources Section (资源篇)

**Purpose**: Provide paths for continued learning.

**Required Elements**:
- **Official Resources**: Documentation, GitHub repos
- **Learning Materials**: Books, courses, tutorials
- **Community**: Forums, discussion groups
- **Related Technologies**: What to learn next

**Template**:
```markdown
## Learning Resources

### Official Resources
- [Official Documentation](link)
- [GitHub Repository](link)
- [Release Notes](link)

### Recommended Reading
- [Book/Article Title](link) - [Brief description]
- [Book/Article Title](link) - [Brief description]

### Video Courses
- [Course Title](link) - [Platform, duration]

### Community
- [Forum/Community Name](link)
- [Discord/Slack Channel](link)

### Next Steps
- [Related technology 1]
- [Related technology 2]
```

---

## Learning Path Design

### Learning Roadmap Template

```markdown
## Learning Path

### Prerequisites
| Knowledge Area | Required Level | Description |
|---------------|----------------|-------------|
| [Area 1] | [Beginner/Intermediate] | [What to know] |
| [Area 2] | [Beginner/Intermediate] | [What to know] |

### Learning Objectives Pyramid
```
        ┌─────────────┐
        │  实战篇     │  ← Architecture Design Skills
        └─────────────┘
      ┌───────────────────┐
      │     进阶篇        │  ← Core Technology Mastery
      └───────────────────┘
    ┌─────────────────────────┐
    │        入门篇           │  ← Foundation Understanding
    └─────────────────────────┘
```

### Time Planning
| Stage | Chapters | Suggested Time | Focus |
|-------|----------|----------------|-------|
| Beginner | X chapters | X weeks | [Focus areas] |
| Intermediate | X chapters | X weeks | [Focus areas] |
| Advanced | X chapters | X weeks | [Focus areas] |
```

---

## Thought-Provoking Questions Design

### Purpose

Validate learning outcomes and encourage deeper thinking after each chapter.

### Question Types

| Type | Purpose | Example |
|------|---------|---------|
| **Concept Understanding** | Test basic comprehension | "What is X? How does it work?" |
| **Code Practice** | Test practical application | "How would you implement X?" |
| **Comprehensive Analysis** | Encourage critical thinking | "Compare X and Y. When to use each?" |

### Template

```markdown
## Questions for Reflection

> Complete this section to validate your learning

### Concept Understanding

1. **[Question about core concept]**
   - Hint: [Guidance for thinking]

2. **[Question about core concept]**
   - Hint: [Guidance for thinking]

### Code Practice

3. **[Question requiring code implementation]**
   - Hint: [Technical guidance]

4. **[Question requiring code implementation]**
   - Hint: [Technical guidance]

### Comprehensive Analysis

5. **[Open-ended analysis question]**
   - Hint: [Aspects to consider]

---

> **Next Chapter**: [Link to next chapter] - [Brief description]
```

### Design Principles

1. **3-5 questions per chapter** - Not too many, not too few
2. **Difficulty progression** - From basic to advanced
3. **Direct relevance** - Questions must relate to chapter content
4. **Include hints** - Guide thinking without giving answers
5. **Open-ended elements** - Encourage exploration beyond the content

---

## Chapter Transition Design

### Purpose

Help learners understand the connection between chapters and maintain learning momentum.

### Template

At the end of each chapter:

```markdown
---

> **Next Chapter Preview**: [Chapter Title](./path/to/chapter.md) - [What you'll learn next]
```

### Best Practices

- Briefly mention what the next chapter covers
- Explain how it connects to current chapter
- For final chapter, provide summary and next steps

---

## Appendix Design

### Purpose

Quick reference tools for development, NOT primary learning content.

### Content Types

| Type | Description | When to Use |
|------|-------------|-------------|
| **Annotation Cheatsheet** | Common annotations/APIs | Development reference |
| **Configuration Reference** | Common settings | Configuration reference |
| **Problem Solutions** | Common issues & fixes | Troubleshooting |

### Design Principles

1. **Concise** - Only most common/useful items
2. **Table format** - Easy to scan
3. **Code examples** - Copy-paste ready
4. **Clear positioning** - Marked as reference tools, not learning content

### Template

```markdown
# [Technology] Quick Reference

> Quick reference for development use

## [Category 1]

| Item | Purpose | Example |
|------|---------|---------|
| [Item 1] | [Description] | `[Code]` |
| [Item 2] | [Description] | `[Code]` |

## [Category 2]

| Item | Purpose | Example |
|------|---------|---------|
| [Item 1] | [Description] | `[Code]` |

---

> **Note**: This is a quick reference tool. For detailed explanations, refer to corresponding chapters.
```

---

## Index Configuration Best Practices

### JSON Structure

```json
{
  "version": "X.X.X",
  "lastUpdated": "YYYY-MM-DD",
  "technologyVersion": "X.x",
  "books": [
    {
      "id": "unique-id",
      "title": "Title",
      "icon": "📘",
      "description": "Description",
      "chapters": [
        {
          "id": "chapter-id",
          "name": "Chapter Name",
          "icon": "📖",
          "description": "Chapter description",
          "learningGoal": "What learners will achieve",
          "items": [
            {
              "id": "item-id",
              "title": "Item Title",
              "description": "Item description",
              "path": "/correct/path/to/file.md",
              "tags": ["tag1", "tag2"],
              "learningObjectives": ["Objective 1", "Objective 2"]
            }
          ]
        }
      ]
    }
  ]
}
```

### Critical Checks

1. **Path Verification**: Ensure all paths match actual file names
2. **Icon Encoding**: Use UTF-8 encoding for emoji icons
3. **Consistent Naming**: Use consistent file naming conventions
4. **Version Information**: Include technology version for accuracy

---

## Content Quality Standards

### 1. Accuracy
- Verify all code examples are runnable
- Cross-reference with official documentation
- Include version information for tools/frameworks

### 2. Clarity
- Use simple, direct language
- Explain technical terms when first introduced
- Provide visual aids (diagrams, flowcharts) for complex concepts

### 3. Completeness
- Cover all essential topics
- Include prerequisites and dependencies
- Address common edge cases and errors

### 4. Practicality
- Every concept should have a code example
- Include real-world use cases
- Provide troubleshooting guidance

---

## Document Generation Workflow

### Step 1: Requirement Analysis
- Identify the technology/topic
- Determine target audience level (beginner/intermediate/advanced)
- Clarify documentation scope and depth
- **Specify technology version** (e.g., Spring Boot 2.x vs 3.x)

### Step 2: Information Gathering
- Search official documentation
- Find best practices and community resources
- Collect code examples and use cases
- **Verify version-specific features and APIs**

### Step 3: Structure Design
- Select appropriate sections from framework
- Customize outline based on technology specifics
- Plan code examples and diagrams
- **Design learning path progression**
- **Plan thought-provoking questions**

### Step 4: Content Creation
- Write following the templates
- Include runnable code examples
- Add visual aids where helpful
- **Add chapter transition guidance**
- **Add questions for reflection**

### Step 5: Quality Assurance
- Verify all code runs successfully
- Check all links are valid
- Review for clarity and completeness
- **Verify all file paths match actual files**
- **Check icon encoding (UTF-8)**

---

## Code Example Guidelines

### 1. Complete and Runnable
```python
# Good: Complete example
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

### 2. Include Comments
```java
// Bad: No comments
public class UserService {
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

// Good: With explanatory comments
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Find user by ID
     * @param id User's unique identifier
     * @return User object or null if not found
     */
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

### 3. Show Expected Output
```bash
# Command
npm start

# Expected output
Server running on http://localhost:3000
```

---

## Checklist Before Publishing

- [ ] All code examples are tested and runnable
- [ ] All links are valid
- [ ] Prerequisites are clearly stated
- [ ] Technical terms are explained
- [ ] Visual aids are included for complex topics
- [ ] Common issues section is included
- [ ] Resources for further learning are provided
- [ ] Document follows consistent formatting
- [ ] **Learning path is clearly defined**
- [ ] **Thought-provoking questions are included**
- [ ] **Chapter transitions are smooth**
- [ ] **Appendix is properly positioned as reference**
- [ ] **All file paths are verified**
- [ ] **Icons are properly encoded (UTF-8)**
- [ ] **Technology version is specified**

---

## Example Usage

When user asks: "帮我生成一份Spring Boot学习文档"

1. **Analyze**: Spring Boot is a Java framework, target audience likely has Java basics, specify version (e.g., 2.x)
2. **Gather**: Official docs, Spring guides, best practices
3. **Structure**: Design learning path (Beginner → Intermediate → Advanced → Appendix)
4. **Create**: Write comprehensive documentation with code examples, questions, and transitions
5. **Verify**: Ensure all code compiles, paths are correct, icons are properly encoded

---

## Common Pitfalls to Avoid

1. **Path Mismatch**: Index paths don't match actual file names
2. **Icon Encoding**: Emoji icons corrupted due to encoding issues
3. **Missing Version**: Not specifying technology version
4. **No Learning Path**: Content without clear progression
5. **No Validation**: Missing thought-provoking questions
6. **Appendix Confusion**: Treating reference materials as learning content
7. **Abrupt Transitions**: No guidance between chapters

---

## Notes

- Adapt section depth based on technology complexity
- For simple libraries, combine sections appropriately
- For complex frameworks, expand sections as needed
- Always prioritize practical, runnable examples
- Include version-specific information when relevant
- Design for progressive learning, not just content organization
- Separate learning content from reference materials
